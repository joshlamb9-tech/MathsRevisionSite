(function () {
  'use strict';

  var SUPABASE_URL  = 'https://jkbfvfoepmhwyzhleifh.supabase.co';
  var SESSION_KEY   = 'maths-revision:teacher-pw';

  var allPupils  = [];
  var sortField  = 'name';
  var sortAsc    = true;
  var searchTerm = '';

  // ─── AUTH ─────────────────────────────────────────────────────────────────

  function getPassword() {
    return sessionStorage.getItem(SESSION_KEY) || '';
  }

  function teacherPost(action, extra) {
    return fetch(SUPABASE_URL + '/functions/v1/teacher-ops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.assign({ password: getPassword(), action: action }, extra || {}))
    }).then(function (r) {
      return r.json().then(function (d) {
        if (!r.ok) throw new Error(d.error || 'Error');
        return d;
      });
    });
  }

  // ─── RENDER ───────────────────────────────────────────────────────────────

  function pctBadge(pct) {
    if (pct === null || pct === undefined) return '<span class="badge badge-grey">—</span>';
    var cls = pct >= 75 ? 'badge-green' : pct >= 50 ? 'badge-amber' : 'badge-red';
    return '<span class="badge ' + cls + '">' + pct + '%</span>';
  }

  function trendBars(recent) {
    if (!recent || !recent.length) return '<span style="color:#ccc;font-size:0.8rem">—</span>';
    var max = Math.max.apply(null, recent.concat([1]));
    return '<div class="trend">' + recent.map(function (v) {
      var h = Math.max(4, Math.round((v / max) * 24));
      var colour = v >= 75 ? '#16a34a' : v >= 50 ? '#d97706' : '#dc2626';
      return '<div class="trend-bar" style="height:' + h + 'px;background:' + colour + '" title="' + Math.round(v) + '%"></div>';
    }).join('') + '</div>';
  }

  function weakTopics(topicBreakdown) {
    if (!topicBreakdown || !Object.keys(topicBreakdown).length) {
      return '<span style="color:#ccc">—</span>';
    }
    var weak = Object.keys(topicBreakdown).filter(function (t) {
      var s = topicBreakdown[t];
      return s.total >= 3 && (s.correct / s.total) < 0.6;
    }).slice(0, 4);
    if (!weak.length) return '<span style="color:var(--green);font-size:0.82rem">&#10003; No weak areas</span>';
    return weak.map(function (t) {
      return '<span class="topic-tag">' + t + '</span>';
    }).join('');
  }

  function formatDate(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }

  function isActiveThisWeek(iso) {
    if (!iso) return false;
    return Date.now() - new Date(iso).getTime() < 7 * 24 * 60 * 60 * 1000;
  }

  function renderRow(p) {
    var tr = document.createElement('tr');
    tr.dataset.id = p.id;
    tr.innerHTML =
      '<td><div class="name-cell">' +
        '<span class="name-text">' + escHtml(p.name) + '</span>' +
        '<button class="edit-btn" data-id="' + p.id + '" data-name="' + escHtml(p.name) + '" title="Edit name">&#9998;</button>' +
      '</div></td>' +
      '<td>' + (p.attempts || 0) + '</td>' +
      '<td>' + pctBadge(p.avg_pct) + '</td>' +
      '<td>' + pctBadge(p.best_pct) + '</td>' +
      '<td>' + trendBars(p.recent_scores) + '</td>' +
      '<td>' + formatDate(p.last_seen) + '</td>' +
      '<td class="topics-cell">' + weakTopics(p.topic_breakdown) + '</td>';
    return tr;
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function applyFiltersAndSort() {
    var filtered = allPupils.filter(function (p) {
      return !searchTerm || p.name.toLowerCase().indexOf(searchTerm) !== -1;
    });

    filtered.sort(function (a, b) {
      var av, bv;
      if (sortField === 'name')     { av = a.name.toLowerCase(); bv = b.name.toLowerCase(); }
      if (sortField === 'attempts') { av = a.attempts || 0;      bv = b.attempts || 0; }
      if (sortField === 'avg')      { av = a.avg_pct  || -1;     bv = b.avg_pct  || -1; }
      if (sortField === 'last_seen') {
        av = a.last_seen ? new Date(a.last_seen).getTime() : 0;
        bv = b.last_seen ? new Date(b.last_seen).getTime() : 0;
      }
      if (av < bv) return sortAsc ? -1 : 1;
      if (av > bv) return sortAsc ?  1 : -1;
      return 0;
    });

    var tbody = document.getElementById('pupils-tbody');
    tbody.innerHTML = '';
    if (!filtered.length) {
      tbody.innerHTML = '<tr><td colspan="7" class="t-empty">No pupils found.</td></tr>';
      return;
    }
    filtered.forEach(function (p) { tbody.appendChild(renderRow(p)); });
  }

  function updateSummary() {
    var totalAttempts = allPupils.reduce(function (s, p) { return s + (p.attempts || 0); }, 0);
    var withScores    = allPupils.filter(function (p) { return p.avg_pct !== null; });
    var classAvg      = withScores.length
      ? Math.round(withScores.reduce(function (s, p) { return s + p.avg_pct; }, 0) / withScores.length)
      : null;
    var activeCount   = allPupils.filter(function (p) { return isActiveThisWeek(p.last_seen); }).length;

    document.getElementById('stat-pupils').textContent   = allPupils.length;
    document.getElementById('stat-attempts').textContent = totalAttempts;
    document.getElementById('stat-avg').textContent      = classAvg !== null ? classAvg + '%' : '—';
    document.getElementById('stat-active').textContent   = activeCount;
  }

  // ─── LOAD DATA ────────────────────────────────────────────────────────────

  function loadPupils() {
    document.getElementById('pupils-tbody').innerHTML =
      '<tr><td colspan="7" class="t-loading">Loading&hellip;</td></tr>';
    return teacherPost('list_pupils').then(function (data) {
      allPupils = data.pupils || [];
      updateSummary();
      applyFiltersAndSort();
    });
  }

  // ─── INLINE NAME EDIT ─────────────────────────────────────────────────────

  document.getElementById('pupils-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('.edit-btn');
    if (!editBtn) return;

    var id   = editBtn.dataset.id;
    var name = editBtn.dataset.name;
    var cell = editBtn.closest('td');

    // Replace name cell content with edit form
    cell.innerHTML =
      '<div class="name-edit-wrap">' +
        '<input class="name-edit-inp" type="text" value="' + escHtml(name) + '" maxlength="100">' +
        '<button class="save-name-btn">Save</button>' +
        '<button class="cancel-name-btn">Cancel</button>' +
      '</div>';

    var inp     = cell.querySelector('.name-edit-inp');
    var saveBtn = cell.querySelector('.save-name-btn');
    var cancelBtn = cell.querySelector('.cancel-name-btn');
    inp.focus();
    inp.select();

    function restore() {
      cell.innerHTML =
        '<div class="name-cell">' +
          '<span class="name-text">' + escHtml(name) + '</span>' +
          '<button class="edit-btn" data-id="' + id + '" data-name="' + escHtml(name) + '" title="Edit name">&#9998;</button>' +
        '</div>';
    }

    function save() {
      var newName = inp.value.trim();
      if (!newName || newName === name) { restore(); return; }
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving\u2026';
      teacherPost('rename_pupil', { uuid: id, name: newName }).then(function () {
        // Update local data
        var p = allPupils.find(function (x) { return x.id === id; });
        if (p) p.name = newName;
        applyFiltersAndSort();
      }).catch(function () {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save';
        alert('Could not save name. Check your connection.');
      });
    }

    saveBtn.addEventListener('click', save);
    cancelBtn.addEventListener('click', restore);
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter')  save();
      if (e.key === 'Escape') restore();
    });
  });

  // ─── CONTROLS ─────────────────────────────────────────────────────────────

  document.getElementById('search-input').addEventListener('input', function () {
    searchTerm = this.value.trim().toLowerCase();
    applyFiltersAndSort();
  });

  document.querySelectorAll('.sort-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var field = this.dataset.sort;
      if (sortField === field) {
        sortAsc = !sortAsc;
      } else {
        sortField = field;
        sortAsc   = field === 'name';
      }
      document.querySelectorAll('.sort-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      applyFiltersAndSort();
    });
  });

  document.getElementById('refresh-btn').addEventListener('click', function () {
    loadPupils();
  });

  // ─── AUTH FLOW ────────────────────────────────────────────────────────────

  function showDashboard() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('dashboard').style.display   = 'block';
    loadPupils();
  }

  function tryAuth(password) {
    var btn = document.getElementById('auth-btn');
    btn.disabled = true;
    btn.textContent = 'Checking\u2026';
    document.getElementById('auth-error').style.display = 'none';

    // Verify by attempting list_pupils — if password wrong, server returns 401
    fetch(SUPABASE_URL + '/functions/v1/teacher-ops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password, action: 'list_pupils' })
    }).then(function (r) {
      if (r.status === 401) throw new Error('Unauthorised');
      return r.json();
    }).then(function (data) {
      if (data.error === 'Unauthorised') throw new Error('Unauthorised');
      sessionStorage.setItem(SESSION_KEY, password);
      allPupils = data.pupils || [];
      updateSummary();
      applyFiltersAndSort();
      document.getElementById('auth-screen').style.display = 'none';
      document.getElementById('dashboard').style.display   = 'block';
    }).catch(function (err) {
      btn.disabled = false;
      btn.textContent = 'Sign in';
      document.getElementById('auth-error').style.display = 'block';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // If already authenticated this session, skip login
    var saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      showDashboard();
      return;
    }

    var authBtn  = document.getElementById('auth-btn');
    var authInp  = document.getElementById('auth-password');

    authBtn.addEventListener('click', function () {
      var pw = authInp.value;
      if (!pw) { authInp.focus(); return; }
      tryAuth(pw);
    });

    authInp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') authBtn.click();
    });
  });

}());

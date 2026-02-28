(function () {
  'use strict';

  var SUPABASE_URL = 'https://jkbfvfoepmhwyzhleifh.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_q9qOX43dA9SoxZ3Bq2p2Pw_c-GUaYw_';

  var lastResult = null;

  // ─── SUPABASE HELPERS ─────────────────────────────────────────────────────

  function apiHeaders(extra) {
    return Object.assign({
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json'
    }, extra || {});
  }

  function submitScore(initials, score, total, timeSeconds) {
    return fetch(SUPABASE_URL + '/rest/v1/ma_scores', {
      method: 'POST',
      headers: apiHeaders({ 'Prefer': 'return=minimal' }),
      body: JSON.stringify({
        initials: initials.toUpperCase().slice(0, 3),
        score: score,
        total: total,
        time_seconds: timeSeconds
      })
    });
  }

  function fetchLeaderboard() {
    var since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    var url = SUPABASE_URL + '/rest/v1/ma_scores' +
      '?select=initials,score,total,time_seconds,percentage' +
      '&created_at=gte.' + encodeURIComponent(since) +
      '&order=percentage.desc,time_seconds.asc' +
      '&limit=10';
    return fetch(url, { headers: apiHeaders() }).then(function (r) { return r.json(); });
  }

  // ─── RENDER ───────────────────────────────────────────────────────────────

  function formatTime(s) {
    return Math.floor(s / 60) + ':' + (s % 60 < 10 ? '0' : '') + (s % 60);
  }

  function renderLeaderboard(scores) {
    var list = document.getElementById('ma-lb-list');
    if (!list) return;
    list.innerHTML = '';

    if (!Array.isArray(scores) || !scores.length) {
      list.innerHTML = '<li class="ma-lb-empty">No scores yet \u2014 be the first!</li>';
      return;
    }

    scores.forEach(function (s, i) {
      var li = document.createElement('li');
      li.className = 'ma-lb-row' +
        (i === 0 ? ' ma-lb-gold' : i === 1 ? ' ma-lb-silver' : i === 2 ? ' ma-lb-bronze' : '');
      var pct = s.percentage != null
        ? parseFloat(s.percentage).toFixed(0)
        : Math.round(s.score / s.total * 100);
      li.innerHTML =
        '<span class="ma-lb-pos">' + (i + 1) + '</span>' +
        '<span class="ma-lb-name">' + s.initials + '</span>' +
        '<span class="ma-lb-score">' + s.score + '/' + s.total + ' &nbsp;(' + pct + '%)</span>' +
        '<span class="ma-lb-time">' + formatTime(s.time_seconds) + '</span>';
      list.appendChild(li);
    });
  }

  function refreshLeaderboard() {
    fetchLeaderboard()
      .then(renderLeaderboard)
      .catch(function () {
        var list = document.getElementById('ma-lb-list');
        if (list) list.innerHTML = '<li class="ma-lb-empty">Could not load leaderboard.</li>';
      });
  }

  // ─── INIT ─────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {

    refreshLeaderboard();

    // When a test completes, show the submit form and refresh
    document.addEventListener('ma:results', function (e) {
      lastResult = e.detail;
      var submitEl = document.getElementById('ma-leaderboard-submit');
      if (submitEl) {
        submitEl.hidden = false;
        var btn = document.getElementById('ma-lb-submit-btn');
        if (btn) { btn.disabled = false; btn.textContent = 'Submit'; }
        var inp = document.getElementById('ma-initials');
        if (inp) inp.value = '';
      }
      refreshLeaderboard();
    });

    // Submit initials
    document.getElementById('ma-lb-submit-btn').addEventListener('click', function () {
      var inp = document.getElementById('ma-initials');
      var initials = (inp.value || '').trim().toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
      if (!initials) { inp.focus(); return; }
      if (!lastResult) return;

      var btn = this;
      btn.disabled = true;
      btn.textContent = 'Saving\u2026';

      submitScore(initials, lastResult.correct, lastResult.total, lastResult.timeSeconds)
        .then(function (r) {
          if (!r.ok) throw new Error('Server error ' + r.status);
          document.getElementById('ma-leaderboard-submit').hidden = true;
          refreshLeaderboard();
        })
        .catch(function () {
          btn.disabled = false;
          btn.textContent = 'Submit';
          alert('Could not save score \u2014 check your connection and try again.');
        });
    });

    // Auto-uppercase the initials input
    document.getElementById('ma-initials').addEventListener('input', function () {
      var pos = this.selectionStart;
      this.value = this.value.toUpperCase().replace(/[^A-Z]/g, '');
      this.setSelectionRange(pos, pos);
    });

    // Enter key on initials input triggers submit
    document.getElementById('ma-initials').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') document.getElementById('ma-lb-submit-btn').click();
    });

    // Hide submit form when retry is clicked
    document.getElementById('ma-retry-btn').addEventListener('click', function () {
      var submitEl = document.getElementById('ma-leaderboard-submit');
      if (submitEl) submitEl.hidden = true;
    });

  });

}());

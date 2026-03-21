(function () {
  'use strict';

  /* ── Derive topic slug from URL ─────────────────────────────────────────
     e.g. /MathsRevisionSite/core/averages/  →  'core/averages'
  ────────────────────────────────────────────────────────────────────────── */
  function getTopicSlug() {
    var parts = window.location.pathname.split('/').filter(Boolean);
    for (var i = 0; i < parts.length - 1; i++) {
      if (parts[i] === 'core' || parts[i] === 'foundation' || parts[i] === 'additional') {
        return parts[i] + '/' + parts[i + 1];
      }
    }
    return null;
  }

  /* ── Answer checking ────────────────────────────────────────────────── */
  function normalise(str) {
    return parseFloat(String(str).replace(/[^\d.\-]/g, ''));
  }

  function answersMatch(userVal, correctVal, tolerance) {
    var u = normalise(userVal);
    var c = normalise(correctVal);
    if (isNaN(u) || isNaN(c)) return false;
    return Math.abs(u - c) <= (tolerance || 0);
  }

  /* ── Main ───────────────────────────────────────────────────────────── */
  function initPractice() {
    var slug = getTopicSlug();
    if (!slug) return;
    if (!window.PRACTICE_QUESTIONS || !window.PRACTICE_QUESTIONS[slug]) return;

    var questions = window.PRACTICE_QUESTIONS[slug];
    var main = document.querySelector('.main-content');
    if (!main) return;

    /* Build section */
    var section = document.createElement('section');
    section.className = 'practice-section';

    var html = '<h2 class="practice-heading">Practice Questions</h2>'
      + '<p class="practice-intro">Answer all four questions, then hit <strong>Check answers</strong>. '
      + 'Get 3 or more right and your confidence tracker updates to green automatically.</p>'
      + '<div class="practice-questions"></div>'
      + '<button class="practice-submit-btn" type="button">Check answers</button>'
      + '<div class="practice-results" aria-live="polite"></div>';
    section.innerHTML = html;
    main.appendChild(section);

    /* Render question cards */
    var container = section.querySelector('.practice-questions');
    questions.forEach(function (q, i) {
      var card = document.createElement('div');
      card.className = 'pq-card';
      card.innerHTML = '<p class="pq-question"><span class="pq-num">' + (i + 1) + '.</span> ' + q.q + '</p>'
        + '<div class="pq-input-row">'
        + '<input type="number" class="pq-input" step="any" placeholder="Answer"'
        + ' aria-label="Answer to question ' + (i + 1) + '">'
        + '<span class="pq-feedback" aria-live="polite"></span>'
        + '</div>'
        + (q.hint ? '<p class="pq-hint">' + q.hint + '</p>' : '');
      container.appendChild(card);
    });

    /* Allow Enter key to move between inputs and submit on last */
    var inputs = Array.prototype.slice.call(section.querySelectorAll('.pq-input'));
    inputs.forEach(function (inp, i) {
      inp.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        if (i < inputs.length - 1) {
          inputs[i + 1].focus();
        } else {
          submitBtn.click();
        }
      });
    });

    var submitBtn  = section.querySelector('.practice-submit-btn');
    var resultsDiv = section.querySelector('.practice-results');
    var submitted  = false;

    submitBtn.addEventListener('click', function () {

      /* ── Reset mode ── */
      if (submitted) {
        submitted = false;
        submitBtn.textContent = 'Check answers';
        resultsDiv.innerHTML  = '';
        inputs.forEach(function (inp, i) {
          inp.value    = '';
          inp.disabled = false;
          var fb   = inp.closest('.pq-input-row').querySelector('.pq-feedback');
          fb.textContent = '';
          fb.className   = 'pq-feedback';
          inp.closest('.pq-card').className = 'pq-card';
        });
        inputs[0].focus();
        return;
      }

      /* ── Mark mode ── */
      submitted = true;
      var correct = 0;

      inputs.forEach(function (inp, i) {
        var q        = questions[i];
        var card     = inp.closest('.pq-card');
        var fb       = inp.closest('.pq-input-row').querySelector('.pq-feedback');
        var tol      = q.tolerance !== undefined ? q.tolerance : 0;

        inp.disabled = true;

        if (inp.value.trim() === '') {
          card.className   = 'pq-card pq-skipped';
          fb.textContent   = 'Skipped \u2014 answer: ' + q.a;
          fb.className     = 'pq-feedback pq-fb-skip';
          return;
        }

        if (answersMatch(inp.value, q.a, tol)) {
          correct++;
          card.className = 'pq-card pq-correct';
          fb.textContent = '\u2713 Correct!';
          fb.className   = 'pq-feedback pq-fb-correct';
        } else {
          card.className = 'pq-card pq-wrong';
          fb.textContent = '\u2717 Answer: ' + q.a
            + (q.explanation ? ' \u2014 ' + q.explanation : '');
          fb.className   = 'pq-feedback pq-fb-wrong';
          /* Shake */
          card.style.animation = 'none';
          void card.offsetWidth;
          card.style.animation = 'pq-shake 0.4s ease';
        }
      });

      /* ── Result banner ── */
      var total  = questions.length;
      var passed = correct >= 3;
      resultsDiv.className = 'practice-results ' + (passed ? 'pr-passed' : 'pr-notyet');
      resultsDiv.innerHTML = passed
        ? '<span class="pr-icon">\ud83c\udf89</span><strong>' + correct + '/' + total
          + ' correct</strong> \u2014 great work! Confidence updated to green.'
        : '<span class="pr-icon">\ud83d\udcaa</span><strong>' + correct + '/' + total
          + ' correct</strong> \u2014 review the worked examples and try again.';

      submitBtn.textContent = 'Try again';

      /* ── Auto-update RAG ── */
      if (passed && window.tracker && window.tracker.available) {
        window.tracker.setRating(slug, 'green');
        var ragBtns  = document.querySelectorAll('.rag-btn');
        ragBtns.forEach(function (b) { b.classList.remove('rag-active'); });
        var greenBtn = document.querySelector('.rag-btn.rag-green');
        if (greenBtn) greenBtn.classList.add('rag-active');
      }

      /* Scroll to results */
      resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPractice);
  } else {
    initPractice();
  }
}());

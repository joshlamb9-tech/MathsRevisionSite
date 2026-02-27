(function () {
  'use strict';

  function initReveals() {
    var headings = Array.prototype.slice.call(
      document.querySelectorAll('h2')
    ).filter(function (h) {
      return /^Worked Example/i.test(h.textContent.trim());
    });

    headings.forEach(function (heading) {
      var ol = null, answerEl = null;
      var sibling = heading.nextElementSibling;
      while (sibling && sibling.tagName !== 'H2') {
        if (!ol && sibling.tagName === 'OL') {
          ol = sibling;
        }
        if (ol && sibling.tagName === 'P') {
          var strong = sibling.querySelector('strong');
          if (strong && /^Answer/i.test(strong.textContent.trim())) {
            answerEl = sibling;
            break;
          }
        }
        sibling = sibling.nextElementSibling;
      }
      if (!ol) return;

      var steps = Array.prototype.slice.call(ol.children);
      var total = steps.length;
      var revealed = 0;

      // Hide all steps and answer via inline style (CSS-cache-safe)
      steps.forEach(function (li) { li.style.display = 'none'; });
      if (answerEl) answerEl.style.display = 'none';

      // Create button and insert before the <ol>
      var btn = document.createElement('button');
      btn.className = 'reveal-btn';
      btn.textContent = 'Show step 1 \u2192';
      ol.parentNode.insertBefore(btn, ol);

      btn.addEventListener('click', function () {
        if (revealed < total) {
          steps[revealed].style.display = '';
          revealed++;
          if (revealed < total) {
            btn.textContent = 'Next step \u2192 (' + revealed + '\u2009/\u2009' + total + ')';
          } else if (answerEl) {
            btn.textContent = 'Show answer \u2192';
          } else {
            btn.textContent = 'Try again';
          }
        } else if (answerEl && answerEl.style.display === 'none') {
          answerEl.style.display = '';
          btn.textContent = 'Try again';
        } else {
          // Reset
          revealed = 0;
          steps.forEach(function (li) { li.style.display = 'none'; });
          if (answerEl) answerEl.style.display = 'none';
          btn.textContent = 'Show step 1 \u2192';
        }
      });
    });
  }

  // defer guarantees DOM is parsed; run immediately, fall back to DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveals);
  } else {
    initReveals();
  }
}());

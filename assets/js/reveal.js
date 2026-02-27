(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var headings = Array.prototype.slice.call(
      document.querySelectorAll('h2')
    ).filter(function (h) {
      return /^Worked Example/i.test(h.textContent.trim());
    });

    headings.forEach(function (heading) {
      // Walk siblings to find the <ol> and the Answer paragraph
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

      // Hide all steps and the answer initially
      steps.forEach(function (li) { li.classList.add('reveal-hidden'); });
      if (answerEl) answerEl.classList.add('reveal-hidden');

      // Create the reveal button and insert it before the <ol>
      var btn = document.createElement('button');
      btn.className = 'reveal-btn';
      ol.parentNode.insertBefore(btn, ol);

      function updateBtn() {
        if (revealed === 0) {
          btn.textContent = 'Show step 1 \u2192';
        } else if (revealed < total) {
          btn.textContent = 'Next step \u2192 (' + revealed + '\u2009/\u2009' + total + ')';
        } else if (answerEl && !answerEl.classList.contains('reveal-hidden') === false) {
          btn.textContent = 'Show answer \u2192';
        } else {
          btn.textContent = 'Try again';
        }
      }
      updateBtn();

      btn.addEventListener('click', function () {
        if (revealed < total) {
          // Reveal next step
          steps[revealed].classList.remove('reveal-hidden');
          revealed++;
          if (revealed === total && answerEl) {
            btn.textContent = 'Show answer \u2192';
          } else if (revealed === total) {
            btn.textContent = 'Try again';
          } else {
            btn.textContent = 'Next step \u2192 (' + revealed + '\u2009/\u2009' + total + ')';
          }
        } else if (answerEl && answerEl.classList.contains('reveal-hidden')) {
          // Reveal answer
          answerEl.classList.remove('reveal-hidden');
          btn.textContent = 'Try again';
        } else {
          // Reset
          revealed = 0;
          steps.forEach(function (li) { li.classList.add('reveal-hidden'); });
          if (answerEl) answerEl.classList.add('reveal-hidden');
          btn.textContent = 'Show step 1 \u2192';
        }
      });
    });
  });
}());

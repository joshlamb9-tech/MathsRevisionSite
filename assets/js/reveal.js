(function () {
  'use strict';

  function initReveals() {
    var headings = Array.prototype.slice.call(
      document.querySelectorAll('h2')
    ).filter(function (h) {
      return /^Worked Example/i.test(h.textContent.trim());
    });

    headings.forEach(function (heading) {

      /* ── 1. Wrap heading + all following siblings (until next h2) in a card ── */
      var toWrap = [heading];
      var sib = heading.nextElementSibling;
      while (sib && sib.tagName !== 'H2') {
        toWrap.push(sib);
        sib = sib.nextElementSibling;
      }

      var card = document.createElement('div');
      card.className = 'worked-example-card';
      heading.parentNode.insertBefore(card, heading);
      toWrap.forEach(function (el) { card.appendChild(el); });

      /* ── 2. Find <ol> and answer <p> inside the card ── */
      var ol = null, answerEl = null;
      var child = heading.nextElementSibling;
      while (child) {
        if (!ol && child.tagName === 'OL') {
          ol = child;
        }
        if (ol && child.tagName === 'P') {
          var strong = child.querySelector('strong');
          if (strong && /^Answer/i.test(strong.textContent.trim())) {
            answerEl = child;
            break;
          }
        }
        child = child.nextElementSibling;
      }
      if (!ol) return;

      var steps   = Array.prototype.slice.call(ol.children);
      var total   = steps.length;
      var revealed = 0;

      /* ── 3. Hide all steps and answer ── */
      steps.forEach(function (li) { li.style.display = 'none'; });
      if (answerEl) answerEl.style.display = 'none';

      /* ── 4. Insert reveal button ── */
      var btn = document.createElement('button');
      btn.className = 'reveal-btn';
      btn.textContent = 'Show step 1 \u2192';
      ol.parentNode.insertBefore(btn, ol);

      btn.addEventListener('click', function () {
        if (revealed < total) {
          /* Show next step with animation */
          var li = steps[revealed];
          li.style.display = '';
          li.classList.remove('reveal-animate-in');
          /* Force reflow so the animation re-triggers on Try again */
          void li.offsetWidth;
          li.classList.add('reveal-animate-in');
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
          answerEl.classList.remove('reveal-animate-in');
          void answerEl.offsetWidth;
          answerEl.classList.add('reveal-animate-in');
          btn.textContent = 'Try again';

        } else {
          /* Reset */
          revealed = 0;
          steps.forEach(function (li) {
            li.style.display = 'none';
            li.classList.remove('reveal-animate-in');
          });
          if (answerEl) {
            answerEl.style.display = 'none';
            answerEl.classList.remove('reveal-animate-in');
          }
          btn.textContent = 'Show step 1 \u2192';
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveals);
  } else {
    initReveals();
  }
}());

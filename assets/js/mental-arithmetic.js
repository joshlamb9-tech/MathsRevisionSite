(function () {
  'use strict';

  // ─── HELPERS ────────────────────────────────────────────────────────────────

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // ─── QUESTION GENERATORS ────────────────────────────────────────────────────
  // Each returns { q: 'question text', a: 'answer string' }

  var generators = [

    // 1. Addition: 3-digit + 2/3-digit
    function genAddition() {
      var a = randInt(100, 599), b = randInt(50, 399);
      return { q: a + ' + ' + b + ' =', a: String(a + b) };
    },

    // 2. Subtraction: result always positive
    function genSubtraction() {
      var b = randInt(40, 280), a = b + randInt(30, 250);
      return { q: a + ' \u2212 ' + b + ' =', a: String(a - b) };
    },

    // 3. Multiplication: extended times tables
    function genMultiplication() {
      var a = randInt(6, 15), b = randInt(6, 12);
      return { q: a + ' \u00d7 ' + b + ' =', a: String(a * b) };
    },

    // 4. Multiply by 10 / 100
    function genMultBy10() {
      var m = pick([10, 100]);
      var a = randInt(3, 99);
      return { q: a + ' \u00d7 ' + m + ' =', a: String(a * m) };
    },

    // 5. Division (exact — answer is a whole number)
    function genDivision() {
      var divisor = randInt(2, 12), result = randInt(3, 12);
      return { q: (divisor * result) + ' \u00f7 ' + divisor + ' =', a: String(result) };
    },

    // 6. Divide by 10 / 100
    function genDivBy10() {
      var m = pick([10, 100]);
      var result = randInt(2, 99);
      return { q: (result * m) + ' \u00f7 ' + m + ' =', a: String(result) };
    },

    // 7. Fraction of an amount
    function genFractionOf() {
      var d = pick([2, 3, 4, 5, 8, 10]);
      var unit = randInt(3, 15);
      var n = randInt(1, d - 1);
      var whole = d * unit;
      return { q: 'Find ' + n + '/' + d + ' of ' + whole, a: String(n * unit) };
    },

    // 8. Percentage of an amount
    function genPercentageOf() {
      var configs = [
        { p: 10, mult: 10 }, { p: 20, mult: 5 }, { p: 25, mult: 4 },
        { p: 50, mult: 2 },  { p: 5,  mult: 20 }, { p: 75, mult: 4 },
        { p: 40, mult: 5 },  { p: 30, mult: 10 }
      ];
      var c = pick(configs);
      var base = randInt(2, 12) * c.mult;
      return { q: 'What is ' + c.p + '% of ' + base + '?', a: String(Math.round(c.p / 100 * base)) };
    },

    // 9. Percentage increase or decrease
    function genPercentChange() {
      var type = pick(['increase', 'decrease']);
      var configs = [{ p: 10, mult: 10 }, { p: 20, mult: 5 }, { p: 25, mult: 4 }, { p: 50, mult: 2 }];
      var c = pick(configs);
      var base = randInt(2, 10) * c.mult;
      var change = Math.round(c.p / 100 * base);
      var ans = type === 'increase' ? base + change : base - change;
      var verb = type === 'increase' ? 'Increase' : 'Decrease';
      return { q: verb + ' ' + base + ' by ' + c.p + '%.', a: String(ans) };
    },

    // 10. Squares
    function genSquare() {
      var n = randInt(2, 15);
      return { q: n + '\u00b2 =', a: String(n * n) };
    },

    // 11. Square roots (perfect squares only)
    function genSqrt() {
      var n = randInt(2, 12);
      return { q: '\u221a' + (n * n) + ' =', a: String(n) };
    },

    // 12. Cubes (small numbers)
    function genCube() {
      var n = pick([2, 3, 4, 5]);
      return { q: n + '\u00b3 =', a: String(n * n * n) };
    },

    // 13. Simple algebra: ax + b = c
    function genAlgebraAdd() {
      var a = randInt(2, 6), x = randInt(1, 10), b = randInt(1, 20);
      var c = a * x + b;
      return { q: a + 'x + ' + b + ' = ' + c + '. Find x.', a: String(x) };
    },

    // 14. Simple algebra: ax - b = c
    function genAlgebraSub() {
      var a = randInt(2, 5), x = randInt(3, 12), b = randInt(1, 15);
      var c = a * x - b;
      return { q: a + 'x \u2212 ' + b + ' = ' + c + '. Find x.', a: String(x) };
    },

    // 15. Rounding to nearest 10
    function genRound10() {
      var n = randInt(101, 999);
      return { q: 'Round ' + n + ' to the nearest 10.', a: String(Math.round(n / 10) * 10) };
    },

    // 16. Rounding to nearest 100
    function genRound100() {
      var n = randInt(150, 9850);
      return { q: 'Round ' + n + ' to the nearest 100.', a: String(Math.round(n / 100) * 100) };
    },

    // 17. Rounding a decimal to 1 d.p.
    function genRoundDp() {
      var whole = randInt(1, 20);
      var dp2 = randInt(10, 99); // e.g. 3.47
      var num = whole + dp2 / 100;
      var ans = Math.round(num * 10) / 10;
      return { q: 'Round ' + num.toFixed(2) + ' to 1 decimal place.', a: String(ans.toFixed(1)) };
    },

    // 18. Unit conversion: km to m
    function genKmToM() {
      var km = randInt(1, 15);
      return { q: km + ' km = ______ m', a: String(km * 1000) };
    },

    // 19. Unit conversion: kg to g
    function genKgToG() {
      var kg = randInt(1, 10);
      return { q: kg + ' kg = ______ g', a: String(kg * 1000) };
    },

    // 20. Unit conversion: cm to mm
    function genCmToMm() {
      var cm = randInt(2, 50);
      return { q: cm + ' cm = ______ mm', a: String(cm * 10) };
    },

    // 21. Angles in a triangle
    function genTriangleAngle() {
      var a = randInt(25, 80), b = randInt(25, 80);
      while (a + b >= 175) b = randInt(20, 70);
      return { q: 'A triangle has angles of ' + a + '\u00b0 and ' + b + '\u00b0. Find the third angle.', a: (180 - a - b) + '\u00b0' };
    },

    // 22. Angles on a straight line
    function genStraightLine() {
      var a = randInt(20, 150);
      return { q: 'Two angles on a straight line. One is ' + a + '\u00b0. Find the other.', a: (180 - a) + '\u00b0' };
    },

    // 23. Angles around a point
    function genAroundPoint() {
      var a = randInt(60, 200), b = randInt(50, 150);
      while (a + b >= 355) b = randInt(30, 100);
      return { q: 'Angles around a point: ' + a + '\u00b0 and ' + b + '\u00b0. Find the remaining angle.', a: (360 - a - b) + '\u00b0' };
    },

    // 24. Ratio sharing — find one part
    function genRatio() {
      var p = randInt(1, 5), q = randInt(1, 5);
      while (p === q) q = randInt(1, 5);
      var k = randInt(2, 8);
      var total = (p + q) * k;
      var larger = Math.max(p, q) * k;
      return { q: 'Share ' + total + ' in the ratio ' + p + ':' + q + '. What is the larger share?', a: String(larger) };
    },

    // 25. Decimal × integer
    function genDecimalMult() {
      var d = pick([0.5, 1.5, 2.5, 3.5, 0.25, 0.1, 0.2, 0.4]);
      var n = randInt(2, 20);
      var ans = Math.round(d * n * 1000) / 1000;
      var ansStr = (ans === Math.floor(ans)) ? String(ans) : String(ans);
      return { q: d + ' \u00d7 ' + n + ' =', a: ansStr };
    },

    // 26. Arithmetic sequence: find the next term
    function genSequence() {
      var a = randInt(1, 20);
      var d = pick([2, 3, 4, 5, 6, 7, 10, -2, -3, -4]);
      var terms = [a, a + d, a + 2 * d, a + 3 * d];
      return { q: 'Next term: ' + terms.join(', ') + ', ___', a: String(a + 4 * d) };
    },

    // 27. Mean of a small data set
    function genMean() {
      var count = pick([3, 4, 5]);
      var mean = randInt(5, 15);
      var nums = [];
      var remaining = mean * count;
      for (var i = 0; i < count - 1; i++) {
        var lo = Math.max(1, mean - 6), hi = mean + 6;
        var v = randInt(lo, hi);
        nums.push(v);
        remaining -= v;
      }
      if (remaining < 1 || remaining > mean + 10) {
        // Fallback: simple equal values
        nums = [];
        for (var j = 0; j < count; j++) nums.push(mean);
      } else {
        nums.push(remaining);
      }
      nums.sort(function (x, y) { return x - y; });
      return { q: 'Find the mean of: ' + nums.join(', '), a: String(mean) };
    },

    // 28. Range of a data set
    function genRange() {
      var lo = randInt(3, 20), hi = lo + randInt(5, 30);
      var mid1 = randInt(lo, hi), mid2 = randInt(lo, hi);
      var nums = shuffle([lo, hi, mid1, mid2]);
      return { q: 'Find the range of: ' + nums.join(', '), a: String(hi - lo) };
    },

    // 29. Area of a rectangle
    function genAreaRect() {
      var w = randInt(3, 15), h = randInt(3, 12);
      return { q: 'Area of a rectangle ' + w + ' cm \u00d7 ' + h + ' cm =', a: (w * h) + ' cm\u00b2' };
    },

    // 30. Perimeter of a rectangle
    function genPerimRect() {
      var w = randInt(3, 15), h = randInt(3, 12);
      return { q: 'Perimeter of a rectangle ' + w + ' cm \u00d7 ' + h + ' cm =', a: (2 * (w + h)) + ' cm' };
    },

    // 31. Speed = distance ÷ time (whole numbers)
    function genSpeed() {
      var speed = pick([20, 30, 40, 50, 60, 80, 100]);
      var time = randInt(2, 5);
      var dist = speed * time;
      return { q: 'A car travels ' + dist + ' km in ' + time + ' hours. What is its speed in km/h?', a: speed + ' km/h' };
    },

    // 32. Distance = speed × time
    function genDistance() {
      var speed = pick([20, 30, 40, 50, 60]);
      var time = randInt(2, 4);
      return { q: 'Speed = ' + speed + ' km/h, time = ' + time + ' hours. Find the distance.', a: (speed * time) + ' km' };
    },

    // 33. Powers of 2
    function genPow2() {
      var n = pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      return { q: 'What is 2 to the power of ' + n + '?', a: String(Math.pow(2, n)) };
    },

    // 34. Simple interest / percentage change context
    function genSimplePercent() {
      var item = pick(['a book', 'a jacket', 'a ticket', 'a bag']);
      var price = randInt(2, 20) * 5; // multiples of 5: £10–£100
      var pct = pick([10, 20, 25, 50]);
      var disc = price * pct / 100;
      return { q: 'A ' + item + ' costs \u00a3' + price + '. It is reduced by ' + pct + '%. New price?', a: '\u00a3' + (price - disc) };
    },

    // 35. Times table with decimals (e.g. 7 × 0.3)
    function genDecimalTimesTable() {
      var a = randInt(2, 12);
      var b = pick([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]);
      var ans = Math.round(a * b * 10) / 10;
      return { q: a + ' \u00d7 ' + b + ' =', a: String(ans) };
    },

  ];

  // ─── TOPIC MAP ───────────────────────────────────────────────────────────────
  // Index matches position in generators array above
  var generatorTopics = [
    'arithmetic',    // 0  genAddition
    'arithmetic',    // 1  genSubtraction
    'multiplication',// 2  genMultiplication
    'arithmetic',    // 3  genMultBy10
    'division',      // 4  genDivision
    'division',      // 5  genDivBy10
    'fractions',     // 6  genFractionOf
    'percentages',   // 7  genPercentageOf
    'percentages',   // 8  genPercentChange
    'powers-roots',  // 9  genSquare
    'powers-roots',  // 10 genSqrt
    'powers-roots',  // 11 genCube
    'algebra',       // 12 genAlgebraAdd
    'algebra',       // 13 genAlgebraSub
    'estimation',    // 14 genRound10
    'estimation',    // 15 genRound100
    'estimation',    // 16 genRoundDp
    'units',         // 17 genKmToM
    'units',         // 18 genKgToG
    'units',         // 19 genCmToMm
    'angles',        // 20 genTriangleAngle
    'angles',        // 21 genStraightLine
    'angles',        // 22 genAroundPoint
    'ratio',         // 23 genRatio
    'decimals',      // 24 genDecimalMult
    'sequences',     // 25 genSequence
    'averages',      // 26 genMean
    'averages',      // 27 genRange
    'shape',         // 28 genAreaRect
    'shape',         // 29 genPerimRect
    'speed',         // 30 genSpeed
    'speed',         // 31 genDistance
    'powers-roots',  // 32 genPow2
    'percentages',   // 33 genSimplePercent
    'decimals',      // 34 genDecimalTimesTable
  ];

  var TOPICS = {
    'arithmetic':    { name: 'Arithmetic',             url: '/MathsRevisionSite/foundation/' },
    'multiplication':{ name: 'Multiplication',          url: '/MathsRevisionSite/foundation/long-multiplication/' },
    'division':      { name: 'Division',                url: '/MathsRevisionSite/foundation/division/' },
    'fractions':     { name: 'Fractions',               url: '/MathsRevisionSite/foundation/fractions/' },
    'percentages':   { name: 'Percentages',             url: '/MathsRevisionSite/core/percentages/' },
    'powers-roots':  { name: 'Powers & Roots',          url: '/MathsRevisionSite/core/powers-roots/' },
    'algebra':       { name: 'Algebra',                 url: '/MathsRevisionSite/core/algebra-basics/' },
    'estimation':    { name: 'Estimation & Rounding',   url: '/MathsRevisionSite/foundation/estimation/' },
    'units':         { name: 'Unit Conversions',        url: null },
    'angles':        { name: 'Angles',                  url: '/MathsRevisionSite/core/angles/' },
    'ratio':         { name: 'Ratio',                   url: '/MathsRevisionSite/core/ratio/' },
    'decimals':      { name: 'Decimals',                url: '/MathsRevisionSite/foundation/fractions/' },
    'sequences':     { name: 'Sequences',               url: '/MathsRevisionSite/core/sequences-nth-term/' },
    'averages':      { name: 'Averages',                url: '/MathsRevisionSite/core/averages/' },
    'shape':         { name: 'Area & Perimeter',        url: '/MathsRevisionSite/core/shape/' },
    'speed':         { name: 'Speed, Distance & Time',  url: '/MathsRevisionSite/core/speed-distance-time/' },
  };

  // ─── STATE ───────────────────────────────────────────────────────────────────
  var questions = [];
  var timerInterval = null;
  var elapsedSeconds = 0;

  // ─── TIMER ───────────────────────────────────────────────────────────────────
  function formatTime(s) {
    return Math.floor(s / 60) + ':' + (s % 60 < 10 ? '0' : '') + (s % 60);
  }

  // ─── QUESTION GENERATION ────────────────────────────────────────────────────
  function generateQuestions(count) {
    var qs = [];
    var indices = shuffle(generators.map(function (_, i) { return i; }));
    for (var i = 0; i < count; i++) {
      var idx = indices[i % indices.length];
      var q = generators[idx]();
      q.topic = generatorTopics[idx];
      qs.push(q);
    }
    return qs;
  }

  // ─── BUILD TEST UI ──────────────────────────────────────────────────────────
  function buildTest(count) {
    questions = generateQuestions(count);
    var list = document.getElementById('ma-questions');
    list.innerHTML = '';
    questions.forEach(function (q) {
      var li = document.createElement('li');
      li.className = 'ma-question';
      li.innerHTML =
        '<span class="ma-q-text">' + q.q + '</span>' +
        '<input type="text" class="ma-answer-input" autocomplete="off" placeholder="Answer">';
      list.appendChild(li);
    });

    // Live answered count
    list.addEventListener('input', function () {
      var answered = list.querySelectorAll('.ma-answer-input:not([value=""])').length;
      // Use a different approach — count non-empty values
      var inputs = list.querySelectorAll('.ma-answer-input');
      var done = 0;
      inputs.forEach(function (inp) { if (inp.value.trim() !== '') done++; });
      document.getElementById('ma-progress').textContent = done + ' / ' + count;
    });

    document.getElementById('ma-progress').textContent = '0 / ' + count;
  }

  // ─── MARKING ────────────────────────────────────────────────────────────────
  function normalise(str) {
    return str.trim().replace(/[^0-9.\-]/g, '');
  }

  function markTest() {
    var inputs = document.querySelectorAll('.ma-answer-input');
    var correct = 0, results = [], topicStats = {};
    inputs.forEach(function (inp, i) {
      var given = normalise(inp.value);
      var expected = normalise(questions[i].a);
      var ok = given === expected;
      if (ok) correct++;
      var topic = questions[i].topic;
      if (topic) {
        if (!topicStats[topic]) topicStats[topic] = { correct: 0, total: 0 };
        topicStats[topic].total++;
        if (ok) topicStats[topic].correct++;
      }
      results.push({ q: questions[i].q, a: questions[i].a, given: inp.value.trim(), ok: ok });
    });
    return { correct: correct, total: questions.length, results: results, topicStats: topicStats };
  }

  // ─── FEEDBACK ────────────────────────────────────────────────────────────────
  function buildFeedback(topicStats) {
    var strong = [], weak = [];
    Object.keys(topicStats).forEach(function (slug) {
      var t = topicStats[slug];
      var pct = t.correct / t.total;
      if (pct >= 0.75) strong.push(slug);
      else if (pct <= 0.25) weak.push(slug);
    });

    if (!strong.length && !weak.length) return '';

    var html = '<div class="ma-feedback">';

    if (strong.length) {
      var names = strong.map(function (s) {
        return '<strong>' + TOPICS[s].name + '</strong>';
      });
      var nameStr = names.length === 1
        ? names[0]
        : names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
      html += '<p class="ma-feedback-good">You did really well on ' + nameStr + '!</p>';
    }

    if (weak.length) {
      html += '<p class="ma-feedback-improve">Try having a look over these for next time:</p>';
      html += '<div class="ma-topic-links">';
      weak.forEach(function (slug) {
        var t = TOPICS[slug];
        if (t.url) {
          html += '<a href="' + t.url + '" class="ma-topic-link">' + t.name + ' &rarr;</a>';
        } else {
          html += '<span class="ma-topic-link ma-topic-nolink">' + t.name + '</span>';
        }
      });
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  // ─── SHOW RESULTS ───────────────────────────────────────────────────────────
  function showResults(data) {
    document.getElementById('ma-test').hidden = true;
    var res = document.getElementById('ma-results');
    res.hidden = false;

    var pct = Math.round(data.correct / data.total * 100);
    document.getElementById('ma-score').textContent =
      data.correct + ' / ' + data.total + ' correct (' + pct + '%)';
    document.getElementById('ma-time-taken').textContent =
      'Time: ' + formatTime(elapsedSeconds);

    var list = document.getElementById('ma-results-list');
    list.innerHTML = '';
    data.results.forEach(function (r) {
      var li = document.createElement('li');
      li.className = 'ma-result-item ' + (r.ok ? 'ma-correct' : 'ma-wrong');
      li.innerHTML =
        '<span class="ma-q-text">' + r.q + '</span>' +
        (r.ok
          ? '<span class="ma-result-mark">\u2713 ' + r.a + '</span>'
          : '<span class="ma-result-mark">\u2717 ' +
            (r.given ? 'You wrote: <em>' + r.given + '</em> &nbsp;&middot;&nbsp; ' : 'No answer &nbsp;&middot;&nbsp; ') +
            'Answer: <strong>' + r.a + '</strong></span>');
      list.appendChild(li);
    });

    document.getElementById('ma-feedback').innerHTML = buildFeedback(data.topicStats);

    // Scroll to top of results
    res.scrollIntoView({ behavior: 'smooth' });
  }

  // ─── START TEST ─────────────────────────────────────────────────────────────
  function startTest(count) {
    document.getElementById('ma-setup').hidden = true;
    document.getElementById('ma-results').hidden = true;
    document.getElementById('ma-test').hidden = false;
    buildTest(count);

    elapsedSeconds = 0;
    document.getElementById('ma-timer').textContent = '0:00';
    var startTime = Date.now();
    timerInterval = setInterval(function () {
      elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      document.getElementById('ma-timer').textContent = formatTime(elapsedSeconds);
    }, 500);

    // Focus first input
    var first = document.querySelector('.ma-answer-input');
    if (first) setTimeout(function () { first.focus(); }, 50);
  }

  // ─── STOP & MARK ────────────────────────────────────────────────────────────
  function stopAndMark() {
    clearInterval(timerInterval);
    showResults(markTest());
  }

  // ─── INIT ────────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {

    // Level select buttons
    document.querySelectorAll('.ma-level-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        startTest(parseInt(this.dataset.maCount, 10));
      });
    });

    // Stop & Mark (top and bottom)
    document.getElementById('ma-stop-btn').addEventListener('click', stopAndMark);
    document.getElementById('ma-stop-btn-bottom').addEventListener('click', stopAndMark);

    // Try again
    document.getElementById('ma-retry-btn').addEventListener('click', function () {
      document.getElementById('ma-results').hidden = true;
      document.getElementById('ma-setup').hidden = false;
    });

    // Enter key: jump to next input
    document.getElementById('ma-questions').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var inputs = Array.prototype.slice.call(document.querySelectorAll('.ma-answer-input'));
        var idx = inputs.indexOf(document.activeElement);
        if (idx >= 0 && idx < inputs.length - 1) {
          inputs[idx + 1].focus();
        }
      }
    });
  });

}());

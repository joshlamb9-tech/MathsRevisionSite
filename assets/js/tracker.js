/* ============================================================
   MATHS REVISION — RAG Confidence Tracker
   localStorage key: 'maths-revision:tracker'
   Namespaced to prevent collision with French revision site
   on the same GitHub Pages origin.

   Browser compatibility: old Safari (school iPads)
   — uses var, IIFE, no ES module syntax
   ============================================================ */

(function () {
  'use strict';

  /* ─── Storage availability check ─── */
  /* Uses write-test pattern — typeof check is insufficient
     for Safari private browsing mode, which throws on setItem */
  function isStorageAvailable() {
    try {
      var test = '__maths-revision-test__';
      localStorage.setItem(test, '1');
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  var available = isStorageAvailable();

  /* ─── Storage key ─── */
  var STORAGE_KEY = 'maths-revision:tracker';

  /* ─── Internal read/write helpers ─── */

  /* readAll() — returns the full ratings object from localStorage.
     Returns {} if storage is unavailable, key is absent, or JSON is corrupt. */
  function readAll() {
    if (!available) return {};
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      return JSON.parse(raw) || {};
    } catch (e) {
      return {};
    }
  }

  /* writeAll(data) — serialises the ratings object to localStorage.
     Silently swallows quota errors (e.g. full storage). */
  function writeAll(data) {
    if (!available) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      /* quota error — silently ignore */
    }
  }

  /* ─── Public API ─── */
  window.tracker = {

    /* available — true if localStorage write-test passed */
    available: available,

    /* getRating(slug) — returns 'red'|'amber'|'green' or null if unset */
    getRating: function (slug) {
      return readAll()[slug] || null;
    },

    /* setRating(slug, rating) — persists a rating for the given slug.
       Pass null to remove the rating for that slug. */
    setRating: function (slug, rating) {
      var data = readAll();
      if (rating === null) {
        delete data[slug];
      } else {
        data[slug] = rating;
      }
      writeAll(data);
    },

    /* reset() — removes the entire tracker key from localStorage */
    reset: function () {
      if (!available) return;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        /* silently ignore */
      }
    }
  };

}());

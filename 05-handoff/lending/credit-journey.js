/* ============================================================
   Lending §4 — Credit journey · interactions + reveal
   Scroll-in reveal · count-ups · repayment / disbursement /
   structure-morph. No traveling or pulsing dots.
   ============================================================ */
(function () {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- formatters ---- */
  function usd0(n) { return "$" + Math.round(n).toLocaleString("en-US"); }
  function intf(n) { return Math.round(n).toLocaleString("en-US"); }
  var FMT = { usd0: usd0, int: intf };

  function countUp(el, to, dur) {
    var fmt = FMT[el.dataset.fmt] || intf;
    if (reduce) { el.textContent = fmt(to); return; }
    var t0 = performance.now(), done = false;
    (function step(t) {
      var k = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(to * e);
      if (k < 1) requestAnimationFrame(step); else done = true;
    })(performance.now());
    setTimeout(function () { if (!done) el.textContent = fmt(to); }, dur + 250);
  }

  /* ---- reveal each tile when it scrolls in (with fallback so it always lands) ---- */
  function revealTile(tile) {
    if (tile.classList.contains("in")) return;
    tile.classList.add("in");
    tile.querySelectorAll("[data-count]").forEach(function (el, i) {
      setTimeout(function () { countUp(el, parseFloat(el.dataset.count), 1200); }, reduce ? 0 : 220 + i * 80);
    });
  }
  var tiles = document.querySelectorAll("[data-tile]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { revealTile(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.2 });
    tiles.forEach(function (t) { io.observe(t); });
    // safety: some embedded iframes never fire IO callbacks — reveal regardless
    setTimeout(function () { tiles.forEach(revealTile); }, 1400);
  } else {
    tiles.forEach(revealTile);
  }

  /* ---- A: repayment → installment reveal ---- */
  document.querySelectorAll("[data-seg]").forEach(function (seg) {
    var sched = seg.parentElement.querySelector("[data-sched]");
    seg.addEventListener("click", function (e) {
      var btn = e.target.closest("button"); if (!btn) return;
      Array.prototype.forEach.call(seg.children, function (b) { b.classList.toggle("on", b === btn); });
      if (sched) sched.classList.toggle("open", btn.dataset.k === "emi");
    });
  });

  /* ---- Disbursement: destination select ---- */
  document.querySelectorAll("[data-dest]").forEach(function (dest) {
    var label = dest.parentElement.querySelector("[data-dest-label]");
    dest.addEventListener("click", function (e) {
      var opt = e.target.closest(".dest__opt"); if (!opt) return;
      Array.prototype.forEach.call(dest.children, function (o) { o.classList.toggle("on", o === opt); });
      if (label) label.textContent = opt.dataset.d;
    });
  });

  /* ---- B: repayment structures — amortization morph ---- */
  // 12 months; each entry [principal, interest] in px (chart height ~132).
  var STRUCT = {
    conventional: { // level payment, interest declines / principal grows
      interest: [30, 28, 26, 24, 21, 19, 16, 14, 11, 9, 6, 4],
      total: 104, stat: "$412"
    },
    flat: { // flat fee — constant interest each period
      interest: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
      total: 104, stat: "$480"
    },
    reducing: { // payment declines as balance reduces; principal ~constant
      interest: [40, 36, 33, 29, 26, 22, 19, 16, 13, 10, 7, 4],
      principalConst: 78, stat: "$300"
    }
  };

  document.querySelectorAll("[data-bars]").forEach(function (host) {
    var bars = [];
    for (var i = 0; i < 12; i++) {
      var bar = document.createElement("div"); bar.className = "rs-bar";
      var segI = document.createElement("div"); segI.className = "rs-seg int";
      var segP = document.createElement("div"); segP.className = "rs-seg prin";
      bar.appendChild(segI); bar.appendChild(segP);
      host.appendChild(bar);
      bars.push({ i: segI, p: segP });
    }
    var tile = host.closest("[data-tile]");
    var side = tile.querySelector("[data-rs]");
    var statEl = tile.querySelector("[data-rs-stat]");

    function paint(key) {
      var s = STRUCT[key];
      bars.forEach(function (b, m) {
        var iv = s.interest[m];
        var pv = s.principalConst != null ? s.principalConst : (s.total - iv);
        b.i.style.height = iv + "px";
        b.p.style.height = pv + "px";
      });
      if (statEl) statEl.textContent = s.stat;
    }

    // initial paint once revealed (so the grow transition fires)
    var painted = false;
    function firstPaint() { if (painted) return; painted = true; setTimeout(function () { paint("conventional"); }, reduce ? 0 : 260); }
    if ("IntersectionObserver" in window) {
      var io2 = new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) { firstPaint(); io2.unobserve(tile); } });
      }, { threshold: 0.2 });
      io2.observe(tile);
      setTimeout(firstPaint, 1400); // safety fallback
    } else { firstPaint(); }

    if (side) side.addEventListener("click", function (e) {
      var btn = e.target.closest("button"); if (!btn) return;
      Array.prototype.forEach.call(side.children, function (b) { b.classList.toggle("on", b === btn); });
      paint(btn.dataset.s);
    });
  });
})();

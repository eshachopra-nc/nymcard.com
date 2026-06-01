/* ============================================================
   Lending page — behaviors
   Reveal · hero config cycle · decisioning viz · migration
   sequence · FAQ accordion · industries rail.
   (§4 tile interactions live in credit-journey.js)
   ============================================================ */
(function () {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- generic reveal: add .in when a [data-rv] block enters view ---- */
  function revealAll() { document.querySelectorAll("[data-rv]").forEach(function (el) { el.classList.add("in"); onReveal(el); }); }
  function onReveal(el) {
    if (el.hasAttribute("data-migration") && !el.__seq) { el.__seq = true; runMigration(el); }
  }
  var blocks = document.querySelectorAll("[data-rv]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); onReveal(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.18 });
    blocks.forEach(function (b) { io.observe(b); });
    setTimeout(revealAll, 1600); // safety fallback for embedded iframes
  } else { revealAll(); }

  /* ---- §1 Hero — config surface cycles through program types ---- */
  var PROGRAMS = {
    bnpl:     { rows: [["Program type","BNPL"],["Credit limit","$2,500"],["Billing cycle","4 payments"],["Repayment","Bi-weekly"]] },
    install:  { rows: [["Program type","Installment"],["Credit limit","$10,000"],["Billing cycle","12 months"],["Repayment","Monthly"]] },
    revolving:{ rows: [["Program type","Revolving"],["Credit limit","$25,000"],["Billing cycle","30 days"],["Repayment","Min 5% / cycle"]] },
    working:  { rows: [["Program type","Working capital"],["Credit limit","$250,000"],["Billing cycle","90 days"],["Repayment","Balloon"]] }
  };
  var cfg = document.querySelector("[data-cfg]");
  if (cfg) {
    var order = ["bnpl","install","revolving","working"];
    var tabs = cfg.querySelectorAll(".cfg__tab");
    var rowsHost = cfg.querySelector(".cfg__rows");
    var idx = 0, timer = null;
    function paintCfg(key) {
      var p = PROGRAMS[key];
      tabs.forEach(function (t) { t.classList.toggle("on", t.dataset.p === key); });
      rowsHost.querySelectorAll(".cfg__row .v").forEach(function (v, i) {
        v.style.opacity = "0";
        setTimeout(function () { v.textContent = p.rows[i][1]; v.style.opacity = "1"; }, reduce ? 0 : 160);
      });
    }
    function advance() { idx = (idx + 1) % order.length; paintCfg(order[idx]); }
    function start() { if (!reduce) timer = setInterval(advance, 3200); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    tabs.forEach(function (t) { t.addEventListener("click", function () { stop(); idx = order.indexOf(t.dataset.p); paintCfg(t.dataset.p); start(); }); });
    cfg.addEventListener("mouseenter", stop); cfg.addEventListener("mouseleave", start);
    paintCfg(order[0]); start();
  }

  /* ---- §5 Underwriting — type out the JSON config ---- */
  var code = document.querySelector("[data-code]");
  if (code) {
    var clips = code.querySelectorAll(".code__cl");
    var coIo = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        coIo.disconnect();
        if (reduce) { clips.forEach(function (c) { c.style.width = "auto"; }); return; }
        clips.forEach(function (c, i) {
          setTimeout(function () { c.style.transition = "width 240ms steps(" + (c.textContent.length || 6) + ")"; c.style.width = "auto"; }, 180 + i * 150);
        });
      });
    }, { threshold: 0.3 });
    coIo.observe(code);
    setTimeout(function () { clips.forEach(function (c) { if (!c.style.width || c.style.width === "0px") c.style.width = "auto"; }); }, 2600);
  }

  /* ---- §8 Migration — light stages in sequence ---- */
  function runMigration(host) {
    var stages = host.querySelectorAll(".fstage");
    stages.forEach(function (s, i) {
      setTimeout(function () { s.classList.add("done"); }, reduce ? 0 : 350 + i * 480);
    });
  }

  /* ---- §9 FAQ accordion ---- */
  document.querySelectorAll(".faq__q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq__item");
      var open = item.classList.contains("open");
      item.classList.toggle("open", !open);
    });
  });

  /* ---- §6 Industries rail arrows ---- */
  document.querySelectorAll("[data-rail-ctrl]").forEach(function (ctrl) {
    var rail = document.querySelector(ctrl.dataset.railCtrl);
    if (!rail) return;
    ctrl.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () {
        var d = b.dataset.dir === "next" ? 1 : -1;
        rail.scrollBy({ left: d * 340, behavior: reduce ? "auto" : "smooth" });
      });
    });
  });
})();

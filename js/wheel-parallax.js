(function () {
  var wrap = document.getElementById("wheelWrap");
  if (!wrap) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var factor = 0.3;

  function update() {
    wrap.style.transform = "translateY(" + window.scrollY * factor + "px)";
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
})();

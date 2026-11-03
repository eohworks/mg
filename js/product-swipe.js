(function () {
  if (!window.matchMedia("(hover: none)").matches) return;

  var cards = Array.prototype.slice.call(document.querySelectorAll(".product-card-sm"));

  cards.forEach(function (card) {
    var imageEl = card.querySelector(".product-card-sm__image");
    var hexagon = card.querySelector(".product-card-sm__image-hexagon");
    var navLine = card.querySelector(".product-card-sm__nav-line");
    if (!imageEl || !hexagon || !navLine) return;

    var startX = null;
    var showingSecond = false;

    function setState(second) {
      showingSecond = second;
      hexagon.classList.toggle("is-active", second);
      navLine.classList.toggle("is-second", second);
    }

    imageEl.addEventListener(
      "touchstart",
      function (e) {
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );

    imageEl.addEventListener(
      "touchend",
      function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        startX = null;

        if (Math.abs(dx) < 30) return;

        if (dx < 0 && !showingSecond) {
          setState(true);
        } else if (dx > 0 && showingSecond) {
          setState(false);
        }
      },
      { passive: true }
    );
  });
})();

(function () {
  if (!window.matchMedia("(hover: hover)").matches) return;

  var images = Array.prototype.slice.call(
    document.querySelectorAll(".product-card-sm__image img[data-hover]")
  );

  images.forEach(function (img) {
    var defaultSrc = img.src;
    var hoverSrc = img.dataset.hover;

    img.addEventListener("mouseenter", function () {
      img.src = hoverSrc;
    });

    img.addEventListener("mouseleave", function () {
      img.src = defaultSrc;
    });
  });
})();

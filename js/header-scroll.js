(function () {
  var header = document.querySelector(".site-header");
  if (!header) return;

  var headerHeight = 0;

  function setHeaderHeight() {
    headerHeight = header.offsetHeight;
    document.documentElement.style.setProperty("--header-height", headerHeight + "px");
  }
  setHeaderHeight();

  if (window.ResizeObserver) {
    new ResizeObserver(setHeaderHeight).observe(header);
  } else {
    window.addEventListener("resize", setHeaderHeight);
  }

  var lastScrollY = window.scrollY;
  var ticking = false;
  var threshold = 4;

  function onScroll() {
    var currentScrollY = window.scrollY;
    var delta = currentScrollY - lastScrollY;

    if (currentScrollY <= headerHeight) {
      header.classList.remove("site-header--hidden");
    } else if (delta > threshold) {
      header.classList.add("site-header--hidden");
    } else if (delta < -threshold) {
      header.classList.remove("site-header--hidden");
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  });
})();

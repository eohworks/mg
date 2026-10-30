(function () {
  var track = document.getElementById("adGrid");
  var nav = document.getElementById("adNav");
  if (!track || !nav) return;

  var dots = Array.prototype.slice.call(nav.querySelectorAll(".ad-nav__dot"));
  var slides = Array.prototype.slice.call(track.querySelectorAll(".ad"));

  function setActive(index) {
    dots.forEach(function (dot, i) {
      dot.classList.toggle("ad-nav__dot--active", i === index);
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      slides[i].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    });
  });

  function closestToCenter() {
    var trackRect = track.getBoundingClientRect();
    var trackCenter = trackRect.left + trackRect.width / 2;
    var closestIndex = 0;
    var closestDist = Infinity;

    slides.forEach(function (slide, i) {
      var r = slide.getBoundingClientRect();
      var slideCenter = r.left + r.width / 2;
      var dist = Math.abs(slideCenter - trackCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });

    return closestIndex;
  }

  var scrollTimeout;
  track.addEventListener("scroll", function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      setActive(closestToCenter());
    }, 100);
  });
})();

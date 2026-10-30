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
      slides[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    });
  });

  var scrollTimeout;
  track.addEventListener("scroll", function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      var slideWidth = slides[0].getBoundingClientRect().width;
      var index = Math.round(track.scrollLeft / slideWidth);
      setActive(index);
    }, 100);
  });
})();

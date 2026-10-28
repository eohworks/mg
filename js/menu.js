(function () {
  var toggle = document.querySelector(".site-header__icon--menu");
  var menu = document.getElementById("menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", function () {
    menu.hidden = !menu.hidden;
  });
})();

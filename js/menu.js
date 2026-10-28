(function () {
  var toggle = document.querySelector(".site-header__icon--menu");
  var menu = document.getElementById("menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", function () {
    menu.hidden = !menu.hidden;
  });

  var wordmark = document.getElementById("wordmark");
  var wheel = document.getElementById("wheel");

  menu.querySelectorAll("[data-wordmark-option]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!button.dataset.asset) return;
      wordmark.src = button.dataset.asset;
      wordmark.dataset.wordmark = button.dataset.wordmarkOption;
      menu.querySelectorAll("[data-wordmark-option]").forEach(function (b) {
        b.classList.toggle("menu__row--active", b === button);
      });
    });
  });

  menu.querySelectorAll("[data-wheel-option]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!button.dataset.asset) return;
      wheel.src = button.dataset.asset;
      wheel.dataset.wheel = button.dataset.wheelOption;
      menu.querySelectorAll("[data-wheel-option]").forEach(function (b) {
        b.classList.toggle("menu__row--active", b === button);
      });
    });
  });
})();

(function () {
  var toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  var html = document.documentElement;

  toggle.addEventListener("click", function () {
    var isDark = html.dataset.theme === "dark";
    html.dataset.theme = isDark ? "light" : "dark";
    toggle.src = isDark ? "assets/asleep.svg" : "assets/light.svg";
    toggle.alt = isDark ? "Switch to dark mode" : "Switch to light mode";
  });
})();

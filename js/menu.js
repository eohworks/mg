(function () {
  var toggle = document.querySelector(".site-header__icon--menu");
  var menu = document.getElementById("menu");
  if (!toggle || !menu) return;

  function closeMenu() {
    menu.hidden = true;
    toggle.src = "assets/menu-icon.svg";
    toggle.alt = "Menu";
  }

  toggle.addEventListener("click", function () {
    menu.hidden = !menu.hidden;
    toggle.src = menu.hidden ? "assets/menu-icon.svg" : "assets/close-large.svg";
    toggle.alt = menu.hidden ? "Menu" : "Close";
  });

  if (window.matchMedia("(hover: hover)").matches) {
    document.addEventListener("click", function (event) {
      if (menu.hidden) return;
      if (menu.contains(event.target) || toggle.contains(event.target)) return;
      closeMenu();
    });
  }

  var wordmark = document.getElementById("wordmark");
  var wheel = document.getElementById("wheel");
  var adGridMark = document.getElementById("adGridMark");

  function setActive(buttons, activeButton) {
    buttons.forEach(function (button) {
      var isActive = button === activeButton;
      button.classList.toggle("menu__row--active", isActive);

      var view = button.querySelector(".menu__row-view");

      if (isActive && !view) {
        view = document.createElement("img");
        view.className = "menu__row-view";
        view.src = "assets/view-icon.svg";
        view.alt = "";
        button.append(view);
      } else if (!isActive && view) {
        view.remove();
      }
    });
  }

  function wire(selector, targetImg, datasetKey, fade) {
    var buttons = Array.prototype.slice.call(menu.querySelectorAll(selector));
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        if (!button.dataset.asset) return;

        function applyChange() {
          targetImg.src = button.dataset.asset;
          targetImg.dataset[datasetKey] = button.dataset[datasetKey + "Option"];
          if (button.dataset.height) {
            targetImg.style.height = button.dataset.height + "px";
          } else {
            targetImg.style.height = "";
          }
          if (adGridMark && button.dataset.markAsset) {
            adGridMark.src = button.dataset.markAsset;
          }
        }

        if (fade) {
          targetImg.style.opacity = 0;
          targetImg.addEventListener(
            "load",
            function () {
              targetImg.style.opacity = 1;
            },
            { once: true }
          );
          applyChange();
        } else {
          applyChange();
        }

        setActive(buttons, button);
      });
    });
  }

  wire("[data-wordmark-option]", wordmark, "wordmark", true);
  wire("[data-wheel-option]", wheel, "wheel", false);

  var hexagonToggle = document.getElementById("hexagonToggle");
  var hexagonToggleIcon = document.getElementById("hexagonToggleIcon");
  var hexagon = document.querySelector(".hero__hexagon");

  if (hexagonToggle && hexagonToggleIcon && hexagon) {
    hexagonToggle.addEventListener("click", function () {
      var isVisible = hexagon.style.display !== "none";
      hexagon.style.display = isVisible ? "none" : "";
      hexagonToggleIcon.src = isVisible ? "assets/toggle-off.svg" : "assets/toggle-on.svg";
    });
  }
})();

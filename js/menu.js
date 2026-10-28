(function () {
  var toggle = document.querySelector(".site-header__icon--menu");
  var menu = document.getElementById("menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", function () {
    menu.hidden = !menu.hidden;
  });

  var wordmark = document.getElementById("wordmark");
  var wheel = document.getElementById("wheel");

  function setActive(buttons, activeButton) {
    buttons.forEach(function (button) {
      var isActive = button === activeButton;
      button.classList.toggle("menu__row--active", isActive);

      var arrow = button.querySelector('img[src*="arrow-right"]');
      var label = button.querySelector(".menu__row-label");

      if (isActive && !label) {
        label = document.createElement("span");
        label.className = "menu__row-label";
        label.append(button.firstChild);
        var view = document.createElement("img");
        view.className = "menu__row-view";
        view.src = "assets/view-icon.svg";
        view.alt = "";
        label.append(view);
        button.insertBefore(label, arrow);
      } else if (!isActive && label) {
        button.insertBefore(label.firstChild, arrow);
        label.remove();
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
})();

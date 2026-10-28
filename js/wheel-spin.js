(function () {
  var wheel = document.querySelector(".hero__wheel");
  if (!wheel) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  requestAnimationFrame(function () {
    wheel.classList.add("is-visible");
  });

  if (reduceMotion) return;

  var degreesPerMs = (360 / 8000) * 0.75;
  var velocity = 0;
  var targetVelocity = 0;
  var angle = 0;
  var lastTime = null;
  var easing = 0.003;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  var introDuration = 1000;
  var introStart = null;

  function introFrame(time) {
    if (introStart === null) introStart = time;
    var t = Math.min((time - introStart) / introDuration, 1);
    angle = easeInOutCubic(t) * 360;

    wheel.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)";

    if (t < 1) {
      requestAnimationFrame(introFrame);
    } else {
      angle = 0;
      requestAnimationFrame(frame);
    }
  }

  function frame(time) {
    if (lastTime === null) lastTime = time;
    var dt = time - lastTime;
    lastTime = time;

    velocity += (targetVelocity - velocity) * Math.min(easing * dt, 1);
    angle = (angle + velocity * dt) % 360;

    wheel.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)";

    requestAnimationFrame(frame);
  }

  wheel.addEventListener("mouseenter", function () {
    targetVelocity = degreesPerMs;
  });

  wheel.addEventListener("mouseleave", function () {
    targetVelocity = 0;
  });

  requestAnimationFrame(introFrame);
})();

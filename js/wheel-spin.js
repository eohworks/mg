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

  var introDuration = 1000;
  var introStart = null;
  var introLastTime = null;

  function introFrame(time) {
    if (introStart === null) {
      introStart = time;
      introLastTime = time;
    }
    var elapsed = time - introStart;
    var dt = time - introLastTime;
    introLastTime = time;

    var t = Math.min(elapsed / introDuration, 1);
    var introVelocity = degreesPerMs * Math.sin(Math.PI * t);
    angle = (angle + introVelocity * dt) % 360;

    wheel.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)";

    if (t < 1) {
      requestAnimationFrame(introFrame);
    } else {
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

  var isTouch = window.matchMedia("(hover: none)").matches;

  if (isTouch) {
    var tapSpinning = false;
    wheel.addEventListener("click", function () {
      tapSpinning = !tapSpinning;
      targetVelocity = tapSpinning ? degreesPerMs : 0;
    });
  } else {
    wheel.addEventListener("mouseenter", function () {
      targetVelocity = degreesPerMs;
    });

    wheel.addEventListener("mouseleave", function () {
      targetVelocity = 0;
    });
  }

  requestAnimationFrame(introFrame);
})();

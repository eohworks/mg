(function () {
  var wheel = document.querySelector(".hero__wheel");
  if (!wheel) return;

  var wheelGlass = document.getElementById("wheelGlass");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  requestAnimationFrame(function () {
    wheel.classList.add("is-visible");
    if (wheelGlass) wheelGlass.classList.add("is-visible");
  });

  if (reduceMotion) return;

  function isMonogram() {
    return wheel.dataset.wheel === "monogram" || wheel.dataset.wheel === "monogram-m";
  }

  var degreesPerMs = (360 / 10000) * 0.75;
  var velocity = 0;
  var targetVelocity = 0;
  var angle = 0;
  var lastTime = null;
  var easing = 0.003;

  var pulseDuration = 1000;

  function pulse(onComplete) {
    if (isMonogram()) {
      wheel.style.transform = "translate(-50%, -50%) rotate(0deg)";
      if (onComplete) onComplete();
      return;
    }

    var start = null;
    var last = null;

    function step(time) {
      if (isMonogram()) {
        wheel.style.transform = "translate(-50%, -50%) rotate(0deg)";
        return;
      }

      if (start === null) {
        start = time;
        last = time;
      }
      var elapsed = time - start;
      var dt = time - last;
      last = time;

      var t = Math.min(elapsed / pulseDuration, 1);
      var pulseVelocity = degreesPerMs * Math.sin(Math.PI * t);
      angle = (angle + pulseVelocity * dt) % 360;

      wheel.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)";

      if (t < 1) {
        requestAnimationFrame(step);
      } else if (onComplete) {
        onComplete();
      }
    }

    requestAnimationFrame(step);
  }

  function frame(time) {
    if (isMonogram()) {
      wheel.style.transform = "translate(-50%, -50%) rotate(0deg)";
      lastTime = null;
      requestAnimationFrame(frame);
      return;
    }

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
    pulse(function () {
      setInterval(pulse, 4000);
    });
  } else {
    wheel.addEventListener("mouseenter", function () {
      if (!isMonogram()) targetVelocity = degreesPerMs;
    });

    wheel.addEventListener("mouseleave", function () {
      targetVelocity = 0;
    });

    pulse(function () {
      requestAnimationFrame(frame);
    });
  }
})();

(function () {
  var wheel = document.querySelector(".hero__wheel");
  if (!wheel) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  var degreesPerMs = 360 / 8000;
  var velocity = 0;
  var targetVelocity = 0;
  var angle = 0;
  var lastTime = null;
  var easing = 0.003;

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

  requestAnimationFrame(frame);
})();

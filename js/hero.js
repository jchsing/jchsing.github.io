/* pins the name and cross-fades the intro block into the bio as you scroll.
   only runs when there's vertical room for it; otherwise the hero is just
   a normal stacked section and nothing here applies. */

(() => {
  const stage = document.getElementById("hero-stage");
  if (!stage) return;

  const paneA = stage.querySelector(".hero-swap__a");
  const paneB = stage.querySelector(".hero-swap__b");

  const fits = window.matchMedia("(min-width: 768px) and (min-height: 640px)");
  const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");

  const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
  // eased ramp between two scroll-progress points
  const ramp = (p, from, to) => clamp01((p - from) / (to - from));

  let ticking = false;
  let active = false;

  function update() {
    ticking = false;
    if (!active) return;

    const top = stage.offsetTop;
    const travel = stage.offsetHeight - window.innerHeight;
    if (travel <= 0) return;

    const p = clamp01((window.scrollY - top) / travel);

    const a = 1 - ramp(p, 0.04, 0.42); // intro fades out
    const b = ramp(p, 0.34, 0.72);     // bio fades in

    stage.style.setProperty("--a", a.toFixed(3));
    stage.style.setProperty("--b", b.toFixed(3));

    const phase = b > 0.5 ? "bio" : "intro";
    if (stage.dataset.phase !== phase) {
      stage.dataset.phase = phase;
      // keep the invisible half out of the tab order and the a11y tree
      if (paneA) paneA.inert = phase === "bio";
      if (paneB) paneB.inert = phase === "intro";
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function enable() {
    if (active) return;
    active = true;
    stage.classList.add("is-pinned");
    if (paneB) paneB.inert = true;   // bio starts hidden
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
  }

  function disable() {
    if (!active) return;
    active = false;
    window.removeEventListener("scroll", onScroll);
    stage.classList.remove("is-pinned");
    stage.style.removeProperty("--a");
    stage.style.removeProperty("--b");
    stage.dataset.phase = "intro";
    // plain stacked flow: both halves are real content again
    if (paneA) paneA.inert = false;
    if (paneB) paneB.inert = false;
  }

  function sync() {
    fits.matches && motion.matches ? enable() : disable();
  }

  sync();
  fits.addEventListener("change", sync);
  motion.addEventListener("change", sync);
  window.addEventListener("resize", () => {
    if (active) update();
  }, { passive: true });
})();

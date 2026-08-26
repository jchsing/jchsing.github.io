/* photo carousel: click the dots, use the arrows, arrow keys, or swipe.
   works on any .carousel; no autoplay, so it never moves on its own. */

(() => {
  const carousels = document.querySelectorAll(".carousel");
  if (!carousels.length) return;

  carousels.forEach((root) => {
    const track = root.querySelector(".carousel__track");
    const slides = [...root.querySelectorAll(".carousel__slide")];
    const dots = [...root.querySelectorAll(".carousel__dot")];
    const prev = root.querySelector(".carousel__arrow--prev");
    const next = root.querySelector(".carousel__arrow--next");
    const status = root.querySelector("[data-carousel-status]");
    if (!track || slides.length < 2) return;

    let index = 0;

    function go(to, { focusDot = false } = {}) {
      index = (to + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;

      slides.forEach((s, i) => {
        // keep off-screen slides out of the tab order and the a11y tree
        s.inert = i !== index;
      });

      dots.forEach((d, i) => {
        if (i === index) d.setAttribute("aria-current", "true");
        else d.removeAttribute("aria-current");
      });

      if (status) status.textContent = `Photo ${index + 1} of ${slides.length}`;
      if (focusDot && dots[index]) dots[index].focus();
    }

    dots.forEach((dot) =>
      dot.addEventListener("click", () => go(Number(dot.dataset.index)))
    );
    prev?.addEventListener("click", () => go(index - 1));
    next?.addEventListener("click", () => go(index + 1));

    // arrow keys, once the carousel has focus somewhere inside it
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1, { focusDot: true });
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(index + 1, { focusDot: true });
      }
    });

    // swipe
    let startX = null;
    let startY = null;
    root.addEventListener(
      "touchstart",
      (e) => {
        startX = e.changedTouches[0].clientX;
        startY = e.changedTouches[0].clientY;
      },
      { passive: true }
    );
    root.addEventListener(
      "touchend",
      (e) => {
        if (startX === null) return;
        const dx = e.changedTouches[0].clientX - startX;
        const dy = e.changedTouches[0].clientY - startY;
        // ignore mostly-vertical drags so page scrolling still works
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
          go(dx < 0 ? index + 1 : index - 1);
        }
        startX = startY = null;
      },
      { passive: true }
    );

    root.dataset.ready = "true";
    go(0);
  });
})();

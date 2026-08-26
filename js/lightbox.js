/* click a cover to open it large. built on <dialog>, so Escape,
   focus trapping and focus restore come from the browser. */

(() => {
  let dialog = null;
  let img = null;

  // don't leave a big image decoded once it's dismissed
  const drop = () => img && img.removeAttribute("src");

  function close() {
    drop();
    if (dialog && dialog.open) dialog.close();
  }

  function build() {
    dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.innerHTML = `
      <button class="lightbox__close" type="button" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18"/>
        </svg>
      </button>
      <img class="lightbox__img" alt="">`;
    document.body.appendChild(dialog);
    img = dialog.querySelector(".lightbox__img");

    dialog.querySelector(".lightbox__close")
      .addEventListener("click", close);

    // clicking the backdrop (i.e. the dialog itself, outside the image) closes
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) close();
    });

    // the close/cancel events don't fire reliably everywhere, so the src is
    // dropped in close() itself; these are just belt and braces for Escape.
    dialog.addEventListener("close", drop);
    dialog.addEventListener("cancel", drop);
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-lightbox]");
    if (!trigger) return;
    e.preventDefault();

    if (!dialog) build();
    img.src = trigger.dataset.lightbox;
    img.alt = trigger.dataset.lightboxAlt || "";

    // showModal gives us Escape-to-close and focus containment for free
    if (typeof dialog.showModal === "function") dialog.showModal();
    else window.open(trigger.dataset.lightbox, "_blank", "noopener");
  });
})();

/* shared chrome: root-relative paths, nav, sticky header, footer year */

// pages sit at two depths (/ and /projects/<slug>/), so every generated
// path is resolved against data-root on <body>.
const ROOT = document.body.dataset.root ?? "";
const rel = (p) => ROOT + String(p).replace(/^\/+/, "");

/* ---- mobile nav ---- */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.dataset.open === "true";
    nav.dataset.open = String(!open);
    toggle.setAttribute("aria-expanded", String(!open));
  });

  // close after tapping a link on mobile
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a") && window.innerWidth <= 760) {
      nav.dataset.open = "false";
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ---- "academic portfolio" dropdown ---- */
function initNavDropdown() {
  const groups = document.querySelectorAll(".nav-group");

  groups.forEach((group) => {
    const toggle = group.querySelector(".nav-group__toggle");
    if (!toggle) return;

    const setOpen = (open) => {
      group.dataset.open = String(open);
      toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      setOpen(group.dataset.open !== "true");
    });

    // pointer users get hover, but only on the desktop layout
    group.addEventListener("mouseenter", () => {
      if (window.matchMedia("(min-width: 761px)").matches) setOpen(true);
    });
    group.addEventListener("mouseleave", () => {
      if (window.matchMedia("(min-width: 761px)").matches) setOpen(false);
    });

    group.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.focus();
      }
    });
  });

  document.addEventListener("click", (e) => {
    groups.forEach((g) => {
      if (!g.contains(e.target)) g.dataset.open = "false";
    });
  });
}

/* ---- hairline under the header once you scroll ---- */
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () =>
    header.classList.toggle("is-stuck", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initFooterYear() {
  const el = document.getElementById("copyright-year");
  if (el) el.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initNavDropdown();
  initStickyHeader();
  initFooterYear();
});

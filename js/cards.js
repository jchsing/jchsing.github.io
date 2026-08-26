/* project cards rendered from data/projects.json  (mh's json-driven pattern) */

const CAT_SLUG = (c) => c.replace(/\s+/g, "-").toLowerCase();

function projectCard(p) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.category = p.category;

  const fit = p.coverFit === "contain" ? " card__media--contain" : "";
  const tools = (p.tools || [])
    .map((t) => `<span class="tag">${t}</span>`)
    .join("");

  card.innerHTML = `
    <div class="card__media${fit}">
      <img src="${rel(p.cover)}" alt="" loading="lazy" decoding="async">
    </div>
    <div class="card__body">
      <h3 class="card__title">
        <a class="card__link" href="${rel("projects/" + p.slug + "/")}">${p.title}</a>
      </h3>
      <p class="card__desc">${p.blurb}</p>
      <div class="card__meta">
        <span class="tag tag--${CAT_SLUG(p.category)}">${p.category}</span>
        ${tools}
      </div>
    </div>`;
  return card;
}

function moreCard(label, href, cta) {
  const el = document.createElement("article");
  el.className = "card card--more";
  el.innerHTML = `
    <p>${label}</p>
    <a class="arrow-link card__link" href="${rel(href)}">${cta} <span>&rarr;</span></a>`;
  return el;
}

async function loadProjects() {
  const res = await fetch(rel("data/projects.json"));
  if (!res.ok) throw new Error(`projects.json: ${res.status}`);
  return res.json();
}

/* ---- home page: featured only, capped, with a "see all" card ---- */
async function initFeatured() {
  const container = document.getElementById("featured-projects");
  if (!container) return;

  const limit = Number(container.dataset.limit || 3);
  const projects = await loadProjects();

  projects
    .filter((p) => p.featured)
    .slice(0, limit)
    .forEach((p) => container.appendChild(projectCard(p)));

  container.appendChild(
    moreCard("want to see the rest?", "creative.html", "all creative work")
  );
}

/* ---- creative portfolio: everything, with category filters ---- */
async function initCreativeGrid() {
  const container = document.getElementById("all-projects");
  if (!container) return;

  const projects = await loadProjects();
  projects.forEach((p) => container.appendChild(projectCard(p)));

  const filterBar = document.getElementById("project-filters");
  if (!filterBar) return;

  const categories = [...new Set(projects.map((p) => p.category))];

  const makeFilter = (label, value, pressed) => {
    const b = document.createElement("button");
    b.className = "filter";
    b.type = "button";
    b.textContent = label;
    b.dataset.filter = value;
    b.setAttribute("aria-pressed", String(pressed));
    return b;
  };

  filterBar.appendChild(makeFilter("everything", "all", true));
  categories.forEach((c) => filterBar.appendChild(makeFilter(c, c, false)));

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;

    filterBar
      .querySelectorAll(".filter")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));

    const want = btn.dataset.filter;
    container.querySelectorAll(".card").forEach((card) => {
      const show = want === "all" || card.dataset.category === want;
      card.hidden = !show;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initFeatured().catch((e) => console.error(e));
  initCreativeGrid().catch((e) => console.error(e));
});

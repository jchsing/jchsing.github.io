/* project cards */

const CAT_SLUG = (c) => String(c).trim().replace(/\s+/g, "-").toLowerCase();

// a project may carry one category or several; always work with a list
const CATS = (p) =>
  (Array.isArray(p.category) ? p.category : [p.category])
    .filter(Boolean)
    .map((c) => String(c).trim());

function projectCard(p) {
  const card = document.createElement("article");
  card.className = "card";
  const cats = CATS(p);
  // pipe-delimited so a filter can test membership without partial matches
  card.dataset.categories = `|${cats.map(CAT_SLUG).join("|")}|`;

  const fit = p.coverFit === "contain" ? " card__media--contain" : "";
  const tools = (p.tools || [])
    .map((t) => `<span class="tag">${t}</span>`)
    .join("");

  card.innerHTML = `
    <div class="card__media${fit}">
      <div class="card__media-inner">
        <img src="${rel(p.cover)}" alt="" loading="lazy" decoding="async">
      </div>
    </div>
    <div class="card__body">
      <h3 class="card__title">
        <a class="card__link" href="${rel("projects/" + p.slug + "/")}">${p.title}</a>
      </h3>
      <p class="card__desc">${p.blurb}</p>
      <p class="card__tools">${p.tools.join(", ")}</p>
      <div class="card__meta">
        ${cats.map((c) => `<span class="tag tag--${CAT_SLUG(c)}">${c}</span>`).join("")}
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

  const projects = await loadProjects();

  // hand-pick by adding "featured": true in data/projects.json.
  // every flagged project shows, in file order — data-limit is only the
  // fallback for when nothing is flagged.
  const picked = projects.filter((p) => p.featured);
  const chosen = picked.length
    ? picked
    : projects.slice(0, Number(container.dataset.limit || 3));

  chosen.forEach((p) => container.appendChild(projectCard(p)));

  // removed the "see all" card because the link is now a link at the bottom of the section
  // container.appendChild(
  //   moreCard("want to see more?", "creative.html", "all creative work")
  // );
}

/* ---- creative portfolio: everything, with category filters ---- */
async function initCreativeGrid() {
  const container = document.getElementById("all-projects");
  if (!container) return;

  const projects = await loadProjects();
  projects.forEach((p) => container.appendChild(projectCard(p)));

  const filterBar = document.getElementById("project-filters");
  if (!filterBar) return;

  const categories = [...new Set(projects.flatMap(CATS))].sort();

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
  categories.forEach((c) => filterBar.appendChild(makeFilter(c, CAT_SLUG(c), false)));

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;

    filterBar
      .querySelectorAll(".filter")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));

    const want = btn.dataset.filter;
    container.querySelectorAll(".card").forEach((card) => {
      const show =
        want === "all" || card.dataset.categories.includes(`|${want}|`);
      card.hidden = !show;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initFeatured().catch((e) => console.error(e));
  initCreativeGrid().catch((e) => console.error(e));
});

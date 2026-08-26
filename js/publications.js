/* publications rendered from data/publications.json */

const ME = /Julianna\s+C?\.?\s*Hsing/g;

const ARROW = '<span class="pub__link-arrow" aria-hidden="true">&rarr;</span>';

const escapeHtml = (s) =>
  String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );

// bold my own name in the author string
const highlightMe = (authors) =>
  escapeHtml(authors).replace(ME, (m) => `<span class="me">${m}</span>`);

function venueLine(p) {
  let s = `<em>${escapeHtml(p.venue)}</em>`;
  if (p.volume) {
    s += `, ${escapeHtml(p.volume)}`;
    if (p.number) s += `(${escapeHtml(p.number)})`;
  }
  return `${s}. ${p.year}.`;
}

function pubEntry(p, { showYear = true } = {}) {
  const el = document.createElement("article");
  const classes = ["pub"];
  if (p.cover) classes.push("pub--with-cover");
  el.className = classes.join(" ");

  const coverAlt = `Cover of ${p.venue}`;
  const cover = p.cover
    ? `<div class="pub__media">
         <button class="pub__cover-btn" type="button"
                 data-lightbox="${rel(p.cover)}"
                 data-lightbox-alt="${escapeHtml(coverAlt)}"
                 aria-label="Enlarge ${escapeHtml(coverAlt)}">
           <img class="pub__cover" src="${rel(p.cover)}" alt="${escapeHtml(coverAlt)}" loading="lazy" decoding="async">
         </button>
       </div>`
    : "";

  const links = [];
  if (p.url) links.push(`<a class="pub__link" href="${p.url}" target="_blank" rel="noopener">View publication${ARROW}</a>`);
  if (p.pdf) {
    const href = /^https?:/.test(p.pdf) ? p.pdf : rel(p.pdf);
    links.push(`<a class="pub__link" href="${href}" target="_blank" rel="noopener">PDF${ARROW}</a>`);
  }

  // the year sits in its own gutter, printed once per run of the same year
  el.innerHTML = `
    <p class="pub__year">${showYear ? p.year : ""}</p>
    <div class="pub__body">
      <p class="pub__type">${escapeHtml(p.type)}</p>
      <h3 class="pub__title">${
        p.url
          ? `<a href="${p.url}" target="_blank" rel="noopener">${escapeHtml(p.title)}</a>`
          : escapeHtml(p.title)
      }</h3>
      <p class="pub__authors">${highlightMe(p.authors)}</p>
      <p class="pub__venue">${venueLine(p)}</p>
      <div class="pub__links">${links.join("")}</div>
    </div>
    ${cover}`;
  return el;
}

async function loadPublications() {
  const res = await fetch(rel("data/publications.json"));
  if (!res.ok) throw new Error(`publications.json: ${res.status}`);
  return res.json();
}

/* ---- full list on publications.html ---- */
async function initPublicationList() {
  const container = document.getElementById("publication-list");
  if (!container) return;

  const pubs = await loadPublications();
  let lastYear = null;
  pubs.forEach((p) => {
    const showYear = p.year !== lastYear;
    lastYear = p.year;
    container.appendChild(pubEntry(p, { showYear }));
  });

  const count = document.getElementById("publication-count");
  if (count) count.textContent = pubs.length;
}

/* ---- short list on the home page ---- */
async function initSelectedPublications() {
  const container = document.getElementById("selected-publications");
  if (!container) return;

  const limit = Number(container.dataset.limit || 3);
  const pubs = await loadPublications();
  let lastYear = null;
  pubs.slice(0, limit).forEach((p) => {
    const showYear = p.year !== lastYear;
    lastYear = p.year;
    container.appendChild(pubEntry(p, { showYear }));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initPublicationList().catch((e) => console.error(e));
  initSelectedPublications().catch((e) => console.error(e));
});

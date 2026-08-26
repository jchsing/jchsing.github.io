/* publications rendered from data/publications.json
   ported from the framer Publications component */

const ME = /Julianna\s+C?\.?\s*Hsing/g;

const escapeHtml = (s) =>
  String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );

// bold my own name in the author string, the way the framer version did
const highlightMe = (authors) =>
  escapeHtml(authors).replace(ME, (m) => `<span class="me">${m}</span>`);

function venueLine(p) {
  let s = `<em>${escapeHtml(p.venue)}</em>`;
  if (p.volume) s += ` ${escapeHtml(p.volume)}`;
  if (p.number) s += `(${escapeHtml(p.number)})`;
  return `${s}, ${p.year}`;
}

function pubEntry(p) {
  const el = document.createElement("article");
  el.className = "pub";

  const cover = p.cover
    ? `<img class="pub__cover" src="${rel(p.cover)}" alt="" loading="lazy" decoding="async">`
    : `<div class="pub__cover pub__cover--none" aria-hidden="true">${p.year}</div>`;

  const links = [];
  if (p.url) links.push(`<a class="pub__link" href="${p.url}" target="_blank" rel="noopener">journal</a>`);
  if (p.pdf) {
    const href = /^https?:/.test(p.pdf) ? p.pdf : rel(p.pdf);
    links.push(`<a class="pub__link" href="${href}" target="_blank" rel="noopener">pdf</a>`);
  }

  el.innerHTML = `
    <div>${cover}</div>
    <div>
      <h3 class="pub__title">${
        p.url
          ? `<a href="${p.url}" target="_blank" rel="noopener">${escapeHtml(p.title)}</a>`
          : escapeHtml(p.title)
      }</h3>
      <p class="pub__authors">${highlightMe(p.authors)}</p>
      <p class="pub__venue">${venueLine(p)}</p>
      <div class="pub__links">${links.join("")}</div>
    </div>`;
  return el;
}

async function loadPublications() {
  const res = await fetch(rel("data/publications.json"));
  if (!res.ok) throw new Error(`publications.json: ${res.status}`);
  return res.json();
}

/* ---- full list on publications.html, grouped by year ---- */
async function initPublicationList() {
  const container = document.getElementById("publication-list");
  if (!container) return;

  const pubs = await loadPublications();
  const byYear = new Map();
  pubs.forEach((p) => {
    if (!byYear.has(p.year)) byYear.set(p.year, []);
    byYear.get(p.year).push(p);
  });

  [...byYear.keys()]
    .sort((a, b) => b - a)
    .forEach((year) => {
      const h = document.createElement("h2");
      h.className = "pub-year";
      h.textContent = year;
      container.appendChild(h);
      byYear.get(year).forEach((p) => container.appendChild(pubEntry(p)));
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
  pubs.slice(0, limit).forEach((p) => container.appendChild(pubEntry(p)));
}

document.addEventListener("DOMContentLoaded", () => {
  initPublicationList().catch((e) => console.error(e));
  initSelectedPublications().catch((e) => console.error(e));
});

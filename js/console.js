/* the console from the framer site, made interactive.
   types itself out, then takes input: 1 -> academic, 2 -> creative.
   the nav and the pill buttons still do the same thing, so this is
   a shortcut, never the only way through. */

const INTRO = [
  '"hello, thanks for stopping by!"',
  '"take a look around."',
  "",
  '"— julianna :)"',
];

const ROUTES = {
  1: { label: "academic portfolio", href: "publications.html" },
  2: { label: "creative portfolio", href: "creative.html" },
};

const TYPE_MS = 34;
const LINE_PAUSE = 340;

const el = (cls, text) => {
  const n = document.createElement("div");
  n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

function typeInto(node, text, speed) {
  return new Promise((resolve) => {
    if (!text) return resolve();
    let i = 0;
    (function tick() {
      node.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, speed);
      else resolve();
    })();
  });
}

class Console {
  constructor(root) {
    this.root = root;
    this.body = root.querySelector(".console__body");
    this.replay = root.querySelector(".console__replay");
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.busy = false;
    this.buffer = "";

    this.input = root.querySelector(".console__input");
    this.bind();
  }

  /* ---------- output helpers ---------- */

  echoLine(text, cls = "console__text") {
    const row = el("console__line");
    row.append(el("console__idx", "[1]"), el(cls, text));
    this.body.appendChild(row);
    return row;
  }

  note(html) {
    const row = el("console__line console__line--note");
    row.innerHTML = html;
    this.body.appendChild(row);
    return row;
  }

  /* the live prompt the visitor types into */
  drawPrompt() {
    this.promptRow = el("console__line console__line--prompt");
    this.promptRow.innerHTML =
      '<span class="console__prompt">&gt;</span>' +
      '<span class="console__typed"></span>' +
      '<span class="console__caret"></span>';
    this.body.appendChild(this.promptRow);
    this.typed = this.promptRow.querySelector(".console__typed");
    this.root.dataset.ready = "true";
  }

  /* ---------- the run ---------- */

  async run({ instant = false } = {}) {
    if (this.busy) return;
    this.busy = true;
    this.buffer = "";
    this.body.innerHTML = "";
    this.root.dataset.ready = "false";

    for (const line of INTRO) {
      if (!line) {
        this.body.appendChild(el("console__line", " "));
        continue;
      }
      const row = this.echoLine("");
      const target = row.lastChild;
      if (instant) target.textContent = line;
      else {
        await typeInto(target, line, TYPE_MS);
        await new Promise((r) => setTimeout(r, LINE_PAUSE));
      }
    }

    this.note(
      '<span class="console__hint">where would you like to go? ' +
        'press <button class="console__key" data-choice="1">1</button> for ' +
        '<button class="console__opt" data-choice="1">academic</button>, ' +
        '<button class="console__key" data-choice="2">2</button> for ' +
        '<button class="console__opt" data-choice="2">creative</button></span>'
    );

    this.drawPrompt();
    this.busy = false;
  }

  /* ---------- input ---------- */

  render() {
    if (this.typed) this.typed.textContent = this.buffer;
  }

  accept(ch) {
    if (this.root.dataset.ready !== "true") return;
    this.buffer = (this.buffer + ch).slice(-12);
    this.render();
  }

  backspace() {
    this.buffer = this.buffer.slice(0, -1);
    this.render();
  }

  submit(explicit) {
    if (this.root.dataset.ready !== "true") return;
    const raw = (explicit ?? this.buffer).trim().toLowerCase();
    if (!raw) return;

    // accept "1", "2", or the words themselves
    let key = null;
    if (raw === "1" || raw.startsWith("aca")) key = 1;
    else if (raw === "2" || raw.startsWith("cre")) key = 2;

    if (!key) {
      this.buffer = "";
      this.render();
      this.promptRow?.remove();
      this.echoLine(`"${raw}" — not a thing i know. try 1 or 2.`, "console__error");
      this.drawPrompt();
      this.body.scrollTop = this.body.scrollHeight;
      return;
    }

    const route = ROUTES[key];
    this.root.dataset.ready = "false";
    this.buffer = "";
    this.render();
    this.promptRow?.querySelector(".console__caret")?.remove();
    this.note(
      `<span class="console__idx">[1]</span><span class="console__ok">opening ${route.label}…</span>`
    );
    this.body.scrollTop = this.body.scrollHeight;

    const go = () => (window.location.href = route.href);
    this.reduced ? go() : setTimeout(go, 420);
  }

  bind() {
    // a real (visually hidden) input so mobile keyboards and IME work
    this.input?.addEventListener("input", (e) => {
      const v = e.target.value;
      e.target.value = "";
      for (const ch of v) this.accept(ch);
    });

    this.input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.submit();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        this.backspace();
      }
    });

    // clicking the console focuses the hidden input
    this.root.addEventListener("click", (e) => {
      const choice = e.target.closest("[data-choice]");
      if (choice) {
        e.preventDefault();
        this.submit(choice.dataset.choice);
        return;
      }
      if (!e.target.closest(".console__replay")) this.input?.focus();
    });

    // typing anywhere on the page while the hero console is on screen
    document.addEventListener("keydown", (e) => {
      if (this.root.dataset.ready !== "true") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (!this.root.getBoundingClientRect().height) return;

      if (e.key === "Enter") {
        e.preventDefault();
        this.submit();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        this.backspace();
      } else if (e.key.length === 1) {
        this.accept(e.key);
      }
    });

    this.replay?.addEventListener("click", (ev) => {
      ev.stopPropagation();
      this.run({ instant: this.reduced });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".console");
  if (!root) return;

  // the console is above the fold by design, so just run it — no
  // scroll gating, which would strand it if the viewport reports oddly.
  const c = new Console(root);
  c.run({ instant: c.reduced });
});

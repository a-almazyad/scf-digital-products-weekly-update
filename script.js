/* SCF Digital Products — weekly deck behaviour
   - Fixed 1600×900 stage scaled to the viewport
   - Slide navigation (keyboard, buttons, URL hash)
   - Stage progress bars for funder / partner cards
   - Interactive release scope (data in release-data.js)
   - FinOps screenshot carousel and roadmap dialogs */

const stage = document.getElementById("stage");
const slides = Array.from(document.querySelectorAll(".slide"))
  .sort((a, b) => Number(a.dataset.slide) - Number(b.dataset.slide));
const prevButton = document.getElementById("prev-slide");
const nextButton = document.getElementById("next-slide");
const currentLabel = document.getElementById("current-slide");
const totalLabel = document.getElementById("total-slides");
const progressFill = document.getElementById("progress-fill");

/* ---------- Scaling ---------- */
function fitStage() {
  const scale = Math.min(window.innerWidth / 1600, window.innerHeight / 900);
  stage.style.setProperty("--scale", scale);
}
window.addEventListener("resize", fitStage);
fitStage();

/* ---------- Page numbers ---------- */
slides.forEach((slide, i) => {
  const pg = slide.querySelector(".pg");
  if (pg) pg.textContent = `${String(i + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
});

/* ---------- Stage progress bars ----------
   <div data-stages="3"></div>               → 3 of 6 default stages complete
   <div data-stages="5" data-labels="A,B,C,D,E"></div> */
const defaultStages = ["Req.", "SDD", "Dev", "Test", "Pilot", "Live"];
document.querySelectorAll("[data-stages]").forEach((el) => {
  const labels = el.dataset.labels ? el.dataset.labels.split(",") : defaultStages;
  const done = Math.max(0, Math.min(labels.length, Number(el.dataset.stages)));
  const state = (i) => (i < done ? "on" : i === done ? "now" : "");
  el.style.setProperty("--n", labels.length);
  el.setAttribute("role", "img");
  el.setAttribute("aria-label", done >= labels.length
    ? `All ${labels.length} stages complete`
    : `${done} of ${labels.length} stages complete; current stage ${labels[done]}`);
  el.innerHTML =
    `<div class="stages" style="--n:${labels.length}">${labels.map((_, i) => `<span class="${state(i)}"></span>`).join("")}</div>` +
    `<div class="stage-labels" style="--n:${labels.length}">${labels.map((l, i) => `<span class="${state(i)}">${l}</span>`).join("")}</div>`;
});


/* ---------- Module ticket bars: data-bar="approved:8,uat:1" ---------- */
const barLabels = { production: "live", approved: "approved", uat: "UAT", testing: "staging", progress: "dev done", devnow: "in dev", todo: "to do", hold: "on hold" };
document.querySelectorAll("[data-bar]").forEach((el) => {
  const parts = el.dataset.bar.split(",").map((p) => p.split(":")).map(([t, c]) => [t, Number(c)]).filter(([, c]) => c > 0);
  const total = parts.reduce((a, [, c]) => a + c, 0);
  const done = parts.filter(([t]) => t === "approved" || t === "production").reduce((a, [, c]) => a + c, 0);
  const lead = done ? `${done}/${total} approved` : parts[0] ? `${parts[0][1]}/${total} ${barLabels[parts[0][0]] || parts[0][0]}` : "";
  el.innerHTML = `<span class="bar">${parts.map(([t, c]) => `<i class="s-${t === "devnow" ? "progress" : t}" style="width:${(c / total) * 100}%" title="${barLabels[t] || t}: ${c}"></i>`).join("")}</span><small>${lead}</small>`;
});

/* ---------- Release scope ---------- */
const releaseScopeRoot = document.querySelector("[data-release-scope]");
const RELEASES = window.RELEASE_DATA || {};
const releaseKeys = ["r65", "r66"];
const releaseLabels = { r65: "R65", r66: "R66" };
const themeLabels = { scf: "SCF", finops: "SCF FinOps", admin: "Admin", crm: "CRM", borrower: "Borrower" };
const signalChip = { complete: "done", progress: "ready", testing: "active", planned: "idle", hold: "hold" };
const doneTones = new Set(["approved", "production"]);
const pageSize = 6;
let activeTheme = "scf";
let activeRelease = "r65";
let activePage = 0;

const itemsFor = (release, theme) => (RELEASES[release] || []).filter((item) => item.theme === theme);
const ticketTotals = (items) => items.reduce((acc, item) => {
  item.statuses.forEach(([, count, tone]) => {
    acc.total += count;
    if (doneTones.has(tone)) acc.done += count;
  });
  return acc;
}, { done: 0, total: 0 });
const labelTone = (label) => (/spill|pending|remove|hold|waiting|don't|not-provided|qa-issues/i.test(label) ? "risk" : "");
const keyOf = (item) => (item.df ? `${item.id} · ${item.df}` : item.id);

function renderKpis() {
  const r65 = ticketTotals(RELEASES.r65 || []);
  const r66 = ticketTotals(RELEASES.r66 || []);
  const pct = r65.total ? Math.round((r65.done / r65.total) * 100) : 0;
  const set = (k, html) => { const el = document.querySelector(`[data-kpi="${k}"]`); if (el) el.innerHTML = html; };
  set("r65-pct", `${pct}%<small>approved</small>`);
  const meter = document.querySelector('[data-kpi="r65-meter"]');
  if (meter) meter.style.width = `${pct}%`;
  set("r65-note", `${r65.done} of ${r65.total} tickets approved across ${(RELEASES.r65 || []).length} epics`);
  set("r66-epics", `${(RELEASES.r66 || []).length}<small>epics</small>`);
  set("r66-note", `${r66.total} tickets planned · grooming in progress`);
}

function renderDetail(item) {
  if (!item) return;
  document.getElementById("scope-detail-key").textContent = keyOf(item);
  document.getElementById("scope-detail-title").textContent = item.title;
  document.getElementById("scope-detail-tickets").textContent = item.tickets;
  const signal = document.getElementById("scope-detail-signal");
  signal.textContent = item.signal;
  signal.className = `chip ${signalChip[item.tone] || "idle"}`;
  document.getElementById("scope-detail-labels").innerHTML = item.labels.length
    ? item.labels.map((l) => `<span class="${labelTone(l)}">${l}</span>`).join("")
    : "<span>No release labels</span>";
  document.getElementById("scope-status-bar").innerHTML = item.statuses.map(([label, count, tone]) =>
    `<span class="s-${tone}" style="width:${(count / item.tickets) * 100}%" title="${label}: ${count}"></span>`).join("");
  document.getElementById("scope-status-legend").innerHTML = item.statuses.map(([label, count, tone]) =>
    `<div><i class="s-${tone}"></i><span>${label}</span><strong>${count}</strong></div>`).join("");
  document.getElementById("scope-jira-link").href = item.url || `https://manafaco.atlassian.net/browse/${item.id}`;
  releaseScopeRoot.querySelectorAll(".scope-item").forEach((b) =>
    b.setAttribute("aria-selected", String(b.dataset.scopeItem === item.id)));
}

function renderScope() {
  if (!releaseScopeRoot) return;
  const items = itemsFor(activeRelease, activeTheme);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  activePage = Math.max(0, Math.min(pageCount - 1, activePage));
  const start = activePage * pageSize;
  const visible = items.slice(start, start + pageSize);

  releaseScopeRoot.querySelectorAll("[data-scope-release]").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.scopeRelease === activeRelease));
  });
  releaseScopeRoot.querySelectorAll("[data-scope-theme]").forEach((b) => {
    const theme = b.dataset.scopeTheme;
    const themeItems = itemsFor(activeRelease, theme);
    const t = ticketTotals(themeItems);
    b.setAttribute("aria-pressed", String(theme === activeTheme));
    b.disabled = themeItems.length === 0;
    b.style.opacity = themeItems.length ? "" : "0.4";
    b.querySelector("[data-scope-theme-count]").textContent = themeItems.length ? `${t.done}/${t.total}` : "—";
    b.querySelector("[data-scope-theme-bar]").style.width = t.total ? `${(t.done / t.total) * 100}%` : "0";
  });

  document.getElementById("scope-theme-title").textContent = `${themeLabels[activeTheme]} · ${releaseLabels[activeRelease]}`;
  document.getElementById("scope-theme-count").textContent = `${items.length} epic${items.length === 1 ? "" : "s"}`;

  const list = document.getElementById("scope-item-list");
  list.innerHTML = visible.map((item) => {
    const mini = item.statuses.map(([, count, tone]) => `<i class="s-${tone}" style="width:${(count / item.tickets) * 100}%"></i>`).join("");
    return `<button class="scope-item" type="button" role="option" data-scope-item="${item.id}" aria-selected="false">
      <span style="min-width:0"><span class="k">${keyOf(item)}</span><strong>${item.title}</strong></span>
      <span class="meta"><span class="mini">${mini}</span><small>${item.tickets} ticket${item.tickets === 1 ? "" : "s"}</small></span>
    </button>`;
  }).join("") || `<p style="padding:20px;color:var(--muted)">No epics for this squad in ${releaseLabels[activeRelease]}.</p>`;
  list.querySelectorAll("[data-scope-item]").forEach((b) => b.addEventListener("click", (e) => {
    e.stopPropagation();
    renderDetail(items.find((i) => i.id === b.dataset.scopeItem));
  }));

  const end = Math.min(start + pageSize, items.length);
  document.getElementById("scope-page-label").textContent = items.length ? `${start + 1}–${end} of ${items.length}` : "0 items";
  document.getElementById("scope-page-prev").disabled = activePage === 0;
  document.getElementById("scope-page-next").disabled = activePage >= pageCount - 1;
  renderDetail(visible[0]);
}

if (releaseScopeRoot) {
  releaseScopeRoot.querySelectorAll("[data-scope-theme]").forEach((b) => b.addEventListener("click", (e) => {
    e.stopPropagation();
    activeTheme = b.dataset.scopeTheme;
    activePage = 0;
    renderScope();
  }));
  releaseScopeRoot.querySelectorAll("[data-scope-release]").forEach((b) => b.addEventListener("click", (e) => {
    e.stopPropagation();
    activeRelease = b.dataset.scopeRelease;
    if (!itemsFor(activeRelease, activeTheme).length) {
      activeTheme = Object.keys(themeLabels).find((t) => itemsFor(activeRelease, t).length) || activeTheme;
    }
    activePage = 0;
    renderScope();
  }));
  document.getElementById("scope-page-prev").addEventListener("click", (e) => { e.stopPropagation(); activePage -= 1; renderScope(); });
  document.getElementById("scope-page-next").addEventListener("click", (e) => { e.stopPropagation(); activePage += 1; renderScope(); });
  renderKpis();
  renderScope();
}

/* ---------- FinOps carousel ---------- */
const carousel = document.querySelector("[data-finops-carousel]");
const shots = carousel ? Array.from(carousel.querySelectorAll(".finops-shot")) : [];
const dots = carousel ? Array.from(carousel.querySelectorAll("[data-finops-index]")) : [];
let shotIndex = 0;

function showShot(index) {
  if (!shots.length) return;
  shotIndex = (index + shots.length) % shots.length;
  shots.forEach((s, i) => s.classList.toggle("is-current", i === shotIndex));
  dots.forEach((d, i) => { d.classList.toggle("is-current", i === shotIndex); d.setAttribute("aria-current", String(i === shotIndex)); });
  const s = shots[shotIndex];
  document.getElementById("finops-shot-title").textContent = s.dataset.title || "SCF FinOps";
  document.getElementById("finops-shot-caption").textContent = s.dataset.caption || "";
  document.getElementById("finops-shot-count").textContent = `${shotIndex + 1} / ${shots.length}`;
}
document.getElementById("finops-shot-prev")?.addEventListener("click", (e) => { e.stopPropagation(); showShot(shotIndex - 1); });
document.getElementById("finops-shot-next")?.addEventListener("click", (e) => { e.stopPropagation(); showShot(shotIndex + 1); });
dots.forEach((d) => d.addEventListener("click", (e) => { e.stopPropagation(); showShot(Number(d.dataset.finopsIndex)); }));
showShot(0);

/* ---------- Roadmap dialogs ---------- */
document.querySelectorAll("[data-roadmap-open]").forEach((b) => {
  b.addEventListener("click", () => document.getElementById(b.dataset.roadmapOpen)?.showModal());
});

/* ---------- Navigation ---------- */
let currentIndex = 0;

function readInitialSlide() {
  const n = Number.parseInt(window.location.hash.replace("#slide-", ""), 10);
  if (Number.isFinite(n) && n >= 1 && n <= slides.length) currentIndex = n - 1;
}

function showSlide(index, updateHistory = true) {
  currentIndex = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, i) => {
    const active = i === currentIndex;
    slide.classList.toggle("is-active", active);
    slide.setAttribute("aria-hidden", String(!active));
  });
  currentLabel.textContent = String(currentIndex + 1);
  totalLabel.textContent = String(slides.length);
  progressFill.style.width = `${((currentIndex + 1) / slides.length) * 100}%`;
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === slides.length - 1;
  if (updateHistory) window.history.replaceState(null, "", `#slide-${currentIndex + 1}`);
}

prevButton.addEventListener("click", () => showSlide(currentIndex - 1));
nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

document.addEventListener("keydown", (event) => {
  if (document.querySelector(".roadmap-detail[open]")) return;
  const key = event.key;
  const target = event.target instanceof HTMLElement ? event.target : null;
  if (target?.closest("input, select, textarea")) return;
  if (target?.closest("button, a") && [" ", "Enter"].includes(key)) return;
  if (["ArrowRight", "PageDown", " ", "Enter"].includes(key)) { event.preventDefault(); showSlide(currentIndex + 1); }
  else if (["ArrowLeft", "PageUp", "Backspace"].includes(key)) { event.preventDefault(); showSlide(currentIndex - 1); }
  else if (key === "Home") { event.preventDefault(); showSlide(0); }
  else if (key === "End") { event.preventDefault(); showSlide(slides.length - 1); }
  else if (key.toLowerCase() === "f") {
    event.preventDefault();
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }
});

window.addEventListener("hashchange", () => { readInitialSlide(); showSlide(currentIndex, false); });
readInitialSlide();
showSlide(currentIndex, false);

/* Show controls briefly on mouse movement; hidden while presenting. */
let controlsTimer;
document.addEventListener("mousemove", () => {
  document.body.classList.add("show-controls");
  clearTimeout(controlsTimer);
  controlsTimer = setTimeout(() => document.body.classList.remove("show-controls"), 2000);
});

const slides = Array.from(document.querySelectorAll(".slide"));
const prevButton = document.getElementById("prev-slide");
const nextButton = document.getElementById("next-slide");
const currentLabel = document.getElementById("current-slide");
const totalLabel = document.getElementById("total-slides");
const progressFill = document.getElementById("progress-fill");
const finopsCarousel = document.querySelector("[data-finops-carousel]");
const finopsShots = finopsCarousel ? Array.from(finopsCarousel.querySelectorAll(".finops-shot")) : [];
const finopsPrev = document.getElementById("finops-shot-prev");
const finopsNext = document.getElementById("finops-shot-next");
const finopsCount = document.getElementById("finops-shot-count");
const finopsTitle = document.getElementById("finops-shot-title");
const finopsCaption = document.getElementById("finops-shot-caption");
const finopsDots = finopsCarousel ? Array.from(finopsCarousel.querySelectorAll("[data-finops-index]")) : [];
const releaseScopeRoot = document.querySelector("[data-release-scope]");

const releaseScope = [
  { id: "EMQ-5516", df: "DF-3832", title: "SMBC Integration Manager — Email", theme: "integrations", signal: "In testing", tone: "testing", tickets: 15, statuses: [["Dev tested on staging", 10, "testing"], ["To do", 4, "todo"], ["Deferred", 1, "deferred"]] },
  { id: "EMQ-5352", df: "DF-3957", title: "Direct-to-Supplier Funding Model V1.0", theme: "integrations", signal: "In progress", tone: "progress", tickets: 4, statuses: [["To do", 3, "todo"], ["Approved", 1, "approved"]] },
  { id: "EMQ-5491", df: "DF-4032", title: "SE Program Limits Update: BNPP and SAB", theme: "integrations", signal: "Planned", tone: "planned", tickets: 1, statuses: [["To do", 1, "todo"]] },
  { id: "EMQ-5711", df: "DF-4136", title: "BNPP End-of-Month Fees Reconciliation", theme: "integrations", signal: "Planned", tone: "planned", tickets: 1, statuses: [["To do", 1, "todo"]] },
  { id: "EMQ-5338", df: "DF-3936", title: "J.P. Morgan Financing Calculation", theme: "integrations", signal: "Planned", tone: "planned", tickets: 3, statuses: [["To do", 3, "todo"]] },
  { id: "EMQ-5715", df: "DF-3714", title: "Standard Chartered B2B API Manager", theme: "integrations", signal: "Planned", tone: "planned", tickets: 1, statuses: [["To do", 1, "todo"]] },
  { id: "EMQ-5712", df: "DF-4091", title: "Buyer Maturity Report Enhancement", theme: "operations", signal: "Planned", tone: "planned", tickets: 1, statuses: [["To do", 1, "todo"]] },
  { id: "EMQ-5713", df: "DF-4148", title: "SAB Financing Requests Timeline", theme: "operations", signal: "Planned", tone: "planned", tickets: 1, statuses: [["To do", 1, "todo"]] },
  { id: "EMQ-5714", df: "DF-4135", title: "SAB Thursday Timing Enhancement", theme: "operations", signal: "Planned", tone: "planned", tickets: 1, statuses: [["To do", 1, "todo"]] },
  { id: "EMQ-5462", df: "DF-4014", title: "SIDF SCF Weekly Report — English", theme: "operations", signal: "Planned", tone: "planned", tickets: 1, statuses: [["To do", 1, "todo"]] },
  { id: "EMQ-5463", df: "DF-3486", title: "Auto-send Supplier Outreach Report", theme: "operations", signal: "Partially deferred", tone: "deferred", tickets: 5, statuses: [["To do", 3, "todo"], ["Deferred", 2, "deferred"]] },
  { id: "EMQ-5328", df: "DF-3928", title: "Buyer Profile Phase III", theme: "platform", signal: "Partially on hold", tone: "hold", tickets: 6, statuses: [["To do", 3, "todo"], ["On hold", 3, "hold"]] },
  { id: "EMQ-5693", df: "DF-4192", title: "Supplier Banking & Payout Accounts", theme: "platform", signal: "In progress", tone: "progress", tickets: 19, statuses: [["To do", 15, "todo"], ["Dev completed", 3, "progress"], ["Dev tested", 1, "testing"]] },
  { id: "EMQ-5438", df: "DF-4021", title: "SIC SCF Onboarding Requirements", theme: "platform", signal: "Planned", tone: "planned", tickets: 3, statuses: [["To do", 3, "todo"]] },
  { id: "EMQ-5630", df: "DF-4164", title: "Merged SCF Offer View Permission", theme: "platform", signal: "Planned", tone: "planned", tickets: 1, statuses: [["To do", 1, "todo"]] },
  { id: "EMQ-5716", df: "DF-4194", title: "Fees Management Goal-Seeking Fixes", theme: "platform", signal: "Planned", tone: "planned", tickets: 2, statuses: [["To do", 2, "todo"]] },
  { id: "EMQ-4226", df: "DF-3492", title: "AML Fetch for Companies and Owners", theme: "stability", signal: "Complete", tone: "complete", tickets: 16, statuses: [["Approved", 16, "approved"]] },
  { id: "EMQ-5668", df: "", title: "Admin AML Issues to Be Fixed", theme: "stability", signal: "In testing", tone: "testing", tickets: 6, statuses: [["Dev tested on staging", 3, "testing"], ["To do", 1, "todo"], ["Dev completed", 1, "progress"], ["Approved", 1, "approved"]] },
  { id: "EMQ-5595", df: "", title: "Release Regression Q3-2026", theme: "stability", signal: "Planned", tone: "planned", tickets: 2, statuses: [["To do", 2, "todo"]] },
  { id: "EMQ-5596", df: "", title: "Miscellaneous Q3-2026", theme: "stability", signal: "In progress", tone: "progress", tickets: 6, statuses: [["To do", 3, "todo"], ["In progress", 2, "progress"], ["On hold", 1, "hold"]] }
];

const releaseThemeLabels = {
  integrations: "Funder integrations",
  operations: "Operations & reporting",
  platform: "Platform & controls",
  stability: "Compliance & stability"
};

function renderScopeDetail(item) {
  if (!releaseScopeRoot || !item) return;

  const key = item.df ? `${item.id} · ${item.df}` : item.id;
  document.getElementById("scope-detail-key").textContent = key;
  document.getElementById("scope-detail-title").textContent = item.title;
  document.getElementById("scope-detail-tickets").textContent = item.tickets;
  document.getElementById("scope-status-total").textContent = `${item.tickets} total`;

  const signal = document.getElementById("scope-detail-signal");
  signal.textContent = item.signal;
  signal.className = `scope-signal signal-${item.tone}`;

  document.getElementById("scope-status-bar").innerHTML = item.statuses.map(([label, count, tone]) =>
    `<span class="status-${tone}" style="width:${(count / item.tickets) * 100}%" title="${label}: ${count}"></span>`
  ).join("");
  document.getElementById("scope-status-legend").innerHTML = item.statuses.map(([label, count, tone]) =>
    `<div><i class="status-${tone}"></i><span>${label}</span><strong>${count}</strong></div>`
  ).join("");
  document.getElementById("scope-jira-link").href = `https://manafaco.atlassian.net/browse/${item.id}`;

  releaseScopeRoot.querySelectorAll(".scope-item").forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.scopeItem === item.id));
  });
}

function renderScopeTheme(theme) {
  if (!releaseScopeRoot) return;

  const items = releaseScope.filter((item) => item.theme === theme);
  releaseScopeRoot.querySelectorAll("[data-scope-theme]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.scopeTheme === theme));
  });
  document.getElementById("scope-theme-title").textContent = releaseThemeLabels[theme];
  document.getElementById("scope-theme-count").textContent = `${items.length} items`;

  const list = document.getElementById("scope-item-list");
  list.innerHTML = items.map((item) => {
    const key = item.df ? `${item.id} · ${item.df}` : item.id;
    return `<button class="scope-item" type="button" role="option" data-scope-item="${item.id}" aria-selected="false">
      <span class="scope-item-copy"><span>${key}</span><strong>${item.title}</strong></span>
      <span class="scope-item-meta"><span class="scope-signal signal-${item.tone}">${item.signal}</span><small>${item.tickets} ticket${item.tickets === 1 ? "" : "s"}</small></span>
    </button>`;
  }).join("");

  list.querySelectorAll("[data-scope-item]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      renderScopeDetail(releaseScope.find((item) => item.id === button.dataset.scopeItem));
    });
  });

  renderScopeDetail(items[0]);
}

releaseScopeRoot?.querySelectorAll("[data-scope-theme]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    renderScopeTheme(button.dataset.scopeTheme);
  });
});

renderScopeTheme("integrations");

let currentIndex = 0;
let finopsIndex = 0;

function showFinopsShot(index) {
  if (!finopsShots.length) return;

  finopsIndex = (index + finopsShots.length) % finopsShots.length;
  finopsShots.forEach((shot, shotIndex) => {
    shot.classList.toggle("is-current", shotIndex === finopsIndex);
  });
  finopsDots.forEach((dot, dotIndex) => {
    const isCurrent = dotIndex === finopsIndex;
    dot.classList.toggle("is-current", isCurrent);
    dot.setAttribute("aria-current", String(isCurrent));
  });

  const currentShot = finopsShots[finopsIndex];
  if (finopsTitle) finopsTitle.textContent = currentShot.dataset.title || "SCF FinOps";
  if (finopsCaption) finopsCaption.textContent = currentShot.dataset.caption || "";
  if (finopsCount) finopsCount.textContent = `${finopsIndex + 1} / ${finopsShots.length}`;
}

finopsPrev?.addEventListener("click", (event) => {
  event.stopPropagation();
  showFinopsShot(finopsIndex - 1);
});

finopsNext?.addEventListener("click", (event) => {
  event.stopPropagation();
  showFinopsShot(finopsIndex + 1);
});

finopsDots.forEach((dot) => {
  dot.addEventListener("click", (event) => {
    event.stopPropagation();
    showFinopsShot(Number(dot.dataset.finopsIndex));
  });
});

showFinopsShot(0);

function readInitialSlide() {
  const hashValue = Number.parseInt(window.location.hash.replace("#slide-", ""), 10);
  if (Number.isFinite(hashValue) && hashValue >= 1 && hashValue <= slides.length) {
    currentIndex = hashValue - 1;
  }
}

function showSlide(index, updateHistory = true) {
  currentIndex = Math.max(0, Math.min(slides.length - 1, index));

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === currentIndex;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  currentLabel.textContent = String(currentIndex + 1);
  totalLabel.textContent = String(slides.length);
  progressFill.style.width = `${((currentIndex + 1) / slides.length) * 100}%`;
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === slides.length - 1;

  if (updateHistory) {
    window.history.replaceState(null, "", `#slide-${currentIndex + 1}`);
  }
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function previousSlide() {
  showSlide(currentIndex - 1);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

prevButton.addEventListener("click", previousSlide);
nextButton.addEventListener("click", nextSlide);

document.addEventListener("keydown", (event) => {
  if (event.target instanceof HTMLElement && event.target.closest("button, a, input, select, textarea")) {
    return;
  }

  if (["ArrowRight", "PageDown", " ", "Enter"].includes(event.key)) {
    event.preventDefault();
    nextSlide();
  }

  if (["ArrowLeft", "PageUp", "Backspace"].includes(event.key)) {
    event.preventDefault();
    previousSlide();
  }

  if (event.key.toLowerCase() === "f") {
    event.preventDefault();
    toggleFullscreen();
  }

  if (event.key === "Home") {
    event.preventDefault();
    showSlide(0);
  }

  if (event.key === "End") {
    event.preventDefault();
    showSlide(slides.length - 1);
  }
});

window.addEventListener("hashchange", () => {
  readInitialSlide();
  showSlide(currentIndex, false);
});

readInitialSlide();
showSlide(currentIndex, false);

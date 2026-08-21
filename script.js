const slides = Array.from(document.querySelectorAll(".slide"))
  .sort((a, b) => Number(a.dataset.slide) - Number(b.dataset.slide));
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

const legacyReleaseScope = [
  { id: "ASQ-4559", df: "DF-4049", title: "Storybook Setup for Internal Design System", theme: "admin", signal: "In testing", tone: "testing", tickets: 1, labels: [], statuses: [["Dev tested on staging", 1, "testing"]] },
  { id: "ASQ-4592", df: "DF-3908", title: "Oracle SSO Permission Automation", theme: "admin", signal: "On hold", tone: "hold", tickets: 3, labels: ["might-spill-r61"], statuses: [["On hold", 3, "hold"]] },
  { id: "ASQ-4897", df: "DF-4215", title: "PM Board Filter Enhancement", theme: "admin", signal: "Planned", tone: "planned", tickets: 1, labels: [], statuses: [["To do", 1, "todo"]] },
  { id: "ASQ-4879", df: "DF-4113", title: "Automate Facility Creation from Offer Acceptance", theme: "admin", signal: "Planned", tone: "planned", tickets: 1, labels: [], statuses: [["To do", 1, "todo"]] },
  { id: "ASQ-4877", df: "DF-4144", title: "Revamp Admin Header for New Design System", theme: "admin", signal: "Planned", tone: "planned", tickets: 1, labels: [], statuses: [["To do", 1, "todo"]] },
  { id: "ASQ-4875", df: "DF-4188", title: "Invoice Payer Column & Filter", theme: "admin", signal: "Planned", tone: "planned", tickets: 2, labels: [], statuses: [["To do", 2, "todo"]] },
  { id: "ASQ-4868", df: "DF-4184", title: "Design System Component Fixes", theme: "admin", signal: "Planned", tone: "planned", tickets: 1, labels: [], statuses: [["To do", 1, "todo"]] },
  { id: "ASQ-4910", df: "DF-4174", title: "Create Manual Financial Offer", theme: "admin", signal: "Planned", tone: "planned", tickets: 1, labels: [], statuses: [["To do", 1, "todo"]] },

  { id: "ASQ-4601", df: "DF-3718", title: "Lead Management in Sales CRM", theme: "crm", signal: "In progress", tone: "progress", tickets: 15, labels: [], statuses: [["To do", 8, "todo"], ["Dev completed", 4, "progress"], ["Dev tested", 2, "testing"], ["In progress", 1, "progress"]] },
  { id: "ASQ-4881", df: "DF-4182", title: "Reactivate Eligible Financed Companies", theme: "crm", signal: "Planned", tone: "planned", tickets: 1, labels: [], statuses: [["To do", 1, "todo"]] },
  { id: "ASQ-4882", df: "DF-4114", title: "Onboarding V2 CRM Impacts", theme: "crm", signal: "Spillover risk", tone: "hold", tickets: 1, labels: ["might-spill-r62"], statuses: [["To do", 1, "todo"]] },
  { id: "ASQ-4883", df: "DF-4160", title: "CRM Enhancements Part 6", theme: "crm", signal: "In progress", tone: "progress", tickets: 6, labels: [], statuses: [["To do", 5, "todo"], ["In progress", 1, "progress"]] },

  { id: "BSQ-2988", df: "DF-3357", title: "Borrower Activation Journey V2", theme: "borrower", signal: "Spilling over", tone: "hold", tickets: 25, labels: ["design-pending", "will-spill-over-r61"], statuses: [["To do", 22, "todo"], ["On hold", 2, "hold"], ["In testing", 1, "testing"]] },
  { id: "BSQ-3020", df: "DF-4121", title: "Borrower User Management Phase II", theme: "borrower", signal: "Planned", tone: "planned", tickets: 1, labels: [], statuses: [["To do", 1, "todo"]] },
  { id: "BSQ-3064", df: "DF-4102", title: "Add More Borrower Task Types", theme: "borrower", signal: "In testing", tone: "testing", tickets: 21, labels: ["will-spill-over-r61"], statuses: [["To do", 5, "todo"], ["Dev completed", 2, "progress"], ["In testing", 14, "testing"]] },
  { id: "BSQ-3135", df: "DF-4198", title: "User Management Post-Launch Enhancements", theme: "borrower", signal: "Planned", tone: "planned", tickets: 12, labels: [], statuses: [["To do", 12, "todo"]] },
  { id: "BSQ-3134", df: "DF-4011", title: "Request Clearance Letter", theme: "borrower", signal: "Planned", tone: "planned", tickets: 1, labels: [], statuses: [["To do", 1, "todo"]] },

  { id: "EMQ-5352", df: "DF-3957", title: "Direct-to-Supplier Funding Model V1.0", theme: "scf", signal: "In progress", tone: "progress", tickets: 4, labels: ["must-have"], statuses: [["To do", 3, "todo"], ["Approved", 1, "approved"]] },
  { id: "EMQ-5711", df: "DF-4136", title: "BNPP End-of-Month Fees Reconciliation", theme: "scf", signal: "Planned", tone: "planned", tickets: 1, labels: ["must-have"], statuses: [["To do", 1, "todo"]] },
  { id: "EMQ-5713", df: "DF-4148", title: "SAB Financing Requests Timeline", theme: "scf", signal: "Planned", tone: "planned", tickets: 1, labels: ["must-have"], statuses: [["To do", 1, "todo"]] },
  { id: "EMQ-5714", df: "DF-4135", title: "SAB Thursday Timing Enhancement", theme: "scf", signal: "Planned", tone: "planned", tickets: 1, labels: ["must-have"], statuses: [["To do", 1, "todo"]] },
  { id: "EMQ-5716", df: "DF-4194", title: "Fees Management Goal-Seeking Fixes", theme: "scf", signal: "Planned", tone: "planned", tickets: 2, labels: ["must-have"], statuses: [["To do", 2, "todo"]] },
  { id: "EMQ-5712", df: "DF-4091", title: "Buyer Maturity Report Enhancement", theme: "scf", signal: "Planned", tone: "planned", tickets: 1, labels: ["alsaeed", "must-have"], statuses: [["To do", 1, "todo"]] },
  { id: "EMQ-5516", df: "DF-3832", title: "SMBC Integration Manager — Email", theme: "scf", signal: "In testing", tone: "testing", tickets: 15, labels: ["might-spill-r61", "r60"], statuses: [["Dev tested on staging", 10, "testing"], ["To do", 4, "todo"], ["Deferred", 1, "deferred"]] },
  { id: "EMQ-5438", df: "DF-4021", title: "SIC SCF Onboarding Requirements", theme: "scf", signal: "Planned", tone: "planned", tickets: 3, labels: [], statuses: [["To do", 3, "todo"]] },
  { id: "EMQ-5463", df: "DF-3486", title: "Auto-send Supplier Outreach Report", theme: "scf", signal: "Partially deferred", tone: "deferred", tickets: 5, labels: [], statuses: [["To do", 3, "todo"], ["Deferred", 2, "deferred"]] },
  { id: "EMQ-5630", df: "DF-4164", title: "Merged SCF Offer View Permission", theme: "scf", signal: "Planned", tone: "planned", tickets: 1, labels: [], statuses: [["To do", 1, "todo"]] },
  { id: "EMQ-4226", df: "DF-3492", title: "AML Fetch for Companies and Owners", theme: "scf", signal: "Testing spillover", tone: "hold", tickets: 16, labels: ["R61", "testing-spillover"], statuses: [["Approved", 16, "approved"]] },
  { id: "EMQ-5328", df: "DF-3928", title: "Buyer Profile Phase III", theme: "scf", signal: "On hold", tone: "hold", tickets: 6, labels: ["design-pending", "remove-for-62"], statuses: [["To do", 3, "todo"], ["On hold", 3, "hold"]] },
  { id: "EMQ-5338", df: "DF-3936", title: "J.P. Morgan Financing Calculation", theme: "scf", signal: "Planned", tone: "planned", tickets: 3, labels: [], statuses: [["To do", 3, "todo"]] },
  { id: "EMQ-5668", df: "", title: "Admin AML Issues to Be Fixed", theme: "scf", signal: "In testing", tone: "testing", tickets: 6, labels: ["R61"], statuses: [["Dev tested on staging", 3, "testing"], ["To do", 1, "todo"], ["Dev completed", 1, "progress"], ["Approved", 1, "approved"]] },
  { id: "EMQ-5693", df: "DF-4192", title: "Supplier Banking & Payout Accounts", theme: "scf", signal: "In progress", tone: "progress", tickets: 19, labels: [], statuses: [["To do", 15, "todo"], ["Dev completed", 3, "progress"], ["Dev tested", 1, "testing"]] },
  { id: "EMQ-5715", df: "DF-3714", title: "Standard Chartered B2B API Manager", theme: "scf", signal: "Planned", tone: "planned", tickets: 1, labels: [], statuses: [["To do", 1, "todo"]] }
];

const planned = (id, title, theme, labels = []) => ({
  id, title, theme, signal: "R62 scope", tone: "planned", tickets: 1, labels,
  statuses: [["To do", 1, "todo"]]
});
const scoped = (id, title, theme, tickets, labels, statuses, signal = "R62 scope", tone = "planned") => ({
  id, title, theme, tickets, labels, statuses, signal, tone
});

const releaseScope = [
  scoped("DF-4136", "BNPP End-of-Month Fees Reconciliation — Sending & Receiving", "scf", 1, ["connected-with-direct-to-supplier", "might-spill-r62"], [["Dev done", 1, "approved"]], "Development complete", "complete"),
  scoped("DF-3486", "Auto-sending Supplier Outreach Report", "scf", 3, ["might-spill-r62"], [["Dev done", 3, "approved"]], "Development complete", "complete"),
  scoped("DF-3957", "Direct-to-Supplier Funding Model V1.0", "scf", 4, ["might-spill-r62"], [["To do", 3, "todo"], ["Approved", 1, "approved"]], "In delivery", "progress"),
  scoped("DF-4265", "V-Wallet — Display All Supplier Transactions and Restrict USD Information", "scf", 1, ["Apr-in-R62"], [["In testing", 1, "testing"]], "In testing", "testing"),
  scoped("DF-4071", "Taulia Onboarding APIs Impact and Interactions", "scf", 4, ["extension", "might-spill-r62"], [["On hold", 1, "hold"], ["In testing", 3, "testing"]], "Testing · one on hold", "testing"),
  scoped("DF-4192", "Supplier Banking and Payout Account Management", "scf", 20, ["extension", "might-spill-r62"], [["To do", 2, "todo"], ["On hold", 5, "hold"], ["In testing", 13, "testing"]], "Testing", "testing"),
  scoped("DF-4322", "Buyer-Configurable Default IBAN Selection", "scf", 7, ["default-iban-selection", "phase-2", "will-spill-over-r62"], [["To do", 6, "todo"], ["In progress", 1, "progress"]], "In progress", "progress"),
  scoped("DF-3936", "J.P. Morgan Adjusting Financing Calculation", "scf", 3, ["extension", "might-spill-r62"], [["In testing", 3, "testing"]], "In testing", "testing"),
  scoped("DF-4188", "Invoice Management — Add Payer Column and Filter", "scf", 2, ["connected-with-direct-to-supplier", "will-spill-over-r62"], [["To do", 2, "todo"]], "R62 spillover", "hold"),
  scoped("DF-4120", "Automating SAMA SCF Report — Enhancement", "scf", 1, ["OnHold-BI", "will-spill-over-r62"], [["To do", 1, "todo"]], "On hold · BI", "hold"),
  scoped("DF-4194", "Goal-Seeking Fee Management Fixes", "scf", 2, ["must-have"], [["To do", 2, "todo"]]),
  planned("DF-4305", "PO Financing Endpoint — Enhancement", "scf"),
  planned("DF-4302", "Riyad Bank — B2B API Manager", "scf"),
  planned("DF-4288", "SNB Financing Request File — Use Slashes in Date Format", "scf"),
  planned("DF-4277", "FAB — SFTP Access Credentials", "scf"),
  planned("DF-4275", "Standard Chartered Bank — SFTP Access Credentials", "scf"),
  planned("DF-4344", "SMBC Inbound Files — Support Password-Protected Attachments", "scf"),
  planned("DF-4346", "SMBC Email Integration — Migrate CSV to XLSX", "scf"),
  planned("DF-4329", "Automate Scheduled Sending of the Aramco Buyer Report", "scf"),
  scoped("DF-3778", "Buyer Supplier Yearly Spend", "scf", 6, [], [["To do", 6, "todo"]]),

  scoped("DF-4114", "Onboarding V2 CRM Impacts — Appointment Status and Financing Amount", "crm", 1, ["extension", "might-spill-r62"], [["Dev done", 1, "approved"]], "Development complete", "complete"),
  scoped("DF-3976", "Target Management Version 2.0 — CRM", "crm", 12, [], [["To do", 12, "todo"]]),
  planned("DF-4354", "CRM — Show Support Report Dialog", "crm"),
  planned("DF-4337", "Rename Sales CRM to Customer Relationship", "crm"),

  planned("DF-4259", "Hotfix — Control Collaterals Reflection at Loan Level", "admin"),
  scoped("DF-3752", "Capex Product — Admin", "admin", 41, ["will-spill-over-r62"], [["UAT queue", 1, "todo"], ["To do", 1, "todo"], ["On hold", 1, "hold"], ["In progress", 1, "progress"], ["Dev done", 12, "approved"], ["In testing", 25, "testing"]], "R62 spillover", "hold"),
  scoped("DF-4269", "Enable Duplicating a Financing Offer", "admin", 2, [], [["To do", 2, "todo"]]),
  planned("DF-4308", "Invoice Management — Remove Redundant Bank Information Columns", "admin"),
  planned("DF-4335", "Debt Periodic Review and Facility Change — Validate Outstanding Amount", "admin"),
  planned("DF-4177", "Financial Ratios and Qawaem — Company Size Update Cycle", "admin"),
  planned("DF-4293", "Switcher Enhancement", "admin"),
  planned("DF-4292", "Sidebar Enhancement for CRM and Invoice", "admin"),
  planned("DF-4291", "Add Header Breadcrumbs for CRM and Invoice", "admin"),
  scoped("DF-4187", "Funder Management — Manual Qawaem in RAC Eligibility", "admin", 2, [], [["To do", 2, "todo"]]),
  planned("DF-4331", "Add Filter to Fund Request Page", "admin"),
  scoped("DF-4315", "Invoice Management — Credit Note for Unpaid Invoices", "admin", 2, [], [["To do", 2, "todo"]]),
  scoped("DF-4330", "Facility Configuration Enhancement", "admin", 2, [], [["To do", 2, "todo"]]),
  planned("DF-4270", "Add Filters to Credit Instrument Details Master View", "admin"),
  planned("DF-4336", "Attach Image Screenshots", "admin"),
  planned("DF-4348", "Job Title Creation and Edit Handling", "admin"),
  planned("DF-4333", "Internal Design System — Create Permissions Page", "admin"),
  scoped("DF-4339", "Facility Agreement Update", "admin", 4, [], [["To do", 4, "todo"]]),

  scoped("DF-3357", "Borrower Onboarding Activation Journey V2", "borrower", 26, ["will-spill-over-r62"], [["To do", 3, "todo"], ["Dev done", 9, "approved"], ["In testing", 13, "testing"], ["Approved", 1, "approved"]], "Testing", "testing"),
  scoped("DF-4294", "Borrower Admin User Management Post-Launch Enhancements — Part 2", "borrower", 20, ["extension", "will-spill-over-r62"], [["To do", 11, "todo"], ["On hold", 5, "hold"], ["In progress", 1, "progress"], ["Dev done", 1, "approved"], ["In testing", 2, "testing"]], "In delivery", "progress"),
  scoped("DF-4283", "Capex Product — Borrower", "borrower", 33, ["will-spill-over-r62"], [["To do", 18, "todo"], ["In progress", 3, "progress"], ["Dev done", 6, "approved"], ["In testing", 6, "testing"]], "In delivery", "progress"),
  scoped("DF-4332", "Register and Track External Delegations", "borrower", 5, [], [["To do", 4, "todo"], ["Dev done", 1, "approved"]]),
  scoped("DF-4328", "Owner-Related Companies", "borrower", 3, [], [["To do", 3, "todo"]]),
  planned("DF-4142", "Update Primary Permission Assignee Eligibility Rules", "borrower"),

  scoped("DF-4026", "SCF FinOps — First Phase", "finops", 45, [], [["In testing", 12, "testing"], ["Approved", 33, "approved"]], "Testing", "testing"),
  scoped("DF-4030", "SCF FinOps 2", "finops", 16, [], [["In testing", 14, "testing"], ["Approved", 2, "approved"]], "Testing", "testing"),
  scoped("DF-4284", "SCF FinOps — Post-Deployment Feedback and Improvements", "finops", 35, [], [["To do", 9, "todo"], ["Dev done", 1, "approved"], ["In testing", 23, "testing"], ["UAT ready", 2, "progress"]], "Testing", "testing"),
  scoped("DF-4324", "Reject Pending EPs by Supplier and Program", "finops", 3, [], [["In progress", 2, "progress"], ["UAT ready", 1, "progress"]], "In progress", "progress")
];

const releaseThemeLabels = {
  admin: "Admin Sprint",
  crm: "CRM Sprint",
  borrower: "Borrower Sprint",
  scf: "SCF Sprint",
  finops: "SCF FinOps"
};
const scopePageSize = 6;
let activeScopeTheme = "scf";
let activeScopePage = 0;

function scopeLabelTone(label) {
  if (label.includes("spill") || label.includes("pending") || label.includes("remove")) return "label-risk";
  if (label === "must-have") return "label-must";
  return "";
}

function renderScopeDetail(item) {
  if (!releaseScopeRoot || !item) return;

  const key = item.jira || (item.df ? `${item.id} · ${item.df}` : item.id);
  document.getElementById("scope-detail-key").textContent = key;
  document.getElementById("scope-detail-title").textContent = item.title;
  document.getElementById("scope-detail-tickets").textContent = item.tickets;
  document.getElementById("scope-status-total").textContent = `${item.tickets} total`;

  const signal = document.getElementById("scope-detail-signal");
  signal.textContent = item.signal;
  signal.className = `scope-signal signal-${item.tone}`;
  document.getElementById("scope-detail-labels").innerHTML = item.labels.length
    ? item.labels.map((label) => `<span class="${scopeLabelTone(label)}">${label}</span>`).join("")
    : "<span>No Jira labels</span>";

  document.getElementById("scope-status-bar").innerHTML = item.statuses.map(([label, count, tone]) =>
    `<span class="status-${tone}" style="width:${(count / item.tickets) * 100}%" title="${label}: ${count}"></span>`
  ).join("");
  document.getElementById("scope-status-legend").innerHTML = item.statuses.map(([label, count, tone]) =>
    `<div><i class="status-${tone}"></i><span>${label}</span><strong>${count}</strong></div>`
  ).join("");
  document.getElementById("scope-jira-link").href = `https://manafaco.atlassian.net/browse/${item.jira || item.id}`;

  releaseScopeRoot.querySelectorAll(".scope-item").forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.scopeItem === item.id));
  });
}

function renderScopeTheme(theme) {
  if (!releaseScopeRoot) return;
  activeScopeTheme = theme;
  activeScopePage = 0;
  renderScopePage();
}

function renderScopePage() {
  if (!releaseScopeRoot) return;
  const items = releaseScope.filter((item) => item.theme === activeScopeTheme);
  const pageCount = Math.ceil(items.length / scopePageSize);
  activeScopePage = Math.max(0, Math.min(pageCount - 1, activeScopePage));
  const start = activeScopePage * scopePageSize;
  const visibleItems = items.slice(start, start + scopePageSize);
  releaseScopeRoot.querySelectorAll("[data-scope-theme]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.scopeTheme === activeScopeTheme));
  });
  document.getElementById("scope-theme-title").textContent = releaseThemeLabels[activeScopeTheme];
  document.getElementById("scope-theme-count").textContent = `${items.length} items`;

  const list = document.getElementById("scope-item-list");
  list.innerHTML = visibleItems.map((item) => {
    const key = item.jira || (item.df ? `${item.id} · ${item.df}` : item.id);
    const labels = item.labels.slice(0, 2).map((label) => `<i class="${scopeLabelTone(label)}">${label}</i>`).join("");
    return `<button class="scope-item" type="button" role="option" data-scope-item="${item.id}" aria-selected="false">
      <span class="scope-item-copy"><span>${key}</span><strong>${item.title}</strong>${labels ? `<span class="scope-item-labels">${labels}</span>` : ""}</span>
      <span class="scope-item-meta"><span class="scope-signal signal-${item.tone}">${item.signal}</span><small>${item.tickets} ticket${item.tickets === 1 ? "" : "s"}</small></span>
    </button>`;
  }).join("");

  list.querySelectorAll("[data-scope-item]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      renderScopeDetail(releaseScope.find((item) => item.id === button.dataset.scopeItem));
    });
  });

  const end = Math.min(start + scopePageSize, items.length);
  document.getElementById("scope-page-label").textContent = `${start + 1}–${end} of ${items.length}`;
  document.getElementById("scope-page-prev").disabled = activeScopePage === 0;
  document.getElementById("scope-page-next").disabled = activeScopePage === pageCount - 1;
  renderScopeDetail(visibleItems[0]);
}

releaseScopeRoot?.querySelectorAll("[data-scope-theme]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    renderScopeTheme(button.dataset.scopeTheme);
  });
});

document.getElementById("scope-page-prev")?.addEventListener("click", (event) => {
  event.stopPropagation();
  activeScopePage -= 1;
  renderScopePage();
});

document.getElementById("scope-page-next")?.addEventListener("click", (event) => {
  event.stopPropagation();
  activeScopePage += 1;
  renderScopePage();
});

renderScopeTheme("scf");

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

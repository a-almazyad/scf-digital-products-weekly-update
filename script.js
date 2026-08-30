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

const r61Epic = (id, df, title, theme, done, labels = [], jira = id) => ({
  id, df, jira, title, theme, tickets: 1, labels,
  signal: done ? "Production Done" : "Backlog",
  tone: done ? "complete" : "planned",
  statuses: [[done ? "Production Done" : "Backlog", 1, done ? "approved" : "todo"]]
});

const legacyReleaseScope = [
  r61Epic("EMQ-4226", "DF-3492", "AML Fetch for Companies and Owners", "scf", true, ["R61"]),
  r61Epic("EMQ-5438", "DF-4021", "SIC SCF Onboarding Requirements", "scf", true, ["R61"]),
  r61Epic("EMQ-5516", "DF-3832", "SMBC Integration Manager — Email Phase 1", "scf", true, ["R61"]),
  r61Epic("EMQ-5630", "DF-4164", "Merged SCF Offer View Permission", "scf", true, ["R61"]),
  r61Epic("EMQ-5668", "", "Admin AML Issues to Be Fixed", "scf", true, ["R61"]),
  r61Epic("EMQ-5712", "DF-4091", "Buyer Maturity Report Enhancement", "scf", true, ["R61"]),
  r61Epic("EMQ-5713", "DF-4148", "SAB Financing Requests Timeline", "scf", true, ["R61"]),
  r61Epic("EMQ-5714", "DF-4135", "SAB Thursday Timing Enhancement", "scf", true, ["R61", "no-qa"]),
  r61Epic("EMQ-5352", "DF-3957", "Direct-to-Supplier Funding Model V1.0", "scf", false),
  r61Epic("EMQ-5711", "DF-4136", "BNPP End-of-Month Fees Reconciliation", "scf", false, ["connected-with-direct-to-supplier"]),
  r61Epic("EMQ-5716", "DF-4194", "Fees Management Goal-Seeking Fixes", "scf", false),
  r61Epic("EMQ-5463", "DF-3486", "Auto-send Supplier Outreach Report", "scf", false),
  r61Epic("EMQ-5328", "DF-3928", "Buyer Profile Phase III", "scf", false, ["remove-for-62"]),
  r61Epic("EMQ-5338", "DF-3936", "J.P. Morgan Financing Calculation", "scf", false),
  r61Epic("EMQ-5693", "DF-4192", "Supplier Banking & Payout Accounts", "scf", false),
  r61Epic("EMQ-5715", "DF-3714", "Standard Chartered B2B API Manager", "scf", false, ["third-party-pending"]),

  r61Epic("ASQ-4559", "DF-4049", "Storybook Setup for Internal Design System", "admin", true),
  r61Epic("ASQ-4592", "DF-3908", "Oracle SSO Permission Automation", "admin", true),
  r61Epic("ASQ-4897", "DF-4215", "PM Board Filter Enhancement", "admin", true),
  r61Epic("ASQ-4879", "DF-4113", "Automate Facility Creation from Offer Acceptance", "admin", true),
  r61Epic("ASQ-4877", "DF-4144", "Revamp Admin Header for New Design System", "admin", true),
  r61Epic("ASQ-4868", "DF-4184", "Design System Component Fixes", "admin", true),
  r61Epic("ASQ-4910", "DF-4174", "Create Manual Financial Offer", "admin", true),
  r61Epic("ASQ-4875", "DF-4188", "Invoice Payer Column & Filter", "admin", false, ["connected-with-direct-to-supplier"], "EMQ-5825"),

  r61Epic("ASQ-4881", "DF-4182", "Reactivate Eligible Financed Companies", "crm", true),
  r61Epic("ASQ-4883", "DF-4160", "CRM Enhancements Part 6", "crm", true),
  r61Epic("ASQ-4601", "DF-3718", "Lead Management in Sales CRM", "crm", false),
  r61Epic("ASQ-4882", "DF-4114", "Onboarding V2 CRM Impacts", "crm", false),

  r61Epic("BSQ-3020", "DF-4121", "Borrower User Management Phase II", "borrower", true),
  r61Epic("BSQ-3064", "DF-4102", "Add More Borrower Task Types", "borrower", true),
  r61Epic("BSQ-3135", "DF-4198", "User Management Post-Launch Enhancements — Part 1", "borrower", true, ["extension"]),
  r61Epic("BSQ-3134", "DF-4011", "Request Clearance Letter", "borrower", true),
  r61Epic("BSQ-2988", "DF-3357", "Borrower Activation Journey V2", "borrower", false, ["will-spill-over-r63"])
/* Legacy snapshot replaced with current Jira epic statuses.
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
*/
];

const planned = (id, title, theme, labels = []) => ({
  id, title, theme, signal: "R62 scope", tone: "planned", tickets: 1, labels,
  statuses: [["To do", 1, "todo"]]
});
const scoped = (id, title, theme, tickets, labels, statuses, signal = "R62 scope", tone = "planned") => ({
  id, title, theme, tickets, labels, statuses, signal, tone
});

const releaseScope = [
  planned("DF-4265", "V-Wallet — Display All Supplier Transactions and Restrict USD Information", "scf"),
  planned("DF-4192", "Supplier Banking and Payout Account Management", "scf"),
  planned("DF-4322", "Buyer-Configurable Default IBAN Selection", "scf"),
  planned("DF-3957", "Direct-to-Supplier Funding Model V1.0", "scf"),
  planned("DF-4188", "Invoice Management — Add Payer Column and Filter", "scf"),
  planned("DF-4136", "BNPP End-of-Month Fees Reconciliation — Sending & Receiving", "scf"),
  planned("DF-3936", "J.P. Morgan Adjusting Financing Calculation", "scf"),
  planned("DF-3486", "Auto-sending Supplier Outreach Report", "scf"),
  planned("DF-4071", "Taulia Onboarding APIs Impact and Interactions", "scf"),
  planned("DF-3714", "Standard Chartered Bank — B2B API Manager", "scf"),
  planned("DF-4385", "Funder Integration — Automatic Email for File Errors and Slack Notifications", "scf"),
  planned("DF-4305", "PO Financing Endpoint — Enhancement", "scf"),
  planned("DF-4302", "Riyadh Bank — B2B API Manager", "scf", ["might-spill-over-r63"]),
  planned("DF-4288", "SNB Financing Request File — Use Slashes in Date Format", "scf"),
  planned("DF-4277", "FAB — SFTP Access Credentials", "scf"),
  planned("DF-4275", "Standard Chartered Bank — SFTP Access Credentials", "scf"),
  planned("DF-4346", "SMBC Email Integration — Migrate CSV to XLSX", "scf"),
  planned("DF-4344", "SMBC Inbound Files — Support Password-Protected Attachments", "scf"),
  planned("DF-3778", "Borrower Channel — Taulia Onboarding APIs Impact and Interactions", "scf", ["might-spill-over-r63"]),
  planned("DF-4194", "Fees Management — Goal-Seeking Fixes", "scf"),
  planned("DF-4329", "Automate Scheduled Sending of the Aramco Buyer Report", "scf"),
  planned("DF-4120", "Automating SAMA SCF Report — Enhancement", "scf"),

  planned("DF-3718", "Lead Management in Sales CRM", "crm"),
  planned("DF-3976", "Target Management Version 2.0 — CRM", "crm", ["will-spill-over-r63"]),
  planned("DF-4337", "Rename Sales CRM to Customer Relationship", "crm"),
  planned("DF-4354", "CRM — Show Support Report Dialog", "crm"),

  planned("DF-3752", "Capex Product — Admin", "admin", ["will-spill-over-r63"]),
  planned("DF-4335", "Periodic Review & Facility Change — Validate Outstanding Amount", "admin"),
  planned("DF-4259", "Hotfix — Control Collaterals Reflection at Loan Level", "admin", ["hotfix"]),
  planned("DF-4348", "Job Title Creation and Edit Handling", "admin"),
  planned("DF-4339", "Facility Agreement Update", "admin"),
  planned("DF-4359", "Hotfix — VAT Percentage Rounding on Invoice Files", "admin", ["hotfix"]),
  planned("DF-4361", "Remove VAT Field from Manual Invoice Creation", "admin"),
  planned("DF-4364", "Handle Long Company Names in Tax Invoice", "admin"),
  planned("DF-4187", "Funder Management — Manual Qawaem in RAC Eligibility", "admin"),
  planned("DF-4177", "Financial Ratios & Qawaem — Four-Month Update Cycle", "admin"),
  planned("DF-4293", "Switcher Enhancement", "admin"),
  planned("DF-4292", "Sidebar Enhancement for CRM and Invoice", "admin"),
  planned("DF-4338", "Internal Design System — Create Permissions Page", "admin"),
  planned("DF-4308", "Invoice Management — Remove Redundant Bank Information Columns", "admin"),
  planned("DF-4291", "Add Header Breadcrumbs for CRM and Invoice", "admin"),
  planned("DF-4269", "Enable Duplicating a Financing Offer", "admin"),
  planned("DF-4270", "Add Filters to Credit Instrument Details Master View", "admin"),
  planned("DF-4331", "Add Filter to Fund Request Page", "admin"),
  planned("DF-4330", "Facility Configuration Enhancement", "admin"),
  planned("DF-4336", "Attach Image Screenshots", "admin"),

  planned("DF-3357", "Borrower Onboarding Activation Journey V2", "borrower", ["will-spill-over-r63"]),
  planned("DF-4294", "Borrower Admin User Management Post-Launch Enhancements — Part 2", "borrower"),
  planned("DF-4283", "Capex Product — Borrower", "borrower", ["will-spill-over-r63"]),
  planned("DF-4332", "Register and Track External Delegations", "borrower"),
  planned("DF-4328", "Owner-Related Companies", "borrower"),
  planned("DF-4142", "Update Primary Permission Assignee Eligibility Rules", "borrower"),
  planned("DF-4373", "Borrower Financing Journey V2", "borrower", ["will-spill-over-r63"]),

  scoped("DF-4284", "SCF FinOps — Post-Deployment Feedback and Improvements", "finops", 1, ["mostly-done", "discussions-pending"], [["Mostly done", 1, "testing"]], "Mostly done", "testing"),
  planned("DF-4389", "SCF FinOps — Supplier Onboarding to Funder Function", "finops"),
  scoped("DF-4170", "SCF FinOps — Phase 3", "finops", 1, ["continuous-delivery"], [["In progress", 1, "progress"]], "Continuing", "progress"),
  scoped("DF-4324", "Reject Pending EPs by Supplier and Program", "finops", 1, ["hotfix"], [["Hotfix", 1, "testing"]], "Hotfix delivery", "testing")
];

const releaseThemeLabels = {
  admin: "Admin Sprint",
  crm: "CRM Sprint",
  borrower: "Borrower Sprint",
  scf: "SCF Sprint",
  finops: "SCF FinOps"
};
const releaseScopes = {
  r61: legacyReleaseScope,
  r62: releaseScope
};
const releaseLabels = {
  r61: "R61",
  r62: "R62"
};
const scopePageSize = 6;
let activeScopeTheme = "scf";
let activeScopeRelease = "r62";
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
  document.getElementById("scope-jira-link").href = `https://manafaco.atlassian.net/browse/${item.jira || item.df || item.id}`;

  releaseScopeRoot.querySelectorAll(".scope-item").forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.scopeItem === item.id));
  });
}

function renderScopeTheme(theme) {
  if (!releaseScopeRoot) return;
  activeScopeTheme = theme;
  if (!releaseScopes[activeScopeRelease].some((item) => item.theme === theme)) {
    activeScopeRelease = Object.keys(releaseScopes).find((release) =>
      releaseScopes[release].some((item) => item.theme === theme)
    ) || activeScopeRelease;
  }
  activeScopePage = 0;
  renderScopePage();
}

function renderScopeRelease(release) {
  if (!releaseScopeRoot || !releaseScopes[release]) return;
  if (!releaseScopes[release].some((item) => item.theme === activeScopeTheme)) return;
  activeScopeRelease = release;
  activeScopePage = 0;
  renderScopePage();
}

function renderScopePage() {
  if (!releaseScopeRoot) return;
  const activeReleaseScope = releaseScopes[activeScopeRelease];
  const items = activeReleaseScope.filter((item) => item.theme === activeScopeTheme);
  const pageCount = Math.ceil(items.length / scopePageSize);
  activeScopePage = Math.max(0, Math.min(pageCount - 1, activeScopePage));
  const start = activeScopePage * scopePageSize;
  const visibleItems = items.slice(start, start + scopePageSize);
  releaseScopeRoot.querySelectorAll("[data-scope-theme]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.scopeTheme === activeScopeTheme));
  });
  releaseScopeRoot.querySelectorAll("[data-scope-theme-count]").forEach((count) => {
    count.textContent = activeReleaseScope.filter((item) => item.theme === count.dataset.scopeThemeCount).length;
  });
  releaseScopeRoot.querySelectorAll("[data-scope-release]").forEach((button) => {
    const releaseCount = releaseScopes[button.dataset.scopeRelease]
      .filter((item) => item.theme === activeScopeTheme).length;
    button.setAttribute("aria-pressed", String(button.dataset.scopeRelease === activeScopeRelease));
    button.disabled = releaseCount === 0;
    button.title = releaseCount === 0 ? `No ${releaseLabels[button.dataset.scopeRelease]} items for this squad` : "";
  });
  document.getElementById("scope-theme-title").textContent = `${releaseThemeLabels[activeScopeTheme]} · ${releaseLabels[activeScopeRelease]}`;
  document.getElementById("scope-theme-count").textContent = `${items.length} items`;

  const list = document.getElementById("scope-item-list");
  list.setAttribute("aria-label", `${releaseThemeLabels[activeScopeTheme]} ${releaseLabels[activeScopeRelease]} delivery items`);
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
      renderScopeDetail(activeReleaseScope.find((item) => item.id === button.dataset.scopeItem));
    });
  });

  const end = Math.min(start + scopePageSize, items.length);
  document.getElementById("scope-page-label").textContent = `${start + 1}–${end} of ${items.length}`;
  document.getElementById("scope-page-prev").disabled = activeScopePage === 0;
  document.getElementById("scope-page-next").disabled = activeScopePage === pageCount - 1;
  document.getElementById("scope-footer-release").textContent = `${releaseLabels[activeScopeRelease]} delivery scope from Delivery Pulse · regression and miscellaneous epics excluded.`;
  renderScopeDetail(visibleItems[0]);
}

releaseScopeRoot?.querySelectorAll("[data-scope-theme]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    renderScopeTheme(button.dataset.scopeTheme);
  });
});

releaseScopeRoot?.querySelectorAll("[data-scope-release]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    renderScopeRelease(button.dataset.scopeRelease);
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

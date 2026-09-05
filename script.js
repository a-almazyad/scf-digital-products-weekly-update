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

// Delivery Pulse filtered snapshot, captured 5 September 2026.
// Entries retain squad/sprint boundaries, including epics shared across groups.
const releaseScope = [
  {"id": "BSQ-3254", "title": "[Admin] Update Primary Permission Assignee Eligibility Rules", "url": "https://manafaco.atlassian.net/browse/BSQ-3254", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4142", "sourceTitle": "DF-4142 - [Admin] Update Primary Permission Assignee Eligibility Rules", "theme": "borrower", "signal": "Approved", "tone": "progress"},
  {"id": "BSQ-3248", "title": "[Admin] Register and Track External Delegations", "url": "https://manafaco.atlassian.net/browse/BSQ-3248", "labels": [], "statuses": [["Approved", 4, "approved"]], "tickets": 4, "df": "DF-4332", "sourceTitle": "DF-4332 - [Admin] Register and Track External Delegations", "theme": "borrower", "signal": "Approved", "tone": "progress"},
  {"id": "BSQ-3251", "title": "[Admin] Owner Related Companies", "url": "https://manafaco.atlassian.net/browse/BSQ-3251", "labels": [], "statuses": [["UAT Ready", 1, "uat"]], "tickets": 1, "df": "DF-4328", "sourceTitle": "DF-4328 - [Admin] Owner Related Companies", "theme": "borrower", "signal": "UAT Ready", "tone": "testing"},
  {"id": "BSQ-3215", "title": "[Borrower] [Admin] User Management Post-Launch Enhancements - Part 2", "url": "https://manafaco.atlassian.net/browse/BSQ-3215", "labels": [], "statuses": [["In Testing", 1, "testing"], ["UAT Ready", 4, "uat"], ["Approved", 17, "approved"]], "tickets": 22, "df": "DF-4294", "sourceTitle": "DF-4294 - [Borrower] [Admin] User Management Post-Launch Enhancements - Part 2", "theme": "borrower", "signal": "Mixed status", "tone": "testing"},
  {"id": "BSQ-3033", "title": "Release Regression Q3-2026", "url": "https://manafaco.atlassian.net/browse/BSQ-3033", "labels": [], "statuses": [["In Testing", 1, "testing"], ["Approved", 1, "approved"]], "tickets": 2, "df": "", "sourceTitle": "Release Regression Q3-2026", "theme": "borrower", "signal": "Mixed status", "tone": "testing"},
  {"id": "BSQ-3034", "title": "Miscellaneous Q3-2026", "url": "https://manafaco.atlassian.net/browse/BSQ-3034", "labels": [], "statuses": [["In Testing", 1, "testing"], ["Approved", 3, "approved"]], "tickets": 4, "df": "", "sourceTitle": "Miscellaneous Q3-2026", "theme": "borrower", "signal": "Mixed status", "tone": "testing"},
  {"id": "EMQ-5853", "title": "[SCF][FinOps] Reject Pending EPs by Supplier and Program", "url": "https://manafaco.atlassian.net/browse/EMQ-5853", "labels": [], "statuses": [["Todo", 1, "todo"], ["Approved", 3, "approved"]], "tickets": 4, "df": "DF-4324", "sourceTitle": "DF-4324 - [SCF][FinOps] Reject Pending EPs by Supplier and Program", "theme": "finops", "signal": "Live (confirmed)", "tone": "complete", "note": "Live confirmed in this weekly update. Ticket statuses below reflect Delivery Pulse."},
  {"id": "EMQ-5815", "title": "SCF FinOps – Post-Deployment Feedback and Improvements", "url": "https://manafaco.atlassian.net/browse/EMQ-5815", "labels": [], "statuses": [["Todo", 9, "todo"], ["In Testing", 15, "testing"], ["Approved", 11, "approved"]], "tickets": 35, "df": "DF-4284", "sourceTitle": "DF-4284 - SCF FinOps – Post-Deployment Feedback and Improvements", "theme": "finops", "signal": "Mixed status", "tone": "testing"},
  {"id": "EMQ-5869", "title": "PO Financing Endpoint - Enhancement", "url": "https://manafaco.atlassian.net/browse/EMQ-5869", "labels": [], "statuses": [["Approved", 2, "approved"]], "tickets": 2, "df": "DF-4305", "sourceTitle": "DF-4305 - PO Financing Endpoint - Enhancement", "theme": "scf", "signal": "Approved", "tone": "progress"},
  {"id": "EMQ-5921", "title": "[SCF][Admin] Buyer Program Limit — Shift from Funder-Level to Program-Level SAMA Limits", "url": "https://manafaco.atlassian.net/browse/EMQ-5921", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4402", "sourceTitle": "DF-4402 - [SCF][Admin] Buyer Program Limit — Shift from Funder-Level to Program-Level SAMA Limits", "theme": "scf", "signal": "Approved", "tone": "progress"},
  {"id": "EMQ-5762", "title": "[SCF] [Borrower] V-Wallet - Display All Supplier V-Wallet Transactions & Restrict USD Wallet Information Display", "url": "https://manafaco.atlassian.net/browse/EMQ-5762", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4265", "sourceTitle": "DF-4265 - [SCF] [Borrower] V-Wallet - Display All Supplier V-Wallet Transactions & Restrict USD Wallet Information Display", "theme": "scf", "signal": "Approved", "tone": "progress"},
  {"id": "EMQ-5880", "title": "[SCF][SMBC] Email Integration - Migrate File Exchange Format from CSV to XLSX", "url": "https://manafaco.atlassian.net/browse/EMQ-5880", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4346", "sourceTitle": "DF-4346 - [SCF][SMBC] Email Integration - Migrate File Exchange Format from CSV to XLSX", "theme": "scf", "signal": "Approved", "tone": "progress"},
  {"id": "EMQ-5879", "title": "[SCF][SMBC] Inbound Files - Support Password-Protected (Encrypted) Attachments", "url": "https://manafaco.atlassian.net/browse/EMQ-5879", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4344", "sourceTitle": "DF-4344 - [SCF][SMBC] Inbound Files - Support Password-Protected (Encrypted) Attachments", "theme": "scf", "signal": "Approved", "tone": "progress"},
  {"id": "EMQ-5939", "title": "[SCF] Taulia Funding Document PDF API Manager", "url": "https://manafaco.atlassian.net/browse/EMQ-5939", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4398", "sourceTitle": "DF-4398 - [SCF] Taulia Funding Document PDF API Manager", "theme": "scf", "signal": "Approved", "tone": "progress"},
  {"id": "EMQ-5871", "title": "[SNB] Financing Request File - Change date format from dashes to slashes", "url": "https://manafaco.atlassian.net/browse/EMQ-5871", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4288", "sourceTitle": "DF-4288 - [SNB] Financing Request File - Change date format from dashes to slashes", "theme": "scf", "signal": "Approved", "tone": "progress"},
  {"id": "EMQ-5711", "title": "BNPP - End of Month Manafa Fees Reconciliation - Sending & Receiving", "url": "https://manafaco.atlassian.net/browse/EMQ-5711", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4136", "sourceTitle": "DF-4136 - BNPP - End of Month Manafa Fees Reconciliation - Sending & Receiving", "theme": "scf", "signal": "Approved", "tone": "progress"},
  {"id": "EMQ-5767", "title": "[SCF] Taulia Onboarding APIs Impact & Interactions", "url": "https://manafaco.atlassian.net/browse/EMQ-5767", "labels": [], "statuses": [["Approved", 3, "approved"]], "tickets": 3, "df": "DF-4071", "sourceTitle": "DF-4071 - [SCF] Taulia Onboarding APIs Impact & Interactions", "theme": "scf", "signal": "Approved", "tone": "progress"},
  {"id": "EMQ-5825", "title": "[Admin][Invoice Management] Add Payer Column & Filter to Invoices Table", "url": "https://manafaco.atlassian.net/browse/EMQ-5825", "labels": [], "statuses": [["UAT Ready", 1, "uat"]], "tickets": 1, "df": "DF-4188", "sourceTitle": "DF-4188 - [Admin][Invoice Management] Add Payer Column & Filter to Invoices Table", "theme": "scf", "signal": "UAT Ready", "tone": "testing"},
  {"id": "EMQ-5338", "title": "[J.P. Morgan] Adjusting Financing Calculation", "url": "https://manafaco.atlassian.net/browse/EMQ-5338", "labels": [], "statuses": [["UAT Ready", 3, "uat"]], "tickets": 3, "df": "DF-3936", "sourceTitle": "DF-3936 - [J.P. Morgan] Adjusting Financing Calculation", "theme": "scf", "signal": "UAT Ready", "tone": "testing"},
  {"id": "EMQ-5352", "title": "Direct-to-Supplier Funding Model V1.0", "url": "https://manafaco.atlassian.net/browse/EMQ-5352", "labels": [], "statuses": [["UAT Ready", 2, "uat"], ["Approved", 2, "approved"]], "tickets": 4, "df": "DF-3957", "sourceTitle": "DF-3957 - Direct-to-Supplier Funding Model V1.0", "theme": "scf", "signal": "Mixed status", "tone": "testing"},
  {"id": "EMQ-5902", "title": "Funder Integration - Automatic Email for File Errors - Slack Notifications", "url": "https://manafaco.atlassian.net/browse/EMQ-5902", "labels": ["will-close-with-regression"], "statuses": [["In Testing", 2, "testing"]], "tickets": 2, "df": "DF-4385", "sourceTitle": "DF-4385 - Funder Integration - Automatic Email for File Errors - Slack Notifications", "theme": "scf", "signal": "In Testing", "tone": "testing"},
  {"id": "EMQ-5596", "title": "Miscellaneous Q3-2026", "url": "https://manafaco.atlassian.net/browse/EMQ-5596", "labels": [], "statuses": [["Approved", 4, "approved"]], "tickets": 4, "df": "", "sourceTitle": "Miscellaneous Q3-2026", "theme": "scf", "signal": "Approved", "tone": "progress"},
  {"id": "EMQ-4983", "title": "SCF - Production issues", "url": "https://manafaco.atlassian.net/browse/EMQ-4983", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "", "sourceTitle": "SCF - Production isuues", "theme": "scf", "signal": "Approved", "tone": "progress"},
  {"id": "EMQ-5595", "title": "Release Regression Q3-2026", "url": "https://manafaco.atlassian.net/browse/EMQ-5595", "labels": [], "statuses": [["Todo", 1, "todo"], ["In Progress", 1, "progress"], ["Dev Done", 1, "devdone"], ["In Testing", 2, "testing"], ["Approved", 6, "approved"]], "tickets": 11, "df": "", "sourceTitle": "Release Regression Q3-2026", "theme": "scf", "signal": "Mixed status", "tone": "testing"},
  {"id": "ASQ-5084", "title": "Hotfix-Control Collaterals reflection - Loan level linking", "url": "https://manafaco.atlassian.net/browse/ASQ-5084", "labels": [], "statuses": [["In Production", 1, "production"]], "tickets": 1, "df": "DF-4259", "sourceTitle": "DF-4259 - Hotfix-Control Collaterals reflection - Loan level linking", "theme": "admin", "signal": "In Production", "tone": "complete"},
  {"id": "ASQ-5104", "title": "Enhancement-Add filters to Credit Instrument Details master View", "url": "https://manafaco.atlassian.net/browse/ASQ-5104", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4270", "sourceTitle": "DF-4270 - Enhancement-Add filters to Credit Instrument Details master View", "theme": "admin", "signal": "Approved", "tone": "progress"},
  {"id": "ASQ-5153", "title": "[Admin] Remove the VAT Field in Borrower Manual Invoice Creation and Rely on the VAT in General Settings", "url": "https://manafaco.atlassian.net/browse/ASQ-5153", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4361", "sourceTitle": "DF-4361 - [Admin] Remove the VAT Field in Borrower Manual Invoice Creation and Rely on the VAT in General Settings", "theme": "admin", "signal": "Approved", "tone": "progress"},
  {"id": "ASQ-5087", "title": "Enhancement- adding filter to fund request page", "url": "https://manafaco.atlassian.net/browse/ASQ-5087", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4331", "sourceTitle": "DF-4331 - Enhancement- adding filter to fund request page", "theme": "admin", "signal": "Approved", "tone": "progress"},
  {"id": "ASQ-5074", "title": "[Admin][Invoice Management] Customers List — Remove Redundant Bank Info Columns", "url": "https://manafaco.atlassian.net/browse/ASQ-5074", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4308", "sourceTitle": "DF-4308 - [Admin][Invoice Management] Customers List — Remove Redundant Bank Info Columns", "theme": "admin", "signal": "Approved", "tone": "progress"},
  {"id": "ASQ-5105", "title": "[Admin]Attach Image Screenshots", "url": "https://manafaco.atlassian.net/browse/ASQ-5105", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4336", "sourceTitle": "DF-4336 - [Admin]Attach Image Screenshots", "theme": "admin", "signal": "Approved", "tone": "progress"},
  {"id": "ASQ-5081", "title": "Switcher Enhancement", "url": "https://manafaco.atlassian.net/browse/ASQ-5081", "labels": [], "statuses": [["Approved", 2, "approved"]], "tickets": 2, "df": "DF-4293", "sourceTitle": "DF-4293 - Switcher Enhancement", "theme": "admin", "signal": "Approved", "tone": "progress"},
  {"id": "ASQ-5022", "title": "[Admin] Enable duplicating a Financing Offer", "url": "https://manafaco.atlassian.net/browse/ASQ-5022", "labels": [], "statuses": [["Approved", 2, "approved"]], "tickets": 2, "df": "DF-4269", "sourceTitle": "DF-4269 - [Admin] Enable duplicating a Financing Offer", "theme": "admin", "signal": "Approved", "tone": "progress"},
  {"id": "ASQ-5103", "title": "Enhancement - Facility configuration", "url": "https://manafaco.atlassian.net/browse/ASQ-5103", "labels": [], "statuses": [["Approved", 2, "approved"]], "tickets": 2, "df": "DF-4330", "sourceTitle": "DF-4330 - Enhancement - Facility configuration", "theme": "admin", "signal": "Approved", "tone": "progress"},
  {"id": "ASQ-5152", "title": "[Hotfix] VAT Percentage on Invoice Files Incorrect Due to Rounding of Calculated VAT Amount", "url": "https://manafaco.atlassian.net/browse/ASQ-5152", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4359", "sourceTitle": "DF-4359 - [Hotfix] VAT Percentage on Invoice Files Incorrect Due to Rounding of Calculated VAT Amount", "theme": "admin", "signal": "Approved", "tone": "progress"},
  {"id": "ASQ-5214", "title": "Access Matrix - Apply Operation Team User Group Permissions (Operation-L1, Operation-L2, Operation-L3)", "url": "https://manafaco.atlassian.net/browse/ASQ-5214", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4439", "sourceTitle": "[HotFix] DF-4439 - Access Matrix - Apply Operation Team User Group Permissions (Operation-L1, Operation-L2, Operation-L3)", "theme": "admin", "signal": "Approved", "tone": "progress"},
  {"id": "ASQ-5078", "title": "HotFix-[Debt] Periodic Review & Facility Change - Route/Validate Credit Line Facilities Using Outstanding Amount", "url": "https://manafaco.atlassian.net/browse/ASQ-5078", "labels": [], "statuses": [["Approved", 2, "approved"]], "tickets": 2, "df": "DF-4335", "sourceTitle": "DF-4335 - HotFix-[Debt] Periodic Review & Facility Change - Route/Validate Credit Line Facilities Using Outstanding Amount", "theme": "admin", "signal": "Approved", "tone": "progress"},
  {"id": "ASQ-913", "title": "Production Issues", "url": "https://manafaco.atlassian.net/browse/ASQ-913", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "", "sourceTitle": "Production Issues", "theme": "admin", "signal": "Approved", "tone": "progress"},
  {"id": "ASQ-5083", "title": "Add Header Breadcrumbs for CRM & Invoice", "url": "https://manafaco.atlassian.net/browse/ASQ-5083", "labels": [], "statuses": [["UAT Ready", 1, "uat"]], "tickets": 1, "df": "DF-4291", "sourceTitle": "DF-4291 - Add Header Breadcrumbs for CRM & Invoice", "theme": "admin", "signal": "UAT Ready", "tone": "testing"},
  {"id": "ASQ-5107", "title": "Job Title Creation & Edit Handling in Job Title Mapping", "url": "https://manafaco.atlassian.net/browse/ASQ-5107", "labels": [], "statuses": [["UAT Ready", 1, "uat"]], "tickets": 1, "df": "DF-4348", "sourceTitle": "DF-4348 - Job Title Creation & Edit Handling in Job Title Mapping", "theme": "admin", "signal": "UAT Ready", "tone": "testing"},
  {"id": "ASQ-5082", "title": "Sidebar Enhancement for CRM & Invoice", "url": "https://manafaco.atlassian.net/browse/ASQ-5082", "labels": [], "statuses": [["UAT Ready", 1, "uat"]], "tickets": 1, "df": "DF-4292", "sourceTitle": "DF-4292 - Sidebar Enhancement for CRM & Invoice", "theme": "admin", "signal": "UAT Ready", "tone": "testing"},
  {"id": "ASQ-5154", "title": "Handle Long Company Names in Tax Invoice", "url": "https://manafaco.atlassian.net/browse/ASQ-5154", "labels": [], "statuses": [["UAT Ready", 1, "uat"]], "tickets": 1, "df": "DF-4364", "sourceTitle": "DF-4364 - Handle Long Company Names in Tax Invoice", "theme": "admin", "signal": "UAT Ready", "tone": "testing"},
  {"id": "ASQ-5085", "title": "Funder Management - Consider the manually entered Qawaem in the RAC eligibility for the funders", "url": "https://manafaco.atlassian.net/browse/ASQ-5085", "labels": [], "statuses": [["UAT Ready", 1, "uat"], ["Approved", 1, "approved"]], "tickets": 2, "df": "DF-4187", "sourceTitle": "DF-4187 - Funders Managment - Consider the manually entered Qawaem in the RAC elegibility for the funders", "theme": "admin", "signal": "Mixed status", "tone": "testing"},
  {"id": "ASQ-5127", "title": "Facility Agreement Update", "url": "https://manafaco.atlassian.net/browse/ASQ-5127", "labels": [], "statuses": [["UAT Ready", 1, "uat"], ["Approved", 2, "approved"]], "tickets": 3, "df": "DF-4339", "sourceTitle": "DF-4339 - Facility Agreement Update", "theme": "admin", "signal": "Mixed status", "tone": "testing"},
  {"id": "ASQ-5080", "title": "[Admin] Financial Ratios & Qawaem Reduce Update Cycle to 4 Months and Add Re-fetch Reminder - update the company size with every fetch - rename a column in Mudad report", "url": "https://manafaco.atlassian.net/browse/ASQ-5080", "labels": [], "statuses": [["UAT Ready", 1, "uat"], ["Approved", 1, "approved"]], "tickets": 2, "df": "DF-4177", "sourceTitle": "DF-4177 - [Admin] Financial Ratios & Qawaem Reduce Update Cycle to 4 Months and Add Re-fetch Reminder - update the company size with every fetch - rename a column in Mudad report", "theme": "admin", "signal": "Mixed status", "tone": "testing"},
  {"id": "ASQ-4975", "title": "Capex product - Admin", "url": "https://manafaco.atlassian.net/browse/ASQ-4975", "labels": ["will-spill-over-r63"], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-3752", "sourceTitle": "DF-3752 - Capex product - Admin", "theme": "admin", "signal": "Approved", "tone": "progress"},
  {"id": "ASQ-4723", "title": "Miscellaneous Q3-2026", "url": "https://manafaco.atlassian.net/browse/ASQ-4723", "labels": [], "statuses": [["Approved", 6, "approved"], ["In Production", 1, "production"]], "tickets": 7, "df": "", "sourceTitle": "Miscellaneous Q3-2026", "theme": "admin", "signal": "Mixed status", "tone": "progress"},
  {"id": "ASQ-4724", "title": "Release Regression Q3-2026", "url": "https://manafaco.atlassian.net/browse/ASQ-4724", "labels": [], "statuses": [["Dev Done", 1, "devdone"], ["In Testing", 1, "testing"], ["Approved", 22, "approved"]], "tickets": 24, "df": "", "sourceTitle": "Release Regression Q3-2026", "theme": "admin", "signal": "Mixed status", "tone": "testing"},
  {"id": "ASQ-5130", "title": "Rename Sales CRM to Customer Relationship", "url": "https://manafaco.atlassian.net/browse/ASQ-5130", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4337", "sourceTitle": "DF-4337 - Rename Sales CRM to Customer Relationship", "theme": "crm", "signal": "Approved", "tone": "progress"},
  {"id": "ASQ-5197", "title": "[CRM] SIDF Tag — Bulk Tag Leads and Registered Leads by CR Match", "url": "https://manafaco.atlassian.net/browse/ASQ-5197", "labels": [], "statuses": [["Approved", 1, "approved"]], "tickets": 1, "df": "DF-4434", "sourceTitle": "DF-4434 - [CRM] SIDF Tag — Bulk Tag Leads and Registered Leads by CR Match", "theme": "crm", "signal": "Approved", "tone": "progress"},
  {"id": "ASQ-4601", "title": "Leads Management In Sales CRM", "url": "https://manafaco.atlassian.net/browse/ASQ-4601", "labels": [], "statuses": [["UAT Ready", 11, "uat"], ["Approved", 4, "approved"]], "tickets": 15, "df": "DF-3718", "sourceTitle": "DF-3718 - Leads Management In Sales CRM", "theme": "crm", "signal": "Mixed status", "tone": "testing"},
  {"id": "ASQ-5119", "title": "CRM - Show Support Report Dialog in CRM", "url": "https://manafaco.atlassian.net/browse/ASQ-5119", "labels": [], "statuses": [["UAT Ready", 1, "uat"]], "tickets": 1, "df": "DF-4354", "sourceTitle": "DF-4354 - CRM - Show Support Report Dialog in CRM", "theme": "crm", "signal": "UAT Ready", "tone": "testing"},
  {"id": "ASQ-4724", "title": "Release Regression Q3-2026", "url": "https://manafaco.atlassian.net/browse/ASQ-4724", "labels": [], "statuses": [["On Hold", 1, "hold"], ["In Testing", 1, "testing"], ["Approved", 7, "approved"]], "tickets": 9, "df": "", "sourceTitle": "Release Regression Q3-2026", "theme": "crm", "signal": "Mixed status", "tone": "hold"}
];
const nextReleaseScope = [
  {"id": "BSQ-3215", "title": "[Borrower] [Admin] User Management Post-Launch Enhancements - Part 2", "url": "https://manafaco.atlassian.net/browse/BSQ-3215", "labels": [], "statuses": [["Todo", 1, "todo"]], "tickets": 1, "df": "DF-4294", "sourceTitle": "DF-4294 - [Borrower] [Admin] User Management Post-Launch Enhancements - Part 2", "theme": "borrower", "signal": "Todo", "tone": "planned"},
  {"id": "BSQ-3033", "title": "Release Regression Q3-2026", "url": "https://manafaco.atlassian.net/browse/BSQ-3033", "labels": [], "statuses": [["Todo", 1, "todo"]], "tickets": 1, "df": "", "sourceTitle": "Release Regression Q3-2026", "theme": "borrower", "signal": "Todo", "tone": "planned"},
  {"id": "BSQ-3034", "title": "Miscellaneous Q3-2026", "url": "https://manafaco.atlassian.net/browse/BSQ-3034", "labels": [], "statuses": [["Todo", 1, "todo"], ["In Testing", 1, "testing"]], "tickets": 2, "df": "", "sourceTitle": "Miscellaneous Q3-2026", "theme": "borrower", "signal": "Mixed status", "tone": "testing"},
  {"id": "BSQ-2988", "title": "[Debt][Borrower] Onboarding Activation Journey V2", "url": "https://manafaco.atlassian.net/browse/BSQ-2988", "labels": ["will-spill-over-r63"], "statuses": [["Todo", 1, "todo"], ["On Hold", 2, "hold"], ["Dev Done", 9, "devdone"], ["In Testing", 2, "testing"], ["UAT Ready", 4, "uat"], ["Approved", 8, "approved"]], "tickets": 26, "df": "DF-3357", "sourceTitle": "DF-3357 - [Debt][Borrower] Onboarding Activation Jouenry V2", "theme": "borrower", "signal": "Mixed status", "tone": "hold"},
  {"id": "BSQ-3272", "title": "Borrower Financing Journey V2", "url": "https://manafaco.atlassian.net/browse/BSQ-3272", "labels": ["will-spill-over-r63"], "statuses": [["Todo", 14, "todo"], ["On Hold", 1, "hold"], ["In Progress", 2, "progress"], ["Dev Done", 11, "devdone"], ["In Testing", 10, "testing"]], "tickets": 38, "df": "DF-4373", "sourceTitle": "DF-4373 - Borrower Financing Journey V2", "theme": "borrower", "signal": "Mixed status", "tone": "hold"},
  {"id": "BSQ-3187", "title": "Capex product - Borrower", "url": "https://manafaco.atlassian.net/browse/BSQ-3187", "labels": ["will-spill-over-r63"], "statuses": [["On Hold", 1, "hold"], ["Dev Done", 4, "devdone"], ["In Testing", 19, "testing"], ["UAT Ready", 4, "uat"], ["Approved", 5, "approved"]], "tickets": 33, "df": "DF-4283", "sourceTitle": "DF-4283 - Capex product - Borrower", "theme": "borrower", "signal": "Mixed status", "tone": "hold"},
  {"id": "BSQ-3323", "title": "[Borrower]Allow Borrowers to Upload a Signature for Digital Signing", "url": "https://manafaco.atlassian.net/browse/BSQ-3323", "labels": [], "statuses": [["Todo", 1, "todo"]], "tickets": 1, "df": "DF-4206", "sourceTitle": "DF-4206 - [Borrower]Allow Borrowers to Upload a Signature for Digital Signing", "theme": "borrower", "signal": "Todo", "tone": "planned"},
  {"id": "EMQ-5904", "title": "[SCF FinOps] - Phase 3", "url": "https://manafaco.atlassian.net/browse/EMQ-5904", "labels": [], "statuses": [["In Testing", 1, "testing"]], "tickets": 1, "df": "DF-4170", "sourceTitle": "DF-4170 - [SCF FinOps] - Phase 3", "theme": "finops", "signal": "In Testing", "tone": "testing"},
  {"id": "EMQ-5905", "title": "[SCF FinOps] Supplier Onboarding to Funder Function", "url": "https://manafaco.atlassian.net/browse/EMQ-5905", "labels": [], "statuses": [["Todo", 4, "todo"]], "tickets": 4, "df": "DF-4389", "sourceTitle": "DF-4389 - [SCF FinOps] Supplier Onboarding to Funder Function", "theme": "finops", "signal": "Todo", "tone": "planned"},
  {"id": "EMQ-5983", "title": "[SCF FinOps] Handling International IBANs and International Banks", "url": "https://manafaco.atlassian.net/browse/EMQ-5983", "labels": [], "statuses": [["Todo", 3, "todo"], ["Dev Done", 1, "devdone"]], "tickets": 4, "df": "DF-3480", "sourceTitle": "DF-3480 - [SCF FinOps] Handling International IBANs and International Banks", "theme": "finops", "signal": "Mixed status", "tone": "progress"},
  {"id": "EMQ-5767", "title": "[SCF] Taulia Onboarding APIs Impact & Interactions", "url": "https://manafaco.atlassian.net/browse/EMQ-5767", "labels": [], "statuses": [["In Testing", 1, "testing"]], "tickets": 1, "df": "DF-4071", "sourceTitle": "DF-4071 - [SCF] Taulia Onboarding APIs Impact & Interactions", "theme": "scf", "signal": "In Testing", "tone": "testing"},
  {"id": "EMQ-5596", "title": "Miscellaneous Q3-2026", "url": "https://manafaco.atlassian.net/browse/EMQ-5596", "labels": [], "statuses": [["Todo", 8, "todo"], ["On Hold", 4, "hold"], ["In Progress", 1, "progress"], ["Dev Done", 1, "devdone"], ["In Testing", 2, "testing"]], "tickets": 16, "df": "", "sourceTitle": "Miscellaneous Q3-2026", "theme": "scf", "signal": "Mixed status", "tone": "hold"},
  {"id": "EMQ-5595", "title": "Release Regression Q3-2026", "url": "https://manafaco.atlassian.net/browse/EMQ-5595", "labels": [], "statuses": [["Todo", 3, "todo"], ["On Hold", 1, "hold"], ["In Testing", 1, "testing"]], "tickets": 5, "df": "", "sourceTitle": "Release Regression Q3-2026", "theme": "scf", "signal": "Mixed status", "tone": "hold"},
  {"id": "EMQ-5811", "title": "[SCF] Automating SAMA SCF Report - Enhancement", "url": "https://manafaco.atlassian.net/browse/EMQ-5811", "labels": ["OnHold-BI"], "statuses": [["Todo", 1, "todo"]], "tickets": 1, "df": "DF-4120", "sourceTitle": "DF-4120 - [SCF] Automating SAMA SCF Report - Enhancement", "theme": "scf", "signal": "Todo", "tone": "planned"},
  {"id": "EMQ-5463", "title": "[Admin] Auto-sending Supplier Outreach Report", "url": "https://manafaco.atlassian.net/browse/EMQ-5463", "labels": ["open-qa-issues", "will-spill-over-r63"], "statuses": [["In Testing", 2, "testing"], ["UAT Ready", 1, "uat"]], "tickets": 3, "df": "DF-3486", "sourceTitle": "DF-3486 - [Admin] Auto-sending Supplier Outreach Report", "theme": "scf", "signal": "Mixed status", "tone": "testing"},
  {"id": "EMQ-5896", "title": "Automate scheduled sending of the Buyer Report for Aramco", "url": "https://manafaco.atlassian.net/browse/EMQ-5896", "labels": ["open-qa-issues", "will-spill-over-r63"], "statuses": [["In Testing", 1, "testing"]], "tickets": 1, "df": "DF-4329", "sourceTitle": "DF-4329 - Automate scheduled sending of the Buyer Report for Aramco", "theme": "scf", "signal": "In Testing", "tone": "testing"},
  {"id": "EMQ-5716", "title": "[Fees management] Goal seeking fixes", "url": "https://manafaco.atlassian.net/browse/EMQ-5716", "labels": ["clrifications-pending", "will-spill-over-r63"], "statuses": [["Todo", 1, "todo"], ["On Hold", 1, "hold"]], "tickets": 2, "df": "DF-4194", "sourceTitle": "DF-4194 - [Fees management] Goal seeking fixes", "theme": "scf", "signal": "Mixed status", "tone": "hold"},
  {"id": "EMQ-5839", "title": "[SCF][Supplier Banking][Phase 2] Buyer-Configurable Default IBAN Selection", "url": "https://manafaco.atlassian.net/browse/EMQ-5839", "labels": ["will-spill-over-r63"], "statuses": [["In Testing", 5, "testing"]], "tickets": 5, "df": "DF-4322", "sourceTitle": "DF-4322 - [SCF][Supplier Banking][Phase 2] Buyer-Configurable Default IBAN Selection", "theme": "scf", "signal": "In Testing", "tone": "testing"},
  {"id": "EMQ-5693", "title": "[SCF][Supplier Banking] Supplier Banking and Payout Account Management", "url": "https://manafaco.atlassian.net/browse/EMQ-5693", "labels": ["will-spill-over-r63"], "statuses": [["UAT QUEUE", 7, "queue"], ["Todo", 5, "todo"], ["In Testing", 1, "testing"], ["UAT Ready", 3, "uat"], ["Approved", 9, "approved"]], "tickets": 25, "df": "DF-4192", "sourceTitle": "DF-4192 - [SCF][Supplier Banking] Supplier Banking and Payout Account Management", "theme": "scf", "signal": "Mixed status", "tone": "testing"},
  {"id": "EMQ-5923", "title": "[SCF] Borrower Select a Preferred Bank Account", "url": "https://manafaco.atlassian.net/browse/EMQ-5923", "labels": ["will-spill-over-r63"], "statuses": [["Todo", 4, "todo"], ["In Progress", 1, "progress"]], "tickets": 5, "df": "DF-4325", "sourceTitle": "DF-4325 - [SCF] Borrower Select a Preferred Bank Account", "theme": "scf", "signal": "Mixed status", "tone": "progress"},
  {"id": "EMQ-5089", "title": "[SCF] [Admin] [Buyer] Supplier Yearly Spend", "url": "https://manafaco.atlassian.net/browse/EMQ-5089", "labels": ["might-spill-over-r63"], "statuses": [["Todo", 5, "todo"], ["In Testing", 1, "testing"]], "tickets": 6, "df": "DF-3778", "sourceTitle": "DF-3778 - [SCF] [Admin] [Buyer] Supplier Yearly Spend", "theme": "scf", "signal": "Mixed status", "tone": "testing"},
  {"id": "EMQ-5872", "title": "FAB - SFTP Access Credentials", "url": "https://manafaco.atlassian.net/browse/EMQ-5872", "labels": ["sftp-hostname-ip-not-provided"], "statuses": [["Todo", 1, "todo"]], "tickets": 1, "df": "DF-4277", "sourceTitle": "DF-4277 - FAB - SFTP Access Credentials", "theme": "scf", "signal": "Todo", "tone": "planned"},
  {"id": "EMQ-5870", "title": "Riyadh Bank - B2B API Manager", "url": "https://manafaco.atlassian.net/browse/EMQ-5870", "labels": ["might-spill-over-r63"], "statuses": [["On Hold", 1, "hold"]], "tickets": 1, "df": "DF-4302", "sourceTitle": "DF-4302 - Riyadh Bank - B2B API Manager", "theme": "scf", "signal": "On Hold", "tone": "hold"},
  {"id": "EMQ-5715", "title": "Standard Chartered Bank - B2B API Manager", "url": "https://manafaco.atlassian.net/browse/EMQ-5715", "labels": ["some-issue-pending-on-3rd-party"], "statuses": [["On Hold", 1, "hold"]], "tickets": 1, "df": "DF-3714", "sourceTitle": "DF-3714 - Standard Chartered Bank - B2B API Manager", "theme": "scf", "signal": "On Hold", "tone": "hold"},
  {"id": "EMQ-5961", "title": "[SCF] Pricing Engine - Move Funder Rules from Hardcoded Logic to Funder Configuration", "url": "https://manafaco.atlassian.net/browse/EMQ-5961", "labels": [], "statuses": [["Todo", 9, "todo"]], "tickets": 9, "df": "DF-4411", "sourceTitle": "DF-4411 - [SCF] Pricing Engine - Move Funder Rules from Hardcoded Logic to Funder Configuration", "theme": "scf", "signal": "Todo", "tone": "planned"},
  {"id": "EMQ-5981", "title": "[Pricing Engine] [SIDF] [SIC] SIDF & SIC - T-1 Processing Impact Analysis", "url": "https://manafaco.atlassian.net/browse/EMQ-5981", "labels": [], "statuses": [["Todo", 1, "todo"]], "tickets": 1, "df": "DF-4423", "sourceTitle": "DF-4423 - [Pricing Engine] [SIDF] [SIC] SIDF & SIC - T-1 Processing Impact Analysis", "theme": "scf", "signal": "Todo", "tone": "planned"},
  {"id": "EMQ-5873", "title": "Standard Chartered Bank - SFTP Access Credentials", "url": "https://manafaco.atlassian.net/browse/EMQ-5873", "labels": ["some-issue-pending-on-3rd-party"], "statuses": [["Todo", 1, "todo"]], "tickets": 1, "df": "DF-4275", "sourceTitle": "DF-4275 - Standard Chartered Bank - SFTP Access Credentials", "theme": "scf", "signal": "Todo", "tone": "planned"},
  {"id": "ASQ-4975", "title": "Capex product - Admin", "url": "https://manafaco.atlassian.net/browse/ASQ-4975", "labels": ["will-spill-over-r63"], "statuses": [["UAT QUEUE", 5, "queue"], ["On Hold", 3, "hold"], ["In Testing", 25, "testing"], ["UAT Ready", 4, "uat"], ["Approved", 8, "approved"]], "tickets": 45, "df": "DF-3752", "sourceTitle": "DF-3752 - Capex product - Admin", "theme": "admin", "signal": "Mixed status", "tone": "hold"},
  {"id": "ASQ-4723", "title": "Miscellaneous Q3-2026", "url": "https://manafaco.atlassian.net/browse/ASQ-4723", "labels": [], "statuses": [["Todo", 1, "todo"], ["On Hold", 6, "hold"], ["Dev Done", 1, "devdone"], ["In Testing", 1, "testing"]], "tickets": 9, "df": "", "sourceTitle": "Miscellaneous Q3-2026", "theme": "admin", "signal": "Mixed status", "tone": "hold"},
  {"id": "ASQ-4724", "title": "Release Regression Q3-2026", "url": "https://manafaco.atlassian.net/browse/ASQ-4724", "labels": [], "statuses": [["Todo", 1, "todo"], ["On Hold", 1, "hold"], ["In Progress", 2, "progress"], ["Dev Done", 1, "devdone"]], "tickets": 5, "df": "", "sourceTitle": "Release Regression Q3-2026", "theme": "admin", "signal": "Mixed status", "tone": "hold"},
  {"id": "ASQ-5114", "title": "Internal Design System - Create Permissions Page", "url": "https://manafaco.atlassian.net/browse/ASQ-5114", "labels": [], "statuses": [["Dev Done", 2, "devdone"]], "tickets": 2, "df": "DF-4338", "sourceTitle": "DF-4338 - Internal Design System - Create Permissions Page", "theme": "admin", "signal": "Dev Done", "tone": "progress"},
  {"id": "ASQ-5196", "title": "CLM Project Setup", "url": "https://manafaco.atlassian.net/browse/ASQ-5196", "labels": [], "statuses": [["In Progress", 2, "progress"]], "tickets": 2, "df": "DF-0000", "sourceTitle": "DF-0000 CLM Project Setup", "theme": "admin", "signal": "In Progress", "tone": "progress"},
  {"id": "ASQ-5170", "title": "Client Lifecycle Management (CLM) Platform – Build Platform Foundation, Case Management & Entity List", "url": "https://manafaco.atlassian.net/browse/ASQ-5170", "labels": ["will-spill-over-r63"], "statuses": [["Todo", 8, "todo"], ["Dev Done", 1, "devdone"]], "tickets": 9, "df": "DF-4261", "sourceTitle": "DF-4261 - Client Lifecycle Management (CLM) Platform – Build Platform Foundation, Case Management & Entity List", "theme": "admin", "signal": "Mixed status", "tone": "progress"},
  {"id": "ASQ-5088", "title": "[Debt] Invoice Management - Issue Credit Note for Unpaid Invoices", "url": "https://manafaco.atlassian.net/browse/ASQ-5088", "labels": [], "statuses": [["Todo", 2, "todo"]], "tickets": 2, "df": "DF-4315", "sourceTitle": "DF-4315 - [Debt] Invoice Management - Issue Credit Note for Unpaid Invoices", "theme": "admin", "signal": "Todo", "tone": "planned"},
  {"id": "ASQ-4714", "title": "[UAT Business Feedback ]Revolving and non-revolving Sanads and Facility contract.", "url": "https://manafaco.atlassian.net/browse/ASQ-4714", "labels": [], "statuses": [["Todo", 3, "todo"]], "tickets": 3, "df": "DF-4104", "sourceTitle": "DF-4104 - [UAT Business Feedback ]Revolving and non-revolving Sanads and Facility contract.", "theme": "admin", "signal": "Todo", "tone": "planned"},
  {"id": "ASQ-5206", "title": "[Admin][Collections] Collection Dashboard Enhancements", "url": "https://manafaco.atlassian.net/browse/ASQ-5206", "labels": [], "statuses": [["Todo", 1, "todo"]], "tickets": 1, "df": "DF-4368", "sourceTitle": "DF-4368 - [Admin][Collections] Collection Dashboard Enhancements", "theme": "admin", "signal": "Todo", "tone": "planned"},
  {"id": "ASQ-5205", "title": "[Admin] Adding On-hold status option for LG funding request", "url": "https://manafaco.atlassian.net/browse/ASQ-5205", "labels": [], "statuses": [["Todo", 1, "todo"]], "tickets": 1, "df": "DF-4367", "sourceTitle": "DF-4367 - [Admin] Adding On-hold status option for LG funding request", "theme": "admin", "signal": "Todo", "tone": "planned"},
  {"id": "ASQ-5204", "title": "[Admin] SIMAH Credit History Master-View: revise Last 24 Cycles coding", "url": "https://manafaco.atlassian.net/browse/ASQ-5204", "labels": [], "statuses": [["Todo", 1, "todo"]], "tickets": 1, "df": "DF-4268", "sourceTitle": "DF-4268 - [Admin] SIMAH Credit History Master-View: revise Last 24 Cycles coding", "theme": "admin", "signal": "Todo", "tone": "planned"},
  {"id": "ASQ-5203", "title": "Funder Management - Block Withdrawals Toggle with Permission Control", "url": "https://manafaco.atlassian.net/browse/ASQ-5203", "labels": [], "statuses": [["Todo", 1, "todo"]], "tickets": 1, "df": "DF-4388", "sourceTitle": "DF-4388 - Funders Management - Block Withdrawals Toggle with Permission Control", "theme": "admin", "signal": "Todo", "tone": "planned"},
  {"id": "ASQ-5232", "title": "[Admin]60-Day Countdown for Live Loan", "url": "https://manafaco.atlassian.net/browse/ASQ-5232", "labels": [], "statuses": [["Todo", 1, "todo"]], "tickets": 1, "df": "DF-4370", "sourceTitle": "DF-4370 - [Admin]60-Day Countdown for Live Loan", "theme": "admin", "signal": "Todo", "tone": "planned"},
  {"id": "ASQ-5230", "title": "[admin]Add Comma Separators to Numbers in Communication Record", "url": "https://manafaco.atlassian.net/browse/ASQ-5230", "labels": [], "statuses": [["Dev Done", 1, "devdone"]], "tickets": 1, "df": "DF-4427", "sourceTitle": "DF-4427 - [admin]Add Comma Separators to Numbers in Communication Record", "theme": "admin", "signal": "Dev Done", "tone": "progress"},
  {"id": "ASQ-5233", "title": "[Admin] Showcase User Manual Signature in Admin Portal", "url": "https://manafaco.atlassian.net/browse/ASQ-5233", "labels": [], "statuses": [["Todo", 1, "todo"]], "tickets": 1, "df": "DF-4220", "sourceTitle": "DF-4220 - [Admin] Showcase User Manual Signature in Admin Portal", "theme": "admin", "signal": "Todo", "tone": "planned"},
  {"id": "ASQ-5231", "title": "[Admin]Automated Murabaha", "url": "https://manafaco.atlassian.net/browse/ASQ-5231", "labels": [], "statuses": [["Todo", 1, "todo"]], "tickets": 1, "df": "DF-4416", "sourceTitle": "DF-4416 - [Admin]Automated Murabaha", "theme": "admin", "signal": "Todo", "tone": "planned"},
  {"id": "ASQ-5228", "title": "Funder Management - Adding Cross-Default Configuration to the Funder RAC", "url": "https://manafaco.atlassian.net/browse/ASQ-5228", "labels": [], "statuses": [["Todo", 2, "todo"]], "tickets": 2, "df": "DF-4363", "sourceTitle": "DF-4363 - Funders Management - Adding Cross-Default Configuration to the Funder RAC", "theme": "admin", "signal": "Todo", "tone": "planned"},
  {"id": "ASQ-5066", "title": "Target Management Version 2.0 - CRM", "url": "https://manafaco.atlassian.net/browse/ASQ-5066", "labels": ["will-spill-over-r63"], "statuses": [["Todo", 2, "todo"], ["In Progress", 2, "progress"], ["Dev Done", 1, "devdone"], ["In Testing", 13, "testing"], ["Approved", 1, "approved"]], "tickets": 19, "df": "DF-3976", "sourceTitle": "DF-3976 - Target Management Version 2.0 - CRM", "theme": "crm", "signal": "Mixed status", "tone": "testing"},
  {"id": "ASQ-4882", "title": "Onboarding V2 impacts - Hide Appointment Status + Add Requested Financing Amount", "url": "https://manafaco.atlassian.net/browse/ASQ-4882", "labels": [], "statuses": [["Dev Done", 1, "devdone"]], "tickets": 1, "df": "DF-4114", "sourceTitle": "DF-4114 - Onboarding V2 impacts - Hide Appointment Status + Add Requested Financing Amount", "theme": "crm", "signal": "Dev Done", "tone": "progress"}
];

const releaseThemeLabels = {
  admin: "Admin Sprint",
  crm: "CRM Sprint",
  borrower: "Borrower Sprint",
  scf: "SCF Sprint",
  finops: "SCF FinOps"
};
const releaseScopes = {
  r62: releaseScope,
  r63: nextReleaseScope
};
const releaseLabels = {
  r62: "R62",
  r63: "R63"
};
const scopePageSize = 6;
let activeScopeTheme = "scf";
let activeScopeRelease = "r63";
let activeScopePage = 0;

function scopeLabelTone(label) {
  if (label.includes("spill") || label.includes("pending") || label.includes("remove") || /hold|not-provided|qa-issues/i.test(label)) return "label-risk";
  if (label === "must-have") return "label-must";
  return "";
}

function renderScopeDetail(item) {
  if (!releaseScopeRoot || !item) return;

  const key = item.df ? `${item.id} · ${item.df}` : item.id;
  document.getElementById("scope-detail-key").textContent = key;
  document.getElementById("scope-detail-title").textContent = item.title;
  document.getElementById("scope-detail-tickets").textContent = item.tickets;
  document.getElementById("scope-status-total").textContent = `${item.tickets} total`;

  const note = document.getElementById("scope-detail-note");
  note.textContent = item.note || "";
  note.hidden = !item.note;

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
  document.getElementById("scope-jira-link").href = item.url || `https://manafaco.atlassian.net/browse/${item.jira || item.id}`;

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
    const key = item.df ? `${item.id} · ${item.df}` : item.id;
    const labels = item.labels.slice(0, 2).map((label) => `<i class="${scopeLabelTone(label)}">${label}</i>`).join("");
    return `<button class="scope-item" type="button" role="option" data-scope-item="${item.id}" aria-selected="false">
      <span class="scope-item-copy"><span>${key}</span><strong>${item.title}</strong>${labels ? `<span class="scope-item-labels">${labels}</span>` : ""}</span>
      <span class="scope-item-meta"><span class="scope-signal signal-${item.tone}">${item.signal}</span><small>${item.tickets} ticket${item.tickets === 1 ? "" : "s"}</small></span>
    </button>`;
  }).join("");

  list.querySelectorAll("[data-scope-item]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      renderScopeDetail(items.find((item) => item.id === button.dataset.scopeItem));
    });
  });

  const end = Math.min(start + scopePageSize, items.length);
  document.getElementById("scope-page-label").textContent = `${start + 1}–${end} of ${items.length}`;
  document.getElementById("scope-page-prev").disabled = activeScopePage === 0;
  document.getElementById("scope-page-next").disabled = activeScopePage === pageCount - 1;
  document.getElementById("scope-footer-release").textContent = `${releaseLabels[activeScopeRelease]} · Delivery Pulse snapshot: 5 Sep 2026 · All entries from the selected sprint and squad view.`;
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

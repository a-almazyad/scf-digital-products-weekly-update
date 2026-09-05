# Codex Handoff — SCF Digital Products Weekly Presentation

Last updated: 5 September 2026  
Repository state when this handoff was written: `main` at commit `7761699`  
Working tree: clean  

## 1. Purpose of this file

This file is the complete working context for a new Codex session. The user updates this presentation weekly and wants to continue from the current implementation without re-explaining the product landscape, design requirements, slide structure, publishing workflow, or earlier corrections.

Before making changes, the next Codex session should:

1. Read this file completely.
2. Run `git status --short` and `git pull --rebase origin main`.
3. Inspect `index.html`, `script.js`, `style.css`, `BRAND-TOKENS.md`, and the current rendered deck.
4. Preserve the design and content rules below unless the user explicitly changes them.

## 2. Repository and published presentation

- GitHub repository: <https://github.com/a-almazyad/scf-digital-products-weekly-update>
- Public GitHub Pages presentation: <https://a-almazyad.github.io/scf-digital-products-weekly-update/>
- Local project path used in the original Codex session:
  `/Users/abdullahalmazyad/Documents/Codex/2026-07-26/when-i-want-to-create-slides`
- Default branch: `main`
- The repository was last pulled on 5 September 2026 and was already up to date.
- A teammate was previously invited to contribute to the repository.

The deck is an HTML/CSS/JavaScript presentation, not a PowerPoint file. It is intended to look and behave like a professionally designed slide deck while remaining interactive in a browser.

## 3. Audience, meeting format, and writing style

- Audience: internal SCF stakeholders and internal clients.
- Language: English.
- Typical meeting duration: approximately 30–40 minutes.
- The main presentation must stay short and focused.
- Use direct operational language. Avoid marketing language, slogans, or phrases such as “product-led operations,” “one-channel strategy,” or other terminology that makes the update harder to follow.
- State what changed, its current status, dependencies, and the next action.
- Keep product names and responsibilities precise.
- Do not merge Buyer Management and Funder Management conceptually. They are separate domains and future standalone platforms.
- Use official partner logos wherever possible. Do not recreate or imitate company logos with text or CSS.

## 4. Product and operating context

### Operating buyer programs

- Saudi Energy, abbreviated as **SE**. It was formerly referred to as Saudi Electricity Company or SEC in older material. The deck must use the new Saudi Energy name and branded logo.
- Saudi Aramco.

### Customer and partner channels

- **Borrower/Supplier Channel:** web and mobile experience used by suppliers and borrowers, from signup through profile completion and financing.
- **Buyer Channel:** web experience used by buyer users.
- **Funder Channel:** experience used by local, government, and international funders.

### Internal products

- Buyer Management features currently live inside the Admin Portal.
- Funder Management features currently live inside the Admin Portal.
- Manafa CRM, including the SCF pipeline and Lead Management.
- SCF FinOps, the first product separated from the Admin Portal into its own internal platform.

### Partner and integration workstreams

- SAP Taulia is the middleware/integration partner within SAP buyer environments.
- Funder integrations follow this general lifecycle:
  requirements/kickoff → SDD → development → testing/UAT → pilot → live.
- Embedded-financing partnerships currently shown include Lean/Nphies, Elm, NHC/Supplier Pro, Dhamen, Tasdeed, Nusuk, and Muqeem.

## 5. Non-negotiable visual direction

The visual reference is the user's **CTO Weekly** / **SEF Weekly** presentation. The user rejected earlier versions that were low-color, hard to follow, overly promotional, or visually inconsistent with that reference.

The current visual system is documented in `BRAND-TOKENS.md` and implemented in `style.css`:

- Alexandria typeface.
- Manafa black/ink, violet, blue, light-blue, and neutral surfaces.
- Official Manafa logo.
- Mostly white backgrounds with strong typography and selected violet/green accents.
- Border-led, mostly shadowless layouts.
- No unnecessary gradients.
- Clear slide number, heading, context label, content area, and Manafa footer.
- Partner logos must be clean, legible, and free from unwanted backgrounds.
- Slides should use the available canvas efficiently while remaining readable.

Important design preferences from earlier feedback:

- The funder update must show all funders together on one slide. Do not turn it into tabs or require the presenter to click through each funder.
- The preferred funder layout is a compact grid inspired by the CTO Weekly deck. The current implementation is a 3×3 grid.
- The Taulia slide must use the same visual language as the rest of the deck.
- SCF FinOps deserves a dedicated slide with a clear explanation, launch status, scope, and product screenshots.
- The FinOps screenshots should remain an interactive carousel within the slide rather than three separate screenshots placed together.
- The release-scope slide is interactive and must retain squad selection, R61/R62 selection, pagination, item labels, status detail, and Jira links.

## 6. Current slide order

Slides are sorted by each section's `data-slide` value, not by their physical order in `index.html`.

### Main presentation

1. **Cover — SCF Digital Products**
2. **Items from last weekly**
3. **R61 closeout · R62 delivery plan**
4. **Taulia integration updates**
5. **SCF funder progress**
6. **Embedded financing partnerships**
7. **Thank you**

### Appendix after the Thank You slide

8. **SCF FinOps · v1.1 is live**
9. **Channel updates**
10. **Current internal tools**
11. **Standalone Buyer and Funder Management platforms**

The user explicitly asked that SCF FinOps, channels, internal tools, and standalone Buyer/Funder strategy sit after the Thank You slide as appendix material. Do not move them back into the main flow unless asked.

## 7. Current visible content by slide

### Slide 1 — Cover

- Current date displayed: **30 August 2026**. This must be updated for the next weekly meeting.
- Subtitle: weekly actions, delivery scope, and partner integrations.
- Agenda: last-week items and release delivery, Taulia, funders, embedded financing.
- Buyer-program logos: Saudi Energy and Saudi Aramco.

### Slide 2 — Items from last weekly

Current four items:

1. **Pre-populate company size for existing SCF companies** — completed.
2. **Define the company-size update mechanism** — scheduled for 30 September with the Taulia onboarding API release.
3. **Bulk rejection of pending early payments** — previously targeted for the R61 production deployment/hotfix.
4. **Define SCF IBAN selection and management** — previously expected in the first week of R62.

These statuses are now old and should be reconfirmed for the next weekly update.

Historical clarification:

- Goal-seeking pricing/fee management was once an action item, but it was removed from the action-item slide because it had already launched.
- IBAN management means selecting the correct IBAN when Taulia onboarding provides multiple IBANs, managing the choice, and feeding the correct default back to Taulia for early payments.

### Slide 3 — Interactive R61/R62 delivery scope

The slide currently states:

- R61: 33 epics.
- R62: 57 in-scope epics.
- Five squads: SCF, CRM, Admin, Borrower, and SCF FinOps.
- R61 status at the time of the last Jira check: 21 Production Done and 12 Backlog.
- R62 delivery window: 24 August–4 September 2026.

The R62 window has now ended as of this handoff. The next update will probably need to change this slide to an R62 closeout and R63 delivery plan, but the user must provide or confirm the R63 scope and which R62 items shipped or spilled over.

Interactive behavior in `script.js`:

- `legacyReleaseScope` stores R61.
- `releaseScope` stores R62.
- `releaseScopes` maps the release buttons to those arrays.
- `releaseThemeLabels` defines the five squad names.
- `scopePageSize` is six.
- Clicking a squad filters the active release by theme.
- Clicking R61/R62 changes the release while keeping the squad when possible.
- Item selection updates the right-hand detail panel and Jira link.
- Labels containing `spill`, `pending`, or `remove` use the risk style.
- `must-have` uses the must-have style.

R62 counts currently in the deck:

| Squad | Items |
| --- | ---: |
| SCF Sprint | 22 |
| Admin Sprint | 20 |
| Borrower Sprint | 7 |
| CRM Sprint | 4 |
| SCF FinOps | 4 |
| **Total** | **57** |

Investor Squad and Digital Experience/Public Website work were deliberately excluded because the deck focuses on the user's SCF/digital-business scope. Do not add them unless the user requests it.

Known R62 spillover or special labels supplied by the user:

- DF-3357 Borrower Activation Journey V2 — spill to R63.
- DF-4283 Capex Product — Borrower — spill to R63.
- DF-4373 Borrower Financing Journey V2 — spill to R63.
- DF-3752 Capex Product — Admin — spill to R63.
- DF-3976 Target Management Version 2.0 — CRM — spill to R63.
- DF-4302 Riyadh Bank B2B API Manager — might spill to R63.
- DF-3778 Borrower Channel Taulia onboarding impacts — might spill to R63.
- DF-4324 Reject Pending EPs by Supplier and Program — hotfix delivery.
- DF-4170 SCF FinOps Phase 3 — continues at its own pace.
- DF-4284 FinOps post-deployment feedback — mostly done, with discussions pending.

R61 Jira verification history:

- Jira was queried through the connected Atlassian workspace at `https://manafaco.atlassian.net`.
- The check used the epic keys in `legacyReleaseScope` and Jira `statusCategory = Done`.
- 21 of 33 R61 epics were in **Production Done**.
- 12 were in **Backlog**.
- `ASQ-4875` resolved to the current Jira key `EMQ-5825` for DF-4188; this remapping is preserved through the `jira` field.

R61 items marked Production Done at that check:

- SCF: DF-3492, DF-4021, DF-3832, DF-4164, EMQ-5668, DF-4091, DF-4148, DF-4135.
- Admin: DF-4049, DF-3908, DF-4215, DF-4113, DF-4144, DF-4184, DF-4174.
- CRM: DF-4182, DF-4160.
- Borrower: DF-4121, DF-4102, DF-4198, DF-4011.

R61 items that were still Backlog:

- SCF: DF-3957, DF-4136, DF-4194, DF-3486, DF-3928, DF-3936, DF-4192, DF-3714.
- Admin: DF-4188 / EMQ-5825.
- CRM: DF-3718, DF-4114.
- Borrower: DF-3357.

Do not treat these as permanently current. Re-query Jira when preparing the next closeout.

### Slide 4 — Taulia integration updates

Current workstreams:

1. **Supplier onboarding APIs**
   - Joint testing completed successfully.
   - Taulia production release confirmed for **30 September 2026**.
   - Objective: remove duplicate supplier registration. Buyer-invited suppliers should be retrieved and taken directly through Manafa registration.
2. **Invoice PDF API**
   - One flow covers the initial invoice PDF and retrieving a failed copy.
   - Initial scope agreed.
   - Still waiting for technical Swagger and delivery timeline from Taulia.

Historical correction: there were previously two duplicate PDF-related cards. They were combined into one Invoice PDF API card.

The SAP Taulia logo should remain the actual logo, not a CSS recreation.

### Slide 5 — SCF funder progress

Current design: nine visible cards in a 3×3 grid. Do not replace with tabs.

Current cards and last supplied update:

1. **BNP Paribas / BNPP**
   - BNPP account setup complete.
   - Pending Aramco response on BNPP invoices.
   - Earlier context: Saudi Energy program pilot and fee-transfer testing succeeded; Saudi Energy was treated as live. Aramco is the next buyer rollout.
2. **SMBC**
   - Password-protected file reading and CSV-to-Excel change planned for R63.
   - Sunday maturity and non-working-day push planned for R63.
   - Pilot checklist after NOL.
   - Collection-account setup and invoice approval pending Aramco; NOL also pending.
3. **Riyadh Bank**
   - Relationship manager formalizing request for UAT and production B2B credentials.
   - Riyadh Bank document and SLA remain to be shared.
   - B2B Manager planned for R63.
4. **Standard Chartered Bank / SCB**
   - SCB Manager planned for R63.
   - Account opening pending.
   - API forms follow account opening.
   - Follow up on SDD and SLA.
5. **First Abu Dhabi Bank / FAB**
   - Updated SDD and SLA shared; FAB feedback pending.
   - UAT SFTP planned for R62; production SFTP follows.
   - FAB Manager planned for R63.
6. **Saudi National Bank / SNB**
   - SNB API timeline and technical feedback pending.
7. **Natixis**
   - Product information and inquiry responses shared.
   - Natixis feedback pending.
8. **SIDF**
   - Review T+1 financing implications after 3:00 PM.
   - Assess impact on reports, accounts, and financing status.
9. **GIB**
   - Inquiries answered.
   - Product kickoff pending.

Logo requirements and history:

- Use official-looking clean logos without unwanted boxes/backgrounds.
- Earlier logo issues were a major user complaint.
- Current local logos include BNPP, SMBC, Riyadh Bank, Standard Chartered, Natixis, SIDF, GIB, and others under `assets/logos/`.
- FAB and SNB currently use remote image URLs in `index.html`; consider localizing them if they become unreliable.
- SIDF uses `assets/logos/sidf.png`; this replaced a JPG with excessive white margins.
- BNP Paribas should look green, not silver/gray.
- SMBC should use the standard Latin/global logo presentation rather than an unsuitable regional version with extra Japanese/Chinese characters.

### Slide 6 — Embedded financing partnerships

Current structure follows the more polished CTO Weekly partner-map layout and uses partner logos.

- **Lean + Nphies / healthcare:** first pilot completed with Twaig Health Establishment; now with Sales to close the sales cycle.
- **Elm / government services:** Tasdeed on hold. Dhamen/Nusuk/Muqeem had no material change and testing had not started.
- **NHC / Supplier Pro:** integration complete, but NHC requires the agreement to be signed before production go-live.
- **NHC ERP integration:** shown as a planned second track.

Historical correction: the partner is **Lean**, not “Dleen.”

### Slide 7 — Thank You

- Main deck ends here.
- Shows Manafa identity and Saudi Energy/Aramco program logos.
- Appendix slides follow it.

### Appendix A1 — SCF FinOps

Purpose and product strategy:

- SCF FinOps is the first spin-off from the large Admin Portal into a standalone internal platform.
- Goal: streamline SCF financial operations and centralize information and operational actions.
- It is live in production.
- The slide currently calls the release **v1.1**.
- Current displayed scope:
  - Instruments: invoices and credit notes.
  - Financing: early payments, fund requests, loans, receivables, and offers.
  - Offer Attempts was added to show every attempted offer and outcome.
- The product screenshot carousel includes:
  1. Early Payments.
  2. Invoices.
  3. Early Payment Details.

The old “R61 extended through 20 August” note on this appendix slide is stale and should be removed or updated during the next content refresh.

### Appendix A2 — Channel updates

The slide covers:

- Borrower Activation Journey V2.
- Funder-channel international login and other funder-channel changes.
- Buyer Dashboard V2, analytics, and data-quality work.

These have not received meaningful recent updates and should remain appendix material unless there is new progress.

### Appendix A3 — Current internal tools

The slide distinguishes current features/tools:

- Buyer Management features inside Admin Portal.
- Funder Management features inside Admin Portal.
- Manafa CRM and Lead Management.
- SCF FinOps.

Important historical facts:

- Buyer Management features were corrected to launch in **R61**, not R58.
- CRM Lead Management was repeatedly pending deployment in earlier updates. Its current production status should be rechecked.

### Appendix A4 — Standalone Buyer and Funder Management platforms

The slide explains the strategy clearly:

- Today, Buyer Management and Funder Management are feature sets in the shared Admin Portal.
- Future state: separate Buyer Management and Funder Management platforms, each with its own roadmap and ownership.
- SCF FinOps is the first example of this separation model.

Do not present the current Admin Portal features as if the standalone platforms already exist. This distinction was a specific user correction.

## 8. Technical implementation

### Main files

- `index.html` — all slide markup and current visible copy.
- `style.css` — theme, layouts, responsive behavior, funder grid, release-scope UI, carousel styling, and slide controls.
- `script.js` — slide navigation, keyboard controls, fullscreen handling, URL hash state, R61/R62 interactive scope, pagination, Jira links, and FinOps screenshot carousel.
- `BRAND-TOKENS.md` — core Manafa presentation tokens and rules.
- `README.md` — basic local-running instructions.
- `design-qa.md` — older QA notes from the funder-slide redesign. Some slide-count references in it are historical and no longer current.
- `assets/` — Manafa branding, partner logos, and FinOps screenshots.

### Navigation

- Right Arrow, Space, Enter, or Page Down: next slide.
- Left Arrow, Backspace, or Page Up: previous slide.
- Home/End: first/last slide.
- `F`: enter or exit fullscreen.
- URL hash stores the current slide, for example `#slide-5`.
- Total slide count is currently 11.

### Important maintenance detail

When changing CSS or JavaScript, update the query-string cache busters in `index.html`:

- Current stylesheet URL: `style.css?v=20260830-weekly-update`
- Current script URL: `script.js?v=20260830-release-status-scope`

Failure to change these caused the browser to show stale CSS during QA. Use a new date/descriptor each weekly release.

### Known code cleanup opportunity

`script.js` still contains a large commented-out legacy R61 snapshot after the current `legacyReleaseScope` items. It does not execute, but it can be removed in a careful cleanup. Do not remove the active R61 items or the `ASQ-4875` → `EMQ-5825` Jira mapping.

## 9. Local running and QA workflow

Run locally from the repository root:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

Minimum QA before publishing:

1. Confirm cover date and agenda.
2. Navigate through all 11 slides using controls and keyboard.
3. Verify the Thank You slide appears before appendix slides.
4. On the release slide:
   - switch every squad;
   - switch releases;
   - test previous/next pagination;
   - select at least one item;
   - confirm title, labels, status, and Jira link update correctly;
   - confirm counts match the data arrays.
5. On the FinOps appendix slide:
   - move through all three screenshots using arrows and dots;
   - confirm titles, counters, captions, and current-dot state update.
6. On the funder slide:
   - confirm all nine cards fit on one slide;
   - confirm logos load and are not stretched, tiny, or placed over text;
   - confirm no card copy clips or overlaps.
7. Check the browser console for errors and warnings.
8. Inspect at a presentation-sized desktop viewport, ideally 1280×720 or larger.
9. Run:

```bash
node --check script.js
git diff --check
```

The most recent QA passed with nine funder cards visible, no clipping, and no console errors.

## 10. Git and publishing workflow

Typical sequence:

```bash
git status --short
git pull --rebase origin main
git add index.html script.js style.css assets
git commit -m "Update SCF weekly presentation"
git push origin main
gh run list --limit 3
```

After pushing, confirm the `pages-build-deployment` workflow succeeds. The published URL is:

<https://a-almazyad.github.io/scf-digital-products-weekly-update/>

Recent important commits:

- `7761699` — Update R61/R62 scope and funder progress.
- `caa6e56` — Update company-size action statuses.
- `69f7e21` — Separate squad scope by release.
- `c123238` — Move platform detail slides to appendix.
- `92a199e` — Update weekly actions and partner progress.
- `7e285bf` — Update R61 closeout and R62 delivery scope.
- `7619bfa` — Clarify weekly actions and add IBAN management.
- `bb66426` — Redesign funder progress as expandable/grid content.
- `0829a5f` — Add embedded-financing partnership slide.
- `4eaa7a3` — Match CTO embedded-finance view and restore BNP.

## 11. Recommended starting point for the next weekly update

The calendar date at this handoff is 5 September 2026. R62 was scheduled to finish on 4 September, so the next presentation likely needs to progress from R61/R62 to R62/R63.

Ask the user for or obtain:

1. Date of the next weekly meeting.
2. Final R62 deployment date and whether it went live successfully.
3. Which R62 items are Production Done, still in testing/UAT, blocked, or spilled into R63.
4. Final R63 scope by the five relevant squads.
5. Status of the four “Items from last weekly.”
6. Any change to the 30 September Taulia onboarding-API date.
7. Any Taulia PDF API Swagger/timeline update.
8. Latest funder update for all nine funder cards.
9. Latest embedded-finance progress, especially Lean/Twaig Health and the NHC agreement.
10. Whether CRM Lead Management is deployed.
11. Whether the channel/internal-tool appendix needs any update.

Suggested next slide narrative:

1. Items from last weekly.
2. R62 closeout and R63 delivery scope.
3. Taulia integration.
4. Funder progress.
5. Embedded-financing partnerships.
6. Thank You.
7. Appendix remains after Thank You.

## 12. Operational cautions for the next Codex session

- Do not overwrite user changes. Always inspect `git status` and diff before editing.
- Pull before starting each weekly refresh.
- Do not infer delivery completion from an old screenshot. Query Jira or ask the user.
- Keep Jira epic status distinct from child-ticket completion.
- Do not include generic regression or miscellaneous epics unless the user explicitly wants them.
- Keep the main deck concise; move stable background material to the appendix.
- Do not add a new slide merely because new information arrived. Prefer updating the existing matching slide.
- Never replace the all-visible funder grid with tabs.
- Do not use promotional phrasing.
- Use `Funder Management`, not `Funding Management`.
- Use `Saudi Energy (SE)`, not SEC, in current-facing copy.
- Use `BNP Paribas` or `BNPP` consistently; do not write BMP.
- Use `Riyadh Bank` in prose while preserving official logo spelling where applicable.
- Keep SCB/Standard Chartered, SMBC, SNB, SIDF, FAB, Natixis, GIB, and BNPP as separate funder workstreams.
- Keep Buyer Management and Funder Management separate.
- Update asset cache-buster strings whenever CSS or JavaScript changes.
- After pushing, wait for GitHub Pages to succeed before telling the user the public link is updated.

## 13. Short prompt the user can paste into a new Codex session

```text
Read CODEX_HANDOFF.md completely, then inspect the current repository and pull the latest main branch. This is the SCF Digital Products weekly HTML presentation. Preserve the existing Manafa/CTO Weekly design language, the short main-deck sequence, the interactive release scope, the all-visible 3×3 funder slide, the FinOps screenshot carousel, and the appendix ordering. After you understand the current state, help me prepare the next weekly update and publish it to GitHub Pages.
```


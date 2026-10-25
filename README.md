# SCF Digital Products — HTML presentation

Open `index.html` directly, or serve the folder locally:

```bash
python3 -m http.server 4173
```

Controls:

- Right arrow, Space, Enter, or Page Down: next slide
- Left arrow, Backspace, or Page Up: previous slide
- Home / End: first or last slide
- F: enter or exit full screen

The SCF FinOps screenshot placeholder is on slide 4.

## Structure (redesigned 25 Oct 2026)

- Fixed 1600×900 canvas scaled to any screen, so every slide shares one grid.
- `index.html` — all slide copy. Slide order follows each section's `data-slide`.
- `release-data.js` — R65/R66 epic snapshot from Jira that drives the interactive release slide. Regenerate it weekly; regression/misc epics are excluded.
- `script.js` — navigation, scaling, stage bars, release explorer, FinOps carousel, roadmap dialogs.
- `style.css` — bold editorial theme on Manafa tokens (see `BRAND-TOKENS.md`).

### Weekly update checklist

1. Cover date, agenda sub-lines and the three cover numbers.
2. Items from last weekly: move resolved issues to the closed list.
3. Replace `release-data.js` and the KPI copy on the release slide (KPIs compute from the data).
4. Funder cards: `<div data-stages="N">` sets how many of Req · SDD · Dev · Test · Pilot · Live are complete; the card class (`done`, `active`, `wait`, `hold`) sets the colour.
5. Partner cards use the same component with `data-labels="Scope,Build,Demo,Pilot,Live"`.
6. Bump the `?v=` cache-busters on the CSS/JS links.

## Theme

Alexandria, Manafa ink/violet/blue, official logo, status colours for live / approved / building / waiting / on hold. See `BRAND-TOKENS.md`.

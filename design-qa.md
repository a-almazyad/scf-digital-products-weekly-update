# Design QA — SCF Funder Progress

- Source visual truth: `/tmp/codex-remote-attachments/019f9d2b-0cea-7d51-b21c-fadbb6735b36/BA64F351-57EC-4B31-9439-EF8F48C7B97E/1-Photo-1.jpg`
- Implementation screenshot: `/private/tmp/scf-funder-progress-implementation.png`
- Side-by-side comparison: `/private/tmp/scf-funder-design-comparison.png`
- Browser viewport: 1280 × 720 CSS pixels
- Source pixels: 1280 × 822
- Implementation pixels: 1280 × 720
- Density normalization: browser capture at CSS scale; both images displayed in equal 16:9 comparison frames using `object-fit: cover`
- State: slide 7, “SCF funder progress”

## Full-view comparison evidence

The source and implementation were opened together in one comparison view. The implementation preserves the reference’s primary composition: a minimal editorial header, a horizontal active-funder logo strip, vertically separated in-progress funder columns, green status labels, large progress titles, five-stage delivery tracks, concise current-state copy, and a direct “Next” action.

The implementation uses four progress columns rather than three because Riyad Bank and Standard Chartered are both active integration workstreams and need separate status visibility. This intentionally increases density, but the hierarchy and copy remain readable at the native 1280 × 720 presentation size.

## Focused evidence

A separate crop was not required. The implementation was inspected at its native 1280 × 720 viewport, all eight funder logos were confirmed loaded at non-zero natural dimensions, titles and body copy were readable, and the progress tracks were visually distinct. The funder slide and the Saudi Energy cover branding were also inspected independently at full presentation size.

## Required fidelity surfaces

- Fonts and typography: Alexandria, weight hierarchy, title sizing, uppercase status labels, line height, and wrapping match the existing deck and closely reproduce the source hierarchy.
- Spacing and layout rhythm: active strip, progress columns, vertical dividers, stage-track spacing, and footer alignment follow the source proportions.
- Colors and visual tokens: Manafa violet is used for completed phases, green for current phases and progress labels, neutral gray for future phases, and white/light-gray surfaces preserve the source balance.
- Image quality and asset fidelity: real logo assets are used for all active and in-progress funders. The new Saudi Energy logo comes from the official Saudi Energy site. No logo placeholders or code-native approximations remain.
- Copy and content: each integration retains its supplied current phase, evidence, next action, and available timing. The slide sequence now places SCF FinOps before the standalone Buyer/Funder platform strategy.

## Findings

- No actionable P0, P1, or P2 findings.
- Accepted variance: four in-progress columns are used instead of the reference’s three so Riyad Bank and Standard Chartered remain individually visible.
- P3: the BNP Paribas logo has intrinsically smaller visual mass than the other funder logos; its label remains readable and the asset is unchanged to preserve brand fidelity.

## Interaction and technical checks

- Next-slide navigation tested from slide 4 to slide 5.
- Confirmed order: “Introducing SCF FinOps” → “Standalone Buyer and Funder Management platforms.”
- Confirmed 8 / 8 slide count.
- Browser console errors checked: none.
- Page and slide overflow checked at 1280 × 720: none.

## Comparison history

- Initial comparison: no P0/P1/P2 mismatches found. The structural reference was matched in the first rendered pass; no blocking iteration was required.

final result: passed

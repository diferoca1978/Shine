# 05 — featured project in latest projects

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Add a `featured` boolean to the `works` content collection schema so one
project can be pinned to the front of the homepage's "Proyectos Recientes"
section (`LatestProjects.2.astro`), and raise that section's project count
from 5 to 6.

## Scope

**In:**

- `src/content.config.ts`: add `featured: z.boolean().optional().default(false)`
  to the `works` collection schema (same optional-with-default convention
  already used by `blog`'s `draft` field).
- `src/components/section/landing/LatestProjects.2.astro`: change the
  selection/sort logic so that:
  1. Among works with `featured: true`, the one with the latest `pubDate`
     is selected as *the* featured work. Any other `featured: true` works
     are treated as ordinary (non-pinned) entries — no build error, no
     special handling for them.
  2. If a featured work exists, it is placed first; the remaining 5 slots
     are filled with the next 5 works by `pubDate` desc, excluding the
     featured one (no duplicates, 6 distinct works total).
  3. If no work has `featured: true`, behavior is unchanged except the
     slice grows from 5 to 6 (plain `pubDate` desc).
- Raise `.slice(0, 5)` to `.slice(0, 6)` in the same file.

**Out:**

- `LatestProjects.astro` and `LatestProjectsAlt.astro` — both also read the
  `works` collection but are not touched. `featured` is optional and
  defaults to `false`, so they keep working unchanged; applying the same
  logic to them is a separate task if wanted later.
- Any UI treatment that visually distinguishes the featured project from
  the rest (badge, highlight color, etc.) — it only affects position/order,
  not appearance.
- A build-time guard against multiple `featured: true` works — the
  "most-recent-wins" rule (below) makes that data state harmless rather
  than something that needs to be prevented.
- Marking any existing work as `featured: true` — this spec only adds the
  capability; which project (if any) gets the flag is a separate content
  edit the repo owner makes afterward.

## Files affected

Matches no existing "Invariant vs Variable" or "Knobs map" row —
`works` is listed under **Content collections** in AGENTS.md's Tech stack
section as "Variable" (already-filled client content); adding an optional
field to its schema is a data-shape change within that existing row, not a
new convention. No AGENTS.md table edit needed.

- `src/content.config.ts` (works schema, line 18 area — new `featured`
  field alongside the existing `stack`/`tags` optional fields)
- `src/components/section/landing/LatestProjects.2.astro` (lines 5-16 —
  selection/sort/slice logic building the `projects` array)

## Decisions made and discarded

- **Enforce "only one featured work" via schema or a build-time check** —
  discarded. Zod validates a single document's shape, not cross-document
  invariants across the `works` collection, so this would need custom
  loader-level code for a rule that a simple tie-break rule already makes
  safe. **Chosen:** if more than one work is ever marked `featured: true`,
  the one with the latest `pubDate` is used as the pinned project; the
  others fall back to being sorted normally by `pubDate` like any
  non-featured work. Deterministic, no extra tooling.
- **Pin all `featured: true` works to the front (support multiple
  simultaneously featured projects)** — discarded. Nothing in the request
  calls for more than one pinned project at a time, and it would complicate
  the ordering rule for no current benefit.
- **Apply the same featured-first + 6-item change to `LatestProjects.astro`
  and `LatestProjectsAlt.astro` too** — discarded for this spec. Confirmed
  with the repo owner: stay scoped to `LatestProjects.2.astro`, the file
  named in the request. The other two keep their current 5-item plain
  `pubDate` sort untouched.

## Acceptance criteria

- [x] `src/content.config.ts`'s `works` schema has
      `featured: z.boolean().optional().default(false)`.
- [x] With no work marked `featured: true`, `LatestProjects.2.astro` renders
      6 projects (not 5), sorted by `pubDate` desc — identical to today's
      behavior except one more item.
- [x] With exactly one work marked `featured: true`, that work renders
      first (`data-index="0"`, number `01`), followed by the next 5 works
      by `pubDate` desc excluding it — 6 distinct works total, no
      duplicates.
- [x] With two or more works marked `featured: true`, the one with the
      latest `pubDate` is the one that renders first; the others are sorted
      into the list normally by `pubDate` — no build error, no duplicate
      first slot.
- [x] The left-column preview panel (`data-preview-img`/`data-preview-panel`)
      and the counter (`— / {projects.length}`) reflect the same 6-item,
      featured-first `projects` array — no separate/stale list.
- [x] `pnpm check` reports no errors other than the 2 pre-existing
      `LatestProjectsAlt.astro` `ts(18048)` `project.data.stack` errors
      (tracked separately in `feature_list.json` as
      `fix-works-stack-optional-type`) — this branch introduces no new
      type errors.
- [x] `pnpm build` passes.

## Implementation plan

1. Add the `featured` field to the `works` schema in
   `src/content.config.ts`.
2. In `LatestProjects.2.astro`, replace the current
   `.sort(...).slice(0, 5)` chain with logic that: partitions `allWorks`
   into the selected featured work (if any, via the most-recent-wins rule)
   and the rest; sorts the rest by `pubDate` desc; concatenates
   `[featured, ...rest].slice(0, 6)` when a featured work exists, or falls
   back to `allWorks.sort(...).slice(0, 6)` when none does.
3. Run `pnpm build` and `pnpm check`, confirm only the 2 pre-existing
   `LatestProjectsAlt.astro` errors remain.
4. Manually mark one work's frontmatter with `featured: true` locally (not
   committed, or committed if the repo owner picks one at this point) and
   verify in `pnpm dev` that it renders first in both the project list and
   the preview panel, and that 6 items total show.

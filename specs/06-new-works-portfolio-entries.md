# 06 — new works portfolio entries

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Add the 4 most recent client projects (Cardoso Abogado, Causa y Pulso,
Emetaion, Montcrest) to the `works` content collection so the portfolio
reflects work actually delivered, and pin one of them as the homepage's
featured project using the `featured` flag added in
[`05-featured-project-latest-projects.md`](./05-featured-project-latest-projects.md).

## Scope

**In:**

- 4 new markdown files in `src/content/works/`, named in lowercase to
  mirror their image basename exactly:
  - `cardosoabogado.md` → `./img/cardosoabogado.webp`
  - `causaypulso.md` → `./img/causaypulso.webp`
  - `emetaion.md` → `./img/emetaion.webp`
  - `montcrest.md` → `./img/montcrest.webp`
- Each file uses the existing frontmatter shape validated by the `works`
  schema (`src/content.config.ts:5-22`) and the existing body convention
  (`# Key project features:` followed by 1–3 bullets), matching the 9
  entries already in the collection.
- Committing the 4 `.webp` files in `src/content/works/img/`, which are
  currently untracked (`git status` shows them as `??`). They are **not**
  gitignored — they simply were never staged.
- Exactly one of the 4 carries `featured: true` so it pins to the front of
  the homepage's "Proyectos Recientes" list. Which one is named by the
  repo owner during the intake step (step 1 below).
- An intake step at the start of the implementation plan where the
  implementer asks the repo owner for the raw facts behind each of the 4
  works, then drafts the Spanish copy from those facts in the voice of the
  existing entries, for approval before commit.
- Correcting the stale `nota` on the existing `content-works-portfolio`
  entry in `feature_list.json` (it says "10 portfolio entries"; there are
  9 today, 13 after this change), via surgical string replacement per
  AGENTS.md § `feature_list.json`.

**Out:**

- Any change to `src/content.config.ts`. The schema already supports every
  field these entries need — this spec adds data only, no schema change.
- Any change to `LatestProjects.2.astro`, `LatestProjects.astro`,
  `LatestProjectsAlt.astro`, `SocialProof.astro` or `AboutStats.astro`.
  All five read the collection at build time and pick up the new entries
  with zero code edits.
- Decoupling the `+N proyectos` counter from `works.length`. The counter
  moving 9 → 13 is the intended, designed behavior (confirmed with the
  repo owner) — it is verified here, not changed.
- Image re-processing, cropping or aspect-ratio normalization. The new
  files are wider than the existing set (1.93–2.13 vs 1.73–1.78), but
  `LatestProjects.2.astro:55-67` renders them `object-contain` inside a
  fixed `aspect-ratio: 5/4` panel, so nothing crops. Normalizing the
  portfolio's image ratios is a separate visual task.
- A dedicated `/portfolio` or per-project detail page. These entries are
  rendered only by the existing homepage sections.
- Any further use of `featured` beyond the single pinned project — the
  "most-recent-wins" tie-break from spec 05 is untouched.

## Files affected

Matches **no** row in AGENTS.md's "If you change X → update Y" table —
this adds no dependency, no config file, no font slot, no redirect, and no
folder convention. In the "Invariant vs Variable" table it falls squarely
under **Variable** (`src/content/*`, real per-client content), and under
the **Content collections** bullet of the Tech stack section. No AGENTS.md
edit is needed as part of this change.

- `src/content/works/cardosoabogado.md` (new)
- `src/content/works/causaypulso.md` (new)
- `src/content/works/emetaion.md` (new)
- `src/content/works/montcrest.md` (new)
- `src/content/works/img/cardosoabogado.webp` (untracked → tracked)
- `src/content/works/img/causaypulso.webp` (untracked → tracked)
- `src/content/works/img/emetaion.webp` (untracked → tracked)
- `src/content/works/img/montcrest.webp` (untracked → tracked)
- `feature_list.json` (`content-works-portfolio` entry's `nota` only —
  count corrected to 13; `status` stays `"done"`)

Read but **not** modified (they consume the collection and change output
automatically): `src/components/section/landing/LatestProjects.2.astro`,
`src/components/global/SocialProof.astro:11`,
`src/components/section/perPage/AboutStats.astro:7`.

## Source of the content

This spec introduces client-facing data (project names, descriptions,
live URLs, delivered-service claims) for which **no approved document
exists in the repo** — that absence is precisely why this is a full-lane
spec rather than a `feature_list.json` entry.

The source of record is the **repo owner, interviewed during step 1** of
the implementation plan. The facts collected there (client name, sector,
live URL, delivery date, services delivered, technologies used) are the
authority for every field written; the implementer drafts the Spanish
prose from those facts but invents no claim that was not stated.

Voice and shape are modeled on the existing entries, not invented:
`src/content/works/munozAbogadosNotariales.md` and
`src/content/works/elianaalvarezpsicologa.md` are the reference for
`description` phrasing and bullet style.

## Decisions made and discarded

- **Filename casing.** The collection is inconsistent today
  (`buitragoyvillota.md` vs `perezAraujoAbogados.md`). **Chosen:**
  lowercase basenames matching each image filename exactly, so the `.md`
  ↔ `.webp` pairing is self-documenting; this also matches the majority
  of existing files. **Discarded:** camelCase after
  `perezAraujoAbogados.md` — it would force `causaYPulso.md` →
  `./img/causaypulso.webp`, a mismatch with no upside. Renaming the
  existing 9 for consistency was also discarded: out of scope, and it
  churns a `slug` surface for no functional gain.
- **Who writes the copy.** **Chosen:** the repo owner supplies raw facts,
  the implementer drafts `description` and the bullets in the house voice
  and gets approval before commit. **Discarded:** owner supplies final
  verbatim text — slower for the owner and risks drifting from the
  established phrasing of the other 9 entries.
- **Dates.** **Chosen:** the real delivery date per project, supplied at
  intake, written identically to `pubDate` and `updatedDate` (the
  convention every existing entry follows). **Discarded:** today's date
  for all 4 — it would create a 4-way `pubDate` tie and make the homepage
  ordering among them arbitrary (glob order), which the spec-05 sort
  logic does not define.
- **Featured project.** **Chosen:** exactly one of the 4 gets
  `featured: true`, named by the owner at intake. This is the first
  actual use of the flag spec 05 introduced. **Discarded:** leaving all 4
  unfeatured (the homepage would still surface them by date, but the
  owner wants explicit control of slot 01), and deferring the pin to a
  later separate edit (needless second pass over the same files).
- **Taxonomy for `stack` / `tags`.** **Chosen:** prefer values already
  present in the collection; a genuinely new value is permitted but must
  be flagged to the owner for approval during intake. **Discarded:**
  strict reuse only (would force a misleading tag if a project used a
  stack the portfolio has not seen), and a free-for-all (fragments the
  `tags` vocabulary, which `LatestProjects.2.astro:25` joins directly
  into the visible `category` string).
- **The `+N proyectos` counter.** **Chosen:** let it derive from
  `works.length` and move 9 → 13, as designed. **Discarded:** decoupling
  it into a hardcoded/config value — a real code change to two
  components, and its own decision, not part of adding content.

## Acceptance criteria

- [x] `src/content/works/` contains exactly 13 `.md` files, the 4 new ones
      named `cardosoabogado.md`, `causaypulso.md`, `emetaion.md`,
      `montcrest.md`.
- [x] `git ls-files src/content/works/img/` lists all 13 `.webp` files —
      the 4 previously-untracked images are committed alongside the
      markdown, not left behind.
- [x] Each new file's `image` frontmatter points at its matching
      `./img/<same-basename>.webp`, and `pnpm build` completes — an
      unresolved `image()` path is a hard build failure, so a passing
      build proves every reference resolves.
- [x] Each new file has `pubDate` and `updatedDate` set to the same real
      delivery date supplied at intake (no placeholder, no build date),
      and non-empty `title`, `description`, `link`, `stack`, `tags`.
- [x] Each new file's body follows the existing convention: a
      `# Key project features:` heading followed by 1–3 bullets.
- [x] `grep -rl "^featured: true" src/content/works/*.md` returns exactly
      one file, and it is one of the 4 new ones.
- [x] In `pnpm dev` (or the built output), the homepage "Proyectos
      Recientes" section renders 6 distinct projects with the
      `featured: true` work first (`data-index="0"`, number `01`), and the
      counter reads `— / 6`.
- [x] The `+N proyectos` stat renders **13** in both places that derive it
      from `works.length`: the homepage `SocialProof` section and
      `/nosotros`'s `AboutStats` section (`data-count-to="13"` in the
      built HTML for both routes).
- [x] Every `link` value resolves to a live page (checked manually, one
      per work) — no 404s, no typo'd domains in the public portfolio.
- [x] `feature_list.json`'s `content-works-portfolio` entry's `nota` reads
      13 portfolio entries; its `status` is still `"done"` and the rest of
      the file's formatting is unchanged (surgical edit, minimal diff).
- [x] `pnpm check` reports no errors beyond the baseline captured in
      step 1 — this change introduces no new type errors.
- [x] `pnpm build` passes.

## Implementation plan

1. **Capture the baseline.** Run `pnpm check` and record its current
   error count/output on this branch, so the "no new type errors"
   criterion is measured against reality rather than an assumption. Also
   confirm the 4 `.webp` files are present and untracked
   (`git status --short src/content/works/img/`).

2. **Intake — ask the repo owner for the facts.** Do not draft anything
   before this is answered. Ask, for **each** of the 4 projects (Cardoso
   Abogado, Causa y Pulso, Emetaion, Montcrest):

   1. **Official brand name** — exact casing and accents, as it should
      appear in `title` (e.g. `Muñoz Abogados Notariales`, not
      `munoz abogados`).
   2. **Live URL** for `link` — copied as the site actually serves it
      (note whether it ends in a trailing slash; the existing entries are
      inconsistent and each is kept as-is).
   3. **Delivery date** as `YYYY-MM-DD` — goes into both `pubDate` and
      `updatedDate`.
   4. **Sector / what the client does** — one line, used to frame the
      `description`.
   5. **What Shine actually delivered** — e.g. new corporate site,
      redesign, branding/identity, SEO strategy, migration (from what
      platform?), ads, ecommerce. This drives the `description`, the
      bullets and the `tags`.
   6. **Technologies used** — for `stack`.
   7. **Which one of the 4 is the pinned project** (`featured: true`) —
      exactly one.

   Also confirm the image ↔ project pairing is right: `cardosoabogado.webp`
   → Cardoso Abogado, `causaypulso.webp` → Causa y Pulso,
   `emetaion.webp` → Emetaion, `montcrest.webp` → Montcrest.

3. **Draft the copy and show it for approval.** From the intake answers,
   write each `description` (one sentence, Spanish, matching the phrasing
   of `munozAbogadosNotariales.md` / `elianaalvarezpsicologa.md`) and the
   1–3 `# Key project features:` bullets. Pick `stack` and `tags` values
   from those already used in the collection; if a project genuinely needs
   a new value, flag it explicitly and get approval for that specific
   string. Present all 4 drafts to the owner before writing files.

4. **Write the 4 markdown files** at `src/content/works/<basename>.md`
   with the approved content, in the frontmatter field order used by the
   existing entries (`pubDate`, `updatedDate`, `title`, `description`,
   `image`, `link`, `stack`, `tags`), adding `featured: true` to the one
   pinned project and omitting the field entirely on the other three (it
   defaults to `false`).

5. **Stage the images.** `git add` the 4 `.webp` files in
   `src/content/works/img/` so they travel with the markdown in the same
   commit — the build breaks without them.

6. **Correct `feature_list.json`.** Surgical string replacement on the
   `content-works-portfolio` entry's `nota` only: the portfolio-entry
   count becomes 13. Do not reserialize the file and do not touch its
   `status`.

7. **Verify against the build.** Run `pnpm build` and `pnpm check`
   (compare to the step-1 baseline). Then in `pnpm dev`: confirm the
   homepage shows 6 projects with the pinned one at `01` and the counter
   at `— / 6`, and confirm the `+13` stat on both the homepage
   (`SocialProof`) and `/nosotros` (`AboutStats`).

8. **Check the links.** Open each of the 4 `link` URLs once and confirm
   it loads — a dead URL in the public portfolio is worse than a missing
   entry.

9. **Hand back for review.** Do not mark anything `done` and do not
   commit or push without the owner asking in that turn. `spec-verifier`
   runs the acceptance criteria before a human flips this spec's status.

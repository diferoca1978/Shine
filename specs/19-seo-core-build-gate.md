# 19 — seo-core build gate

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Turn on the `@shine/seo-core` build gate, `shineSeo()`, so that every
`astro build` fails on any check-seo error. That covers a local
`pnpm build`, `pnpm verify` and the Netlify deploy. This is step 5 of the
legacy-site procedure in `/nuevo-cliente`
(`~/scripts/skills/nuevo-cliente/SKILL.md:188-210`, step 5 at line 203).
Steps 1–4 are already done (PRs #193, #194, #195).

`pnpm exec check-seo --dist dist --report` on `dev` (b4ceee9) reports
30 pages, 26 errors and 10 warnings. All 26 errors come from the 13
`/proyectos/<slug>/` pages, 2 per page:

- `canonical-self`: the canonical is `/proyectos/`, not the page's own URL;
- `sitemap-coverage`: an indexable page is missing from the sitemap.

Spec 15 did both on purpose (`specs/15-project-detail-pages-dedup.md`).
check-seo v0.1.1 has no notion of a duplicate that canonicalizes to
another page. These 26 findings go into `shineSeo({ ignore })`, scoped to
the exact paths and the two rules. The list is derived from the `works`
content collection.

**Depends on spec 15**, already implemented and merged into `dev`.

## Scope

**In:**

- **`astro.config.mjs`:**
  - imports `shineSeo` from `@shine/seo-core/integration`;
  - adds `shineSeo({ ignore })` as the last entry of `integrations`, after
    `sitemap()`, as the package requires;
  - for each project, the `ignore` list holds one `canonical-self` entry
    and one `sitemap-coverage` entry, both with
    `path: "/proyectos/<slug>/"` and a `reason` that cites spec 15.
- **The slug list is derived, not hardcoded.**
  - The config reads the `slug:` field from the frontmatter of every
    `.md` under `src/content/works/`. It uses the same `**/*.md` pattern
    as the collection's glob loader in `src/content.config.ts:11-15`.
  - The source is the frontmatter `slug`, never the filename. They differ:
    `cardosoabogado.md` has `slug: cardozo-abogados`.
  - A `.md` with no `slug:` line in its frontmatter throws an error that
    names the file. It never yields an `undefined` path.
  - Adding a project needs no config change.
- **Types.** The `ignore` list is typed through JSDoc as the package's
  `IgnoreEntry[]`, so `// @ts-check` in `astro.config.mjs` and
  `pnpm check` both pass.
- **`AGENTS.md`:**
  - § "Commands": `pnpm build` runs the gate, so any check-seo error
    fails the build. Warnings are only printed.
  - § "Tech stack", `@shine/seo-core` bullet: the gate is wired in. This
    replaces "Its build gate (`shineSeo()`) is not wired in yet".
  - § "Routing", `/proyectos` paragraph: the gate ignores
    `canonical-self` and `sitemap-coverage` on those 13 paths only. The
    list is derived from the `works` frontmatter.
  - § "If you change X → update Y" gets a new row. If a page is made
    non-self-canonical or kept out of the sitemap on purpose, update
    `shineSeo({ ignore })` in `astro.config.mjs` (exact path, rule and
    reason) and § "Routing".

**Out:**

- **The 10 warnings:** `title-length` on 5 blog posts and 3 projects, and
  `description-length` on `blog/marca-personal-ai` and
  `proyectos/aguilar-abogados-asociados`. They don't fail the gate.
  Rewriting them means deciding visible copy, so they are handled
  separately, later. The gate does not use strict mode.
- **A change to `@shine/seo-core`** so that `canonical-self` and
  `sitemap-coverage` accept a canonicalized duplicate. See "Decisions".
- **Any change to spec 15's decisions:** the canonical, the sitemap
  `filter`, `og:url` and the JSON-LD on `/proyectos/<slug>/`.
- **The package's full level:** `SeoHead`, `pages.ts`, `createSeo()` and
  `sitemapFilter(PAGES)`. The site keeps `astro-seo` and `SEOHead.astro`
  (`SKILL.md`, last paragraph of § Legacy sites).
- **A package upgrade.** `v0.1.1` is the latest tag on
  `diferoca1978/shine-seo-core` as of 2026-10-15.
- **The `dev`→`main` deploy**, `check-seo --url` on the live site and
  `~/scripts/clients.json`, which already lists Shine as `level: "minimo"`.

## Files affected

- `astro.config.mjs`: the gate integration, the slug derivation and the
  `ignore` list.
- `AGENTS.md`: § "Commands", § "Tech stack", § "Routing", and a new row in
  § "If you change X → update Y".

The gate is **Invariant** build tooling (the "build/verify tooling" cell
of "Invariant vs Variable"). No content, page or `src/config/*` file
changes.

This matches **no existing row** in "If you change X → update Y". The
dependency was added and documented in bed814e. The row added in this
change covers the next case of the same kind: a page that is a duplicate
on purpose.

## Decisions made and discarded

The repo owner made both decisions in this spec's Phase 2 (2026-10-15).
Engram context: `mem_search "Shine legacy seo-core status"` (#1213,
#1223).

- **Picked: path-scoped `ignore` entries in the gate.** This is what
  `/nuevo-cliente` legacy step 5 prescribes for a finding that cannot be
  fixed now, after the user agrees (`SKILL.md:203-205`).
  - The README says `ignore` "is not a way to make a build pass"
    (`node_modules/@shine/seo-core/README.md:475-477`). These entries
    don't hide a defect. They record an IA decision that the rule cannot
    express (spec 15). The exception is scoped to 2 rules on 13 exact
    paths, and every build prints it with its reason.
  - **Discarded: changing the package** so that `canonical-self` passes a
    page whose canonical points to an indexable page in the sitemap, and
    `sitemap-coverage` skips such pages. That would be more correct in
    general. But it needs a change in another repo and a new tag, and it
    only pays off if other clients use the same pattern. If it ever
    ships, this spec's `ignore` entries are removed in the same upgrade.
  - **Discarded: an `ignore` entry without `path`.** It turns the rule off
    on every page (README:472), so a real canonical bug anywhere on the
    site would pass.
  - **Discarded: `noindex` on the slugs.** Spec 15 already discarded
    canonical plus `noindex` as a contradictory pair.
- **Picked: derive the slugs from the `works` frontmatter.**
  - **Discarded: a hardcoded list of 13 slugs.** A new project would fail
    the Netlify deploy until someone added its slug to the config.
  - `getCollection()` doesn't exist in `astro.config.mjs`, because
    collections only load during the build. The config parses the
    frontmatter `slug:` line instead. The Zod schema already makes `slug`
    required (`src/content.config.ts:21`), so the parse only has to fail
    loudly. It never has to guess.
- **Picked: ignore only `canonical-self` and `sitemap-coverage` on those
  paths.** Every other rule still applies to the slug pages:
  `title-unique`, `img-alt`, `jsonld-*`, `url-resolves`, and so on.
- **Picked: `shineSeo()` last in `integrations`.** The package requires
  it after `sitemap()` (README:127). Putting it last also means it runs
  after `partytown` and `webmcp` have written their output.
- **Picked: warnings out of scope** (see Scope › Out).

## Acceptance criteria

All `dist/` checks run after a fresh `pnpm build`.

- [x] `astro.config.mjs` imports `shineSeo` from
      `@shine/seo-core/integration`. `shineSeo(` appears exactly once,
      after `sitemap(`, as the last entry of `integrations`.
- [x] `pnpm build` exits 0. Its output contains the gate's report, which
      ends in `30 pages, 0 errors, 10 warnings, 26 ignored`.
- [x] The 26 ignored findings in that report are exactly `canonical-self`
      and `sitemap-coverage` on the 13 `proyectos/<slug>/index.html`
      files. The set of slugs equals the set of directories under
      `dist/proyectos/` (13).
- [x] No hardcoded project slug appears in `astro.config.mjs`.
      `grep -cE 'delta-irat|cardozo-abogados|grupo-zenith' astro.config.mjs`
      prints 0.
- [x] Tripwire, with no commit: with `ignore` temporarily removed from
      `shineSeo()`, `pnpm build` exits 1 and reports 26 errors. Restoring
      it brings back exit 0.
- [x] Derivation check, with no commit: a temporary copy of one `works`
      file with a new `slug` and a new `title` builds with exit 0 and
      `28 ignored`. The copy is then deleted.
- [x] Every `.html`, `.xml` and `.txt` file under `dist/` is
      byte-identical to the step-1 baseline (`diff -r`). The gate changes
      no output.
- [x] `git diff --name-only dev` lists only `astro.config.mjs`,
      `AGENTS.md` and `specs/19-seo-core-build-gate.md`.
- [x] `AGENTS.md`:
  - § "Tech stack" no longer says the gate is not wired in;
  - § "Commands" says `pnpm build` runs it;
  - § "Routing" names the 2 ignored rules and where the list comes from;
  - § "If you change X → update Y" has the new row.
- [x] `pnpm check` reports 0 errors.

## Implementation plan

1. Baseline on `dev`, with no code change. Run `pnpm build` and save:
   - a copy of `dist/` in the session scratchpad;
   - the `pnpm exec check-seo --dist dist --report` output (expected:
     30 pages, 26 errors, 10 warnings);
   - the `pnpm check` result.
2. `astro.config.mjs`:
   - derive the slug list from `src/content/works/**/*.md`, throwing on a
     missing `slug:`;
   - build the `IgnoreEntry[]` list (2 rules × each slug, `reason` citing
     spec 15);
   - add `shineSeo({ ignore })` last in `integrations`;
   - add a short comment that points to specs 15 and 19.
3. Fresh `pnpm build`. Check the gate summary, the ignored list against
   `dist/proyectos/`, and `diff -r` against the baseline.
4. Run the tripwire and the derivation check from the acceptance
   criteria, then restore the tree. `git status` must show only the step-2
   change.
5. `AGENTS.md`: update § "Commands", § "Tech stack" and § "Routing", and
   add the new row to § "If you change X → update Y".
6. Run `pnpm check` and every acceptance check, then hand off to
   `spec-verifier`.

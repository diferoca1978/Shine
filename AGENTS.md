# AGENTS.md

Guidance for any coding agent — including Claude Code and the `front-end-astro`
and `seo-guide-lines` skills — when working in this repository. This is the
single, agent-agnostic source of truth (`CLAUDE.md` is just a pointer here).

> **This is a live, already-built production site** (shineagencia.com), not a
> fresh clone of a boilerplate. It adopted the `astro-harness` contract format
> after the fact, so there was never a brief-ingest step here — every
> page/section already exists and `feature_list.json` reflects that (see "The
> harness" below). Don't assume infrastructure from another client project or
> from the astro-harness scaffold by default — verify against this repo's
> actual files. This site **does** have server Actions, an email service
> (Resend), AI-crawler endpoints, and a content-collections blog — none of
> which are default astro-harness features.

## What this is

Shine Agencia's marketing site: an Astro 6 static/hybrid site for a Colombian
digital agency (web design, Google/Facebook Ads, Tienda Nube ecommerce), plus
the `astro-harness`-style workflow layer (`feature_list.json`, subagents,
skills) for future feature work.

## Commands

```bash
pnpm dev          # dev server at localhost:4321
pnpm build        # production build to ./dist/
pnpm preview      # preview the build
pnpm check        # astro check (type/diagnostics on .astro)
pnpm verify       # ./init.sh — build + astro check + customization lint (the gate)
pnpm lint:client  # ./harness/lint-customization.sh alone (advisory placeholder scan)
pnpm test:email   # Playwright E2E test for the contact form (Chromium only)
npx playwright test --ui   # interactive Playwright UI
```

> The lockfile is `pnpm-lock.yaml` — always use `pnpm`, never `npm` or `bun`.

There is no unit-test runner beyond the one Playwright contact-form spec. For
everything else, **`pnpm verify` is the test suite**: if it builds and type-
checks, most breakage is already excluded. **`pnpm verify` is on-demand, not
run automatically** — only run it when the user explicitly asks (e.g. "run
verify", "check it builds"). Do not run it by default after every change or as
a silent step before marking something done.

## Tech stack (as actually installed — see package.json)

- **Astro 6** — file-based routing, content collections, server Actions.
- **Tailwind CSS 4** — via `@tailwindcss/vite`. **No `tailwind.config.js`** —
  the theme is defined inline with `@theme` in `src/styles/global.css`.
- **GSAP 3 + Lenis** — this client uses **GSAP** (not vanilla) as its
  animation strategy. `gsap` is a real dependency; every ScrollTrigger
  timeline in this codebase is already wrapped in `gsap.matchMedia()` with a
  `(prefers-reduced-motion: reduce)` branch (see e.g.
  `src/utils/scripts/perPageAnimations/home/hurtsAnimation.js`). Lenis drives
  smooth scroll (`src/utils/scripts/lenis/lenisSmooth.js`).
- **Three.js** — used narrowly for one component,
  `src/components/ui/StartsBackground.astro` (starfield/particle background).
  Not a general-purpose 3D layer — don't assume it's available elsewhere
  without checking.
- **astro-seo** + **@astrojs/sitemap** — SEO meta + auto sitemap.
- **@astrojs/netlify** — deploy adapter (Netlify), domain `shineagencia.com`.
- **@astrojs/partytown** — offloads third-party scripts (analytics/ads tags)
  to a web worker.
- **astro-webmcp** — generates `/_webmcp/manifest.json` +
  `/.well-known/skills/index.json` at build so browser-resident AI agents
  (Chrome's WebMCP) can discover/search site content. Configured in
  `astro.config.mjs` over the `blog`, `servicios`, `nosotros`, `contacto`
  collections.
- **Astro Actions + Resend** — `src/actions/contact/getContact.ts` is a
  server Action (Zod-validated, Spanish error messages) that sends the
  contact-form email via Resend. Requires `RESEND_API_KEY` and
  `EMAIL_CONTACT` env vars. **This is real infrastructure the base
  astro-harness scaffold does not ship with — do not remove it or treat it
  as a scaffold placeholder.**
- **Content collections** (`src/content.config.ts`, `astro:content` glob
  loader) — `works` (portfolio, `src/content/works/*.md`) and `blog`
  (`src/content/blog/*.md`, `draft: true` excluded from production). Blog
  posts use `marked` + `mdast-util-from-markdown`/`to-string` for reading-time
  estimation (`src/utils/readinTime.ts`), not for rendering — Astro renders
  the markdown natively via content collections.
- **highlight.js** — code-block syntax highlighting in blog posts.
- **tailwind-merge** — conditional/merged Tailwind class composition.
- **Playwright** — E2E test for the contact form only (`tests/`).

## Architecture (real — verify against the tree, don't assume)

### Routing — `src/pages/`, Spanish slugs

`/` → `index.astro` · `/nosotros` → `nosotros.astro` · `/contacto` →
`contacto.astro` · `/servicios/<slug>` → `servicios/` (uses `ServiceLayout`) ·
`/blog` + posts → `blog/` (uses `BlogLayout`/`PostLayout`) ·
`/politicadeprivacidad`, `/terminosycondiciones`, `/404`.
`robots.txt` is generated by `src/pages/robots.txt.ts`; the sitemap is
automatic via `@astrojs/sitemap`. AI-crawler text endpoints:

| Route | Content |
| --- | --- |
| `/llms.txt` | Site summary |
| `/llms-full.txt` | Full site content |
| `/llms/[slug].txt` | Individual blog post |
| `/llms/servicios/[slug].txt` | Individual service page |

Built from generic helpers in `src/utils/llms.ts` — do not hand-write these
pages per route, extend the helper.

### Layout chain — `src/layouts/`

```
MainLayout.astro          ← SEO (via SEOHead.astro), navbar, footer, animations
├── ServiceLayout.astro   ← wraps MainLayout for /servicios/* pages
├── BlogLayout.astro      ← wraps MainLayout for blog listing
└── PostLayout.astro      ← wraps MainLayout for individual posts
```

`MainLayout` always injects Organization + Website JSON-LD schemas (via
`SEOHead.astro`). Per-page schemas (Service, FAQ, HowTo, BreadcrumbList,
BlogPosting) are added by `SEOHead.astro` when props are passed. `<html lang>`
is `es-CO` (Colombia) — not the harness default's generic `es-CO` placeholder,
this is the real, final locale for this client; do not change it.

### Components — `src/components/`

> **Note: this repo's structure differs from the generic astro-harness
> `perpage/<page>/` convention below — follow what's actually here, not the
> scaffold's default.**

- `global/` — layout-level (Navbar, Footer, BgTexture, CursorFollower,
  SocialProof, WhatsApp).
- `section/landing/` — homepage-specific sections (Hero-adjacent sections,
  ClientHurts, Solution, LatestProjects variants, ServicesLanding).
- `section/ourServices/` — service-page sections (comparison tables, process
  steps, problem/solution blocks, tech stack).
- `section/perPage/` — About-page sections (Bio, Mission, Stats, Foundations)
  + the contact form section.
- `ui/` — reusable primitives (cards, buttons, modal, `Prose.astro`,
  `ThemeToggle.astro`). **Flat, not sub-categorized** — no `ui/<category>/`
  nesting.
- `SEOHead.astro` — injects astro-seo meta + JSON-LD schemas.

PascalCase component files.

### Config — `src/config/` (the single source of truth for content)

- `companyInfo.ts` — `COMPANY_INFO` (name, phone, email, founders, social
  links, `geo` coordinates, real domain `https://shineagencia.com`), typed via
  a `CompanyInfo` interface.
- `seo.ts` — imports `COMPANY_INFO` from `./companyInfo`; owns `DEFAULT_SEO`,
  `generatePageSEO()`, and the JSON-LD generator functions
  (`generateServiceSchema`, `generateFAQSchema`, `generateHowToSchema`,
  `generateBreadcrumbSchema`, plus Organization/Person schema helpers).
- `services.ts` — the 3 active services, typed `Service[]`: **Diseño Web con
  Astro**, **Google Ads & Facebook Ads (Publicidad Digital)**, **Ecommerce con
  Tienda Nube**. Each entry has content fields (`title`, `subtitle`,
  `problem`, `benefits`, `process`, `checkMarks`, `hurts`, `techStack`), SEO
  fields (`primaryKeyword`, `secondaryKeywords`, `seoDescription`, `slug`),
  and an `image`/`secondaryImage` pair.
- `faqs.ts` — FAQ content (structured for AEO), imports `FAQItem` type from
  `seo.ts`.
- `authors.ts` — author bio/credentials for blog posts (E-E-A-T + Person
  schema). **Note: named `authors.ts` here, not `authorBio.ts`.**
- `site.ts` — `SITE_CONFIG` (derived from `COMPANY_INFO`) + llms.txt topic
  metadata.

To add or change a service: update `src/config/services.ts`, then
create/update `src/pages/servicios/<slug>.astro` using `ServiceLayout`; FAQs
for each service live in `src/config/faqs.ts`.

### Styling

`src/styles/global.css` — brand tokens inside `@theme {}` and fonts. Uses the
Tailwind 4 Vite plugin, not PostCSS.

### Path alias

`@/*` → `./src/*`. Use it for every internal import.

---

## Invariant vs Variable

|            | **Invariant** (skeleton — change with care)                                                                                                   | **Variable** (real per-client content, already filled) |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **What**   | Folder structure above, layout chain, SEO machinery (`SEOHead`, astro-seo, JSON-LD generators), `robots.txt.ts`, llms.txt helpers, build/verify tooling, conventions | Brand tokens, page content, `config/*` data, blog/works content |
| **Where**  | `layouts/`, `SEOHead.astro`, `src/config/seo.ts` generator logic, `src/utils/`, `init.sh`, this file's conventions                              | `global.css @theme`, `config/*` data, `src/content/*`, `src/pages/*` |
| **Filled** | Already correct for this client — this is not a scaffold clone                                                                                  | Already filled — this is a finished, live site           |

### Knobs map — one home per per-client thing (never duplicate)

| Knob                                           | Its home(s)                                                                                                                                                                                     |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Colors (visual tokens)                         | `src/styles/global.css` → `@theme` (only)                                                                                                                                                       |
| Fonts                                          | Astro Fonts API, 3 files: `astro.config.mjs` `fonts[]` (Playfair Display, Open Sans, both via `fontProviders.fontsource()`) · `global.css` `@theme` `--font-*` · `MainLayout.astro` `<Font cssVariable>` |
| Company data (name, phone, email, social, url, geo) | `src/config/companyInfo.ts` → `COMPANY_INFO`                                                                                                                                                        |
| Services                                       | `src/config/services.ts`                                                                                                                                                                        |
| FAQs                                           | `src/config/faqs.ts`                                                                                                                                                                             |
| Author / credentials                           | `src/config/authors.ts`                                                                                                                                                                          |
| Animation strategy                             | **GSAP, fixed for this client** — `gsap` stays in `package.json`, all 6 `gsap-*` skills stay installed in `.claude/skills/`. Do not switch to vanilla without an explicit client decision (see "Evolving the scaffold"). |
| Contact form / email                           | `src/actions/contact/getContact.ts` (Astro Action) + Resend env vars (`RESEND_API_KEY`, `EMAIL_CONTACT`)                                                                                        |
| Navigation                                     | `src/utils/navigation.ts` holds the link data (`navBarLinksConst`), consumed by `src/components/global/Navbar.astro` and `Footer.astro`                                                         |
| `lang` / locale                                | `src/layouts/MainLayout.astro` (`<html lang="es-CO">`) — final, do not change                                                                                                                    |
| Pages                                          | `src/pages/*.astro` + `src/pages/servicios/`, `src/pages/blog/`                                                                                                                                  |

> **Colors** live **only** in `global.css` because Tailwind 4 reads them there
> to generate utilities. Never mirror colors into a `.ts` file.

---

## The harness — how this repo diverges from a fresh astro-harness clone

This site **predates** adopting the harness workflow — it was built directly,
not via `docs/brief/` ingestion. Consequences:

- `docs/brief/` exists (for future large-scope content overhauls) but was
  **not** used to build the current site — do not expect `arquitectura-
  informacion.md` / `brand.md` to exist or be current.
- `feature_list.json` was generated by **auditing the already-built site**,
  not from a brief: one entry per existing page/section, marked `"done"`
  directly. Only genuinely incomplete/planned work is `"pending"`.
- There is no `client-gaps.md` — there's nothing missing to track; the site is
  live in production.

**Going forward**, new features follow the normal loop: add an entry to
`feature_list.json` as `"pending"`, mark it `"in_progress"` (only one at a
time) while building, route it to the right builder skill (below), mark
`"done"` and commit when finished. `pnpm verify` is on-demand — see Commands.

### Development workflow — full lane vs. light lane

As of the `spec` / `spec-impl` / `adapt-harness` skills and the
`spec-verifier` subagent being added to this repo, all work now goes through
one of two lanes — see `specs/README.md` for the full mechanics. The routing
question is mechanical, not a judgment call:

**Is the answer already written in an approved document (a brief, client-
supplied content, an approved audit)?**

- **Yes → light lane.** Add/update a `feature_list.json` entry carrying
  `source` (the document + section/line range the answer comes from) and
  `acceptance` (verifiable criteria) — both required before the entry may
  move to `"in_progress"`. Implement with `/spec-impl feature <id>`.
- **No → full lane.** There's a decision to make that no document answers
  (new architecture, an invented client-facing claim, a scaffold-level
  change — see "Evolving the scaffold" below). Write `specs/NN-slug.md` with
  `/spec` → `Status: Draft`. Only a human may flip it to `Approved`; a Draft
  is not authorization to implement. Then `/spec-impl NN`.

Both lanes converge from there: implementation pauses for review, then
`spec-verifier` checks every acceptance criterion for real against the build
(including, for the light lane, confirming the cited `source` text actually
landed) — no agent marks a spec `Approved` or a feature `"done"` itself, only
a human does, after verification passes.

In both lanes `/spec-impl` executes every code step via the `coder` subagent
(one step per call) and stays the orchestrator — branch, per-step pauses,
diff review, ambiguities.

**Source documents currently available for the light lane:**
`docs/Auditoria_SEO_AEO_ShineAgencia.md` (SEO/AEO audit, 2026-07-30) — usable
as `source` for entries that are pure content/config fixes it identifies
(meta text, anchor text, schema field corrections). Structural or
architectural responses to its findings (e.g. deciding how a broken route
gets rebuilt, not just what text changes) are still a **decision**, not a
transcription — those go through the full lane even though the audit
document is what surfaced the need.

The 15 entries already in `feature_list.json` predate this workflow and have
no `source`/`acceptance` fields (see "The harness" above) — they are left
as-is, not retrofitted. Only entries added from here forward carry the new
fields.

### Where state & memory live (no `progress/` files)

- **`feature_list.json`** — the in-repo build _state_ for anything not yet
  finished. The authoritative queue for new work; travels with the repo.
- **`specs/`** — the full lane's pre-change sign-off record (one file per
  decision, written once, never deleted or marked "done" — the commit that
  implements it is the completion record). Not a task list, not overlapping
  with `feature_list.json` — see `specs/README.md` § "What this is not".
- **git history** — the durable _completion log_. `git log` answers "what was
  built, when."
- **Engram** (agent memory) — the cross-session _narrative_: decisions, why an
  approach was chosen, gotchas. Project-scoped (`shine`), not in the repo;
  surfaced with `mem_search` / `mem_context`.

### Skill routing — the two builders work at different altitudes

- **`front-end-astro`** = the **section/component** builder (visual). Fires
  once per section. Owns HTML structure, Tailwind, aesthetics, using
  `global.css` tokens.
- **`seo-guide-lines`** = the **page-level** SEO + data layer. Fires at page
  assembly. Owns `<title>`/meta, JSON-LD schemas, `COMPANY_INFO`, `faqs`,
  E-E-A-T, and the **one-`<h1>`-per-page** rule.

**Order per page:** build every section with `front-end-astro`, then close the
page with `seo-guide-lines`. A page feature that needs both lists both in
`builders`.

### `feature_list.json`

```jsonc
// each feature: { id, status, builders, nota }
// status: "pending" | "in_progress" | "done"   (only ONE in_progress at a time)
// builders: subset of ["front-end-astro", "seo-guide-lines"]
```

**Edit this file with surgical string replacement (`Edit` tool), never a full
JSON reserialize** — a full reload+dump reformats the whole file and produces
a noisy diff.

### Acceptance — see `CHECKPOINTS.md`

`CHECKPOINTS.md` here is a **pre-production checklist**, not per-feature
acceptance criteria — this site is already live, so most items are already
satisfied; it exists to catch drift (e.g. domain mismatch) going forward.

## Orchestration model (Claude Code subagents)

**The main session is the _orchestrator_.** Its job is to understand the
request, classify it, decide **delegate vs. handle inline**, route delegated
work to the right specialist subagent, and synthesize the results. Specialists
live in `.claude/agents/`.

### Orchestrator model — recommended, not forced

- **Default: Sonnet.** Routing and light inline work don't need Opus, and the
  specialists already run on cheaper models (see table).
- **Escalate to Opus manually** (`/model opus`) only for genuinely hard work
  that stays in the main session: ambiguous architecture, complex planning, or
  advanced Three.js work `coder` flags back up.

### Delegate vs. handle inline

Delegation is **not free**: every subagent starts cold and re-derives context
(re-reads `AGENTS.md`, re-explores the repo). Route accordingly:

- **Delegate** when the work is substantial and self-contained enough that the
  cold-start cost amortizes: building a whole section/feature, a multi-file
  refactor/review, a real research dive, a git commit flow.
- **Handle inline** for small, context-bound work: general questions,
  single-file reads, quick lookups, a one-line tweak, and **any visual work
  that needs an attached image** (subagents can't receive image attachments).

### Routing table — one specialist per request type

| Request type                                                                          | Delegate to  | Model  |
| ------------------------------------------------------------------------------------- | ------------ | ------ |
| git: stage, commit, push, open a PR                                                   | `git-ops`    | haiku  |
| save or recall memory/context/past decisions (Engram)                                 | `memory-ops` | haiku  |
| bug fix, CSS/Tailwind tweak, isolated component, new feature, visual work (no image)  | `coder`      | sonnet |
| multi-file refactor, PR/code review, architecture decisions                           | `reviewer`   | sonnet |
| web research, external documentation (Context7), browsing with agent-browser          | `research`   | sonnet |
| verify a spec's or feature's acceptance criteria against the real build               | `spec-verifier` | haiku |

### Non-negotiables

- Never let a subagent commit or push without the user explicitly asking for
  it **in the current turn** — a past approval does not carry over.
- Never let `git-ops` push or open a PR unless the user requested that
  specific action this turn.
- Image-based visual work stays in the orchestrator session.

## Conventions for writing components (must-follow)

- Props typed with an `interface`; import everything via `@/`.
- Use `global.css` tokens via Tailwind utilities — **never hardcode colors**.
- Images: `<Image>`/`<Picture>` from `astro:assets`, never raw `<img>`; `alt`
  required.
- SVG icons: import from `@/assets/icons/`, never inline `<svg>` markup.
- No inline `style=""`, no arbitrary values (`h-[220px]`).
- Tailwind 4 gradients: `bg-linear-to-*` (never the v3 `bg-gradient-to-*`).
  **Two existing files still use the old `bg-gradient-to-*` syntax —
  `src/components/ui/CTABanner.astro` and
  `src/components/section/landing/LatestProjects.2.astro`. Tailwind 4 keeps
  `bg-gradient-to-*` as a supported alias so these still render, but new code
  must use `bg-linear-to-*`; fix the two existing files opportunistically if
  you touch them.**
- **No `<br />` tags** — wrap the segment in `<span class="block">` instead;
  use Tailwind spacing utilities (`mb-*`, `space-y-*`) between elements.
- Animations live in `src/utils/scripts/globalAnimations/` (site-wide: navbar,
  hero, background) or `src/utils/scripts/perPageAnimations/<page>/`
  (per-page) — loaded via `<script>` tags directly in the component that uses
  them, no global bundle. Do **not** add animation logic inside components.
  Every GSAP timeline **must** be wrapped in `gsap.matchMedia()` with a
  `(prefers-reduced-motion: reduce)` branch that sets elements to their final,
  visible state (`autoAlpha: 1`) — this repo already follows this pattern
  consistently, keep it that way. See the `front-end-astro` skill and
  `gsap-core` for the canonical pattern.
- CSS/Tailwind motion must degrade with the `motion-reduce:` variant.
- Exactly one `<h1>` per page (it is the page's primary entity/keyword).
- Ensure keyboard access for all interactive controls.

---

## Evolving the scaffold

> **This file and the skills are read as truth.** When you change
> infrastructure, update the contract **in the same change** — never leave
> docs stale "for later". `pnpm verify` checks the _code_; it does **not**
> check whether this file or the skills are still accurate. That is on you.

### If you change X → update Y

| If you…                                             | Update…                                                                                                                    |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Add a dependency / remove one                        | `package.json` · **Tech stack** above                                                                                    |
| Change contact-form/email provider                   | `src/actions/contact/getContact.ts` · env vars · **Tech stack** · `CHECKPOINTS.md`                                       |
| Switch this client from GSAP to vanilla (or back)     | `pnpm remove gsap` (or add it) · delete/restore `.claude/skills/gsap-*` · **Knobs map** row · `CHECKPOINTS.md` motion checklist — see the "Animation strategy" reasoning in the base astro-harness contract if unsure |
| Add/rename a config file in `src/config/`             | **Config** section · **Knobs map**                                                                                       |
| Add a new font slot                                   | the 3 font files (see Knobs map)                                                                                         |
| Change folder conventions                             | **Components** section · the structure note in `front-end-astro` SKILL.md                                               |
| Add/change a deploy-level redirect                    | `public/_redirects` · verify `dist/_redirects` after build (Netlify only applies the file if it reaches the publish directory) |
| Change a workflow skill or agent (`.claude/skills/spec*`, `.claude/agents/*`) | **Development workflow** / **Orchestration model** above · `specs/README.md` § "Workflow"                  |

### Scaffold-level vs per-client

This repo is a single client, not the boilerplate — every change here is
"this client only" by definition. If a change should propagate to *future*
clients too (e.g. "always add WebMCP by default"), that belongs in the
`astro-harness` scaffold repo, not here.

---

## Animation strategy — GSAP (fixed for this client)

Unlike the generic astro-harness scaffold (which supports GSAP or vanilla per
client), **this client's decision is settled: GSAP + Lenis**, already fully
wired. Skills used: `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`,
`gsap-plugins`, `gsap-utils`, `gsap-performance` (all installed in
`.claude/skills/`), plus `gsap-frameworks` and `docs-lookup` which the base
scaffold does not install by default.

**Before writing any animation**, invoke (with the `Skill` tool) the `gsap-*`
skill that matches the technique — don't write GSAP code by hand first.

**Reduced motion is mandatory and already the norm in this codebase**: every
timeline is wrapped in `gsap.matchMedia()` with a `prefers-reduced-motion:
reduce` branch that lands elements in their final, visible state
(`autoAlpha: 1`). Follow the existing pattern in
`src/utils/scripts/perPageAnimations/home/hurtsAnimation.js` as the canonical
example in this repo.

- **Where**: all GSAP lives in `src/utils/scripts/globalAnimations/` or
  `src/utils/scripts/perPageAnimations/<page>/`, never inside components.
- **Division of labor**: `front-end-astro` builds the markup (no animation) →
  the `gsap-*` skills inform the animation → this contract dictates where it
  goes and that it respects reduced motion.

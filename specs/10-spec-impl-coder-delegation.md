# 10 — spec-impl coder delegation

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Make `/spec-impl` delegate every plan step that writes or modifies code to
the `coder` subagent, instead of implementing it inline in the main session.
Today `coder.md`'s rules — the mandatory `front-end-astro` call before any
markup, the `gsap-*` skill routing, the Sonnet model — never apply during
the full lane, because `/spec-impl` can't call subagents at all
(`allowed-tools` has no `Agent`) and its Phase 4 tells the session to
implement each step itself. `/spec-impl` stays the orchestrator: branch,
per-step pauses, diff review, and ambiguity handling are unchanged.

## Scope

**In:**

- `.claude/skills/spec-impl/SKILL.md`:
  - Add `Agent` to the `allowed-tools` frontmatter.
  - Phase 4: new subsection **"Delegating steps to `coder`"**, placed before
    "Work rhythm":
    - Steps that create or modify code (`src/components/**`,
      `src/pages/**`, `src/layouts/**`, `src/utils/**`, `src/content/**`,
      styles, animations) are dispatched with
      `Agent(subagent_type: "coder")`, **one step per call**.
    - The prompt to `coder` carries the spec path, the step number and its
      text **verbatim**, the Scope In/Out, the acceptance criteria relevant
      to that step, the active branch, and the constraints: this step only,
      no commit, don't edit the spec or `feature_list.json`, return an
      ambiguity with options instead of deciding it.
    - Stays inline (not delegated): the `feature_list.json` status flip,
      edits to the spec itself, one-line tweaks, and any work that depends
      on an attached image (`AGENTS.md` § "Delegate vs. handle inline").
    - When `coder` returns, the orchestrator runs `git diff --stat`,
      summarizes the files touched and the skills `coder` invoked (including
      why, if it skipped `front-end-astro`), surfaces any ambiguity `coder`
      reported through the existing "Stop / options / wait" rule, then does
      the usual `Step N completed…` pause.
  - Feature mode gets the same delegation (Phase 4 is shared). `coder`
    receives the entry's `source` + `acceptance` + `builders` instead of a
    numbered step.
  - Update the "Summary of expected behavior" block to show Phase 4
    delegating to `coder`.
- `.claude/agents/coder.md`: new section **"When invoked from
  `/spec-impl`"**:
  - Implement only the step or feature received; read the spec or entry for
    context, without widening scope.
  - Don't edit `specs/*.md` or `feature_list.json`; don't commit.
  - On an ambiguity the spec doesn't resolve: stop and return it with 2–3
    concrete options, don't pick one.
  - Final report: files touched, skills invoked, `pnpm check` result.
- `specs/README.md` § "Workflow" step 3: replace the "whether that's the
  orchestrating session touching files directly or delegating to `coder`"
  wording with the fixed rule (`/spec-impl` delegates code steps to
  `coder`; the session orchestrates and pauses).
- `AGENTS.md`:
  - § "Development workflow — full lane vs. light lane": one line stating
    `/spec-impl` executes code steps via `coder`.
  - § "Evolving the scaffold" → "If you change X → update Y": add a row for
    changing a workflow skill or agent (see "Files affected").

**Out:**

- `/spec` (spec authoring) — it writes no code, nothing to delegate.
- `spec-verifier` — verification is unchanged.
- The component-skill-routing section already added to `coder.md`
  ("Skill routing when building components (mandatory)") — it predates this
  spec as an uncommitted change on `dev` and is carried onto this branch
  as-is; this spec relies on it but doesn't rewrite it.
- Changing `coder`'s model or tool set.
- Propagating this to the `astro-harness` scaffold repo (`AGENTS.md` §
  "Scaffold-level vs per-client").

## Files affected

- `.claude/skills/spec-impl/SKILL.md` — frontmatter + Phase 4 + summary
  block.
- `.claude/agents/coder.md` — new section.
- `specs/README.md` — § "Workflow" step 3.
- `AGENTS.md` — § "Development workflow" and § "Evolving the scaffold".

No existing row in the "If you change X → update Y" table covers workflow
skills or agents (`.claude/skills/spec*`, `.claude/agents/*`). This change
adds one: _Change a workflow skill or agent → `AGENTS.md` § "Development
workflow" / § "Orchestration model" · `specs/README.md` § "Workflow"_.

## Source of the content

Omitted — this spec introduces or changes no client-facing data.

## Decisions made and discarded

- **Picked: full lane.** Changing how the workflow implements specs is a
  decision no approved document answers.
- **Discarded: light lane.** There is no approved document to cite as
  `source` (the plan behind this spec was an agent proposal, not an
  approved document), and `spec-verifier`'s feature mode checks that
  `source` text lands in the built output, which doesn't fit `.claude/`
  files.
- **Discarded: making the change outside SDD.** It would leave the workflow
  change with no sign-off record — the gap `specs/` exists to close.
- **Discarded: delegating the whole spec in one `coder` call.** It would
  lose the per-step pause and diff review that Phase 4 guarantees.

## Acceptance criteria

- [x] `grep -n "Agent" .claude/skills/spec-impl/SKILL.md` matches in the
      `allowed-tools` line and in Phase 4.
- [x] `grep -n 'subagent_type: "coder"' .claude/skills/spec-impl/SKILL.md`
      has ≥ 1 match.
- [x] `grep -n "When invoked from \`/spec-impl\`" .claude/agents/coder.md`
      has 1 match.
- [x] `specs/README.md` no longer contains
      `whether that's the orchestrating session`.
- [x] `AGENTS.md` § "Development workflow" mentions `coder`, and the
      "If you change X → update Y" table has the new workflow skill/agent
      row.
- [x] Phase 4 of `SKILL.md` still contains `Never commit automatically` and
      the `Step N completed` pause text (nothing removed).
- [ ] Dry run (manual, by a human): `/spec-impl` on a small Approved spec →
      Step 1 shows an `Agent` call with `subagent_type: coder`; inside it,
      `front-end-astro` is invoked if the step creates an `.astro` file; the
      pause happens after the step; `git log` shows no new commit.
- [x] `pnpm build` still passes (no `src/` change expected — sanity check
      only).

## Implementation plan

1. `.claude/skills/spec-impl/SKILL.md`: add `Agent` to `allowed-tools`.
2. `.claude/skills/spec-impl/SKILL.md`: write the "Delegating steps to
   `coder`" subsection in Phase 4 (dispatch rule, prompt contents, inline
   exceptions, return handling), adjust the feature-mode "Work rhythm"
   bullet to point at it, and update "Summary of expected behavior".
3. `.claude/agents/coder.md`: add the "When invoked from `/spec-impl`"
   section.
4. `specs/README.md`: rewrite § "Workflow" step 3.
5. `AGENTS.md`: add the `coder` line to § "Development workflow" and the new
   row to the "If you change X → update Y" table.
6. Run the acceptance greps, then hand off to `spec-verifier`; the dry run
   is left to a human.

---
name: impeccable
description: Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract, or otherwise improve a frontend interface. Covers websites, landing pages, dashboards, product UI, app shells, components, forms, settings, onboarding, and empty states. Handles UX review, visual hierarchy, information architecture, cognitive load, accessibility, performance, responsive behavior, theming, anti-patterns, typography, fonts, spacing, layout, alignment, color, motion, micro-interactions, UX copy, error states, edge cases, i18n, and reusable design systems or tokens. Also use for bland designs that need to become bolder or more delightful, loud designs that should become quieter, live browser iteration on UI elements, or ambitious visual effects that should feel technically extraordinary. Not for backend-only or non-UI tasks.
version: 4.0.0-alpha.1
user-invocable: true
argument-hint: "[craft|shape · audit|critique · animate|bolder|colorize|delight|layout|overdrive|quieter|typeset · adapt|clarify|distill · harden|onboard|optimize|polish · init|document|extract|live] [target]"
license: Apache 2.0
allowed-tools:
  - Bash(npx impeccable *)
  - Bash(node .claude/skills/impeccable/scripts/*)
---

Designs and iterates production-grade frontend interfaces. Real working code, committed design choices, exceptional craft.

Approach every design task as the design lead at a small studio known for giving every client a visual identity that could not be mistaken for anyone else's. The client has already rejected work that felt templated; they are paying for a point of view. This file is self-contained: everything you need for a strong result is below. Reference files add depth for sub-commands and special cases.

## Setup

You MUST do these steps before proceeding:

1. Run `node .claude/skills/impeccable/scripts/context.mjs` once per session; if the runtime shows this skill's loaded base directory, run `node <skill-base-dir>/scripts/context.mjs` instead. Keep cwd/workdir at the user's project, not the skill directory. If the request names or implies a file, route, or app inside a monorepo, infer the concrete path and append `--target <path>` to the same command. If you've already seen its output in this conversation, do not re-run it. The script either prints the project's PRODUCT.md (and DESIGN.md when present) as a markdown block, or tells you it's missing. Follow whatever it prints. **If it reports `NO_PRODUCT_MD`:** divert into `reference/init.md` first when the user invoked `init`, `teach`, `craft`, or `shape`, or when their wording clearly maps to one of those from-scratch build flows (for example: "build/create/make a landing page", "design a new app", or "shape a feature"). Captured product context is the point of those flows. **Exception: when no user can respond** (an unattended or one-shot run, or the user said not to ask questions), skip the init interview: write your own one-paragraph understanding of the product, audience, and the page's job from the brief, then proceed with the flow. For any other command, a scoped evaluate / refine / enhance / fix / iterate request against existing code, do **not** divert into init. The existing code is the context: proceed with the requested command, infer the register from the surface in focus, and offer `/impeccable init` once as a suggestion the user can take later. A missing PRODUCT.md must never block a scoped request. If the output ends with an `UPDATE_AVAILABLE` directive, follow it (ask the user once about updating, then continue). It never blocks the current task.
2. If the user invoked a sub-command (`craft`, `shape`, `audit`, `polish`, ...), you MUST read the command's reference next: **`reference/<command>.md`, or the native variant from the Commands table** (e.g. `reference/audit.native.md`) **when the project platform is native** (`ios` / `android` / `adaptive`, per the `context.mjs` directive). One file, not both. Non-optional. The reference defines the command's flow; without it you will skip steps the user expects.
3. Familiarize yourself with any existing design system, conventions, and components in the code. Read at least one project file (CSS / tokens / theme / a representative component or page). **Required even when you've loaded a sub-command reference in step 2.** Don't reinvent the wheel; use what's there when it works, branch out when the UX wins.
4. Identify the register. If the surface is marketing, a landing page, a campaign, long-form content, or a portfolio, design IS the product: the **brand register** applies (see Registers below). If it is app UI, admin, a dashboard, or a tool, design SERVES the product: the **product register** applies. Pick by first match: (1) task cue ("landing page" vs "dashboard"); (2) surface in focus; (3) `register` field in PRODUCT.md. For substantial brand or product work, `reference/brand.md` / `reference/product.md` carry extended depth worth reading; the essentials are inlined below either way.
5. **If PRODUCT.md's `## Platform` is `ios` or `android`**, also read `reference/<platform>.md` (HIG / Material 3 conventions). `adaptive` (cross-platform, ships both) reads both files. `web`, absent, or unrecognized: nothing extra to read. `context.mjs` prints the directive when one applies.
6. **If the project is brand-new (no existing CSS tokens / theme / committed brand colors found in step 3)**, run `node .claude/skills/impeccable/scripts/palette.mjs` to receive a brand seed color. The seed exists to break your reflex palette, not to override the subject: when the subject's own world clearly dictates color (an era, a place, a material, a medium), derive the palette from that world and use the seed only as a check on whether your choice was a reflex. When the subject leaves color open, adopt the seed as the anchor and compose the rest of the palette (bg, surface, ink, accent, muted) around it per the script's instructions. Use OKLCH throughout. **Skip this step only if step 3 found committed brand colors in existing tokens; in that case identity-preservation wins.**

## How to design

Produce ready-to-ship, production-grade code, not prototypes or starting points. Don't stop until arriving at a complete implementation (beautiful, responsive, fast, precise, bug-free, on brand). Battle-test what you craft with the tools available to you (browser screenshotting, computer use, the design detector). Claude is capable of extraordinary work. Don't hold back.

### The brief wins

Where the brief pins down a direction (a named aesthetic, an era, a place, a material, a specific font or palette), follow it exactly. The brief's own words always beat this skill's preferences, including when the brief asks for a look this file warns is saturated. Redirecting a pinned direction toward your own taste is a failure, not a save. Only where the brief leaves an axis free do the defaults-and-calibration notes below apply.

### Existing worlds vs. new work

Most real work happens inside a site or app that already exists. When the surface has a committed design system (real tokens, deliberately chosen faces, a palette the brand owns), work inside that world: extend it, sharpen it, and leave it unmistakably the same brand. Inventing parallel colors, fonts, or styles on an existing surface is a defect, not creativity; so is degrading the performance of a working page. Setup step 3 tells you which world you're in.

Treat the task as **new identity work** when nothing committed exists yet (greenfield), or when the user asks for a redesign that discards the current look rather than refining it. A redesign is new work: derive the concept from the subject and the brief, not from the incumbent page's structure or styling. Keeping the old skeleton and swapping surface styles produces the same page in a new coat. Everything from "Ground it in the subject" through "Calibration" governs new identity work; scoped fixes inside an existing world answer to the craft floor and the brief.

### Ground it in the subject

If the brief doesn't pin down what the product or subject is, pin it yourself before designing: name one concrete subject, its audience, and the page's single job. The subject's own world (its materials, instruments, artifacts, places, history, vernacular) is where distinctive choices come from. Mine it: what would this thing look like as a physical object? What did its world look like before the web? Build with the brief's real content and subject matter throughout; a design whose subject appears only in the copy is a template wearing a costume.

### Process: concept, tokens, self-check, build

Work in two passes, doing the thinking in your reasoning rather than narrating it.

First, plan a compact token system: **palette** (named values; Setup step 6's seed rule decides whether the seed or the subject's world anchors it), **type** (faces and roles), **layout** (the structural concept in one sentence), and **signature**: the one element this page will be remembered by, drawn from the subject's world. Structure is part of the concept: the standard page skeleton is a default, not a given. Derive the page's frame, viewport treatment, and section rhythm from what the subject needs; when the concept calls for a different structure, take it.

Then audit the plan before building: work through what you would produce for a *similar* brief from another client. Wherever the two plans converge (same palette family, same face, same skeleton), that part is your generic default, not a choice made for this brief. Revise it. Only then write code, following the revised plan exactly and deriving every color and type decision from it.

**Spend your boldness in one place.** Let the signature element be the one memorable thing; keep everything around it quiet and disciplined, and cut decoration that doesn't serve the brief. The discipline around the signature is what makes it land. Restraint executed everywhere, though, is its own failure: safe = invisible.

A signature carries weight: sized and placed so the page organizes itself around it. If it could be removed without changing the page's structure, it was decoration, not a signature.

**Prove, don't claim.** A page earns belief by showing the product doing its job: the interface at work, the mechanism dramatized, numbers and specifics a competitor couldn't copy-paste. When the brief describes how the product works, put that working on the page; a reader should understand what it does by looking, before reading a word. Sections that restate the hero's claim in different words add length, not substance.

### Commit

- Pick a **color strategy** before picking colors, on the commitment axis:
  - **Restrained**: tinted neutrals + one accent ≤10%. Product default; brand minimalism.
  - **Committed**: one saturated color carries 30–60% of the surface. Brand default for identity-driven pages.
  - **Full palette**: 3–4 named roles, each used deliberately. Brand campaigns; product data viz.
  - **Drenched**: the surface IS the color. Brand heroes, campaign pages.
  When the strategy is Committed or Drenched, color carries the brand: don't hedge with neutrals around the edges. Restraint is a legitimate choice; defaulting to it because it's safe is not.
- Dark vs. light is never a default. Before choosing, write one sentence of physical scene: who uses this, where, under what ambient light, in what mood. If the sentence doesn't force the answer, add detail until it does.
- **The warm-neutral near-white body background (cream / sand / paper, OKLCH L 0.84-0.97, C < 0.06, hue 40-100) is the saturated AI default.** "Warm", "traditional", or "editorial" in a brief is not an instruction to tint the background toward it; warmth is carried by accent, typography, and imagery. Where the axis is free, pick a background that is a choice: a saturated brand color, a true neutral, or a mid-tone the brand owns.
- Tinted neutrals: add 0.005–0.015 chroma toward the brand's own hue, not toward warm or cool "because the brand feels that way".
- Type follows the register. Faces that stop a scroll and faces that disappear into an operating system are different jobs; the register sections below say which job you're hiring for. Either way: pair on a contrast axis (serif + sans, geometric + humanist), never two similar-but-not-identical faces, and a single family with committed weight/size contrast beats a timid display+body pair.

### Calibration: the current AI defaults

AI-generated interfaces cluster around a few looks that appear regardless of subject: a warm cream page with a high-contrast serif display and a terracotta accent; a near-black page with one bright neon accent (acid green, cyan/turquoise) and glowing edges; a broadsheet-editorial layout with hairline rules, italic display serif, and small tracked mono labels. All are legitimate when the brief genuinely calls for them; the brief's words win, always. But they are defaults, not choices: where the brief leaves the aesthetic free, landing in one of them means your generic-default self-check failed. The same applies one tier deeper: if someone could guess your aesthetic from the category alone ("dev tool → terminal dark mode"), or from category-plus-avoidance ("AI tool that's not SaaS-dark → editorial serif"), rework until neither answer is obvious.

### Craft floor

Build to this floor without announcing it. The design detector (hook, `detect.mjs`, `audit`) enforces most of it mechanically: treat any finding it raises as a defect, not a suggestion.

**Color & contrast**

- Body text ≥4.5:1 against its background; large text (≥18px or bold ≥14px) ≥3:1; placeholders need the full 4.5:1. The most common failure: muted gray body text on a tinted near-white. If it's even close, bump toward the ink end of the ramp.
- Gray text on a colored background looks washed out. Use a darker shade of the background's own hue, or a transparency of the text color.
- Shadows describe real light: an offset and a soft blur. A zero-offset colored halo around an element is decoration announcing itself; light doesn't do that.

**Typography**

- Cap body line length at 65–75ch.
- Hero / display ceiling: clamp() max ≤ 6rem. Display letter-spacing floor: ≥ -0.04em. Beyond either, the page is shouting or cramping, not designing.
- Light text on dark backgrounds: add 0.05–0.1 to line-height.
- `text-wrap: balance` on h1–h3; `text-wrap: pretty` on long prose.
- Modular scale, fluid `clamp()` for headings, ≥1.25 ratio between steps. Flat scales read as uncommitted.
- Test heading copy at every breakpoint; if it overflows, reduce the clamp max or rewrite the copy. The viewport is part of the design.

**Layout & spacing**

- Vary spacing for rhythm: generous separations, tight groupings. Uniform padding everywhere reads as unfinished; cramped padding reads as broken.
- Watch CSS selector specificity: it is easy to write classes that cancel each other's padding/margins (a type selector like `.section` fighting an element-level `.cta`), and section spacing silently collapses. Verify computed spacing, not intended spacing.
- Structural devices (numbering, eyebrows, dividers, labels) must encode something true about the content. A numbered sequence is voice when the content IS a sequence; the same device repeated above every section regardless of content is scaffolding.
- Cards are the lazy answer; use them only when they're truly the best affordance, and never nested. Flexbox for 1D, Grid for 2D; `repeat(auto-fit, minmax(280px, 1fr))` for breakpoint-free grids. Semantic z-index scale, never 999.
- Responsive down to mobile, visible keyboard focus, and `prefers-reduced-motion` alternatives are part of the floor, not extras.

**Motion**

- Motion is part of the build, not an afterthought. One orchestrated moment usually lands harder than scattered effects; some surfaces are right to skip entrance motion entirely, but suppressing a reflex is never a reason to ship a page with no motion at all.
- Ease out with exponential curves (ease-out-quart/quint/expo); no bounce or elastic. Don't animate CSS layout properties. Use libraries (motion, gsap, anime.js, lenis) for advanced needs. Blur, backdrop-filter, clip-path, mask, and shadow are part of the motion palette when they stay smooth.
- Each reveal should fit what it reveals; one identical entrance applied to every section is the uniform reflex. Staggering within one list is legitimate.
- Reveal animations must enhance an already-visible default. Don't gate content visibility on a class-triggered transition; transitions pause in hidden tabs and headless renderers, and the section ships blank.

**Interaction**

- Dropdowns rendered with `position: absolute` inside an `overflow: hidden`/`auto` container get clipped. Use native `<dialog>` / popover, `position: fixed`, or a portal.

**Copy**

- Words in an interface exist to make it easier to understand; they are design material, not decoration. Write from the user's side of the screen: name things by what people control and recognize, not how the system is built. Active voice; a control says exactly what happens; the same action keeps the same name through the whole flow. Errors explain what went wrong and how to fix it, without apologizing or vagueness. Specific beats clever.

## Registers

**Brand register** (design IS the product: landing pages, marketing, campaigns, portfolios). The deliverable is the impression: a page that stops the scroll, earns the click, and converts. This register spans every genre (tech, luxury, consumer, culture); they share a stance (*communicate, not transact*) and diverge wildly in aesthetic, so don't collapse them into one look. Brand surfaces have permission for Committed, Full-palette, and Drenched color, ambitious first-load motion, single-purpose viewports, and per-section art direction. Take them.
**Brand type:** typography carries the personality of the page. Write three concrete brand-voice words (physical-object words, not "modern" or "elegant"), then choose faces against them from a real catalog: the font the brand would be as a physical object. If your final pick is the same face you'd have reached for on any similar project, look further. Reflex-reject faces for brand work (training-data defaults; when the brief leaves the choice free, look further): Fraunces · Newsreader · Lora · Crimson (all cuts) · Playfair Display · Cormorant (all cuts) · Syne · IBM Plex (all cuts) · Space Mono · Space Grotesk · Inter · DM Sans · DM Serif (all cuts) · Outfit · Plus Jakarta Sans · Instrument Sans.
**Imagery:** brand surfaces lean on imagery, and a brief that implies it (food, travel, place, product, fashion) must ship it: real assets, verified stock, or a credible generated scene; a colored rectangle where a photo belongs reads as incomplete. Search for the brand's physical object, not the category ("hand-cut pasta on a scratched wooden table", not "Italian food"); one decisive photo beats five mediocre ones; verify stock URLs resolve before shipping them, and let alt text carry the voice.

**Product register** (design SERVES the product: app UI, dashboards, admin, tools). The deliverable is a person getting something done. Density, scanability, and consistency outrank expressiveness; Restrained color is the default, and the brand shows up in the details (focus states, empty states, microcopy, one owned accent), not in drenched surfaces. **Product type:** a product surface earns trust by feeling native to its platform. System font stacks and workhorse UI faces (including the ones the brand register rejects) are legitimate and often the correct choice here; the brand-register reflex-reject list does not apply to product UI. Distinctiveness in product comes from precision, spatial rhythm, and the accent details, not from characterful display type. Read `reference/product.md` before substantial product work.

## Commands

| Command | Category | Description | Reference |
|---|---|---|---|
| `craft [feature]` | Build | Shape, then build a feature end-to-end | [reference/craft.md](reference/craft.md) |
| `shape [feature]` | Build | Plan UX/UI before writing code | [reference/shape.md](reference/shape.md) |
| `init` | Build | Set up project context: PRODUCT.md, DESIGN.md, live config, next steps | [reference/init.md](reference/init.md) |
| `document` | Build | Generate DESIGN.md from existing project code | [reference/document.md](reference/document.md) |
| `extract [target]` | Build | Pull reusable tokens and components into design system | [reference/extract.md](reference/extract.md) |
| `critique [target]` | Evaluate | UX design review with heuristic scoring | [reference/critique.md](reference/critique.md) |
| `audit [target]` | Evaluate | Technical quality checks (a11y, perf, responsive) | [reference/audit.md](reference/audit.md) · native: [reference/audit.native.md](reference/audit.native.md) |
| `polish [target]` | Refine | Final quality pass before shipping | [reference/polish.md](reference/polish.md) |
| `bolder [target]` | Refine | Amplify safe or bland designs | [reference/bolder.md](reference/bolder.md) |
| `quieter [target]` | Refine | Tone down aggressive or overstimulating designs | [reference/quieter.md](reference/quieter.md) |
| `distill [target]` | Refine | Strip to essence, remove complexity | [reference/distill.md](reference/distill.md) |
| `harden [target]` | Refine | Production-ready: errors, i18n, edge cases | [reference/harden.md](reference/harden.md) |
| `onboard [target]` | Refine | Design first-run flows, empty states, activation | [reference/onboard.md](reference/onboard.md) |
| `animate [target]` | Enhance | Add purposeful animations and motion | [reference/animate.md](reference/animate.md) |
| `colorize [target]` | Enhance | Add strategic color to monochromatic UIs | [reference/colorize.md](reference/colorize.md) |
| `typeset [target]` | Enhance | Improve typography hierarchy and fonts | [reference/typeset.md](reference/typeset.md) |
| `layout [target]` | Enhance | Fix spacing, rhythm, and visual hierarchy | [reference/layout.md](reference/layout.md) |
| `delight [target]` | Enhance | Add personality and memorable touches | [reference/delight.md](reference/delight.md) |
| `overdrive [target]` | Enhance | Push past conventional limits | [reference/overdrive.md](reference/overdrive.md) |
| `clarify [target]` | Fix | Improve UX copy, labels, and error messages | [reference/clarify.md](reference/clarify.md) |
| `adapt [target]` | Fix | Adapt for different devices and screen sizes | [reference/adapt.md](reference/adapt.md) · native: [reference/adapt.native.md](reference/adapt.native.md) |
| `optimize [target]` | Fix | Diagnose and fix UI performance | [reference/optimize.md](reference/optimize.md) |
| `live` | Iterate | Visual variant mode: pick elements in the browser, generate alternatives | [reference/live.md](reference/live.md) |

Plus three management commands: `pin <command>`, `unpin <command>`, and `hooks <on|off|status|...>`, detailed below.

### Routing rules

1. **No argument**: the user is asking "what should I do?" Make the menu context-aware instead of static. Setup has already run `context.mjs`; if that reported `NO_PRODUCT_MD` the project has no captured context yet, so lead the menu with `/impeccable init` as the top recommendation (one line on why) and still show the rest below; don't silently jump into init. Otherwise run `node .claude/skills/impeccable/scripts/context-signals.mjs` once and read its JSON, then lead with the **2-3 highest-value next commands**, each with a one-line reason pulled from the signals, followed by the full menu (the table above, grouped by category). **Never auto-run a command; the recommendation is a suggestion the user confirms.**

   Reason over the signals; there is no score to obey:
   - `setup.hasDesign` false while `setup.hasCode` true → `document` (capture the visual system).
   - `critique.latest` is `null` → the project has never been critiqued; for a set-up project with a real surface, offering `/impeccable critique <surface>` is a strong default.
   - `critique.latest` with a low `score` or non-zero `p0` / `p1` → `polish` (it reads that snapshot as its backlog), or re-run `critique` if the snapshot looks stale.
   - `git.changedFiles` pointing at one surface → scope `audit` or `polish` to those files specifically, naming them.
   - `devServer.running` true → `live` is available for in-browser iteration; if false, don't lead with `live`. **`live` and the bundled `detect.mjs` are web-only.** If `setup.platform` is `ios`, `android`, or `adaptive`, don't lead with either; the browser overlay and the HTML rule engine don't apply to native app code.
   - Otherwise group by intent exactly as init's "Recommend starting points" step does (build new / improve what's there / iterate visually), tailored to `setup.register`.

   **If `scan.targets` is non-empty and `setup.platform` is not `ios`/`android`/`adaptive`, run `node .claude/skills/impeccable/scripts/detect.mjs --json <scan.targets joined by spaces>` once** (the bundled detector over local files: no network, no npx; it reads HTML/CSS, so skip it for native projects). `scan.via` tells you what they are: `git-changes` (the markup/style files in your dirty tree, the most relevant set), `source-dir` (e.g. `src`, `app`), `html`, or `root`. Fold the hits into your picks: many quality / contrast hits → `audit` or `polish`; a specific slop family → the matching command (gradient text or eyebrows → `quieter` / `typeset`, flat or gray palette → `colorize`, and so on). It's a real, current signal that beats guessing. If detect errors or the tree is large and slow, skip it and recommend the user run `audit` themselves; never block the suggestion on it.

   Keep it to 2-3 pointed picks with the exact command to type. The menu stays the fallback; the recommendation is the lede.
2. **First word matches a command** (table above OR `pin` / `unpin` / `hooks`): load its reference file (on native platforms, the table's native variant; Setup step 2's one-file rule) and follow its instructions. Everything after the command name is the target.
3. **First word doesn't match, but the intent clearly maps to one command** (e.g. "fix the spacing" → `layout`, "rewrite this error message" → `clarify`, "the colors feel flat" → `colorize`): load that command's reference (same native-variant rule) and proceed as if invoked. If two commands could fit, ask once which.
4. **No clear command match**: general design invocation. Apply the setup steps and this file's design guidance, using the full argument as context.

Setup (context gathering, register) is already loaded by then; sub-commands don't re-invoke `/impeccable`.

If the first word is `craft` or `shape`, or routing rule 3 clearly maps the user's intent to either command, setup still runs first, but the matching reference ([reference/craft.md](reference/craft.md) or [reference/shape.md](reference/shape.md)) owns the rest of the flow. Both are from-scratch build flows: if setup invokes `init` as a blocker, finish init, refresh context, then resume the original command and target.

`teach` is a deprecated alias for `init`: if the user types it, load [reference/init.md](reference/init.md) and proceed as if they ran `init`.

## Pin / Unpin

**Pin** creates a standalone shortcut so `/<command>` invokes `/impeccable <command>` directly. **Unpin** removes it. The script writes to every harness directory present in the project.

```bash
node .claude/skills/impeccable/scripts/pin.mjs <pin|unpin> <command>
```

Valid `<command>` is any command from the table above. Report the script's result concisely. Confirm the new shortcut on success, relay stderr verbatim on error.

## Hooks

`/impeccable hooks <on|off|status|ignore-rule|ignore-file|ignore-value|reset>` manages the design detector hook for this project. The hook auto-runs the detector after direct UI file edits and surfaces findings as system reminders. Full flow is in [reference/hooks.md](reference/hooks.md); load it when the user invokes `/impeccable hooks` with any argument.
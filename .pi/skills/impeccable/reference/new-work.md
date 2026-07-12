# New identity work

You are reading this because nothing committed exists yet (greenfield), or the user asked for a redesign that discards the current look. The task is the same either way: invent a visual identity that could not be mistaken for anyone else's, in the grammar of the surface's mode (SKILL.md's Registers section), and build it to the craft floor. SKILL.md's rules all still apply; this file is the process that produces the identity.

## Seed

If the project is brand-new (no committed tokens, fonts, or brand colors found in the code), run `node .pi/skills/impeccable/scripts/palette.mjs` for a brand seed color. The seed exists to break your reflex palette; it does not override the subject. When the subject's world clearly dictates color (an era, a place, a material, a medium), derive the palette from that world and use the seed only to check yourself. Otherwise anchor on it. Use OKLCH throughout. Skip this entirely when the code already has committed brand colors: identity-preservation wins.

## Ground it in the subject

Name one concrete subject, its audience, and the page's single job. The subject's own world (its materials, instruments, artifacts, places, history, vernacular) is where distinctive choices come from. What would this thing look like as a physical object? What did its world look like before the web? A design whose subject appears only in the copy is a template wearing a costume.

## Plan, self-check, build

Plan a compact token system in your reasoning: palette, type, layout concept in one sentence, and a **signature**: the one element this surface will be remembered by, drawn from the subject's world. A signature carries weight: sized and placed so the page organizes itself around it. The standard page skeleton is a default, not a given; derive structure from what the subject and the mode need. Then audit the plan: work through what you'd produce for a similar brief from another client, and wherever the two plans converge (same palette family, same face, same skeleton), that part is your generic default, not a choice. Revise it, then build, deriving every color and type decision from the revised plan.

**The first viewport is a thesis, not a header.** The visitor should meet the concept doing its job immediately: the work itself, the product working, the content answering, the task at hand. Generic chrome around a generic promise is the template answer; earn it or replace it. The memory test: if someone left after one viewport, what would they describe an hour later? If the honest answer is a mood ("clean", "tasteful"), the concept hasn't committed yet.

**Everything bold, nothing bland.** Bold is not decoration and not clutter; it is commitment to the concept, carried through every section. Commitment takes whatever form the concept and the mode demand: maximal or severely clean, drenched in color or nearly monochrome, copy so precise it stings, the product demonstrating itself, or a system so exact it feels inevitable (a decisive typographic voice, one owned accent, an unmistakable rhythm). A spare page built on one uncompromising idea is bold; a busy page of tasteful defaults is bland. The signature is where the concept peaks, not the only place it lives; cut anything that neither advances the concept nor serves the visitor's mode. Polish is the floor, not the point: when torn between refined and committed, commit.

**Prove, don't claim.** A surface earns belief by showing its subject doing its job: the interface at work, the mechanism dramatized, the content delivering, specifics a competitor couldn't copy-paste. The visitor should understand by looking, before reading a word. Sections that restate a claim in different words add length, not substance.

## Commit

Pick a color strategy before picking colors: Restrained (neutrals + one accent; the default when the visitor came to operate or read) / Committed (one saturated color carries 30-60% of the surface) / Full palette (3-4 named roles) / Drenched (the surface IS the color). Persuade and Experience surfaces have permission for the bolder strategies; take them when the brief allows. Dark vs. light is never a default: write one sentence of physical scene (who uses this, where, under what light, in what mood) and let it force the answer. The warm cream near-white body background is the saturated AI default; where the axis is free, pick a background that is a choice.

- Name a real reference before picking a strategy; unnamed ambition becomes beige.
- Palette IS voice: a calm brand and a restless brand should not share palette mechanics, and each new surface differentiates from the last.
- When a cultural-symbol palette is the obvious pull, reach past it. Let the cultural reading come from typography, imagery, and copy, not the palette.

## Type and imagery

Choose faces like objects from the subject's world, in the mode's register: Operate and Read surfaces are well served by system stacks and workhorse UI faces; Persuade and Experience surfaces want faces with a point of view, and these training-data defaults mean you stopped looking: Fraunces, Playfair Display, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter-as-display, DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans.

Briefs that imply imagery (food, travel, place, product, fashion) must ship real, verified imagery, searched for the subject's physical object rather than the category; a colored rectangle where a photo belongs reads as incomplete, and one decisive photo beats five mediocre ones. Verify stock URLs resolve before shipping them.

## Calibration

AI-generated interfaces cluster around a few looks regardless of subject: warm cream + high-contrast serif + terracotta accent; near-black + one neon accent (acid green, cyan) + glowing edges; broadsheet-editorial hairlines + italic display serif + small tracked mono labels. All are legitimate when the brief calls for them; the brief always wins. Where the brief leaves the aesthetic free, landing in one of them means your self-check failed. Same one tier deeper: if someone could guess your aesthetic from the category alone, or from category-plus-avoidance, rework until neither answer is obvious.

**Name the aesthetic lane, then test it.** Before committing to moves, say which lane this is (a specimen page, minimal-cool tech, acid maximalism...). Then the inverse test: describe what you're about to build the way a competitor would describe theirs; if that sentence fits the modal page in the category, restart. Currently saturated lanes count as reflexes, not choices, when the brief doesn't require them; the flooded one right now is editorial-typographic (display serif, often italic, small mono labels, ruled separators, monochromatic restraint, no imagery).

## Persuade and Experience moves

Layout: asymmetric compositions and intentional grid breaks are on the table; fluid spacing with `clamp()` that breathes on larger viewports; for image-led briefs, full-bleed hero imagery with overlaid navigation is a canonical move, letting the photograph be the design. Permissions the Operate world doesn't get: ambitious first-load motion (one orchestrated page-load beats scattered micro-interactions; skipping entrance motion entirely is also a voice), single-purpose viewports (one dominant idea per fold, deliberate pacing), and art direction per section when the narrative demands it; consistency of voice beats consistency of treatment.

Before finishing, verify against SKILL.md's craft floor and run the detector; a bold page that ships mechanical defects is not done.

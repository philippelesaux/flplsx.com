## Why

The about page should lead with brand and accomplishment: name and headshot establish identity, publication credits establish credibility, and everything else is supporting context. The current hierarchy buries the name and elevates "Photographer" as a typographic statement when the portfolio already makes that case — the page should say *who* and *where published* before it says *what*.

## What Changes

- Restore the subject's name onto the page in the content column, above credentials — large, Fraunces, as the typographic anchor for the right column on desktop and the text content block on mobile
- Replace the role hierarchy (Photographer dominant, others secondary) with two equal-weight quiet roles: Photographer and Software Engineer — same size, same secondary color, no accent
- Remove Musician from the roles list
- Reorder the content column: name → credentials → bio → roles (credentials elevated above bio)

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `about-page`: Four requirements change — name display, role hierarchy, mobile content order, and desktop content column order

## Impact

- `src/pages/about.astro` — markup and style changes only
- `openspec/specs/about-page/spec.md` — four requirements updated via delta spec

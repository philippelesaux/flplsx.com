## Why

The about page redundantly repeats the name already prominent in the nav, treats three distinct roles with equal visual weight when photography is the primary credential for the target audience (food/travel editors), and presents credentials in a way that doesn't communicate credibility at a glance. The page needs to inform editors quickly: who Philippe is, what he shoots, and where his work has appeared.

## What Changes

- Remove the `h1` name — the nav already carries it prominently
- Restructure roles: Photographer in accent color as the clear lead, Software Engineer and Musician in secondary color as supporting context
- Rewrite bio from third-person to first-person
- Add a "Featured in" credentials section (Time Out, Edible, Philly Mag) with styled text treatment — logo assets are deferred to a follow-on change
- Restructure layout: mobile-first vertical stack (headshot → roles → bio → credentials), two-column on wider screens (headshot left, content right)

## Capabilities

### New Capabilities

- `about-page`: Layout, content structure, and visual hierarchy of the about page — including role display, bio presentation, and credentials section

### Modified Capabilities

_None — no existing specs cover the about page._

## Impact

- `src/pages/about.astro` — significant restructure of markup and styles
- No changes to data, content collections, layouts, or other components

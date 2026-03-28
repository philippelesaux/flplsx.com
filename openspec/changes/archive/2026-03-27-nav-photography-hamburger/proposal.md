## Why

The nav currently has only one link ("about") and its scroll-aware background relies on hero visibility — meaning pages without a hero never get the translucent background, and on the index the gradient disappears before the nav picks up its own background. Both problems create visual inconsistency as the site grows.

## What Changes

- Add a "Photography" nav link (pointing to `/`) placed before "About"
- Add a hamburger menu on mobile (`<768px`) that toggles a dropdown with translucent white background; the hamburger icon is vertically centered with the nav name in both its large (hero) and normal (scrolled) size states
- Mobile menu animates in/out with a clip-path reveal (~150ms); slide-fade is the fallback option if clip-path feels too sharp
- Fix nav background trigger: switch from hero-visibility logic to `scrollY > 0`, so the translucent white background activates on any scroll, on every page

## Capabilities

### New Capabilities
- `mobile-nav-menu`: Hamburger toggle for mobile nav with collapsible dropdown panel and clip-path animation

### Modified Capabilities
- `scroll-aware-nav`: Scroll trigger changes from hero-bottom crossing viewport to `scrollY > 0`; applies universally across all pages, not just pages with a hero

## Impact

- `src/components/NavigationBar.astro` — new link, hamburger button, mobile dropdown
- `src/styles/global.css` — may need mobile menu styles (or scoped in component)
- `src/layouts/BaseLayout.astro` — scroll logic updated
- `openspec/specs/scroll-aware-nav/spec.md` — requirements update

## Why

The current dark (`bg-zinc-950`) design reads as an artsy fine-art portfolio, which doesn't match the target audience: editors at food and travel publications who expect a clean, editorial aesthetic. A white-background redesign — anchored by a distinctive serif nameplate and a single restrained teal accent — will position the site as professional and memorable without blending in with other photographers' portfolios.

## What Changes

- Body background inverted from near-black (`zinc-950`) to white
- Fraunces variable serif font added exclusively for the name "Philippe LeSaux" in the nav and about page, creating a distinctive editorial nameplate
- Teal accent consolidated to a single element: the about page H1 (`teal-600`), removed from all other elements
- Nav scrolled state updated: white background with dark text (was zinc-900 background with white text)
- Nav hover underlines changed from teal to zinc (neutral)
- Thumbnail images changed from rounded to sharp corners (more editorial)
- Thumbnail hover border lightened (`zinc-200`) to suit white background
- All secondary text colors updated for legibility on white (zinc-300/400 → zinc-600/700)
- Footer text lightened slightly for white background

## Capabilities

### New Capabilities

- `editorial-visual-identity`: Fraunces serif nameplate treatment and consolidated teal accent as the site's singular identity element

### Modified Capabilities

- `scroll-aware-nav`: Scrolled state behavior changes — white background and dark text instead of dark background and white text

## Impact

- `src/layouts/BaseLayout.astro`: body background color, global scrolled nav CSS
- `src/components/NavigationBar.astro`: name font family, hover underline color
- `src/components/Lightbox.tsx`: remove rounded corners, update hover border color
- `src/pages/about.astro`: H1 font family + color, all text color updates
- `src/components/Footer.astro`: text color update
- New dependency: `@fontsource-variable/fraunces`

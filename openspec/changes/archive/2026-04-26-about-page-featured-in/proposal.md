## Why

The publication credits are currently a plain text list buried in the bio column, giving them no visual prominence. Moving them into a dedicated Publications section — with photo, publication name, article title, and author — gives the press coverage the weight it deserves and makes the about page more compelling.

## What Changes

- Add a dedicated Publications section below the two-column bio area on the about page, with a "Publications" heading
- Each publication entry is a linked card showing: the published photo, the publication name, article title, and author credit
- Cards link directly to the article (external, new tab); clicking is the primary interaction
- Cards display a hover scale effect consistent with the portfolio grid
- The existing "Featured in" credentials list is removed from the bio column
- The "Recent Publications" section heading is rendered at a more prominent size than the small label-style used by Contact and other section markers; a new `--text-lg` type scale token is introduced to support this

## Capabilities

### New Capabilities
- `publications`: A Publications section on the about page displaying press coverage as linked photo cards, each showing the publication name, article title, and author

### Modified Capabilities
- `about-page`: The credentials/Featured-in section is removed from the two-column bio area
- `publications`: The section heading is visually more prominent than other label-style section markers on the page

## Impact

- `src/pages/about.astro`: Remove credentials section; add `Publications` component
- `src/components/Publications.astro`: New component (section + card grid)
- `src/data/press.json`: New data file for publication entries
- `src/data/press/`: New directory for published photo assets
- `src/content.config.ts`: New `press` Astro Content Collection
- `src/styles/tokens.css`: New `--text-lg` token at `1.125rem`
- `src/components/Publications.astro`: Section heading updated to use `--text-lg`

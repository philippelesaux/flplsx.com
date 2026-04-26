## 1. Data — press Collection

- [x] 1.1 Create `src/data/press/` directory and add the four published photo assets (one per publication entry)
- [x] 1.2 Create `src/data/press.json` with entries for Time Out, Edible Philly Magazine, Grid Magazine, and Philadelphia Magazine — each with `id`, `publication`, `articleTitle`, `author`, `url`, `image`, and `alt` fields
- [x] 1.3 Add the `press` collection to `src/content.config.ts` using `file('src/data/press.json')` and the `image()` schema helper, mirroring the `portfolio` collection pattern

## 2. Publications Component

- [x] 2.1 Create `src/components/Publications.astro` — query the `press` collection and render the section heading "Publications" and a two-column card grid
- [x] 2.2 Each card is a `<div>` containing two independent article links: one wrapping the `<Image>` and one wrapping the publication name and article title; both use `target="_blank" rel="noopener noreferrer"`
- [x] 2.3 Style the section: `max-width: 720px`, centred, consistent vertical padding with the rest of the about page
- [x] 2.4 Style the card grid: two columns with a gap using token variables; switch to single column below `600px` (`min-width: 600px` for two columns)
- [x] 2.5 Style the card: publication name in small-caps uppercase using `--color-text-muted` (matching the existing label style); article title in `--color-text`; author in `--color-text-secondary` at `--text-sm`
- [x] 2.6 Add hover scale: `transform: scale(1.03)` on the card `<a>`, with `transition` on `transform`; add `overflow: hidden` or `clip-path: inset(0)` to contain the scaled image within the card bounds

## 2b. Optional Author Link

- [x] 2b.1 Add optional `authorUrl` field to the `press` collection schema in `content.config.ts` using `z.string().optional()`
- [x] 2b.2 In `Publications.astro`, render the author credit as an `<a>` when `authorUrl` is present, otherwise as plain text; the author link opens in a new tab with `rel="noopener noreferrer"`
- [x] 2b.3 Add `authorUrl` to any `press.json` entries that have a known author profile URL

## 3. About Page — Wire Up and Clean Up

- [x] 3.1 Import and render `<Publications />` in `src/pages/about.astro`, placed below the `.about-wrapper` grid
- [x] 3.2 Remove the `.credentials` block (the "Featured in" `<h2>` and `<ul>`) from the `about-content` section in `about.astro`
- [x] 3.3 Remove the associated CSS rules (`.credentials-label`, `.pub-list`, `.pub-icon`) from the `<style>` block in `about.astro`
- [x] 3.4 Update the bio paragraph to remove the inline publication list ("my work has been featured in Time Out, Edible Philly Magazine…") since the Publications section now carries that information

## 5. Heading Style

- [x] 5.1 Add `--text-lg: 1.125rem` to the type scale in `src/styles/tokens.css`, between `--text-base` and `--text-xl`
- [x] 5.2 Update `.publications-label` in `src/components/Publications.astro` to use `var(--text-lg)` instead of `var(--text-sm)`
- [x] 5.3 Run `npm run build` and confirm no errors
- [x] 5.4 Visually confirm the "Recent Publications" heading reads larger than the "Contact" label on the about page

## 4. Verification

- [x] 4.1 Run `npm run dev`, open the about page, and confirm the Publications section renders below the bio with two columns on desktop and one column on mobile
- [x] 4.2 Verify each card displays the published photo, publication name, article title, and author
- [x] 4.3 Click each card and confirm the article opens in a new tab at the correct URL
- [x] 4.4 Verify the hover scale effect on each card
- [x] 4.5 Confirm the two-column breakpoint at 600px feels comfortable on a phone-sized viewport and at the transition point
- [x] 4.6 Confirm the old "Featured in" list is gone from the bio column on both mobile and desktop
- [x] 4.7 Run `npm run build` and confirm no TypeScript or image pipeline errors

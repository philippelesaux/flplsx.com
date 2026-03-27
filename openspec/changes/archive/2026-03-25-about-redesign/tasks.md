## 1. Markup restructure

- [x] 1.1 Remove the `h1` name element
- [x] 1.2 Replace the `h2` roles element with three individually-styled elements: one for Photographer, one for Software Engineer, one for Musician
- [x] 1.3 Rewrite bio paragraph to first person ("I'm a digital artist..." etc.)
- [x] 1.4 Add a "Featured in" credentials section: a label and a `<ul>` with one `<li>` per publication (Time Out, Edible, Philly Mag), each containing a `<span class="pub-icon">` slot and the publication name

## 2. Layout

- [x] 2.1 Wrap the full page content in a single grid container with `padding-top: var(--space-16)` to clear the fixed nav, horizontal padding `var(--space-8)`, and `max-width: 960px` centered with `margin: 0 auto`
- [x] 2.2 On mobile (default), set the grid to a single column with the headshot first in source order, followed by roles, bio, and credentials
- [x] 2.3 At 768px and wider, switch the grid to two columns — headshot left (~40%), content right (~60%) — with a column gap of `var(--space-8)`

## 3. Styles

- [x] 3.1 Style the Photographer element with `color: var(--color-accent)` and `font-family: 'Fraunces Variable', serif`
- [x] 3.2 Style the Software Engineer and Musician elements with `color: var(--color-text-secondary)`
- [x] 3.3 Style the headshot `<figure>`: `width: 100%` with no fixed height so it scales naturally within its grid column
- [x] 3.4 Style the "Featured in" label (e.g. small caps or `text-transform: uppercase`, `font-size: var(--text-sm)`, `color: var(--color-text-muted)`)
- [x] 3.5 Style the credentials `<ul>`: no list style, no padding; each `<li>` as a flex row with `align-items: center` and a gap for when the icon slot is populated
- [x] 3.6 Style the `pub-icon` span as an empty inline block (zero width/height) so it is visually inert until an asset is added

## 4. Verify

- [x] 4.1 Run `npm run build` — confirm no errors
- [x] 4.2 Run `npm run preview` — confirm on mobile: headshot leads, roles visible, credentials present, no name heading, content clears nav
- [x] 4.3 Confirm on desktop (768px+): two-column layout renders, headshot left, content right, no horizontal overflow

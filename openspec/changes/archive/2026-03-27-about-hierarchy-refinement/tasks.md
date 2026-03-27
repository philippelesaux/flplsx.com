## 1. Markup

- [x] 1.1 Add `<h1>Philippe LeSaux</h1>` as the first element inside `.about-content`
- [x] 1.2 Change `<p class="credentials-label">Featured in</p>` to `<h2 class="credentials-label">Featured in</h2>`
- [x] 1.3 Reorder `.about-content` children: `<h1>` → roles `<p>` → credentials `<div>` → bio `<p>`
- [x] 1.4 Replace the `<div class="roles">` and its three `<p>` children with a single `<p class="roles">Photographer · Software Engineer</p>`
- [x] 1.5 Move the roles `<p>` below the bio `<p>` in source order — superseded by 1.3

## 2. Styles

- [x] 2.1 Add `.name` styles: `font-family: 'Fraunces Variable', serif`, appropriately large size (e.g. `var(--text-5xl)`), `font-weight: 400`, `letter-spacing: var(--tracking-wider)`, `margin: 0`
- [x] 2.2 Remove `.role-primary` and `.role-secondary` rule blocks
- [x] 2.3 Update `.roles` style: `font-size: var(--text-sm)`, `color: var(--color-text-secondary)`, `letter-spacing: var(--tracking-wide)`, `margin: 0`
- [x] 2.4 Reduce `h1` font size on mobile so "Philippe LeSaux" fits on one line at 375px (iPhone SE) — use a smaller size as the default and `var(--text-5xl)` at the 768px breakpoint

## 3. Verify

- [x] 3.1 Run `npm run build` — confirm no TypeScript errors and build succeeds
- [x] 3.2 Run `npm run preview` — confirm on mobile: headshot first, then name + roles, credentials, bio
- [x] 3.3 Confirm on desktop: name leads content column, credentials above bio, roles quiet at bottom

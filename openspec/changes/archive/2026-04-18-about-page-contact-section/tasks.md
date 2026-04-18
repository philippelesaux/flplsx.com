## 1. Contact Script — Tests

- [x] 1.1 Create `src/scripts/contact.test.ts` with `describe` blocks mapped to spec requirements and `it` blocks mapped to scenarios, using WHEN/THEN comments
- [x] 1.2 Run `npm test` and confirm all new tests fail (red)

## 2. Contact Script — Implementation

- [x] 2.1 Create `src/scripts/contact.ts` exporting `initContact(root: HTMLElement): () => void` using the AbortController factory pattern
- [x] 2.2 Implement copy-to-clipboard: on button click, call `navigator.clipboard.writeText('photography@flplsx.com')` and set `data-copied` on the button
- [x] 2.3 Reset `data-copied` after 1500 ms
- [x] 2.4 Run `npm test` and confirm all tests pass (green)

## 3. About Page Markup

- [x] 3.1 Add contact section below the bio in `src/pages/about.astro`, with a small-caps label matching the "Featured in" pattern
- [x] 3.2 Add Instagram row: inline SVG icon (in `--color-text-secondary`) + `@flplsx` text linking to the Instagram profile, opening in a new tab
- [x] 3.3 Add email row: inline SVG icon (in `--color-text-secondary`) + plain-text `photography@flplsx.com` + copy button with clipboard SVG icon
- [x] 3.4 Wire the `<script>` block to import and call `initContact` with the contact section root element

## 4. Copy Button Styles

- [x] 4.1 Style the copy button default state in the `<style>` block (no border, transparent background, cursor pointer, icon sized to match text)
- [x] 4.2 Style `[data-copied]` state (swap to checkmark or "copied" visual)
- [x] 4.3 Add CSS transition only on the removal of `data-copied` (transition out to default, not in) so the confirmation snaps on instantly and fades back

## 5. Verification

- [x] 5.1 Run `npm run dev`, open the about page, and verify the contact section renders correctly on mobile and desktop viewports
- [x] 5.2 Click the copy button, confirm `photography@flplsx.com` is on the clipboard, the confirmation appears instantly, and resets after ~1.5 s
- [x] 5.3 Click the Instagram link and confirm it opens the correct profile in a new tab
- [x] 5.4 Run `npm run build` and confirm no TypeScript errors

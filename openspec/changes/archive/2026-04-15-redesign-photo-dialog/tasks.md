## 1. HTML Structure

- [x] 1.1 Remove `data-prev` and `data-next` buttons from the dialog in `PhotoGallery.astro`
- [x] 1.2 Move the close button (`data-close`) out of `dialog-bar` to a standalone element directly inside the dialog
- [x] 1.3 Rename `dialog-bar` to `dialog-strip` and remove the `dialog-controls` wrapper; retain only `dialog-meta` (title + location)

## 2. Dialog Background and Backdrop

- [x] 2.1 Set dialog `background` to `transparent` (replaces solid `#000`)
- [x] 2.2 Introduce `--photo-transition-duration` CSS custom property on the dialog to share timing between the View Transition and backdrop transition
- [x] 2.3 Add `::backdrop` styles: `backdrop-filter: blur()`, dark semi-transparent tint, and `transition` using `--photo-transition-duration`
- [x] 2.4 Add `@starting-style` block for `dialog[open]::backdrop` so blur and tint start from zero on open (and reverse on close)

## 3. Close Button and Metadata Strip

- [x] 3.1 Style the close button as `position: absolute`, top-right, with a minimum 44px tap target and no border or background chrome
- [x] 3.2 Restyle `dialog-strip` as a typographic block: adequate padding, title at normal weight, location at reduced opacity — no button chrome

## 4. Script Cleanup (TDD)

- [x] 4.1 In `gallery.test.ts`, remove test cases covering `navigate()`, prev/next button clicks, and `ArrowLeft`/`ArrowRight` key handling
- [x] 4.2 Run `npm test` and confirm no regressions in the remaining tests
- [x] 4.3 In `gallery.ts`, remove `navigate()`, the `[data-prev]` and `[data-next]` event listeners, and the `ArrowLeft`/`ArrowRight` keydown handler
- [x] 4.4 Remove the `querySelector` calls for `[data-prev]` and `[data-next]`; verify `[data-close]` reference still resolves to the repositioned button
- [x] 4.5 Run `npm test` and confirm all tests pass

## 5. Navigation (TDD)

- [x] 5.1 In `gallery.test.ts`, add describe block for keyboard navigation: ArrowRight advances, ArrowLeft goes back, both wrap at boundaries — run `npm test` and confirm new tests fail
- [x] 5.2 In `gallery.test.ts`, add describe block for swipe navigation: swipe left advances, swipe right goes back, vertical swipe ignored — stub `TouchEvent` as needed — run `npm test` and confirm new tests fail
- [x] 5.3 In `gallery.test.ts`, add scenario for screen reader announcement: navigating updates `.dialog-meta` content (aria-live verified via DOM assertion)
- [x] 5.4 Restore `navigate()` in `gallery.ts`; add `ArrowLeft`/`ArrowRight` keydown handler; add `touchstart`/`touchend` swipe handler with direction guard; wire `[data-prev]` and `[data-next]` event listeners
- [x] 5.5 Add visually hidden `[data-prev]` and `[data-next]` buttons to the dialog in `PhotoGallery.astro`; add `aria-live="polite"` to `.dialog-meta`; add `.sr-only` CSS utility
- [x] 5.6 Run `npm test` and confirm all tests pass

## Context

The dialog already uses View Transitions for the open/close morph (`startViewTransition` with a shared `view-transition-name` between thumbnail and dialog image). The visual problem is the layout: a bottom bar mixing metadata and navigation controls reads as a dated media player, not a photography viewer. The change strips navigation, separates the close affordance from the metadata, and adds a blurred background that fills the letterbox areas produced by `object-fit: contain`.

## Goals / Non-Goals

**Goals:**
- Replace the bottom bar with a pure metadata strip (title + location)
- Float the close button independently, top-right
- Replace the solid black dialog background with a blurred view of the page content behind the dialog
- Transition the blurred background in/out in sync with the existing View Transition animation
- Remove prev/next navigation entirely (buttons and keyboard)

**Non-Goals:**
- Changing the View Transition morph mechanic — it already works correctly
- Modifying the thumbnail grid or entrance animations
- Adding article link UI — the metadata strip is structured to accommodate this later, but the link itself is out of scope

## Decisions

### 1. Blurred background via `backdrop-filter` on `::backdrop`

The dialog's `::backdrop` pseudo-element sits between the page and the dialog in the browser's modal stacking order. Applying `backdrop-filter: blur()` to `::backdrop` blurs the page content (the gallery) directly behind it. The dialog's own background is set to transparent so the blurred backdrop shows through — including through the letterbox areas around the contained image.

A dark tint is applied to `::backdrop` alongside the blur so the gallery content is sufficiently dimmed and the image reads clearly against it.

This requires no extra DOM elements and no JS changes — it is entirely CSS.

**Stacking order (bottom to top):**
1. Page content (gallery grid)
2. `::backdrop` — `backdrop-filter: blur()` + dark tint; filters the page
3. Dialog — transparent background; children float above the blurred backdrop

**Alternatives considered:**
- `backdrop-filter` on the dialog element itself: the dialog element's `backdrop-filter` would filter the `::backdrop`, not the page — the wrong layer. Rejected.
- A `::before` pseudo-element with `background-image` set via a CSS custom property from JS: blurs a copy of the displayed image rather than the page. Rejected — the intent is to blur the actual page content.
- A duplicate `<img>` element: same conceptual issue as `::before`; also adds DOM. Rejected.

### 2. CSS custom property for transition duration sync

A single custom property (`--photo-transition-duration`) is set on `:root` and consumed by both the View Transition animation duration (`::view-transition-group`) and the `::backdrop` transition. It must live on `:root` rather than the dialog because `::backdrop` does not inherit CSS properties from its originating element. This guarantees the two animations stay in sync without any JS coordination.

**Alternative considered:** Setting both durations independently in CSS. Rejected — they would inevitably drift when one is adjusted.

### 3. `@starting-style` for the entry transition

CSS transitions on `dialog[open]` are unreliable without `@starting-style` because `display` changes at the same time `[open]` is added, causing browsers to skip the transition's initial state. `@starting-style` defines where the opacity transition starts from, solving this without JS class toggling.

The exit transition (opacity back to 0) is handled naturally: when `dialog.close()` fires inside `startViewTransition`, `[open]` is removed and the CSS transition plays in reverse, in sync with the closing morph.

**Alternative considered:** Toggling an `.is-open` class in JS. Works, but adds JS logic for something CSS can handle natively.

### 4. Keep `<dialog>` element

The `<dialog>` element provides focus trapping, `Escape` key handling via the `cancel` event, and `showModal()` / `close()` semantics — all used by the existing `gallery.ts` implementation. Replacing it with a `<div>` overlay would require reimplementing all of this manually for no user-visible benefit.

### 5. Floating close button via absolute positioning

The close button is `position: absolute` within the dialog (which is `position: relative` or simply the containing block at 100vw/100dvh). It sits top-right, above both the bg image and the display image in stacking order.

### 6. Swipe detection via touchstart/touchend with direction guard

Swipe navigation registers `touchstart` and `touchend` on the dialog element (covering the full viewport). On `touchend`, the handler computes `dx` (horizontal delta) and `dy` (vertical delta). Navigation fires only when `|dx| ≥ 50px` and `|dx| > |dy|` — the second condition prevents a diagonal drag from being treated as a horizontal swipe. Both listeners use `{ passive: true }` so the browser is not blocked from touch scrolling.

Registering on the dialog rather than only the image means swipes work regardless of where the finger lands (image area, strip, or elsewhere) — consistent with native mobile photo viewers.

**Alternative considered:** Registering only on `dialogImg`. Rejected — users naturally swipe anywhere in the viewer, not just over the image.

### 7. Visually hidden prev/next buttons for screen reader navigation

Prev/next buttons are present in the DOM with a `.sr-only` class (1px × 1px, clipped, off-screen) and carry `data-prev` / `data-next` attributes. They are reachable via Tab and activatable via Enter/Space by screen reader users, but invisible to sighted users.

This approach is preferred over `aria-keyshortcuts` because `aria-keyshortcuts` support is inconsistent across screen reader/browser combinations and provides no interactive affordance — it only hints that a shortcut exists.

### 8. `aria-live="polite"` on the metadata strip for navigation announcements

Adding `aria-live="polite"` to `.dialog-meta` means the screen reader automatically announces updated content whenever `populate()` sets new title/location text. No extra JS is needed — the DOM mutation triggers the announcement. `polite` is preferred over `assertive` to avoid interrupting in-progress announcements.

## Risks / Trade-offs

- **`@starting-style` browser support**: Supported in all modern browsers (Chrome 117+, Firefox 129+, Safari 17.5+). No IE concern for a personal portfolio site.
- **`backdrop-filter` on `::backdrop`**: Supported in all modern browsers. The blur is applied to the live page content, so a complex or image-heavy gallery may produce a brief visual artifact during the morph — unlikely to be noticeable in practice.
- **Contrast on edge cases**: Very light or very saturated gallery content may produce a blurred backdrop that competes with the display image. The dark tint on `::backdrop` (`background: rgb(0 0 0 / 0.6)`) is the primary mitigation; fine-tuning the value is a cosmetic judgment during implementation.

## Open Questions

- None — decisions above are sufficient to proceed to implementation.

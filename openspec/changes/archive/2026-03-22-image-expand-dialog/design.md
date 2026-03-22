## Context

The portfolio grid is currently a React island (`Lightbox.tsx`) that renders thumbnails with entrance animations via IntersectionObserver. It has no image expansion capability. The React island is unnecessary overhead; everything needed can be done in vanilla JS inside an Astro component. This change delivers the expansion feature and renames the component to `PhotoGallery.astro` to better reflect its purpose.

## Goals / Non-Goals

**Goals:**
- Replace React island with an Astro component + vanilla JS
- Add full-size image expansion via native `<dialog>`
- Morph animation from thumbnail to dialog using View Transitions API (progressive enhancement)
- Display title and location metadata in the dialog
- Prev/next navigation by button and keyboard
- Full mobile support

**Non-Goals:**
- Swipe gesture navigation (can be added later)
- Image zoom/pan within the dialog
- Download or share functionality
- URL routing per image (no `#photo-id` in the address bar)

## Decisions

### Astro component + vanilla JS over React
**Decision**: Migrate `Lightbox.tsx` to `PhotoGallery.astro`. All interactivity (IntersectionObserver, dialog open/close, navigation, View Transitions) implemented in a `<script>` block.

**Rationale**: No state management complexity exists — `currentIndex` is a module-level variable, DOM manipulation is straightforward. Eliminating the React island removes hydration overhead and aligns with the site's vanilla CSS philosophy. The `client:load` directive in `index.astro` is removed.

### Native `<dialog>` element
**Decision**: Use a single `<dialog>` element rendered once in the PhotoGallery template, reused for all images.

**Rationale**: `<dialog>` provides focus trapping, Escape key handling, `::backdrop`, and ARIA semantics for free. `showModal()` / `close()` is the minimal API needed. One dialog reused is simpler than one per image.

**Alternative considered**: Custom modal div with ARIA — rejected because it requires manual focus management and keyboard handling.

### View Transitions: dynamic `view-transition-name` assignment
**Decision**: `view-transition-name` is NOT set statically in markup. The name is assigned to exactly one element per snapshot — the button in the "before" snapshot, the dialog image in the "after" snapshot (and reversed on close). After the transition completes, names are cleared.

**Rationale**: `view-transition-name` must be unique per rendered frame. Static names on all thumbnails would conflict. More critically, setting the name on both button and dialogImg *before* the transition fails: the closed dialog is `display: none` so dialogImg cannot be captured in the "before" snapshot, and both would have the name in the "after" snapshot (invalid). The correct pattern assigns the name to exactly one visible element in each snapshot.

**Implementation pattern**:
```
open(index):
  set name on buttons[index]             ← "before": thumbnail captured
  startViewTransition(() => {
    remove name from buttons[index]      ← not in "after"
    populate dialog with images[index]
    dialog.showModal()
    set name on dialogImg                ← "after": full-size captured
  }).finished.then(() => remove name from dialogImg)

close():
  set name on dialogImg                  ← "before": full-size captured
  startViewTransition(() => {
    remove name from dialogImg           ← not in "after"
    set name on buttons[currentIndex]    ← "after": thumbnail captured
    dialog.close()
  }).finished.then(() => remove name from buttons[currentIndex])
```

### Display-size image: 1400px webp generated at build time
**Decision**: `index.astro` generates a 1400px webp per portfolio image (same as hero images) and passes it alongside the thumbnail to `PhotoGallery`.

**Rationale**: Consistent with the existing hero image pipeline. Avoids loading original full-res files in the browser. 1400px is sufficient for fullscreen viewing on most displays.

**Props shape**:
```ts
type PhotoGalleryImage = {
  thumbnail: { src: string }
  display: { src: string }
  title: string
  location: string
  alt: string
}
```

### Dialog layout: full-screen on all viewports
**Decision**: Dialog fills the full viewport on both mobile and desktop. On desktop, the image is centered with `object-fit: contain`, and metadata + controls appear as a bar below the image. On mobile, same structure — image fills width, metadata + controls below.

**Rationale**: A consistent full-screen pattern is simpler than a panel-on-desktop / sheet-on-mobile approach. Image stays primary on all screen sizes. Metadata below (not overlaid) keeps it readable without obscuring the image.

```
All viewports:
┌─────────────────────────────┐
│                             │
│         [image]             │
│    (object-fit: contain)    │
│                             │
├─────────────────────────────┤
│ Title · Location   ← [✕] → │
└─────────────────────────────┘
```

### Thumbnail hover effect: scale instead of border
**Decision**: Hovering a thumbnail scales it to 103% (`transform: scale(1.03)`) rather than applying a border and box-shadow. `clip-path: inset(0)` is set on the image to prevent the scaled element from bleeding into adjacent columns.

**Rationale**: Scale feels more interactive and image-forward than a decorative border. `clip-path: inset(0)` creates a clipping region at the element's natural bounds — the only viable containment approach for a direct `<img>` without a wrapper element.

**Transition timing**: The entrance animation uses `transform` (translateY) and `opacity`. Both share the same `transition` declaration, so the transform duration governs hover speed too. Transform is set to 200ms (fast, appropriate for hover) while opacity stays at 500ms (slower, appropriate for the fade-in reveal).

**Stagger delay cleanup**: Entrance animations use an inline `transition-delay` for the cascade effect. This delay persists on the element after the entrance completes and would cause a noticeable lag on hover. Fix: after adding `.visible` in the IntersectionObserver callback, `requestAnimationFrame` is used to remove the inline `transition-delay`. The entrance transition has already started by then, so it is unaffected.

### Progressive enhancement for View Transitions
**Decision**: Check `document.startViewTransition` before use. Unsupported browsers call `dialog.showModal()` / `dialog.close()` directly.

**Rationale**: Firefox doesn't support same-document View Transitions yet. The dialog is fully functional without the morph — the animation is an enhancement, not a requirement.

## Risks / Trade-offs

- **`view-transition-name` cleanup on interrupted transitions** → If a user opens a new image before the previous transition completes, names may conflict. Mitigation: clear names immediately before assigning new ones, and cancel any in-flight transition reference.
- **Dialog `display:none` and View Transitions** → The dialog must not be styled with `display: flex` unconditionally — this overrides the browser's default `display: none` on closed dialogs, making the dialog permanently visible. Fix: apply flex layout only via `dialog[open] { display: flex }`. Closing morph is safe because `dialog.close()` runs inside the callback, so the "before" snapshot captures the open dialog.
- **CSS `contain` on dialog** → Some `overflow` or `contain` CSS rules can prevent `::backdrop` from rendering. Mitigation: keep dialog styles minimal and avoid containment on the dialog element itself.

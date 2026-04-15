## Context

The photo dialog uses `document.startViewTransition` to morph a thumbnail into the full-size dialog image on open. The transition callback is synchronous: `populate(index)` sets `dialogImg.src` inside the callback, which starts a network request but does not wait for it. The browser captures the new-state snapshot immediately after the callback returns, before the image has loaded. Because browsers keep rendering the previous `src` until the new one is ready, the new-state pseudo-element captures the old image — producing a flash of stale content once the transition pseudo-elements are removed and the live element is revealed.

## Goals / Non-Goals

**Goals:**
- The dialog image element displays the selected image as soon as the View Transition animation completes, with no stale-image flash.
- Rapid successive clicks on thumbnails are handled safely (no double-open race).

**Non-Goals:**
- Changing the visual design of the dialog or the morph animation.
- Preloading images eagerly on page load or on hover.
- Improving open latency — the fix may add a small delay while the image loads; that is acceptable.

## Decisions

### Preload before starting the View Transition

Move `populate(index)` (setting `dialogImg.src`) to before `startViewTransition` is called, then wait for the image to be ready (`dialogImg.complete`, or `onload`/`onerror`) before starting the transition.

**Why not keep `populate` inside the callback?**
The callback is synchronous. There is no mechanism to defer the new-state snapshot until the image loads — it happens immediately after the callback returns.

**Why not use a separate `Image()` object for preloading?**
Setting `dialogImg.src` directly is simpler and achieves the same result: the browser fetches the image and caches it. When the same URL is set again inside the callback (populate is no longer needed there), the browser serves it from cache instantly. Alternatively, we can skip the second set entirely since `dialogImg.src` is already correct — the callback only needs `showModal()` and the VT name swaps.

**Why not clear `dialogImg.src` before the transition?**
Clearing to `''` would flash a blank frame instead of a stale image — still a glitch. Preloading avoids both.

### Lock `transitioning` before the preload wait

Currently `transitioning = true` is set only inside the `startViewTransition` block. Moving it to the top of `openDialog` (before the async preload wait) prevents a second click from racing through the guard while the first is awaiting image load.

### `onerror` resolves the wait

If the image fails to load, the wait resolves immediately via `onerror`. The dialog opens with a broken image rather than hanging — the same behaviour as today.

## Risks / Trade-offs

- **Added latency on slow connections** → The animation is delayed until the image loads. For a portfolio site with display images sized at 1400px webp this is acceptable; the alternative (showing stale content) is worse.
- **`dialogImg.complete` check** → Must check `.complete` before attaching `onload`; if the image is already cached, `onload` will never fire. → Resolve the promise synchronously when `.complete` is true.
- **`onload`/`onerror` assigned as properties** → Using `.onload = resolve` overwrites any previously attached handler. Since `dialogImg` has no persistent `onload` handler (only transient ones per open), this is safe.

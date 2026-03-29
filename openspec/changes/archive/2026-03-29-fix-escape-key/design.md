## Context

The native `<dialog>` element fires a `cancel` event before closing on Escape. This event is designed to be preventable — it is the browser's official extension point for custom close logic. The current implementation does not listen for `cancel`, so Escape closes the dialog natively without passing through `closeDialog()`.

## Goals / Non-Goals

**Goals:**
- Escape key triggers the View Transitions morph close animation, matching the close button and backdrop click paths
- Native accessibility behaviour is fully preserved
- No regressions for browsers without View Transitions support

**Non-Goals:**
- Changing the close animation itself
- Altering focus management (native behaviour is correct as-is)

## Decisions

### Decision: Intercept `cancel` event, not `keydown`

Listen for the `cancel` event on the dialog rather than listening for `keydown` and checking `e.key === 'Escape'`. The `cancel` event is the browser's designed hook for this exact use case. Using `keydown` would duplicate browser logic and risk interfering with other Escape handlers.

```
User presses Escape
  → dialog fires "cancel"
  → e.preventDefault() stops native close
  → closeDialog() runs our animated close path
  → dialog.close() called synchronously inside VT callback
```

### Decision: Focus return timing is correct as-is

`dialog.close()` is called synchronously inside the `startViewTransition` callback. This means focus returns to the originating thumbnail element *immediately*, before the animation completes. This is the correct accessible behaviour — keyboard and screen reader users should not have to wait for a visual animation to regain focus.

### Decision: Add a `transitioning` guard covering both open and close

A boolean `transitioning` flag prevents both `openDialog()` and `closeDialog()` from being called while a View Transition is already in progress. When `transitioning` is true, either function returns early. The flag is set to `true` at the start of any VT and cleared in `.finished`.

This applies symmetrically: a thumbnail click while a close is animating is a no-op, and a close attempt while an open is animating is also a no-op.

### Decision: Fallback path unchanged

When `startViewTransition` is not available, `closeDialog()` already calls `dialog.close()` directly. The `cancel` interception still routes through `closeDialog()`, so the fallback path is exercised identically to how it was before — no behaviour change for non-VT browsers.

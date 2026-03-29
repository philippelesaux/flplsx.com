## 1. Add transitioning guard

- [x] 1.1 Add a `let transitioning = false` flag in `initGallery` scope
- [x] 1.2 Set `transitioning = true` at the start of `openDialog` and `closeDialog` when using View Transitions, clear it in `.finished`
- [x] 1.3 Return early from `closeDialog` if `transitioning` is true

## 2. Intercept Escape key via cancel event

- [x] 2.1 Add a `cancel` event listener on the dialog that calls `e.preventDefault()` and routes to `closeDialog()`
- [x] 2.2 Verify the listener uses `{ signal }` for AbortController teardown

## 3. Update specs

- [x] 3.1 Add the Escape key scenario to `openspec/specs/image-expand-dialog/spec.md` (sync delta spec)
- [x] 3.2 Add the `cancel` event and transitioning guard requirements to `openspec/specs/gallery-script/spec.md` (sync delta spec)

## 4. Verify

- [x] 4.1 Run `openspec validate --specs` and confirm all 14 specs pass
- [x] 4.2 Manually test: open dialog, press Escape — morph animation should fire
- [x] 4.3 Manually test: open dialog, press Escape rapidly — no broken state

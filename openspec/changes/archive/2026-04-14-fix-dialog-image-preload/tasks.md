## 1. Add failing test

- [x] 1.1 In `src/scripts/gallery.test.ts`, add a new `describe` block for `Requirement: Dialog displays the selected image immediately on open` containing an `it` for `Scenario: Second open shows new image immediately`. The test should: open the dialog with image A (triggering `dialogImg` load via `dialogImg.dispatchEvent(new Event('load'))`), close it, open it with image B (triggering load again), then assert `dialogImg.src` contains image B's URL and `dialog.showModal` was called a second time. Use the existing `syncVTMock()` helper.
- [x] 1.2 Run `npm test` and confirm the new test fails (the current implementation does not preload before the VT, so this scenario may pass vacuously or reveal the wrong ordering — if it passes unexpectedly, fix the test assertion before proceeding).

## 2. Update implementation

- [x] 2.1 In `src/scripts/gallery.ts`, move `transitioning = true` to the very top of `openDialog`, before any await, to prevent re-entry during the async preload wait.
- [x] 2.2 Move `populate(index)` to before `startViewTransition` is called (outside the VT callback). After calling `populate`, wait for the image to be ready: if `dialogImg.complete` is already `true`, proceed immediately; otherwise await a `Promise` that resolves on `dialogImg.onload` or `dialogImg.onerror`.
- [x] 2.3 Remove the `populate(index)` call from inside the `startViewTransition` callback — the `src`, `alt`, title, and location are already set. The callback should only call `dialog.showModal()` and manage `view-transition-name` values.
- [x] 2.4 Run `npm test` and confirm all tests pass.

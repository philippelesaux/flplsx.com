## 1. Setup infrastructure

- [x] 1.1 Add `setupFiles: ['src/scripts/test-setup.ts']` to `vitest.config.ts`
- [x] 1.2 Create `src/scripts/test-setup.ts` with `IntersectionObserver` global stub (no-op class via `vi.stubGlobal`) and `beforeEach` that resets `window.scrollY` to `0` via `Object.defineProperty`
- [x] 1.3 Each test file SHALL open with a `// Spec: openspec/specs/<capability>/spec.md` comment; `describe` blocks SHALL match requirement names verbatim; `it` blocks SHALL match scenario names verbatim

## 2. hero.test.ts

<!-- Spec: openspec/specs/hero-script/spec.md -->

- [x] 2.1 Scenario: first image gets `active` class on `initHero(root)` call; no other images are `active`
- [x] 2.2 Scenario: after `vi.advanceTimersByTime(5000)`, first image loses `active` and second image gains it
- [x] 2.3 Scenario: wraps from last image back to first after one more interval
- [x] 2.4 Scenario: calling the teardown function stops the interval (advance timer again; active image does not change)

## 3. scroll-nav.test.ts

<!-- Spec: openspec/specs/scroll-aware-nav/spec.md + openspec/specs/navigation-script/spec.md -->

- [x] 3.1 Scenario: on init with `scrollY === 0` and a hero element, nav has `hero-visible` and not `scrolled`
- [x] 3.2 Scenario: on init with `scrollY === 0` and `heroEl === null`, nav has neither class
- [x] 3.3 Scenario: after stubbing `scrollY` to `100` and dispatching a `scroll` event, nav gains `scrolled` and loses `hero-visible`
- [x] 3.4 Scenario: after stubbing `scrollY` back to `0` and dispatching `scroll`, nav regains `hero-visible` (with hero present)

## 4. navigation.test.ts

<!-- Spec: openspec/specs/navigation-script/spec.md -->

- [x] 4.1 Scenario: clicking hamburger when menu is closed — menu gains `open`, hamburger `aria-expanded` is `"true"`, `aria-label` is `"Close menu"`
- [x] 4.2 Scenario: clicking hamburger again when menu is open — menu loses `open`, hamburger `aria-expanded` is `"false"`, `aria-label` is `"Open menu"`
- [x] 4.3 Scenario: clicking a nav link inside the menu — menu loses `open`
- [x] 4.4 Scenario: on init, `menuEl.style.top` is set to `"0px"` (positionMenu called at startup)

## 5. gallery.test.ts

<!-- Spec: openspec/specs/gallery-script/spec.md -->

- [x] 5.1 Scenario: clicking a thumbnail — dialog `showModal` is called, dialog image `src` matches button `data-display`, title and location text match data attributes
- [x] 5.2 Scenario: clicking next button — dialog displays the next image (index advances by 1)
- [x] 5.3 Scenario: clicking prev button — dialog displays the previous image (index decreases by 1)
- [x] 5.4 Scenario: navigation wraps — next on last image shows first; prev on first image shows last
- [x] 5.5 Scenario: ArrowRight key — dialog advances to next image
- [x] 5.6 Scenario: ArrowLeft key — dialog moves to previous image
- [x] 5.7 Scenario: clicking close button — `dialog.close()` is called
- [x] 5.8 Scenario: clicking dialog backdrop (target === dialog element) — `dialog.close()` is called
- [x] 5.9 Scenario: dispatching `cancel` event — `preventDefault` is called and `dialog.close()` is called (via `closeDialog`)
- [x] 5.10 Scenario: `transitioning` guard — with deferred VT mock, a second close attempt during an in-flight transition is a no-op; `dialog.close()` is called exactly once after the transition resolves
- [x] 5.11 Scenario: no View Transitions (`startViewTransition` undefined) — `showModal` and `close` are called synchronously on open/close
- [x] 5.12 Scenario: thumbnail image gains `visible` class when IntersectionObserver callback fires with `isIntersecting: true`
- [x] 5.13 Scenario: IntersectionObserver stops observing the image after it becomes visible (`unobserve` called)

## 6. Verify

- [x] 6.1 Run `npm run test` — all 29 tests pass, exit code 0

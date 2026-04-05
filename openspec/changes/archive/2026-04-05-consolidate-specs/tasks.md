## 1. Delete spec directories

- [x] 1.1 Delete `openspec/specs/claude-md-conventions/`
- [x] 1.2 Delete `openspec/specs/vitest-infrastructure/`
- [x] 1.3 Delete `openspec/specs/design-token-system/`
- [x] 1.4 Delete `openspec/specs/portfolio-thumbnail-optimization/`
- [x] 1.5 Delete `openspec/specs/hero-script/`
- [x] 1.6 Delete `openspec/specs/gallery-script/`
- [x] 1.7 Delete `openspec/specs/navigation-script/`

## 2. Update CLAUDE.md

- [x] 2.1 Under the Styling section, add an explicit rule: no component may hardcode a color, spacing, or typography value that is represented in `tokens.css` — always reference a token variable

## 3. Verify

- [x] 3.1 Run `npm run build` and confirm it completes without errors
- [x] 3.2 Run `npm test` and confirm all tests pass

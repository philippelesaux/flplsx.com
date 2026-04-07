## 1. Remove stagger delay from template

- [x] 1.1 In `src/components/PhotoGallery.astro`, remove the `style` attribute that sets `transition-delay: ${index * 75}ms` on the thumbnail image element

## 2. Update tests

- [x] 2.1 In `src/scripts/gallery.test.ts`, remove the `Scenario: Stagger delay is applied by position` describe/it block (no longer in spec)
- [x] 2.2 Run `npm test` and confirm all tests pass

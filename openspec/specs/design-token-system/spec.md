## Requirements

### Requirement: Design tokens are defined as CSS custom properties
The site SHALL define all design values (colors, spacing, typography scale, letter-spacing) as CSS custom properties in a single `src/styles/tokens.css` file, scoped to `:root`. No component SHALL hardcode a color, spacing, or font-size value that is represented in the token file.

#### Scenario: Token file is the single source of truth for colors
- **WHEN** a color value is used anywhere on the site
- **THEN** it SHALL reference a `--color-*` custom property, not a hardcoded hex or rgb value

#### Scenario: Token file is the single source of truth for spacing
- **WHEN** a margin, padding, or gap value is used anywhere on the site
- **THEN** it SHALL reference a `--space-*` custom property

#### Scenario: Changing a token updates all usages
- **WHEN** a `--color-*` or `--space-*` value is changed in `tokens.css`
- **THEN** every element using that token SHALL reflect the updated value without any other file changes

### Requirement: All styles are expressed in CSS, not utility class strings in JS
JavaScript code SHALL NOT contain strings representing CSS utility class names for styling purposes. Dynamic visual states SHALL be expressed by toggling a single semantic class name (e.g. `.visible`, `.active`), with the actual CSS rules defined in a stylesheet.

#### Scenario: Lightbox entrance animation uses a semantic class
- **WHEN** a thumbnail enters the viewport
- **THEN** the JS SHALL add a single `.visible` class and the transition SHALL be defined entirely in CSS

#### Scenario: Hero crossfade uses a semantic class
- **WHEN** the active hero image changes
- **THEN** the React state SHALL set an `.active` class on the current image, with opacity defined in CSS

#### Scenario: Stagger delays use inline style for computed values
- **WHEN** the Lightbox renders thumbnails
- **THEN** each thumbnail's `transitionDelay` SHALL be set as an inline style computed from its index, as this value is inherently dynamic and cannot be expressed in static CSS

### Requirement: Tailwind is removed as a dependency
The site SHALL NOT depend on `tailwindcss` or `@astrojs/tailwind`. The build SHALL succeed and produce visually identical output without these packages.

#### Scenario: Build succeeds without Tailwind
- **WHEN** `npm run build` is executed after the migration
- **THEN** the build SHALL complete without errors and without referencing any Tailwind packages

#### Scenario: No Tailwind utility classes remain in source
- **WHEN** the source files are inspected after migration
- **THEN** no Tailwind utility class names SHALL appear as the sole styling mechanism for any element

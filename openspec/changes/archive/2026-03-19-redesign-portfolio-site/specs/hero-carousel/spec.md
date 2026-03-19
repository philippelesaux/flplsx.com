## ADDED Requirements

### Requirement: Hero carousel renders full-viewport on the home page
The home page SHALL display a full-viewport (100vh) hero section above the portfolio grid, containing a crossfade carousel of 5 portfolio images selected randomly at build time.

#### Scenario: Hero fills the viewport on load
- **WHEN** a user loads the home page
- **THEN** the hero section SHALL occupy the full viewport height (100vh) and full width

#### Scenario: Five images are selected at build time
- **WHEN** the site is built
- **THEN** exactly 5 images SHALL be selected from the portfolio via a random shuffle of the full array, with the same 5 shown to all visitors until the next build

### Requirement: Carousel auto-advances via crossfade
The carousel SHALL automatically advance through all 5 slides in sequence using a crossfade opacity transition, with no user-facing controls.

#### Scenario: Slides advance automatically
- **WHEN** a slide has been displayed for the configured interval
- **THEN** the carousel SHALL fade to the next slide in sequence, wrapping from the last slide back to the first

#### Scenario: No user controls are shown
- **WHEN** the hero carousel is displayed
- **THEN** no navigation dots, arrows, or pause controls SHALL be visible

### Requirement: Gradient scrim ensures nav readability
The hero SHALL display a dark gradient overlay across the top portion of each image so that white navigation text is legible regardless of image brightness.

#### Scenario: Scrim is present over bright images
- **WHEN** a bright image is displayed in the hero
- **THEN** a dark-to-transparent gradient SHALL be visible at the top of the hero, ensuring sufficient contrast for white nav text

### Requirement: Hero images are served as optimized WebP at 1400px
Hero images SHALL be generated at build time as WebP files at 1400px width, separate from the 400px thumbnail pass used by the portfolio grid.

#### Scenario: Hero images are optimized at build
- **WHEN** the site is built
- **THEN** each hero candidate image SHALL have a corresponding 1400px WebP file in `/_astro/`

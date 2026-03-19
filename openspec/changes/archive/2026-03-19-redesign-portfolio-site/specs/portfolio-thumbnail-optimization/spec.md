## MODIFIED Requirements

### Requirement: Thumbnails are optimized at build time
At build time, the system SHALL generate a compressed WebP version of each portfolio image at 400px width using `getImage()` from `astro:assets` for grid thumbnails, AND a separate 1400px WebP version for any images selected as hero candidates. The raw source images SHALL NOT be served to the browser.

#### Scenario: Build produces optimized thumbnail files
- **WHEN** the site is built with `astro build`
- **THEN** each portfolio image has a corresponding optimized WebP file in the build output at `/_astro/`

#### Scenario: Thumbnail dimensions are capped at 400px width
- **WHEN** a portfolio image is wider than 400px
- **THEN** the generated thumbnail SHALL have a width of 400px with aspect ratio preserved

#### Scenario: Hero images are generated at 1400px width
- **WHEN** the site is built with `astro build`
- **THEN** each of the 5 hero candidate images SHALL also have a 1400px WebP file generated in `/_astro/`

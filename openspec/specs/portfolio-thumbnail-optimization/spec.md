## Purpose

Build-time WebP generation for all portfolio images: 400px thumbnails for the grid and 1400px versions for hero candidates. Raw source images are never served to the browser.

## Requirements

### Requirement: Thumbnails are optimized at build time
At build time, the system SHALL generate a compressed WebP version of each portfolio image at 400px width using `getImage()` from `astro:assets` for grid thumbnails, AND a separate 1400px WebP version for any images selected as hero candidates. The raw source images SHALL NOT be served to the browser.

#### Scenario: Build produces optimized thumbnail files
- **WHEN** the site is built with `astro build`
- **THEN** each portfolio image has a corresponding optimized WebP file in the build output at `/_astro/`

#### Scenario: Thumbnail dimensions are capped at 400px width
- **WHEN** a portfolio image is wider than 400px
- **THEN** the generated thumbnail SHALL have a width of 400px with aspect ratio preserved

### Requirement: Hero images are generated at 1400px width
Each of the 5 hero candidate images SHALL have a 1400px WebP file generated at build time in `/_astro/`, separate from the 400px thumbnail pass.

#### Scenario: Hero image files are present in build output
- **WHEN** the site is built with `astro build`
- **THEN** each of the 5 hero candidate images SHALL also have a 1400px WebP file generated in `/_astro/`

### Requirement: Lightbox receives optimized thumbnail URLs
The `Lightbox` component SHALL receive pre-optimized thumbnail URLs rather than raw image paths, so no transformation or large file download occurs at runtime.

#### Scenario: Grid renders optimized images
- **WHEN** the portfolio grid is rendered in the browser
- **THEN** each `<img>` src SHALL point to a WebP file in `/_astro/`, not the original JPEG source

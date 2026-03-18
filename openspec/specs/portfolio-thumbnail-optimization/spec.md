## Requirements

### Requirement: Thumbnails are optimized at build time
At build time, the system SHALL generate a compressed WebP version of each portfolio image at 400px width using `getImage()` from `astro:assets`. The raw source images SHALL NOT be served to the browser as thumbnails.

#### Scenario: Build produces optimized thumbnail files
- **WHEN** the site is built with `astro build`
- **THEN** each portfolio image has a corresponding optimized WebP file in the build output at `/_astro/`

#### Scenario: Thumbnail dimensions are capped at 400px width
- **WHEN** a portfolio image is wider than 400px
- **THEN** the generated thumbnail SHALL have a width of 400px with aspect ratio preserved

### Requirement: Lightbox receives optimized thumbnail URLs
The `Lightbox` component SHALL receive pre-optimized thumbnail URLs rather than raw image paths, so no transformation or large file download occurs at runtime.

#### Scenario: Grid renders optimized images
- **WHEN** the portfolio grid is rendered in the browser
- **THEN** each `<img>` src SHALL point to a WebP file in `/_astro/`, not the original JPEG source

## Why

Portfolio thumbnails are served as raw camera JPEGs (11–58MB each, 547MB total), causing slow page loads even though the displayed images are small grid tiles. Astro's build-time image optimization is available but bypassed because `Lightbox.tsx` uses a plain `<img>` tag.

## What Changes

- `index.astro` processes each portfolio image at build time with `getImage()`, producing 400px WebP thumbnails
- The optimized thumbnail URL (not the raw file) is passed to `Lightbox.tsx`
- `Lightbox.tsx` receives a type update to reflect the new image shape

## Capabilities

### New Capabilities

- `portfolio-thumbnail-optimization`: Build-time generation of compressed, resized WebP thumbnails for portfolio grid images

### Modified Capabilities

<!-- none -->

## Impact

- `src/pages/index.astro`: adds async `getImage()` calls in frontmatter
- `src/components/Lightbox.tsx`: type update for the new image shape
- Build output: `/_astro/` directory will contain generated WebP files
- No runtime or dependency changes required

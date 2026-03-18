## Context

The portfolio gallery renders raw camera JPEGs via a plain `<img>` tag in `Lightbox.tsx`. Although the Content Collection schema uses Astro's `image()` helper (which provides metadata), no image transformation happens at build time — the browser downloads the full raw file for every visible thumbnail. `getImage()` from `astro:assets` can produce optimized, resized output files at build time, which is the correct hook for this.

## Goals / Non-Goals

**Goals:**
- Reduce thumbnail payload from ~10–58MB per image to ~50–150KB per image
- Use only existing Astro tooling — no new dependencies
- Keep `Lightbox.tsx` as a plain React component with no Astro-specific imports

**Non-Goals:**
- Click-to-expand / lightbox behavior (future change)
- Optimizing the full-resolution images used for eventual lightbox view
- Adding lazy-loading improvements beyond what `loading="lazy"` already provides

## Decisions

**Use `getImage()` in `index.astro` frontmatter, not inside `Lightbox.tsx`**
`getImage()` is an Astro API and cannot be called inside a React component. The frontmatter of `index.astro` runs at build time and is the correct place to transform images before passing them to client components. Alternatives considered: moving the grid to a pure `.astro` component with `<Image>` — cleaner, but removes the option to add future React interactivity (hover effects, lightbox) without a refactor.

**Target: 400px width, WebP format**
Thumbnails render at most ~400px wide at `xl:columns-5` layout. WebP offers ~25–35% smaller files than JPEG at equivalent quality. Astro's sharp-based optimizer handles the conversion natively.

**Replace `image` field with `thumbnail` on each entry passed to Lightbox**
`Lightbox.tsx` currently receives `entry.image` (an Astro image object). Post-change it will receive `thumbnail` (an `{ src: string }` object from `getImage()`). This keeps the type surface minimal and avoids passing the large raw image object to the client bundle.

## Risks / Trade-offs

- **Longer build times** — `getImage()` runs sharp for every image on every build. With ~28 images this is acceptable; worth noting if the collection grows significantly. → Mitigation: Astro caches processed images in `.astro/` across builds.
- **Type narrowing** — `AllImages` is exported from `index.astro` and consumed by `Lightbox.tsx`. The type must be updated in both places. → Mitigation: TypeScript will surface any mismatch at build time via `astro check`.

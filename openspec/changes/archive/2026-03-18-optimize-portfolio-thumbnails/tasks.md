## 1. Update index.astro

- [x] 1.1 Import `getImage` from `astro:assets` in `index.astro`
- [x] 1.2 Replace the `allImages` mapping with an async `Promise.all` that calls `getImage({ src, width: 400, format: 'webp' })` for each entry
- [x] 1.3 Update the `AllImages` exported type to reflect the new shape (entry data with `thumbnail: { src: string }` instead of raw `image`)

## 2. Update Lightbox.tsx

- [x] 2.1 Update the `AllImages` type import / prop type to match the new shape from `index.astro`
- [x] 2.2 Change `src={entry.image.src}` to `src={entry.thumbnail.src}` in the `<img>` tag

## 3. Verify

- [x] 3.1 Run `npm run build` and confirm it completes without type errors
- [x] 3.2 Run `npm run preview` and confirm thumbnail images load as small WebP files (check DevTools Network tab — each should be well under 200KB)

## 1. Dark Background

- [x] 1.1 Replace `bg-linear-to-bl from-slate-50 to-slate-500` with `bg-zinc-950` on the `<body>` in `BaseLayout.astro`
- [x] 1.2 Verify `/about` page text and image contrast are still readable on zinc-950 (adjust text colors from `text-slate-*` to `text-zinc-*` or `text-white` as needed)

## 2. Hero Image Generation (index.astro)

- [x] 2.1 Shuffle the portfolio array at build time using `portfolio.sort(() => Math.random() - 0.5)` in `index.astro` frontmatter
- [x] 2.2 Take the first 5 entries as `heroImages` and run a separate `getImage({ src, width: 1400, format: 'webp' })` pass for each
- [x] 2.3 Pass `heroImages` as a new prop to a new `Hero` component and pass remaining images (or all) to `Lightbox` as before
- [x] 2.4 Update the `AllImages` export type to reflect any shape changes

## 3. Hero Carousel Component (Hero.tsx)

- [x] 3.1 Create `src/components/Hero.tsx` — full-viewport container (`h-screen w-full relative overflow-hidden`)
- [x] 3.2 Render 5 `<img>` elements absolutely positioned, stacked; active slide is `opacity-100`, others `opacity-0`, with CSS `transition-opacity duration-1000`
- [x] 3.3 Add `useState` for current index and `useEffect` with `setInterval` to advance every 5 seconds, clearing on unmount
- [x] 3.4 Add gradient scrim overlay `<div>` inside the hero: `absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10`
- [x] 3.5 Wire `Hero` into `index.astro` with `client:load`

## 4. Scroll-Aware Navigation

- [x] 4.1 Update `NavigationBar.astro` — set `position: fixed`, white text, `bg-gradient-to-b from-black/50 to-transparent` base, CSS transition for background change
- [x] 4.2 Add a `data-nav` attribute to the `<nav>` element for the JS scroll listener to target
- [x] 4.3 Add a `data-hero` attribute to the Hero container element for the JS scroll listener to watch
- [x] 4.4 Add a `<script>` in `BaseLayout.astro` with a scroll event listener: when `hero.getBoundingClientRect().bottom <= 0`, add class `scrolled` to `[data-nav]`; when hero re-enters, remove it
- [x] 4.5 Define `.scrolled` styles as `is:global` in `BaseLayout.astro`: `background-image: none; background-color: rgb(24 24 27 / 0.9); backdrop-filter: blur(8px)`
- [x] 4.6 Verify nav link colors remain legible in both transparent and scrolled states

## 5. Grid Entrance Animations (Lightbox.tsx)

- [x] 5.1 Add a `useEffect` in `Lightbox.tsx` that creates an `IntersectionObserver` observing each `<img>` element via refs
- [x] 5.2 Give each image an initial class of `opacity-0 translate-y-4 transition-all duration-500`
- [x] 5.3 When an image enters the viewport, add `opacity-100 translate-y-0` and remove the initial hidden classes
- [x] 5.4 Apply staggered `transition-delay` using a fixed lookup array (e.g., `['delay-0','delay-75','delay-150','delay-200','delay-300']`) indexed by position mod array length to avoid Tailwind purge issues

## 6. Verify

- [x] 6.1 Run `npm run build` — confirm no type errors, all images generated
- [x] 6.2 Run `npm run preview` — confirm hero carousel crossfades, auto-advances every 5s, and covers full viewport
- [x] 6.3 Confirm gradient scrim is visible and nav text is readable over both bright and dark hero images
- [x] 6.4 Scroll down — confirm nav transitions smoothly to dark, and back to transparent on scroll up
- [x] 6.5 Scroll through grid — confirm images stagger-fade in as they enter the viewport
- [x] 6.6 Check `/about` page renders correctly on dark background

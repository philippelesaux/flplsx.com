## 1. Declare fonts in Astro config

- [x] 1.1 Import `fontProviders` from `astro/config` and add a `fonts` array to `astro.config.mjs` with both fonts: Plus Jakarta Sans (`--font-body`) and Fraunces (`--font-display`), both using `fontProviders.fontsource()`

## 2. Update BaseLayout

- [x] 2.1 Remove `import '@fontsource-variable/plus-jakarta-sans'` and `import '@fontsource-variable/fraunces'` from `BaseLayout.astro`
- [x] 2.2 Import the `Font` component from `astro:assets` and add `<Font cssVariable="--font-body" preload />` and `<Font cssVariable="--font-display" />` inside `<head>`

## 3. Replace hardcoded font strings with CSS variables

- [x] 3.1 In `src/styles/global.css`, replace `'Plus Jakarta Sans Variable', ui-sans-serif, system-ui, sans-serif` with `var(--font-body)`
- [x] 3.2 In `src/pages/about.astro`, replace `'Fraunces Variable', serif` with `var(--font-display)`
- [x] 3.3 In `src/components/NavigationBar.astro`, replace `'Fraunces Variable', serif` with `var(--font-display)`

## 4. Remove unused dependencies

- [x] 4.1 Remove `@fontsource-variable/plus-jakarta-sans` and `@fontsource-variable/fraunces` from `package.json` and run `npm install`

## 5. Verify

- [x] 5.1 Run `npm run build` and confirm it completes without errors and fonts are downloaded to `.astro/fonts/`
- [x] 5.2 Run `npm run preview` and visually confirm both fonts render correctly across the index, about, and nav

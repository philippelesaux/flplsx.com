## Context

`Hero.tsx` is a React component hydrated with `client:load` on the home page. Its only runtime behavior is a `setInterval` that increments a slide index every 5 seconds. The visual transition is handled entirely by CSS (`opacity` + `transition`). React is used here solely as a vehicle for the timer — there is no user interaction, no state the user can observe directly, and no DOM mutation beyond toggling an `.active` class.

The project architecture explicitly reserves React for interactive islands. The `hero-carousel` spec has no requirement that constrains implementation technology.

## Goals / Non-Goals

**Goals:**
- Replace `Hero.tsx` + `Hero.module.css` with a single `Hero.astro` component
- Preserve all visible behavior: full-viewport hero, 5-image crossfade carousel, gradient scrim
- Eliminate the React hydration cost for the hero section
- Move `Props` type ownership into `Hero.astro` where it belongs

**Non-Goals:**
- Changing carousel behavior (interval, number of images, transition style)
- Modifying how images are selected or optimized in `index.astro`
- Touching any other component or page

## Decisions

### Use a `<script>` tag in Hero.astro rather than CSS-only animation

**Decision**: Implement the interval timer as a plain `<script>` block inside `Hero.astro`.

**Rationale**: A CSS-only approach (e.g., `animation` with `steps`) could eliminate JS entirely, but it requires hardcoding the number of slides into keyframe percentages and loses the random-per-build ordering that comes from the server-side shuffle in `index.astro`. A `<script>` tag is simpler, keeps the timing logic readable, and Astro bundles inline scripts efficiently with no framework overhead.

**Alternative considered**: CSS `animation` with `animation-delay` per image — rejected because keyframe percentages would need to match the slide count and the ordering would need to be encoded as CSS custom properties, adding complexity for no user-visible benefit.

### Inline `<style>` in Hero.astro (Astro scoped styles)

**Decision**: Move the CSS from `Hero.module.css` into a `<style>` block in `Hero.astro`.

**Rationale**: Astro scoped styles are the standard mechanism for component-level CSS in this codebase. CSS Modules were only necessary because Astro scoped styles cannot penetrate React islands. With `Hero.astro`, that constraint no longer applies.

### Props and types are internal to Hero.astro

**Decision**: `HeroImage` and `Props` are unexported interfaces inside `Hero.astro`. No type is exported from the component, and `index.astro` imports nothing from it.

**Rationale**: The original plan was to export a `HeroImages` type and have `index.astro` import it — reversing the awkward dependency where `Hero.tsx` imported a type from its own consumer. In practice, no consumer needed the type: `index.astro` builds the array inline and passes it directly as a prop, so the type is fully inferred at the call site. Keeping both interfaces unexported is simpler and sufficient.

## Risks / Trade-offs

- **Astro `<script>` is module-scoped by default** — if multiple `Hero` instances were on the same page, each would run its own timer independently. Not a concern since the hero appears exactly once, but worth noting. → No mitigation needed.
- **No hydration fallback** — the current React implementation renders nothing on the server (client:load). The Astro version renders all `<img>` tags server-side with CSS hiding inactive ones, which is strictly better for LCP. → Net improvement, no risk.

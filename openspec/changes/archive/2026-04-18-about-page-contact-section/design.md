## Context

The about page currently has no contact information. This change adds a contact section with an Instagram link and a plain-text email address with a copy-to-clipboard button. The site uses Astro 6, vanilla CSS, and vanilla TypeScript — no UI framework, no icon libraries.

## Goals / Non-Goals

**Goals:**
- Add a visually consistent contact section below the bio
- Inline SVG icons for Instagram and email glyphs (no external icon library)
- Copy-to-clipboard button with ~1.5s feedback, following the existing factory script pattern

**Non-Goals:**
- A `mailto:` link on the email address
- A contact form
- Social links beyond Instagram
- An icon system or sprite infrastructure (overkill for two glyphs)

## Decisions

### Inline SVG icons over an icon library
Two icons are needed in a single component. Adding an icon library (e.g. Heroicons, Phosphor) introduces a dependency and build complexity for negligible benefit at this scale. Inline SVG paths in `about.astro` are self-contained and zero-dependency.

*Alternatives considered:* icon font (requires HTTP request, no tree-shaking), `<img>` tags (no colour theming via `currentColor`), SVG sprite in BaseLayout (premature generalisation for two icons).

### Plain text email, not `mailto:`
`mailto:` links open the OS default mail client, which is frequently unconfigured on desktop (especially for webmail users). Displaying the address as plain text lets the visitor copy it however they prefer. The copy button provides low-friction access without the mail-client lottery.

### Copy behaviour in `src/scripts/contact.ts`
The copy interaction follows the established factory pattern: `initContact(root)` receives the section root element, attaches an `AbortController`-scoped click listener, calls `navigator.clipboard.writeText()`, toggles a `data-copied` attribute on the button for CSS-driven feedback, and resets after 1500 ms. This keeps the `.astro` script block trivial and the logic fully testable with Vitest + jsdom.

### Copy and check icons stack in the same position via CSS grid
Both icons (`copy` and `check`) are always present in the DOM, placed in the same CSS grid cell (`grid-area: 1 / 1`) so they occupy identical space. Opacity controls which is visible — no layout shift between states.

*Alternatives considered:* `position: absolute` on one icon (requires explicit sizing of the container), `display: none` toggle (can't be transitioned).

### One-way transition on the copy button
The button transitions only from `data-copied` back to the default state — not in the other direction. The "copied" confirmation appears instantly (no transition in), giving immediate tactile feedback. The CSS transition is applied only to the `[data-copied]` removal, so the return to default is animated while the confirmation snap is not. This avoids the button feeling sluggish on activation.

*Note:* `navigator.clipboard` requires a secure context (HTTPS or localhost). No fallback is needed — the site runs on HTTPS in production and `localhost` in development.

### Styling follows the credentials block pattern
The section uses the same small-caps muted label, icon-slot-per-row layout, and token variables as the existing "Featured in" block. No new design patterns are introduced.

### Icon colour uses `--color-text-secondary`
Icons are rendered in `--color-text-secondary` (`zinc-600`) while the adjacent handle and email text use `--color-text` (`zinc-900`). This creates a subtle hierarchy — icons recede slightly without disappearing — using an existing token, no new values needed.

## Risks / Trade-offs

- **Clipboard API availability** → Only available in secure contexts. Not a risk for this deployment (HTTPS production, localhost dev), so no fallback is implemented.
- **Spam scraping of displayed email** → Plain-text email is indexable by scrapers. Accepted trade-off; obfuscation adds complexity disproportionate to a photography business address.

## Open Questions

None — requirements and approach are fully resolved.

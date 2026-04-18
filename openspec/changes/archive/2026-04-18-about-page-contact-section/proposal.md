## Why

The about page introduces Philippe but provides no way for visitors to follow his work or get in touch. Adding a contact section with Instagram and email transforms the page from a read-only bio into an actionable endpoint.

## What Changes

- New "Contact" section added below the bio in the about page content column
- Instagram entry: icon + `@flplsx` handle linking to the Instagram profile
- Email entry: icon + `photography@flplsx.com` displayed as plain text, with a copy-to-clipboard button to the right
- Copy button shows brief "copied" feedback for ~1.5 seconds, then resets to its default state

## Capabilities

### New Capabilities

- `about-page-contact`: Contact section on the about page — Instagram link and email display with copy-to-clipboard interaction

### Modified Capabilities

- `about-page`: New contact section appended below the bio in the content column

## Impact

- `src/pages/about.astro` — new contact section markup and styles
- `src/scripts/contact.ts` — new script for copy-to-clipboard behaviour
- `openspec/specs/about-page/spec.md` — updated to describe the new section
- `openspec/specs/about-page-contact/spec.md` — new spec for the contact section

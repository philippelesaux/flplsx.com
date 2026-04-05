## Purpose

The navigation bar transitions between a transparent state (at the top of hero pages) and a translucent white state (on scroll or on pages without a hero), with dark text on non-hero pages from the start.

## Requirements

### Requirement: Nav has a dark gradient scrim over the hero
The navigation bar SHALL display white text when at the very top of the page (`scrollY === 0`) on pages with a hero section. The hero's own gradient scrim provides the dark backdrop for legibility. Once the user scrolls, the nav transitions to its translucent white state.

#### Scenario: Nav has white text at top of hero page
- **WHEN** a user loads the home page and has not scrolled (scrollY === 0)
- **THEN** the nav SHALL display white text over the hero's gradient scrim

#### Scenario: Nav transitions to white background on scroll
- **WHEN** the user scrolls even slightly (scrollY > 0)
- **THEN** the nav SHALL transition to translucent white background with dark text, regardless of hero visibility

### Requirement: Nav solidifies when hero scrolls out of view
The navigation bar SHALL transition to a white semi-transparent background (`white/0.9`) with backdrop blur and dark text when `window.scrollY > 0`, on every page regardless of whether a hero section is present.

#### Scenario: Nav solidifies on any scroll
- **WHEN** the user scrolls down by any amount on any page
- **THEN** the nav SHALL smoothly transition to a white/90 background with backdrop blur and dark text

#### Scenario: Nav returns to transparent when scrolled back to top
- **WHEN** the user scrolls back to the very top of the page (scrollY === 0)
- **THEN** the nav SHALL smoothly transition back to its transparent state

#### Scenario: Nav on non-hero page solidifies on scroll
- **WHEN** the user scrolls on a page without a hero section (e.g. `/about`)
- **THEN** the nav SHALL transition to translucent white background, same as on the index page

### Requirement: Nav defaults to dark text on pages without a hero
On pages that do not include a hero section, the navigation bar SHALL render with dark text and no background at scroll position 0, and transition to the translucent white state on any scroll.

#### Scenario: About page nav has dark text on load
- **WHEN** the about page loads (no hero present) and scrollY === 0
- **THEN** the nav SHALL display dark text without a background

#### Scenario: About page nav solidifies on scroll
- **WHEN** the user scrolls on the about page
- **THEN** the nav SHALL display translucent white background with dark text

### Requirement: Nav scroll state is reflected via CSS classes
The nav element SHALL use the `scrolled` and `hero-visible` CSS classes as the mechanism for all visual state transitions. These classes are the testable interface between scroll logic and CSS presentation.

#### Scenario: Nav has scrolled class when page is scrolled
- **WHEN** `window.scrollY` is greater than 0
- **THEN** the nav element SHALL have class `scrolled`
- **THEN** the nav element SHALL NOT have class `hero-visible`

#### Scenario: Nav has hero-visible class at top of hero page
- **WHEN** `window.scrollY` is 0 and a hero element is present in the DOM
- **THEN** the nav element SHALL have class `hero-visible`
- **THEN** the nav element SHALL NOT have class `scrolled`

#### Scenario: Nav has neither class at top of non-hero page
- **WHEN** `window.scrollY` is 0 and no hero element is present
- **THEN** the nav element SHALL have neither `scrolled` nor `hero-visible`

#### Scenario: State is applied once on initialisation
- **WHEN** `initScrollNav` is called
- **THEN** the correct class state SHALL be applied immediately before any scroll event fires

### Requirement: Nav includes Photography and About links
The nav SHALL include two links on the right side: "photography" (linking to `/`) and "about" (linking to `/about`), in that order.

#### Scenario: Nav renders both links on desktop
- **WHEN** the page loads on a viewport 768px or wider
- **THEN** the nav SHALL display "photography" before "about" in the link list

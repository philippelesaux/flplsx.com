## ADDED Requirements

### Requirement: Carousel initialises with the first image active
On initialisation, the first image in the carousel SHALL have the `active` class applied immediately. No other image SHALL have `active` at this point.

#### Scenario: First image is active on load
- **WHEN** the hero carousel is initialised
- **THEN** the first image element SHALL have class `active`
- **THEN** no other image element SHALL have class `active`

## MODIFIED Requirements

### Requirement: Carousel auto-advances via crossfade
The carousel SHALL automatically advance through all 5 slides in sequence using a crossfade opacity transition every 5000ms, with no user-facing controls.

#### Scenario: Slides advance automatically
- **WHEN** a slide has been displayed for 5000ms
- **THEN** the carousel SHALL fade to the next slide in sequence, wrapping from the last slide back to the first

#### Scenario: No user controls are shown
- **WHEN** the hero carousel is displayed
- **THEN** no navigation dots, arrows, or pause controls SHALL be visible

## MODIFIED Requirements

### Requirement: Nav solidifies when hero scrolls out of view
The navigation bar SHALL transition to a white semi-transparent background (`white/0.9`) with backdrop blur and dark text (`zinc-900`) when the hero section is no longer visible, ensuring readability over the white page body.

#### Scenario: Nav solidifies on scroll past hero
- **WHEN** the user scrolls past the hero section
- **THEN** the nav SHALL smoothly transition to a white/90 background with backdrop blur and zinc-900 text

#### Scenario: Nav returns to gradient scrim when scrolling back to hero
- **WHEN** the user scrolls back up so the hero is visible again
- **THEN** the nav SHALL smoothly transition back to the dark gradient scrim state with white text

### Requirement: Nav defaults to dark text on pages without a hero
On pages that do not include a hero section (e.g. `/about`), the navigation bar SHALL render with dark text (`zinc-900`) and no background by default, since there is no hero image behind it on load.

#### Scenario: About page nav has dark text on load
- **WHEN** the about page loads (no hero present)
- **THEN** the nav SHALL display dark text (`zinc-900`) without a dark gradient scrim

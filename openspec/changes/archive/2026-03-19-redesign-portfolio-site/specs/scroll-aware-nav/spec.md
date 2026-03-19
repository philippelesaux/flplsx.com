## ADDED Requirements

### Requirement: Nav has a dark gradient scrim over the hero
The navigation bar SHALL be `position: fixed` with white text and a `from-black/50 to-transparent` gradient background when the hero section is visible in the viewport. The gradient ensures nav text is legible over any image brightness without a solid background.

#### Scenario: Nav has gradient scrim on page load
- **WHEN** a user loads the home page and the hero is visible
- **THEN** the nav SHALL display a dark-to-transparent gradient background with white text

### Requirement: Nav solidifies when hero scrolls out of view
The navigation bar SHALL transition to a dark semi-transparent background with backdrop blur when the hero section is no longer visible, ensuring readability over all other page content.

#### Scenario: Nav solidifies on scroll past hero
- **WHEN** the user scrolls past the hero section
- **THEN** the nav SHALL smoothly transition to a zinc-900/90 background with backdrop blur

#### Scenario: Nav returns to gradient scrim when scrolling back to hero
- **WHEN** the user scrolls back up so the hero is visible again
- **THEN** the nav SHALL smoothly transition back to the dark gradient scrim state

### Requirement: Nav structure accommodates future links
The nav SHALL be structured to support additional links beyond the current single "about" item without layout changes.

#### Scenario: Nav renders with multiple items
- **WHEN** additional navigation links are added
- **THEN** the nav SHALL display them inline without requiring structural changes to the layout

## ADDED Requirements

### Requirement: Hamburger button communicates open state via ARIA
The hamburger button SHALL update its `aria-expanded` and `aria-label` attributes to reflect the current open/closed state of the menu, so that the state is accessible to assistive technologies.

#### Scenario: ARIA attributes reflect open state
- **WHEN** the hamburger button is clicked and the menu opens
- **THEN** the button's `aria-expanded` attribute SHALL be `"true"`
- **THEN** the button's `aria-label` SHALL be `"Close menu"`

#### Scenario: ARIA attributes reflect closed state
- **WHEN** the hamburger button is clicked and the menu closes
- **THEN** the button's `aria-expanded` attribute SHALL be `"false"`
- **THEN** the button's `aria-label` SHALL be `"Open menu"`

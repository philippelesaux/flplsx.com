## ADDED Requirements

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

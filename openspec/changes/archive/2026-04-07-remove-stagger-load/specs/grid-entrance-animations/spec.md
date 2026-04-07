## MODIFIED Requirements

### Requirement: Portfolio grid images fade in on scroll
Each image in the portfolio grid SHALL begin invisible and animate to fully visible with an upward translate when it enters the viewport.

#### Scenario: Images are hidden before entering viewport
- **WHEN** the page loads
- **THEN** portfolio grid images that are below the viewport SHALL be invisible (opacity 0)

#### Scenario: Images animate in when scrolled into view
- **WHEN** a portfolio grid image enters the viewport
- **THEN** it SHALL transition to fully visible with a subtle upward translate animation

#### Scenario: Image gains visible class on intersection
- **WHEN** a portfolio grid image enters the viewport
- **THEN** the image SHALL gain class `visible`

#### Scenario: Observer stops watching after first intersection
- **WHEN** a portfolio grid image has become visible
- **THEN** the IntersectionObserver SHALL stop observing that image

## REMOVED Requirements

### Requirement: Stagger delay is applied by position
**Reason**: The position-based delay makes images that are already in the viewport on load feel slow. Images should appear as soon as they are ready.
**Migration**: No migration needed — images now fade in immediately on intersection.

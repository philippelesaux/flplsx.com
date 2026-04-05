## MODIFIED Requirements

### Requirement: Portfolio grid images fade in on scroll
Each image in the portfolio grid SHALL begin invisible and animate to fully visible with an upward translate when it enters the viewport, creating a staggered reveal effect.

#### Scenario: Images are hidden before entering viewport
- **WHEN** the page loads
- **THEN** portfolio grid images that are below the viewport SHALL be invisible (opacity 0)

#### Scenario: Images animate in when scrolled into view
- **WHEN** a portfolio grid image enters the viewport
- **THEN** it SHALL transition to fully visible with a subtle upward translate animation

#### Scenario: Stagger delay is applied by position
- **WHEN** multiple images enter the viewport simultaneously
- **THEN** each image SHALL animate in with a progressively increasing delay based on its position, creating a staggered cascade effect

#### Scenario: Image gains visible class on intersection
- **WHEN** a portfolio grid image enters the viewport
- **THEN** the image SHALL gain class `visible`

#### Scenario: Observer stops watching after first intersection
- **WHEN** a portfolio grid image has become visible
- **THEN** the IntersectionObserver SHALL stop observing that image

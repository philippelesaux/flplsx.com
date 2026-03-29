## Purpose

Portfolio grid images animate in as they scroll into view — starting invisible and transitioning to visible with an upward translate, staggered by position, using IntersectionObserver in vanilla JS.

## Requirements

### Requirement: Portfolio grid images fade in on scroll
Each image in the portfolio grid SHALL begin invisible and animate to fully visible with an upward translate when it enters the viewport, creating a staggered reveal effect. The IntersectionObserver logic SHALL be implemented in vanilla JS inside an Astro `<script>` block, not in a React component.

#### Scenario: Images are hidden before entering viewport
- **WHEN** the page loads
- **THEN** portfolio grid images that are below the viewport SHALL be invisible (opacity 0)

#### Scenario: Images animate in when scrolled into view
- **WHEN** a portfolio grid image enters the viewport
- **THEN** it SHALL transition to fully visible with a subtle upward translate animation

#### Scenario: Stagger delay is applied by position
- **WHEN** multiple images enter the viewport simultaneously
- **THEN** each image SHALL animate in with a progressively increasing delay based on its position, creating a staggered cascade effect

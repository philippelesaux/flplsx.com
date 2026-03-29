## MODIFIED Requirements

### Requirement: View Transitions morph animation on open and close
Opening and closing the dialog SHALL animate with a View Transitions morph between the thumbnail and the full-size image, as progressive enhancement. All close paths — close button, backdrop click, and Escape key — SHALL route through the animated close function.

#### Scenario: Open triggers morph from thumbnail to dialog image
- **WHEN** a thumbnail is clicked
- **THEN** `document.startViewTransition` SHALL be used to morph the thumbnail into the dialog image using a shared `view-transition-name`

#### Scenario: Close triggers morph from dialog image to thumbnail
- **WHEN** the dialog is closed via the close button or backdrop click
- **THEN** `document.startViewTransition` SHALL morph the dialog image back to the thumbnail

#### Scenario: Escape key close triggers morph animation
- **WHEN** the user presses Escape while the dialog is open
- **THEN** the `cancel` event SHALL be intercepted via `preventDefault()`
- **THEN** the animated close function SHALL run, morphing the dialog image back to the thumbnail

#### Scenario: View Transitions unavailable — dialog opens directly
- **WHEN** `document.startViewTransition` is not available in the browser
- **THEN** the dialog SHALL open and close via `showModal()` / `close()` directly, without animation

#### Scenario: view-transition-name is cleared after each transition
- **WHEN** a View Transition completes
- **THEN** the `view-transition-name` style SHALL be removed from both the thumbnail button and the dialog image to prevent conflicts on subsequent transitions

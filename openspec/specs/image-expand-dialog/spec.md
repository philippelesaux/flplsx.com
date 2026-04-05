## Purpose

Clicking a portfolio thumbnail opens a full-screen native `<dialog>` with the full-size image, title, location, and prev/next navigation. Opens and closes with a View Transitions morph animation as progressive enhancement.

## Requirements

### Requirement: Thumbnail opens full-size image in a dialog
Clicking or activating a portfolio thumbnail SHALL open a native `<dialog>` element displaying the display-size image (1400px webp), the image title, and the image location.

#### Scenario: Thumbnail click opens dialog
- **WHEN** a user clicks or activates a portfolio thumbnail
- **THEN** the `<dialog>` SHALL open via `showModal()` displaying the corresponding full-size image, title, and location

#### Scenario: Dialog is accessible via keyboard
- **WHEN** a user tabs to a thumbnail button and presses Enter or Space
- **THEN** the dialog SHALL open with focus moved inside the dialog

### Requirement: Transitioning guard prevents concurrent close calls
A guard SHALL prevent the close function from being called while a View Transition is already in progress. Once a close transition begins, any further close attempts — via Escape, close button, or backdrop — SHALL be ignored until the transition completes.

#### Scenario: Second close attempt during transition is ignored
- **WHEN** a close transition is already in progress
- **THEN** any additional close attempt SHALL be a no-op until the transition finishes

### Requirement: Dialog is dismissible
The dialog SHALL be closeable via the native Escape key, a visible close button, and clicking the `::backdrop`.

#### Scenario: Escape key closes dialog
- **WHEN** the dialog is open and the user presses Escape
- **THEN** the dialog SHALL close and focus SHALL return to the thumbnail that opened it

#### Scenario: Close button closes dialog
- **WHEN** the user clicks the close button inside the dialog
- **THEN** the dialog SHALL close

#### Scenario: Backdrop click closes dialog
- **WHEN** the user clicks the dialog backdrop (the area outside the dialog content)
- **THEN** the dialog SHALL close

### Requirement: Prev/next navigation within dialog
The dialog SHALL provide navigation to the previous and next images without closing and reopening.

#### Scenario: Next button advances to next image
- **WHEN** the dialog is open and the user clicks the next arrow or presses ArrowRight
- **THEN** the dialog SHALL update to display the next image, title, and location

#### Scenario: Prev button goes to previous image
- **WHEN** the dialog is open and the user clicks the prev arrow or presses ArrowLeft
- **THEN** the dialog SHALL update to display the previous image, title, and location

#### Scenario: Navigation wraps at boundaries
- **WHEN** the user navigates past the last image
- **THEN** the dialog SHALL wrap to the first image, and vice versa

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

### Requirement: Dialog layout is full-screen on all viewports
The dialog SHALL occupy the full viewport on both mobile and desktop, with the image centered using `object-fit: contain` and metadata + controls displayed in a bar below the image.

#### Scenario: Dialog fills the viewport
- **WHEN** the dialog is open
- **THEN** it SHALL fill 100% of the viewport width and height on all screen sizes

#### Scenario: Metadata is displayed below the image
- **WHEN** the dialog is open
- **THEN** the image title and location SHALL be visible below the image, with prev/next and close controls in the same bar

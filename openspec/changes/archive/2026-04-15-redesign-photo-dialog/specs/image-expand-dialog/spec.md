## MODIFIED Requirements

### Requirement: Dialog layout is full-screen on all viewports
The dialog SHALL occupy the full viewport on both mobile and desktop, with the image centered and contained within the available space. A typographic strip below the image displays the title and location. A close button is visible in the top-right corner of the dialog.

#### Scenario: Dialog fills the viewport
- **WHEN** the dialog is open
- **THEN** it SHALL fill 100% of the viewport width and height on all screen sizes

#### Scenario: Metadata strip is displayed below the image
- **WHEN** the dialog is open
- **THEN** the image title and location SHALL be visible in a strip below the image

#### Scenario: Close button is visible in the top-right corner
- **WHEN** the dialog is open
- **THEN** a close button SHALL be visible in the top-right corner of the dialog

#### Scenario: Click in letterbox area closes dialog
- **WHEN** the user clicks in the transparent area surrounding the contained image (outside the image's rendered bounds)
- **THEN** the dialog SHALL close

#### Scenario: Click on the rendered image does not close dialog
- **WHEN** the user clicks directly on the rendered image content
- **THEN** the dialog SHALL remain open

## ADDED Requirements

### Requirement: Dialog background blurs the page content behind it
When the dialog is open, the background area surrounding the contained image SHALL display a blurred view of the page content behind the dialog, rather than a plain black background.

#### Scenario: Page content is visible blurred behind the dialog
- **WHEN** the dialog is open
- **THEN** the gallery content behind the dialog SHALL be visible in a blurred, darkened state through the dialog background

### Requirement: Blurred background transitions with the dialog
The blurred background SHALL fade in when the dialog opens and fade out when it closes, at the same rate as the opening and closing animations.

#### Scenario: Background fades in on open
- **WHEN** the dialog opens
- **THEN** the blurred background SHALL transition from invisible to visible in sync with the image morph animation

#### Scenario: Background fades out on close
- **WHEN** the dialog closes
- **THEN** the blurred background SHALL transition from visible to invisible in sync with the closing animation

### Requirement: Keyboard arrow navigation
The dialog SHALL support ArrowLeft and ArrowRight keys to navigate between photos while open. Navigation SHALL wrap at the boundaries of the collection.

#### Scenario: ArrowRight navigates to the next photo
- **WHEN** the dialog is open and the user presses ArrowRight
- **THEN** the dialog SHALL display the next photo, wrapping to the first if at the end

#### Scenario: ArrowLeft navigates to the previous photo
- **WHEN** the dialog is open and the user presses ArrowLeft
- **THEN** the dialog SHALL display the previous photo, wrapping to the last if at the beginning

### Requirement: Swipe gesture navigation
The dialog SHALL support horizontal swipe gestures to navigate between photos. A swipe left SHALL advance to the next photo; a swipe right SHALL go to the previous photo. Predominantly vertical swipes SHALL be ignored.

#### Scenario: Swipe left navigates to the next photo
- **WHEN** the user performs a predominantly horizontal swipe left in the dialog
- **THEN** the dialog SHALL display the next photo

#### Scenario: Swipe right navigates to the previous photo
- **WHEN** the user performs a predominantly horizontal swipe right in the dialog
- **THEN** the dialog SHALL display the previous photo

#### Scenario: Vertical swipe does not navigate
- **WHEN** the user performs a swipe whose vertical distance exceeds its horizontal distance
- **THEN** the dialog SHALL NOT navigate

### Requirement: Screen reader navigation
The dialog SHALL provide navigation controls for screen reader users, and SHALL announce the new photo's title and location whenever navigation occurs.

#### Scenario: Previous and next controls are reachable by screen readers
- **WHEN** the dialog is open
- **THEN** screen reader users SHALL be able to navigate to the previous and next photo via dedicated controls accessible via Tab

#### Scenario: Navigation announces the new photo to screen readers
- **WHEN** the user navigates to a different photo by any means
- **THEN** the new photo's title and location SHALL be announced by the screen reader without requiring user action

## REMOVED Requirements

### Requirement: Prev/next navigation within dialog
**Reason**: Removed to simplify the viewer — visible navigation buttons conflicted with the typographic, editorial aesthetic.
**Migration**: Navigation between photos is available via ArrowLeft/ArrowRight keyboard keys and horizontal swipe gestures. Screen reader users can use the dedicated previous/next controls.

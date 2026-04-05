## ADDED Requirements

### Requirement: Transitioning guard prevents concurrent close calls
A guard SHALL prevent the close function from being called while a View Transition is already in progress. Once a close transition begins, any further close attempts — via Escape, close button, or backdrop — SHALL be ignored until the transition completes.

#### Scenario: Second close attempt during transition is ignored
- **WHEN** a close transition is already in progress
- **THEN** any additional close attempt SHALL be a no-op until the transition finishes

## MODIFIED Requirements

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

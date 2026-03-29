## ADDED Requirements

### Requirement: Escape key routes through animated close
When the dialog is open and the user presses Escape, the `cancel` event SHALL be intercepted and `closeDialog()` SHALL be called instead of the native close, ensuring the View Transitions morph animation fires. Focus return behaviour is unchanged — `dialog.close()` is called synchronously inside the transition callback, returning focus to the originating thumbnail immediately.

#### Scenario: Cancel event is intercepted
- **WHEN** the dialog is open and the `cancel` event fires (Escape pressed)
- **THEN** `e.preventDefault()` SHALL be called to stop the native close
- **THEN** `closeDialog()` SHALL be called to run the animated close path

#### Scenario: Escape fallback when View Transitions unavailable
- **WHEN** the dialog is open, Escape is pressed, and `startViewTransition` is not available
- **THEN** `closeDialog()` SHALL call `dialog.close()` directly, with no animation

### Requirement: Transitioning guard prevents concurrent close calls
A boolean `transitioning` flag SHALL prevent `closeDialog()` from being called while a View Transition is already in progress. The flag SHALL be set to `true` at the start of any View Transition and cleared when `.finished` resolves.

#### Scenario: Second close attempt during animation is ignored
- **WHEN** a close is in progress (View Transition running)
- **THEN** any additional close attempt (Escape, close button, backdrop) SHALL be a no-op until the transition completes

## ADDED Requirements

### Requirement: Dialog displays the selected image immediately on open
When the dialog is opened, the selected image SHALL be visible as soon as the opening animation completes. No previously viewed image SHALL appear at any point during the open sequence.

#### Scenario: Second open shows new image immediately
- **WHEN** a user opens the dialog for a second time by clicking a different thumbnail
- **THEN** the dialog SHALL display the newly selected image with no visible flash of the previously viewed image

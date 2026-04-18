# Spec: About Page — Contact Section

## Purpose

The contact section on the about page provides visitors with direct ways to reach Philippe LeSaux. It displays an Instagram link and an email address, each with an icon, and includes a copy-to-clipboard button for the email address with confirmation feedback.

---

## Requirements

### Requirement: Contact section displays Instagram and email entries
The about page SHALL include a contact section with two entries: an Instagram link and an email address. Each entry SHALL display an icon followed by the handle or address.

#### Scenario: Instagram entry is visible
- **WHEN** a user views the contact section
- **THEN** an Instagram icon and the handle `@flplsx` SHALL both be visible

#### Scenario: Instagram entry links to the profile
- **WHEN** a user clicks the Instagram entry
- **THEN** they SHALL be taken to the Instagram profile for `@flplsx`

#### Scenario: Email entry is visible
- **WHEN** a user views the contact section
- **THEN** an email icon and the address `photography@flplsx.com` SHALL both be visible

#### Scenario: Email address is not a clickable link
- **WHEN** a user views the email entry
- **THEN** the email address SHALL be displayed as plain text, not as a hyperlink

---

### Requirement: Contact section has a labelled heading
The contact section SHALL have a visible label identifying it as a contact section, consistent in style with other section labels on the page.

#### Scenario: Label is present
- **WHEN** a user views the contact section
- **THEN** a label SHALL appear above the Instagram and email entries

---

### Requirement: Copy-to-clipboard button copies the email address
The email entry SHALL include a copy button immediately to the right of the address. Activating it SHALL copy `photography@flplsx.com` to the clipboard.

#### Scenario: Copy button is present next to the email
- **WHEN** a user views the email entry
- **THEN** a copy button SHALL appear to the right of the email address

#### Scenario: Activating the copy button copies the address
- **WHEN** a user activates the copy button
- **THEN** `photography@flplsx.com` SHALL be copied to the system clipboard

---

### Requirement: Copy button shows confirmation feedback
After the email address is copied, the copy button SHALL change to a "copied" confirmation state for approximately 1.5 seconds, then return to its default appearance.

#### Scenario: Feedback appears immediately after copy
- **WHEN** a user activates the copy button
- **THEN** the button SHALL immediately change to a "copied" confirmation state

#### Scenario: Button resets after feedback duration
- **WHEN** approximately 1.5 seconds have elapsed after the copy action
- **THEN** the copy button SHALL return to its default appearance

## ADDED Requirements

### Requirement: Publications section appears on the about page
The about page SHALL include a Publications section below the two-column bio area, with a visible "Recent Publications" heading rendered at a larger size than the label-style headings used by other sections on the page (such as Contact).

#### Scenario: Section is present with heading
- **WHEN** a user views the about page
- **THEN** a section with the heading "Recent Publications" SHALL be visible below the headshot and bio content

#### Scenario: Heading is visually larger than section label headings
- **WHEN** a user views the about page
- **THEN** the "Recent Publications" heading SHALL appear noticeably larger than the "Contact" section label

---

### Requirement: Each publication entry displays a photo, publication name, article title, and author
Each entry in the Publications section SHALL display the photo that ran in the article, the name of the publication, the title of the article, and the name of the author.

#### Scenario: All four pieces of metadata are visible
- **WHEN** a user views a publication card
- **THEN** a photo, publication name, article title, and author credit SHALL all be visible on the card

---

### Requirement: Author credit optionally links to the author's profile
When a publication entry includes an author URL, the author credit on the card SHALL be rendered as a link to that URL, opening in a new tab. When no author URL is provided, the author credit SHALL render as plain text.

#### Scenario: Author credit is a link when URL is provided
- **WHEN** a user views a publication card that has an author URL
- **THEN** the author credit SHALL be a clickable link that opens the author's profile in a new tab

#### Scenario: Author credit is plain text when no URL is provided
- **WHEN** a user views a publication card with no author URL
- **THEN** the author credit SHALL be visible as plain text with no link behaviour

---

### Requirement: Each publication card links to the article
Each publication card SHALL provide two independent links to the article — one on the photo and one on the article title — both opening the article in a new tab.

#### Scenario: Clicking the photo opens the article
- **WHEN** a user clicks the photo on a publication card
- **THEN** the corresponding article SHALL open in a new browser tab

#### Scenario: Clicking the article title opens the article
- **WHEN** a user clicks the article title on a publication card
- **THEN** the corresponding article SHALL open in a new browser tab

---

### Requirement: Publication card photos display a hover effect
Each publication card photo SHALL respond to pointer hover with a visual scale effect, consistent with the portfolio grid hover behaviour.

#### Scenario: Photo scales on hover
- **WHEN** a user hovers over a publication card
- **THEN** the photo SHALL visibly scale up slightly

---

### Requirement: Publications section uses a two-column grid
The Publications section SHALL arrange cards in a two-column grid on all viewports where two columns fit comfortably.

#### Scenario: Two columns on desktop
- **WHEN** a user views the Publications section on a desktop viewport
- **THEN** the cards SHALL be arranged in two columns

#### Scenario: Single column on narrow viewports
- **WHEN** a user views the Publications section on a narrow mobile viewport
- **THEN** the cards SHALL stack in a single column

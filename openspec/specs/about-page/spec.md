# Spec: About Page

## Purpose

The about page introduces Philippe LeSaux with a headshot, role hierarchy, first-person bio, and publication credentials. It adapts between a single-column mobile layout and a two-column desktop layout, and integrates cleanly with the persistent navigation bar.

---

## Requirements

### Requirement: Page clears the fixed navigation bar
The about page content SHALL begin below the fixed navigation bar with sufficient vertical clearance so that no content is obscured.

#### Scenario: Content is not hidden behind the nav
- **WHEN** a user loads the about page
- **THEN** the first visible content element SHALL appear fully below the bottom edge of the navigation bar

---

### Requirement: Page content is width-constrained on wide viewports
The about page SHALL constrain its content to a maximum width and center it horizontally, preventing the layout from sprawling across the full viewport on wide screens.

#### Scenario: Content stays readable on a wide display
- **WHEN** the viewport is wider than the content max-width
- **THEN** the about content SHALL be horizontally centered with equal empty space on both sides

---

### Requirement: About page displays the subject's name as the primary heading
The about page SHALL render the subject's name as an `<h1>` element, serving as the primary document heading and identity anchor of the page.

#### Scenario: Name is present as h1
- **WHEN** a user views the about page
- **THEN** an `<h1>` element containing "Philippe LeSaux" SHALL be present in the page body

---

### Requirement: Roles are displayed with visual hierarchy
The about page SHALL display two roles — Photographer and Software Engineer — at equal visual weight, both in secondary text color, rendered on a single line.

#### Scenario: Both roles are present at equal weight
- **WHEN** a user views the roles section
- **THEN** "Photographer" and "Software Engineer" SHALL both be rendered in the secondary text color with identical typographic treatment

#### Scenario: Musician is not listed
- **WHEN** a user views the about page
- **THEN** "Musician" SHALL NOT appear as a role

---

### Requirement: Bio is written in first person
The about page bio SHALL use first-person voice.

#### Scenario: Bio uses first-person pronouns
- **WHEN** a user reads the bio paragraph
- **THEN** the text SHALL use "I" or "my" rather than "Philippe" or "he/his"

---

### Requirement: Credentials section lists publication appearances
The about page SHALL include a "Featured in" section listing Time Out, Edible, and Philly Mag as publications where the subject's photography has appeared.

#### Scenario: All three publications are listed
- **WHEN** a user views the credentials section
- **THEN** Time Out, Edible, and Philly Mag SHALL all be listed

#### Scenario: Credentials section has a label
- **WHEN** a user views the credentials section
- **THEN** a visible label "Featured in" SHALL precede the publication list

---

### Requirement: Credentials section is structured to accept logo assets
The credentials section markup SHALL include an icon slot per publication entry so that logo assets can be added in a future change without altering the list structure.

#### Scenario: Icon slot is present but visually inert without an asset
- **WHEN** no logo asset is provided for a publication
- **THEN** the icon slot SHALL render without visible content and SHALL NOT affect layout

---

### Requirement: Mobile layout stacks content vertically in reading order
On mobile viewports the about page SHALL display content in a single-column vertical stack: headshot first, followed by name, roles, credentials, and bio.

#### Scenario: Headshot appears first on mobile
- **WHEN** a user views the about page on a mobile viewport
- **THEN** the headshot image SHALL appear above all text content

#### Scenario: Roles appear directly after name on mobile
- **WHEN** a user views the about page on a mobile viewport
- **THEN** the roles line SHALL appear immediately below the name and above the credentials section

#### Scenario: Credentials appear before bio on mobile
- **WHEN** a user views the about page on a mobile viewport
- **THEN** the credentials section SHALL appear above the bio paragraph

---

### Requirement: Desktop layout uses a two-column arrangement
On viewports 768px and wider the about page SHALL display the headshot in a left column and the remaining content — name, roles, credentials, and bio — in a right column, in that order.

#### Scenario: Two columns are visible on desktop
- **WHEN** a user views the about page on a viewport of 768px or wider
- **THEN** the headshot SHALL occupy a left column and name, roles, credentials, and bio SHALL occupy a right column beside it

#### Scenario: Name and roles lead the content column on desktop
- **WHEN** a user views the about page on a viewport of 768px or wider
- **THEN** the name SHALL appear at the top of the content column with the roles line immediately below it, above credentials

---

### Requirement: Contact section appears below the bio in the content column
The about page content column SHALL include a contact section positioned below the bio paragraph, on both mobile and desktop viewports.

#### Scenario: Contact section is below the bio on mobile
- **WHEN** a user views the about page on a mobile viewport
- **THEN** the contact section SHALL appear below the bio paragraph

#### Scenario: Contact section is below the bio on desktop
- **WHEN** a user views the about page on a viewport of 768px or wider
- **THEN** the contact section SHALL appear below the bio paragraph in the right content column

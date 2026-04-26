# Spec: About Page

## Purpose

The about page introduces Philippe LeSaux with a headshot, role hierarchy, first-person bio, and contact information. It adapts between a single-column mobile layout and a two-column desktop layout, and integrates cleanly with the persistent navigation bar.

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

### Requirement: Mobile layout stacks content vertically in reading order
On mobile viewports the about page SHALL display content in a single-column vertical stack: headshot first, followed by name, roles, bio, and contact.

#### Scenario: Headshot appears first on mobile
- **WHEN** a user views the about page on a mobile viewport
- **THEN** the headshot image SHALL appear above all text content

#### Scenario: Roles appear directly after name on mobile
- **WHEN** a user views the about page on a mobile viewport
- **THEN** the roles line SHALL appear immediately below the name

#### Scenario: Bio follows roles on mobile
- **WHEN** a user views the about page on a mobile viewport
- **THEN** the bio paragraph SHALL appear below the roles line

---

### Requirement: Desktop layout uses a two-column arrangement
On viewports 768px and wider the about page SHALL display the headshot in a left column and the remaining content — name, roles, bio, and contact — in a right column, in that order.

#### Scenario: Two columns are visible on desktop
- **WHEN** a user views the about page on a viewport of 768px or wider
- **THEN** the headshot SHALL occupy a left column and name, roles, bio, and contact SHALL occupy a right column beside it

#### Scenario: Name and roles lead the content column on desktop
- **WHEN** a user views the about page on a viewport of 768px or wider
- **THEN** the name SHALL appear at the top of the content column with the roles line immediately below it

---

### Requirement: Contact section appears below the bio in the content column
The about page content column SHALL include a contact section positioned below the bio paragraph, on both mobile and desktop viewports.

#### Scenario: Contact section is below the bio on mobile
- **WHEN** a user views the about page on a mobile viewport
- **THEN** the contact section SHALL appear below the bio paragraph

#### Scenario: Contact section is below the bio on desktop
- **WHEN** a user views the about page on a viewport of 768px or wider
- **THEN** the contact section SHALL appear below the bio paragraph in the right content column

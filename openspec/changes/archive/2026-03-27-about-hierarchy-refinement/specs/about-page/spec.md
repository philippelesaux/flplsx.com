## ADDED Requirements

### Requirement: About page displays the subject's name as the primary heading
The about page SHALL render the subject's name as an `<h1>` element, serving as the primary document heading and identity anchor of the page.

#### Scenario: Name is present as h1
- **WHEN** a user views the about page
- **THEN** an `<h1>` element containing "Philippe LeSaux" SHALL be present in the page body

## MODIFIED Requirements

### Requirement: Roles are displayed with visual hierarchy
The about page SHALL display two roles — Photographer and Software Engineer — at equal visual weight, both in secondary text color, rendered on a single line.

#### Scenario: Both roles are present at equal weight
- **WHEN** a user views the roles section
- **THEN** "Photographer" and "Software Engineer" SHALL both be rendered in the secondary text color with identical typographic treatment

#### Scenario: Musician is not listed
- **WHEN** a user views the about page
- **THEN** "Musician" SHALL NOT appear as a role

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

### Requirement: Desktop layout uses a two-column arrangement
On viewports 768px and wider the about page SHALL display the headshot in a left column and the remaining content — name, roles, credentials, and bio — in a right column, in that order.

#### Scenario: Two columns are visible on desktop
- **WHEN** a user views the about page on a viewport of 768px or wider
- **THEN** the headshot SHALL occupy a left column and name, roles, credentials, and bio SHALL occupy a right column beside it

#### Scenario: Name and roles lead the content column on desktop
- **WHEN** a user views the about page on a viewport of 768px or wider
- **THEN** the name SHALL appear at the top of the content column with the roles line immediately below it, above credentials

## REMOVED Requirements

### Requirement: About page does not display the subject's name as a heading
**Reason**: The name is the page's primary identity anchor and should appear prominently in the page body as `<h1>`. The previous requirement was based on avoiding visual repetition with the nav, but semantic structure and visual treatment are independent — the nav name is functional, the page heading is identity.
**Migration**: Replaced by "About page displays the subject's name as the primary heading".

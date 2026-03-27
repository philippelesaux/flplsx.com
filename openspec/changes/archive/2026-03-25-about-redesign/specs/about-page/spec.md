## ADDED Requirements

### Requirement: Page clears the fixed navigation bar
The about page content SHALL begin below the fixed navigation bar with sufficient vertical clearance so that no content is obscured.

#### Scenario: Content is not hidden behind the nav
- **WHEN** a user loads the about page
- **THEN** the first visible content element SHALL appear fully below the bottom edge of the navigation bar

### Requirement: Page content is width-constrained on wide viewports
The about page SHALL constrain its content to a maximum width and center it horizontally, preventing the layout from sprawling across the full viewport on wide screens.

#### Scenario: Content stays readable on a wide display
- **WHEN** the viewport is wider than the content max-width
- **THEN** the about content SHALL be horizontally centered with equal empty space on both sides

### Requirement: About page does not display the subject's name as a heading
The about page SHALL NOT render the subject's name in a heading element, as it is already present in the persistent navigation bar.

#### Scenario: Name is not repeated on the page
- **WHEN** a user views the about page
- **THEN** no heading element SHALL contain "Philippe LeSaux"

### Requirement: Roles are displayed with visual hierarchy
The about page SHALL display three roles — Photographer, Software Engineer, and Musician — with Photographer visually distinguished as the primary role using the accent color, and the remaining two rendered in secondary text color.

#### Scenario: Photographer is visually distinct
- **WHEN** a user views the roles section
- **THEN** "Photographer" SHALL be rendered in the accent color and "Software Engineer" and "Musician" SHALL be rendered in the secondary text color

#### Scenario: All three roles are present
- **WHEN** a user views the about page
- **THEN** all three roles SHALL be visible: Photographer, Software Engineer, and Musician

### Requirement: Bio is written in first person
The about page bio SHALL use first-person voice.

#### Scenario: Bio uses first-person pronouns
- **WHEN** a user reads the bio paragraph
- **THEN** the text SHALL use "I" or "my" rather than "Philippe" or "he/his"

### Requirement: Credentials section lists publication appearances
The about page SHALL include a "Featured in" section listing Time Out, Edible, and Philly Mag as publications where the subject's photography has appeared.

#### Scenario: All three publications are listed
- **WHEN** a user views the credentials section
- **THEN** Time Out, Edible, and Philly Mag SHALL all be listed

#### Scenario: Credentials section has a label
- **WHEN** a user views the credentials section
- **THEN** a visible label "Featured in" SHALL precede the publication list

### Requirement: Credentials section is structured to accept logo assets
The credentials section markup SHALL include an icon slot per publication entry so that logo assets can be added in a future change without altering the list structure.

#### Scenario: Icon slot is present but visually inert without an asset
- **WHEN** no logo asset is provided for a publication
- **THEN** the icon slot SHALL render without visible content and SHALL NOT affect layout

### Requirement: Mobile layout stacks content vertically in reading order
On mobile viewports the about page SHALL display content in a single-column vertical stack: headshot first, followed by roles, bio, and credentials.

#### Scenario: Headshot appears before roles on mobile
- **WHEN** a user views the about page on a mobile viewport
- **THEN** the headshot image SHALL appear above the roles

### Requirement: Desktop layout uses a two-column arrangement
On viewports 768px and wider the about page SHALL display the headshot in a left column and the remaining content (roles, bio, credentials) in a right column.

#### Scenario: Two columns are visible on desktop
- **WHEN** a user views the about page on a viewport of 768px or wider
- **THEN** the headshot SHALL occupy a left column and roles, bio, and credentials SHALL occupy a right column beside it

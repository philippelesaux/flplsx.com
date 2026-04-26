## REMOVED Requirements

### Requirement: Credentials section lists publication appearances
**Reason**: Replaced by the dedicated Publications section.
**Migration**: Publication appearances are now shown in the Publications section below the two-column bio area.

### Requirement: Credentials section is structured to accept logo assets
**Reason**: The credentials section no longer exists; the Publications section uses photo cards instead.
**Migration**: No migration needed.

## MODIFIED Requirements

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

### Requirement: Desktop layout uses a two-column arrangement
On viewports 768px and wider the about page SHALL display the headshot in a left column and the remaining content — name, roles, bio, and contact — in a right column, in that order.

#### Scenario: Two columns are visible on desktop
- **WHEN** a user views the about page on a viewport of 768px or wider
- **THEN** the headshot SHALL occupy a left column and name, roles, bio, and contact SHALL occupy a right column beside it

#### Scenario: Name and roles lead the content column on desktop
- **WHEN** a user views the about page on a viewport of 768px or wider
- **THEN** the name SHALL appear at the top of the content column with the roles line immediately below it

## Requirements

### Requirement: Site uses a white background
The site body SHALL use a white background (`bg-white`), replacing the current dark background. All text and UI elements SHALL be updated for legibility against white.

#### Scenario: Body background is white
- **WHEN** any page on the site loads
- **THEN** the body background SHALL be white and all text SHALL be legible against it

#### Scenario: Thumbnail hover border is visible on white
- **WHEN** a user hovers over a portfolio thumbnail
- **THEN** the border SHALL appear in a light zinc tone (`zinc-200`) sufficient to be visible against a white background

### Requirement: Fraunces serif is used exclusively for the name "Philippe LeSaux"
The site SHALL load the Fraunces variable serif font and apply it only to occurrences of the name "Philippe LeSaux" — in the navigation bar and the about page H1. All other text SHALL remain in Plus Jakarta Sans.

#### Scenario: Name in nav uses Fraunces
- **WHEN** the navigation bar renders
- **THEN** the "Philippe LeSaux" link SHALL be rendered in Fraunces serif

#### Scenario: Name on about page uses Fraunces
- **WHEN** the about page loads
- **THEN** the H1 "Philippe LeSaux" SHALL be rendered in Fraunces serif

#### Scenario: Body text remains Plus Jakarta Sans
- **WHEN** any page renders
- **THEN** all text outside the name elements SHALL use Plus Jakarta Sans

### Requirement: Teal accent is used on the about page H1 only
Teal SHALL appear exactly once on the site: as the text color of the about page H1 "Philippe LeSaux", at `teal-600`. All other elements that previously used teal (nav hover underlines, etc.) SHALL use neutral zinc tones instead.

#### Scenario: About page H1 is teal
- **WHEN** the about page loads
- **THEN** the H1 "Philippe LeSaux" SHALL render in `teal-600`

#### Scenario: Nav hovers use neutral color
- **WHEN** a user hovers over a nav link
- **THEN** the underline SHALL be zinc, not teal

### Requirement: Portfolio thumbnails have sharp corners
Portfolio thumbnail images SHALL have no border radius (sharp corners), replacing the previous rounded treatment.

#### Scenario: Thumbnails render with sharp corners
- **WHEN** the portfolio grid renders
- **THEN** thumbnail images SHALL have square corners with no border radius

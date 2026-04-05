## Purpose

TBD — mobile navigation menu that replaces the inline link list with a hamburger button and dropdown panel on narrow viewports.

## Requirements

### Requirement: Hamburger button appears on mobile
On viewports narrower than 768px, the nav SHALL hide the link list and show a hamburger button in its place. On viewports 768px and wider, the hamburger button SHALL be hidden and the link list SHALL always be visible.

#### Scenario: Mobile viewport shows hamburger, not links
- **WHEN** the viewport width is less than 768px
- **THEN** the nav SHALL display a hamburger icon button and hide the inline link list

#### Scenario: Desktop viewport shows links, not hamburger
- **WHEN** the viewport width is 768px or wider
- **THEN** the nav SHALL display the inline link list and hide the hamburger button

### Requirement: Hamburger toggles a dropdown menu
Tapping the hamburger button SHALL open a dropdown panel below the nav bar containing all nav links. Tapping it again SHALL close the panel.

#### Scenario: Tapping hamburger opens dropdown
- **WHEN** the user taps the hamburger button while the menu is closed
- **THEN** the dropdown panel SHALL become visible with a clip-path reveal animation (~150ms)

#### Scenario: Tapping hamburger closes dropdown
- **WHEN** the user taps the hamburger button while the menu is open
- **THEN** the dropdown panel SHALL hide with a clip-path close animation (~150ms)

#### Scenario: Tapping a link closes the menu
- **WHEN** the user taps a link inside the open dropdown
- **THEN** the dropdown SHALL close immediately

### Requirement: Dropdown background matches the nav
The dropdown panel and nav bar SHALL display the same translucent white background (`rgb(255 255 255 / 0.9)` with `backdrop-filter: blur(8px)`) whenever the menu is open. Opening the menu SHALL force the nav into the `scrolled` visual state regardless of scroll position, so both surfaces are visually consistent. Closing the menu SHALL restore the nav to the correct state based on actual scroll position.

#### Scenario: Opening menu at scroll=0 forces nav to scrolled state
- **WHEN** the user opens the mobile menu while at the top of the page (scrollY === 0)
- **THEN** the nav SHALL display the translucent white background matching the dropdown panel

#### Scenario: Closing menu restores correct nav state
- **WHEN** the user closes the mobile menu
- **THEN** the nav SHALL restore to its correct state — transparent at scroll=0, translucent white if scrolled

#### Scenario: Dropdown background is consistent when scrolled
- **WHEN** the dropdown is open and the page is already scrolled
- **THEN** both nav and panel SHALL display the same translucent white background

### Requirement: Dropdown panel spacing aligns with page content
The dropdown panel SHALL use `var(--space-8)` padding on all sides so that the left edge of link text aligns with the nav name and page content (both use `var(--space-8)` horizontal margins). List items SHALL be separated by `var(--space-8)` vertical gap to provide clear visual breathing room.

#### Scenario: Link text aligns with nav name
- **WHEN** the mobile menu is open
- **THEN** the left edge of each link SHALL align with the left edge of the "Philippe LeSaux" nav name

#### Scenario: Items have generous vertical spacing
- **WHEN** the mobile menu is open
- **THEN** each list item SHALL be separated by `var(--space-8)` of vertical space

### Requirement: Hamburger icon is vertically centered with the nav name
The hamburger button SHALL be vertically centered relative to the nav bar in all states, so that it aligns with the "Philippe LeSaux" name both when the name is large (hero state, `text-3xl`) and when it is normal size (scrolled state, `text-xl`). The nav uses `align-items: baseline` for typographic alignment of text links; the hamburger SHALL use `align-self: center` to opt out of baseline alignment and center itself within the flex container instead.

#### Scenario: Hamburger aligns with large name at scroll=0
- **WHEN** the page is at scroll=0 with a hero and the name is rendered at `text-3xl`
- **THEN** the hamburger icon SHALL be vertically centered with the name

#### Scenario: Hamburger aligns with normal name when scrolled
- **WHEN** the page is scrolled and the name is rendered at `text-xl`
- **THEN** the hamburger icon SHALL be vertically centered with the name

### Requirement: Hamburger button communicates open state via ARIA
The hamburger button SHALL update its `aria-expanded` and `aria-label` attributes to reflect the current open/closed state of the menu, so that the state is accessible to assistive technologies.

#### Scenario: ARIA attributes reflect open state
- **WHEN** the hamburger button is clicked and the menu opens
- **THEN** the button's `aria-expanded` attribute SHALL be `"true"`
- **THEN** the button's `aria-label` SHALL be `"Close menu"`

#### Scenario: ARIA attributes reflect closed state
- **WHEN** the hamburger button is clicked and the menu closes
- **THEN** the button's `aria-expanded` attribute SHALL be `"false"`
- **THEN** the button's `aria-label` SHALL be `"Open menu"`

### Requirement: Hamburger icon inherits nav text color
The hamburger icon SHALL use `currentColor` for its stroke so it automatically matches the nav's text color in all states (white over hero, dark when scrolled).

#### Scenario: Hamburger is white over hero
- **WHEN** the page is at scroll position 0 on a page with a hero
- **THEN** the hamburger icon SHALL be white

#### Scenario: Hamburger is dark when scrolled
- **WHEN** the page is scrolled (scrollY > 0)
- **THEN** the hamburger icon SHALL render in the dark text color

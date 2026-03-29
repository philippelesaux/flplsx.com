# Spec: navigation-script

## Purpose

Defines the extracted navigation factory modules and the contracts for `initNavigation` and `initScrollNav`. Navigation and scroll logic lives in `src/scripts/navigation.ts` and `src/scripts/scroll-nav.ts` respectively; the `<script>` blocks in `NavigationBar.astro` and `BaseLayout.astro` are minimal factory calls.

## Requirements

### Requirement: initNavigation factory is exported from src/scripts/navigation.ts
`src/scripts/navigation.ts` SHALL export a named function `initNavigation(navEl: HTMLElement, menuEl: HTMLElement, heroEl: Element | null): () => void`. All three parameters SHALL be passed in from the call site — the module SHALL NOT query `document` internally. The `menuEl` parameter is required separately because the mobile menu is a DOM sibling of the nav element, not a descendant.

#### Scenario: Module exports initNavigation
- **WHEN** `src/scripts/navigation.ts` is imported
- **THEN** a named export `initNavigation` is available with signature `(navEl: HTMLElement, menuEl: HTMLElement, heroEl: Element | null): () => void`

### Requirement: initScrollNav factory is exported from src/scripts/scroll-nav.ts
`src/scripts/scroll-nav.ts` SHALL export a named function `initScrollNav(navEl: HTMLElement, heroEl: Element | null): () => void`. It SHALL attach a passive scroll listener and call `update()` once on init.

#### Scenario: Module exports initScrollNav
- **WHEN** `src/scripts/scroll-nav.ts` is imported
- **THEN** a named export `initScrollNav` is available with signature `(navEl: HTMLElement, heroEl: Element | null): () => void`

### Requirement: NavigationBar.astro and BaseLayout.astro script blocks are minimal factory calls
Both `<script>` blocks SHALL contain only element queries and factory calls. No menu or scroll logic SHALL remain inline.

#### Scenario: NavigationBar script block contains no logic
- **WHEN** `NavigationBar.astro`'s `<script>` block is read
- **THEN** it contains only imports, element queries, and one `initNavigation(...)` call

#### Scenario: BaseLayout script block contains no logic
- **WHEN** `BaseLayout.astro`'s `<script>` block is read
- **THEN** it contains only imports, element queries, and one `initScrollNav(...)` call

### Requirement: Mobile menu opens and closes
`initNavigation` SHALL toggle the mobile menu open state. When opened, the menu SHALL have class `open` and the hamburger aria attributes SHALL reflect the open state. When closed, they SHALL revert.

#### Scenario: Menu opens on hamburger click
- **WHEN** the hamburger button is clicked and the menu is closed
- **THEN** the menu element gains class `open`
- **THEN** the hamburger `aria-expanded` attribute is `"true"`
- **THEN** the hamburger `aria-label` is `"Close menu"`

#### Scenario: Menu closes on second hamburger click
- **WHEN** the hamburger button is clicked and the menu is open
- **THEN** the menu element loses class `open`
- **THEN** the hamburger `aria-expanded` attribute is `"false"`
- **THEN** the hamburger `aria-label` is `"Open menu"`

#### Scenario: Menu closes when a nav link is clicked
- **WHEN** a link inside the mobile menu is clicked
- **THEN** the menu element loses class `open`

### Requirement: Scroll state updates nav classes
`initScrollNav` SHALL toggle `scrolled` on the nav element when the page is scrolled, and toggle `hero-visible` when at the top of the page with a hero element present.

#### Scenario: Nav gains scrolled class when page is scrolled
- **WHEN** the page is scrolled below the top
- **THEN** the nav element has class `scrolled`
- **THEN** the nav element does not have class `hero-visible`

#### Scenario: Nav gains hero-visible class at top with hero
- **WHEN** the page is at scroll position 0 and a hero element is present
- **THEN** the nav element has class `hero-visible`
- **THEN** the nav element does not have class `scrolled`

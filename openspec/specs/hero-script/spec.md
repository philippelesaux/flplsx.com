# Spec: hero-script

## Purpose

Defines the extracted `initHero` factory module and the contract for the hero slideshow initialisation function. The hero slideshow logic lives in `src/scripts/hero.ts`; `Hero.astro`'s `<script>` block is a minimal factory call.

## Requirements

### Requirement: initHero factory is exported from src/scripts/hero.ts
`src/scripts/hero.ts` SHALL export a named function `initHero(root: HTMLElement): () => void`. The function SHALL initialise the slideshow and return a teardown function that stops the interval.

#### Scenario: Module exports initHero
- **WHEN** `src/scripts/hero.ts` is imported
- **THEN** a named export `initHero` is available with signature `(root: HTMLElement): () => void`

### Requirement: Hero.astro script block is a minimal factory call
`Hero.astro`'s `<script>` block SHALL contain only the import of `initHero` and a single call passing the hero root element. No slideshow logic SHALL remain inline.

#### Scenario: Script block contains no logic
- **WHEN** `Hero.astro`'s `<script>` block is read
- **THEN** it contains only an import statement and one `initHero(...)` call

### Requirement: First image is active on initialisation
On `initHero(root)` call, the first `.image` element inside `root` SHALL have the `active` class added immediately.

#### Scenario: First image activated
- **WHEN** `initHero(root)` is called with a root containing image elements
- **THEN** the first image has class `active`
- **THEN** no other images have class `active`

### Requirement: Slideshow advances on interval
After initialisation, the active image SHALL cycle forward every 5000ms, wrapping from last to first.

#### Scenario: Next image becomes active after interval
- **WHEN** 5000ms elapses after `initHero(root)` is called
- **THEN** the first image loses class `active`
- **THEN** the second image gains class `active`

#### Scenario: Wraps from last to first
- **WHEN** the last image is active and 5000ms elapses
- **THEN** the last image loses class `active`
- **THEN** the first image gains class `active`

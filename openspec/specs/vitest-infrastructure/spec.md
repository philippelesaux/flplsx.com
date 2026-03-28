# Capability: Vitest Infrastructure

## Purpose

Establishes the testing infrastructure using Vitest with jsdom, including configuration, package scripts, and documented mock patterns for browser APIs not supported in jsdom.

## Requirements

### Requirement: Vitest is installed and configured
The project SHALL have `vitest` and `@vitest/ui` as dev dependencies. A `vitest.config.ts` SHALL exist at the project root, configuring `environment: 'jsdom'` and including `src/scripts/**/*.test.ts` in the test glob.

#### Scenario: npm run test executes without error
- **WHEN** `npm run test` is run with no test files present
- **THEN** Vitest exits with code 0 (or a "no test files found" warning, not an error)

#### Scenario: Test file is discovered automatically
- **WHEN** a file matching `src/scripts/**/*.test.ts` exists
- **THEN** `npm run test` discovers and runs it without additional configuration

### Requirement: package.json has test scripts
`package.json` SHALL include a `"test"` script running `vitest run` and a `"test:ui"` script running `vitest --ui`. CLAUDE.md SHALL document these commands alongside `dev`, `build`, and `preview`.

#### Scenario: Test script is documented in CLAUDE.md
- **WHEN** CLAUDE.md lists available commands
- **THEN** `npm run test` and `npm run test:ui` are listed with brief descriptions

### Requirement: jsdom mock requirements are documented
CLAUDE.md SHALL document that `IntersectionObserver` and `dialog.showModal()` are not natively supported in jsdom and SHALL specify the mock pattern to use in test setup files.

#### Scenario: IntersectionObserver mock is documented
- **WHEN** a test file imports a module that uses IntersectionObserver
- **THEN** CLAUDE.md specifies the standard mock to add (global stub in vitest setup file)

#### Scenario: HTMLDialogElement mock is documented
- **WHEN** a test file imports a module that calls dialog.showModal() or dialog.close()
- **THEN** CLAUDE.md specifies that these methods must be stubbed on the element instance in tests

## Context

After `consolidate-specs` archived seven implementation-prescribing specs and migrated their behavioral scenarios into feature specs, four test files were left with stale spec pointers and `describe` blocks that no longer map to any requirement in the current spec library. The `rules.tasks` in `config.yaml` specifies that Requirement headings map to `describe()` blocks and Scenario headings map to `it()` blocks, verbatim — that contract is currently broken.

## Goals / Non-Goals

**Goals:**
- Restore verifiable traceability between each `describe`/`it` block and a named spec Requirement/Scenario
- Remove describe blocks with no spec counterpart
- Update stale spec reference comments

**Non-Goals:**
- Adding new test coverage
- Changing test assertions or implementation under test
- Modifying any spec file
- Applying TDD workflow (these are test metadata changes, not behavioral changes)

## Decisions

**Remove orphaned factory-export describe blocks entirely**
Each test file has a `describe('Requirement: initX factory is exported from src/scripts/x.ts')` block left over from the deleted script-contract specs. Options: remove, or replace with a matching spec requirement. Decision: remove — there is no behavioral spec requirement they could map to, and the export is implicitly tested by every other `describe` block that calls the function.

**Verbatim heading alignment only — no assertion changes**
Only `describe` and `it` strings are updated to match spec headings exactly. No test logic, setup, or assertion code changes. This keeps the diff reviewable and prevents accidental behavioral drift.

**One spec reference comment per test file, listing all covered specs**
Format: `// Specs: openspec/specs/<name>/spec.md, openspec/specs/<name>/spec.md`

## Risks / Trade-offs

**Removing a passing test** — The factory-export tests pass today. Removing them reduces the raw test count. Mitigation: the behavior they exercised (function exists and is callable) is covered by every remaining test in the file.

**Verbatim headings expose spec wording in tests** — If a spec requirement heading changes in the future, the test heading will drift again. This is the intended design — the drift becomes visible rather than silent.

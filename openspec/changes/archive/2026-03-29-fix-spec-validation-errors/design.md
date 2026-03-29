## Context

The OpenSpec validator requires every spec to have both `## Purpose` and `## Requirements` sections. 7 specs predate this requirement and were written without a Purpose section.

## Goals / Non-Goals

**Goals:**
- All 7 specs pass `openspec validate --specs`

**Non-Goals:**
- Changing any requirements or scenarios
- Restructuring or rewriting existing content

## Decisions

### Decision: Prepend `## Purpose` to each failing spec

Add a single `## Purpose` section at the top of each spec, derived from the existing requirements content. No other content is modified.

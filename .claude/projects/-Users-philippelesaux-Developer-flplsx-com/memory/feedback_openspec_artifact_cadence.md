---
name: OpenSpec artifact cadence preference
description: User prefers to create one artifact at a time, reviewing between each step — not all at once
type: feedback
---

Use `/opsx:new` (not `/opsx:propose`) when starting a change after an explore session. Stop after `proposal.md` and wait for the user to review before continuing.

**Why:** User wants a review gate at each artifact — proposal → design → tasks — rather than having all three generated in one shot.

**How to apply:** After explore, suggest `/opsx:new` to scaffold the change and draft only `proposal.md`. Then use `/opsx:continue` for each subsequent artifact, one at a time.

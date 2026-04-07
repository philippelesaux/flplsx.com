## Context

Grid images currently have a position-based `transition-delay` applied as an inline style at render time (`index * 75ms`). This causes images already in the viewport on page load to appear with a noticeable artificial delay before fading in.

## Goals / Non-Goals

**Goals:**
- Images fade in immediately when they enter the viewport, with no delay
- The existing fade-in animation (opacity transition) is preserved

**Non-Goals:**
- Changing the fade-in animation itself (duration, easing, translate)
- Changing how the IntersectionObserver detects intersection

## Decisions

**Remove inline `transition-delay` at the template level.**
The stagger delay is set as an inline style at render time (`index * 75ms`). Removing it requires only deleting that attribute from the template — no JS change is needed. The IntersectionObserver already adds the `visible` class immediately on intersection; the delay is purely a CSS concern.

No alternative mechanism (e.g., a CSS-only stagger via `nth-child`) should replace it — the goal is no delay at all.

## Risks / Trade-offs

- Without stagger, many images may fade in simultaneously on load — this is the intended outcome, not a risk
- No rollback complexity; the change is a one-line template deletion

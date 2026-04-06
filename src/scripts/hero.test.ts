// Spec: openspec/specs/hero-carousel/spec.md
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initHero } from './hero';

function buildRoot(count: number): HTMLElement {
    const root = document.createElement('div');
    for (let i = 0; i < count; i++) {
        const img = document.createElement('img');
        img.className = 'image';
        root.appendChild(img);
    }
    return root;
}

describe('Requirement: Carousel initialises with the first image active', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('Scenario: First image is active on load', () => {
        const root = buildRoot(3);
        const images = Array.from(root.querySelectorAll('.image'));
        initHero(root);
        expect(images[0]!.classList.contains('active')).toBe(true);
        expect(images[1]!.classList.contains('active')).toBe(false);
        expect(images[2]!.classList.contains('active')).toBe(false);
    });
});

describe('Requirement: Carousel auto-advances via crossfade', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('Scenario: Slides advance automatically', () => {
        const root = buildRoot(3);
        const images = Array.from(root.querySelectorAll('.image'));
        initHero(root);
        vi.advanceTimersByTime(5000);
        expect(images[0]!.classList.contains('active')).toBe(false);
        expect(images[1]!.classList.contains('active')).toBe(true);
    });

    it('Scenario: Slides wrap from last to first', () => {
        const root = buildRoot(3);
        const images = Array.from(root.querySelectorAll('.image'));
        initHero(root);
        vi.advanceTimersByTime(5000 * 3);
        expect(images[0]!.classList.contains('active')).toBe(true);
        expect(images[1]!.classList.contains('active')).toBe(false);
        expect(images[2]!.classList.contains('active')).toBe(false);
    });
});

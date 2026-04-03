// Spec: openspec/specs/hero-script/spec.md
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

describe('Requirement: initHero factory is exported from src/scripts/hero.ts', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('Scenario: Module exports initHero', () => {
        expect(typeof initHero).toBe('function');
    });

    it('Scenario: Teardown stops the interval', () => {
        const root = buildRoot(3);
        const images = Array.from(root.querySelectorAll('.image'));
        const teardown = initHero(root);
        vi.advanceTimersByTime(5000);
        expect(images[1]!.classList.contains('active')).toBe(true);
        teardown();
        vi.advanceTimersByTime(5000);
        expect(images[1]!.classList.contains('active')).toBe(true);
        expect(images[2]!.classList.contains('active')).toBe(false);
    });
});

describe('Requirement: First image is active on initialisation', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('Scenario: First image activated', () => {
        const root = buildRoot(3);
        const images = Array.from(root.querySelectorAll('.image'));
        initHero(root);
        expect(images[0]!.classList.contains('active')).toBe(true);
        expect(images[1]!.classList.contains('active')).toBe(false);
        expect(images[2]!.classList.contains('active')).toBe(false);
    });
});

describe('Requirement: Slideshow advances on interval', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('Scenario: Next image becomes active after interval', () => {
        const root = buildRoot(3);
        const images = Array.from(root.querySelectorAll('.image'));
        initHero(root);
        vi.advanceTimersByTime(5000);
        expect(images[0]!.classList.contains('active')).toBe(false);
        expect(images[1]!.classList.contains('active')).toBe(true);
    });

    it('Scenario: Wraps from last to first', () => {
        const root = buildRoot(3);
        const images = Array.from(root.querySelectorAll('.image'));
        initHero(root);
        vi.advanceTimersByTime(5000 * 3);
        expect(images[0]!.classList.contains('active')).toBe(true);
        expect(images[1]!.classList.contains('active')).toBe(false);
        expect(images[2]!.classList.contains('active')).toBe(false);
    });
});

// Spec: openspec/specs/scroll-aware-nav/spec.md
import { describe, expect, it } from 'vitest';
import { initScrollNav } from './scroll-nav';

function buildNav(): HTMLElement {
    return document.createElement('nav');
}

describe('Requirement: Nav scroll state is reflected via CSS classes', () => {
    it('Scenario: Nav has hero-visible class at top of hero page', () => {
        const navEl = buildNav();
        const heroEl = document.createElement('section');
        initScrollNav(navEl, heroEl);
        expect(navEl.classList.contains('hero-visible')).toBe(true);
        expect(navEl.classList.contains('scrolled')).toBe(false);
    });

    // Extra-spec: implicit negative of "Nav gains hero-visible class at top with hero"
    it('Scenario: Nav has neither class at top of non-hero page', () => {
        const navEl = buildNav();
        initScrollNav(navEl, null);
        expect(navEl.classList.contains('hero-visible')).toBe(false);
        expect(navEl.classList.contains('scrolled')).toBe(false);
    });

    it('Scenario: Nav has scrolled class when page is scrolled', () => {
        const navEl = buildNav();
        const heroEl = document.createElement('section');
        initScrollNav(navEl, heroEl);
        Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
        window.dispatchEvent(new Event('scroll'));
        expect(navEl.classList.contains('scrolled')).toBe(true);
        expect(navEl.classList.contains('hero-visible')).toBe(false);
    });

    it('Scenario: Nav returns to transparent when scrolled back to top', () => {
        const navEl = buildNav();
        const heroEl = document.createElement('section');
        initScrollNav(navEl, heroEl);
        Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
        window.dispatchEvent(new Event('scroll'));
        Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
        window.dispatchEvent(new Event('scroll'));
        expect(navEl.classList.contains('hero-visible')).toBe(true);
        expect(navEl.classList.contains('scrolled')).toBe(false);
    });
});

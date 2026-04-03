// Spec: openspec/specs/navigation-script/spec.md + openspec/specs/scroll-aware-nav/spec.md
import { describe, expect, it } from 'vitest';
import { initScrollNav } from './scroll-nav';

function buildNav(): HTMLElement {
    return document.createElement('nav');
}

describe('Requirement: initScrollNav factory is exported from src/scripts/scroll-nav.ts', () => {
    it('Scenario: Module exports initScrollNav', () => {
        expect(typeof initScrollNav).toBe('function');
    });
});

describe('Requirement: Scroll state updates nav classes', () => {
    it('Scenario: Nav gains hero-visible class at top with hero', () => {
        const navEl = buildNav();
        const heroEl = document.createElement('section');
        initScrollNav(navEl, heroEl);
        expect(navEl.classList.contains('hero-visible')).toBe(true);
        expect(navEl.classList.contains('scrolled')).toBe(false);
    });

    // Extra-spec: implicit negative of "Nav gains hero-visible class at top with hero"
    it('Scenario: Nav has neither class at top without hero', () => {
        const navEl = buildNav();
        initScrollNav(navEl, null);
        expect(navEl.classList.contains('hero-visible')).toBe(false);
        expect(navEl.classList.contains('scrolled')).toBe(false);
    });

    it('Scenario: Nav gains scrolled class when page is scrolled', () => {
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

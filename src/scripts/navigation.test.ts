// Spec: openspec/specs/navigation-script/spec.md
import { describe, expect, it } from 'vitest';
import { initNavigation } from './navigation';

interface NavFixture {
    navEl: HTMLElement;
    menuEl: HTMLElement;
    hamburger: HTMLButtonElement;
    link: HTMLAnchorElement;
}

function buildNav(): NavFixture {
    const navEl = document.createElement('nav');
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    navEl.appendChild(hamburger);

    const menuEl = document.createElement('div');
    const link = document.createElement('a');
    link.href = '#';
    menuEl.appendChild(link);

    return { navEl, menuEl, hamburger, link };
}

describe('Requirement: initNavigation factory is exported from src/scripts/navigation.ts', () => {
    it('Scenario: Module exports initNavigation', () => {
        expect(typeof initNavigation).toBe('function');
    });

    // Extra-spec: positionMenu is called on init, setting menuEl.style.top
    it('Scenario: menuEl.style.top is set on initialisation', () => {
        const { navEl, menuEl } = buildNav();
        initNavigation(navEl, menuEl, null);
        expect(menuEl.style.top).toBe('0px');
    });
});

describe('Requirement: Mobile menu opens and closes', () => {
    it('Scenario: Menu opens on hamburger click', () => {
        const { navEl, menuEl, hamburger } = buildNav();
        initNavigation(navEl, menuEl, null);
        hamburger.click();
        expect(menuEl.classList.contains('open')).toBe(true);
        expect(hamburger.getAttribute('aria-expanded')).toBe('true');
        expect(hamburger.getAttribute('aria-label')).toBe('Close menu');
    });

    it('Scenario: Menu closes on second hamburger click', () => {
        const { navEl, menuEl, hamburger } = buildNav();
        initNavigation(navEl, menuEl, null);
        hamburger.click();
        hamburger.click();
        expect(menuEl.classList.contains('open')).toBe(false);
        expect(hamburger.getAttribute('aria-expanded')).toBe('false');
        expect(hamburger.getAttribute('aria-label')).toBe('Open menu');
    });

    it('Scenario: Menu closes when a nav link is clicked', () => {
        const { navEl, menuEl, hamburger, link } = buildNav();
        initNavigation(navEl, menuEl, null);
        hamburger.click();
        expect(menuEl.classList.contains('open')).toBe(true);
        link.click();
        expect(menuEl.classList.contains('open')).toBe(false);
    });
});

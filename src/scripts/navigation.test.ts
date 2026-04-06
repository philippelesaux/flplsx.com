// Spec: openspec/specs/mobile-nav-menu/spec.md
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

describe('Requirement: Hamburger toggles a dropdown menu', () => {
    it('Scenario: Tapping hamburger opens dropdown', () => {
        const { navEl, menuEl, hamburger } = buildNav();
        initNavigation(navEl, menuEl, null);
        hamburger.click();
        expect(menuEl.classList.contains('open')).toBe(true);
        expect(hamburger.getAttribute('aria-expanded')).toBe('true');
        expect(hamburger.getAttribute('aria-label')).toBe('Close menu');
    });

    it('Scenario: Tapping hamburger closes dropdown', () => {
        const { navEl, menuEl, hamburger } = buildNav();
        initNavigation(navEl, menuEl, null);
        hamburger.click();
        hamburger.click();
        expect(menuEl.classList.contains('open')).toBe(false);
        expect(hamburger.getAttribute('aria-expanded')).toBe('false');
        expect(hamburger.getAttribute('aria-label')).toBe('Open menu');
    });

    it('Scenario: Tapping a link closes the menu', () => {
        const { navEl, menuEl, hamburger, link } = buildNav();
        initNavigation(navEl, menuEl, null);
        hamburger.click();
        expect(menuEl.classList.contains('open')).toBe(true);
        link.click();
        expect(menuEl.classList.contains('open')).toBe(false);
    });
});

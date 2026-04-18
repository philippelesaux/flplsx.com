// Specs: openspec/specs/about-page-contact/spec.md
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initContact } from './contact';

function buildContact(): { root: HTMLElement; copyBtn: HTMLButtonElement } {
    const root = document.createElement('section');

    const emailRow = document.createElement('div');
    const copyBtn = document.createElement('button');
    copyBtn.dataset.copyEmail = '';
    emailRow.appendChild(copyBtn);
    root.appendChild(emailRow);

    return { root, copyBtn };
}

beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('navigator', {
        clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
});

afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
});

describe('Requirement: Copy-to-clipboard button copies the email address', () => {
    it('Scenario: Activating the copy button copies the address', async () => {
        // WHEN a user activates the copy button
        // THEN photography@flplsx.com SHALL be copied to the system clipboard
        const { root, copyBtn } = buildContact();
        initContact(root);
        copyBtn.click();
        await Promise.resolve();
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('photography@flplsx.com');
    });
});

describe('Requirement: Copy button shows confirmation feedback', () => {
    it('Scenario: Feedback appears immediately after copy', async () => {
        // WHEN a user activates the copy button
        // THEN the button SHALL immediately change to a "copied" confirmation state
        const { root, copyBtn } = buildContact();
        initContact(root);
        copyBtn.click();
        await Promise.resolve();
        expect(copyBtn.dataset.copied).toBe('');
    });

    it('Scenario: Button resets after feedback duration', async () => {
        // WHEN approximately 1.5 seconds have elapsed after the copy action
        // THEN the copy button SHALL return to its default appearance
        const { root, copyBtn } = buildContact();
        initContact(root);
        copyBtn.click();
        await Promise.resolve();
        expect(copyBtn.dataset.copied).toBe('');
        vi.advanceTimersByTime(1500);
        expect(copyBtn.dataset.copied).toBeUndefined();
    });
});

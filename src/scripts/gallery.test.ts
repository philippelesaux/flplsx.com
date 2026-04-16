// Specs: openspec/specs/image-expand-dialog/spec.md, openspec/specs/grid-entrance-animations/spec.md
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initGallery } from './gallery';

interface VTDocument {
    startViewTransition?: (cb: () => void) => { finished: Promise<void> };
}

interface ImageData {
    display: string;
    alt: string;
    title: string;
    location: string;
}

interface GalleryFixture {
    gridEl: HTMLElement;
    dialog: HTMLDialogElement;
    thumbBtns: HTMLButtonElement[];
    thumbImgs: HTMLImageElement[];
    dialogImg: HTMLImageElement;
    dialogTitle: HTMLElement;
    dialogLocation: HTMLElement;
    closeBtn: HTMLButtonElement;
    prevBtn: HTMLButtonElement;
    nextBtn: HTMLButtonElement;
}

function buildGallery(images: ImageData[]): GalleryFixture {
    const gridEl = document.createElement('div');
    const thumbBtns: HTMLButtonElement[] = [];
    const thumbImgs: HTMLImageElement[] = [];

    images.forEach(img => {
        const btn = document.createElement('button');
        btn.className = 'thumb-btn';
        btn.dataset.display = img.display;
        btn.dataset.alt = img.alt;
        btn.dataset.title = img.title;
        btn.dataset.location = img.location;
        const thumbImg = document.createElement('img');
        thumbImg.className = 'thumb-img';
        btn.appendChild(thumbImg);
        gridEl.appendChild(btn);
        thumbBtns.push(btn);
        thumbImgs.push(thumbImg);
    });

    const dialog = document.createElement('dialog') as HTMLDialogElement;
    dialog.showModal = vi.fn();
    dialog.close = vi.fn();

    const dialogImg = document.createElement('img');
    dialogImg.className = 'dialog-img';
    // Simulate cached image so the preload wait is skipped in tests
    Object.defineProperty(dialogImg, 'complete', { get: () => true, configurable: true });

    const dialogTitle = document.createElement('span');
    dialogTitle.className = 'dialog-title';

    const dialogLocation = document.createElement('span');
    dialogLocation.className = 'dialog-location';

    const closeBtn = document.createElement('button');
    closeBtn.dataset.close = '';

    const prevBtn = document.createElement('button');
    prevBtn.dataset.prev = '';

    const nextBtn = document.createElement('button');
    nextBtn.dataset.next = '';

    dialog.append(dialogImg, dialogTitle, dialogLocation, closeBtn, prevBtn, nextBtn);

    return { gridEl, dialog, thumbBtns, thumbImgs, dialogImg, dialogTitle, dialogLocation, closeBtn, prevBtn, nextBtn };
}

const TEST_IMAGES: ImageData[] = [
    { display: '/img/a.jpg', alt: 'Image A', title: 'Title A', location: 'Location A' },
    { display: '/img/b.jpg', alt: 'Image B', title: 'Title B', location: 'Location B' },
    { display: '/img/c.jpg', alt: 'Image C', title: 'Title C', location: 'Location C' },
];

function syncVTMock(): void {
    (document as unknown as VTDocument).startViewTransition = vi.fn((cb: () => void) => {
        cb();
        return { finished: Promise.resolve() };
    });
}

afterEach(() => {
    delete (document as unknown as VTDocument).startViewTransition;
});

describe('Requirement: Thumbnail opens full-size image in a dialog', () => {
    it('Scenario: Thumbnail click opens dialog', async () => {
        syncVTMock();
        const { gridEl, dialog, thumbBtns, dialogImg, dialogTitle, dialogLocation } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        thumbBtns[0]!.click();
        await Promise.resolve();
        expect(dialog.showModal).toHaveBeenCalled();
        expect(dialogImg.src).toContain(TEST_IMAGES[0]!.display);
        expect(dialogTitle.textContent).toBe(TEST_IMAGES[0]!.title);
        expect(dialogLocation.textContent).toBe(TEST_IMAGES[0]!.location);
    });
});


describe('Requirement: Dialog is dismissible', () => {
    it('Scenario: Close button closes dialog', async () => {
        syncVTMock();
        const { gridEl, dialog, thumbBtns, closeBtn } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        thumbBtns[0]!.click();
        await Promise.resolve();
        closeBtn.click();
        await Promise.resolve();
        expect(dialog.close).toHaveBeenCalled();
    });

    it('Scenario: Backdrop click closes dialog', async () => {
        syncVTMock();
        const { gridEl, dialog, thumbBtns } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        thumbBtns[0]!.click();
        await Promise.resolve();
        dialog.click();
        await Promise.resolve();
        expect(dialog.close).toHaveBeenCalled();
    });

    it('Scenario: Click in image letterbox area closes dialog', async () => {
        // WHEN the user clicks in the transparent letterbox area around the contained image
        // THEN the dialog SHALL close
        syncVTMock();
        const { gridEl, dialog, thumbBtns, dialogImg } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        thumbBtns[0]!.click();
        await Promise.resolve();

        // Mock a 400x300 element containing a 100x200 portrait image
        // Portrait image in landscape element → pillarboxed: rendered 150x300, offset 125px left/right
        vi.spyOn(dialogImg, 'getBoundingClientRect').mockReturnValue({
            left: 0, top: 0, width: 400, height: 300,
            right: 400, bottom: 300, x: 0, y: 0, toJSON: () => ({})
        });
        Object.defineProperty(dialogImg, 'naturalWidth', { get: () => 100, configurable: true });
        Object.defineProperty(dialogImg, 'naturalHeight', { get: () => 200, configurable: true });

        // Click at x=10 — inside left pillarbox (rendered image starts at x=125)
        dialogImg.dispatchEvent(new MouseEvent('click', { clientX: 10, clientY: 150, bubbles: true }));
        await Promise.resolve();
        expect(dialog.close).toHaveBeenCalled();
    });

    it('Scenario: Click on the rendered image does not close dialog', async () => {
        // WHEN the user clicks on the actual image content
        // THEN the dialog SHALL remain open
        syncVTMock();
        const { gridEl, dialog, thumbBtns, dialogImg } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        thumbBtns[0]!.click();
        await Promise.resolve();

        // Same 400x300 element, 100x200 portrait image — rendered 150x300, starts at x=125
        vi.spyOn(dialogImg, 'getBoundingClientRect').mockReturnValue({
            left: 0, top: 0, width: 400, height: 300,
            right: 400, bottom: 300, x: 0, y: 0, toJSON: () => ({})
        });
        Object.defineProperty(dialogImg, 'naturalWidth', { get: () => 100, configurable: true });
        Object.defineProperty(dialogImg, 'naturalHeight', { get: () => 200, configurable: true });
        (dialog.close as ReturnType<typeof vi.fn>).mockClear();

        // Click at x=200 — inside rendered image (x=125 to x=275)
        dialogImg.dispatchEvent(new MouseEvent('click', { clientX: 200, clientY: 150, bubbles: true }));
        await Promise.resolve();
        expect(dialog.close).not.toHaveBeenCalled();
    });
});

describe('Requirement: View Transitions morph animation on open and close', () => {
    it('Scenario: Escape key close triggers morph animation', async () => {
        syncVTMock();
        const { gridEl, dialog, thumbBtns } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        thumbBtns[0]!.click();
        await Promise.resolve();
        const cancelEvent = new Event('cancel', { cancelable: true });
        const preventDefaultSpy = vi.spyOn(cancelEvent, 'preventDefault');
        dialog.dispatchEvent(cancelEvent);
        await Promise.resolve();
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(dialog.close).toHaveBeenCalled();
    });

    it('Scenario: View Transitions unavailable — dialog opens directly', async () => {
        // No startViewTransition on document — fallback path
        const { gridEl, dialog, thumbBtns } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        thumbBtns[0]!.click();
        expect(dialog.showModal).toHaveBeenCalled();
        const cancelEvent = new Event('cancel', { cancelable: true });
        dialog.dispatchEvent(cancelEvent);
        expect(dialog.close).toHaveBeenCalled();
    });
});

describe('Requirement: Transitioning guard prevents concurrent close calls', () => {
    it('Scenario: Second close attempt during animation is ignored', async () => {
        // Phase 1: open with a sync VT mock so transitioning resets to false after open
        syncVTMock();
        const { gridEl, dialog, thumbBtns, closeBtn } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        thumbBtns[0]!.click();
        await Promise.resolve(); // openDialog settles, transitioning = false

        // Phase 2: switch to deferred VT mock for closeDialog
        let resolveVT!: () => void;
        (document as unknown as VTDocument).startViewTransition = vi.fn((cb: () => void) => {
            cb();
            return { finished: new Promise<void>(resolve => { resolveVT = resolve; }) };
        });
        (dialog.close as ReturnType<typeof vi.fn>).mockClear();

        // First close — VT callback runs synchronously, dialog.close called once,
        // but .finished is deferred so transitioning stays true
        closeBtn.click();
        expect(dialog.close).toHaveBeenCalledTimes(1);

        // Second close attempt during in-flight transition — no-op
        closeBtn.click();
        await Promise.resolve();
        expect(dialog.close).toHaveBeenCalledTimes(1);

        // Resolve the transition — transitioning resets to false
        resolveVT();
        await Promise.resolve();
        await Promise.resolve(); // extra tick for .finished chain to settle

        // Third close works again
        closeBtn.click();
        expect(dialog.close).toHaveBeenCalledTimes(2);
    });
});

describe('Requirement: Dialog displays the selected image immediately on open', () => {
    it('Scenario: Second open shows new image immediately', async () => {
        // First open — image A
        syncVTMock();
        const { gridEl, dialog, thumbBtns, dialogImg } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);

        thumbBtns[0]!.click();
        await Promise.resolve();
        await Promise.resolve(); // settle .finished

        // Close
        const closeBtn = dialog.querySelector<HTMLButtonElement>('[data-close]')!;
        closeBtn.click();
        await Promise.resolve();
        await Promise.resolve();

        // Second open — capture dialogImg.src at the moment startViewTransition is called.
        // It must already contain image B's URL (preloaded before the VT starts),
        // not the previously displayed image A.
        let srcAtVTStart = '';
        (document as unknown as VTDocument).startViewTransition = vi.fn((cb: () => void) => {
            srcAtVTStart = dialogImg.src;
            cb();
            return { finished: Promise.resolve() };
        });

        thumbBtns[1]!.click();
        await Promise.resolve();

        expect(srcAtVTStart).toContain(TEST_IMAGES[1]!.display);
    });
});

describe('Requirement: Keyboard arrow navigation', () => {
    it('Scenario: ArrowRight navigates to the next photo', async () => {
        syncVTMock();
        const { gridEl, dialog, thumbBtns, dialogImg } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        thumbBtns[0]!.click();
        await Promise.resolve();
        dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
        expect(dialogImg.src).toContain(TEST_IMAGES[1]!.display);
    });

    it('Scenario: ArrowLeft navigates to the previous photo', async () => {
        syncVTMock();
        const { gridEl, dialog, thumbBtns, dialogImg } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        thumbBtns[1]!.click();
        await Promise.resolve();
        dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
        expect(dialogImg.src).toContain(TEST_IMAGES[0]!.display);
    });

    it('Scenario: Navigation wraps at boundaries', async () => {
        syncVTMock();
        const { gridEl, dialog, thumbBtns, dialogImg } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        thumbBtns[2]!.click();
        await Promise.resolve();
        dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
        expect(dialogImg.src).toContain(TEST_IMAGES[0]!.display);
        dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
        expect(dialogImg.src).toContain(TEST_IMAGES[2]!.display);
    });
});

interface MockTouchEvent extends Event {
    touches: { clientX: number; clientY: number }[];
    changedTouches: { clientX: number; clientY: number }[];
}

function dispatchSwipe(target: EventTarget, dx: number, dy = 0): void {
    const startX = 200, startY = 200;
    const mkEvent = (type: string, touches: object[], changedTouches: object[]): MockTouchEvent => {
        const e = new Event(type, { bubbles: true }) as MockTouchEvent;
        Object.defineProperty(e, 'touches', { value: touches });
        Object.defineProperty(e, 'changedTouches', { value: changedTouches });
        return e;
    };
    target.dispatchEvent(mkEvent('touchstart', [{ clientX: startX, clientY: startY }], []));
    target.dispatchEvent(mkEvent('touchend', [], [{ clientX: startX + dx, clientY: startY + dy }]));
}

describe('Requirement: Swipe gesture navigation', () => {
    it('Scenario: Swipe left navigates to the next photo', async () => {
        syncVTMock();
        const { gridEl, dialog, thumbBtns, dialogImg } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        thumbBtns[0]!.click();
        await Promise.resolve();
        dispatchSwipe(dialog, -80);
        expect(dialogImg.src).toContain(TEST_IMAGES[1]!.display);
    });

    it('Scenario: Swipe right navigates to the previous photo', async () => {
        syncVTMock();
        const { gridEl, dialog, thumbBtns, dialogImg } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        thumbBtns[1]!.click();
        await Promise.resolve();
        dispatchSwipe(dialog, 80);
        expect(dialogImg.src).toContain(TEST_IMAGES[0]!.display);
    });

    it('Scenario: Vertical swipe does not navigate', async () => {
        syncVTMock();
        const { gridEl, dialog, thumbBtns, dialogImg } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        thumbBtns[0]!.click();
        await Promise.resolve();
        dispatchSwipe(dialog, 20, 100);
        expect(dialogImg.src).toContain(TEST_IMAGES[0]!.display);
    });
});

describe('Requirement: Screen reader navigation', () => {
    it('Scenario: Navigation announces new photo to screen readers', async () => {
        // aria-live="polite" on .dialog-meta means the browser announces when
        // textContent changes — here we verify the DOM updates on navigate
        syncVTMock();
        const { gridEl, dialog, thumbBtns, dialogTitle, dialogLocation } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        thumbBtns[0]!.click();
        await Promise.resolve();
        dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
        expect(dialogTitle.textContent).toBe(TEST_IMAGES[1]!.title);
        expect(dialogLocation.textContent).toBe(TEST_IMAGES[1]!.location);
    });

    it('Scenario: Previous and next controls are reachable by screen readers', () => {
        const { gridEl, dialog, prevBtn, nextBtn } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        expect(dialog.contains(prevBtn)).toBe(true);
        expect(dialog.contains(nextBtn)).toBe(true);
    });
});

describe('Requirement: Portfolio grid images fade in on scroll', () => {
    let capturedObserverCb: IntersectionObserverCallback;
    const mockUnobserve = vi.fn();

    beforeEach(() => {
        mockUnobserve.mockClear();
        vi.stubGlobal(
            'IntersectionObserver',
            class {
                constructor(cb: IntersectionObserverCallback) {
                    capturedObserverCb = cb;
                }
                observe = vi.fn();
                unobserve = mockUnobserve;
                disconnect = vi.fn();
            },
        );
    });

    it('Scenario: Image gains visible class when intersecting', () => {
        const { gridEl, dialog, thumbImgs } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        const entry = { isIntersecting: true, target: thumbImgs[0]! } as unknown as IntersectionObserverEntry;
        capturedObserverCb([entry], {} as IntersectionObserver);
        expect(thumbImgs[0]!.classList.contains('visible')).toBe(true);
    });

    it('Scenario: Observer stops watching after first intersection', () => {
        const { gridEl, dialog, thumbImgs } = buildGallery(TEST_IMAGES);
        initGallery(gridEl, dialog);
        const entry = { isIntersecting: true, target: thumbImgs[0]! } as unknown as IntersectionObserverEntry;
        capturedObserverCb([entry], {} as IntersectionObserver);
        expect(mockUnobserve).toHaveBeenCalledWith(thumbImgs[0]!);
    });
});

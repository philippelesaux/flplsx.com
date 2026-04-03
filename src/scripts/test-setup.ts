import { beforeEach, vi } from 'vitest';

vi.stubGlobal(
    'IntersectionObserver',
    class {
        observe(): void {}
        unobserve(): void {}
        disconnect(): void {}
    },
);

beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
});

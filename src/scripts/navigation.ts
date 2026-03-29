export function initNavigation(
    navEl: HTMLElement,
    menuEl: HTMLElement,
    heroEl: Element | null,
): () => void {
    const hamburger = navEl.querySelector<HTMLButtonElement>('.hamburger');
    const ac = new AbortController();
    const { signal } = ac;

    function positionMenu(): void {
        menuEl.style.top = navEl.offsetHeight + 'px';
    }

    positionMenu();
    window.addEventListener('resize', positionMenu, { passive: true, signal });

    function open(): void {
        navEl.classList.add('scrolled');
        navEl.classList.remove('hero-visible');
        menuEl.classList.add('open');
        hamburger?.setAttribute('aria-expanded', 'true');
        hamburger?.setAttribute('aria-label', 'Close menu');

        const start = performance.now();
        function track(now: number): void {
            positionMenu();
            if (now - start < 300) requestAnimationFrame(track);
        }
        requestAnimationFrame(track);
    }

    function close(): void {
        menuEl.classList.remove('open');
        const scrolled = window.scrollY > 0;
        navEl.classList.toggle('scrolled', scrolled);
        navEl.classList.toggle('hero-visible', !scrolled && heroEl !== null);
        hamburger?.setAttribute('aria-expanded', 'false');
        hamburger?.setAttribute('aria-label', 'Open menu');
    }

    hamburger?.addEventListener('click', () => {
        menuEl.classList.contains('open') ? close() : open();
    }, { signal });

    menuEl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', close, { signal });
    });

    return () => ac.abort();
}

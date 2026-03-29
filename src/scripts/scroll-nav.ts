export function initScrollNav(navEl: HTMLElement, heroEl: Element | null): () => void {
    const ac = new AbortController();
    const { signal } = ac;

    function update(): void {
        const scrolled = window.scrollY > 0;
        navEl.classList.toggle('scrolled', scrolled);
        navEl.classList.toggle('hero-visible', !scrolled && heroEl !== null);
    }

    window.addEventListener('scroll', update, { passive: true, signal });
    update();

    return () => ac.abort();
}

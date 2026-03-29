export function initHero(root: HTMLElement): () => void {
    const images = Array.from(root.querySelectorAll<HTMLImageElement>('.image'));
    if (images.length === 0) return () => {};

    let current = 0;
    images[0]!.classList.add('active');

    const interval = setInterval(() => {
        images[current]!.classList.remove('active');
        current = (current + 1) % images.length;
        images[current]!.classList.add('active');
    }, 5000);

    return () => clearInterval(interval);
}

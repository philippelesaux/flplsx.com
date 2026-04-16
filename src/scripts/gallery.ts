interface GalleryImage {
    src: string;
    alt: string;
    title: string;
    location: string;
}

type VTDocument = Document & {
    startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

function setVTName(el: HTMLElement, name: string): void {
    if (name) {
        el.style.setProperty('view-transition-name', name);
    } else {
        el.style.removeProperty('view-transition-name');
    }
}

export function initGallery(gridEl: HTMLElement, dialog: HTMLDialogElement): () => void {
    const dialogImg = dialog.querySelector<HTMLImageElement>('.dialog-img')!;
    const dialogTitle = dialog.querySelector<HTMLElement>('.dialog-title')!;
    const dialogLocation = dialog.querySelector<HTMLElement>('.dialog-location')!;
    const buttons = Array.from(gridEl.querySelectorAll<HTMLButtonElement>('.thumb-btn'));
    const thumbImgs = buttons.map(btn => btn.querySelector<HTMLImageElement>('.thumb-img')!);
    const doc = document as VTDocument;
    const ac = new AbortController();
    const { signal } = ac;

    const images: GalleryImage[] = buttons.map(btn => ({
        src: btn.dataset.display ?? '',
        alt: btn.dataset.alt ?? '',
        title: btn.dataset.title ?? '',
        location: btn.dataset.location ?? '',
    }));

    let currentIndex = 0;
    let transitioning = false;

    function populate(index: number): void {
        const img = images[index]!;
        dialogImg.src = img.src;
        dialogImg.alt = img.alt;
        dialogTitle.textContent = img.title;
        dialogLocation.textContent = img.location;
    }

    async function openDialog(index: number): Promise<void> {
        if (transitioning) return;
        transitioning = true;
        buttons.forEach(btn => setVTName(btn, ''));
        setVTName(dialogImg, '');
        currentIndex = index;

        populate(index);
        if (!dialogImg.complete) {
            await new Promise<void>(resolve => {
                dialogImg.onload = () => resolve();
                dialogImg.onerror = () => resolve();
            });
        }

        if (doc.startViewTransition) {
            setVTName(buttons[index]!, 'active-photo');
            await doc.startViewTransition(() => {
                setVTName(buttons[index]!, '');
                dialog.showModal();
                setVTName(dialogImg, 'active-photo');
            }).finished;
            setVTName(dialogImg, '');
            transitioning = false;
        } else {
            dialog.showModal();
            transitioning = false;
        }
    }

    async function closeDialog(): Promise<void> {
        if (transitioning) return;
        if (doc.startViewTransition) {
            transitioning = true;
            setVTName(dialogImg, 'active-photo');
            await doc.startViewTransition(() => {
                setVTName(dialogImg, '');
                setVTName(buttons[currentIndex]!, 'active-photo');
                dialog.close();
            }).finished;
            setVTName(buttons[currentIndex]!, '');
            transitioning = false;
        } else {
            dialog.close();
        }
    }

    function navigate(delta: number): void {
        currentIndex = (currentIndex + delta + images.length) % images.length;
        populate(currentIndex);
    }

    buttons.forEach((btn, i) => {
        btn.addEventListener('click', () => openDialog(i), { signal });
    });

    dialog.querySelector('[data-close]')!.addEventListener('click', closeDialog, { signal });
    dialog.querySelector('[data-prev]')!.addEventListener('click', () => navigate(-1), { signal });
    dialog.querySelector('[data-next]')!.addEventListener('click', () => navigate(1), { signal });

    dialog.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    }, { signal });

    let touchStartX = 0;
    let touchStartY = 0;

    dialog.addEventListener('touchstart', (e: TouchEvent) => {
        touchStartX = e.touches[0]!.clientX;
        touchStartY = e.touches[0]!.clientY;
    }, { signal, passive: true });

    dialog.addEventListener('touchend', (e: TouchEvent) => {
        const dx = e.changedTouches[0]!.clientX - touchStartX;
        const dy = e.changedTouches[0]!.clientY - touchStartY;
        if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy)) return;
        navigate(dx > 0 ? -1 : 1);
    }, { signal, passive: true });

    dialog.addEventListener('click', (e: MouseEvent) => {
        if (e.target === dialog) closeDialog();
    }, { signal });

    dialogImg.addEventListener('click', (e: MouseEvent) => {
        const { naturalWidth, naturalHeight } = dialogImg;
        if (!naturalWidth || !naturalHeight) {
            closeDialog();
            return;
        }
        const rect = dialogImg.getBoundingClientRect();
        const naturalRatio = naturalWidth / naturalHeight;
        const elemRatio = rect.width / rect.height;
        let renderedW: number, renderedH: number;
        if (naturalRatio > elemRatio) {
            renderedW = rect.width;
            renderedH = rect.width / naturalRatio;
        } else {
            renderedW = rect.height * naturalRatio;
            renderedH = rect.height;
        }
        const ox = (rect.width - renderedW) / 2;
        const oy = (rect.height - renderedH) / 2;
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        if (cx < ox || cx > ox + renderedW || cy < oy || cy > oy + renderedH) {
            closeDialog();
        }
    }, { signal });

    dialog.addEventListener('cancel', (e: Event) => {
        e.preventDefault();
        closeDialog();
    }, { signal });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    img.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 },
    );

    thumbImgs.forEach(img => observer.observe(img));

    return () => {
        ac.abort();
        observer.disconnect();
    };
}

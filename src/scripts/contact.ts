export function initContact(root: HTMLElement): () => void {
    const ac = new AbortController();
    const { signal } = ac;

    const copyBtn = root.querySelector<HTMLButtonElement>('[data-copy-email]');
    if (!copyBtn) return () => ac.abort();

    copyBtn.addEventListener('click', () => {
        void navigator.clipboard.writeText('photography@flplsx.com').then(() => {
            copyBtn.dataset.copied = '';
            setTimeout(() => {
                delete copyBtn.dataset.copied;
            }, 1500);
        });
    }, { signal });

    return () => ac.abort();
}

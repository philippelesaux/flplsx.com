import { useEffect, useRef } from "react";
import type { AllImages } from "../pages/index.astro";

const STAGGER_DELAYS = ['delay-0', 'delay-75', 'delay-150', 'delay-200', 'delay-300'];

export default function Lightbox({ allImages }: { allImages: AllImages }) {
    const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

    useEffect(() => {
        const imgs = imgRefs.current.filter(Boolean) as HTMLImageElement[];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                        entry.target.classList.remove('opacity-0', 'translate-y-4');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        imgs.forEach((img) => observer.observe(img));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="p-2 mx-auto container gap-2 my-8 columns-2 md:columns-3 lg:columns-4 xl:columns-5">
            {allImages.map((entry, index) => (
                <img
                    key={entry.thumbnail.src}
                    ref={(el) => { imgRefs.current[index] = el; }}
                    src={entry.thumbnail.src}
                    alt={entry.alt}
                    width={400}
                    className={`rounded mb-1 border border-transparent hover:border-zinc-600 transition-all duration-500 ease-in-out hover:shadow-lg opacity-0 translate-y-4 ${STAGGER_DELAYS[index % STAGGER_DELAYS.length]}`}
                    loading="lazy"
                />
            ))}
        </div>
    );
}

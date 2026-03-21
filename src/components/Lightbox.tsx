import { useEffect, useRef } from "react";
import type { AllImages } from "../pages/index.astro";
import styles from "./Lightbox.module.css";

export default function Lightbox({ allImages }: { allImages: AllImages }) {
    const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

    useEffect(() => {
        const imgs = imgRefs.current.filter(Boolean) as HTMLImageElement[];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible!);
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
        <div className={styles.grid}>
            {allImages.map((entry, index) => (
                <img
                    key={entry.thumbnail.src}
                    ref={(el) => { imgRefs.current[index] = el; }}
                    src={entry.thumbnail.src}
                    alt={entry.alt}
                    width={400}
                    className={styles.thumbnail}
                    style={{ transitionDelay: `${index * 75}ms` }}
                    loading="lazy"
                />
            ))}
        </div>
    );
}

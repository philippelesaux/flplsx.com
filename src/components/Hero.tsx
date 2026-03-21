import { useState, useEffect } from "react";
import type { HeroImages } from "../pages/index.astro";
import styles from "./Hero.module.css";

export default function Hero({ heroImages }: { heroImages: HeroImages }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    return (
        <div data-hero="" className={styles.hero}>
            {heroImages.map((image, index) => (
                <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    className={`${styles.image} ${index === current ? styles.active : ""}`}
                />
            ))}
            <div className={styles.gradient} />
        </div>
    );
}

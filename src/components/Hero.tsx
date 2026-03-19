import { useState, useEffect } from "react";
import type { HeroImages } from "../pages/index.astro";

export default function Hero({ heroImages }: { heroImages: HeroImages }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    return (
        <div data-hero="" className="h-screen w-full relative overflow-hidden">
            {heroImages.map((image, index) => (
                <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        index === current ? "opacity-100" : "opacity-0"
                    }`}
                />
            ))}
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
        </div>
    );
}

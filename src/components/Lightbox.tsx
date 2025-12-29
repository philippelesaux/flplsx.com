import type { AllImages } from "../pages/index.astro";

export default function Lightbox({ allImages }: { allImages: AllImages }) {
    return (
        <div className="p-2 mx-auto container gap-2 my-8 columns-2 md:columns-3 lg:columns-4 xl:columns-5">
            {
                allImages.map((entry) => (
                    <img
                        src={entry.image.src}
                        alt={entry.alt}
                        width={entry.image.width}
                        className="rounded mb-1 border border-transparent hover:border-gray-300 transition-all duration-300 ease-in-out hover:shadow-lg"
                        loading="lazy"
                    />
                ))
            }
        </div>
    );
}
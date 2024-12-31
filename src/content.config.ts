import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const portfolio = defineCollection({
    loader: file('src/data/portfolio.json'),
    schema: ({ image }) => z.object({
        id: z.string(),
        title: z.string(),
        location: z.string(),
        image: image(),
        alt: z.string(),
    })
});

export const collections = {
    portfolio
};
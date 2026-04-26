import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
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

const press = defineCollection({
    loader: file('src/data/press.json'),
    schema: ({ image }) => z.object({
        id: z.string(),
        publication: z.string(),
        articleTitle: z.string(),
        author: z.string(),
        authorUrl: z.string().optional(),
        url: z.string(),
        image: image(),
        alt: z.string(),
    })
});

export const collections = {
    portfolio,
    press,
};
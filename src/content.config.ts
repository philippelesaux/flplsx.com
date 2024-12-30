import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const albums = defineCollection({
    loader: glob({ pattern: '**/*.yaml', base: './src/content/albums' }),
    schema: (context) =>
        z.object({
            title: z.string(),
            description: z.string().nullable(),
            cover: context.image()
        }),
});

export const collections = {
    albums,
};
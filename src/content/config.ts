import { defineCollection, z } from 'astro:content';

const albums = defineCollection({
    type: 'data',
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
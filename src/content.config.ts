import { defineCollection, z } from 'astro:content';
import {glob} from 'astro/loaders';

const works = defineCollection({
    loader: glob({
        pattern: '**/*.md',
        base: './src/content/works',
    }),
    schema: ({image}) => z.object({
        pubDate: z.date(),
        updatedDate: z.date(),
        title: z.string(),
        description: z.string(),
        image: image(),
        link: z.string(),
        stack: z.array(z.string()),
    }),
});

export const collections = {
    works,
};

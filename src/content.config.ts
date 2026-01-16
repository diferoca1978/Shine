import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
    loader: glob({
        pattern: '**/*.md',
        base: './src/content/works',
    }),
    schema: ({ image }) => z.object({
        pubDate: z.date(),
        updatedDate: z.date(),
        title: z.string(),
        description: z.string(),
        image: image(),
        link: z.string(),
        stack: z.array(z.string()),
    }),
});

const blog = defineCollection({
    loader: glob({
        pattern: '**/*.md',
        base: './src/content/blog',
    }),
    schema: ({ image }) => z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        pubDate: z.date(),
        modifiedDate: z.date().optional(),
        author: z.enum(['Diego Rodriguez', 'Rocio Parra']),
        image: image(),
        tags: z.array(z.string()).optional(),
        faqs: z.array(z.object({
            question: z.string(),
            answer: z.string(),
        })).optional(),
        draft: z.boolean().optional().default(false),
    }),
})

export const collections = {
    works,
    blog,
};

import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const bookmarks = defineCollection({
	loader: file("src/data/bookmarks.json"),
	schema: z.object({
		id: z.string(),
		category: z.string(),
		items: z.array(z.object({
			id: z.string(),
			name: z.string(),
			url: z.string().url(),
			desc: z.string().optional()
		}))
	})
});

const projects = defineCollection({
	loader: file("src/data/projects.json"),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		description: z.string(),
		language: z.string(),
		url: z.string().url(),
		stars: z.number().optional()
	})
});

export const collections = { blog, bookmarks, projects };

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
	loader: async () => {
		const { bookmarks } = await import('./data/bookmarks.json');
		return bookmarks.map(b => ({ id: b.id, ...b }));
	},
	schema: z.object({
		id: z.string(),
		category: z.string(),
		items: z.array(z.object({
			id: z.string(),
			name: z.string(),
			url: z.string(),
			desc: z.string().optional()
		}))
	})
});

const projects = defineCollection({
	loader: async () => {
		const { projects } = await import('./data/projects.json');
		return projects.map(p => ({ id: p.id, ...p }));
	},
	schema: z.object({
		id: z.string(),
		name: z.string(),
		description: z.string(),
		language: z.string(),
		url: z.string(),
		stars: z.number().optional()
	})
});

export const collections = { blog, bookmarks, projects };

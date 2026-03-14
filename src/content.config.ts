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
		// Return array as is to maintain physical order
		return bookmarks.map((b, index) => ({ id: b.id, ...b, _order: index }));
	},
	schema: z.object({
		id: z.string(),
		category: z.string(),
		_order: z.number().optional(),
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
		// Add an index-based order to override Astro's default ID-based sorting
		return projects.map((p, index) => ({ id: p.id, ...p, _order: index }));
	},
	schema: z.object({
		id: z.string(),
		name: z.string(),
		description: z.string(),
		language: z.string(),
		url: z.string(),
		stars: z.number().optional(),
		_order: z.number().optional()
	})
});

export const collections = { blog, bookmarks, projects };

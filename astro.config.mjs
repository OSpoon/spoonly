import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://spoonly.cn',
	output: 'server',
	adapter: vercel(),
	integrations: [react(), keystatic(), sitemap()],
	vite: {
		optimizeDeps: {
			include: ['react', 'react-dom', '@keystatic/core', '@keystatic/core/ui'],
		},
	},
	markdown: {
		syntaxHighlight: 'shiki',
		shikiConfig: {
			theme: 'github-light',
		},
		remarkPlugins: [remarkGfm, remarkMath],
		rehypePlugins: [
			rehypeSlug,
			[rehypeAutolinkHeadings, { behavior: 'append' }],
			[rehypeExternalLinks, { target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer'] }],
			rehypeKatex,
		],
	},
});

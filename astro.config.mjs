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
		build: {
			chunkSizeWarningLimit: 3000,
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (!id.includes('node_modules')) {
							return;
						}

						if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
							return 'react-vendor';
						}

						if (id.includes('@react-aria') || id.includes('@react-stately') || id.includes('@internationalized')) {
							return 'aria-vendor';
						}

						if (id.includes('@keystatic')) {
							return 'keystatic-vendor';
						}
					},
				},
			},
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

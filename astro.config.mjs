import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
	// 🚨 关键 1: 强制锁定站点域名和协议
	site: 'https://spoonly.cn',
	output: 'server',
	adapter: netlify(),
	integrations: [react(), keystatic()],
	vite: {
		optimizeDeps: {
			include: ['react', 'react-dom', '@keystatic/core', '@keystatic/core/ui'],
		},
		// 🚨 关键 2: 确保服务端变量能够被正确解构
		ssr: {
			noExternal: ['@keystatic/core', '@keystatic/astro'],
		},
	},
	markdown: {
		syntaxHighlight: false,
		remarkPlugins: [remarkGfm, remarkMath],
		rehypePlugins: [
			rehypeSlug,
			[rehypeAutolinkHeadings, { behavior: 'append' }],
			[rehypeExternalLinks, { target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer'] }],
			rehypeKatex,
		],
	},
});

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import settings from '../data/settings.json';

export const prerender = true;

export async function GET(context: { site?: URL }) {
	const posts = (await getCollection('blog'))
		.filter((post) => !post.data.isDraft || import.meta.env.DEV)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	return rss({
		title: `${settings.siteName} Blog`,
		description: settings.description,
		site: context.site ?? 'https://spoonly.cn',
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}`,
		})),
	});
}

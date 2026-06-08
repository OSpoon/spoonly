import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];

const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const isPrivateHost = (hostname) => {
	const normalized = hostname.toLowerCase();
	return (
		normalized === 'localhost' ||
		normalized === '127.0.0.1' ||
		normalized.startsWith('10.') ||
		normalized.startsWith('192.168.') ||
		/^172\.(1[6-9]|2\d|3[01])\./.test(normalized)
	);
};

const checkUrl = (label, value) => {
	if (!value) return;
	if (value.includes('example.com')) {
		failures.push(`${label}: placeholder URL/email uses example.com`);
	}

	let url;
	try {
		url = new URL(value);
	} catch {
		failures.push(`${label}: invalid URL "${value}"`);
		return;
	}

	if (url.protocol === 'file:') {
		failures.push(`${label}: file URLs are not public bookmarks`);
	}

	if ((url.protocol === 'http:' || url.protocol === 'https:') && isPrivateHost(url.hostname)) {
		failures.push(`${label}: private host "${url.hostname}" is not public content`);
	}
};

const settings = readJson('src/data/settings.json');
checkUrl('settings.social.github', settings.social?.github);
checkUrl('settings.social.email', settings.social?.email);

const about = readJson('src/data/about.json');
for (const link of about.connect ?? []) {
	checkUrl(`about.connect.${link.name}`, link.url);
}

const { bookmarks } = readJson('src/data/bookmarks.json');
const ids = new Set();
for (const group of bookmarks) {
	if (!group.id || !group.category) {
		failures.push(`bookmark group "${group.category ?? group.id ?? 'unknown'}": missing id or category`);
	}

	for (const item of group.items ?? []) {
		const key = `${group.id}/${item.id}`;
		if (ids.has(key)) {
			failures.push(`bookmark ${key}: duplicate id`);
		}
		ids.add(key);

		if (!item.name || !item.url) {
			failures.push(`bookmark ${key}: missing name or url`);
		}

		if (item.desc === 'Bookmark from browser') {
			failures.push(`bookmark ${key}: browser import placeholder description`);
		}

		checkUrl(`bookmark ${key}`, item.url);
	}
}

if (failures.length > 0) {
	console.error('Content validation failed:');
	for (const failure of failures) {
		console.error(`- ${failure}`);
	}
	process.exit(1);
}

console.log(`Content validation passed: ${ids.size} bookmarks checked.`);

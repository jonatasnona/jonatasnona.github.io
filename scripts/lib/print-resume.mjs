/**
 * Shared static server + Playwright A4 print for resume HTML pages.
 */
import { createServer } from 'node:http';
import { access } from 'node:fs/promises';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
export const DIST = join(ROOT, 'dist');
/** Astro `base` for the user site (`/`). */
export const BASE = '';

const MIME = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.ico': 'image/x-icon',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
	'.json': 'application/json',
	'.pdf': 'application/pdf',
};

function resolveFile(urlPath) {
	let pathname = decodeURIComponent(urlPath.split('?')[0]);
	if (BASE && pathname.startsWith(BASE)) pathname = pathname.slice(BASE.length) || '/';
	if (!pathname.startsWith('/')) pathname = `/${pathname}`;

	const candidates = [];
	if (pathname.endsWith('/')) {
		candidates.push(join(DIST, pathname, 'index.html'));
	} else {
		candidates.push(join(DIST, pathname));
		candidates.push(join(DIST, `${pathname}.html`));
		candidates.push(join(DIST, pathname, 'index.html'));
	}

	for (const file of candidates) {
		if (existsSync(file) && statSync(file).isFile()) return file;
	}
	return null;
}

export function startStaticServer() {
	return new Promise((resolve, reject) => {
		const server = createServer((req, res) => {
			const file = resolveFile(req.url || '/');
			if (!file) {
				res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
				res.end('Not found');
				return;
			}
			const type = MIME[extname(file).toLowerCase()] || 'application/octet-stream';
			res.writeHead(200, { 'Content-Type': type });
			createReadStream(file).pipe(res);
		});

		server.once('error', reject);
		server.listen(0, '127.0.0.1', () => {
			const { port } = server.address();
			resolve({ server, port });
		});
	});
}

export async function assertBrandResumeDist() {
	try {
		await access(join(DIST, 'resume', 'pt', 'index.html'));
	} catch {
		throw new Error('Missing dist/resume/pt/index.html — run `astro build` (or `npm run build:site`) first.');
	}
}

export async function assertRecruiterResumeDist(profile, locale) {
	const path = join(DIST, 'resume', 'recruiter', profile, locale, 'index.html');
	try {
		await access(path);
	} catch {
		throw new Error(
			`Missing ${path} — run \`npm run build:site\` first so recruiter pages exist in dist.`,
		);
	}
}

/**
 * @param {{ path: string, urlPath: string }} opts urlPath like `/resume/pt/` or `/resume/recruiter/default/en/`
 */
export async function printResumePdf({ path: outPath, urlPath }) {
	const { server, port } = await startStaticServer();
	const origin = `http://127.0.0.1:${port}${BASE}`;
	const browser = await chromium.launch({ headless: true });

	try {
		const page = await browser.newPage();
		const url = `${origin}${urlPath.startsWith('/') ? urlPath : `/${urlPath}`}`;
		console.log(`Printing ${url}`);
		await page.goto(url, { waitUntil: 'networkidle' });
		await page.emulateMedia({ media: 'print' });
		await page.pdf({
			path: outPath,
			format: 'A4',
			printBackground: true,
			margin: { top: '12mm', right: '14mm', bottom: '12mm', left: '14mm' },
		});
		await page.close();
	} finally {
		await browser.close();
		server.close();
	}
}

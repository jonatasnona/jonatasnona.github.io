#!/usr/bin/env node
/**
 * Build-time resume PDFs for every profile × locale.
 *
 * - brand → resume_jonatas_pedraza_{locale}.pdf
 * - default → resume_jonatas_pedraza_ats_{locale}.pdf
 * - other recruiter → resume_jonatas_pedraza_{profile}_{locale}.pdf
 *
 * Writes into public/resume/ and mirrors into dist/resume/ when dist exists.
 *
 * Usage (after `astro build` / `build:site`):
 *   node scripts/generate-resumes.mjs
 */
import { mkdir, copyFile, readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	assertBrandResumeDist,
	assertRecruiterResumeDist,
	startStaticServer,
	BASE,
} from './lib/print-resume.mjs';
import { resumePdfFilename, resumeHtmlUrlPath } from './lib/resume-files.mjs';
import { chromium } from 'playwright';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PROFILES_DIR = join(ROOT, 'src/resume/profiles');
const PUBLIC_RESUME = join(ROOT, 'public/resume');
const DIST_RESUME = join(ROOT, 'dist/resume');
const LOCALES = ['pt', 'en', 'es'];

/** Discover profile ids from `id: '…'` in profile modules (excludes index.ts). */
async function listProfileIds() {
	const files = (await readdir(PROFILES_DIR))
		.filter((f) => f.endsWith('.ts') && f !== 'index.ts')
		.sort();

	const ids = [];
	for (const file of files) {
		const source = await readFile(join(PROFILES_DIR, file), 'utf8');
		const match = source.match(/\bid:\s*'([^']+)'/);
		if (match) ids.push(match[1]);
	}
	return ids;
}

async function main() {
	const profileIds = await listProfileIds();
	await assertBrandResumeDist();
	await assertRecruiterResumeDist('default', 'pt');
	await mkdir(PUBLIC_RESUME, { recursive: true });
	await mkdir(DIST_RESUME, { recursive: true });

	const { server, port } = await startStaticServer();
	const origin = `http://127.0.0.1:${port}${BASE}`;
	const browser = await chromium.launch({ headless: true });

	const jobs = profileIds.flatMap((profileId) =>
		LOCALES.map((locale) => ({
			url: `${origin}${resumeHtmlUrlPath(profileId, locale)}`,
			filename: resumePdfFilename(profileId, locale),
		})),
	);

	try {
		for (const job of jobs) {
			const page = await browser.newPage();
			console.log(`Printing ${job.url}`);
			await page.goto(job.url, { waitUntil: 'networkidle' });
			await page.emulateMedia({ media: 'print' });

			const publicPath = join(PUBLIC_RESUME, job.filename);
			await page.pdf({
				path: publicPath,
				format: 'A4',
				printBackground: true,
				margin: { top: '12mm', right: '14mm', bottom: '12mm', left: '14mm' },
			});
			await copyFile(publicPath, join(DIST_RESUME, job.filename));
			await page.close();
			console.log(`Wrote ${job.filename}`);
		}
	} finally {
		await browser.close();
		server.close();
	}

	console.log(`Done — ${jobs.length} PDFs (${profileIds.length} profiles × ${LOCALES.length} locales).`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

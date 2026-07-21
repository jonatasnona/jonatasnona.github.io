#!/usr/bin/env node
/**
 * Build-time resume PDFs:
 * - brand: /resume/{locale}/ → resume_jonatas_pedraza_{locale}.pdf
 * - ATS default: /resume/recruiter/default/{locale}/ → resume_jonatas_pedraza_ats_{locale}.pdf
 *
 * Writes into public/resume/ and mirrors into dist/resume/ when dist exists.
 *
 * Usage (after `astro build` / `build:site`):
 *   node scripts/generate-resumes.mjs
 */
import { mkdir, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	assertBrandResumeDist,
	assertRecruiterResumeDist,
	startStaticServer,
	BASE,
} from './lib/print-resume.mjs';
import { chromium } from 'playwright';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_RESUME = join(ROOT, 'public/resume');
const DIST_RESUME = join(ROOT, 'dist/resume');
const LOCALES = ['pt', 'en', 'es'];
const ATS_PROFILE = 'default';

async function main() {
	await assertBrandResumeDist();
	await assertRecruiterResumeDist(ATS_PROFILE, 'pt');
	await mkdir(PUBLIC_RESUME, { recursive: true });
	await mkdir(DIST_RESUME, { recursive: true });

	const { server, port } = await startStaticServer();
	const origin = `http://127.0.0.1:${port}${BASE}`;
	const browser = await chromium.launch({ headless: true });

	const jobs = [
		...LOCALES.map((locale) => ({
			url: `${origin}/resume/${locale}/`,
			filename: `resume_jonatas_pedraza_${locale}.pdf`,
		})),
		...LOCALES.map((locale) => ({
			url: `${origin}/resume/recruiter/${ATS_PROFILE}/${locale}/`,
			filename: `resume_jonatas_pedraza_ats_${locale}.pdf`,
		})),
	];

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
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

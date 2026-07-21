#!/usr/bin/env node
/**
 * On-demand resume PDF for a named profile + locale.
 *
 * By default runs `astro build` first so copy/profile changes are reflected.
 * Use `--no-build` only when you know `dist/` is already fresh.
 *
 * Usage:
 *   npm run resume -- --profile backend-node --locale en
 *   npm run resume -- --profile brand --locale pt
 *   npm run resume -- --list
 */
import { spawn } from 'node:child_process';
import { mkdir, readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	assertBrandResumeDist,
	assertRecruiterResumeDist,
	printResumePdf,
} from './lib/print-resume.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PROFILES_DIR = join(ROOT, 'src/resume/profiles');
const LOCALES = new Set(['pt', 'en', 'es']);

function printHelp(profileIds) {
	console.log(`Usage:
  npm run resume -- --profile <id> --locale <pt|en|es> [--out <dir>] [--no-build]

Options:
  --profile   Resume preset id (default: default)
  --locale    pt | en | es (default: pt)
  --out       Output directory (default: out/resume)
  --no-build  Skip astro build (use existing dist/)
  --list      List known profile ids
  -h, --help  Show help

Known profiles:
  ${profileIds.join(', ')}
`);
}

function parseArgs(argv) {
	const opts = {
		profile: 'default',
		locale: 'pt',
		outDir: join(ROOT, 'out/resume'),
		list: false,
		help: false,
		build: true,
	};

	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		if (arg === '--profile') opts.profile = argv[++i] ?? opts.profile;
		else if (arg === '--locale') opts.locale = argv[++i] ?? opts.locale;
		else if (arg === '--out') opts.outDir = argv[++i] ?? opts.outDir;
		else if (arg === '--no-build') opts.build = false;
		else if (arg === '--list') opts.list = true;
		else if (arg === '--help' || arg === '-h') opts.help = true;
		else if (arg.startsWith('-')) {
			throw new Error(`Unknown flag: ${arg}`);
		}
	}

	return opts;
}

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

function runBuildSite() {
	return new Promise((resolve, reject) => {
		console.log('Building site (astro build) so resume HTML is up to date…');
		const child = spawn('npm', ['run', 'build:site'], {
			cwd: ROOT,
			stdio: 'inherit',
			shell: process.platform === 'win32',
		});
		child.on('error', reject);
		child.on('exit', (code) => {
			if (code === 0) resolve();
			else reject(new Error(`build:site failed with exit code ${code}`));
		});
	});
}

async function main() {
	const opts = parseArgs(process.argv.slice(2));
	const ids = await listProfileIds();

	if (opts.help) {
		printHelp(ids);
		return;
	}
	if (opts.list) {
		const width = Math.max(...ids.map((id) => id.length), 'PROFILE'.length);
		console.log(`${'PROFILE'.padEnd(width)}  MODE`);
		for (const id of ids) {
			const mode = id === 'brand' ? 'brand' : 'recruiter';
			console.log(`${id.padEnd(width)}  ${mode}`);
		}
		return;
	}

	if (!LOCALES.has(opts.locale)) {
		throw new Error(`Invalid locale "${opts.locale}". Use: pt, en, es`);
	}
	if (!ids.includes(opts.profile)) {
		throw new Error(`Unknown profile "${opts.profile}". Known: ${ids.join(', ')}`);
	}

	if (opts.build) {
		await runBuildSite();
	}

	await mkdir(opts.outDir, { recursive: true });

	const filename = `Jonatas-Pedraza-${opts.profile}-${opts.locale}.pdf`;
	const outPath = join(opts.outDir, filename);

	if (opts.profile === 'brand') {
		await assertBrandResumeDist();
		await printResumePdf({
			path: outPath,
			urlPath: `/resume/${opts.locale}/`,
		});
	} else {
		await assertRecruiterResumeDist(opts.profile, opts.locale);
		await printResumePdf({
			path: outPath,
			urlPath: `/resume/recruiter/${opts.profile}/${opts.locale}/`,
		});
	}

	console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
	console.error(err.message || err);
	process.exit(1);
});

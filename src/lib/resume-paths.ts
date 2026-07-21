import type { Locale } from '../site.config';
import { siteConfig } from '../site.config';

/**
 * Public PDF path for a resume profile + locale (under `public/resume/`).
 * Keep in sync with `scripts/lib/resume-files.mjs`.
 */
export function resumePublicPdfPath(profileId: string, locale: Locale): string {
	if (profileId === 'brand') return siteConfig.resumePath[locale];
	if (profileId === 'default') return siteConfig.resumeAtsPath[locale];
	return `/resume/resume_jonatas_pedraza_${profileId}_${locale}.pdf`;
}

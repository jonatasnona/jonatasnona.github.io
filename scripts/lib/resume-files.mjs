/**
 * Public PDF filenames for resume profiles.
 * Keep in sync with `src/lib/resume-paths.ts`.
 */

/** @param {string} profileId @param {string} locale */
export function resumePdfFilename(profileId, locale) {
	if (profileId === 'brand') return `resume_jonatas_pedraza_${locale}.pdf`;
	if (profileId === 'default') return `resume_jonatas_pedraza_ats_${locale}.pdf`;
	return `resume_jonatas_pedraza_${profileId}_${locale}.pdf`;
}

/** @param {string} profileId @param {string} locale */
export function resumeHtmlUrlPath(profileId, locale) {
	if (profileId === 'brand') return `/resume/${locale}/`;
	return `/resume/recruiter/${profileId}/${locale}/`;
}

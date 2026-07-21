import type { Locale } from '../site.config';

/** How the printable resume is composed. */
export type ResumeMode = 'brand' | 'recruiter';

/** Short copy keyed by site locale. */
export type LocalizedCopy = Record<Locale, string>;

/**
 * Named resume preset — what to emphasize when generating a PDF.
 * Does not own role narratives; those stay in `src/content/`.
 * Profiles only select, order, and frame content for a target.
 */
export type ResumeProfile = {
	/** Stable CLI / path id (`backend-node`, `architect`, …). */
	id: string;
	/** Human label for docs and future CLI help. */
	label: LocalizedCopy;
	/** One-line intent: when to pick this preset. */
	description: LocalizedCopy;
	mode: ResumeMode;
	/**
	 * Title line on the resume (may differ from the site hero).
	 * Example: "Software Engineer (Backend)" vs site "Engenheiro de Software".
	 */
	targetTitle: LocalizedCopy;
	/**
	 * Themes the recruiter summary should stress (content layer / future assembler).
	 * Not free-form prose — keep as stable tags.
	 */
	summaryFocus: string[];
	/**
	 * Skills to surface first (order = priority).
	 * Prefer canonical English labels (same as `en` content) for concepts that
	 * differ by locale (`Microservices`, `Clean Architecture`, …).
	 * Matching against PT/ES copy uses `src/resume/skill-aliases.ts`.
	 */
	emphasizeSkills: string[];
	/** Optional skills to push down or omit in recruiter mode. */
	deprioritizeSkills?: string[];
	/**
	 * Company names to keep / order first. Must match `experience.items[].company`.
	 * Omitted companies may still appear after these, unless capped by maxExperienceItems.
	 */
	experienceFocus?: string[];
	/** Cap listed roles (most recent / focused first after sorting). */
	maxExperienceItems?: number;
	/**
	 * Extra ATS keywords not always present as skill chips
	 * (domain terms: crédito, pagamentos, food delivery, …).
	 */
	extraKeywords?: string[];
	/** Locales this profile is intended for; omit = all site locales. */
	locales?: readonly Locale[];
};

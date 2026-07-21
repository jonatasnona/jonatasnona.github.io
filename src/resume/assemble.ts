import type { PortfolioContent, Experience, SkillGroup } from '../content/types';
import type { Locale } from '../site.config';
import { skillsMatch } from './skill-aliases';
import type { ResumeProfile } from './types';

export type AssembledResume = {
	profile: ResumeProfile;
	locale: Locale;
	name: string;
	title: string;
	tagline: string;
	about: string;
	experience: Experience[];
	skills: SkillGroup[];
	/** Flat priority skills for a dense recruiter skills line. */
	prioritySkills: string[];
	extraKeywords: string[];
};

function emphasizeIndex(label: string, emphasize: string[]): number {
	const idx = emphasize.findIndex((skill) => skillsMatch(skill, label));
	return idx === -1 ? Number.POSITIVE_INFINITY : idx;
}

function isDeprioritized(label: string, deprioritize: string[]): boolean {
	return deprioritize.some((skill) => skillsMatch(skill, label));
}

function orderSkills(
	groups: SkillGroup[],
	emphasize: string[],
	deprioritize: string[],
): SkillGroup[] {
	return groups.map((group) => {
		const items = [...group.items].sort((a, b) => {
			const aDep = isDeprioritized(a, deprioritize) ? 1 : 0;
			const bDep = isDeprioritized(b, deprioritize) ? 1 : 0;
			if (aDep !== bDep) return aDep - bDep;
			return emphasizeIndex(a, emphasize) - emphasizeIndex(b, emphasize);
		});
		return { title: group.title, items };
	});
}

function orderExperience(
	items: Experience[],
	focus: string[] | undefined,
	maxItems: number | undefined,
): Experience[] {
	if (!focus?.length) {
		return maxItems ? items.slice(0, maxItems) : [...items];
	}

	const byCompany = new Map(items.map((item) => [item.company, item]));
	const focused: Experience[] = [];
	for (const company of focus) {
		const hit = byCompany.get(company);
		if (hit) {
			focused.push(hit);
			byCompany.delete(company);
		}
	}
	const rest = items.filter((item) => byCompany.has(item.company));
	const ordered = [...focused, ...rest];
	return maxItems ? ordered.slice(0, maxItems) : ordered;
}

function buildPrioritySkills(
	groups: SkillGroup[],
	emphasize: string[],
): string[] {
	if (!emphasize.length) return [];
	const available = groups.flatMap((g) => g.items);
	const picked: string[] = [];
	for (const skill of emphasize) {
		const match = available.find((item) => skillsMatch(item, skill));
		if (match && !picked.some((p) => skillsMatch(p, match))) {
			picked.push(match);
		}
	}
	return picked;
}

/**
 * Frame portfolio content for a resume profile (select / order / retitle).
 * Does not invent metrics — narrative still comes from `src/content/`.
 */
export function assembleResume(
	content: PortfolioContent,
	profile: ResumeProfile,
	locale: Locale,
): AssembledResume {
	const deprioritize = profile.deprioritizeSkills ?? [];
	const skills =
		profile.mode === 'brand'
			? content.skills.groups
			: orderSkills(content.skills.groups, profile.emphasizeSkills, deprioritize);

	const experience =
		profile.mode === 'brand'
			? content.experience.items
			: orderExperience(
					content.experience.items,
					profile.experienceFocus,
					profile.maxExperienceItems,
				);

	return {
		profile,
		locale,
		name: content.hero.eyebrow,
		title: profile.targetTitle[locale],
		tagline: content.hero.tagline,
		about: profile.mode === 'recruiter' ? content.about.recruiter : content.about.body,
		experience,
		skills,
		prioritySkills:
			profile.mode === 'brand'
				? []
				: buildPrioritySkills(content.skills.groups, profile.emphasizeSkills),
		extraKeywords: profile.mode === 'brand' ? [] : (profile.extraKeywords ?? []),
	};
}

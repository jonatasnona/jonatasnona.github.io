import type { ResumeProfile } from '../types';

/**
 * Frontend / product UI — lean on Nuvemshop credit storefront work.
 */
export const frontendReact: ResumeProfile = {
	id: 'frontend-react',
	label: {
		pt: 'Frontend / React',
		en: 'Frontend / React',
		es: 'Frontend / React',
	},
	description: {
		pt: 'Vagas com React, TypeScript, design collaboration e qualidade de UI.',
		en: 'Roles with React, TypeScript, design collaboration, and UI quality.',
		es: 'Roles con React, TypeScript, colaboración con diseño y calidad de UI.',
	},
	mode: 'recruiter',
	targetTitle: {
		pt: 'Engenheiro de Software (Frontend)',
		en: 'Software Engineer (Frontend)',
		es: 'Ingeniero de Software (Frontend)',
	},
	summaryFocus: [
		'frontend',
		'react',
		'typescript',
		'product',
		'design',
		'quality',
	],
	emphasizeSkills: [
		'React',
		'TypeScript',
		'Playwright',
		'Figma',
		'Node.js',
		'REST',
		'Datadog',
	],
	deprioritizeSkills: [
		'Terraform',
		'Packer',
		'Ansible',
		'Go',
		'C#',
		'C++',
		'Java',
		'Greenplum',
	],
	experienceFocus: ['Nuvemshop', 'Delivery Much Brasil', 'Globo.com', 'INdT'],
	maxExperienceItems: 4,
	extraKeywords: [
		'React',
		'TypeScript',
		'Playwright',
		'Figma',
		'crédito',
		'product squad',
	],
};

import type { ResumeProfile } from '../types';

/**
 * Full-stack with Python backend + modern frontend (React/TS).
 */
export const fullstackPython: ResumeProfile = {
	id: 'fullstack-python',
	label: {
		pt: 'Full-stack / Python',
		en: 'Full-stack / Python',
		es: 'Full-stack / Python',
	},
	description: {
		pt: 'Vagas full-stack com Python no backend e React/TypeScript no frontend.',
		en: 'Full-stack roles with Python backend and React/TypeScript frontend.',
		es: 'Roles full-stack con Python en backend y React/TypeScript en frontend.',
	},
	mode: 'recruiter',
	targetTitle: {
		pt: 'Engenheiro de Software (Full-stack)',
		en: 'Software Engineer (Full-stack)',
		es: 'Ingeniero de Software (Full-stack)',
	},
	summaryFocus: [
		'fullstack',
		'python',
		'react',
		'typescript',
		'apis',
		'product',
		'aws',
	],
	emphasizeSkills: [
		'Python',
		'React',
		'TypeScript',
		'Node.js',
		'REST',
		'PostgreSQL',
		'Redis',
		'AWS',
		'Docker',
		'Playwright',
		'Datadog',
	],
	deprioritizeSkills: ['Terraform', 'Packer', 'Ansible', 'Go', 'C#', 'C++', 'Java'],
	experienceFocus: [
		'Nuvemshop',
		'Globo.com',
		'Pagar.me',
		'Delivery Much Brasil',
		'INdT',
	],
	maxExperienceItems: 5,
	extraKeywords: [
		'Python',
		'React',
		'TypeScript',
		'full-stack',
		'API',
		'crédito',
	],
};

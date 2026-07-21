import type { ResumeProfile } from '../types';

/**
 * Default recruiter / ATS resume — generalist Software Engineer.
 * Good starting point for platforms that ask for a generic CV upload.
 */
export const defaultProfile: ResumeProfile = {
	id: 'default',
	label: {
		pt: 'Padrão (ATS)',
		en: 'Default (ATS)',
		es: 'Predeterminado (ATS)',
	},
	description: {
		pt: 'Currículo recruiter generalista — backend, arquitetura e cloud, com frontend recente.',
		en: 'Generalist recruiter resume — backend, architecture, and cloud, with recent frontend.',
		es: 'CV recruiter generalista — backend, arquitectura y cloud, con frontend reciente.',
	},
	mode: 'recruiter',
	targetTitle: {
		pt: 'Engenheiro de Software',
		en: 'Software Engineer',
		es: 'Ingeniero de Software',
	},
	summaryFocus: [
		'backend',
		'architecture',
		'cloud',
		'devops',
		'reliability',
		'frontend',
	],
	emphasizeSkills: [
		'Node.js',
		'TypeScript',
		'NestJS',
		'React',
		'PostgreSQL',
		'AWS',
		'Docker',
		'Microservices',
		'Datadog',
		'CI/CD',
	],
	experienceFocus: [
		'Nuvemshop',
		'Delivery Much Brasil',
		'Pagar.me',
		'Nokia Networks',
		'Globo.com',
	],
	maxExperienceItems: 5,
	extraKeywords: [
		'crédito',
		'pagamentos',
		'food delivery',
		'microservices',
		'observability',
	],
};

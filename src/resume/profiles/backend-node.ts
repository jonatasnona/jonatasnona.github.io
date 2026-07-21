import type { ResumeProfile } from '../types';

/**
 * Backend-heavy Node / TypeScript applications and APIs.
 */
export const backendNode: ResumeProfile = {
	id: 'backend-node',
	label: {
		pt: 'Backend / Node.js',
		en: 'Backend / Node.js',
		es: 'Backend / Node.js',
	},
	description: {
		pt: 'Vagas de backend com Node.js, TypeScript, NestJS, dados e AWS.',
		en: 'Backend roles with Node.js, TypeScript, NestJS, data stores, and AWS.',
		es: 'Roles de backend con Node.js, TypeScript, NestJS, datos y AWS.',
	},
	mode: 'recruiter',
	targetTitle: {
		pt: 'Engenheiro de Software (Backend)',
		en: 'Software Engineer (Backend)',
		es: 'Ingeniero de Software (Backend)',
	},
	summaryFocus: [
		'backend',
		'apis',
		'node',
		'typescript',
		'microservices',
		'data',
		'aws',
	],
	emphasizeSkills: [
		'Node.js',
		'TypeScript',
		'NestJS',
		'REST',
		'PostgreSQL',
		'MongoDB',
		'Redis',
		'AWS',
		'Docker',
		'Microservices',
		'Datadog',
	],
	deprioritizeSkills: ['Figma', 'C++', 'Java', 'C#'],
	experienceFocus: [
		'Nuvemshop',
		'Delivery Much Brasil',
		'Pagar.me',
		'Globo.com',
		'Neemu',
	],
	maxExperienceItems: 5,
	extraKeywords: [
		'API',
		'NestJS',
		'TypeScript',
		'crédito',
		'pagamentos',
		'distributed systems',
	],
};

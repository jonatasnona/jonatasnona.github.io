import type { ResumeProfile } from '../types';

/**
 * Backend-heavy Python — Globo.com and Pagar.me as anchors.
 */
export const backendPython: ResumeProfile = {
	id: 'backend-python',
	label: {
		pt: 'Backend / Python',
		en: 'Backend / Python',
		es: 'Backend / Python',
	},
	description: {
		pt: 'Vagas de backend com Python, APIs, dados e infraestrutura na AWS.',
		en: 'Backend roles with Python, APIs, data stores, and AWS infrastructure.',
		es: 'Roles de backend con Python, APIs, datos e infraestructura en AWS.',
	},
	mode: 'recruiter',
	targetTitle: {
		pt: 'Engenheiro de Software (Backend)',
		en: 'Software Engineer (Backend)',
		es: 'Ingeniero de Software (Backend)',
	},
	summaryFocus: [
		'backend',
		'python',
		'apis',
		'microservices',
		'data',
		'aws',
		'devops',
	],
	emphasizeSkills: [
		'Python',
		'REST',
		'PostgreSQL',
		'MongoDB',
		'Redis',
		'Elasticsearch',
		'AWS',
		'Docker',
		'Microservices',
		'Terraform',
		'Datadog',
	],
	deprioritizeSkills: ['Figma', 'Playwright', 'React', 'NestJS', 'C++', 'Java', 'C#'],
	experienceFocus: [
		'Globo.com',
		'Pagar.me',
		'Nuvemshop',
		'Delivery Much Brasil',
		'Neemu',
	],
	maxExperienceItems: 5,
	extraKeywords: [
		'Python',
		'API',
		'microservices',
		'vídeo',
		'pagamentos',
		'distributed systems',
	],
};

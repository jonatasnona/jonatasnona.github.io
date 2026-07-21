import type { ResumeProfile } from '../types';

/**
 * Backend-heavy Go services — lean on Pagar.me and distributed systems.
 */
export const backendGo: ResumeProfile = {
	id: 'backend-go',
	label: {
		pt: 'Backend / Go',
		en: 'Backend / Go',
		es: 'Backend / Go',
	},
	description: {
		pt: 'Vagas de backend com Go, sistemas distribuídos, AWS e confiabilidade.',
		en: 'Backend roles with Go, distributed systems, AWS, and reliability.',
		es: 'Roles de backend con Go, sistemas distribuidos, AWS y confiabilidad.',
	},
	mode: 'recruiter',
	targetTitle: {
		pt: 'Engenheiro de Software (Backend)',
		en: 'Software Engineer (Backend)',
		es: 'Ingeniero de Software (Backend)',
	},
	summaryFocus: [
		'backend',
		'go',
		'apis',
		'microservices',
		'distributed-systems',
		'aws',
		'reliability',
	],
	emphasizeSkills: [
		'Go',
		'Python',
		'REST',
		'PostgreSQL',
		'Redis',
		'Elasticsearch',
		'AWS',
		'Docker',
		'Microservices',
		'Distributed systems',
		'Datadog',
	],
	deprioritizeSkills: ['Figma', 'Playwright', 'React', 'NestJS', 'C++', 'Java', 'C#'],
	experienceFocus: [
		'Pagar.me',
		'Nuvemshop',
		'Delivery Much Brasil',
		'Globo.com',
		'Neemu',
	],
	maxExperienceItems: 5,
	extraKeywords: [
		'Go',
		'Golang',
		'API',
		'microservices',
		'pagamentos',
		'high availability',
	],
};

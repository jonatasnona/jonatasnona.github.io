import type { ResumeProfile } from '../types';

/**
 * Tech Lead / engineering leadership — people, delivery, and technical direction.
 * Distinct from `architect`: more squad facilitation and mentoring than pure system design.
 */
export const techLeader: ResumeProfile = {
	id: 'tech-leader',
	label: {
		pt: 'Tech Lead',
		en: 'Tech Lead',
		es: 'Tech Lead',
	},
	description: {
		pt: 'Vagas de tech lead — direcionamento técnico, mentoring, entrega com produto e design.',
		en: 'Tech lead roles — technical direction, mentoring, and delivery with product and design.',
		es: 'Roles de tech lead — dirección técnica, mentoring y entrega con producto y diseño.',
	},
	mode: 'recruiter',
	targetTitle: {
		pt: 'Tech Lead',
		en: 'Tech Lead',
		es: 'Tech Lead',
	},
	summaryFocus: [
		'tech-leadership',
		'mentoring',
		'delivery',
		'architecture',
		'stakeholders',
		'product',
		'standards',
	],
	emphasizeSkills: [
		'Clean Architecture',
		'Design patterns',
		'Clean Code',
		'Microservices',
		'Distributed systems',
		'Scalability',
		'Node.js',
		'TypeScript',
		'NestJS',
		'AWS',
		'CI/CD',
		'Datadog',
	],
	deprioritizeSkills: ['C++', 'Java', 'C#', 'Packer'],
	experienceFocus: [
		'Delivery Much Brasil',
		'Nuvemshop',
		'Pagar.me',
		'Globo.com',
		'Nokia Networks',
	],
	maxExperienceItems: 5,
	extraKeywords: [
		'tech lead',
		'mentoring',
		'cross-functional',
		'agile',
		'stakeholder management',
		'code standards',
		'delivery',
	],
};

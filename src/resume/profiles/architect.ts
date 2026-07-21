import type { ResumeProfile } from '../types';

/**
 * Architecture / tech leadership framing — Delivery Much as anchor.
 */
export const architect: ResumeProfile = {
	id: 'architect',
	label: {
		pt: 'Arquitetura',
		en: 'Architecture',
		es: 'Arquitectura',
	},
	description: {
		pt: 'Vagas de arquiteto ou staff — microserviços, stakeholders e padrões de time.',
		en: 'Architect or staff-level roles — microservices, stakeholders, and team standards.',
		es: 'Roles de arquitecto o staff — microservicios, stakeholders y estándares de equipo.',
	},
	mode: 'recruiter',
	targetTitle: {
		pt: 'Arquiteto de Software',
		en: 'Software Architect',
		es: 'Arquitecto de Software',
	},
	summaryFocus: [
		'architecture',
		'microservices',
		'scalability',
		'stakeholders',
		'standards',
		'aws',
	],
	emphasizeSkills: [
		'Clean Architecture',
		'Distributed systems',
		'Scalability',
		'Resilience',
		'Design patterns',
		'Microservices',
		'NestJS',
		'Node.js',
		'TypeScript',
		'AWS',
		'Docker',
		'Clean Code',
	],
	deprioritizeSkills: ['Figma', 'Playwright', 'C++', 'Java'],
	experienceFocus: [
		'Delivery Much Brasil',
		'Nuvemshop',
		'Pagar.me',
		'Globo.com',
		'Nokia Networks',
	],
	maxExperienceItems: 5,
	extraKeywords: [
		'microservices',
		'system design',
		'tech leadership',
		'food delivery',
		'AWS',
	],
};

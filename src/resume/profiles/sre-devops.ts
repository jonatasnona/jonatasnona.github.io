import type { ResumeProfile } from '../types';

/**
 * SRE / platform / DevOps — Pagar.me and infra automation as anchors.
 */
export const sreDevops: ResumeProfile = {
	id: 'sre-devops',
	label: {
		pt: 'SRE / DevOps',
		en: 'SRE / DevOps',
		es: 'SRE / DevOps',
	},
	description: {
		pt: 'Vagas de SRE, platform ou DevOps — AWS, IaC, observabilidade e confiabilidade.',
		en: 'SRE, platform, or DevOps roles — AWS, IaC, observability, and reliability.',
		es: 'Roles de SRE, platform o DevOps — AWS, IaC, observabilidad y confiabilidad.',
	},
	mode: 'recruiter',
	targetTitle: {
		pt: 'Engenheiro de Software (SRE)',
		en: 'Software Engineer (SRE)',
		es: 'Ingeniero de Software (SRE)',
	},
	summaryFocus: [
		'sre',
		'devops',
		'aws',
		'infrastructure',
		'reliability',
		'observability',
		'automation',
	],
	emphasizeSkills: [
		'AWS',
		'Terraform',
		'Docker',
		'Ansible',
		'Packer',
		'CI/CD',
		'Linux',
		'Shell Script',
		'Elasticsearch',
		'Datadog',
		'Python',
		'Go',
	],
	deprioritizeSkills: ['Figma', 'Playwright', 'React', 'NestJS', 'C++', 'Java'],
	experienceFocus: [
		'Pagar.me',
		'Nuvemshop',
		'Nokia Networks',
		'Globo.com',
		'Neemu',
	],
	maxExperienceItems: 5,
	extraKeywords: [
		'SRE',
		'DevOps',
		'Terraform',
		'observability',
		'pagamentos',
		'high availability',
	],
};

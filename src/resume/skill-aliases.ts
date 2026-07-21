/**
 * Locale skill labels → canonical EN token used in resume profiles.
 * Keep in sync when renaming items in `src/content/{pt,en,es}.ts`.
 */
const ALIASES: Record<string, string> = {
	// Backend & APIs
	Microserviços: 'Microservices',
	Microservicios: 'Microservices',
	Microservices: 'Microservices',
	// Architecture
	'Arquitetura limpa': 'Clean Architecture',
	'Arquitectura limpia': 'Clean Architecture',
	'Clean Architecture': 'Clean Architecture',
	'Sistemas distribuídos': 'Distributed systems',
	'Sistemas distribuidos': 'Distributed systems',
	'Distributed systems': 'Distributed systems',
	Escalabilidade: 'Scalability',
	Escalabilidad: 'Scalability',
	Scalability: 'Scalability',
	Resiliência: 'Resilience',
	Resiliencia: 'Resilience',
	Resilience: 'Resilience',
	// Data & Observability
	Métricas: 'Metrics',
	Metrics: 'Metrics',
};

export function canonicalSkill(label: string): string {
	return ALIASES[label] ?? label;
}

export function skillsMatch(a: string, b: string): boolean {
	return canonicalSkill(a) === canonicalSkill(b);
}

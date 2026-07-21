import type { ResumeProfile } from '../types';

/**
 * Site download PDF — full visual brand resume, no recruiter filtering.
 * Use when the PDF should match the portfolio storytelling surface.
 */
export const brand: ResumeProfile = {
	id: 'brand',
	label: {
		pt: 'Marca (site)',
		en: 'Brand (site)',
		es: 'Marca (sitio)',
	},
	description: {
		pt: 'PDF do botão de download do portfólio — layout visual e copy completa.',
		en: 'Portfolio download button PDF — visual layout and full copy.',
		es: 'PDF del botón de descarga del portafolio — layout visual y copy completa.',
	},
	mode: 'brand',
	targetTitle: {
		pt: 'Engenheiro de Software',
		en: 'Software Engineer',
		es: 'Ingeniero de Software',
	},
	summaryFocus: ['backend', 'architecture', 'cloud', 'frontend'],
	emphasizeSkills: [],
};

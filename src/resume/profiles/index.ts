import type { ResumeProfile } from '../types';
import { architect } from './architect';
import { backendGo } from './backend-go';
import { backendNode } from './backend-node';
import { backendPython } from './backend-python';
import { brand } from './brand';
import { defaultProfile } from './default';
import { frontendReact } from './frontend-react';
import { fullstackNode } from './fullstack-node';
import { fullstackPython } from './fullstack-python';
import { infraArchitect } from './infra-architect';
import { sreDevops } from './sre-devops';
import { techLeader } from './tech-leader';

/** Ordered catalog — CLI help and docs should follow this order. */
export const resumeProfiles: readonly ResumeProfile[] = [
	brand,
	defaultProfile,
	backendNode,
	backendGo,
	backendPython,
	fullstackNode,
	fullstackPython,
	architect,
	infraArchitect,
	techLeader,
	frontendReact,
	sreDevops,
] as const;

export type ResumeProfileId = (typeof resumeProfiles)[number]['id'];

const byId = new Map(resumeProfiles.map((profile) => [profile.id, profile]));

export function listResumeProfiles(): readonly ResumeProfile[] {
	return resumeProfiles;
}

export function getResumeProfile(id: string): ResumeProfile | undefined {
	return byId.get(id);
}

export function requireResumeProfile(id: string): ResumeProfile {
	const profile = getResumeProfile(id);
	if (!profile) {
		const known = resumeProfiles.map((p) => p.id).join(', ');
		throw new Error(`Unknown resume profile "${id}". Known: ${known}`);
	}
	return profile;
}

export {
	architect,
	backendGo,
	backendNode,
	backendPython,
	brand,
	defaultProfile,
	frontendReact,
	fullstackNode,
	fullstackPython,
	infraArchitect,
	sreDevops,
	techLeader,
};

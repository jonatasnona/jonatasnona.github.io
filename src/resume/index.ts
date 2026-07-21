export type { LocalizedCopy, ResumeMode, ResumeProfile } from './types';
export type { AssembledResume } from './assemble';
export { assembleResume } from './assemble';
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
	getResumeProfile,
	listResumeProfiles,
	requireResumeProfile,
	resumeProfiles,
	sreDevops,
	techLeader,
	type ResumeProfileId,
} from './profiles';
export { canonicalSkill, skillsMatch } from './skill-aliases';

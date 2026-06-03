// Static data (safe for client-side import)
export { researchAreas } from './research';
export { newsItems } from './news';

// Types (safe for both client and server)
export type { Member, Publication, ResearchArea, NewsItem, MemberRole, ProfileTemplate, SocialLinks, Education, Award, Project, Teaching, Service } from './types';
export { ROLE_LABELS, ROLE_ORDER, DISPLAY_GROUPS, sortMembersByRoleAndDate } from './types';
export type { DisplayGroup } from './types';

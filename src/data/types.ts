export interface SocialLinks {
  website?: string;
  scholar?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
}

export interface Publication {
  id?: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  tags?: string[];
  paperUrl?: string;
  codeUrl?: string;
  projectUrl?: string;
  coverImage?: string;
  abstract?: string;
  bibtex?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  major?: string;
  department?: string;
  advisor?: string;
}

export interface Award {
  title: string;
  year: string;
  description?: string;
}

export interface Project {
  name: string;
  role?: string;
  year?: string;
  description?: string;
  url?: string;
  image?: string;
}

export interface Teaching {
  course: string;
  role: string;
  institution: string;
  year: string;
  url?: string;
}

export interface Service {
  role: string;
  organization: string;
  year: string;
}

export type MemberRole = 'teacher' | 'phd' | 'master' | 'undergraduate' | 'alumni';
export type ProfileTemplate = 'academic' | 'modern' | 'minimal';

// 显示分组：教师 / 在校学生 / 毕业学生
export type DisplayGroup = 'teacher' | 'current-student' | 'alumni';

export const DISPLAY_GROUPS: { key: DisplayGroup; label: string; roles: MemberRole[] }[] = [
  { key: 'teacher', label: '教师', roles: ['teacher'] },
  { key: 'current-student', label: '在校学生', roles: ['phd', 'master', 'undergraduate'] },
  { key: 'alumni', label: '毕业学生', roles: ['alumni'] },
];

export const ROLE_LABELS: Record<MemberRole, string> = {
  teacher: '教师',
  phd: '博士生',
  master: '硕士生',
  undergraduate: '本科生',
  alumni: '毕业学生',
};

export const ROLE_ORDER: MemberRole[] = ['teacher', 'phd', 'master', 'undergraduate', 'alumni'];

// 在校学生内部排序：博士生 > 硕士生 > 本科生，同角色按进组时间升序
export const ROLE_SORT_INDEX: Record<MemberRole, number> = {
  teacher: 0,
  phd: 1,
  master: 2,
  undergraduate: 3,
  alumni: 4,
};

export function sortMembersByRoleAndDate(members: Member[]): Member[] {
  return [...members].sort((a, b) => {
    const roleDiff = ROLE_SORT_INDEX[a.role] - ROLE_SORT_INDEX[b.role];
    if (roleDiff !== 0) return roleDiff;
    // 同角色按进组时间升序（早进组的在前）
    if (a.joinDate && b.joinDate) return a.joinDate.localeCompare(b.joinDate);
    if (a.joinDate) return -1;
    if (b.joinDate) return 1;
    return 0;
  });
}

export interface Member {
  slug: string;
  name: string;
  photo: string;
  role: MemberRole;
  position: string;
  template: ProfileTemplate;
  bio: string;
  researchInterests: string[];
  publicationSlugs: string[]; // 引用 src/data/publications/{slug}/data.json
  education: Education[];
  awards: Award[];
  projects: Project[];
  teaching: Teaching[];
  service: Service[];
  workExperience?: { position: string; role?: string; organization: string; department?: string; period: string; description?: string }[];
  socialLinks: SocialLinks;
  joinDate?: string; // 进组时间，格式 "2024-09"
  leftYear?: number;
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  type: 'award' | 'paper' | 'announcement' | 'talk';
  content?: string;
  url?: string;
}

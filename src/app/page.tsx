import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero';
import { ResearchAreasSection } from '@/components/sections/research-areas';
import { PublicationsSection } from '@/components/sections/publications';
import { PeopleSection } from '@/components/sections/people';
import { NewsSection } from '@/components/sections/news';
import { getAllMembers, getAllPublications } from '@/data/server';
import { researchAreas } from '@/data';
import type { MemberRole } from '@/data';

export const metadata: Metadata = {
  title: 'Guo AI Lab — 推动人工智能前沿研究',
  description:
    'Guo AI Lab 致力于多模态学习、大语言模型、记忆系统和自主智能体的基础研究，推动人工智能的前沿发展。',
};

export default function HomePage() {
  const members = getAllMembers();
  const publications = getAllPublications();

  // 论文去重后的总数（getAllPublications 已按 title+year 去重）
  const publicationCount = publications.length;

  // 成员数：教师 + 在校学生（不含毕业学生）
  const currentRoles: MemberRole[] = ['teacher', 'phd', 'master', 'undergraduate'];
  const memberCount = members.filter((m) => currentRoles.includes(m.role)).length;

  // 研究方向数：取 researchAreas 数据的实际数量
  const researchAreaCount = researchAreas.length;

  return (
    <main>
      <HeroSection
        publicationCount={publicationCount}
        memberCount={memberCount}
        researchAreaCount={researchAreaCount}
      />
      <ResearchAreasSection />
      <PublicationsSection publications={publications} />
      <PeopleSection members={members} />
      <NewsSection />
    </main>
  );
}

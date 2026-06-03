import type { Metadata } from 'next';
import { PeoplePageContent } from '@/components/sections/people-page';
import { getAllMembers } from '@/data/server';

export const metadata: Metadata = {
  title: '团队成员 — Guo AI Lab',
  description: '认识 Guo AI Lab 的研究人员、学生和合作者。',
};

export default function PeoplePage() {
  const members = getAllMembers();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <PeoplePageContent members={members} />
    </div>
  );
}

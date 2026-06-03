import type { Metadata } from 'next';
import { PublicationList } from '@/components/sections/publication-list';
import { getAllPublications, getUniqueYears, getUniqueVenues } from '@/data/server';

export const metadata: Metadata = {
  title: '发表论文 — Guo AI Lab',
  description: 'Guo AI Lab 的研究论文发表列表，涵盖多模态AI、大语言模型等领域。',
};

export default function PublicationsPage() {
  const publications = getAllPublications();
  const years = getUniqueYears();
  const venues = getUniqueVenues();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">发表论文</h1>
          <p className="text-muted-foreground">
            浏览我们完整的研究论文列表。可按年份、会议筛选，或通过关键词搜索。
          </p>
        </div>

        <PublicationList publications={publications} years={years} venues={venues} />
      </div>
    </div>
  );
}

'use client';

import { BookOpen, Megaphone, Trophy } from 'lucide-react';
import { newsItems } from '@/data';
import { FadeIn } from '@/components/motion';

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  award: Trophy,
  paper: BookOpen,
  announcement: Megaphone,
};

const typeLabels: Record<string, string> = {
  award: '获奖',
  paper: '论文',
  announcement: '通知',
};

export function NewsSection() {
  return (
    <section id="news" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight mb-3">最新动态</h2>
            <p className="text-muted-foreground">
              实验室的最新消息和论文接收通知
            </p>
          </div>
        </FadeIn>

        <div className="max-h-[480px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
          <div className="relative pl-6 border-l-2 border-border/50">
            {newsItems.map((item) => {
              const Icon = typeIcons[item.type] || Megaphone;
              return (
                <div key={item.id} className="relative mb-6 last:mb-0">
                  {/* Timeline dot */}
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />

                  <div className="rounded-lg border border-border/50 bg-card p-4 hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium">
                        {typeLabels[item.type] || item.type}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">{item.date}</span>
                    </div>
                    <p className="text-sm font-medium leading-relaxed mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

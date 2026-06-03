'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Github, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FadeIn } from '@/components/motion';
import type { Publication } from '@/data/types';

interface PublicationListProps {
  publications: Publication[];
  years: number[];
  venues: string[];
}

export function PublicationList({ publications, years, venues }: PublicationListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);

  const filtered = publications.filter((pub) => {
    const matchesSearch =
      searchQuery === '' ||
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesYear = selectedYear === null || pub.year === selectedYear;
    const matchesVenue = selectedVenue === null || pub.venue === selectedVenue;

    return matchesSearch && matchesYear && matchesVenue;
  });

  const grouped: Record<number, typeof filtered> = {};
  for (const pub of filtered) {
    if (!grouped[pub.year]) grouped[pub.year] = [];
    grouped[pub.year].push(pub);
  }

  const sortedYears = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div>
      {/* Search & Filter */}
      <FadeIn>
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索论文标题或作者..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-muted-foreground mr-3">年份:</span>
              <div className="inline-flex flex-wrap gap-2">
                <Button
                  variant={selectedYear === null ? 'default' : 'outline'}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setSelectedYear(null)}
                >
                  全部
                </Button>
                {years.map((year) => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? 'default' : 'outline'}
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-muted-foreground mr-3">会议/期刊:</span>
              <div className="inline-flex flex-wrap gap-2">
                <Button
                  variant={selectedVenue === null ? 'default' : 'outline'}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setSelectedVenue(null)}
                >
                  全部
                </Button>
                {venues.map((venue) => (
                  <Button
                    key={venue}
                    variant={selectedVenue === venue ? 'default' : 'outline'}
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setSelectedVenue(selectedVenue === venue ? null : venue)}
                  >
                    {venue}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="text-sm text-muted-foreground mb-6">
        共 {filtered.length} 篇论文
      </div>

      {/* Grouped publications */}
      {sortedYears.map((year) => (
        <div key={year} className="mb-10">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-primary/30" />
            {year}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {grouped[year].map((pub, i) => (
              <motion.div
                key={pub.id || `pub-${year}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.05 }}
              >
                <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md border-border/50 overflow-hidden">
                  <div className="h-28 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center border-b border-border/30 relative">
                    {pub.coverImage ? (
                      <>
                        <img
                          src={pub.coverImage}
                          alt={pub.title}
                          className="w-full h-full object-cover"
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling;
                            if (fallback) (fallback as HTMLElement).style.display = 'flex';
                          }}
                        />
                        <div className="absolute inset-0 items-center justify-center" style={{ display: 'none' }}>
                          <FileText className="h-10 w-10 text-primary/20" />
                        </div>
                      </>
                    ) : (
                      <FileText className="h-10 w-10 text-primary/20" />
                    )}
                  </div>

                  <CardContent className="pt-3">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {pub.venue}
                      </Badge>
                      {pub.tags?.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                      ))}
                    </div>
                    <h4 className="font-semibold text-sm leading-snug mb-2 line-clamp-2">
                      {pub.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {pub.authors.join(', ')}
                    </p>
                  </CardContent>

                  <CardFooter className="pt-0 gap-2">
                    {pub.paperUrl && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" asChild>
                        <a href={pub.paperUrl} target="_blank" rel="noopener noreferrer">
                          <FileText className="h-3 w-3" />
                          论文
                        </a>
                      </Button>
                    )}
                    {pub.codeUrl && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" asChild>
                        <a href={pub.codeUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3" />
                          代码
                        </a>
                      </Button>
                    )}
                    {pub.projectUrl && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" asChild>
                        <a href={pub.projectUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                          项目
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">没有找到匹配的论文</p>
        </div>
      )}
    </div>
  );
}

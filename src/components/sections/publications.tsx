'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink, Github, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import type { Publication } from '@/data/types';

interface PublicationsSectionProps {
  publications: Publication[];
}

export function PublicationsSection({ publications }: PublicationsSectionProps) {
  const latestPublications = publications.slice(0, 6);

  return (
    <section id="publications" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight mb-3">最新论文</h2>
              <p className="text-muted-foreground">
                我们在顶级AI会议和期刊上的最新研究成果
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/publications" className="gap-2">
                查看全部论文
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPublications.map((pub, i) => (
            <StaggerItem key={pub.id || `pub-${i}`}>
              <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md border-border/50 overflow-hidden">
                {/* Cover image */}
                <div className="h-36 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center border-b border-border/30 overflow-hidden">
                  {pub.coverImage ? (
                    <img
                      src={pub.coverImage}
                      alt={pub.title}
                      className="w-full h-full object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const sibling = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                        if (sibling) sibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="flex items-center justify-center w-full h-full" style={pub.coverImage ? { display: 'none' } : {}}>
                    <FileText className="h-12 w-12 text-primary/20" />
                  </div>
                </div>

                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {pub.venue}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{pub.year}</span>
                  </div>
                  <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {pub.authors.join(', ')}
                  </p>
                </CardContent>

                <CardFooter className="pt-0 gap-2">
                  {pub.paperUrl && (
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" asChild>
                      <Link href={pub.paperUrl} target="_blank">
                        <FileText className="h-3 w-3" />
                        论文
                      </Link>
                    </Button>
                  )}
                  {pub.codeUrl && (
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" asChild>
                      <Link href={pub.codeUrl} target="_blank">
                        <Github className="h-3 w-3" />
                        代码
                      </Link>
                    </Button>
                  )}
                  {pub.projectUrl && (
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" asChild>
                      <Link href={pub.projectUrl} target="_blank">
                        <ExternalLink className="h-3 w-3" />
                        项目
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/publications" className="gap-2">
              查看全部论文
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

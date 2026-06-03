'use client';

import { ExternalLink, Github, Mail, Globe, FileText, BookOpen, GraduationCap, Briefcase, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import type { Member, Publication } from '@/data/types';

interface MinimalTemplateProps {
  member: Member;
  publications: Publication[];
}

export function MinimalTemplate({ member, publications }: MinimalTemplateProps) {
  const groupedPubs: Record<number, Publication[]> = {};
  for (const pub of publications) {
    if (!groupedPubs[pub.year]) groupedPubs[pub.year] = [];
    groupedPubs[pub.year].push(pub);
  }
  const pubYears = Object.keys(groupedPubs)
    .map(Number)
    .sort((a, b) => b - a);

  // Build timeline entries
  const timelineEntries: { year: string; items: { label: string; detail?: string }[] }[] = [];

  // Education
  if (member.education.length > 0) {
    timelineEntries.push({
      year: '教育经历',
      items: member.education.map((edu) => ({
        label: `${edu.degree} — ${edu.institution}`,
        detail: edu.year,
      })),
    });
  }

  // Projects
  if (member.projects.length > 0) {
    timelineEntries.push({
      year: '研究项目',
      items: member.projects.map((project) => ({
        label: project.name,
        detail: project.role || project.year,
      })),
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Centered Header */}
      <FadeIn>
        <div className="text-center mb-12">
          <div className="w-24 h-24 rounded-full bg-primary/10 overflow-hidden mx-auto mb-4">
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary/50 text-3xl font-bold">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold">{member.name}</h1>
          <p className="text-muted-foreground mt-1">{member.position}</p>
          <div className="flex flex-wrap justify-center gap-1.5 mt-3">
            {member.researchInterests.map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs">
                {interest}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            {member.socialLinks.email && (
              <a href={`mailto:${member.socialLinks.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            )}
            {member.socialLinks.github && (
              <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-4 w-4" />
              </a>
            )}
            {member.socialLinks.website && (
              <a href={member.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="h-4 w-4" />
              </a>
            )}
            {member.socialLinks.scholar && (
              <a href={member.socialLinks.scholar} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <BookOpen className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </FadeIn>

      {/* Bio */}
      <FadeIn>
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Users className="h-4 w-4" />
            个人简介
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
        </div>
      </FadeIn>

      {/* Timeline */}
      {timelineEntries.length > 0 && (
        <div className="mb-10">
          <StaggerContainer className="space-y-8">
            {timelineEntries.map((entry) => (
              <StaggerItem key={entry.year}>
                <h3 className="text-base font-semibold mb-3 text-primary">{entry.year}</h3>
                <div className="space-y-2 pl-4 border-l-2 border-border">
                  {entry.items.map((item, i) => (
                    <div key={i} className="flex items-start justify-between py-1">
                      <p className="text-sm">{item.label}</p>
                      {item.detail && (
                        <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{item.detail}</span>
                      )}
                    </div>
                  ))}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      )}

      {/* Publications - Last section */}
      {publications.length > 0 && (
        <FadeIn>
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              发表论文
            </h2>
            <div className="space-y-6">
              {pubYears.map((year) => (
                <div key={year}>
                  <h3 className="text-sm font-semibold text-primary mb-2">{year}</h3>
                  <div className="space-y-3">
                    {groupedPubs[year].map((pub) => (
                      <div key={pub.id || pub.title} className="flex gap-3 pl-4 border-l-2 border-border py-1">
                        {pub.coverImage && (
                          <div className="flex-shrink-0 w-14 h-18 rounded overflow-hidden bg-muted relative">
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
                              <FileText className="h-5 w-5 text-primary/20" />
                            </div>
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{pub.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{pub.authors.join(', ')}</p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <Badge variant="secondary" className="text-[10px]">{pub.venue}</Badge>
                            {pub.tags?.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                            ))}
                            <div className="flex gap-1">
                              {pub.paperUrl && (
                                <Button variant="ghost" size="sm" className="h-5 text-[10px] px-1.5 gap-0.5" asChild>
                                  <a href={pub.paperUrl} target="_blank" rel="noopener noreferrer">
                                    <FileText className="h-2.5 w-2.5" />论文
                                  </a>
                                </Button>
                              )}
                              {pub.codeUrl && (
                                <Button variant="ghost" size="sm" className="h-5 text-[10px] px-1.5 gap-0.5" asChild>
                                  <a href={pub.codeUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-2.5 w-2.5" />代码
                                  </a>
                                </Button>
                              )}
                              {pub.projectUrl && (
                                <Button variant="ghost" size="sm" className="h-5 text-[10px] px-1.5 gap-0.5" asChild>
                                  <a href={pub.projectUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-2.5 w-2.5" />项目
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}

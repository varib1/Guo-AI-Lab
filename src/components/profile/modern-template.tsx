'use client';

import { ExternalLink, Github, Mail, Globe, FileText, BookOpen, GraduationCap, Briefcase, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import type { Member, Publication } from '@/data/types';

interface ModernTemplateProps {
  member: Member;
  publications: Publication[];
}

export function ModernTemplate({ member, publications }: ModernTemplateProps) {
  const groupedPubs: Record<number, Publication[]> = {};
  for (const pub of publications) {
    if (!groupedPubs[pub.year]) groupedPubs[pub.year] = [];
    groupedPubs[pub.year].push(pub);
  }
  const pubYears = Object.keys(groupedPubs)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div>
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center text-center">
            <FadeIn>
              <div className="w-32 h-32 rounded-2xl bg-primary/10 overflow-hidden mb-6 ring-4 ring-primary/10">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary/50 text-5xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-3xl font-bold mb-2">{member.name}</h1>
              <p className="text-muted-foreground text-lg">{member.position}</p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {member.researchInterests.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex items-center gap-3 mt-6">
                {member.socialLinks.email && (
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href={`mailto:${member.socialLinks.email}`}>
                      <Mail className="h-4 w-4" />
                      邮箱
                    </a>
                  </Button>
                )}
                {member.socialLinks.github && (
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                )}
                {member.socialLinks.website && (
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href={member.socialLinks.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4" />
                      主页
                    </a>
                  </Button>
                )}
                {member.socialLinks.scholar && (
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href={member.socialLinks.scholar} target="_blank" rel="noopener noreferrer">
                      <BookOpen className="h-4 w-4" />
                      Scholar
                    </a>
                  </Button>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bio */}
          <StaggerItem>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  个人简介
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </CardContent>
            </Card>
          </StaggerItem>

          {/* Education */}
          {member.education.length > 0 && (
            <StaggerItem>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    教育经历
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {member.education.map((edu, i) => (
                    <div key={i} className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium">{edu.degree}</p>
                        <p className="text-xs text-muted-foreground">{edu.institution}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{edu.year}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </StaggerItem>
          )}

          {/* Projects */}
          {member.projects.length > 0 && (
            <StaggerItem>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    研究项目
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {member.projects.map((project, i) => (
                    <div key={i}>
                      <p className="text-sm font-medium">{project.name}</p>
                      {project.role && <p className="text-xs text-muted-foreground">角色: {project.role}</p>}
                      {project.year && <p className="text-xs text-muted-foreground">年份: {project.year}</p>}
                      {project.description && <p className="text-xs text-muted-foreground mt-1">{project.description}</p>}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </StaggerItem>
          )}
        </StaggerContainer>

        {/* Publications */}
        {publications.length > 0 && (
          <FadeIn>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  发表论文
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {pubYears.map((year) => (
                  <div key={year}>
                    <h4 className="text-sm font-semibold mb-2 text-primary">{year}</h4>
                    <div className="space-y-3">
                      {groupedPubs[year].map((pub) => (
                        <div key={pub.id || pub.title} className="flex gap-3 pl-3 border-l-2 border-border">
                          {pub.coverImage && (
                            <div className="flex-shrink-0 w-16 h-20 rounded overflow-hidden bg-muted relative">
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
                                <FileText className="h-6 w-6 text-primary/20" />
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
              </CardContent>
            </Card>
          </FadeIn>
        )}
      </div>
    </div>
  );
}

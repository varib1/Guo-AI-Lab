'use client';

import { ExternalLink, Github, Mail, Globe, FileText, BookOpen, GraduationCap, Briefcase, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import type { Member, Publication } from '@/data/types';

interface AcademicTemplateProps {
  member: Member;
  publications: Publication[];
}

export function AcademicTemplate({ member, publications }: AcademicTemplateProps) {
  const groupedPubs: Record<number, Publication[]> = {};
  for (const pub of publications) {
    if (!groupedPubs[pub.year]) groupedPubs[pub.year] = [];
    groupedPubs[pub.year].push(pub);
  }
  const pubYears = Object.keys(groupedPubs)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <FadeIn>
            <div className="sticky top-24 space-y-6">
              {/* Photo */}
              <div className="w-48 h-48 rounded-xl bg-primary/10 overflow-hidden mx-auto lg:mx-0">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary/50 text-4xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>

              <div className="text-center lg:text-left">
                <h1 className="text-2xl font-bold">{member.name}</h1>
                <p className="text-muted-foreground mt-1">{member.position}</p>
              </div>

              {/* Research Interests */}
              <div>
                <h3 className="text-sm font-semibold mb-2">研究兴趣</h3>
                <div className="flex flex-wrap gap-1.5">
                  {member.researchInterests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-2">
                {member.socialLinks.email && (
                  <a
                    href={`mailto:${member.socialLinks.email}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {member.socialLinks.email}
                  </a>
                )}
                {member.socialLinks.github && (
                  <a
                    href={member.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                )}
                {member.socialLinks.website && (
                  <a
                    href={member.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    个人主页
                  </a>
                )}
                {member.socialLinks.scholar && (
                  <a
                    href={member.socialLinks.scholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    Google Scholar
                  </a>
                )}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <FadeIn>
            <Card>
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
          </FadeIn>

          {/* Education */}
          {member.education.length > 0 && (
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    教育经历
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {member.education.map((edu, i) => (
                    <div key={i} className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{edu.degree}</p>
                        <p className="text-sm text-muted-foreground">{edu.institution}{edu.department ? ` · ${edu.department}` : ''}</p>
                        {edu.major && <p className="text-xs text-muted-foreground">专业：{edu.major}</p>}
                        {edu.advisor && <p className="text-xs text-muted-foreground">{edu.advisor}</p>}
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{edu.year}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeIn>
          )}

          {/* Work Experience */}
          {member.workExperience && member.workExperience.length > 0 && (
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    工作经历
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {member.workExperience.map((work, i) => (
                    <div key={i} className="border-l-2 border-primary/30 pl-4 py-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-sm font-semibold">{work.role || work.position}</p>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">{work.period}</p>
                      </div>
                      <p className="text-xs text-primary/80 font-medium">{work.organization}{work.department ? ` · ${work.department}` : ''}</p>
                      {work.description && <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{work.description}</p>}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeIn>
          )}

          {/* Projects */}
          {member.projects.length > 0 && (
            <FadeIn>
              <Card>
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
            </FadeIn>
          )}

          {/* Publications */}
          {publications.length > 0 && (
            <FadeIn>
              <Card>
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
                            {/* Cover Image */}
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
    </div>
  );
}

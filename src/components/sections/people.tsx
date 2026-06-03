'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import type { Member } from '@/data/types';
import { DISPLAY_GROUPS, sortMembersByRoleAndDate } from '@/data';

interface PeopleSectionProps {
  members: Member[];
}

function MemberCard({ member }: { member: Member }) {
  return (
    <Link href={`/people/${member.slug}`} className="block group">
      <div className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="w-16 h-16 rounded-lg bg-primary/10 flex-shrink-0 overflow-hidden">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary/50 text-xl font-semibold">
              {member.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
            {member.name}
          </h4>
          <p className="text-xs text-muted-foreground">{member.position}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {member.researchInterests.slice(0, 2).map((interest) => (
              <span
                key={interest}
                className="text-[10px] px-1.5 py-0.5 rounded bg-primary/5 text-primary/70"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PeopleSection({ members }: PeopleSectionProps) {
  // Show teacher + first few current students on homepage
  const teacher = sortMembersByRoleAndDate(members.filter((m) => m.role === 'teacher'));
  const currentStudents = sortMembersByRoleAndDate(members.filter((m) =>
    DISPLAY_GROUPS.find((g) => g.key === 'current-student')!.roles.includes(m.role)
  )).slice(0, 3);

  return (
    <section id="people" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight mb-3">团队成员</h2>
              <p className="text-muted-foreground">
                认识我们优秀的研究团队
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/people" className="gap-2">
                查看全部
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>

        <div className="space-y-8">
          {/* 教师 */}
          {teacher.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-muted-foreground mb-4">教师</h3>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teacher.map((member) => (
                  <StaggerItem key={member.slug}>
                    <MemberCard member={member} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}

          {/* 在校学生（精选） */}
          {currentStudents.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-muted-foreground mb-4">在校学生</h3>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentStudents.map((member) => (
                  <StaggerItem key={member.slug}>
                    <MemberCard member={member} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/people" className="gap-2">
              查看全部成员
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

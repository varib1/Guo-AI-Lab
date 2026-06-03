'use client';

import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import type { Member } from '@/data/types';
import { DISPLAY_GROUPS, sortMembersByRoleAndDate } from '@/data';

interface PeoplePageContentProps {
  members: Member[];
}

export function PeoplePageContent({ members }: PeoplePageContentProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <FadeIn>
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3">团队成员</h1>
          <p className="text-lg text-muted-foreground">
            认识推动我们研究前进的教师与学生
          </p>
        </div>
      </FadeIn>

      <div className="space-y-12">
        {DISPLAY_GROUPS.map((group) => {
          const roleMembers = sortMembersByRoleAndDate(members.filter((m) => group.roles.includes(m.role)));
          if (roleMembers.length === 0) return null;

          return (
            <div key={group.key}>
              <FadeIn>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-semibold">{group.label}</h2>
                  <span className="text-sm text-muted-foreground">({roleMembers.length})</span>
                </div>
              </FadeIn>

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {roleMembers.map((member) => (
                  <StaggerItem key={member.slug}>
                    <Link href={`/people/${member.slug}`} className="block group">
                      <div className="p-5 rounded-lg border border-border/50 bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-20 h-20 rounded-xl bg-primary/10 mb-3 overflow-hidden flex-shrink-0">
                            {member.photo ? (
                              <img
                                src={member.photo}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-primary/50 text-2xl font-semibold">
                                {member.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                            {member.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{member.position}</p>
                          <div className="flex flex-wrap justify-center gap-1 mt-2">
                            {member.researchInterests.slice(0, 3).map((interest) => (
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
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          );
        })}
      </div>
    </div>
  );
}

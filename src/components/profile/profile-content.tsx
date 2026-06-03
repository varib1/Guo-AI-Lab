'use client';

import type { Member, Publication } from '@/data';
import { AcademicTemplate } from './academic-template';
import { ModernTemplate } from './modern-template';
import { MinimalTemplate } from './minimal-template';

interface ProfileContentProps {
  member: Member;
  publications: Publication[];
}

export function ProfileContent({ member, publications }: ProfileContentProps) {
  switch (member.template) {
    case 'academic':
      return <AcademicTemplate member={member} publications={publications} />;
    case 'modern':
      return <ModernTemplate member={member} publications={publications} />;
    case 'minimal':
      return <MinimalTemplate member={member} publications={publications} />;
    default:
      return <AcademicTemplate member={member} publications={publications} />;
  }
}

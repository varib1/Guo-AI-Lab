'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Users, FlaskConical, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';

const ctaButtons = [
  { label: '发表论文', href: '/publications', icon: BookOpen },
  { label: '团队成员', href: '/people', icon: Users },
  { label: '研究方向', href: '/#research', icon: FlaskConical },
  { label: '联系我们', href: '/#contact', icon: Mail },
];

interface HeroSectionProps {
  publicationCount: number;
  memberCount: number;
  researchAreaCount: number;
}

export function HeroSection({ publicationCount, memberCount, researchAreaCount }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-16">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="max-w-3xl">
          <FadeIn>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              吉林大学人工智能学院
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Guo AI Lab
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-4 max-w-2xl">
              我们通过多模态学习、大语言模型、记忆系统和自主智能体的基础研究，
              推动人工智能的前沿发展。
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-base text-muted-foreground/80 leading-relaxed mb-10 max-w-2xl">
              我们的使命是构建能够像人类一样理解、推理和与世界交互的AI系统。
            </p>
          </FadeIn>

          <StaggerContainer className="flex flex-wrap gap-3" staggerDelay={0.08}>
            {ctaButtons.map((btn) => (
              <StaggerItem key={btn.label}>
                <Button variant={btn.label === '发表论文' ? 'default' : 'outline'} asChild>
                  <Link href={btn.href} className="gap-2">
                    <btn.icon className="h-4 w-4" />
                    {btn.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Stats */}
          <FadeIn delay={0.6}>
            <div className="mt-16 flex items-center gap-10 text-sm text-muted-foreground">
              <div>
                <span className="text-3xl font-bold text-foreground">{publicationCount}</span>
                <span className="ml-1.5">篇论文</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <span className="text-3xl font-bold text-foreground">{memberCount}</span>
                <span className="ml-1.5">位成员</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <span className="text-3xl font-bold text-foreground">{researchAreaCount}</span>
                <span className="ml-1.5">个研究方向</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

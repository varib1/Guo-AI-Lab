'use client';

import { researchAreas } from '@/data';
import { BookOpen, Brain, Database, Bot, Languages, Cpu, Network, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Database,
  BookOpen,
  Bot,
  Languages,
  Cpu,
  Network,
  Lightbulb,
};

export function ResearchAreasSection() {
  return (
    <section id="research" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight mb-3">研究方向</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              我们的研究涵盖人工智能的多个前沿领域，从基础理论到实际应用
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchAreas.map((area) => {
            const Icon = iconMap[area.icon] || Lightbulb;
            return (
              <StaggerItem key={area.id}>
                <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md border-border/50">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {area.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

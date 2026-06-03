import Link from 'next/link';
import { Github, BookOpen, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/50 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Lab info */}
          <div>
            <h3 className="font-bold text-lg mb-3">Guo AI Lab</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              推动人工智能前沿研究，构建能够理解、推理和与世界交互的智能系统。
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-sm mb-3">快速链接</h4>
            <div className="space-y-2">
              <Link href="/publications" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                发表论文
              </Link>
              <Link href="/people" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                团队成员
              </Link>
              <Link href="/#research" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                研究方向
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-3">联系方式</h4>
            <div className="space-y-2">
              <a
                href="https://github.com/nexus-ai-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://scholar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Google Scholar
              </a>
              <a
                href="mailto:contact@nexus-ai-lab.edu"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                contact@nexus-ai-lab.edu
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>计算机科学系，AI研究楼 301室<br />某某大学，某市 000000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Guo AI Lab. 保留所有权利。
        </div>
      </div>
    </footer>
  );
}

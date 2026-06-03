# Nexus AI Lab — Academic Research Lab Website

## 项目概览

Nexus AI Lab 的学术研究实验室官网，包含首页、成员档案系统、出版物浏览页。数据驱动架构，添加新成员只需在 `src/data/members/` 下创建新文件夹。

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Dark Mode**: next-themes
- **Icons**: Lucide React

## 目录结构

```
├── public/                          # 静态资源
│   └── members/                     # 成员照片 (每人一个子目录)
│       ├── wei-chen/photo.jpg
│       ├── sarah-johnson/photo.jpg
│       └── ...
├── src/
│   ├── app/                         # 页面路由 (Server Components)
│   │   ├── page.tsx                 # 首页 (Hero + Research + Publications + People + News)
│   │   ├── layout.tsx               # 根布局 (ThemeProvider + Navbar + Footer)
│   │   ├── globals.css              # 全局样式 (学术靛蓝配色)
│   │   ├── publications/
│   │   │   └── page.tsx             # 出版物列表页 (搜索/筛选)
│   │   └── people/
│   │       └── [slug]/
│   │           └── page.tsx         # 成员档案页 (SSG, generateStaticParams)
│   │       └── page.tsx             # People 列表页 (全部成员按角色分组)
│   ├── components/
│   │   ├── navbar.tsx               # 顶部导航栏 (滚动感知/移动端菜单)
│   │   ├── footer.tsx               # 页脚 (联系信息/社交链接)
│   │   ├── theme-provider.tsx       # next-themes 包装
│   │   ├── theme-toggle.tsx         # 深色模式切换按钮
│   │   ├── motion.tsx               # Framer Motion 封装 (FadeIn/StaggerContainer/StaggerItem/ScaleIn)
│   │   ├── sections/                # 首页各区块 (Client Components, 数据通过 props)
│   │   │   ├── hero.tsx
│   │   │   ├── research-areas.tsx
│   │   │   ├── publications.tsx     # props: publications
│   │   │   ├── publication-list.tsx # props: publications, years, venues
│   │   │   ├── people.tsx           # 首页 Team 区块 (props: members)
│   │   │   ├── people-page.tsx      # /people 完整列表页 (props: members)
│   │   │   └── news.tsx
│   │   ├── profile/                 # 成员档案模板
│   │   │   ├── profile-content.tsx  # 模板路由分发
│   │   │   ├── academic-template.tsx # 学术风格 (左栏侧边栏)
│   │   │   ├── modern-template.tsx  # 现代卡片风格
│   │   │   └── minimal-template.tsx # 极简时间线风格
│   │   └── ui/                      # shadcn/ui 组件库
│   ├── data/                        # 数据层 (核心！)
│   │   ├── index.ts                 # 类型 + 静态数据导出 (客户端安全)
│   │   ├── server.ts                # 服务端自动发现模块 (fs.readdirSync)
│   │   ├── types.ts                 # 所有 TypeScript 类型定义
│   │   ├── members/                 # 成员数据 (两级目录，自动发现)
│   │   │   ├── faculty/             # 教师
│   │   │   │   ├── wei-chen/
│   │   │   │   │   └── data.json
│   │   │   │   └── sarah-johnson/
│   │   │   │       └── data.json
│   │   │   ├── students/            # 在校学生
│   │   │   │   ├── michael-park/
│   │   │   │   │   └── data.json
│   │   │   │   └── ...
│   │   │   └── alumni/              # 毕业学生
│   │   │       └── yuxin-wang/
│   │   │           └── data.json
│   │   ├── research.ts             # 研究方向数据 (6个)
│   │   └── news.ts                 # 新闻数据 (8条)
│   ├── hooks/
│   ├── lib/
│   │   └── utils.ts                # cn 工具函数
│   └── server.ts
├── DESIGN.md                        # 设计规范 (配色/字体/动效/禁忌)
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 构建与开发命令

- 开发: `pnpm dev` (端口 5000，HMR)
- 构建: `pnpm build`
- 类型检查: `pnpm ts-check`
- Lint: `pnpm lint`
- 生产启动: `pnpm start`

## 数据驱动架构说明

### 核心原则

- **Members 是核心**：所有数据以成员为中心，论文属于成员
- **自动发现**：`src/data/server.ts` 通过 `fs.readdirSync` 自动扫描成员目录，无需手动注册
- **出版物来源**：全局出版物列表从成员数据中自动聚合（按 title+year 去重）

### 添加新成员（无需修改任何代码文件！）

1. 根据角色选择分类文件夹：`faculty/`、`students/`、`alumni/`
2. 在对应分类下创建新文件夹，如 `src/data/members/students/your-name/`
3. 在文件夹中创建 `data.json`，填写成员信息（参考现有成员格式）
4. 可选：在 `public/members/your-name/` 放置照片等资源
5. 完成！服务器会自动发现新成员，页面路由自动生成

### data.json 必填字段

```json
{
  "name": "Your Name",
  "photo": "/members/your-name/photo.jpg",
  "role": "phd",
  "position": "PhD Student (1st Year)",
  "template": "modern",
  "bio": "Short bio...",
  "researchInterests": ["NLP", "LLM"],
  "publications": [],
  "education": [],
  "awards": [],
  "projects": [],
  "teaching": [],
  "service": [],
  "socialLinks": { "email": "name@university.edu" }
}
```

- `role`: `"faculty"` | `"phd"` | `"master"` | `"undergraduate"` | `"alumni"`
- `template`: `"academic"` | `"modern"` | `"minimal"` — 决定档案页样式
- `slug` 不需要填写，自动从文件夹名派生

### 数据导入规则（重要！）

- **Server Components** (页面组件): 从 `@/data/server` 导入数据函数
- **Client Components** (交互组件): 从 `@/data` 导入类型和静态数据，成员/论文数据通过 props 接收
- **禁止**在 Client Components 中直接导入 `@/data/server`

### 成员档案模板

- **academic**: 左侧边栏照片 + 右侧卡片内容，适合教授/资深研究员
- **modern**: 顶部大头像 + 渐变背景 + 卡片网格，适合年轻研究者
- **minimal**: 居中布局 + 时间线，适合学生/初级成员

## 代码风格指南

- TypeScript strict 模式，禁止隐式 any
- React Compiler 自动处理 memoization，不要手动使用 `useMemo`/`useCallback`
- 客户端组件用 `'use client'` 标注
- 页面组件保持 Server Component，交互部分抽到子组件
- 动画使用 `src/components/motion.tsx` 封装的 FadeIn/StaggerContainer/StaggerItem
- 颜色使用 CSS 变量 (`--primary`, `--muted-foreground` 等)，不要硬编码色值
- 图标统一使用 Lucide React

## 配色方案

学术靛蓝主题:
- Primary: `oklch(0.35 0.15 260)` — 深靛蓝 (权威感)
- Accent/Chart-2: `oklch(0.72 0.17 55)` — 琥珀橙 (高亮标记)
- 背景: 近白 `oklch(0.995 0.002 260)`
- 深色模式: 深靛底 `oklch(0.13 0.015 260)`

详见 DESIGN.md

## SEO

- 每个页面都有 `metadata` 导出 (title/description/keywords)
- 成员档案页使用 `generateMetadata` 动态生成
- `robots.ts` 配置了 index/follow

import type { ResearchArea } from './types';

export const researchAreas: ResearchArea[] = [
  {
    id: 'pattern-recognition',
    title: '模式识别与机器学习',
    description:
      '研究模式识别与机器学习的核心算法，包括分类器校准、长尾分类和联邦学习中的鲁棒学习方法。',
    icon: 'ScanSearch',
    slug: 'pattern-recognition',
  },
  {
    id: 'probabilistic-modeling',
    title: '概率模型构建与统计推断',
    description:
      '构建贝叶斯非负奖励模型、深度主题模型和变分推断框架，推动概率统计在AI中的基础应用。',
    icon: 'BarChart3',
    slug: 'probabilistic-modeling',
  },
  {
    id: 'meta-learning',
    title: '元学习',
    description:
      '研究面向小样本学习和跨域适应的元学习框架，通过原型集合表示和分布校准提升泛化能力。',
    icon: 'Repeat',
    slug: 'meta-learning',
  },
  {
    id: 'algorithmic-fairness',
    title: '算法公平性',
    description:
      '通过距离相关性最小化和分布对齐方法，学习公平表示并消除模型中的偏见。',
    icon: 'Scale',
    slug: 'algorithmic-fairness',
  },
  {
    id: 'optimal-transport',
    title: '最优传输理论',
    description:
      '将最优传输理论应用于样本重加权、分布校准和长尾分类中的少数类增强。',
    icon: 'Route',
    slug: 'optimal-transport',
  },
  {
    id: 'large-model-learning',
    title: '大模型学习',
    description:
      '研究大语言模型的预训练数据检测、微调安全防护和奖励劫持缓解，保障大模型安全可靠。',
    icon: 'Brain',
    slug: 'large-model-learning',
  },
  {
    id: 'imbalanced-classification',
    title: '不平衡分类',
    description:
      '通过神经塌缩分布对齐、少数类合成和原型导向子集提取，解决长尾和不平衡数据下的分类问题。',
    icon: 'GitBranch',
    slug: 'imbalanced-classification',
  },
  {
    id: 'tabular-learning',
    title: '表格学习',
    description:
      '研究表格数据的表示学习、异常检测和决策树-LLM融合，提升表格数据的深度学习效果。',
    icon: 'Table',
    slug: 'tabular-learning',
  },
];

import careerIcon from '@/assets/icons/category/career.png';
import financeIcon from '@/assets/icons/category/finance.png';
import investmentIcon from '@/assets/icons/category/investment.png';
import realEstateIcon from '@/assets/icons/category/real_estate.png';
import type { Category, Topic } from '@/api/learning/learning.types';

export type LearningTopicBaseMeta = {
  id: string;
  code: Topic;
  defaultName: string;
  icon: string;
};

export type LearningCategoryBaseMeta = {
  id: string;
  code: Category;
  defaultName: string;
  iconSrc: string;
  tagline: string;
  emojis: string[];
  topics: LearningTopicBaseMeta[];
};

export const LEARNING_CATEGORY_META: LearningCategoryBaseMeta[] = [
  {
    id: 'real-estate',
    code: 'REAL_ESTATE_HOUSING',
    defaultName: '부동산 · 주거',
    iconSrc: realEstateIcon,
    tagline: '내 보증금, 내가 지킨다',
    emojis: ['🏠', '🏢', '🔑', '🚪', '🛋️'],
    topics: [
      { id: 'jeonse', code: 'JEONSE', defaultName: '전세', icon: '🏦' },
      {
        id: 'monthly-rent',
        code: 'MONTHLY_RENT',
        defaultName: '월세',
        icon: '💸',
      },
      { id: 'buying', code: 'BUYING', defaultName: '매매', icon: '🏢' },
    ],
  },
  {
    id: 'living-finance',
    code: 'LIVING_FINANCE_EMPLOYMENT',
    defaultName: '생활금융 · 고용',
    iconSrc: financeIcon,
    tagline: '돈과 일, 내 편으로 만들기',
    emojis: ['💰', '💳', '🪙', '🏦', '🪙'],
    topics: [
      {
        id: 'income-expenditure',
        code: 'INCOME_EXPENDITURE',
        defaultName: '소득 및 지출',
        icon: '💵',
      },
      {
        id: 'credit-liabilities',
        code: 'CREDIT_LIABILITIES',
        defaultName: '신용 및 부채',
        icon: '💳',
      },
      {
        id: 'work-welfare',
        code: 'WORK_WELFARE',
        defaultName: '근로 및 복지',
        icon: '🧑‍💼',
      },
    ],
  },
  {
    id: 'career-tax',
    code: 'CAREER_TAX',
    defaultName: '커리어 · 세무',
    iconSrc: careerIcon,
    tagline: '세금도 전략이다',
    emojis: ['🧑‍💼', '📄', '💼', '🤝', '🚀'],
    topics: [
      {
        id: 'salary-real-income',
        code: 'SALARY_REAL_INCOME',
        defaultName: '월급과 실수령액',
        icon: '🧾',
      },
      {
        id: 'income-tax-deduction',
        code: 'INCOME_TAX_DEDUCTION',
        defaultName: '소득공제와 세액공제',
        icon: '🧮',
      },
      {
        id: 'comprehensive-income-tax',
        code: 'COMPREHENSIVE_INCOME_TAX',
        defaultName: '종합소득세',
        icon: '📊',
      },
    ],
  },
  {
    id: 'investment',
    code: 'ASSET_MANAGEMENT_INVESTMENT',
    defaultName: '자산운용 · 투자',
    iconSrc: investmentIcon,
    tagline: '투자는 언제나 똑똑히',
    emojis: ['📊', '📈', '💹', '🏛️', '📈'],
    topics: [
      { id: 'stock', code: 'STOCK', defaultName: '주식', icon: '📉' },
      {
        id: 'bond-deposit',
        code: 'BOND_DEPOSIT',
        defaultName: '채권 · 예금',
        icon: '🏦',
      },
      { id: 'annuity', code: 'ANNUITY', defaultName: '연금', icon: '🏝️' },
    ],
  },
];

export function getCategoryBaseMetaByCode(categoryCode?: Category) {
  return LEARNING_CATEGORY_META.find(
    (category) => category.code === categoryCode
  );
}

export function getCategoryBaseMetaByRouteId(categoryId?: string) {
  return LEARNING_CATEGORY_META.find((category) => category.id === categoryId);
}

export function getTopicBaseMetaByCode(topicCode?: Topic) {
  return LEARNING_CATEGORY_META.flatMap((category) => category.topics).find(
    (topic) => topic.code === topicCode
  );
}

export function getTopicBaseMetaByRouteId(topicId?: string) {
  return LEARNING_CATEGORY_META.flatMap((category) => category.topics).find(
    (topic) => topic.id === topicId
  );
}

export function getTopicLabel(topicCode: Topic) {
  return getTopicBaseMetaByCode(topicCode)?.defaultName ?? topicCode;
}

export function getTopicIconByRouteId(topicId: string) {
  return getTopicBaseMetaByRouteId(topicId)?.icon ?? '•';
}

export function getCategoryEmojis(categoryCode?: Category) {
  return (
    getCategoryBaseMetaByCode(categoryCode)?.emojis ?? [
      '💡',
      '📚',
      '🎯',
      '🚀',
      '⭐',
    ]
  );
}

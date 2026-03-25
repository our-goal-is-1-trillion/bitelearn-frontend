import careerIcon from '@/assets/icons/category/career.png';
import financeIcon from '@/assets/icons/category/finance.png';
import investmentIcon from '@/assets/icons/category/investment.png';
import realEstateIcon from '@/assets/icons/category/real_estate.png';
import type { Category, Topic } from '@/api/learning/learning.types';

export type LearningTopicUiMeta = {
  id: string;
  code: Topic;
  icon: string;
};

export type LearningCategoryUiMeta = {
  id: string;
  code: Category;
  iconSrc: string;
  tagline: string;
  emojis: string[];
  topics: LearningTopicUiMeta[];
};

// 학습 카테고리 및 토픽에 대한 UI 메타데이터 정의
export const LEARNING_CATEGORY_META: LearningCategoryUiMeta[] = [
  {
    id: 'real-estate',
    code: 'REAL_ESTATE_HOUSING',
    iconSrc: realEstateIcon,
    tagline: '내 보증금, 내가 지킨다',
    emojis: ['🏠', '🏢', '🔑', '🚪', '🛋️'],
    topics: [
      { id: 'jeonse', code: 'JEONSE', icon: '🏦' },
      {
        id: 'monthly-rent',
        code: 'MONTHLY_RENT',
        icon: '💸',
      },
      { id: 'buying', code: 'BUYING', icon: '🏢' },
    ],
  },
  {
    id: 'living-finance',
    code: 'LIVING_FINANCE_EMPLOYMENT',
    iconSrc: financeIcon,
    tagline: '돈과 일, 내 편으로 만들기',
    emojis: ['💰', '💳', '🪙', '🏦', '🪙'],
    topics: [
      {
        id: 'income-expenditure',
        code: 'INCOME_EXPENDITURE',
        icon: '💵',
      },
      {
        id: 'credit-liabilities',
        code: 'CREDIT_LIABILITIES',
        icon: '💳',
      },
      {
        id: 'work-welfare',
        code: 'WORK_WELFARE',
        icon: '🧑‍💼',
      },
    ],
  },
  {
    id: 'career-tax',
    code: 'CAREER_TAX',
    iconSrc: careerIcon,
    tagline: '세금도 전략이다',
    emojis: ['🧑‍💼', '📄', '💼', '🤝', '🚀'],
    topics: [
      {
        id: 'salary-real-income',
        code: 'SALARY_REAL_INCOME',
        icon: '🧾',
      },
      {
        id: 'income-tax-deduction',
        code: 'INCOME_TAX_DEDUCTION',
        icon: '🧮',
      },
      {
        id: 'comprehensive-income-tax',
        code: 'COMPREHENSIVE_INCOME_TAX',
        icon: '📊',
      },
    ],
  },
  {
    id: 'investment',
    code: 'ASSET_MANAGEMENT_INVESTMENT',
    iconSrc: investmentIcon,
    tagline: '투자는 언제나 똑똑히',
    emojis: ['📊', '📈', '💹', '🏛️', '📈'],
    topics: [
      { id: 'stock', code: 'STOCK', icon: '📉' },
      {
        id: 'bond-deposit',
        code: 'BOND_DEPOSIT',
        icon: '🏦',
      },
      { id: 'annuity', code: 'ANNUITY', icon: '🏝️' },
    ],
  },
];

// 토픽 코드에 해당하는 라벨을 반환하는 함수
const TOPIC_LABEL_BY_CODE: Record<Topic, string> = {
  JEONSE: '전세',
  MONTHLY_RENT: '월세',
  BUYING: '매매',
  INCOME_EXPENDITURE: '소득 및 지출',
  CREDIT_LIABILITIES: '신용 및 부채',
  WORK_WELFARE: '근로 및 복지',
  SALARY_REAL_INCOME: '월급과 실수령액',
  INCOME_TAX_DEDUCTION: '소득공제와 세액공제',
  COMPREHENSIVE_INCOME_TAX: '종합소득세',
  STOCK: '주식',
  BOND_DEPOSIT: '채권 · 예금',
  ANNUITY: '연금',
};

const CATEGORY_LABEL_BY_CODE: Record<Category, string> = {
  REAL_ESTATE_HOUSING: '부동산 · 주거',
  LIVING_FINANCE_EMPLOYMENT: '생활금융 · 고용',
  CAREER_TAX: '커리어 · 세무',
  ASSET_MANAGEMENT_INVESTMENT: '자산운용 · 투자',
};

// 카테고리 코드를 기반으로 UI 메타데이터를 조회하는 함수
export function getCategoryUiMetaByCode(categoryCode?: Category) {
  return LEARNING_CATEGORY_META.find(
    (category) => category.code === categoryCode
  );
}

// 라우트 ID를 기반으로 카테고리 UI 메타데이터를 조회하는 함수
export function getCategoryUiMetaByRouteId(categoryId?: string) {
  return LEARNING_CATEGORY_META.find((category) => category.id === categoryId);
}

// 라우트 ID를 기반으로 토픽 UI 메타데이터를 조회하는 함수
export function getTopicUiMetaByRouteId(topicId?: string) {
  return LEARNING_CATEGORY_META.flatMap((category) => category.topics).find(
    (topic) => topic.id === topicId
  );
}

// 토픽 코드를 기반으로 표시용 라벨을 조회하는 함수
export function getTopicLabel(topicCode?: string) {
  if (!topicCode) {
    return '';
  }

  return TOPIC_LABEL_BY_CODE[topicCode as Topic] ?? topicCode;
}

// 카테고리 코드를 기반으로 표시용 라벨을 조회하는 함수
export function getCategoryLabel(categoryCode?: string) {
  if (!categoryCode) {
    return '';
  }

  return CATEGORY_LABEL_BY_CODE[categoryCode as Category] ?? categoryCode;
}

// 라우트 ID를 기반으로 토픽 아이콘을 조회하는 함수
export function getTopicIconByRouteId(topicId: string) {
  return getTopicUiMetaByRouteId(topicId)?.icon ?? '•';
}

// 카테고리 코드를 기반으로 로드맵 이모지 배열을 조회하는 함수
export function getCategoryEmojis(categoryCode?: Category) {
  return getCategoryUiMetaByCode(categoryCode)?.emojis;
}

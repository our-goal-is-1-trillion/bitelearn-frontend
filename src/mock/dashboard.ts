import type { DashboardRecommendation } from '@/components/features/dashboard/dashboard.types';

export const DASHBOARD_RECOMMENDATIONS: DashboardRecommendation[] = [
  {
    chapterId: 1001,
    category: 'REAL_ESTATE_HOUSING',
    topic: 'JEONSE',
    title: '전세 계약 전 꼭 확인해야 할 체크리스트',
    sequence: 1,
  },
  {
    chapterId: 2001,
    category: 'LIVING_FINANCE_EMPLOYMENT',
    topic: 'INCOME_EXPENDITURE',
    title: '사회초년생을 위한 월급 관리 기초',
    prologueSubtitle: '월급 관리의 첫 단추를 채워봐요',
    sequence: 2,
  },
];

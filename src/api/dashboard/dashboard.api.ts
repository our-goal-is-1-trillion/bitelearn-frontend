import apiClient from '@/api/auth/axios';
import type { DashboardRecommendationResponse } from './dashboard.types';

// 랜덤 학습 챕터 추천 조회
export async function getDashboardRecommendations(): Promise<
  DashboardRecommendationResponse[]
> {
  const response = await apiClient.get<DashboardRecommendationResponse[]>(
    '/dashboards/recommendations'
  );

  return Array.isArray(response.data) ? response.data : [];
}


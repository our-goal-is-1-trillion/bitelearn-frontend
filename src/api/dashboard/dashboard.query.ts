import { useQuery } from '@tanstack/react-query';

import { getDashboardRecommendations } from './dashboard.api';

const DASHBOARD_RECOMMENDATIONS_STALE_TIME_MS = 1000 * 60 * 5;

export const dashboardQueryKeys = {
  recommendations: ['dashboard', 'recommendations'] as const,
};

export function useDashboardRecommendationsQuery(enabled = true) {
  return useQuery({
    queryKey: dashboardQueryKeys.recommendations,
    queryFn: getDashboardRecommendations,
    enabled,
    retry: false,
    staleTime: DASHBOARD_RECOMMENDATIONS_STALE_TIME_MS,
  });
}

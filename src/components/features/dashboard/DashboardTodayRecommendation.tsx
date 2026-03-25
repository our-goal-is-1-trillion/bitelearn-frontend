import AppLoading from '@/components/common/AppLoading';
import type { DashboardRecommendation } from './dashboard.types';
import DashboardRecommendationCard from './DashboardRecommendationCard';

type DashboardTodayRecommendationProps = {
  recommendations: DashboardRecommendation[];
  isLoading?: boolean;
  errorMessage?: string | null;
};

export default function DashboardTodayRecommendation({
  recommendations,
  isLoading = false,
  errorMessage = null,
}: DashboardTodayRecommendationProps) {
  if (isLoading) {
    return (
      <section>
        <div className="mb-4 flex items-end gap-2">
          <span>🌟</span>
          <h3 className="text-lg font-semibold leading-7 text-foreground">
            오늘의 추천 학습
          </h3>
        </div>

        <AppLoading
          message="추천 학습을 불러오는 중이에요."
          variant="section"
          className="py-10"
        />
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section>
        <div className="mb-4 flex items-end gap-2">
          <span>🌟</span>
          <h3 className="text-lg font-semibold leading-7 text-foreground">
            오늘의 추천 학습
          </h3>
        </div>

        <div className="py-6 text-sm font-medium text-red-400">
          {errorMessage}
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-end gap-2">
        <span>🌟</span>
        <h3 className="text-lg font-semibold leading-7 text-foreground">
          오늘의 추천 학습
        </h3>
      </div>

      <div className="flex flex-col gap-5">
        {recommendations.map((recommendation) => (
          <DashboardRecommendationCard
            key={`${recommendation.category}-${recommendation.chapterId}`}
            recommendation={recommendation}
          />
        ))}
      </div>
    </section>
  );
}

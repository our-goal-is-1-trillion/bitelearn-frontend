import type { DashboardRecommendation } from './dashboard.types';
import DashboardRecommendationCard from './DashboardRecommendationCard';

type DashboardTodayRecommendationProps = {
  recommendations: DashboardRecommendation[];
};

export default function DashboardTodayRecommendation({
  recommendations,
}: DashboardTodayRecommendationProps) {
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
            key={`${recommendation.categoryId}-${recommendation.chapterId}`}
            recommendation={recommendation}
          />
        ))}
      </div>
    </section>
  );
}

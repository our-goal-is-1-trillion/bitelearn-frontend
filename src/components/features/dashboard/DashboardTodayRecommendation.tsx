import DashboardTodayRecommendationCard from "./DashboardTodayRecommendationCard"
import type { DashboardRecommendation } from "./dashboard.types"

type DashboardTodayRecommendationProps = {
  recommendations: DashboardRecommendation[]
  onContinue: () => void
}

export default function DashboardTodayRecommendation({
  recommendations,
  onContinue,
}: DashboardTodayRecommendationProps) {
  return (
    <section className="my-4">
      <p className="text-base font-semibold text-slate-900">오늘의 추천 학습👇</p>
      <div className="mt-3 flex flex-col gap-2">
        {recommendations.map((recommendation, index) => (
          <DashboardTodayRecommendationCard
            key={`${recommendation.title}-${index}`}
            recommendation={recommendation}
            onContinue={onContinue}
          />
        ))}
      </div>
    </section>
  )
}

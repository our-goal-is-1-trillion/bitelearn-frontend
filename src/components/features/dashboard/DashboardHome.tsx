import DashboardBottomNav from "./DashboardBottomNav"
import DashboardCategoryList from "./DashboardCategoryList"
import DashboardContinueCard from "./DashboardContinueCard"
import DashboardHeader from "./DashboardHeader"
import DashboardTodayRecommendationCard from "./DashboardTodayRecommendationCard"
import type { DashboardCategory, DashboardRecommendation, DashboardTab } from "./dashboard.types"

type DashboardHomeProps = {
  tabs: DashboardTab[]
  categories: DashboardCategory[]
  recommendations: DashboardRecommendation[]
  onBack: () => void
  onMoveToChapter: () => void
}

export default function DashboardHome({
  tabs,
  categories,
  recommendations,
  onMoveToChapter,
}: DashboardHomeProps) {
  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200 pb-20">
        <section className="hide-scrollbar flex-1 overflow-y-auto px-5 pb-6 pt-6">
          <div className="flex flex-col gap-3">
            <DashboardHeader />
            <DashboardContinueCard onContinue={onMoveToChapter} />
            <DashboardCategoryList categories={categories} />
            <section className="my-4">
              <p className="text-base font-semibold text-slate-900">오늘의 추천 학습</p>
              <div className="mt-3 flex flex-col gap-2">
                {recommendations.map((recommendation, index) => (
                  <DashboardTodayRecommendationCard
                    key={`${recommendation.title}-${index}`}
                    recommendation={recommendation}
                    onContinue={onMoveToChapter}
                  />
                ))}
              </div>
            </section>
          </div>
        </section>

        <DashboardBottomNav tabs={tabs} />
      </div>
    </main>
  )
}

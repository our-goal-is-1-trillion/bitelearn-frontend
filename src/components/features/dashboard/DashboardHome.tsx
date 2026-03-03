import { Button } from "@/components/ui/button"
import DashboardBottomNav from "./DashboardBottomNav"
import DashboardCategoryList from "./DashboardCategoryList"
import DashboardContinueCard from "./DashboardContinueCard"
import DashboardHeader from "./DashboardHeader"
import DashboardLevelCard from "./DashboardLevelCard"
import type { DashboardCategory, DashboardTab } from "./dashboard.types"

type DashboardHomeProps = {
  tabs: DashboardTab[]
  categories: DashboardCategory[]
  onBackHome: () => void
  onMoveToChapter: () => void
}

export default function DashboardHome({
  tabs,
  categories,
  onBackHome,
  onMoveToChapter,
}: DashboardHomeProps) {
  return (
    <main className="h-screen overflow-hidden">
      <div className="mx-auto flex h-full w-fit items-start justify-center gap-3 py-4">
        <Button variant="outline" size="sm" className="mt-2" onClick={onBackHome}>
          IA 홈으로
        </Button>

        <section className="relative h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
          <div className="relative flex h-full flex-col border border-slate-200 pb-20">
            <section className="flex-1 overflow-y-auto px-6 pb-6 pt-6">
              <div className="flex flex-col gap-3">
                <DashboardHeader />
                <DashboardLevelCard />
                <DashboardContinueCard onContinue={onMoveToChapter} />
                <DashboardCategoryList categories={categories} />
              </div>
            </section>

            <DashboardBottomNav tabs={tabs} />
          </div>
        </section>
      </div>
    </main>
  )
}

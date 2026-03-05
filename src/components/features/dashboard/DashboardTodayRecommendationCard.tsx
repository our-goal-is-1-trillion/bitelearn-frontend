import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { DashboardRecommendation } from "./dashboard.types"

type DashboardTodayRecommendationCardProps = {
  recommendation: DashboardRecommendation
  onContinue: () => void
}

export default function DashboardTodayRecommendationCard({
  recommendation,
}: DashboardTodayRecommendationCardProps) {
  return (
    <article className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
      <div>
        <p className="text-xs text-slate-500">
          {recommendation.category}
          {/* {recommendation.difficulty} */}
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-900">{recommendation.title}</p>
      </div>

      <Button size="icon" className="h-9 w-9 rounded-full" variant="ghost">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </article>
  )
}

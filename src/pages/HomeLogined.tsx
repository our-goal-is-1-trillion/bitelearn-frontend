import DashboardHome from "@/components/features/dashboard/DashboardHome"
import {
  DASHBOARD_CATEGORIES,
  DASHBOARD_TABS,
  DASHBOARD_TODAY_RECOMMENDATIONS,
} from "@/components/features/dashboard/dashboard.constants"

type HomeLoginedProps = {
  onMoveToChapter?: () => void
  onMoveToLogin?: () => void
}

export default function HomeLogined({ onMoveToChapter, onMoveToLogin }: HomeLoginedProps) {
  return (
    <DashboardHome
      tabs={DASHBOARD_TABS}
      categories={DASHBOARD_CATEGORIES}
      recommendations={DASHBOARD_TODAY_RECOMMENDATIONS}
      onMoveToChapter={onMoveToChapter ?? (() => {})}
      onMoveToLogin={onMoveToLogin ?? (() => {})}
    />
  )
}

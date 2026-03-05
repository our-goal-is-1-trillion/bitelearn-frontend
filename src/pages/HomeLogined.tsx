import { useNavigate } from "react-router-dom"
import DashboardHome from "@/components/features/dashboard/DashboardHome"
import {
  DASHBOARD_CATEGORIES,
  DASHBOARD_TABS,
  DASHBOARD_TODAY_RECOMMENDATIONS,
} from "@/components/features/dashboard/dashboard.constants"

export default function HomeLogined() {
  const navigate = useNavigate()

  return (
    <DashboardHome
      tabs={DASHBOARD_TABS}
      categories={DASHBOARD_CATEGORIES}
      recommendations={DASHBOARD_TODAY_RECOMMENDATIONS}
      onMoveToChapter={() => navigate("/chapter")}
      onMoveToLogin={() => navigate("/login")}
    />
  )
}

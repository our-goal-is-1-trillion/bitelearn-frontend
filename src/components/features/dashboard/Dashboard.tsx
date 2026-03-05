import { useState } from "react"
import DashboardChapter from "./DashboardChapter"
import DashboardHome from "./DashboardHome"
import { DASHBOARD_CATEGORIES, DASHBOARD_TABS, DASHBOARD_TODAY_RECOMMENDATIONS } from "./dashboard.constants"
import type { DashboardView } from "./dashboard.types"

export default function Dashboard() {
  const [view, setView] = useState<DashboardView>("home")

  if (view === "chapter") {
    return <DashboardChapter onChapterBack={() => setView("home")} />
  }

  return (
    <DashboardHome
      tabs={DASHBOARD_TABS}
      categories={DASHBOARD_CATEGORIES}
      recommendations={DASHBOARD_TODAY_RECOMMENDATIONS}
      onMoveToChapter={() => setView("chapter")}
    />
  )
}

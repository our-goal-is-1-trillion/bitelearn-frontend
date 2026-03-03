import { useState } from "react"
import DashboardChapter from "./DashboardChapter"
import DashboardHome from "./DashboardHome"
import { DASHBOARD_CATEGORIES, DASHBOARD_TABS } from "./dashboard.constants"
import type { DashboardView } from "./dashboard.types"

type DashboardProps = {
  onBackHome: () => void
}

export default function Dashboard({ onBackHome }: DashboardProps) {
  const [view, setView] = useState<DashboardView>("home")

  if (view === "chapter") {
    return <DashboardChapter onBack={() => setView("home")} onBackHome={onBackHome} />
  }

  return (
    <DashboardHome
      tabs={DASHBOARD_TABS}
      categories={DASHBOARD_CATEGORIES}
      onBackHome={onBackHome}
      onMoveToChapter={() => setView("chapter")}
    />
  )
}

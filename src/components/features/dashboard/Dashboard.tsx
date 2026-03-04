import { useState } from "react"
import { Button } from "@/components/ui/button"
import DashboardChapter from "./DashboardChapter"
import DashboardHome from "./DashboardHome"
import { DASHBOARD_CATEGORIES, DASHBOARD_TABS, DASHBOARD_TODAY_RECOMMENDATIONS } from "./dashboard.constants"
import type { DashboardView } from "./dashboard.types"

type DashboardProps = {
  onBack: () => void
}

export default function Dashboard({ onBack }: DashboardProps) {
  const [view, setView] = useState<DashboardView>("home")

  if (view === "chapter") {
    return <DashboardChapter onChapterBack={() => setView("home")} onBack={onBack} />
  }

  return (
    <main className="h-screen overflow-hidden">
      <Button variant="outline" size="sm" className="absolute left-4 top-4 z-30" onClick={onBack}>
        IA 홈으로
      </Button>

      <DashboardHome
        tabs={DASHBOARD_TABS}
        categories={DASHBOARD_CATEGORIES}
        recommendations={DASHBOARD_TODAY_RECOMMENDATIONS}
        onBack={onBack}
        onMoveToChapter={() => setView("chapter")}
      />
    </main>
  )
}

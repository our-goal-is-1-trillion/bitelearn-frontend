import { useNavigate } from "react-router-dom"
import DashboardHome from "@/components/features/dashboard/DashboardHome"
import {
  DASHBOARD_CATEGORIES,
  DASHBOARD_TABS,
  DASHBOARD_TODAY_RECOMMENDATIONS,
} from "@/components/features/dashboard/dashboard.constants"

export default function Home() {
  const navigate = useNavigate()

  return (
    <DashboardHome
      tabs={DASHBOARD_TABS}
      categories={DASHBOARD_CATEGORIES}
      recommendations={DASHBOARD_TODAY_RECOMMENDATIONS}
      onMoveToChapter={() => navigate("/chapter")}
      onMoveToLogin={() => navigate("/login")}
      headerTitle="BiteLearn"
      headerSubtitle="로그인하고 맞춤 학습을 시작해보세요."
      continueHeadline="학습이 처음인 당신을 위해"
      continueCategory="부동산 · 주거"
      continueLessonTitle="전세사기 예방 기초"
      continueMeta="처음 시작 · 약 5분"
    />
  )
}

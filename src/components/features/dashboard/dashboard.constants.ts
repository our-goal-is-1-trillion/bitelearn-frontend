import { BookOpenCheck, FileText, GraduationCap, House, UserRound } from "lucide-react"
import type { DashboardCategory, DashboardTab } from "./dashboard.types"

export const DASHBOARD_TABS: DashboardTab[] = [
  { label: "홈", icon: House, active: true },
  { label: "학습", icon: GraduationCap, active: false },
  { label: "오답노트", icon: BookOpenCheck, active: false },
  { label: "아티클", icon: FileText, active: false },
  { label: "마이페이지", icon: UserRound, active: false },
]

export const DASHBOARD_CATEGORIES: DashboardCategory[] = [
  { name: "부동산", lessons: 12, percent: 72 },
  { name: "보험", lessons: 8, percent: 38 },
  { name: "금융", lessons: 15, percent: 84 },
]

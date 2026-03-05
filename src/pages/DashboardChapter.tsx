import { useNavigate } from "react-router-dom"
import DashboardChapter from "@/components/features/dashboard/DashboardChapter"

export default function DashboardChapterPage() {
  const navigate = useNavigate()

  return (
    <DashboardChapter
      onChapterBack={() => navigate("/home")}
      onStartLearning={() => navigate("/quiz/choice")}
    />
  )
}

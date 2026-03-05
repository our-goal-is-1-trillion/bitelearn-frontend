import DashboardChapter from "@/components/features/dashboard/DashboardChapter"

type DashboardChapterPageProps = {
  onChapterBack?: () => void
  onStartLearning?: () => void
}

export default function DashboardChapterPage({
  onChapterBack,
  onStartLearning,
}: DashboardChapterPageProps) {
  return (
    <DashboardChapter
      onChapterBack={onChapterBack ?? (() => {})}
      onStartLearning={onStartLearning ?? (() => {})}
    />
  )
}

type DashboardHeaderProps = {
  onProfileClick: () => void
  title?: string
  subtitle?: string
}

export default function DashboardHeader({
  onProfileClick,
  title = "Siwon님, 안녕하세요!",
  subtitle = "오늘도 학습을 이어가볼까요?",
}: DashboardHeaderProps) {
  return (
    <header>
      <div className="flex justify-between items-center my-4">
        <div className="space-y-1">
          <h2 className="mt-1 text-xl font-semibold text-slate-900">{title}</h2>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
        <div>
          <button
            type="button"
            aria-label="로그인 화면으로 이동"
            className="h-10 w-10 rounded-full bg-slate-300"
            onClick={onProfileClick}
          />
        </div>
      </div>
    </header>
  )
}

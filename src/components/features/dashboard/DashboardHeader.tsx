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
    <header className="py-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-[21px] font-bold leading-tight tracking-tight text-slate-900">{title}</h2>
          <p className="text-[13px] text-slate-500">{subtitle}</p>
        </div>
        <button
          type="button"
          aria-label="로그인 화면으로 이동"
          className="h-10 w-10 rounded-full border border-slate-200 bg-white shadow-sm transition-colors hover:bg-slate-50"
          onClick={onProfileClick}
        />
      </div>
    </header>
  )
}

export default function DashboardHeader() {
  return (
    <header>
      <div className="flex justify-between items-center my-4">
        <div className="space-y-1">
          <h2 className="mt-1 text-xl font-semibold text-slate-900">Siwon님, 안녕하세요!</h2>
          <p className="text-xs text-slate-500">오늘도 학습을 이어가볼까요?</p>
        </div>
        <div>
          <div className="w-10 h-10 rounded-full bg-slate-300"></div>
        </div>
      </div>
    </header>
  )
}

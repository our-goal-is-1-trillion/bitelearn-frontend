export default function DashboardLevelCard() {
  return (
    <article className="rounded-md border border-slate-300 bg-white px-4 py-4">
      <p className="text-sm text-slate-500">현재 레벨</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">Lv. 7 Explorer</p>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>XP 1,480 / 2,000</span>
        <span>74%</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="h-full w-[74%] rounded-full bg-slate-800" />
      </div>
    </article>
  )
}
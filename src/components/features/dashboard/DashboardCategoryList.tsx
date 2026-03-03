import type { DashboardCategory } from "./dashboard.types"

type DashboardCategoryListProps = {
  categories: DashboardCategory[]
}

export default function DashboardCategoryList({ categories }: DashboardCategoryListProps) {
  return (
    <article className="rounded-md border border-slate-300 bg-white px-4 py-4">
      <p className="text-base font-semibold text-slate-900">학습 카테고리</p>
      <div className="mt-3 space-y-2">
        {categories.map((category) => (
          <div key={category.name} className="rounded-md border border-slate-200 bg-white px-3 py-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{category.name}</p>
              <p className="text-xs text-slate-400">{category.lessons} Chapters</p>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-slate-800" style={{ width: `${category.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

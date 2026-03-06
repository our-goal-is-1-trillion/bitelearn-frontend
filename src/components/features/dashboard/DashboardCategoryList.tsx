import type { DashboardCategory } from "./dashboard.types"

type DashboardCategoryListProps = {
  categories: DashboardCategory[]
}

export default function DashboardCategoryList({ categories }: DashboardCategoryListProps) {
  return (
    <article className="my-4">
      <p className="text-base font-bold text-slate-900">4대 인생 방어막🛡️</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex aspect-[4/3] flex-col justify-end rounded-xl border border-slate-100 bg-white px-3 py-3 shadow-sm"
          >
            <div className="mb-2">
              <p className="text-sm font-bold text-slate-900">{category.name}</p>
              <p className="text-xs text-slate-400">{category.lessons} Chapters</p>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-indigo-500" style={{ width: `${category.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

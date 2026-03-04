import type { DashboardCategory } from "./dashboard.types"

type DashboardCategoryListProps = {
  categories: DashboardCategory[]
}

export default function DashboardCategoryList({ categories }: DashboardCategoryListProps) {
  return (
    <article className="my-4">
      <p className="text-base font-semibold text-slate-900">4대 인생 방어막</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <div
            key={category.name}
            className="aspect-[4/3] flex flex-col justify-end rounded-md border border-slate-200 bg-white px-3 py-3"
          >
            <div className="mb-2">
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

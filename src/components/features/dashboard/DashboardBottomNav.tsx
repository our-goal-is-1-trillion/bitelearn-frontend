import type { DashboardTab } from "./dashboard.types"

type DashboardBottomNavProps = {
  tabs: DashboardTab[]
}

export default function DashboardBottomNav({ tabs }: DashboardBottomNavProps) {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white p-3">
      <ul className="grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <li key={tab.label}>
              <button
                type="button"
                className={`flex w-full flex-col items-center justify-center gap-1 rounded-md px-1 py-1.5 text-[11px] font-medium ${
                  tab.active ? "bg-slate-800 text-white" : "text-slate-600"
                }`}
              >
                <Icon size={16} strokeWidth={2} />
                <span>{tab.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

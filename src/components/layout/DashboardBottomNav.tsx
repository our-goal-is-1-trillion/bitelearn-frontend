import type { DashboardTab } from "@/components/features/dashboard/dashboard.types"

type DashboardBottomNavProps = {
  tabs: DashboardTab[]
}

export default function DashboardBottomNav({ tabs }: DashboardBottomNavProps) {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-20 border-t border-slate-100 bg-white/95 px-3 pb-3 pt-2 backdrop-blur-md">
      <ul className="grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <li key={tab.label}>
              <button
                type="button"
                className={`flex w-full flex-col items-center justify-center gap-1 rounded-full px-1 py-1.5 text-[11px] font-medium transition-colors ${
                  tab.active ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-100"
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

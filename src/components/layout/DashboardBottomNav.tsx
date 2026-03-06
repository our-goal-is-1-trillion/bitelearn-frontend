import type { DashboardTab } from "@/components/features/dashboard/dashboard.types"

type DashboardBottomNavProps = {
  tabs: DashboardTab[]
}

export default function DashboardBottomNav({ tabs }: DashboardBottomNavProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20">
      <div className="h-7 bg-white/40 backdrop-blur-md" />
      <nav className="pointer-events-auto absolute inset-x-3 bottom-3 rounded-full border border-slate-300 bg-white p-3 shadow-sm">
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
    </div>
  )
}

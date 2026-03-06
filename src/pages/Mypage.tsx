import { DASHBOARD_TABS } from "@/components/features/dashboard/dashboard.constants"
import DashboardBottomNav from "@/components/layout/DashboardBottomNav"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import AccountInfoPage from "@/components/features/mypage/MyAccountInfo"

type MenuItem = {
  label: string
  details: {
    text: string
    toggle?: "ON" | "OFF"
  }[]
}

const MENU_ITEMS: MenuItem[] = [
  {
    label: "앱 설정",
    details: [
      { text: "다크 모드", toggle: "OFF" },
      { text: "메일 알림", toggle: "OFF" },
    ],
  },
  {
    label: "서비스 약관",
    details: [
      { text: "이용 약관" },
      { text: "개인정보 처리방침" },
      { text: "마케팅 수신 동의" },
    ],
  },
  {
    label: "고객센터",
    details: [
      { text: "자주 묻는 질문" },
      { text: "1:1 문의" },
      { text: "공지사항" },
    ],
  },
]

export default function Mypage() {
  const [currentPage, setCurrentPage] = useState<"main" | "accountInfo">("main")
  const mypageTabs = DASHBOARD_TABS.map((tab) => ({
    ...tab,
    active: tab.label === "마이",
  }))
  const [toggles, setToggles] = useState<Record<string, boolean>>(() =>
    MENU_ITEMS.flatMap((item) => item.details)
      .filter((detail) => detail.toggle !== undefined)
      .reduce<Record<string, boolean>>((acc, detail) => {
        acc[detail.text] = detail.toggle === "ON"
        return acc
      }, {})
  )

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden border border-slate-200 bg-white text-slate-900 shadow-sm">
      {currentPage === "main" ? (
      <section className="hide-scrollbar h-full overflow-y-auto px-5 py-6 pb-24">
        <header className="mb-5">
          <h1 className="text-xl font-bold">마이페이지</h1>
        </header>

        <button
          type="button"
          onClick={() => setCurrentPage("accountInfo")}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left shadow-sm"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-xl">
                👤
              </div>
              <div>
                <p className="text-lg font-bold">Siwon님</p>
                <p className="text-sm text-slate-600">siwon@bitelearn.com</p>
              </div>
            </div>
            <div className="items-center justify-center">
              <ChevronRight className="h-5 w-5 text-slate-500" />
            </div>
          </div>
        </button>

        <section className="mt-4 grid grid-cols-3 gap-2">
          <article className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center shadow-sm">
            <p className="text-xs text-slate-600">학습일</p>
            <p className="mt-1 text-lg font-bold">12일</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center shadow-sm">
            <p className="text-xs text-slate-600">완료 퀴즈</p>
            <p className="mt-1 text-lg font-bold">34개</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center shadow-sm">
            <p className="text-xs text-slate-600">평균 정답률</p>
            <p className="mt-1 text-lg font-bold">82%</p>
          </article>
        </section>

        <section className="mt-5">
          <article className="px-4 py-4">
            {MENU_ITEMS.map((item, index) => (
              <div
                key={item.label}
                className={index > 0 ? "border-t border-slate-200 pt-4" : ""}
              >
                <p className="text-sm font-semibold">{item.label}</p>
                <div className="mt-4 flex flex-col gap-3 pb-4">
                  {item.details.map((detail) => (
                    <div key={detail.text} className="flex items-center justify-between">
                      <span className="rounded-full px-1 py-1 text-xs text-slate-700">
                        {detail.text}
                      </span>
                      {detail.toggle && (
                        <button
                          type="button"
                          aria-label={`${detail.text} 토글`}
                          aria-pressed={toggles[detail.text]}
                          onClick={() =>
                            setToggles((prev) => ({
                              ...prev,
                              [detail.text]: !prev[detail.text],
                            }))
                          }
                          className={`relative h-5 w-9 rounded-full transition-colors ${
                            toggles[detail.text] ? "bg-indigo-600" : "bg-slate-300"
                          }`}
                        >
                          <span
                            className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                              toggles[detail.text] ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                      )}
                      {!detail.toggle && (
                        <ChevronRight className="h-4 w-4 text-slate-300" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </article>
        </section>

      </section>
      ) : (
        <AccountInfoPage onBack={() => setCurrentPage("main")} />
      )}

      {currentPage === "main" && <DashboardBottomNav tabs={mypageTabs} />}
    </main>
  )
}

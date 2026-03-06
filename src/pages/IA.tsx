import { useState } from "react"
import OnboardingModal from "@/components/features/onboarding/OnboardingModal"

export type IAPath =
  | "home"
  | "login"
  | "choiceQuestion"
  | "documentChoiceQuestion"
  | "documentClickQuestion"
  | "oxQuestion"
  | "conversationQuestion"
  | "result"
  | "dashBoard"
  | "wordLearning"

type IAAction = "onboarding"

type IAItem = {
  label: string
  page?: IAPath
  action?: IAAction
}

type IAProps = {
  onNavigate?: (page: IAPath) => void
}

const items: IAItem[] = [
  { label: "온보딩 스크린", action: "onboarding" },
  { label: "대시보드", page: "dashBoard" },
  { label: "로그인", page: "login" },
  { label: "지문형 객관식", page: "choiceQuestion" },
  { label: "서류 오답 찾기", page: "documentChoiceQuestion" },
  { label: "지문형 OX", page: "oxQuestion" },
  { label: "대화형 객관식", page: "conversationQuestion" },
  { label: "퀴즈 결과", page: "result" },
]

export default function IA({ onNavigate }: IAProps) {
  const [showOnboarding, setShowOnboarding] = useState(false)

  const handleSelect = (item: IAItem) => {
    if (item.action === "onboarding") {
      setShowOnboarding(true)
      return
    }

    if (!item.page || !onNavigate) return
    onNavigate(item.page)
  }

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-100 text-slate-900">
      <div className="flex h-full flex-col p-4">
        <h1 className="mb-3 text-lg font-bold">BiteLearn IA</h1>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <button
              key={item.label}
              className="rounded border bg-white px-3 py-2 text-left text-sm"
              onClick={() => handleSelect(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
    </main>
  )
}

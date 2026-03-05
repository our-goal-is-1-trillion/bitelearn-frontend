export type IAPath =
  | "home"
  | "choiceQuestion"
  | "documentChoiceQuestion"
  | "oxQuestion"
  | "conversationQuestion"
  | "result"
  | "dashBoard"
  | "wordLearning"

type IAItem = {
  label: string
  page?: IAPath
}

type IAProps = {
  onNavigate?: (page: IAPath) => void
}

const items: IAItem[] = [
  { label: "대시보드", page: "dashBoard" },
  { label: "지문형 객관식", page: "choiceQuestion" },
  { label: "서류 오답 찾기", page: "documentChoiceQuestion" },
  { label: "지문형 OX", page: "oxQuestion" },
  { label: "대화형 객관식", page: "conversationQuestion" },
  { label: "퀴즈 결과", page: "result" },
]

export default function IA({ onNavigate }: IAProps) {
  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-100 text-slate-900">
      <div className="flex h-full flex-col p-4">
        <h1 className="mb-3 text-lg font-bold">BiteLearn IA</h1>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <button
              key={item.label}
              className="rounded border bg-white px-3 py-2 text-left text-sm"
              onClick={() => item.page && onNavigate?.(item.page)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}

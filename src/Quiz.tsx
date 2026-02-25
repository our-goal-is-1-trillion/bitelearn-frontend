import { useRef, useState } from "react"
import QuizHeader from "./component/QuizHeader"
import QuizContent from "./component/QuizContent"
import QuizFooter from "./component/QuizFooter"

type QuizProps = {
  onResultPageMove: () => void
}

export default function Quiz({ onResultPageMove }: QuizProps) {
  const choices = ["선택지 1", "선택지 2", "선택지 3", "선택지 4"]
  const [selectedChoice, setSelectedChoice] = useState("")
  const isCtaEnabled = selectedChoice !== ""
  const screenRef = useRef<HTMLElement | null>(null)

  return (
    <main ref={screenRef} className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200 pb-20 pt-14">
        <div className="absolute inset-x-0 top-0 z-20 bg-white">
          <QuizHeader title="퀴즈 제목" showBackButton />
        </div>

        <QuizContent
          choices={choices}
          selectedChoice={selectedChoice}
          onChangeChoice={setSelectedChoice}
        />

        <QuizFooter
          isEnabled={isCtaEnabled}
          sheetContainer={screenRef.current}
          onResultPageMove={onResultPageMove}
        />
      </div>
    </main>
  )
}

import QuizFooter from "@/components/layout/QuizFooter"

type DocumentCardField = {
  label: string
  value: string
}

type DocumentCardData = {
  header: string
  subHeader: string
  sectionTitle: string
  fields: DocumentCardField[]
  footerNotice?: string
}

type ChoiceQuestionResultProps = {
  isCorrect: boolean
  explanation: string
  documentCard?: DocumentCardData
  correctIndex?: number
  correctAnswerText?: string
  selectedAnswerText?: string
  characterImageUrl?: string
  isLastQuestion: boolean
  onNext: () => void
}

export default function ChoiceQuestionResult({
  isCorrect,
  explanation,
  documentCard,
  correctIndex,
  correctAnswerText,
  selectedAnswerText,
  characterImageUrl = "/vite.svg",
  isLastQuestion,
  onNext,
}: ChoiceQuestionResultProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col animate-in fade-in slide-in-from-right-8 duration-500">
      <section className="flex-1 overflow-hidden px-6 pb-4">
        {isCorrect ? (
          <div className="flex flex-col items-center gap-2 pb-6">
            <img src={characterImageUrl} alt="정답 캐릭터" className="h-[120px] w-[120px] object-contain" />
            <h2 className="text-base font-semibold text-slate-600">맞았습니다.</h2>
          </div>
        ) : (
          <div className="flex items-center justify-between pb-6">
            <h2 className="text-base font-semibold text-slate-600">틀렸습니다.</h2>
            <img src={characterImageUrl} alt="오답 캐릭터" className="h-[120px] w-[120px] object-contain" />
          </div>
        )}

        {documentCard && (
          <div className="mb-3 rounded-md border border-slate-200 bg-slate-50 p-4">
            <p className="mb-2 text-xs font-semibold text-slate-600">{documentCard.sectionTitle}</p>
            <div className="space-y-2">
              {documentCard.fields.map((field, index) => (
                <div
                  key={`${field.label}-${index}`}
                  className={
                    index === correctIndex
                      ? "rounded border border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700"
                      : "rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                  }
                >
                  <span className="flex items-start gap-2">
                    <span className="shrink-0 font-medium">{field.label}</span>
                    <span className="min-w-0 whitespace-pre-wrap break-words">{field.value}</span>
                  </span>
                </div>
              ))}
            </div>
            {documentCard.footerNotice ? (
              <p className="mt-3 text-xs text-slate-500">{documentCard.footerNotice}</p>
            ) : null}
          </div>
        )}

        {!isCorrect && selectedAnswerText && (
          <div className="mb-3 rounded-md border border-[#e2caca] bg-[#f8e1e1] px-4 py-4">
            <p className="text-sm font-normal text-slate-900">내가 선택한 답</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-900">{selectedAnswerText}</p>
          </div>
        )}

        {correctAnswerText && (
          <div className="mb-3 rounded-md border border-[#cbe2ca] bg-[#e6f8e1] px-4 py-4">
            <p className="text-sm font-normal text-slate-900">정답</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-900">{correctAnswerText}</p>
          </div>
        )}

        <div className="rounded-md border border-slate-300 bg-white px-4 py-4">
          <p className="text-sm font-normal text-slate-900">해설</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-900">{explanation}</p>
        </div>
      </section>

      <QuizFooter onClick={onNext}>{isLastQuestion ? "최종 결과 확인" : "다음 문제"}</QuizFooter>
    </div>
  )
}

import { useLayoutEffect, useRef, useState } from "react"
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

type ChoiceQuestionPassageProps = {
  passage: string
  flavorText: string
  passageMode?: "text" | "story" | "document"
  documentCard?: DocumentCardData
  choiceMode?: "multiple" | "ox" | "document_select"
  selectedValue?: string
  onSelectDocumentField?: (value: string) => void
  isChecking?: boolean
  correctIndex?: number
  onSolve: () => void
  hideSolveButton?: boolean
}

export default function ChoiceQuestionPassage({
  passage,
  flavorText,
  passageMode = "text",
  documentCard,
  choiceMode = "multiple",
  selectedValue = "",
  onSelectDocumentField,
  isChecking = false,
  correctIndex,
  onSolve,
  hideSolveButton = false,
}: ChoiceQuestionPassageProps) {
  const isDocumentMode = passageMode === "document" && !!documentCard
  const valueRefs = useRef<Record<number, HTMLSpanElement | null>>({})
  const [isWrappedMap, setIsWrappedMap] = useState<Record<number, boolean>>({})

  useLayoutEffect(() => {
    const measure = () => {
      const next: Record<number, boolean> = {}
      Object.entries(valueRefs.current).forEach(([key, el]) => {
        if (!el) return
        const style = window.getComputedStyle(el)
        const lineHeight = Number.parseFloat(style.lineHeight || "0")
        next[Number(key)] = lineHeight > 0 ? el.scrollHeight > lineHeight + 1 : false
      })
      setIsWrappedMap(next)
    }

    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [documentCard, selectedValue, isChecking, choiceMode])

  return (
    <>
      <section className="flex-1 overflow-y-auto px-6" data-mode={passageMode}>
        <div className="rounded-md border border-slate-300 bg-white px-4 py-4">
          <p className="text-sm leading-relaxed text-slate-900">{passage}</p>
        </div>

        <p className="mt-6 text-sm text-black">{flavorText}</p>

        {isDocumentMode && (
          <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 border-b border-slate-200 pb-2">
              <p className="text-sm font-semibold text-slate-800">{documentCard.header}</p>
              <p className="text-xs text-slate-500">{documentCard.subHeader}</p>
            </div>

            <p className="mb-2 text-xs font-semibold text-slate-600">{documentCard.sectionTitle}</p>

            <div className="space-y-2">
              {documentCard.fields.map((field, index) => {
                const isSelected = selectedValue === String(index)
                const isAnswer = index === correctIndex

                let fieldClass =
                  "w-full rounded border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-900 transition-colors"

                if (choiceMode === "document_select") {
                  if (isChecking) {
                    if (isAnswer) {
                      fieldClass =
                        "w-full rounded border border-green-500 bg-green-50 px-3 py-2 text-left text-sm font-semibold text-green-700"
                    } else if (isSelected) {
                      fieldClass =
                        "w-full rounded border border-red-500 bg-red-50 px-3 py-2 text-left text-sm font-medium text-red-700"
                    } else {
                      fieldClass =
                        "w-full rounded border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm text-slate-400"
                    }
                  } else if (isSelected) {
                    fieldClass =
                      "w-full rounded border border-slate-900 bg-white px-3 py-2 text-left text-sm font-medium text-slate-900"
                  }
                }

                return (
                  <button
                    key={`${field.label}-${index}`}
                    type="button"
                    className={fieldClass}
                    onClick={() => onSelectDocumentField?.(String(index))}
                    disabled={isChecking || choiceMode !== "document_select"}
                  >
                    <span
                      className={
                        isWrappedMap[index]
                          ? "flex flex-col items-start gap-1"
                          : "flex items-start gap-2"
                      }
                    >
                      <span className="shrink-0 font-medium">{field.label}</span>
                      <span
                        ref={(el) => {
                          valueRefs.current[index] = el
                        }}
                        className="min-w-0 basis-0 flex-1 whitespace-pre-wrap break-words text-slate-500"
                      >
                        {field.value}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            {documentCard.footerNotice ? (
              <p className="mt-3 text-xs text-slate-500">{documentCard.footerNotice}</p>
            ) : null}
          </div>
        )}
      </section>

      {!hideSolveButton && <QuizFooter onClick={onSolve}>문제 풀기</QuizFooter>}
    </>
  )
}

import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"

type ChoiceQuestionFooterProps = {
  /** (메인) 버튼 비활성화 여부 */
  disabled?: boolean
  /** 이전 버튼 비활성화 여부 */
  backDisabled?: boolean
  /** 클릭 핸들러 */
  onClick: () => void
  /** 버튼 내부 텍스트 또는 엘리먼트 */
  children: ReactNode
  /** 이전 버튼 핸들러 (옵션) */
  onBack?: () => void
}

/**
 * 객관식 문제풀이 화면 하단에 고정되는 공통 CTA 풋터 내비게이션
 */
export default function ChoiceQuestionFooter({
  disabled = false,
  backDisabled = false,
  onClick,
  children,
  onBack,
}: ChoiceQuestionFooterProps) {
  return (
    <footer className="absolute inset-x-0 bottom-0 z-20 flex gap-2 border-t border-slate-200 bg-white p-4">
      {onBack && (
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 shrink-0 rounded-md bg-white text-slate-600"
          onClick={onBack}
          disabled={backDisabled}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">이전</span>
        </Button>
      )}
      <Button
        disabled={disabled}
        className="h-12 flex-1 rounded-md"
        onClick={onClick}
      >
        {children}
      </Button>
    </footer>
  )
}

import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"

type QuizFooterProps = {
  disabled?: boolean
  previousDisabled?: boolean
  onClick: () => void
  children: ReactNode
  onPrevious?: () => void
}

export default function QuizFooter({
  disabled = false,
  previousDisabled = false,
  onClick,
  children,
  onPrevious,
}: QuizFooterProps) {
  return (
    <footer className="shrink-0 flex gap-2 border-t border-slate-200 bg-white p-4">
      {onPrevious && (
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 shrink-0 rounded-md bg-white text-slate-600"
          onClick={onPrevious}
          disabled={previousDisabled}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">이전</span>
        </Button>
      )}
      <Button disabled={disabled} className="h-12 flex-1 rounded-md" onClick={onClick}>
        {children}
      </Button>
    </footer>
  )
}

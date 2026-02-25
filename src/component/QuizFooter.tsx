import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

type QuizFooterProps = {
  isEnabled: boolean
  sheetContainer: HTMLElement | null
  onResultPageMove: () => void
}

export default function QuizFooter({ isEnabled, sheetContainer, onResultPageMove }: QuizFooterProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <footer className="border-t border-slate-200 p-4">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <Button disabled={!isEnabled} className="h-12 w-full rounded-md" onClick={() => setIsSheetOpen(true)}>
          정답 확인
        </Button>

        <SheetContent
          side="bottom"
          container={sheetContainer}
          showCloseButton={false}
          overlayClassName="!absolute inset-0"
          className="!absolute inset-x-0 bottom-0 w-full rounded-t-2xl border-slate-200"
          onInteractOutside={(event) => event.preventDefault()}
        >
          <SheetHeader className="text-center sm:text-center">
            <SheetTitle className="text-center">Q2</SheetTitle>
            <SheetDescription>정답이에요!</SheetDescription>
          </SheetHeader>

          <div className="mt-6">
            <Button
              className="h-12 w-full rounded-md"
              onClick={() => {
                setIsSheetOpen(false)
                onResultPageMove()
              }}
            >
              최종 결과 확인
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </footer>
  )
}

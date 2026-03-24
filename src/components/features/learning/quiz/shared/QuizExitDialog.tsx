import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type QuizExitDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmExit: () => void;
};

export default function QuizExitDialog({
  open,
  onOpenChange,
  onConfirmExit,
}: QuizExitDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-32px)] gap-5 rounded-2xl border-none bg-popover px-5 py-4 shadow-[0_20px_40px_rgba(15,23,42,0.16)]"
      >
        <DialogHeader className="gap-2 text-left sm:text-left">
          <DialogTitle className="text-lg font-medium leading-7 text-foreground">
            정말로 나가시겠어요?
          </DialogTitle>
          <DialogDescription className="text-base leading-6 text-slate-600">
            <span className="block">
              그만 둔 지점부터 다시 이어 하실 수 있어요.
            </span>
            <span className="block">지금 학습을 떠나시겠어요?</span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="w-full shrink-0">
          <div className="ml-auto flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="h-11 min-w-[100px] rounded-xl bg-input px-4 py-2.5 text-base font-bold leading-6 text-foreground"
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={onConfirmExit}
              className="h-11 min-w-[100px] rounded-xl bg-primary px-4 py-2.5 text-base font-bold leading-6 text-foreground"
            >
              나가기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

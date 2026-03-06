import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type QuizFooterProps = {
  disabled?: boolean;
  previousDisabled?: boolean;
  onClick: () => void;
  children: ReactNode;
  onPrevious?: () => void;
};

export default function QuizFooter({
  disabled = false,
  previousDisabled = false,
  onClick,
  children,
  onPrevious,
}: QuizFooterProps) {
  return (
    <footer className="flex shrink-0 gap-2 border-t border-slate-200 bg-white p-4">
      {onPrevious && (
        <Button
          type="button"
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

      <Button
        type="button"
        disabled={disabled}
        className="h-12 flex-1 rounded-md"
        onClick={onClick}
      >
        {children}
      </Button>
    </footer>
  );
}

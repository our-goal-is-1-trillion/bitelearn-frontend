import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type QuizHeaderProps = {
  title: string;
  showCloseButton?: boolean;
  onCloseClick?: () => void;
};

export default function QuizHeader({
  title,
  showCloseButton = true,
  onCloseClick,
}: QuizHeaderProps) {
  return (
    <header className="relative flex h-14 items-center border-b border-slate-200 bg-white px-3">
      <h1 className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-sm font-medium">
        {title}
      </h1>

      {showCloseButton && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-3 h-9 w-9"
          onClick={onCloseClick}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">닫기</span>
        </Button>
      )}
    </header>
  );
}

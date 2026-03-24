import type { ReactNode } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FooterProps = {
  disabled?: boolean;
  previousDisabled?: boolean;
  onClick: () => void;
  children: ReactNode;
  onPrevious?: () => void;
  showTrailingIcon?: boolean;
  containerClassName?: string;
};

export default function Footer({
  disabled = false,
  previousDisabled = false,
  onClick,
  children,
  onPrevious,
  showTrailingIcon = true,
  containerClassName,
}: FooterProps) {
  const hasPrevious = Boolean(onPrevious);

  return (
    <footer
      className={cn(
        'flex shrink-0 gap-3 bg-card px-5 pb-8 pt-4',
        containerClassName
      )}
    >
      {hasPrevious && onPrevious && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-14 w-14 shrink-0 rounded-2xl bg-slate-100 text-foreground shadow-none hover:bg-slate-200"
          onClick={onPrevious}
          disabled={previousDisabled}
        >
          <ArrowLeft className="h-6 w-6" strokeWidth={2.2} />
          <span className="sr-only">이전</span>
        </Button>
      )}

      <Button
        type="button"
        disabled={disabled}
        className={cn(
          'relative h-14 rounded-2xl text-base font-semibold shadow-none',
          'bg-primary text-foreground hover:bg-primary-600 active:bg-primary-600',
          hasPrevious ? 'flex-1' : 'w-full'
        )}
        onClick={onClick}
      >
        {children}
        {showTrailingIcon ? (
          <ChevronRight className="absolute right-4 size-6" strokeWidth={2.2} />
        ) : null}
      </Button>
    </footer>
  );
}

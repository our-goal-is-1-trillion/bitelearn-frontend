import { ArrowLeft, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type HeaderBackgroundVariant =
  | 'default'
  | 'popover'
  | 'transparent';

const HEADER_BACKGROUND_VARIANTS: Record<HeaderBackgroundVariant, string> = {
  default:
    'bg-[rgba(255,255,255,0.80)] backdrop-blur-[6px] supports-[backdrop-filter]:bg-[rgba(255,255,255,0.80)]',
  popover: 'bg-popover',
  transparent: 'bg-transparent',
};

type HeaderProps = {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  onBackClick?: () => void;
  onCloseClick?: () => void;
  backgroundVariant?: HeaderBackgroundVariant;
  className?: string;
};

export default function Header({
  title,
  subtitle,
  showBackButton = false,
  showCloseButton = false,
  onBackClick,
  onCloseClick,
  backgroundVariant,
  className,
}: HeaderProps) {
  const hasSubtitle = Boolean(subtitle);
  const resolvedBackgroundVariant = backgroundVariant ?? 'default';

  return (
    <header
      className={cn(
        'fixed left-1/2 top-0 z-40 w-full max-w-screen-sm -translate-x-1/2',
        hasSubtitle ? 'min-h-[74px]' : 'h-[60px]',
        HEADER_BACKGROUND_VARIANTS[resolvedBackgroundVariant],
        className
      )}
    >
      <div
        className={cn(
          'relative flex items-center justify-center',
          hasSubtitle ? 'min-h-[74px] py-3' : 'h-[60px] px-5'
        )}
      >
        {title ? (
          hasSubtitle ? (
            <div className="pointer-events-none flex flex-col items-center gap-0.5 text-center">
              <h1 className="text-lg font-semibold leading-7 text-foreground">
                {title}
              </h1>
              <p className="text-sm font-medium leading-5 text-slate-600">
                {subtitle}
              </p>
            </div>
          ) : (
            <h1 className="text-lg font-semibold leading-7 text-foreground">
              {title}
            </h1>
          )
        ) : null}

        {showBackButton && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="이전"
            onClick={onBackClick}
            className="absolute left-[6px] top-[10px] size-11 rounded-xl"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        )}

        {showCloseButton && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="닫기"
            onClick={onCloseClick}
            className="absolute right-[6px] top-[10px] size-11 rounded-xl"
          >
            <X className="h-6 w-6" />
          </Button>
        )}
      </div>
    </header>
  );
}

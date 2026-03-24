import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

type AppLoadingVariant = 'page' | 'section' | 'inline';

type AppLoadingProps = {
  message?: string;
  variant?: AppLoadingVariant;
  className?: string;
};

export default function AppLoading({
  message = '로딩 중...',
  variant = 'page',
  className,
}: AppLoadingProps) {
  const wrapperClassName =
    variant === 'page'
      ? 'flex min-h-dvh flex-col items-center justify-center gap-3'
      : variant === 'section'
        ? 'flex w-full flex-col items-center justify-center gap-3 py-20'
        : 'flex w-full items-center justify-center gap-2 py-4';

  const spinnerClassName = variant === 'inline' ? 'h-4 w-4' : 'h-6 w-6';
  const messageClassName = variant === 'inline' ? 'text-xs' : 'text-sm';

  return (
    <div className={cn(wrapperClassName, className)}>
      <LoaderCircle
        className={cn(spinnerClassName, 'animate-spin text-placeholder')}
      />
      <p className={cn(messageClassName, 'text-slate-500')}>{message}</p>
    </div>
  );
}

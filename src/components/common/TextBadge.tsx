import { cn } from '@/lib/utils';

type TextBadgeProps = {
  children: string;
  className?: string;
  variant?: 'default' | 'primary';
};

export default function TextBadge({
  children,
  className,
  variant = 'default',
}: TextBadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full px-2.5 py-1.5 text-xs font-semibold leading-4',
        variant === 'primary'
          ? 'bg-primary text-foreground'
          : 'bg-slate-100 text-slate-600',
        className
      )}
    >
      {children}
    </span>
  );
}

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type IncorrectCategoryChipProps = {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

export default function IncorrectCategoryChip({
  label,
  isActive = false,
  onClick,
}: IncorrectCategoryChipProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className={cn(
        'h-9 whitespace-nowrap rounded-full px-3 py-2 text-sm leading-5 transition-colors',
        isActive
          ? 'font-semibold bg-primary text-foreground hover:bg-primary/90 hover:text-foreground'
          : 'font-medium bg-slate-300 text-foreground hover:bg-slate-500 hover:text-slate-100'
      )}
    >
      {label}
    </Button>
  );
}

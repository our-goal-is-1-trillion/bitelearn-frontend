import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { LEVEL_META } from './levelMeta';

type LevelInfoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentLevel: number;
};

function LevelCard({
  level,
  name,
  description,
  image,
  badgeClassName,
  isCurrent,
}: (typeof LEVEL_META)[number] & { isCurrent: boolean }) {
  return (
    <div
      className={cn(
        'flex w-full items-center gap-3 rounded-2xl bg-slate-100 px-3 py-2',
        isCurrent && 'border-2 border-slate-400 px-[10px] py-[6px]'
      )}
    >
      <div
        className={cn(
          'flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border',
          badgeClassName
        )}
      >
        <img src={image} alt="" className="h-[52px] w-[52px] object-contain" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-5 text-foreground">
          {`Lv.${level} ${name}`}
        </p>
        <p className="mt-1 text-xs font-medium leading-4 text-slate-600">
          {description}
        </p>
      </div>

      {isCurrent ? (
        <div
          className="flex h-6 w-6 shrink-0 items-center justify-center"
          aria-hidden="true"
        >
          <span className="h-[18px] w-[18px] rounded-full bg-slate-300 p-[3px]">
            <span className="block h-full w-full rounded-full bg-slate-400" />
          </span>
        </div>
      ) : null}
    </div>
  );
}

export default function LevelInfoDialog({
  open,
  onOpenChange,
  currentLevel,
}: LevelInfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-32px)] max-w-[335px] gap-5 rounded-2xl border-none bg-popover px-5 py-4 shadow-[0_20px_40px_rgba(15,23,42,0.16)] sm:rounded-2xl">
        <DialogTitle className="text-left text-lg font-medium leading-7 text-foreground">
          나의 레벨
        </DialogTitle>

        <div className="flex flex-col gap-4">
          {LEVEL_META.map((item) => (
            <LevelCard
              key={item.level}
              {...item}
              isCurrent={item.level === currentLevel}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

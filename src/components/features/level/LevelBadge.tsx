import { useState } from 'react';
import { cn } from '@/lib/utils';
import LevelInfoDialog from './LevelInfoDialog';
import { getLevelState } from './level.utils';

type LevelBadgeProps = {
  currentLevel?: number;
  label?: string;
  className?: string;
  imageClassName?: string;
};

export default function LevelBadge({
  currentLevel = 1,
  label,
  className,
  imageClassName,
}: LevelBadgeProps) {
  const [open, setOpen] = useState(false);
  const { normalizedLevel, levelMeta } = getLevelState(currentLevel);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={label ?? `현재 ${normalizedLevel}레벨`}
        className={cn(
          'inline-flex size-[60px] shrink-0 items-center justify-center rounded-full border p-px shadow-bl-active',
          levelMeta.badgeClassName,
          className
        )}
      >
        <img
          src={levelMeta.image}
          alt=""
          aria-hidden="true"
          className={cn('size-[52px] object-cover', imageClassName)}
        />
      </button>

      <LevelInfoDialog
        open={open}
        onOpenChange={setOpen}
        currentLevel={normalizedLevel}
      />
    </>
  );
}

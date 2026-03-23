import DashboardCharacter from '@/assets/character/dashboard_hero.png';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type DashboardHeroCardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  characterClassName?: string;
};

export default function DashboardHeroCard({
  children,
  className,
  innerClassName,
  characterClassName,
}: DashboardHeroCardProps) {
  return (
    <div className={cn('relative pt-11', className)}>
      <div
        className={cn(
          'relative overflow-hidden rounded-[32px] bg-orange-100 px-3 pb-3 pt-10 shadow-[0_12px_16px_rgba(237,238,246,1),inset_0_0_4px_rgba(254,215,170,1)]',
          innerClassName
        )}
      >
        {children}
      </div>

      <div
        className={cn(
          'pointer-events-none absolute left-1/2 top-[-14px] h-[98px] w-[136px] -translate-x-1/2',
          characterClassName
        )}
        aria-hidden="true"
      >
        <img
          src={DashboardCharacter}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

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
    <div className={cn('relative mb-8 pt-11', className)}>
      <div
        className={cn(
          'relative overflow-hidden rounded-[32px] bg-orange-100 px-3 pb-3 pt-10 shadow-bl-lg',
          innerClassName
        )}
      >
        {/* 주황색 테두리(이너 섀도우) 전용 레이어 */}
        <div className="pointer-events-none absolute inset-0 rounded-[32px] shadow-bl-hero" />

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

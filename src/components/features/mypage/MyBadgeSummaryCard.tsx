import byteIcon from '@/assets/icons/byte.svg';
import LevelBadge from '@/components/features/level/LevelBadge';
import {
  formatByteCount,
  getLevelByteProgress,
  getLevelState,
} from '@/components/features/level/level.utils';

type MyBadgeSummaryCardProps = {
  currentLevel?: number;
  currentBytes: number;
};

export default function MyBadgeSummaryCard({
  currentLevel = 1,
  currentBytes,
}: MyBadgeSummaryCardProps) {
  const { normalizedLevel, levelMeta } = getLevelState(currentLevel);
  const levelProgress = getLevelByteProgress({
    currentLevel,
    currentTotalBytes: currentBytes,
  });

  return (
    <section className="rounded-2xl border-2 border-slate-100 bg-white p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-bold leading-5 text-slate-600">
            {`Lv.${normalizedLevel} ${levelMeta.name}`}
          </p>

          <div className="mt-1 flex items-center gap-1">
            <img
              src={byteIcon}
              alt="바이트 아이콘"
              aria-hidden="true"
              className="h-6 w-6 shrink-0"
            />

            <div className="flex items-start gap-1">
              <span className="text-3xl font-extrabold leading-10 tracking-normal text-foreground">
                {formatByteCount(currentBytes)}
              </span>
              <span className="pt-[10px] text-base font-extrabold leading-6 text-[#f97316]">
                B
              </span>
            </div>
          </div>
        </div>

        <LevelBadge
          currentLevel={normalizedLevel}
          label={`현재 ${normalizedLevel}레벨 배지`}
        />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold leading-4 text-slate-400">
            다음 뱃지까지
          </p>
          <p className="text-xs font-bold leading-4 text-[#f97316]">
            {levelProgress.remainingBytes > 0
              ? `${formatByteCount(levelProgress.remainingBytes)} B 남음`
              : '달성 완료'}
          </p>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#fdba74] to-[#f97316]"
            style={{ width: `${levelProgress.progressPercentage}%` }}
          />
        </div>
      </div>
    </section>
  );
}

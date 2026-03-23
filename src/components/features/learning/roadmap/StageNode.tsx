import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type {
  ChapterSummaryDto,
  Category,
} from '@/api/learning/learning.types';
import { cn } from '@/lib/utils';

// 카테고리(학습 도메인)별 테마 이모지 배열
const EMOJI_BY_CATEGORY: Record<Category, string[]> = {
  REAL_ESTATE: ['🏠', '🏢', '🔑', '🚪', '🛋️'],
  FINANCE: ['💰', '💳', '🪙', '🏦', '📈'],
  CAREER: ['🧑‍💼', '📄', '💼', '🤝', '🚀'],
  INVESTMENT: ['📊', '📈', '💹', '🪙', '🏛️'],
  LAW: ['⚖️', '📜', '🏛️', '🤝', '📝'],
};
const FALLBACK_EMOJIS = ['💡', '📚', '🎯', '🚀', '⭐'];

type StageNodeProps = {
  chapter: ChapterSummaryDto;
  index: number;
  categoryCode?: Category;
  onSelect: () => void;
};

export default function StageNode({
  chapter,
  index,
  categoryCode,
  onSelect,
}: StageNodeProps) {
  // 현재 카테고리에 맞는 이모지 배열을 가져와서 시퀀스별로 로테이션
  const emojis = categoryCode
    ? EMOJI_BY_CATEGORY[categoryCode]
    : FALLBACK_EMOJIS;
  const currentEmoji = emojis[(chapter.sequence - 1) % emojis.length];
  const isCompleted = chapter.status === 'COMPLETED';
  const isInProgress = chapter.status === 'QUIZ_IN_PROGRESS';
  const isLocked = chapter.isLocked ?? false;

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.05,
        type: 'spring',
        stiffness: 260,
        damping: 22,
      }}
    >
      <Button
        disabled={isLocked}
        onClick={onSelect}
        variant="ghost"
        className={cn(
          'group relative z-10 flex h-20 w-20 items-center justify-center p-0 transition-all hover:bg-transparent disabled:opacity-100',
          !isLocked ? 'active:scale-95' : ''
        )}
      >
        {/* 3D 하단 그림자 (Base) */}
        <div
          className={cn(
            'absolute inset-x-[2px] bottom-0 top-11 rounded-b-[22px] bg-gradient-to-t from-[#d9dee5] from-0% to-[#bdc6d0] to-[60%] shadow-md'
          )}
        />

        {/* 3D 윗면 (사다리꼴 형태: perspective와 rotateX로 구현) */}
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-[72px] rounded-[24px] border-[1px] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.05)]',
            isLocked
              ? 'border-white/60 bg-slate-100'
              : 'border-white/80 bg-white'
          )}
          style={{
            transformOrigin: 'top',
            transform: 'perspective(160px) rotateX(16deg) scale(0.88)',
          }}
        />

        {/* 버튼 아이콘(이모지) 콘텐츠 영역 */}
        <div className="relative z-20 flex flex-col items-center justify-center">
          {isCompleted ? (
            <Check size={36} strokeWidth={4} className="-mt-2.5 text-primary" />
          ) : isLocked ? (
            <span className="tossface -mt-3 text-[34px]">🔒</span>
          ) : (
            <span className="tossface -mt-3 text-[38px]">{currentEmoji}</span>
          )}
        </div>

        {isInProgress && (
          <div className="absolute -right-2 -top-2.5 z-30">
            {/* 동심원으로 퍼져나가는 핑 애니메이션 
                (비율이 망가지는 scale 대신 boxShadow 확장을 사용해 상하좌우 동일한 픽셀로 균일하게 퍼져나갑니다) */}
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0px 0px 0px 0px rgba(24,240,157,0.8)',
                  '0px 0px 0px 10px rgba(24,240,157,0)',
                ],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />

            {/* 실제 뱃지 */}
            <div className="relative rounded-full border border-primary/20 bg-primary px-2 py-0.5 text-xs font-bold text-foreground shadow-sm">
              진행 중
            </div>
          </div>
        )}
      </Button>

      <div
        className={cn(
          'mt-3 rounded-xl px-3 py-2 text-center transition-colors',
          isCompleted || isLocked ? 'glass-label-dim' : 'glass-label'
        )}
      >
        <p
          className={cn('text-sm font-semibold leading-tight text-foreground')}
        >
          {chapter.title}
        </p>
      </div>
    </motion.div>
  );
}

import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TextBadge from '@/components/common/TextBadge';
import { Button } from '@/components/ui/button';
import DashboardHeroCard from './DashboardHeroCard';
import type { RecentLearning } from './dashboard.types';

type MemberContinueLearningCardProps = {
  recentLearning: RecentLearning;
};

export default function MemberContinueLearningCard({
  recentLearning,
}: MemberContinueLearningCardProps) {
  const navigate = useNavigate();

  return (
    <DashboardHeroCard>
      <div className="overflow-hidden rounded-3xl bg-card shadow-[0_-4px_32px_12px_rgba(254,215,170,1)]">
        <div className="px-5 pt-4">
          <div className="mb-2.5 flex flex-wrap items-start gap-2">
            <TextBadge>{recentLearning.categoryName}</TextBadge>
            <TextBadge>{recentLearning.topicName}</TextBadge>
          </div>

          <div className="mb-2 flex items-end justify-between gap-3">
            <p className="line-clamp-2 text-base font-medium leading-6 text-foreground">
              {recentLearning.chapterTitle}
            </p>
            <p className="shrink-0 pb-0.5 text-xs font-medium leading-4 text-slate-400">
              {`${recentLearning.progressPercent}% 학습 중`}
            </p>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-200 to-orange-400"
              style={{
                width: `${Math.max(
                  0,
                  Math.min(recentLearning.progressPercent, 100)
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="px-5 pb-5 pt-4">
          <Button
            variant="default"
            className="relative h-10 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-foreground shadow-none"
            onClick={() =>
              navigate(
                `/learning/${recentLearning.categoryId}/${recentLearning.chapterId}`
              )
            }
            aria-label="이어서 학습하기"
          >
            <span>이어서 학습하기</span>
            <ChevronRight className="absolute right-4 h-6 w-6" />
          </Button>
        </div>
      </div>
    </DashboardHeroCard>
  );
}

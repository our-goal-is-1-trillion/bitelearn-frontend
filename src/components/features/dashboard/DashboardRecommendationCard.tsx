import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import TextBadge from '@/components/common/TextBadge';
import type { DashboardRecommendation } from './dashboard.types';

type DashboardRecommendationCardProps = {
  recommendation: DashboardRecommendation;
};

export default function DashboardRecommendationCard({
  recommendation,
}: DashboardRecommendationCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(
          `/learning/${recommendation.categoryId}/${recommendation.chapterId}`
        )
      }
      className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white/90 shadow-bl-sm transition-all active:scale-[0.98]"
    >
      <div className="px-5 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <TextBadge>{recommendation.categoryName}</TextBadge>
          <TextBadge>{recommendation.topicName}</TextBadge>
        </div>

        <div className="flex items-center justify-between gap-3 pb-5 pt-4">
          <h4 className="line-clamp-2 text-base font-medium leading-6 text-foreground">
            {recommendation.chapterTitle}
          </h4>

          <div className="flex size-7 shrink-0 items-center justify-center">
            <ChevronRight size={28} className="text-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}

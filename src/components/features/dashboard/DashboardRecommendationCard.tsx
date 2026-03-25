import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import TextBadge from '@/components/common/TextBadge';
import {
  getCategoryLabel,
  getTopicLabel,
} from '@/constants/learningMeta';
import { getCategoryMetaByCode } from '@/constants/learningNavigation';
import {
  CHAPTER_BLOCKED_TOAST_MESSAGE,
  shouldBlockRoadmapChapterEntry,
} from '@/lib/learningAccess';
import type { DashboardRecommendation } from './dashboard.types';

type DashboardRecommendationCardProps = {
  recommendation: DashboardRecommendation;
};

export default function DashboardRecommendationCard({
  recommendation,
}: DashboardRecommendationCardProps) {
  const navigate = useNavigate();
  const category = getCategoryMetaByCode(recommendation.category);
  const topic = category?.topics.find(
    (entry) => entry.code === recommendation.topic
  );

  const handleSelectRecommendation = () => {
    if (!category || !topic) {
      return;
    }

    if (shouldBlockRoadmapChapterEntry(topic.id)) {
      toast.info(CHAPTER_BLOCKED_TOAST_MESSAGE);
      return;
    }

    navigate(`/learning/${category.id}/${recommendation.chapterId}`);
  };

  return (
    <div
      onClick={handleSelectRecommendation}
      className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white/90 shadow-bl-sm transition-all active:scale-[0.98]"
    >
      <div className="px-5 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <TextBadge>{getCategoryLabel(recommendation.category)}</TextBadge>
          <TextBadge>{getTopicLabel(recommendation.topic)}</TextBadge>
        </div>

        <div className="flex items-center justify-between gap-3 pb-5 pt-4">
          <h4 className="line-clamp-2 text-base font-medium leading-6 text-foreground">
            {recommendation.title}
          </h4>

          <div className="flex size-7 shrink-0 items-center justify-center">
            <ChevronRight size={28} className="text-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}

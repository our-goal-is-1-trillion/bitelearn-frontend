import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { RecentLearningResponse } from '@/api/auth/auth.types';
import { useLearningRoadmapQuery } from '@/api/learning/learning.query';
import TextBadge from '@/components/common/TextBadge';
import { Button } from '@/components/ui/button';
import { getCategoryMetaByCode } from '@/constants/learningNavigation';
import DashboardHeroCard from './DashboardHeroCard';

type MemberContinueLearningCardProps = {
  recentLearning: RecentLearningResponse;
};

export default function MemberContinueLearningCard({
  recentLearning,
}: MemberContinueLearningCardProps) {
  const navigate = useNavigate();
  const category = getCategoryMetaByCode(recentLearning.categoryCode);
  const topic = category?.topics.find(
    (entry) => entry.code === recentLearning.topicCode
  );
  const roadmapQuery = useLearningRoadmapQuery(
    category && topic
      ? {
          categoryId: category.id,
          categoryCode: category.code,
          topicId: topic.id,
          topicCode: topic.code,
        }
      : null
  );
  const chapters = roadmapQuery.data ?? [];
  const chapter = chapters.find(
    (entry) => entry.chapterId === recentLearning.chapterId
  );

  // 학습 시작 페이지로 이동 (topic 페이지 or chapter 페이지)
  const handleContinueLearning = () => {
    if (!category || !topic) {
      return;
    }

    if (!chapter) {
      navigate(`/learning/${category.id}/topics/${topic.id}`);
      return;
    }

    navigate(`/learning/${category.id}/${recentLearning.chapterId}`, {
      state: {
        topicId: topic.id,
        chapterSequence: chapter.sequence,
        chapterIds: chapters.map((entry) => entry.chapterId),
        chapterSequenceById: Object.fromEntries(
          chapters.map((entry) => [entry.chapterId, entry.sequence])
        ),
      },
    });
  };

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
              {`${recentLearning.progressRate}% 학습 중`}
            </p>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-200 to-orange-400"
              style={{
                width: `${Math.max(
                  0,
                  Math.min(recentLearning.progressRate, 100)
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="px-5 pb-5 pt-4">
          <Button
            variant="default"
            className="relative h-10 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-foreground shadow-none"
            onClick={handleContinueLearning}
            aria-label="이어서 학습하기"
            disabled={!category || !topic}
          >
            <span>이어서 학습하기</span>
            <ChevronRight className="absolute right-4 h-6 w-6" />
          </Button>
        </div>
      </div>
    </DashboardHeroCard>
  );
}

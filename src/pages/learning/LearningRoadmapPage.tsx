import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useLearningRoadmapQuery } from '@/api/learning/learning.query';
import AppLoading from '@/components/common/AppLoading';
import Header from '@/components/common/Header';
import StageNode from '@/components/features/learning/roadmap/StageNode';
import RoadmapDecoration from '@/components/features/learning/roadmap/RoadmapDecoration';
import RoadmapCurve from '@/components/features/learning/roadmap/RoadmapCurve';
import roadmapBackgroundImage from '@/assets/roadmap/roadmap-bg.png';
import {
  getRoadmapLayoutHeight,
  getRoadmapOffset,
  STEP_Y,
  HALF_BTN,
} from '@/components/features/learning/roadmap/roadmap.utils';
import { getCategoryMetaByRouteId } from '@/constants/learningNavigation';
import {
  CHAPTER_BLOCKED_TOAST_MESSAGE,
  shouldBlockRoadmapChapterEntry,
} from '@/lib/learningAccess';
import NotFoundPage from '@/pages/NotFoundPage';

const LEARNING_ROADMAP_ERROR_MESSAGE =
  '챕터 목록을 불러오지 못했습니다. 다시 시도해 주세요.';

export default function LearningRoadmapPage() {
  const navigate = useNavigate();
  const { categoryId, topicId } = useParams();

  const category = getCategoryMetaByRouteId(categoryId);
  const selectedTopic = category?.topics.find((topic) => topic.id === topicId);
  const resolvedTopicId = selectedTopic?.id ?? category?.topics[0]?.id;
  const resolvedTopic = category?.topics.find(
    (topic) => topic.id === resolvedTopicId
  );
  const roadmapQuery = useLearningRoadmapQuery(
    category && resolvedTopic
      ? {
          categoryId: category.id,
          categoryCode: category.code,
          topicId: resolvedTopic.id,
          topicCode: resolvedTopic.code,
        }
      : null
  );
  const chapters = roadmapQuery.data ?? [];
  const isLoading = roadmapQuery.isPending;
  const loadError = roadmapQuery.error;

  if (!category || !selectedTopic) {
    return <NotFoundPage />;
  }

  const handleBack = () => {
    navigate('/learning');
  };

  // 챕터 선택 시 학습 페이지로 이동
  const handleSelectChapter = (chapterId: number, chapterSequence: number) => {
    if (shouldBlockRoadmapChapterEntry(selectedTopic.id)) {
      toast.info(CHAPTER_BLOCKED_TOAST_MESSAGE);
      return;
    }

    navigate(`/learning/${category.id}/${chapterId}`, {
      state: {
        topicId: selectedTopic.id,
        chapterSequence,
        chapterIds: chapters.map((chapter) => chapter.chapterId),
        chapterSequenceById: Object.fromEntries(
          chapters.map((chapter) => [chapter.chapterId, chapter.sequence])
        ),
      },
    });
  };

  const count = chapters.length;
  const roadmapHeight = getRoadmapLayoutHeight(count);

  return (
    <div className="relative isolate flex h-full flex-col overflow-hidden">
      {/* 
        로드맵 배경 이미지 레이어 
        - pointer-events-none: 클릭 간섭 방지
        - -z-10: Stacking Context에서 최하단(배경) 배치 (블렌드 모드 버그 방지)
        - bg-[length:auto_100%]: 비율 유지하며 "세로 100% 길이"에 딱 맞게 꽉 채움 (또는 bg-cover 혼용 가능)
      */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[length:auto_100%] bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${roadmapBackgroundImage})` }}
      />

      <Header
        title={selectedTopic.name}
        subtitle={category.name}
        showBackButton
        onBackClick={handleBack}
      />

      <section className="hide-scrollbar relative flex-1 overflow-y-auto px-6 pb-10 pt-[100px]">
        <div
          className="relative mx-auto w-full"
          style={{ height: roadmapHeight }}
        >
          {isLoading && (
            <AppLoading
              message="챕터 목록을 불러오는 중입니다."
              className="min-h-full"
            />
          )}

          {count > 0 && (
            <>
              <RoadmapCurve count={count} totalHeight={roadmapHeight} />

              {chapters.map((chapter, index) => (
                <div
                  key={chapter.chapterId}
                  className="absolute"
                  style={{
                    top: index * STEP_Y,
                    left: '50%',
                    transform: `translateX(calc(-50% + ${getRoadmapOffset(index)}px))`,
                  }}
                >
                  <StageNode
                    chapter={chapter}
                    index={index}
                    categoryCode={category.code}
                    onSelect={() =>
                      handleSelectChapter(chapter.chapterId, chapter.sequence)
                    }
                  />
                </div>
              ))}

              {/* 로드맵 장식 캐릭터
                피그마 기준 각 decoration center Y를 노드 center 기준 오프셋으로 환산:
                  mungmung  : 노드0 center - 5
                  house     : 노드0 center + 141
                  tree(left): 노드1 center + 49
                  bulldog   : 노드2 center + 37
                  tree(right): 노드3 center + 72
              */}
              {count > 0 && (
                <RoadmapDecoration
                  type="mungmung"
                  anchorY={0 * STEP_Y + HALF_BTN - 5}
                  side="right"
                  sideOffset={-24}
                  animationDelay={0.2}
                />
              )}
              {count > 0 && (
                <RoadmapDecoration
                  type="house"
                  anchorY={0 * STEP_Y + HALF_BTN + 141}
                  side="right"
                  sideOffset={-50}
                />
              )}
              {count > 1 && (
                <RoadmapDecoration
                  type="tree"
                  anchorY={1 * STEP_Y + HALF_BTN + 49}
                  side="left"
                  sideOffset={-40}
                  animationDelay={1.1}
                />
              )}
              {count > 2 && (
                <RoadmapDecoration
                  type="bulldog"
                  anchorY={2 * STEP_Y + HALF_BTN + 37}
                  side="left"
                  sideOffset={-29}
                  animationDelay={2.3}
                />
              )}
              {count > 3 && (
                <RoadmapDecoration
                  type="tree"
                  anchorY={3 * STEP_Y + HALF_BTN + 72}
                  side="right"
                  sideOffset={-59}
                  animationDelay={3.7}
                />
              )}
            </>
          )}

          {!isLoading && loadError && count === 0 && (
            <div className="flex h-full items-center justify-center text-sm font-medium text-red-400">
              {loadError instanceof Error
                ? loadError.message
                : String(loadError ?? LEARNING_ROADMAP_ERROR_MESSAGE)}
            </div>
          )}

          {!isLoading && count === 0 && !loadError && (
            <div className="flex h-full items-center justify-center text-sm font-medium text-slate-400">
              준비된 챕터가 없습니다.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

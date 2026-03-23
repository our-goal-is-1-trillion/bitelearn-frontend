import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getLearningChapters } from '@/api/learning/learning.api';
import type { ChapterSummaryDto } from '@/api/learning/learning.types';
import AppLoading from '@/components/common/AppLoading';
import StageNode from '@/components/features/learning/roadmap/StageNode';
import RoadmapDecoration from '@/components/features/learning/roadmap/RoadmapDecoration';
import { Button } from '@/components/ui/button';
import RoadmapCurve from '@/components/features/learning/roadmap/RoadmapCurve';
import {
  getRoadmapLayoutHeight,
  getRoadmapOffset,
  STEP_Y,
  HALF_BTN,
} from '@/components/features/learning/roadmap/roadmap.utils';
import { getCategoryMetaByRouteId } from '@/constants/learningNavigation';
import { logError } from '@/lib/logError';
import { getMockLearningChapters } from '@/mock/learning';

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
  const [chapters, setChapters] = useState<ChapterSummaryDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<unknown>(null);

  useEffect(() => {
    if (!category || !resolvedTopic) return;

    let isMounted = true;

    const fetchChapters = async () => {
      setIsLoading(true);

      try {
        const response = await getLearningChapters({
          category: category.code,
          topic: resolvedTopic.code,
        });

        if (!isMounted) return;
        setChapters(response.chapters);
        setLoadError(null);
      } catch (error) {
        logError('LearningRoadmapPage', '챕터 목록 조회 실패', error);

        if (!isMounted) return;

        // 로드맵 API가 아직 준비되지 않은 카테고리는 mock으로만 표시
        setChapters(getMockLearningChapters(category.id, resolvedTopic.id));
        setLoadError(error);
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    };

    void fetchChapters();

    return () => {
      isMounted = false;
    };
  }, [category, resolvedTopic]);

  if (!category || !selectedTopic) {
    return (
      <main className="flex h-dvh items-center justify-center bg-slate-50 p-6">
        <p className="text-sm font-medium text-slate-500">
          존재하지 않는 학습 경로입니다.
        </p>
      </main>
    );
  }

  const handleBack = () => {
    navigate('/learning');
  };

  const handleSelectChapter = (chapterId: number) => {
    navigate(`/learning/${category.id}/${chapterId}`);
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
        className="absolute inset-0 -z-10 pointer-events-none bg-[length:auto_100%] bg-top bg-no-repeat"
        style={{ backgroundImage: "url('/assets/roadmap-bg.png')" }}
      />

      <div className="relative z-10 shrink-0 border-b border-slate-100 bg-white px-4">
        <div className="flex h-14 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-9 w-9 rounded-xl text-slate-600"
          >
            <ChevronLeft size={20} />
          </Button>

          <h1 className="flex-1 text-center text-sm font-bold text-foreground">
            {selectedTopic.name}
          </h1>

          <div className="h-9 w-9" />
        </div>
      </div>

      <section className="relative flex-1 overflow-y-auto px-6 pb-10 pt-10 hide-scrollbar">
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
                    onSelect={() => handleSelectChapter(chapter.chapterId)}
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
                />
              )}
              {count > 2 && (
                <RoadmapDecoration
                  type="bulldog"
                  anchorY={2 * STEP_Y + HALF_BTN + 37}
                  side="left"
                  sideOffset={-29}
                />
              )}
              {count > 3 && (
                <RoadmapDecoration
                  type="tree"
                  anchorY={3 * STEP_Y + HALF_BTN + 72}
                  side="right"
                  sideOffset={-59}
                />
              )}
            </>
          )}

          {!isLoading && Boolean(loadError) && count === 0 && (
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

import { useMemo } from 'react';

import {
  useLearningCategoriesQuery,
  useLearningChapterQuery,
  useLearningRoadmapQuery,
} from '@/api/learning/learning.query';
import type { Topic } from '@/api/learning/learning.types';
import {
  buildLearningNavigation,
  getCategoryMetaByRouteId,
} from '@/constants/learningNavigation';
import {
  shouldBlockChapterRoute,
  shouldBlockMonthlyRentIntroStart,
} from '@/lib/learningAccess';

type LearningChapterLocationState = {
  topicId?: string;
  chapterSequence?: number;
  chapterIds?: number[];
  chapterSequenceById?: Record<number, number>;
};

type UseResolvedLearningChapterRouteParams = {
  categoryId?: string;
  chapterId?: string;
  locationState: LearningChapterLocationState;
};

// 챕터 페이지 진입에 필요한 라우트/로드맵 상태를 복구하는 훅
export function useResolvedLearningChapterRoute({
  categoryId,
  chapterId,
  locationState,
}: UseResolvedLearningChapterRouteParams) {
  const routeCategory = getCategoryMetaByRouteId(categoryId);
  const chapterIdNumber = Number(chapterId);
  const categoriesQuery = useLearningCategoriesQuery();
  const navigation = buildLearningNavigation(categoriesQuery.data);
  const category = navigation.find((entry) => entry.id === routeCategory?.id);

  const chapterQuery = useLearningChapterQuery(
    chapterIdNumber,
    Boolean(
      routeCategory && categoryId && chapterId && !Number.isNaN(chapterIdNumber)
    )
  );

  const resolvedTopic = routeCategory?.topics.find(
    (topic) => topic.code === chapterQuery.data?.topic
  );
  const resolvedTopicId = locationState.topicId ?? resolvedTopic?.id;
  const resolvedTopicCode: Topic | undefined =
    resolvedTopic?.code ?? (chapterQuery.data?.topic as Topic | undefined);
  const resolvedTopicName =
    category?.topics.find((topic) => topic.code === chapterQuery.data?.topic)
      ?.name ??
    chapterQuery.data?.topic ??
    '';

  const roadmapQuery = useLearningRoadmapQuery(
    routeCategory && resolvedTopic
      ? {
          categoryId: routeCategory.id,
          categoryCode: routeCategory.code,
          topicId: resolvedTopic.id,
          topicCode: resolvedTopic.code,
        }
      : null,
    !locationState.chapterIds?.length || !locationState.chapterSequenceById
  );

  const roadmapChapters = roadmapQuery.data ?? [];
  const roadmapChapterSequenceById = useMemo(
    () =>
      Object.fromEntries(
        roadmapChapters.map((entry) => [entry.chapterId, entry.sequence])
      ) as Record<number, number>,
    [roadmapChapters]
  );

  const chapterSequence =
    locationState.chapterSequenceById?.[chapterIdNumber] ??
    locationState.chapterSequence ??
    roadmapChapterSequenceById[chapterIdNumber] ??
    chapterQuery.data?.chapterSequence;

  const canEvaluateBlockedRoute = Boolean(chapterQuery.data && resolvedTopicId);
  const isBlockedChapterRoute = canEvaluateBlockedRoute
    ? shouldBlockChapterRoute(resolvedTopicId)
    : false;
  const shouldBlockIntroStart = shouldBlockMonthlyRentIntroStart({
    topicId: resolvedTopicId,
    chapterSequence,
  });
  const orderedChapterIds = locationState.chapterIds?.length
    ? locationState.chapterIds
    : roadmapChapters.map((entry) => entry.chapterId);
  const currentChapterIndex = orderedChapterIds.findIndex(
    (candidate) => candidate === chapterIdNumber
  );
  const nextChapterId =
    currentChapterIndex >= 0
      ? (orderedChapterIds[currentChapterIndex + 1] ?? null)
      : null;

  const nextChapterNavigationState = nextChapterId
    ? {
        ...locationState,
        topicId: resolvedTopicId,
        chapterSequence:
          locationState.chapterSequenceById?.[nextChapterId] ??
          roadmapChapterSequenceById[nextChapterId] ??
          locationState.chapterSequence,
        chapterIds: orderedChapterIds,
        chapterSequenceById:
          locationState.chapterSequenceById ?? roadmapChapterSequenceById,
      }
    : null;

  return {
    routeCategory,
    category,
    chapterIdNumber,
    categoriesQuery,
    chapterQuery,
    resolvedTopicId,
    resolvedTopicCode,
    resolvedTopicName,
    isBlockedChapterRoute,
    shouldBlockIntroStart,
    nextChapterId,
    nextChapterNavigationState,
  };
}

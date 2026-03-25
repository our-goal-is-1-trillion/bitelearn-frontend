import { useQuery } from '@tanstack/react-query';

import {
  getLearningCategories,
  getLearningChapter,
  getLearningChapters,
} from './learning.api';
import type { ChapterListRequest, ChapterSummaryDto } from './learning.types';

const LEARNING_CATEGORIES_STALE_TIME_MS = 1000 * 60 * 30;
const LEARNING_PROGRESS_STALE_TIME_MS = 1000 * 60 * 5;

export const learningQueryKeys = {
  categories: ['learning', 'categories'] as const,
  chapters: (params: ChapterListRequest) =>
    ['learning', 'chapters', params.category, params.topic] as const,
  chapter: (chapterId: number) => ['learning', 'chapter', chapterId] as const,
  roadmap: (categoryId: string, topicId: string) =>
    ['learning', 'roadmap', categoryId, topicId] as const,
};

// 카테고리 목록 조회 쿼리
export function useLearningCategoriesQuery() {
  return useQuery({
    queryKey: learningQueryKeys.categories,
    queryFn: getLearningCategories,
    staleTime: LEARNING_CATEGORIES_STALE_TIME_MS,
  });
}

export function getLearningChaptersQueryOptions(params: ChapterListRequest) {
  return {
    queryKey: learningQueryKeys.chapters(params),
    queryFn: () => getLearningChapters(params),
    staleTime: LEARNING_PROGRESS_STALE_TIME_MS,
  };
}

// 챕터 목록 조회 쿼리
export function useLearningChaptersQuery(
  params: ChapterListRequest,
  enabled = true
) {
  return useQuery({
    ...getLearningChaptersQueryOptions(params),
    enabled,
  });
}

// 챕터 상세 조회 쿼리
export function useLearningChapterQuery(chapterId: number, enabled = true) {
  return useQuery({
    queryKey: learningQueryKeys.chapter(chapterId),
    queryFn: () => getLearningChapter(chapterId),
    enabled,
    staleTime: LEARNING_PROGRESS_STALE_TIME_MS,
  });
}

type RoadmapQueryParams = {
  categoryId: string;
  categoryCode: ChapterListRequest['category'];
  topicId: string;
  topicCode: ChapterListRequest['topic'];
};

// 학습 로드맵 챕터 목록 조회 쿼리
async function fetchLearningRoadmapChapters({
  categoryCode,
  topicCode,
}: RoadmapQueryParams): Promise<ChapterSummaryDto[]> {
  const response = await getLearningChapters({
    category: categoryCode,
    topic: topicCode,
  });

  return response.chapters;
}

// 학습 로드맵 챕터 목록 조회 쿼리 옵션 생성 함수
export function getLearningRoadmapQueryOptions(params: RoadmapQueryParams) {
  return {
    queryKey: learningQueryKeys.roadmap(params.categoryId, params.topicId),
    queryFn: () => fetchLearningRoadmapChapters(params),
    staleTime: LEARNING_PROGRESS_STALE_TIME_MS,
  };
}

// 학습 로드맵 챕터 목록 조회 쿼리 훅
export function useLearningRoadmapQuery(
  params: RoadmapQueryParams | null,
  enabled = true
) {
  return useQuery<ChapterSummaryDto[]>({
    queryKey: params
      ? learningQueryKeys.roadmap(params.categoryId, params.topicId)
      : ['learning', 'roadmap', 'idle'],
    queryFn: () => {
      if (!params) {
        return Promise.resolve([]);
      }

      return fetchLearningRoadmapChapters(params);
    },
    enabled: Boolean(params) && enabled,
    staleTime: LEARNING_PROGRESS_STALE_TIME_MS,
  });
}

import { useQuery } from '@tanstack/react-query';

import {
  getLearningCategories,
  getLearningChapter,
  getLearningChapters,
} from './learning.api';
import type { ChapterListRequest, ChapterSummaryDto } from './learning.types';
import { logError } from '@/lib/logError';
import { getMockLearningChapters } from '@/mock/learning';
import { lockLastChapter } from '@/lib/learningNavigation';

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
    staleTime: Infinity,
  });
}

// 챕터 목록 조회 쿼리
export function useLearningChaptersQuery(
  params: ChapterListRequest,
  enabled = true
) {
  return useQuery({
    queryKey: learningQueryKeys.chapters(params),
    queryFn: () => getLearningChapters(params),
    enabled,
  });
}

// 챕터 상세 조회 쿼리
export function useLearningChapterQuery(chapterId: number, enabled = true) {
  return useQuery({
    queryKey: learningQueryKeys.chapter(chapterId),
    queryFn: () => getLearningChapter(chapterId),
    enabled,
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
  categoryId,
  categoryCode,
  topicId,
  topicCode,
}: RoadmapQueryParams): Promise<ChapterSummaryDto[]> {
  const fallbackChapters = lockLastChapter(
    getMockLearningChapters(categoryId, topicId)
  );

  try {
    const response = await getLearningChapters({
      category: categoryCode,
      topic: topicCode,
    });

    if (response.chapters.length === 0) {
      return fallbackChapters;
    }

    return lockLastChapter(response.chapters);
  } catch (error) {
    logError('LearningRoadmapPage', '챕터 목록 조회 실패', error);

    if (fallbackChapters.length > 0) {
      return fallbackChapters;
    }

    throw error;
  }
}

// 학습 로드맵 챕터 목록 조회 쿼리 훅
export function useLearningRoadmapQuery(
  params: RoadmapQueryParams | null,
  enabled = true
) {
  return useQuery({
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
  });
}

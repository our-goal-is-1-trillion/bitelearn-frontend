import type {
  Category,
  ChapterSummaryDto,
  LearningCategoryDto,
} from '@/api/learning/learning.types';
import {
  getCategoryBaseMetaByCode,
  LEARNING_CATEGORY_META,
} from '@/constants/learningMeta';
import type {
  LearningCategoryMeta,
  LearningTopicMeta,
} from '@/constants/learningNavigation';
import type { MockCategorySummary, MockTopicSummary } from '@/mock/learning';

export type NoteCategoryOption = {
  category: Category;
  categoryName: string;
};

export const MONTHLY_RENT_SUMMARY_PARAMS = {
  category: 'REAL_ESTATE_HOUSING' as const,
  topic: 'MONTHLY_RENT' as const,
};

// 학습 네비게이션 관련 유틸 함수들
export function getDefaultLearningNavigation(): LearningCategoryMeta[] {
  return LEARNING_CATEGORY_META.map((category) => ({
    id: category.id,
    code: category.code,
    name: category.defaultName,
    iconSrc: category.iconSrc,
    tagline: category.tagline,
    topics: category.topics.map((topic) => ({
      id: topic.id,
      code: topic.code,
      name: topic.defaultName,
    })),
  }));
}

// 카테고리 데이터를 FE 네비게이션 메타 구조로 변환
export function buildLearningNavigation(
  categories?: LearningCategoryDto[] | null
): LearningCategoryMeta[] {
  if (!categories?.length) {
    return getDefaultLearningNavigation();
  }

  return categories
    .map((category) => {
      const fallbackCategory = getCategoryBaseMetaByCode(category.categoryCode);

      if (!fallbackCategory) {
        return null;
      }

      const topics = category.topics
        .map((topic) => {
          const fallbackTopic = fallbackCategory.topics.find(
            (entry) => entry.code === topic.topicCode
          );

          if (!fallbackTopic) {
            return null;
          }

          return {
            id: fallbackTopic.id,
            code: fallbackTopic.code,
            name: topic.topicName,
          };
        })
        .filter((topic): topic is LearningTopicMeta => topic !== null);

      return {
        id: fallbackCategory.id,
        code: fallbackCategory.code,
        name: category.categoryName,
        iconSrc: fallbackCategory.iconSrc,
        tagline: fallbackCategory.tagline,
        topics,
      };
    })
    .filter((category): category is LearningCategoryMeta => category !== null);
}

// 카테고리 데이터를 노트 작성 시 카테고리 선택 옵션 구조로 변환
export function getNoteCategoryOptions(
  categories?: LearningCategoryDto[] | null
): NoteCategoryOption[] {
  return buildLearningNavigation(categories).map((category) => ({
    category: category.code,
    categoryName: category.name,
  }));
}

// 카테고리 메타와 요약 데이터를 병합하여 토픽별 챕터 요약 리스트 생성
export function mergeCategoryTopicsWithSummary(
  category: LearningCategoryMeta,
  summary?: MockCategorySummary
): MockTopicSummary[] {
  const topicSummaryById = Object.fromEntries(
    (summary?.topics ?? []).map((topic) => [topic.topicId, topic])
  ) as Record<string, MockTopicSummary>;

  return category.topics.map((topic) => ({
    topicId: topic.id,
    topicName: topic.name,
    chapters: topicSummaryById[topic.id]?.chapters ?? [],
  }));
}

export function lockLastChapter(
  chapters: ChapterSummaryDto[]
): ChapterSummaryDto[] {
  if (chapters.length === 0) {
    return [];
  }

  const lastChapterId = chapters[chapters.length - 1]?.chapterId;

  return chapters.map((chapter) => ({
    ...chapter,
    isLocked: chapter.chapterId === lastChapterId,
  }));
}

export function mergeMonthlyRentSummary(
  summaryByCategory: Record<string, MockCategorySummary>,
  monthlyRentChapters?: ChapterSummaryDto[]
) {
  if (!monthlyRentChapters?.length) {
    return summaryByCategory;
  }

  const realEstateSummary = summaryByCategory['real-estate'];

  if (!realEstateSummary) {
    return summaryByCategory;
  }

  const topics = realEstateSummary.topics.map((topic) =>
    topic.topicId === 'monthly-rent'
      ? {
          ...topic,
          chapters: monthlyRentChapters,
        }
      : topic
  );
  const mergedChapters = topics.flatMap((topic) => topic.chapters);
  const progressed = mergedChapters.filter(
    (chapter) => chapter.status !== 'READY'
  ).length;

  return {
    ...summaryByCategory,
    'real-estate': {
      total: mergedChapters.length,
      progressed,
      topics,
    },
  };
}

import type {
  Category,
  ChapterSummaryDto,
  LearningCategoryDto,
} from '@/api/learning/learning.types';
import { getCategoryUiMetaByCode } from '@/constants/learningMeta';
import type {
  LearningCategoryMeta,
  LearningTopicMeta,
} from '@/constants/learningNavigation';

export type NoteCategoryOption = {
  category: Category;
  categoryName: string;
};

export type LearningTopicSummary = {
  topicId: string;
  topicName: string;
  chapters: ChapterSummaryDto[];
};

export type LearningCategorySummary = {
  total: number;
  progressed: number;
  topics: LearningTopicSummary[];
};

// 카테고리 데이터를 FE 네비게이션 메타 구조로 변환
export function buildLearningNavigation(
  categories?: LearningCategoryDto[] | null
): LearningCategoryMeta[] {
  if (!categories?.length) {
    return [];
  }

  return categories
    .map((category) => {
      const categoryUiMeta = getCategoryUiMetaByCode(category.categoryCode);

      if (!categoryUiMeta) {
        return null;
      }

      const topics = category.topics
        .map((topic) => {
          const topicUiMeta = categoryUiMeta.topics.find(
            (entry) => entry.code === topic.topicCode
          );

          if (!topicUiMeta) {
            return null;
          }

          return {
            id: topicUiMeta.id,
            code: topicUiMeta.code,
            name: topic.topicName,
          };
        })
        .filter((topic): topic is LearningTopicMeta => topic !== null);

      return {
        id: categoryUiMeta.id,
        code: categoryUiMeta.code,
        name: category.categoryName,
        iconSrc: categoryUiMeta.iconSrc,
        tagline: categoryUiMeta.tagline,
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

// 카테고리 ID와 토픽 ID로 요약 데이터 키 생성
export function createLearningTopicSummaryKey(
  categoryId: string,
  topicId: string
) {
  return `${categoryId}:${topicId}`;
}

// 네비게이션 메타와 챕터 요약 데이터를 병합하여 카테고리별 토픽 요약 리스트 생성
export function buildLearningSummaryByCategory(
  navigation: LearningCategoryMeta[],
  topicChaptersByKey: Record<string, ChapterSummaryDto[]>
): Record<string, LearningCategorySummary> {
  return Object.fromEntries(
    navigation.map((category) => {
      const topics = category.topics.map((topic) => ({
        topicId: topic.id,
        topicName: topic.name,
        chapters:
          topicChaptersByKey[
            createLearningTopicSummaryKey(category.id, topic.id)
          ] ?? [],
      }));
      const mergedChapters = topics.flatMap((topic) => topic.chapters);
      const progressed = mergedChapters.filter(
        (chapter) => chapter.status !== 'READY'
      ).length;

      return [
        category.id,
        {
          total: mergedChapters.length,
          progressed,
          topics,
        } satisfies LearningCategorySummary,
      ];
    })
  );
}

// 카테고리 메타와 요약 데이터를 병합하여 토픽별 챕터 요약 리스트 생성
export function mergeCategoryTopicsWithSummary(
  category: LearningCategoryMeta,
  summary?: LearningCategorySummary
): LearningTopicSummary[] {
  const topicSummaryById = Object.fromEntries(
    (summary?.topics ?? []).map((topic) => [topic.topicId, topic])
  ) as Record<string, LearningTopicSummary>;

  return category.topics.map((topic) => ({
    topicId: topic.id,
    topicName: topic.name,
    chapters: topicSummaryById[topic.id]?.chapters ?? [],
  }));
}

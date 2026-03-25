import type { Category, Topic } from '@/api/learning/learning.types';
import {
  getCategoryUiMetaByCode,
  getCategoryUiMetaByRouteId,
} from '@/constants/learningMeta';
import { buildLearningNavigation as buildLearningNavigationFromApi } from '@/lib/learningNavigation';

export type LearningTopicRouteMeta = {
  id: string;
  code: Topic;
};

export type LearningCategoryRouteMeta = {
  id: string;
  code: Category;
  iconSrc: string;
  tagline: string;
  topics: LearningTopicRouteMeta[];
};

export type LearningTopicMeta = LearningTopicRouteMeta & {
  name: string;
};

export type LearningCategoryMeta = {
  id: string;
  code: Category;
  name: string;
  iconSrc: string;
  tagline: string;
  topics: LearningTopicMeta[];
};

export function getCategoryMetaByCode(categoryCode?: Category) {
  const category = getCategoryUiMetaByCode(categoryCode);

  if (!category) {
    return undefined;
  }

  return {
    id: category.id,
    code: category.code,
    iconSrc: category.iconSrc,
    tagline: category.tagline,
    topics: category.topics.map((topic) => ({
      id: topic.id,
      code: topic.code,
    })),
  } satisfies LearningCategoryRouteMeta;
}

export function getCategoryMetaByRouteId(categoryId?: string) {
  const category = getCategoryUiMetaByRouteId(categoryId);

  if (!category) {
    return undefined;
  }

  return {
    id: category.id,
    code: category.code,
    iconSrc: category.iconSrc,
    tagline: category.tagline,
    topics: category.topics.map((topic) => ({
      id: topic.id,
      code: topic.code,
    })),
  } satisfies LearningCategoryRouteMeta;
}

export function buildLearningNavigation(
  ...args: Parameters<typeof buildLearningNavigationFromApi>
) {
  return buildLearningNavigationFromApi(...args);
}

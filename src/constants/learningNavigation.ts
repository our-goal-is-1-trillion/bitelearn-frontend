import type { Category, Topic } from '@/api/learning/learning.types';
import {
  getCategoryBaseMetaByCode,
  getCategoryBaseMetaByRouteId,
} from '@/constants/learningMeta';
import {
  buildLearningNavigation as buildLearningNavigationFromApi,
  getDefaultLearningNavigation,
} from '@/lib/learningNavigation';

export type LearningTopicMeta = {
  id: string;
  code: Topic;
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

export const LEARNING_NAVIGATION: LearningCategoryMeta[] =
  getDefaultLearningNavigation();

export function getCategoryMetaByCode(categoryCode?: Category) {
  const category = getCategoryBaseMetaByCode(categoryCode);

  if (!category) {
    return undefined;
  }

  return LEARNING_NAVIGATION.find((entry) => entry.code === category.code);
}

export function getCategoryMetaByRouteId(categoryId?: string) {
  const category = getCategoryBaseMetaByRouteId(categoryId);

  if (!category) {
    return undefined;
  }

  return LEARNING_NAVIGATION.find((entry) => entry.id === category.id);
}

export function buildLearningNavigation(...args: Parameters<typeof buildLearningNavigationFromApi>) {
  return buildLearningNavigationFromApi(...args);
}

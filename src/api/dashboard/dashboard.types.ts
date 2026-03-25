import type { Category, Topic } from '@/api/learning/learning.types';

export type DashboardRecommendationResponse = {
  chapterId: number;
  category: Category;
  topic: Topic;
  title: string;
  prologueSubtitle?: string | null;
  sequence: number;
};


import { useMemo, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
  getLearningChaptersQueryOptions,
  useLearningCategoriesQuery,
} from '@/api/learning/learning.query';
import AppLoading from '@/components/common/AppLoading';
import CategoryCard from '@/components/features/learning/CategoryCard';
import {
  buildLearningNavigation,
  buildLearningSummaryByCategory,
  createLearningTopicSummaryKey,
  mergeCategoryTopicsWithSummary,
} from '@/lib/learningNavigation';

const DEFAULT_EXPANDED_CATEGORY_ID = 'real-estate';

export default function LearningPage() {
  const navigate = useNavigate();
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(
    DEFAULT_EXPANDED_CATEGORY_ID
  );
  const categoriesQuery = useLearningCategoriesQuery();
  const navigation = useMemo(
    () => buildLearningNavigation(categoriesQuery.data),
    [categoriesQuery.data]
  );
  const topicRequests = useMemo(
    () =>
      navigation.flatMap((category) =>
        category.topics.map((topic) => ({
          categoryId: category.id,
          topicId: topic.id,
          categoryCode: category.code,
          topicCode: topic.code,
        }))
      ),
    [navigation]
  );
  const topicChapterQueries = useQueries({
    queries: topicRequests.map((request) =>
      getLearningChaptersQueryOptions({
        category: request.categoryCode,
        topic: request.topicCode,
      })
    ),
  });
  const topicChaptersByKey = useMemo(
    () =>
      Object.fromEntries(
        topicRequests.map((request, index) => [
          createLearningTopicSummaryKey(request.categoryId, request.topicId),
          topicChapterQueries[index]?.data?.chapters ?? [],
        ])
      ),
    [topicChapterQueries, topicRequests]
  );

  const resolvedSummaryByCategory = useMemo(() => {
    return buildLearningSummaryByCategory(navigation, topicChaptersByKey);
  }, [navigation, topicChaptersByKey]);

  // 카테고리 카드의 펼침 상태 토글 핸들러
  const handleToggleCategory = (categoryId: string) => {
    setExpandedCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  if (categoriesQuery.isPending) {
    return <AppLoading message="학습 카테고리를 불러오는 중이에요." />;
  }

  if (categoriesQuery.error) {
    return (
      <main className="flex h-dvh items-center justify-center bg-slate-50 p-6">
        <p className="text-sm font-medium text-red-400">
          학습 카테고리 정보를 불러오지 못했습니다.
        </p>
      </main>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background text-foreground">
      <section className="hide-scrollbar flex-1 overflow-y-auto px-5 pb-32 pt-[60px]">
        <div className="pb-7 pt-5">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            학습 카테고리
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-400">
            지식 한입으로 인생 초보 탈출!
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {navigation.map((category) => {
            const summary = resolvedSummaryByCategory[category.id];
            const topics = mergeCategoryTopicsWithSummary(category, summary);
            const total = summary?.total ?? 0;
            const progress =
              total > 0
                ? Math.round(((summary?.progressed ?? 0) / total) * 100)
                : 0;
            const isExpanded = expandedCategoryId === category.id;

            return (
              <CategoryCard
                key={category.id}
                categoryId={category.id}
                categoryName={category.name}
                categoryTagline={category.tagline}
                categoryIconSrc={category.iconSrc}
                progress={progress}
                topics={topics}
                isExpanded={isExpanded}
                onToggle={() => handleToggleCategory(category.id)}
                onSelectTopic={(topicId) =>
                  navigate(`/learning/${category.id}/topics/${topicId}`)
                }
              />
            );
          })}
        </div>

        <div className="pb-28" />
      </section>
    </div>
  );
}

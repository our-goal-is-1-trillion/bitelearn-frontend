import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  useLearningCategoriesQuery,
  useLearningChaptersQuery,
} from '@/api/learning/learning.query';
import CategoryCard from '@/components/features/learning/CategoryCard';
import { LEARNING_NAVIGATION } from '@/constants/learningNavigation';
import { getMockLearningSummaryByCategory } from '@/mock/learning';
import {
  buildLearningNavigation,
  MONTHLY_RENT_SUMMARY_PARAMS,
  mergeMonthlyRentSummary,
  mergeCategoryTopicsWithSummary,
} from '@/lib/learningNavigation';

export default function LearningPage() {
  const navigate = useNavigate();
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(
    null
  );
  const { data: categories } = useLearningCategoriesQuery();
  const { data: monthlyRentResponse } = useLearningChaptersQuery(
    MONTHLY_RENT_SUMMARY_PARAMS
  );

  const summaryByCategory = useMemo(
    () => getMockLearningSummaryByCategory(),
    []
  );
  const navigation = useMemo(
    () => buildLearningNavigation(categories),
    [categories]
  );

  // 카테고리별 요약 정보를 월세 카테고리 데이터와 병합하여 완성된 요약 정보 생성
  const resolvedSummaryByCategory = useMemo(() => {
    return mergeMonthlyRentSummary(
      summaryByCategory,
      monthlyRentResponse?.chapters
    );
  }, [monthlyRentResponse?.chapters, summaryByCategory]);

  // 카테고리 카드의 펼침 상태 토글 핸들러
  const handleToggleCategory = (categoryId: string) => {
    setExpandedCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

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
          {(navigation.length > 0 ? navigation : LEARNING_NAVIGATION).map(
            (category) => {
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
            }
          )}
        </div>

        <div className="pb-28" />
      </section>
    </div>
  );
}

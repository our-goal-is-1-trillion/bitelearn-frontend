import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CategoryCard from '@/components/features/learning/CategoryCard';
import { LEARNING_NAVIGATION } from '@/constants/learningNavigation';
import { getMockLearningSummaryByCategory } from '@/mock/learning';

export default function LearningPage() {
  const navigate = useNavigate();
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(
    null
  );
  const summaryByCategory = useMemo(
    () => getMockLearningSummaryByCategory(),
    []
  );

  const handleToggleCategory = (categoryId: string) => {
    setExpandedCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background pt-[60px] text-foreground">
      <section className="hide-scrollbar flex-1 overflow-y-auto px-5 pb-32 pt-5">
        <div className="pb-7">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            학습 카테고리
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-400">
            지식 한입으로 인생 초보 탈출!
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {LEARNING_NAVIGATION.map((category) => {
            const summary = summaryByCategory[category.id];
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
                topics={summary?.topics ?? []}
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

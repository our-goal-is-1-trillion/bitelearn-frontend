import type { RefCallback } from 'react';
import type { Category } from '@/api/learning/learning.types';
import type { Note } from '@/api/notes/notes.types';
import IncorrectSummary from '@/components/features/note/IncorrectSummary';
import IncorrectNoteList from '@/components/features/note/IncorrectNoteList';
import IncorrectCategoryChip from '@/components/features/note/IncorrectCategoryChip';

type NoteCategory = {
  category: Category;
  categoryName: string;
};

type IncorrectNoteSectionProps = {
  selectedCategory: Category | null;
  onChangeCategory: (category: Category | null) => void;
  categories: NoteCategory[];
  notes: Note[];
  totalBytes: number;
  totalNoteCount: number;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  hasNext?: boolean;
  sentinelRef?: RefCallback<HTMLDivElement>;
};

export default function IncorrectNoteSection({
  selectedCategory,
  onChangeCategory,
  categories,
  notes,
  totalBytes,
  totalNoteCount,
  isLoading = false,
  isLoadingMore = false,
  hasNext = false,
  sentinelRef,
}: IncorrectNoteSectionProps) {
  const noteCategories = [
    { category: null, categoryName: '전체' },
    ...categories,
  ];

  return (
    <>
      <IncorrectSummary
        pendingReviewCount={totalNoteCount}
        totalBytes={totalBytes}
        isLoading={isLoading}
      />
      <div className="sticky top-[50px] z-10 bg-background/80 py-3.5 backdrop-blur-[6px]">
        <div className="hide-scrollbar flex gap-2.5 overflow-x-auto px-5">
          {noteCategories.map((category) => {
            const isActive = selectedCategory === category.category;

            return (
              <IncorrectCategoryChip
                key={category.category ?? 'ALL'}
                label={category.categoryName}
                isActive={isActive}
                onClick={() => onChangeCategory(category.category)}
              />
            );
          })}
        </div>
      </div>

      <div className="px-5">
        <IncorrectNoteList
          categories={categories}
          notes={notes}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          hasNext={hasNext}
          sentinelRef={sentinelRef}
        />
      </div>
    </>
  );
}

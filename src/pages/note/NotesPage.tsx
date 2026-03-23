import { useState } from 'react';

import { useLearningCategoriesQuery } from '@/api/learning/learning.query';
import NoteTopNav from '@/components/features/note/NoteTopNav';
import IncorrectNoteSection from '@/components/features/note/IncorrectNoteSection';
import BookmarkSection from '@/components/features/note/BookmarkSection';
import useBookmarkedArticles from '@/hooks/useBookmarkedArticles';
import useNotesCategorySearchParam from '@/hooks/useNotesCategorySearchParam';

import { useIncorrectNotesQuery } from '@/api/notes/notes.query';
import { getNoteCategoryOptions } from '@/lib/learningNavigation';

export type NoteTab = 'incorrect' | 'bookmark';

export default function NotesPage() {
  const [activeTab, setActiveTab] = useState<NoteTab>('incorrect');
  const { data: categories } = useLearningCategoriesQuery();
  const resolvedNoteCategories = getNoteCategoryOptions(categories);
  // 선택 카테고리를 URL 쿼리스트링 기준으로 관리
  const { selectedCategory, setSelectedCategory } = useNotesCategorySearchParam(
    resolvedNoteCategories
  );

  // 복습 탭 활성화 시에만 오답노트 무한스크롤 조회 실행
  const incorrectNotesFeed = useIncorrectNotesQuery({
    category: selectedCategory,
    enabled: activeTab === 'incorrect',
  });
  const { bookmarkedArticles } = useBookmarkedArticles();

  // 요약 카드에는 첫 페이지 응답의 집계 값 사용
  const totalNoteCount = incorrectNotesFeed.data?.pages[0]?.totalCount ?? 0;
  const totalBytes = incorrectNotesFeed.data?.pages[0]?.totalBytes ?? 0;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background text-slate-900">
      <div className="hide-scrollbar flex-1 overflow-y-auto pb-8 pt-[60px]">
        <NoteTopNav activeTab={activeTab} onChangeTab={setActiveTab} />

        <section className="pb-32">
          {activeTab === 'incorrect' && (
            <IncorrectNoteSection
              selectedCategory={selectedCategory}
              onChangeCategory={setSelectedCategory}
              categories={resolvedNoteCategories}
              notes={incorrectNotesFeed.notes}
              totalBytes={totalBytes}
              totalNoteCount={totalNoteCount}
              isLoading={incorrectNotesFeed.isPending}
              isLoadingMore={incorrectNotesFeed.isFetchingNextPage}
              hasNext={Boolean(incorrectNotesFeed.hasNextPage)}
              sentinelRef={incorrectNotesFeed.sentinelRef}
            />
          )}

          {activeTab === 'bookmark' && (
            <BookmarkSection articles={bookmarkedArticles} />
          )}
        </section>
      </div>
    </div>
  );
}

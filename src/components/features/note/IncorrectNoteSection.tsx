import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { RefCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Category } from '@/api/learning/learning.types';
import type { Note } from '@/api/notes/notes.types';
import IncorrectSummary from '@/components/features/note/IncorrectSummary';
import IncorrectNoteList from '@/components/features/note/IncorrectNoteList';
import IncorrectCategoryChip from '@/components/features/note/IncorrectCategoryChip';

// ─── 타입 ────────────────────────────────────────────────────────────────────

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

// ─── 서브 컴포넌트 ────────────────────────────────────────────────────────────

/**
 * 카테고리 칩 스크롤 영역의 좌·우 끝에 오버레이되는 그라데이션 + 이동 버튼.
 *
 * - 그라데이션: 스크롤 가능 방향을 시각적으로 암시 (항상 표시)
 * - 버튼: `hover:hover and pointer:fine` 미디어 쿼리로 마우스 환경에서만 노출.
 *         터치 환경에서는 버튼 없이 스와이프로 스크롤.
 * - 터치 영역: 버튼에 p-2 패딩을 줘서 실제 클릭 영역을 40px로 확보,
 *             아래 칩 요소가 오탭되지 않도록 방지.
 */
function ScrollEdgeOverlay({
  direction,
  onScroll,
}: {
  direction: 'left' | 'right';
  onScroll: () => void;
}) {
  const isLeft = direction === 'left';
  const Icon = isLeft ? ChevronLeft : ChevronRight;

  return (
    <div
      className={[
        'pointer-events-none absolute inset-y-0 z-10 flex w-10 items-center',
        isLeft
          ? 'left-0 justify-start bg-gradient-to-r from-background/70 to-transparent'
          : 'right-0 justify-end bg-gradient-to-l from-background/70 to-transparent',
      ].join(' ')}
    >
      <button
        className={[
          'pointer-events-auto hidden p-2',
          '[@media(hover:hover)_and_(pointer:fine)]:flex',
          isLeft ? 'ml-2' : 'mr-2',
        ].join(' ')}
        onClick={onScroll}
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-popover shadow-md text-slate-500 transition-colors hover:text-slate-800">
          <Icon size={14} />
        </div>
      </button>
    </div>
  );
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────

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
  const noteCategories = useMemo(
    () => [{ category: null, categoryName: '전체' }, ...categories],
    [categories],
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // 현재 스크롤 위치를 읽어 좌·우 이동 가능 여부를 갱신한다.
  // -1 margin: 소수점 픽셀 오차로 인해 끝에 도달했는데도 canScrollRight가
  // true로 남는 현상을 방지.
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  // 마운트 시 초기 상태 계산 + scroll 이벤트 구독.
  // noteCategories.length가 바뀌면(카테고리 로드 완료 등) 재계산한다.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState);
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState, noteCategories.length]);

  // 버튼 한 번 클릭으로 해당 방향 끝까지 이동.
  const scrollTo = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({
      left: direction === 'right' ? el.scrollWidth - el.clientWidth : 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <IncorrectSummary
        pendingReviewCount={totalNoteCount}
        totalBytes={totalBytes}
        isLoading={isLoading}
      />

      <div className="relative sticky top-[50px] z-10 bg-background/80 py-3.5 backdrop-blur-[6px]">
        {canScrollLeft && (
          <ScrollEdgeOverlay direction="left" onScroll={() => scrollTo('left')} />
        )}
        {canScrollRight && (
          <ScrollEdgeOverlay direction="right" onScroll={() => scrollTo('right')} />
        )}
        <div
          ref={scrollRef}
          className="hide-scrollbar flex gap-2.5 overflow-x-auto px-5"
        >
          {noteCategories.map((item) => (
            <IncorrectCategoryChip
              key={item.category ?? 'ALL'}
              label={item.categoryName}
              isActive={selectedCategory === item.category}
              onClick={() => onChangeCategory(item.category)}
            />
          ))}
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

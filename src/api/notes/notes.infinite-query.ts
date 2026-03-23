import { useEffect, useState } from 'react';
import {
  useInfiniteQuery,
  type InfiniteData,
  type QueryKey,
} from '@tanstack/react-query';

import type { GetNotesResponse } from './notes.types';

// sentinel이 화면에 닿기 직전 다음 페이지를 미리 요청하기 위한 여유 범위
const INFINITE_SCROLL_ROOT_MARGIN = '400px';

type UseIncorrectNotesInfiniteQueryParams = {
  queryKey: QueryKey;
  queryFn: (cursor?: number | null) => Promise<GetNotesResponse>;
  enabled?: boolean;
  rootMargin?: string;
};

export function useIncorrectNotesInfiniteQuery({
  queryKey,
  queryFn,
  enabled = true,
  rootMargin = INFINITE_SCROLL_ROOT_MARGIN,
}: UseIncorrectNotesInfiniteQueryParams) {
  // 무한스크롤 감지를 위한 sentinel DOM 노드
  const [sentinelNode, setSentinelNode] = useState<HTMLDivElement | null>(null);

  // TanStack Query의 무한 쿼리
  const query = useInfiniteQuery<
    GetNotesResponse,
    Error,
    InfiniteData<GetNotesResponse>,
    QueryKey,
    number | null
  >({
    queryKey,
    enabled,
    initialPageParam: null,
    queryFn: ({ pageParam }) => queryFn(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  });

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = query;

  // sentinel이 보일 때 다음 페이지를 요청하도록 observer를 연결
  useEffect(() => {
    if (
      !enabled ||
      !sentinelNode ||
      !hasNextPage ||
      isFetchingNextPage ||
      isPending
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting) {
          void fetchNextPage();
        }
      },
      { rootMargin }
    );

    observer.observe(sentinelNode);

    return () => observer.disconnect();
  }, [
    enabled,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    rootMargin,
    sentinelNode,
  ]);

  return {
    ...query,
    notes: query.data?.pages.flatMap((page) => page.notes) ?? [],
    sentinelRef: setSentinelNode,
  };
}

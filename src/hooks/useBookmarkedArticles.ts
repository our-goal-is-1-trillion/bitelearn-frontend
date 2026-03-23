import { useEffect, useState } from 'react';

import type { ArticleDetail } from '@/mock/article';
import {
  mockBookmarkedArticles,
  type BookmarkedArticleCardItem,
} from '@/mock/bookmarkedArticle';

const BOOKMARK_STORAGE_KEY = 'bite-learn:bookmarked-articles';
const BOOKMARK_STORAGE_EVENT = 'bite-learn:bookmarked-articles-updated';

function sortBookmarks(articles: BookmarkedArticleCardItem[]) {
  return [...articles].sort(
    (a, b) =>
      new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime()
  );
}

// 로컬 스토리지를 활용하여 북마크 상태 관리
function readBookmarkedArticles() {
  if (typeof window === 'undefined') {
    return sortBookmarks(mockBookmarkedArticles);
  }

  const storedValue = window.localStorage.getItem(BOOKMARK_STORAGE_KEY);

  if (!storedValue) {
    const initialBookmarks = sortBookmarks(mockBookmarkedArticles);
    window.localStorage.setItem(
      BOOKMARK_STORAGE_KEY,
      JSON.stringify(initialBookmarks)
    );

    return initialBookmarks;
  }

  try {
    const parsed = JSON.parse(storedValue) as BookmarkedArticleCardItem[];
    return sortBookmarks(parsed);
  } catch (error) {
    console.error('북마크 로컬 데이터 파싱 실패:', error);

    const fallbackBookmarks = sortBookmarks(mockBookmarkedArticles);
    window.localStorage.setItem(
      BOOKMARK_STORAGE_KEY,
      JSON.stringify(fallbackBookmarks)
    );

    return fallbackBookmarks;
  }
}

// 북마크 추가/제거 시 로컬 스토리지에 저장하고, 다른 탭에도 변경 사항이 반영되도록 커스텀 이벤트 발생
function writeBookmarkedArticles(articles: BookmarkedArticleCardItem[]) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(articles));
  window.dispatchEvent(new Event(BOOKMARK_STORAGE_EVENT));
}

function toBookmarkedArticle(
  article: ArticleDetail
): BookmarkedArticleCardItem {
  return {
    id: `bookmark-${article.articleId}`,
    articleId: article.articleId,
    title: article.title,
    thumbnailUrl: article.thumbnailUrl,
    publishedAt: article.publishedAt,
    authorName: article.author.name,
    bookmarkedAt: new Date().toISOString(),
  };
}

// 북마크된 아티클 목록과 토글 함수를 제공하는 커스텀 훅
export default function useBookmarkedArticles() {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<
    BookmarkedArticleCardItem[]
  >(() => readBookmarkedArticles());

  useEffect(() => {
    const syncBookmarks = () => {
      setBookmarkedArticles(readBookmarkedArticles());
    };

    window.addEventListener('storage', syncBookmarks);
    window.addEventListener(BOOKMARK_STORAGE_EVENT, syncBookmarks);

    return () => {
      window.removeEventListener('storage', syncBookmarks);
      window.removeEventListener(BOOKMARK_STORAGE_EVENT, syncBookmarks);
    };
  }, []);

  const toggleBookmark = (article: ArticleDetail) => {
    const isBookmarked = bookmarkedArticles.some(
      (item) => item.articleId === article.articleId
    );

    const nextBookmarks = isBookmarked
      ? bookmarkedArticles.filter(
          (item) => item.articleId !== article.articleId
        )
      : sortBookmarks([toBookmarkedArticle(article), ...bookmarkedArticles]);

    setBookmarkedArticles(nextBookmarks);
    writeBookmarkedArticles(nextBookmarks);

    return !isBookmarked;
  };

  // 특정 아티클 ID가 북마크되어 있는지 여부를 확인하는 함수
  const isBookmarked = (articleId: string) =>
    bookmarkedArticles.some((item) => item.articleId === articleId);

  return {
    bookmarkedArticles,
    isBookmarked,
    toggleBookmark,
  };
}

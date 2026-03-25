import { matchPath } from 'react-router-dom';

import { mockArticles } from '@/mock/article';

export const SITE_NAME = 'bitelearn';
const DEFAULT_TITLE = 'bitelearn | 한 입 퀴즈, 지식 한 조각';
const DEFAULT_IMAGE_PATH = '/opengraph.png';
const DEFAULT_DESCRIPTION =
  '복잡한 강의 대신, 핵심만 담은 퀴즈 한 입으로 간편하게 학습하세요, bitelearn.';

export type ResolvedSeoMeta = {
  title: string;
  description: string;
  image: string;
  type: 'website' | 'article';
  robots: string;
  canonicalPath: string;
};

function buildTitle(pageTitle: string) {
  return `${pageTitle} | ${SITE_NAME}`;
}

function trimDescription(value: string, maxLength = 160) {
  const normalized = value.replace(/\s+/g, ' ').trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

// SEO 메타 정보를 기본값으로 초기화하는 함수
function getDefaultMeta(pathname: string): ResolvedSeoMeta {
  return {
    title: DEFAULT_TITLE,
    description: trimDescription(DEFAULT_DESCRIPTION),
    image: DEFAULT_IMAGE_PATH,
    type: 'website',
    robots: 'index,follow',
    canonicalPath: pathname,
  };
}

// 검색 엔진에 노출되지 않아야 하는 페이지의 메타 정보를 생성하는 함수
function getNoIndexMeta(
  pathname: string,
  pageTitle: string,
  description: string
): ResolvedSeoMeta {
  const base = getDefaultMeta(pathname);

  return {
    ...base,
    title: buildTitle(pageTitle),
    description: trimDescription(description),
    robots: 'noindex,nofollow',
  };
}

export function resolveSeoMeta(pathname: string): ResolvedSeoMeta {
  const defaultMeta = getDefaultMeta(pathname);

  if (pathname === '/') {
    return defaultMeta;
  }

  if (pathname === '/learning') {
    return {
      ...defaultMeta,
      title: buildTitle('학습 카테고리'),
      description: trimDescription(
        'bitelearn 학습 콘텐츠를 탐색하고 지금 필요한 주제를 골라보세요.'
      ),
    };
  }

  const roadmapMatch = matchPath(
    '/learning/:categoryId/topics/:topicId',
    pathname
  );

  if (roadmapMatch) {
    return {
      ...defaultMeta,
      title: buildTitle('학습 로드맵'),
      description: trimDescription(
        'bitelearn 로드맵을 따라 학습해보세요.'
      ),
    };
  }

  if (pathname === '/articles') {
    return {
      ...defaultMeta,
      title: buildTitle('아티클'),
      description: trimDescription(
        'bitelearn 아티클로 실생활에 바로 쓰이는 생활 지식을 읽어보세요.'
      ),
    };
  }

  const articleMatch = matchPath('/articles/:articleId', pathname);

  if (articleMatch?.params.articleId) {
    const article = mockArticles.find(
      (entry) => entry.articleId === articleMatch.params.articleId
    );

    if (!article) {
      return getNoIndexMeta(
        pathname,
        '아티클을 찾을 수 없어요',
        '요청한 아티클을 찾을 수 없습니다.'
      );
    }

    const articleDescription = trimDescription(
      article.summary?.points.join(' ') ??
        `${article.author.name}가 전하는 ${article.title} 아티클을 bitelearn에서 확인해보세요.`
    );

    return {
      ...defaultMeta,
      title: buildTitle(article.title),
      description: articleDescription,
      type: 'article',
      image: article.thumbnailUrl ?? DEFAULT_IMAGE_PATH,
    };
  }

  if (matchPath('/learning/:categoryId/:chapterId', pathname)) {
    return getNoIndexMeta(
      pathname,
      '학습 진행 중',
      '학습 진행 화면은 검색 결과에 노출되지 않습니다.'
    );
  }

  if (pathname === '/login') {
    return getNoIndexMeta(pathname, '로그인', 'bitelearn 로그인 페이지입니다.');
  }

  if (pathname === '/signup/terms') {
    return getNoIndexMeta(
      pathname,
      '약관 동의',
      'bitelearn 회원가입 전 약관 동의 페이지입니다.'
    );
  }

  if (pathname === '/signup') {
    return getNoIndexMeta(
      pathname,
      '회원가입',
      'bitelearn 회원가입 페이지입니다.'
    );
  }

  if (pathname === '/oauth/callback') {
    return getNoIndexMeta(
      pathname,
      '로그인 처리 중',
      '소셜 로그인 인증 처리 페이지입니다.'
    );
  }

  if (pathname === '/mypage') {
    return getNoIndexMeta(
      pathname,
      '마이페이지',
      '개인 계정 정보와 학습 현황을 확인하는 페이지입니다.'
    );
  }

  if (pathname === '/mypage/nickname') {
    return getNoIndexMeta(
      pathname,
      '닉네임 변경',
      '회원 닉네임을 변경하는 페이지입니다.'
    );
  }

  if (pathname === '/notes') {
    return getNoIndexMeta(
      pathname,
      '노트',
      '개인 학습 기록과 북마크를 관리하는 페이지입니다.'
    );
  }

  if (matchPath('/notes/incorrect/:noteId', pathname)) {
    return getNoIndexMeta(
      pathname,
      '오답노트',
      '개인 학습 기록을 확인하는 페이지입니다.'
    );
  }

  return getNoIndexMeta(
    pathname,
    '페이지를 찾을 수 없어요',
    '요청한 페이지를 찾을 수 없습니다.'
  );
}

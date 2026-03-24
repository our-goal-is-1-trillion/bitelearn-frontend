import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { resolveSeoMeta } from '@/lib/seo';

const SEO_MANAGED_ATTRIBUTE = 'data-seo-managed';

// URL 또는 경로를 절대 URL로 변환하는 유틸리티 함수
function toAbsoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return new URL(pathOrUrl, window.location.origin).toString();
}

// SEO 관련 메타 태그를 동적으로 추가하는 함수
function appendManagedMeta(
  head: HTMLHeadElement,
  attributeName: 'name' | 'property',
  attributeValue: string,
  content: string
) {
  const meta = document.createElement('meta');

  meta.setAttribute(attributeName, attributeValue);
  meta.content = content;
  meta.setAttribute(SEO_MANAGED_ATTRIBUTE, 'true');
  head.appendChild(meta);
}

export default function SeoHead() {
  const location = useLocation();

  // 페이지 경로가 변경될 때마다 SEO 메타 태그를 업데이트
  useEffect(() => {
    const meta = resolveSeoMeta(location.pathname);
    const head = document.head;
    const absoluteCanonicalUrl = toAbsoluteUrl(meta.canonicalPath);
    const absoluteImageUrl = toAbsoluteUrl(meta.image);

    document.title = meta.title;

    // 기존 SEO 관리하던 메타 태그 제거
    head
      .querySelectorAll<HTMLElement>(`[${SEO_MANAGED_ATTRIBUTE}="true"]`)
      .forEach((element) => element.remove());

    // SEO 메타 태그 정의
    const metaEntries = [
      ['name', 'description', meta.description],
      ['name', 'robots', meta.robots],
      ['property', 'og:title', meta.title],
      ['property', 'og:description', meta.description],
      ['property', 'og:type', meta.type],
      ['property', 'og:image', absoluteImageUrl],
      ['name', 'twitter:card', 'summary_large_image'],
    ] as const;

    // 메타 태그 추가
    metaEntries.forEach(([attributeName, attributeValue, content]) => {
      appendManagedMeta(head, attributeName, attributeValue, content);
    });

    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = absoluteCanonicalUrl;
    canonicalLink.setAttribute(SEO_MANAGED_ATTRIBUTE, 'true');
    head.appendChild(canonicalLink);
  }, [location.pathname]);

  return null;
}

import type { QuizInfo, VocabInfo } from '@/api/learning/learning.types';

const imagePreloadCache = new Map<string, Promise<string>>();
const loadedImageUrls = new Set<string>();

// 이미지 URL을 정규화하여 반환하는 함수
export function normalizeImageUrl(imageUrl?: string | null) {
  const trimmedUrl = imageUrl?.trim();

  return trimmedUrl ? trimmedUrl : null;
}

// 이미지가 이미 로드되었는지 확인하는 함수
export function hasLoadedImage(imageUrl?: string | null) {
  const normalizedImageUrl = normalizeImageUrl(imageUrl);

  return normalizedImageUrl ? loadedImageUrls.has(normalizedImageUrl) : false;
}

// 이미지를 미리 불러오는 함수
export function preloadImage(imageUrl?: string | null) {
  const normalizedImageUrl = normalizeImageUrl(imageUrl);

  if (!normalizedImageUrl) {
    return Promise.resolve<string | null>(null);
  }

  if (loadedImageUrls.has(normalizedImageUrl)) {
    return Promise.resolve(normalizedImageUrl);
  }

  const cachedPromise = imagePreloadCache.get(normalizedImageUrl);

  if (cachedPromise) {
    return cachedPromise;
  }

  const preloadPromise = new Promise<string>((resolve, reject) => {
    if (typeof window === 'undefined') {
      loadedImageUrls.add(normalizedImageUrl);
      resolve(normalizedImageUrl);
      return;
    }

    const image = new window.Image();

    const handleSuccess = () => {
      const decodePromise =
        typeof image.decode === 'function'
          ? image.decode().catch(() => undefined)
          : Promise.resolve();

      decodePromise.finally(() => {
        loadedImageUrls.add(normalizedImageUrl);
        resolve(normalizedImageUrl);
      });
    };

    image.onload = handleSuccess;
    image.onerror = () => {
      imagePreloadCache.delete(normalizedImageUrl);
      reject(new Error('이미지를 미리 불러오지 못했습니다.'));
    };
    image.src = normalizedImageUrl;

    if (image.complete) {
      handleSuccess();
    }
  });

  imagePreloadCache.set(normalizedImageUrl, preloadPromise);

  return preloadPromise;
}

// 여러 이미지를 한 번에 미리 불러오는 함수
export function preloadImages(imageUrls: Array<string | null | undefined>) {
  return Promise.allSettled(
    imageUrls.map((imageUrl) => preloadImage(imageUrl))
  );
}

// VocabInfo에서 이미지 URL을 가져오는 함수
export function getVocabImageUrl(
  vocab?: Pick<VocabInfo, 'frontImageUrl'> | null
) {
  return normalizeImageUrl(vocab?.frontImageUrl);
}

// QuizInfo에서 퀴즈 지문 이미지 URL을 가져오는 함수
export function getQuizPassageImageUrl(
  quiz?: Pick<QuizInfo, 'type' | 'questionImageUrl'> | null
) {
  if (!quiz || quiz.type === 'DOC_MCQ' || quiz.type === 'DOC_CLICK') {
    return null;
  }

  return normalizeImageUrl(quiz.questionImageUrl);
}

const MONTHLY_RENT_TOPIC_ID = 'monthly-rent';
const BLOCKED_MONTHLY_RENT_SEQUENCES = [3, 4, 5] as const;

export const CHAPTER_BLOCKED_TOAST_MESSAGE = '해당 챕터는 아직 준비 중이에요.';

// 월세 토픽인지 확인
export function isMonthlyRentTopic(topicId?: string) {
  return topicId === MONTHLY_RENT_TOPIC_ID;
}

// 챕터 시퀀스는 로드맵에서 전달된 값을 사용
export function getChapterSequence(chapterSequence?: number) {
  if (typeof chapterSequence === 'number' && Number.isFinite(chapterSequence)) {
    return chapterSequence;
  }

  return null;
}

// 로드맵 챕터 목록에서 월세 토픽이 아닌 경우 전체 토픽을 차단
export function shouldBlockRoadmapChapterEntry(topicId?: string) {
  return !isMonthlyRentTopic(topicId);
}

// 챕터 라우트 접근 시 월세 토픽이 아닌 경우 차단
export function shouldBlockChapterRoute(topicId?: string) {
  return !isMonthlyRentTopic(topicId);
}

// 월세 챕터의 특정 시퀀스에서만 입장 차단
export function shouldBlockMonthlyRentIntroStart(params: {
  topicId?: string;
  chapterSequence?: number;
}) {
  const { topicId, chapterSequence } = params;

  if (!isMonthlyRentTopic(topicId)) {
    return false;
  }

  const resolvedSequence = getChapterSequence(chapterSequence);
  return (
    resolvedSequence !== null &&
    BLOCKED_MONTHLY_RENT_SEQUENCES.includes(
      resolvedSequence as (typeof BLOCKED_MONTHLY_RENT_SEQUENCES)[number]
    )
  );
}

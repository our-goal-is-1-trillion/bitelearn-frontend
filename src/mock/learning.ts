import type { ChapterSummaryDto } from '@/api/learning/learning.types';
import { LEARNING_NAVIGATION } from '@/constants/learningNavigation';

export type MockTopicSummary = {
  topicId: string;
  topicName: string;
  chapters: ChapterSummaryDto[];
};

export type MockCategorySummary = {
  total: number;
  progressed: number;
  topics: MockTopicSummary[];
};

type MockLearningCategory = {
  categoryId: string;
  topics: Array<{
    topicId: string;
    chapters: ChapterSummaryDto[];
  }>;
};

const MOCK_LEARNING_CATEGORIES: MockLearningCategory[] = [
  {
    categoryId: 'real-estate',
    topics: [
      {
        topicId: 'jeonse',
        chapters: [
          {
            chapterId: 1001,
            title: '전세 계약 전 꼭 확인해야 할 체크리스트',
            sequence: 1,
            status: 'COMPLETED',
          },
          {
            chapterId: 1002,
            title: '등기부등본에서 위험 신호 읽기',
            sequence: 2,
            status: 'QUIZ_IN_PROGRESS',
          },
          {
            chapterId: 1003,
            title: '보증금 보호를 위한 특약 정리',
            sequence: 3,
            status: 'READY',
          },
          {
            chapterId: 1004,
            title: '확정일자와 전입신고 타이밍',
            sequence: 4,
            status: 'READY',
            isLocked: true,
          },
        ],
      },
      {
        topicId: 'monthly-rent',
        chapters: [
          {
            chapterId: 1101,
            title: '월세 계약서에서 꼭 봐야 할 조항',
            sequence: 1,
            status: 'COMPLETED',
          },
          {
            chapterId: 1102,
            title: '관리비 항목 제대로 따져보기',
            sequence: 2,
            status: 'READY',
          },
          {
            chapterId: 1103,
            title: '중도 퇴실 분쟁 줄이는 방법',
            sequence: 3,
            status: 'READY',
            isLocked: true,
          },
        ],
      },
      {
        topicId: 'buying',
        chapters: [
          {
            chapterId: 1201,
            title: '매매 계약 전에 권리관계 확인하기',
            sequence: 1,
            status: 'READY',
          },
          {
            chapterId: 1202,
            title: '계약금과 잔금 일정 이해하기',
            sequence: 2,
            status: 'READY',
            isLocked: true,
          },
          {
            chapterId: 1203,
            title: '취득세와 부대비용 한 번에 보기',
            sequence: 3,
            status: 'READY',
            isLocked: true,
          },
        ],
      },
    ],
  },
  {
    categoryId: 'living-finance',
    topics: [
      {
        topicId: 'income-expenditure',
        chapters: [
          {
            chapterId: 2001,
            title: '사회초년생을 위한 월급 관리 기초',
            sequence: 1,
            status: 'COMPLETED',
          },
          {
            chapterId: 2002,
            title: '비상금 통장과 생활비 통장 나누기',
            sequence: 2,
            status: 'READY',
          },
          {
            chapterId: 2003,
            title: '청년 대상 금융 지원 제도 모아보기',
            sequence: 3,
            status: 'READY',
            isLocked: true,
          },
        ],
      },
      {
        topicId: 'credit-liabilities',
        chapters: [
          {
            chapterId: 2101,
            title: '신용점수 떨어뜨리지 않는 습관',
            sequence: 1,
            status: 'QUIZ_IN_PROGRESS',
          },
          {
            chapterId: 2102,
            title: '체크카드와 신용카드 똑똑하게 쓰기',
            sequence: 2,
            status: 'READY',
          },
          {
            chapterId: 2103,
            title: '실업급여와 고용보험 핵심 정리',
            sequence: 3,
            status: 'READY',
            isLocked: true,
          },
        ],
      },
      {
        topicId: 'work-welfare',
        chapters: [
          {
            chapterId: 2201,
            title: '근로계약서에서 놓치기 쉬운 문장',
            sequence: 1,
            status: 'READY',
          },
          {
            chapterId: 2202,
            title: '4대보험이 월급에 미치는 영향',
            sequence: 2,
            status: 'READY',
            isLocked: true,
          },
          {
            chapterId: 2203,
            title: '연봉 제안서 볼 때 세전 세후 구분하기',
            sequence: 3,
            status: 'READY',
            isLocked: true,
          },
        ],
      },
    ],
  },
  {
    categoryId: 'career-tax',
    topics: [
      {
        topicId: 'salary-real-income',
        chapters: [
          {
            chapterId: 3001,
            title: '세전 월급과 실수령액 차이 이해하기',
            sequence: 1,
            status: 'COMPLETED',
          },
          {
            chapterId: 3002,
            title: '급여명세서에서 공제 항목 읽는 법',
            sequence: 2,
            status: 'COMPLETED',
          },
          {
            chapterId: 3003,
            title: '상여금과 수당이 실수령액에 미치는 영향',
            sequence: 3,
            status: 'COMPLETED',
            isLocked: true,
          },
        ],
      },
      {
        topicId: 'income-tax-deduction',
        chapters: [
          {
            chapterId: 3101,
            title: '소득공제와 세액공제 차이부터 이해하기',
            sequence: 1,
            status: 'QUIZ_IN_PROGRESS',
          },
          {
            chapterId: 3102,
            title: '공제 항목 빠짐없이 챙기는 체크리스트',
            sequence: 2,
            status: 'COMPLETED',
          },
          {
            chapterId: 3103,
            title: '환급액 계산 흐름 한 번에 보기',
            sequence: 3,
            status: 'COMPLETED',
            isLocked: true,
          },
        ],
      },
      {
        topicId: 'comprehensive-income-tax',
        chapters: [
          {
            chapterId: 3201,
            title: '종합소득세 신고 대상 먼저 구분하기',
            sequence: 1,
            status: 'COMPLETED',
          },
          {
            chapterId: 3202,
            title: '필요경비와 공제 항목 정리하기',
            sequence: 2,
            status: 'COMPLETED',
            isLocked: true,
          },
          {
            chapterId: 3203,
            title: '신고 일정 놓치지 않는 체크리스트',
            sequence: 3,
            status: 'COMPLETED',
            isLocked: true,
          },
        ],
      },
    ],
  },
  {
    categoryId: 'investment',
    topics: [
      {
        topicId: 'bond-deposit',
        chapters: [
          {
            chapterId: 4001,
            title: '예금과 채권의 차이부터 이해하기',
            sequence: 1,
            status: 'READY',
          },
          {
            chapterId: 4002,
            title: '금리 변동이 예금과 채권에 미치는 영향',
            sequence: 2,
            status: 'READY',
          },
          {
            chapterId: 4003,
            title: '만기와 수익률 확인하는 법',
            sequence: 3,
            status: 'READY',
            isLocked: true,
          },
        ],
      },
      {
        topicId: 'stock',
        chapters: [
          {
            chapterId: 4101,
            title: '주식 주문 전에 알아야 할 기본 용어',
            sequence: 1,
            status: 'READY',
          },
          {
            chapterId: 4102,
            title: '분산 투자와 손실 관리의 기본',
            sequence: 2,
            status: 'READY',
          },
          {
            chapterId: 4103,
            title: '뉴스에 흔들리지 않는 매수 기준 세우기',
            sequence: 3,
            status: 'READY',
            isLocked: true,
          },
        ],
      },
      {
        topicId: 'annuity',
        chapters: [
          {
            chapterId: 4201,
            title: '연금저축과 IRP 차이 이해하기',
            sequence: 1,
            status: 'READY',
          },
          {
            chapterId: 4202,
            title: '세액공제 기준 한 번에 정리하기',
            sequence: 2,
            status: 'READY',
            isLocked: true,
          },
          {
            chapterId: 4203,
            title: '노후 준비를 위한 장기 투자 감각 익히기',
            sequence: 3,
            status: 'READY',
            isLocked: true,
          },
        ],
      },
    ],
  },
];

export function getMockLearningSummaryByCategory(): Record<
  string,
  MockCategorySummary
> {
  return Object.fromEntries(
    LEARNING_NAVIGATION.map((category) => {
      const mockCategory = MOCK_LEARNING_CATEGORIES.find(
        (entry) => entry.categoryId === category.id
      );

      const topics: MockTopicSummary[] = category.topics.map((topic) => {
        const chapters =
          mockCategory?.topics.find((entry) => entry.topicId === topic.id)
            ?.chapters ?? [];

        return {
          topicId: topic.id,
          topicName: topic.name,
          chapters: chapters.map((chapter) => ({ ...chapter })),
        };
      });

      const mergedChapters = topics.flatMap((topic) => topic.chapters);
      const progressed = mergedChapters.filter(
        (chapter) => chapter.status !== 'READY'
      ).length;

      return [
        category.id,
        {
          total: mergedChapters.length,
          progressed,
          topics,
        } satisfies MockCategorySummary,
      ];
    })
  );
}

export function getMockLearningChapters(
  categoryId?: string,
  topicId?: string
): ChapterSummaryDto[] {
  if (!categoryId || !topicId) return [];

  return (
    MOCK_LEARNING_CATEGORIES.find(
      (category) => category.categoryId === categoryId
    )
      ?.topics.find((topic) => topic.topicId === topicId)
      ?.chapters.map((chapter) => ({ ...chapter })) ?? []
  );
}

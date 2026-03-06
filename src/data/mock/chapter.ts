export type ChapterStatus = "completed" | "in_progress" | "available" | "locked"

export interface Chapter {
  id: string
  stageNumber: number
  emoji: string
  title: string
  subtitle: string
  status: ChapterStatus
  progress?: number
  estimatedMinutes: number
  difficulty: "초급" | "중급" | "고급"
  questionCount: number
}

export interface CategoryChapters {
  categoryId: string
  categoryName: string
  emoji: string
  tagline: string
  totalChapters: number
  completedChapters: number
  chapters: Chapter[]
}

export const MOCK_CATEGORY_CHAPTERS: CategoryChapters[] = [
  {
    categoryId: "real-estate",
    categoryName: "부동산 · 주거",
    emoji: "🏠",
    tagline: "내 보증금, 내가 지킨다",
    totalChapters: 12,
    completedChapters: 5,
    chapters: [
      { id: "re-1", stageNumber: 1, emoji: "🗺️", title: "집 탐색 시작하기", subtitle: "멍멍이의 첫 집 구하기 모험", status: "completed", estimatedMinutes: 5, difficulty: "초급", questionCount: 8 },
      { id: "re-2", stageNumber: 2, emoji: "📋", title: "등기부등본 완전 해독", subtitle: "이 서류가 집의 신분증!", status: "completed", estimatedMinutes: 8, difficulty: "초급", questionCount: 10 },
      { id: "re-3", stageNumber: 3, emoji: "🔍", title: "건물 상태 체크리스트", subtitle: "눈에 안 보이는 위험을 찾아라", status: "completed", estimatedMinutes: 6, difficulty: "초급", questionCount: 8 },
      { id: "re-4", stageNumber: 4, emoji: "⚠️", title: "빨간불 삼총사 피하기", subtitle: "가압류? 신탁? 즉시 도망쳐!", status: "completed", estimatedMinutes: 7, difficulty: "초급", questionCount: 10 },
      { id: "re-5", stageNumber: 5, emoji: "💰", title: "빚 계산의 기술", subtitle: "채권최고액이 진짜 빚이다", status: "completed", estimatedMinutes: 8, difficulty: "중급", questionCount: 10 },
      { id: "re-6", stageNumber: 6, emoji: "🐾", title: "계약: 도장 찍기 전 방어선", subtitle: "도장 찍기 전, 멍멍이의 마지막 체크!", status: "in_progress", progress: 68, estimatedMinutes: 9, difficulty: "중급", questionCount: 14 },
      { id: "re-7", stageNumber: 7, emoji: "🏡", title: "이사 & 전입신고 완벽정복", subtitle: "이삿날, 잊으면 큰일 나는 것들", status: "available", estimatedMinutes: 8, difficulty: "중급", questionCount: 10 },
      { id: "re-8", stageNumber: 8, emoji: "🛡️", title: "보증보험 & 확정일자", subtitle: "내 돈을 지켜주는 마지막 방패", status: "locked", estimatedMinutes: 10, difficulty: "고급", questionCount: 12 },
    ],
  },
  {
    categoryId: "finance",
    categoryName: "생활금융 · 고용",
    emoji: "💳",
    tagline: "돈과 일, 내 편으로 만들기",
    totalChapters: 8,
    completedChapters: 3,
    chapters: [
      { id: "fi-1", stageNumber: 1, emoji: "📊", title: "신용점수의 모든 것", subtitle: "점수 올리기 = 돈 버는 것", status: "completed", estimatedMinutes: 6, difficulty: "초급", questionCount: 8 },
      { id: "fi-2", stageNumber: 2, emoji: "💸", title: "청년 금융 지원 총정리", subtitle: "내가 받을 수 있는 혜택은?", status: "completed", estimatedMinutes: 7, difficulty: "초급", questionCount: 9 },
      { id: "fi-3", stageNumber: 3, emoji: "🏦", title: "통장 쪼개기 전략", subtitle: "저축이 자동으로 되게 하는 법", status: "completed", estimatedMinutes: 5, difficulty: "초급", questionCount: 7 },
      { id: "fi-4", stageNumber: 4, emoji: "🤝", title: "실업급여 & 고용보험", subtitle: "퇴직 후 내가 받을 수 있는 것", status: "in_progress", progress: 35, estimatedMinutes: 9, difficulty: "중급", questionCount: 11 },
      { id: "fi-5", stageNumber: 5, emoji: "🏥", title: "건강보험 피부양자 탈출기", subtitle: "독립하면 뭐가 달라지나요?", status: "available", estimatedMinutes: 7, difficulty: "중급", questionCount: 9 },
      { id: "fi-6", stageNumber: 6, emoji: "📝", title: "근로계약서 제대로 쓰기", subtitle: "사인 전에 꼭 확인해야 할 것", status: "locked", estimatedMinutes: 8, difficulty: "중급", questionCount: 10 },
      { id: "fi-7", stageNumber: 7, emoji: "🔐", title: "부당해고 & 내 권리 찾기", subtitle: "나는 억울하게 안 당한다", status: "locked", estimatedMinutes: 10, difficulty: "고급", questionCount: 12 },
      { id: "fi-8", stageNumber: 8, emoji: "🧾", title: "4대보험 완전정복", subtitle: "월급에서 빠지는 돈의 비밀", status: "locked", estimatedMinutes: 9, difficulty: "고급", questionCount: 11 },
    ],
  },
  {
    categoryId: "career",
    categoryName: "커리어 · 세무",
    emoji: "💼",
    tagline: "세금도 전략이다",
    totalChapters: 15,
    completedChapters: 13,
    chapters: [
      { id: "ca-1", stageNumber: 1, emoji: "📄", title: "근로소득세 기초", subtitle: "월급에서 세금이 얼마나 빠지나", status: "completed", estimatedMinutes: 5, difficulty: "초급", questionCount: 7 },
      { id: "ca-2", stageNumber: 2, emoji: "💼", title: "연봉 협상의 기술", subtitle: "세전·세후 제대로 알고 협상하기", status: "completed", estimatedMinutes: 6, difficulty: "초급", questionCount: 8 },
      { id: "ca-3", stageNumber: 3, emoji: "🏦", title: "연말정산 환급왕 되기", subtitle: "13월의 월급 제대로 받는 법", status: "completed", estimatedMinutes: 9, difficulty: "중급", questionCount: 12 },
      { id: "ca-4", stageNumber: 4, emoji: "🧾", title: "종합소득세 신고하기", subtitle: "투잡러 & 프리랜서 필독!", status: "completed", estimatedMinutes: 10, difficulty: "중급", questionCount: 13 },
      { id: "ca-5", stageNumber: 5, emoji: "🎁", title: "절세 공제 항목 총정리", subtitle: "내가 놓친 공제가 있을지도?", status: "in_progress", progress: 80, estimatedMinutes: 8, difficulty: "중급", questionCount: 10 },
      { id: "ca-6", stageNumber: 6, emoji: "🔢", title: "세금 계산기 직접 써보기", subtitle: "숫자로 이해하는 세금", status: "available", estimatedMinutes: 7, difficulty: "고급", questionCount: 9 },
      { id: "ca-7", stageNumber: 7, emoji: "🚀", title: "사업소득 vs 기타소득", subtitle: "유형별 세금 신고 전략", status: "locked", estimatedMinutes: 10, difficulty: "고급", questionCount: 12 },
    ],
  },
  {
    categoryId: "investment",
    categoryName: "자산운용 · 투자",
    emoji: "📈",
    tagline: "쫄지 말고 투자하자",
    totalChapters: 15,
    completedChapters: 13,
    chapters: [
      { id: "in-1", stageNumber: 1, emoji: "🌱", title: "투자 전 필수 원칙", subtitle: "잃지 않는 투자의 기본", status: "completed", estimatedMinutes: 5, difficulty: "초급", questionCount: 7 },
      { id: "in-2", stageNumber: 2, emoji: "📊", title: "ETF로 시작하는 투자", subtitle: "주식보다 안전한 첫 번째 선택", status: "completed", estimatedMinutes: 7, difficulty: "초급", questionCount: 9 },
      { id: "in-3", stageNumber: 3, emoji: "💎", title: "적립식 투자의 마법", subtitle: "매달 조금씩, 복리의 힘", status: "completed", estimatedMinutes: 6, difficulty: "초급", questionCount: 8 },
      { id: "in-4", stageNumber: 4, emoji: "⚖️", title: "자산 배분 전략", subtitle: "달걀을 한 바구니에 담지 마라", status: "completed", estimatedMinutes: 8, difficulty: "중급", questionCount: 10 },
      { id: "in-5", stageNumber: 5, emoji: "🏦", title: "ISA & 연금저축 절세 투자", subtitle: "세금 0원으로 투자하기", status: "in_progress", progress: 55, estimatedMinutes: 9, difficulty: "중급", questionCount: 11 },
      { id: "in-6", stageNumber: 6, emoji: "🌍", title: "해외 ETF 투자하기", subtitle: "S&P500이 뭔지 알면 반은 한 것", status: "available", estimatedMinutes: 8, difficulty: "중급", questionCount: 10 },
      { id: "in-7", stageNumber: 7, emoji: "🔮", title: "리밸런싱 실전 연습", subtitle: "내 포트폴리오, 점검할 시간", status: "locked", estimatedMinutes: 10, difficulty: "고급", questionCount: 12 },
    ],
  },
]

/** 객관식 퀴즈 문제 하나의 데이터 타입 */
export interface ChoiceQuestionItem {
  /** 문제 번호 (1-based) */
  questionNumber: number
  /** 단계 타입 (단순 학습 vs 퀴즈) */
  type?: "learning" | "quiz"
  /** 지문 본문 */
  passage: string
  /** 지문 아래 플레이버 텍스트 (생각 등) */
  flavorText: string
  /** 문제 이미지 URL */
  imageUrl: string
  /** 문제 이미지 alt 텍스트 */
  imageAlt: string
  /** 정답일 때 보여줄 캐릭터 이미지 URL */
  characterCorrectImageUrl?: string
  /** 오답일 때 보여줄 캐릭터 이미지 URL */
  characterIncorrectImageUrl?: string
  /** 객관식 질문 */
  question: string
  /** 보기 목록 */
  choices: string[]
  /** 정답 인덱스 (0-based) */
  correctIndex: number
  /** 해설 텍스트 */
  explanation: string
}

/** 전체 퀴즈 세트 */
export interface ChoiceQuestionSet {
  title: string
  questions: ChoiceQuestionItem[]
}

// ─── Mock Data ──────────────────────────────────────────────

export const MOCK_CHOICE_QUESTION_SET: ChoiceQuestionSet = {
  title: "부동산 사기 예방 퀴즈",
  questions: [
    {
      questionNumber: 1,
      type: "quiz",
      passage:
        '강아지가 드디어 마음에 드는 강아지집을 발견했어요! 시세보다 훨~씬 싸고, 집주인 아저씨는 "서류는 깨끗하니까 걱정 마!"라고 했어요. 그런데 보증금을 오늘 안에 내라고 재촉하네요…',
      flavorText: '"와, 이렇게 싼 집이! 빨리 계약해야 하나…?"',
      imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
      imageAlt: "강아지 일러스트",
      characterCorrectImageUrl: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucky",
      characterIncorrectImageUrl: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Sad",
      question: '"선순위 근저당"이 뭘까요?',
      choices: [
        "집을 예쁘게 꾸미는 인테리어 용어",
        "집주인이 은행에서 대출받을 때 쓰는 영수증",
        "우리보다 먼저 돈을 받을 권리가 있는 담보 설정",
        "강아지 집에 줄 선 다른 빚쟁이가 있다는 뜻",
      ],
      correctIndex: 2,
      explanation:
        '누군가 "서류 깨끗해!"라고 말해도, 직접 확인하기 전까지는 모르는 거예요. 등기부등본에는 이 집에 얼마나 빚이 걸려있는지 다 적혀있거든요. 사람 말보다 서류를 먼저 믿어야 해요!',
    },
    {
      questionNumber: 2,
      type: "quiz",
      passage:
        '강아지가 "등기부등본"이라는 서류를 받아봤어요. 뭔가 복잡해 보이는데… 여기서 꼭 확인해야 할 것은?',
      flavorText: '"이 서류, 어디부터 봐야 하지…?"',
      imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80",
      imageAlt: "서류를 보는 강아지 일러스트",
      characterCorrectImageUrl: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucky",
      characterIncorrectImageUrl: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Sad",
      question: "등기부등본에서 가장 먼저 확인해야 할 것은?",
      choices: [
        "건물의 색깔",
        "소유자 이름과 근저당 설정 여부",
        "주변 맛집 정보",
        "건물이 지어진 계절",
      ],
      correctIndex: 1,
      explanation:
        "등기부등본의 '을구'에는 근저당, 전세권 등이 적혀 있어요. 소유자 이름이 맞는지, 빚이 얼마나 걸려있는지 꼭 확인해야 해요!",
    },
  ],
}

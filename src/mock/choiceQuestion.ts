/** 객관식 퀴즈 문서 UI 항목 타입 */
export type DocumentCardField = {
  label: string;
  value: string;
};

export type DocumentCardData = {
  header: string;
  subHeader: string;
  sectionTitle: string;
  fields: DocumentCardField[];
  footerNotice?: string;
};

/** 객관식 퀴즈 문제 하나의 데이터 타입 */
export interface ChoiceQuestionItem {
  /** 문제 번호 (1-based) */
  questionNumber: number;
  /** 단계 타입 (단어장/학습 vs 퀴즈) */
  type?: 'word' | 'learning' | 'quiz';
  /**
   * 지문 표시 모드
   * - "text" : 일반 텍스트 카드 (기본값)
   * - "story": 대화형 버블 (추후 확장 예정)
   * - "conversation": 피그마 기반 대화형 (채팅방) UI
   * - "document": 서류 UI 카드 렌더링 모드
   */
  passageMode?: 'text' | 'story' | 'conversation' | 'document';
  /**
   * 선택지 표시 모드
   * - "multiple" : 사지선다 RadioGroup (기본값)
   * - "ox"       : O/X 버튼 2개
   * - "document_select" : 서류 UI의 fields 항목을 직접 터치해서 정답을 고르는 모드
   */
  choiceMode?: 'multiple' | 'ox' | 'document_select';
  /** 지문 본문 */
  passage: string;
  /** 지문 아래 플레이버 텍스트 (생각 등) */
  flavorText: string;
  /** 서류 기반 문제일 경우 렌더링할 UI 데이터 (passageMode가 "document"일 때 사용) */
  documentCard?: DocumentCardData;
  /** 대화 참여자 정보 (passageMode가 "conversation"일 때 사용) */
  conversationSpeakers?: {
    id: string;
    name?: string;
    position: 'left' | 'right';
    profileImageUrl?: string;
  }[];
  /** 대화형 지문 목록 (passageMode가 "conversation"일 때 사용) */
  conversations?: {
    id: string;
    speakerId: string;
    message: string;
  }[];
  /** 대화형 지문 하단 안내 박스 */
  conversationInfoBox?: {
    title: string;
    content: string;
  };
  /** 문제 이미지 URL */
  imageUrl: string;
  /** 문제 이미지 alt 텍스트 */
  imageAlt: string;
  /** 정답일 때 보여줄 캐릭터 이미지 URL */
  characterCorrectImageUrl?: string;
  /** 오답일 때 보여줄 캐릭터 이미지 URL */
  characterIncorrectImageUrl?: string;
  /** 객관식 질문 */
  question: string;
  /** 보기 목록 */
  choices: string[];
  /** 정답 인덱스 (0-based) */
  correctIndex: number;
  /** 해설 텍스트 */
  explanation: string;
}

/** 전체 퀴즈 세트 */
export interface ChoiceQuestionSet {
  title: string;
  questions: ChoiceQuestionItem[];
}

// ─── Mock Data ──────────────────────────────────────────────

export const MOCK_CHOICE_QUESTION_SET: ChoiceQuestionSet = {
  title: '[2단계: 계약] 도장 찍기 전, 멍멍이의 마지막 방어선!',
  questions: [
    // ────────────────────────────────────────────────────────
    // 1단계: 단어학습 (type: "word") - Q1 ~ Q5
    // ────────────────────────────────────────────────────────
    {
      questionNumber: 1,
      type: 'word',
      passageMode: 'text',
      passage:
        "[1부: 생존 단어장]\n계약 전 5가지만 기억하세요! 첫 번째는 '등기사항전부증명서(등기부등본)'입니다.",
      flavorText: '표제부: 겉모습 / 갑구: 진짜 주인 / 을구: 빚 상태',
      imageUrl:
        'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
      imageAlt: '계약서 서류',
      question:
        '등기사항전부증명서는 집의 진짜 주인과 빚이 적힌 부동산의 신분증입니다.',
      choices: ['단어 1. 등기사항전부증명서 (등기부등본)'],
      correctIndex: 0,
      explanation:
        '집의 모든 역사가 기록된 서류입니다. 부동산 계약의 시작과 끝이라고 할 수 있죠.',
    },
    {
      questionNumber: 2,
      type: 'word',
      passageMode: 'text',
      passage:
        "[1부: 생존 단어장]\n두 번째, '근저당권'와 '채권최고액'입니다. 근저당권은 집을 담보로 은행에 진 빚이에요.",
      flavorText: '채권최고액은 은행이 나중에 1순위로 뺏어갈 최대 금액이에요.',
      imageUrl:
        'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=400&q=80',
      imageAlt: '돈과 동전',
      question:
        "내 보증금이 안전한지 따질 때는 실제 남은 빚이 아니라 무조건 '채권최고액' 전체를 빚으로 봐야 해요.",
      choices: ['단어 2. 근저당권과 채권최고액'],
      correctIndex: 0,
      explanation:
        '실제 남은 빚이 얼마든 간에 서류에 적힌 근저당권 채권최고액 전체를 빚으로 계산하는 것이 안전합니다.',
    },
    {
      questionNumber: 3,
      type: 'word',
      passageMode: 'text',
      passage:
        "[1부: 생존 단어장]\n세 번째, 무시무시한 빨간불 삼총사! 바로 '가압류', '가처분', '신탁' 입니다.",
      flavorText: "서류의 '갑구'에 이런 단어들이 보인다면?",
      imageUrl:
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80',
      imageAlt: '경고 표시',
      question:
        '집에 심각한 문제가 있거나 진짜 주인이 따로 있다는 뜻이므로 절대 함부로 계약하면 안 됩니다.',
      choices: ['단어 3. 피해야 할 빨간불 (가압류/가처분/신탁)'],
      correctIndex: 0,
      explanation:
        '부동산 초보라면 갑구에 이런 권리 제한 단어가 있는 집은 무조건 피하는 것이 상책입니다.',
    },
    {
      questionNumber: 4,
      type: 'word',
      passageMode: 'text',
      passage:
        '[1부: 생존 단어장]\n네 번째, 대리인 계약 필수 서류. 주인이 바빠서 다른 사람이 대신 나왔다면 주인이 직접 떼어준 서류가 필요해요.',
      flavorText: '아무리 가족이라도 이 서류가 없으면 무효!',
      imageUrl:
        'https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&w=400&q=80',
      imageAlt: '서명하는 사람',
      question:
        "진짜 주인이 대리인에게 권한을 넘겼다는 증거인 '위임장'과 '본인발급 인감증명서'를 반드시 요구하세요.",
      choices: ['단어 4. 대리인 계약 필수 서류'],
      correctIndex: 0,
      explanation:
        '이 서류가 없으면 대리인과 맺은 계약은 무효가 될 수 있으므로, 보증금을 날릴 위험이 있습니다.',
    },
    {
      questionNumber: 5,
      type: 'word',
      passageMode: 'text',
      passage:
        "[1부: 생존 단어장]\n마지막, 나를 지켜주는 마법의 방패인 '특약'입니다. 계약서 맨 밑에 쓰는 특별한 약속이에요.",
      flavorText: '전세대출이 거절되면 계약금은 돌려준다!',
      imageUrl:
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
      imageAlt: '계약서 특약 사항',
      question:
        '만약 대출이 안 나오면 계약금은 돌려준다는 등, 나를 보호하는 문장을 추가할 수 있어요.',
      choices: ['단어 5. 특약 (나를 지켜주는 방패)'],
      correctIndex: 0,
      explanation:
        '표준 계약서의 기본 조항 외에 나를 보호할 수 있는 안전장치를 특약으로 반드시 명시해야 합니다.',
    },
  ],
};

export const CHOICE_QUESTION_SETS_BY_ID = {
  contract_step2: MOCK_CHOICE_QUESTION_SET,
} as const;

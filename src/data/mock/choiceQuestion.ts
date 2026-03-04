/** 객관식 퀴즈 문제 하나의 데이터 타입 */
export interface ChoiceQuestionItem {
  /** 문제 번호 (1-based) */
  questionNumber: number
  /** 단계 타입 (단어장/학습 vs 퀴즈) */
  type?: "word" | "learning" | "quiz"
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
  title: "[2단계: 계약] 도장 찍기 전, 멍멍이의 마지막 방어선!",
  questions: [
    // --- 1부: 생존 단어장 (단어 모드) ---
    {
      questionNumber: 1,
      type: "word",
      passage:
        "1부: 계약 전 필수 탑재! 멍멍이의 생존 단어장\n\n불독 중개사 아저씨와 기싸움을 하기 전, 5가지만 머릿속에 넣으세요! 첫 번째는 '등기사항전부증명서(등기부등본)'입니다.",
      flavorText: "표제부: 겉모습 / 갑구: 진짜 주인 / 을구: 빚 상태",
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80",
      imageAlt: "계약서와 펜",
      question: "등기사항전부증명서는 집의 진짜 주인과 빚이 적힌 부동산의 신분증입니다.",
      choices: ["단어 1. 등기사항전부증명서 (등기부등본)"],
      correctIndex: 0,
      explanation: "집의 모든 역사가 기록된 서류입니다. 표제부, 갑구, 을구 세 가지로 나뉘어 있어요.",
    },
    {
      questionNumber: 2,
      type: "word",
      passage:
        "단어장 두 번째, '근저당권'과 '채권최고액'입니다. 근저당권은 집주인이 집을 담보로 은행에 진 빚을 뜻해요.",
      flavorText: "채권최고액은 은행이 나중에 1순위로 뺏어갈 최대 금액이에요.",
      imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=400&q=80",
      imageAlt: "돈과 동전",
      question: "보통 실제 빌린 돈의 120%를 넉넉하게 적어둡니다. 내 보증금이 안전한지 따질 때는 이 채권최고액 전체를 빚으로 봐야 해요.",
      choices: ["단어 2. 근저당권과 채권최고액"],
      correctIndex: 0,
      explanation: "실제 남은 빚이 얼마든 간에 서류에 적힌 근저당권 채권최고액 전체를 빚으로 계산하는 것이 안전합니다.",
    },
    {
      questionNumber: 3,
      type: "word",
      passage:
        "단어장 세 번째, 무시무시한 빨간불 삼총사! 바로 '가압류', '가처분', '신탁' 입니다.",
      flavorText: "서류의 갑구에 이런 단어들이 보인다면?",
      imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80",
      imageAlt: "경고 표시",
      question: "집에 심각한 문제가 있거나 진짜 주인이 따로 있다는 뜻이므로 절대 함부로 계약하면 안 됩니다.",
      choices: ["단어 3. 피해야 할 빨간불 (가압류/가처분/신탁)"],
      correctIndex: 0,
      explanation: "부동산 초보라면 갑구에 이런 권리 제한 단어가 있는 집은 무조건 피하는 것이 상책입니다.",
    },
    {
      questionNumber: 4,
      type: "word",
      passage:
        "단어장 네 번째, 대리인 계약 필수 서류. 주인이 바빠서 다른 사람이 대신 나왔다면 주인이 직접 떼어준 서류가 필요해요.",
      flavorText: "어떤 서류인지 기억 나시나요?",
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&w=400&q=80",
      imageAlt: "서명하는 사람",
      question: "진짜 주인이 대리인에게 권한을 넘겼다는 증거인 '위임장'과 '본인발급 인감증명서'를 반드시 요구하세요.",
      choices: ["단어 4. 대리인 계약 필수 서류"],
      correctIndex: 0,
      explanation: "이 서류가 없으면 대리인과 맺은 계약은 무효가 될 수 있으므로, 보증금을 날릴 위험이 있습니다.",
    },
    {
      questionNumber: 5,
      type: "word",
      passage:
        "단어장 마지막, 나를 지켜주는 마법의 방패인 '특약'입니다. 계약서 맨 밑에 쓰는 특별한 약속이에요.",
      flavorText: "나중에 발생할 수 있는 사고를 대비해요.",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
      imageAlt: "계약서 특약 사항",
      question: "만약 대출이 안 나오면 계약금은 돌려준다는 둥, 나를 보호하는 문장을 추가할 수 있어요.",
      choices: ["단어 5. 특약 (나를 지켜주는 방패)"],
      correctIndex: 0,
      explanation: "표준 계약서의 기본 조항 외에 나를 보호할 수 있는 안전장치를 특약으로 반드시 명시해야 합니다.",
    },

    // --- 2부: 실전 모의고사 (퀴즈 모드) ---
    {
      questionNumber: 6,
      type: "quiz",
      passage:
        "[Scene 1: 신분증 요구하라!]\n\n부푼 꿈을 안고 '불독 부동산' 문을 연 멍멍이. 불독 중개사 아저씨가 사람 좋은 미소로 시세 반값짜리 집을 보여주며 계약서에 도장을 찍자고 재촉합니다.",
      flavorText: '"내가 보증하니까 그냥 요기 계약서에 발도장 꾹 찍어~"',
      imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
      imageAlt: "강아지 일러스트",
      question: "아저씨의 말만 믿을 수 없는 멍멍이! 이 집의 '진짜 주인'과 '빚'을 확인하기 위해 당당하게 떼어달라고 요구해야 할 서류는?",
      choices: [
        "이 집 크기가 얼만지 건축물대장 보여주세요!",
        "제 신분증 여깄습니다! 주민등록등본 떼어주세요!",
        "부동산의 신분증! 등기사항전부증명서(등기부등본) 보여주세요!",
        "집주인 아저씨 건강검진표 보여주세요!",
      ],
      correctIndex: 2,
      explanation:
        "등기사항전부증명서(등기부등본)는 집의 진짜 주인과 빚이 적힌 '부동산의 신분증'입니다. 가장 먼저 요구해야 합니다.",
    },
    {
      questionNumber: 7,
      type: "quiz",
      passage:
        "[Scene 1]\n서류의 첫 장을 보니 이 집이 '햇살동 100번지, 2층짜리 집'이 맞는지 건물의 스펙이 적혀 있네요.",
      flavorText: '"윙~ 프린터기에서 서류가 나왔어요."',
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
      imageAlt: "서류를 보는 강아지 일러스트",
      question: "집의 겉모습이 적혀 있는 서류의 이 부분은 뭐라고 부를까요?",
      choices: ["표제부", "갑구", "을구"],
      correctIndex: 0,
      explanation: "표제부는 집의 주소, 면적, 층수 등 겉모습(외형)에 대한 기본적인 정보가 적힌 부분입니다.",
    },
    {
      questionNumber: 8,
      type: "quiz",
      passage:
        "[Scene 1]\n주소와 층수는 확인했어요. 그럼 이제 불독 아저씨가 진짜 주인이 맞는지 이름과 주민등록번호를 대조해 보려고 해요.",
      flavorText: '"이 집의 진짜 주인은 누구일까?"',
      imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80",
      imageAlt: "자세히 바라보는 개",
      question: "소유권 확인을 위해 서류의 어느 부분을 뚫어져라 살펴봐야 할까요?",
      choices: ["표제부", "갑구", "을구"],
      correctIndex: 1,
      explanation: "갑구에는 소유권(진짜 주인)과 가압류 같은 권리 위험 요소가 적혀 있습니다.",
    },
    {
      questionNumber: 9,
      type: "quiz",
      passage:
        "[Scene 2: 서류의 숨겨진 진실]\n\n(헉!) 갑구를 보던 멍멍이의 꼬리가 처졌어요. 무시무시한 글씨로 [가압류]라고 적혀 있었거든요!\n불독 중개사: 아유~ 별거 아니야. 내가 낼모레 싹 지워줄 테니까 쿨하게 도장 찍어!",
      flavorText: '"내일모레 지워준다는 약속, 믿어도 될까?"',
      imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80",
      imageAlt: "경고",
      question: "이때 불독 아저씨의 말을 들은 멍멍이의 올바른 행동은?",
      choices: [
        "넵! 내일모레 지워주신다는 아저씨 약속 믿고 계약할게요!",
        "절대 안 돼요! 약속은 무효! 서류가 깨끗해지기 전까진 계약 못 해요!",
      ],
      correctIndex: 1,
      explanation: "절대 구두 약속을 믿으면 안 됩니다. 등기부등본이 완전히 깨끗해진 것을 눈으로 확인한 후 서명해야 보호받을 수 있습니다.",
    },
    {
      questionNumber: 10,
      type: "quiz",
      passage:
        "[Scene 2]\n다른 집 구경을 갔는데, 이번엔 '갑구' 소유자 란에 집주인 이름 대신 [신탁]이라고 적혀 있어요.\n불독 중개사: 내가 원래 주인 맞고, 관리만 회사에 잠깐 맡긴 거니까 나랑 그냥 계약해~",
      flavorText: '"원래 주인이라고 하니 계약해도 되겠지?"',
      imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80",
      imageAlt: "집 안 문스프링",
      question: "신탁이라고 적힌 집, 불독 아저씨의 말만 믿고 덜컥 계약해도 될까요?",
      choices: ["O (계약해도 된다)", "X (계약하면 안 된다)"],
      correctIndex: 1,
      explanation: "정답은 X입니다! 신탁된 집의 진짜 권리는 '신탁회사'에 있습니다. 원래 주인이랑 함부로 계약하면 보증금을 다 날려요!",
    },
    {
      questionNumber: 11,
      type: "quiz",
      passage:
        "[Scene 3: 빚쟁이 집 피하기]\n이번엔 가압류도 신탁도 없는 달빛 하우스를 보러 왔어요. 이번엔 은행 빚을 꼼꼼히 봅니다.",
      flavorText: '"빚이 얼마나 있는 집인지 봐야 해!"',
      imageUrl: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&w=400&q=80",
      imageAlt: "계산기와 돈",
      question: "이 집에 은행 대출이 얼마나 있는지 확인하려면 서류의 어디를 봐야 할까요?",
      choices: ["표제부", "갑구", "을구"],
      correctIndex: 2,
      explanation: "을구에는 근저당권(은행 대출)이나 전세권 등 소유권 외의 권리, 즉 빚과 관련된 사항이 적혀 있습니다.",
    },
    {
      questionNumber: 12,
      type: "quiz",
      passage:
        "[Scene 3]\n을구를 보니 [근저당권 채권최고액 3억 원]이라고 떡하니 적혀 있어요! 멍멍이는 머릿속으로 보증금이 안전할지 계산해보기 시작합니다.",
      flavorText: '"최고니까 최대로 뺏어간다는 거겠지?"',
      imageUrl: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=400&q=80",
      imageAlt: "생각하는 개",
      question: "멍멍이의 생각 중 가장 위험한 착각은 무엇일까요?",
      choices: [
        "은행이 집이 넘어갔을 때 최대로 뺏어갈 수 있는 한도가 3억이군.",
        "실제 빌린 원금은 3억보다 조금 적을 거야. 은행은 120% 정도 적어두니까.",
        "보증금 안전을 계산할 때, 3억 말고 실제 빌린 원금만 빚으로 치면 안전하겠지? 개이득!",
      ],
      correctIndex: 2,
      explanation:
        "무조건 은행 입장에서 적어 둔 최대 금액인 채권최고액 전체(3억 전체)를 빚으로 쳐서 보수적으로 계산해야 안전합니다.",
    },
    {
      questionNumber: 13,
      type: "quiz",
      passage:
        "[Scene 3]\n불독 아저씨가 영수증을 꺼냅니다. '서류엔 3억이지만 내가 열심히 갚아서 빚 5천만 원밖에 안 남았어. 영수증 봤지?'",
      flavorText: '"이제 빚 5천밖에 안 남았어. 자, 은행 영수증 확인!"',
      imageUrl: "https://images.unsplash.com/photo-1620228864756-32d721151bb2?auto=format&fit=crop&w=400&q=80",
      imageAlt: "바스락거리는 종이",
      question: "영수증을 본 상황에서 가장 똑똑한 멍멍이의 말은?",
      choices: [
        "영수증 팩트 체크 완벽하네요! 당장 계약할게요.",
        "영수증 말고, 나중에 잔금 치를 때 서류상 빚도 확실히 감액 등기나 말소해주시면 계약할게요!",
      ],
      correctIndex: 1,
      explanation:
        "은행 영수증만 믿으면 낭패를 봅니다! 영수증보다 등기부등본이 우선이므로 반드시 등기부등본상의 빚(근저당권)을 말소 또는 감액등기 해야 합니다.",
    },
    {
      questionNumber: 14,
      type: "quiz",
      passage:
        "[Scene 4: 계약서 작성의 순간!]\n\n깐깐한 철벽 방어 끝에 진짜 안전한 집을 찾았습니다. 오늘은 '이 집 찜할게요!'라는 의미로 계약금을 내는 날이에요.",
      flavorText: '"이 집 내 집이야! 찜!"',
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80",
      imageAlt: "열쇠 모양 액세서리",
      question: "보통 전체 전세 보증금의 몇 %를 계약금으로 낼까요?",
      choices: [
        "1% (만 원만 낼게요!)",
        "5~10% (국룰의 시작!)",
        "50% (반은 줘야 내 집이지!)",
        "100% (오늘 다 가져가세요!)",
      ],
      correctIndex: 1,
      explanation: "보통 전체 보증금의 5~10%를 계약금으로 송금해 가계약 혹은 본인 의사를 확고히 하는 것이 보통입니다.",
    },
    {
      questionNumber: 15,
      type: "quiz",
      passage:
        "[Scene 4]\n앗! 그런데 집주인 불독 아저씨가 바쁘다며, 동생인 퍼그 아저씨가 대신(대리인) 계약하러 나왔어요.",
      flavorText: '"우리 형이 나한테 다 알아서 하랬어~"',
      imageUrl: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=400&q=80",
      imageAlt: "퍼그 강아지",
      question: "멍멍이가 퍼그 아저씨에게 꼭 확인해야 하는 '대리인 필수 서류' 두 가지는?",
      choices: [
        "가족관계증명서, 불독 아저씨의 셀카",
        "위임장, 불독 아저씨의 인감증명서",
        "건축물대장, 토지대장",
      ],
      correctIndex: 1,
      explanation: "서류상 집주인(불독)이 대리인(퍼그)에게 권한을 위임했다는 완벽한 법적 증거인 '위임장'과 '주인 본인발급 인감증명서'를 받아야 합니다.",
    },
    {
      questionNumber: 16,
      type: "quiz",
      passage:
        "[Scene 4]\n멍멍이는 은행 전세 대출로 남은 돈을 낼 거예요. 대출이 튕기면 아까운 계약금을 몽땅 날릴까 봐 두렵습니다.",
      flavorText: '"만약 은행에서 거절당하면 내 돈은?"',
      imageUrl: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=400&q=80",
      imageAlt: "돈 뭉치",
      question: "계약서 맨 밑 '특약사항'에 꼭 적어달라고 해야 하는 '마법의 문장'은?",
      choices: [
        "대출 안 나오면 중개사 아저씨가 대신 갚아준다.",
        "임차인의 책임 없는 사유로 전세 대출이 거절될 경우 계약은 무효로 하고 계약금은 전액 반환한다.",
        "집에 모기가 나오면 방역해 준다.",
      ],
      correctIndex: 1,
      explanation: "이 특약 조항이 없다면, 나중에 내 잘못 없이 대출이 불승인되어도 계약금을 고스란히 떼일 수 있습니다.",
    },
    {
      questionNumber: 17,
      type: "quiz",
      passage:
        "[Scene 4]\n드디어 모바일 뱅킹으로 계약금을 쏠 시간!\n퍼그 아저씨: 형이 바쁘니까, 그냥 여기 내(퍼그) 통장이나 중개사 통장으로 보내줘~",
      flavorText: '"가족 통장이니까 문제없지?"',
      imageUrl: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=400&q=80",
      imageAlt: "모바일 폰 이체",
      question: "멍멍이는 귀찮은데 그냥 퍼그 아저씨 통장으로 돈을 보내도 될까요?",
      choices: ["O (보내도 된다)", "X (절대 안 된다)"],
      correctIndex: 1,
      explanation:
        "정답은 X입니다! 돈은 하늘이 두 쪽 나도, 무조건 서류 '갑구'에 적힌 진짜 집주인(불독) 명의의 통장으로만 입금해야 합니다.",
    },
  ],
}

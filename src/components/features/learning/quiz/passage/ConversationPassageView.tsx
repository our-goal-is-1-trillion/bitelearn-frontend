import { useEffect, useMemo, useState } from 'react';

import bulldogProfileImage from '@/assets/character/bulldog_profile.png';
import mungmungProfileImage from '@/assets/character/mungmung_profile.jpg';
import retrieverProfileImage from '@/assets/character/retriever_profile.png';
import Footer from '@/components/common/Footer';
import ChapterIndicator from '@/components/features/learning/chapter/ChapterIndicator';
import type { QuizInfo } from '@/api/learning/learning.types';
import useIndicatorShadow from '@/hooks/useIndicatorShadow';
import type { StepIndicatorInfo } from '../quiz.types';
import QuizTitle from '../shared/QuizTitle';

type ConversationPassageViewProps = {
  question: QuizInfo;
  indicatorSteps: StepIndicatorInfo[];
  onSolve: () => void;
  // 애니메이션 건너뛰고 바로 전체 대화 보여주기
  skipAnimation?: boolean;
};

const SPEAKER_VISUALS = {
  멍멍이: {
    profileImageUrl: mungmungProfileImage,
    position: 'right' as const,
    imageClassName: 'left-[-14px] top-[-6px] h-16 w-16 max-w-none',
  },
  '불독 중개사': {
    profileImageUrl: bulldogProfileImage,
    position: 'left' as const,
    imageClassName: 'left-[-12px] top-[-6px] h-[60px] w-[60px] max-w-none',
  },
  '리트리버 선배': {
    profileImageUrl: retrieverProfileImage,
    position: 'left' as const,
    imageClassName: 'left-[-12px] top-[-6px] h-[60px] w-[60px] max-w-none',
  },
  나: {
    profileImageUrl: mungmungProfileImage,
    position: 'right' as const,
    imageClassName: 'left-[-14px] top-[-6px] h-16 w-16 max-w-none',
  },
  공인중개사: {
    profileImageUrl: bulldogProfileImage,
    position: 'left' as const,
    imageClassName: 'left-[-12px] top-[-6px] h-[60px] w-[60px] max-w-none',
  },
};

function ConversationProfile({
  speaker,
}: {
  speaker?: {
    name?: string;
    profileImageUrl?: string;
    imageClassName?: string;
  };
}) {
  if (!speaker?.profileImageUrl) {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-300 text-xs font-bold text-white shadow-bl-md">
        {speaker?.name?.[0] ?? '?'}
      </div>
    );
  }

  return (
    <div className="relative h-9 w-9 overflow-hidden rounded-full shadow-bl-md">
      <img
        src={speaker.profileImageUrl}
        alt={speaker.name || 'profile'}
        className={`absolute object-cover ${speaker.imageClassName ?? 'inset-0 h-full w-full'}`}
      />
    </div>
  );
}

export default function ConversationPassageView({
  question,
  indicatorSteps,
  onSolve,
  skipAnimation = false,
}: ConversationPassageViewProps) {
  // 대화 데이터 파싱
  const dialogues = useMemo(
    () => question.specificData?.dialogues ?? [],
    [question.specificData?.dialogues]
  );

  // 대화에서 화자 정보 추출 및 시각적 요소 매핑
  const conversations = useMemo(
    () =>
      dialogues.map((line, dialogueIndex) => ({
        id: `d-${question.quizId}-${dialogueIndex}`,
        speakerId: line.speaker,
        message: line.message,
      })),
    [dialogues, question.quizId]
  );

  // 화자별 시각적 요소 계산
  const conversationSpeakers = useMemo(
    () =>
      Array.from(new Set(dialogues.map((line) => line.speaker))).map(
        (speaker) => {
          const speakerVisual =
            SPEAKER_VISUALS[speaker as keyof typeof SPEAKER_VISUALS] ??
            SPEAKER_VISUALS['불독 중개사'];

          return {
            id: speaker,
            name: speaker,
            profileImageUrl: speakerVisual.profileImageUrl,
            position: speakerVisual.position,
            imageClassName: speakerVisual.imageClassName,
          };
        }
      ),
    [dialogues]
  );

  const [visibleCount, setVisibleCount] = useState(() =>
    skipAnimation ? conversations.length : 0
  );
  const [showTyping, setShowTyping] = useState(false);
  const { scrollRef, showIndicatorShadow } =
    useIndicatorShadow<HTMLDivElement>();

  const totalBubbles = conversations.length;
  const allVisible = visibleCount >= totalBubbles;

  // 대화 애니메이션 효과
  useEffect(() => {
    if (visibleCount >= totalBubbles) return;

    const prevMessage =
      visibleCount > 0 ? (conversations[visibleCount - 1]?.message ?? '') : '';

    const readingDelay =
      visibleCount === 0
        ? 400
        : Math.min(2000, Math.max(700, prevMessage.length * 30));

    if (visibleCount === 0) {
      const timer = window.setTimeout(() => {
        setVisibleCount(1);
      }, readingDelay);

      return () => window.clearTimeout(timer);
    }

    const typingTimer = window.setTimeout(() => {
      setShowTyping(true);
    }, readingDelay);

    const bubbleTimer = window.setTimeout(() => {
      setShowTyping(false);
      setVisibleCount((prev) => prev + 1);
    }, readingDelay + 900);

    return () => {
      window.clearTimeout(typingTimer);
      window.clearTimeout(bubbleTimer);
    };
  }, [visibleCount, totalBubbles, conversations]);

  // 새 대화가 보일 때마다 스크롤을 최하단으로 이동
  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [visibleCount, showTyping]);

  const nextConversation = conversations[visibleCount];
  const nextSpeaker = conversationSpeakers.find(
    (speaker) => speaker.id === nextConversation?.speakerId
  );
  const nextIsLeft = nextSpeaker?.position === 'left';

  return (
    <>
      <section
        ref={scrollRef}
        className="hide-scrollbar flex-1 overflow-y-auto bg-background px-5 pt-[74px]"
        data-mode="conversation"
      >
        <div className="pt-6">
          <div className="flex flex-col gap-4">
            <QuizTitle
              questionNumber={question.sequence}
              questionTitle={
                question.passageTitle?.trim() || question.questionTitle
              }
            />
            {conversations.slice(0, visibleCount).map((conversation) => {
              const speaker = conversationSpeakers.find(
                (item) => item.id === conversation.speakerId
              );
              const isLeft = speaker?.position === 'left';

              const alignClass = isLeft ? 'justify-start' : 'justify-end';
              const bubbleClass = isLeft
                ? 'rounded-br-2xl rounded-tl-2xl rounded-tr-2xl bg-white text-slate-800 shadow-bl-md'
                : 'rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl bg-slate-600 text-white shadow-[0_4px_6px_0_rgba(203,213,225,1)]';

              return (
                <div
                  key={conversation.id}
                  className={`flex w-full items-end gap-2 ${alignClass} animate-bubble-in`}
                >
                  {isLeft && (
                    <div className="mb-1 shrink-0">
                      <ConversationProfile speaker={speaker} />
                    </div>
                  )}

                  <div
                    className={`max-w-[280px] px-4 py-2.5 text-sm leading-5 ${bubbleClass} ${
                      isLeft ? 'text-left font-normal' : 'text-left font-medium'
                    }`}
                  >
                    {conversation.message
                      .split('\n')
                      .map((line, index, array) => (
                        <span key={index}>
                          {line}
                          {index < array.length - 1 && <br />}
                        </span>
                      ))}
                  </div>

                  {!isLeft && (
                    <div className="mb-1 shrink-0">
                      <ConversationProfile speaker={speaker} />
                    </div>
                  )}
                </div>
              );
            })}

            {showTyping && nextConversation && (
              <div
                className={`animate-bubble-in flex items-end gap-2 ${
                  nextIsLeft ? 'justify-start' : 'justify-end'
                }`}
              >
                {nextIsLeft && (
                  <div className="mb-1 shrink-0">
                    <ConversationProfile speaker={nextSpeaker} />
                  </div>
                )}

                <div
                  className={`flex min-h-9 items-center gap-1.5 px-4 py-2 shadow-bl-md ${
                    nextIsLeft
                      ? 'rounded-br-2xl rounded-tl-2xl rounded-tr-2xl bg-white'
                      : 'rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl bg-slate-600'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:0ms] ${
                      nextIsLeft ? 'bg-slate-400' : 'bg-slate-200'
                    }`}
                  />
                  <span
                    className={`h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:150ms] ${
                      nextIsLeft ? 'bg-slate-400' : 'bg-slate-200'
                    }`}
                  />
                  <span
                    className={`h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:300ms] ${
                      nextIsLeft ? 'bg-slate-400' : 'bg-slate-200'
                    }`}
                  />
                </div>

                {!nextIsLeft && (
                  <div className="mb-1 shrink-0">
                    <ConversationProfile speaker={nextSpeaker} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes bubbleIn {
          from { opacity: 0; transform: translateY(8px) scale(0.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-bubble-in {
          animation: bubbleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
      `}</style>

      <ChapterIndicator
        steps={indicatorSteps}
        variant="quiz"
        showShadow={showIndicatorShadow}
      />
      <Footer
        onClick={onSolve}
        disabled={!allVisible}
        showTrailingIcon={false}
      >
        문제 풀기
      </Footer>
    </>
  );
}

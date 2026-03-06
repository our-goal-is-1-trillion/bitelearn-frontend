import { useMemo, useState } from 'react';
import QuizHeader from '@/components/common/QuizHeader';
import QuizFooter from '@/components/common/QuizFooter';
import { cn } from '@/lib/utils';
import type {
  ChoiceQuestionItem,
  ChoiceQuestionSet,
} from '@/mock/choiceQuestion';

type WordLearningProps = {
  wordSet: ChoiceQuestionSet;
  onBack: () => void;
};

export default function WordLearning({ wordSet, onBack }: WordLearningProps) {
  const words = useMemo(
    () =>
      wordSet.questions.filter(
        (q): q is ChoiceQuestionItem => q.type === 'word'
      ),
    [wordSet]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [slideClasses, setSlideClasses] = useState('translate-x-0 opacity-100');

  const handleNext = () => {
    if (currentIndex >= words.length - 1) {
      onBack();
      return;
    }

    setSlideClasses('-translate-x-[120%] opacity-0');

    setTimeout(() => {
      setSlideClasses('translate-x-[120%] opacity-0 !duration-0');
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSlideClasses('translate-x-0 opacity-100 duration-500 ease-out');
        });
      });
    }, 300);
  };

  const handlePrev = () => {
    if (currentIndex <= 0) return;

    setSlideClasses('translate-x-[120%] opacity-0');

    setTimeout(() => {
      setSlideClasses('-translate-x-[120%] opacity-0 !duration-0');
      setIsFlipped(false);
      setCurrentIndex((prev) => prev - 1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSlideClasses('translate-x-0 opacity-100 duration-500 ease-out');
        });
      });
    }, 300);
  };

  const currentWord = words[currentIndex];

  if (!currentWord) {
    return (
      <main className="relative flex flex-1 flex-col overflow-hidden border border-slate-200 bg-slate-50 text-slate-900 shadow-xl">
        <div className="z-20 shrink-0 bg-white">
          <QuizHeader
            title="생존 단어장"
            showCloseButton
            onCloseClick={onBack}
          />
        </div>
        <div className="flex flex-1 items-center justify-center p-6">
          <p className="text-sm font-medium text-slate-500">
            표시할 단어가 없습니다.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex h-dvh flex-col overflow-hidden border border-slate-200 bg-slate-50 text-slate-900 shadow-xl">
      <div className="z-20 shrink-0 bg-white">
        <QuizHeader title="생존 단어장" showCloseButton onCloseClick={onBack} />
      </div>

      {/* 진행 상태 */}
      <div className="z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <span className="text-sm font-semibold text-slate-600">
          학습 진행도
        </span>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
          {currentIndex + 1} / {words.length}
        </span>
      </div>

      {/* 카드 영역 */}
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-x-hidden bg-slate-50 p-6">
        <div
          className={cn(
            'perspective-1000 relative w-full transition-all duration-300',
            slideClasses
          )}
        >
          <div
            className={cn(
              'preserve-3d relative min-h-[560px] w-full cursor-pointer rounded-2xl shadow-md',
              isFlipped ? 'rotate-y-180 min-h-[600px]' : 'min-h-[560px]'
            )}
            style={{
              transition: slideClasses.includes('duration-0')
                ? 'none'
                : 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1), min-height 600ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* 카드 앞면 (Front) */}
            <div className="backface-hidden group absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="flex w-full flex-1 items-center justify-center bg-slate-100 p-6 transition-colors group-hover:bg-slate-200">
                {/* 이미지 영역 */}
                {currentWord.imageUrl ? (
                  <img
                    src={currentWord.imageUrl}
                    alt={currentWord.imageAlt}
                    className="h-full w-full rounded-xl object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex flex-col items-center text-6xl drop-shadow-sm">
                    <span className="mb-4">📖</span>
                    <span className="text-base font-semibold text-slate-400">
                      이미지가 없습니다
                    </span>
                  </div>
                )}
              </div>
              <div className="z-10 flex shrink-0 flex-col items-center justify-center border-t border-slate-100 bg-white p-6 text-center sm:p-8">
                <div className="flex w-full flex-1 flex-col items-center justify-center">
                  <div className="mb-4 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
                    <span className="text-xs font-extrabold tracking-wide text-primary">
                      {currentWord.flavorText || 'KEY WORD'}
                    </span>
                  </div>
                  <h2 className="mb-6 break-keep text-2xl font-extrabold text-slate-800 sm:text-3xl">
                    {currentWord.choices[0] || '단어 이름'}
                  </h2>
                  <div className="w-full max-w-[220px] rounded-xl border border-slate-100 bg-slate-50 px-5 py-2.5">
                    <p className="animate-pulse text-sm font-semibold text-slate-500">
                      터치해서 숨은 의미 확인! 👇
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 카드 뒷면 (Back) */}
            <div className="backface-hidden rotate-y-180 absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 text-white shadow-xl">
              <div className="flex w-full flex-1 flex-col items-center justify-center overflow-y-auto p-6">
                <h3 className="mb-4 text-center text-xl font-bold text-emerald-400">
                  {currentWord.question}
                </h3>
                <div className="mb-6 h-1 w-12 shrink-0 rounded-full bg-slate-600" />
                <p className="w-full max-w-sm break-keep text-center text-sm font-medium leading-relaxed text-slate-200 sm:text-base">
                  {currentWord.passage}
                </p>
                <div className="mt-8 w-full max-w-sm rounded-xl border border-slate-700/50 bg-slate-900/50 p-4 text-left shadow-inner sm:p-5">
                  <p className="text-sm font-medium leading-relaxed text-slate-300">
                    <span className="mr-2 text-emerald-400">💡</span>
                    {currentWord.explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuizFooter
        disabled={!isFlipped}
        previousDisabled={currentIndex === 0}
        onPrevious={handlePrev}
        onClick={handleNext}
      >
        {currentIndex === words.length - 1 ? '학습 완료 (홈으로)' : '다음 단어'}
      </QuizFooter>
    </main>
  );
}

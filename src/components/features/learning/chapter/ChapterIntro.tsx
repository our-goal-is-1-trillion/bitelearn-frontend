import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Header from '@/components/common/Header';

import chapterIntroCharacter from '@/assets/character/chapter_intro.png';

type ChapterIntroMode = 'start' | 'resume' | 'retry';

type ChapterIntroProps = {
  chapterTitle: string;
  prologueSubtitle: string;
  chapterGoal: string;
  prologueContent: string;
  coreKeywords: string[];
  introMode?: ChapterIntroMode;
  chapterLabel?: string;
  onStart: () => void;
  onBack: () => void;
};

export default function ChapterIntro({
  chapterTitle,
  prologueSubtitle,
  chapterGoal,
  prologueContent,
  coreKeywords,
  introMode = 'start',
  chapterLabel = '학습 Chapter',
  onStart,
  onBack,
}: ChapterIntroProps) {
  const startButtonLabel =
    introMode === 'resume'
      ? '이어서 학습하기'
      : introMode === 'retry'
        ? '다시 학습하기'
        : '학습하기';

  return (
    <main className="flex h-full min-h-0 flex-col overflow-hidden bg-background text-foreground">
      <Header
        showCloseButton
        onCloseClick={onBack}
        backgroundVariant="transparent"
      />

      <section className="hide-scrollbar flex flex-1 flex-col overflow-y-auto bg-[radial-gradient(circle_at_center,_rgba(255,237,213,0.92)_0%,_rgba(250,250,250,1)_58%)] pt-[60px]">
        <div className="px-5 pb-8 pt-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="inline-flex items-center rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold leading-4 text-slate-100">
              {chapterLabel}
            </div>

            <div className="border-b-2 border-primary px-[2px] pb-[2px]">
              <h1 className="text-xl font-bold leading-7 text-foreground">
                {chapterTitle}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={chapterIntroCharacter}
            alt="chapter intro character"
            className="aspect-[102/127] w-[204px]"
          />
        </div>

        <div className="relative z-10 -mt-20 flex flex-1 flex-col rounded-t-3xl bg-white px-9 pb-28 pt-7">
          <div>
            <h2 className="text-base font-bold leading-6 text-foreground">
              {prologueSubtitle}
            </h2>
            <p className="mt-3 whitespace-pre-line break-keep text-sm font-normal leading-5 text-foreground">
              {prologueContent}
            </p>
          </div>

          <div className="my-5 h-px w-full bg-slate-100" />

          <div className="flex items-center gap-4">
            <span className="text-2xl leading-8">🎯</span>
            <div className="flex flex-col items-start gap-1">
              <p className="text-xs font-bold leading-4 text-primary-600">
                이번 목표
              </p>
              <p className="text-sm font-semibold leading-5 text-foreground">
                {chapterGoal}
              </p>
            </div>
          </div>

          <div className="my-5 h-px w-full bg-slate-100" />

          <div className="flex items-start gap-4">
            <span className="text-2xl leading-8">📖</span>
            <div className="flex flex-col items-start gap-2">
              <p className="text-xs font-bold leading-4 text-primary-600">
                핵심 내용
              </p>
              <div className="flex flex-wrap items-start gap-1.5">
                {coreKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-neutral-100 px-2.5 py-1.5 text-xs font-semibold leading-4 text-neutral-700"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="fixed bottom-0 left-1/2 z-30 w-full max-w-screen-sm -translate-x-1/2 bg-white px-5 pb-8 pt-4">
        <Button
          className="relative h-14 w-full rounded-2xl bg-primary text-base font-bold leading-6 text-foreground"
          onClick={onStart}
        >
          {startButtonLabel}
          <ChevronRight className="absolute right-4 size-6" />
        </Button>
      </footer>
    </main>
  );
}

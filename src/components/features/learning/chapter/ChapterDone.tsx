import { useEffect, useState } from 'react';
import { animate, motion } from 'framer-motion';
import { Check } from 'lucide-react';

import chapterDoneImage from '@/assets/character/chapter_done.png';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

type ChapterDoneProps = {
  correct: number;
  total: number;
  accuracyRate: number;
  chapterTitle: string;
  closingMessage?: string | null;
  onFinish: () => void;
  onClose?: () => void;
};

export default function ChapterDone({
  correct,
  total,
  accuracyRate,
  closingMessage,
  onFinish,
  onClose,
}: ChapterDoneProps) {
  const [displayAccuracyRate, setDisplayAccuracyRate] = useState(0);

  useEffect(() => {
    const controls = animate(0, accuracyRate, {
      duration: 1.1,
      delay: 0.2,
      ease: 'easeOut',
      onUpdate: (value) => setDisplayAccuracyRate(Math.round(value)),
    });

    return () => controls.stop();
  }, [accuracyRate]);

  return (
    <main className="flex h-full min-h-0 flex-col bg-background text-foreground">
      <Header showCloseButton onCloseClick={onClose} />

      <div className="flex flex-1 flex-col items-center justify-center px-5 pb-36 pt-[60px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex w-full max-w-[335px] flex-col items-center"
        >
          <div className="mb-5 flex h-[148px] w-[148px] items-center justify-center rounded-full bg-gradient-to-b from-[#fff7ed] to-[#ffedd5]">
            <motion.img
              src={chapterDoneImage}
              alt="학습을 마친 멍멍이"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 15 }}
              className="h-[148px] w-[148px] object-contain"
            />
          </div>

          <div className="flex flex-col items-center gap-5">
            <div className="border-b-2 border-primary px-0.5">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold leading-9 text-foreground">
                  이번 학습 완료
                </h1>
                <Check className="size-6 text-primary" strokeWidth={2.2} />
              </div>
            </div>

            <p className="max-w-[320px] whitespace-pre-line text-sm leading-5 text-foreground">
              {closingMessage}
            </p>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="mt-10 w-full rounded-2xl border-2 border-slate-100 bg-card p-[18px] shadow-[0px_12px_16px_0px_#edeef6,0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            <p className="text-center text-sm font-bold leading-5 text-foreground">
              퀴즈 결과
            </p>

            <div className="mt-3 flex items-end justify-between">
              <span className="text-4xl font-extrabold leading-none tracking-tight text-slate-600">
                {displayAccuracyRate}%
              </span>
              <span className="pb-1 text-sm font-medium leading-5 text-slate-400">
                {correct}/{total} 정답
              </span>
            </div>

            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${accuracyRate}%` }}
                transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
              />
            </div>
          </motion.section>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-app -translate-x-1/2 bg-white shadow-[0_-8px_24px_rgba(15,23,42,0.04)]">
        <Footer onClick={onFinish}>챕터 결과 확인하기</Footer>
      </div>
    </main>
  );
}

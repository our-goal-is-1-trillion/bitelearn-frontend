import { motion } from 'framer-motion';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import VocabDoneImage from '@/assets/character/vocab_done.png';

type VocabDoneProps = {
  chapterTitle: string;
  onClose: () => void;
  onStartQuiz: () => void;
};

export default function VocabDone({
  chapterTitle,
  onClose,
  onStartQuiz,
}: VocabDoneProps) {
  return (
    <main className="flex h-full min-h-0 flex-col bg-background text-foreground">
      <Header
        title={chapterTitle}
        subtitle="단어 학습"
        showCloseButton
        onCloseClick={onClose}
      />

      <div className="flex flex-1 flex-col items-center justify-center px-5 pb-36 pt-[74px] text-center">
        <div className="mx-auto mb-5 flex h-[148px] w-[148px] items-center justify-center rounded-full bg-gradient-to-b from-[#fff7ed] to-[#ffedd5]">
          <motion.img
            src={VocabDoneImage}
            alt="자랑스러워하는 멍뭉이"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 15 }}
            className="h-[148px] w-[148px] object-contain"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="border-b-2 border-primary px-0.5">
            <h1 className="text-2xl font-bold leading-[30.25px] text-foreground">
              단어 학습을 끝마쳤어요!
            </h1>
          </div>

          <p className="text-sm leading-5 text-foreground">
            방금 배운 내용을 바탕으로 실전 퀴즈를 풀며
            <br />
            멍뭉이를 도와주세요!
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-screen-sm -translate-x-1/2 bg-white shadow-[0_-8px_24px_rgba(15,23,42,0.04)]">
        <Footer onClick={onStartQuiz}>학습 퀴즈 풀러 가기</Footer>
      </div>
    </main>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ONBOARDING_DATA } from '@/constants/onboardingData';

type OnboardingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: number;
};

export default function OnboardingModal({
  isOpen,
  onClose,
  initialStep = 0,
}: OnboardingModalProps) {
  const [step, setStep] = useState(initialStep);

  if (!isOpen) return null;

  const isLastStep = step === ONBOARDING_DATA.length - 1;
  const currentData = ONBOARDING_DATA[step];

  const handleNext = () => {
    if (!isLastStep) {
      setStep((p) => p + 1);
    } else {
      setStep(initialStep);
      onClose();
    }
  };

  const handleClose = () => {
    setStep(initialStep);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-white shadow-2xl"
      >
        {/* 닫기 버튼 */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-foreground shadow-sm transition-colors hover:bg-white"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">건너뛰기</span>
        </button>

        {/* 스텝마다 슬라이드되는 이미지 + 텍스트 영역 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* 이미지 — 4:3 비율 고정 */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary-bg/50">
              <img
                src={currentData.image}
                alt={`onboarding step ${step + 1}`}
                className="h-full w-full object-cover"
                style={{ objectPosition: 'center calc(50% - 8px)' }}
              />
              {/* 이미지 하단 페이드 */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/40 to-transparent" />
            </div>

            {/* 텍스트 — 고정 높이로 스텝 간 모달 크기 변화 방지 */}
            <div className="flex h-48 flex-col items-center justify-center overflow-hidden px-6 text-center">
              <h2 className="mb-4 text-xl font-bold leading-7 text-foreground">
                {currentData.title}
              </h2>
              <p className="text-sm leading-6 text-slate-600 [word-break:keep-all]">
                {currentData.body}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 푸터 — 스텝 전환과 무관하게 고정 */}
        <div className="flex flex-col items-center gap-5 px-6 pb-6 pt-4">
          {/* 스텝 인디케이터 */}
          <div className="flex gap-2">
            {ONBOARDING_DATA.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step ? 'w-6 bg-primary' : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>

          <Button
            type="button"
            onClick={handleNext}
            className={`h-14 w-full rounded-2xl text-lg font-semibold shadow-bl-sm transition-colors ${
              isLastStep
                ? 'bg-primary text-foreground hover:bg-primary/90'
                : 'bg-slate-200 text-foreground hover:bg-slate-300'
            }`}
          >
            {isLastStep ? '멋진 어른으로 출발하기 🚀' : '다음'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

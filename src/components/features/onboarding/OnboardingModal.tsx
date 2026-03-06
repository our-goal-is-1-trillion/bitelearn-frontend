import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ONBOARDING_DATA } from '@/constants/onboardingData';
import { X } from 'lucide-react';
type OnboardingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OnboardingModal({
  isOpen,
  onClose,
}: OnboardingModalProps) {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < ONBOARDING_DATA.length - 1) {
      setStep((p) => p + 1);
    } else {
      onClose();
    }
  };

  const currentData = ONBOARDING_DATA[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative flex h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl sm:h-[600px]"
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-slate-500 transition-colors hover:bg-black/10"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">건너뛰기</span>
        </button>
        <div className="relative flex-1 overflow-hidden bg-slate-50/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              {/* 이미지 영역 */}
              <div className="relative h-[50%] max-h-[280px] w-full bg-indigo-50/50">
                <img
                  src={currentData.image}
                  alt={`onboarding step ${step + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50/50 to-transparent" />
              </div>

              {/* 텍스트 영역 */}
              <div className="flex w-full flex-1 flex-col px-6 pb-4 pt-6 text-center">
                <h2 className="mb-3 text-xl font-bold leading-tight text-slate-900">
                  {currentData.title}
                </h2>
                <p className="text-[15px] leading-relaxed text-slate-600 [word-break:keep-all]">
                  {currentData.body}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* 푸터 영역 */}
        <div className="flex shrink-0 flex-col items-center gap-6 bg-white p-6 pt-2">
          <div className="flex gap-2">
            {ONBOARDING_DATA.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step ? 'w-6 bg-indigo-600' : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            className={`h-14 w-full rounded-2xl text-lg font-bold shadow-md transition-all duration-300 ${
              step === ONBOARDING_DATA.length - 1
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {step === ONBOARDING_DATA.length - 1
              ? '멋진 어른으로 출발하기 🚀'
              : '다음'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

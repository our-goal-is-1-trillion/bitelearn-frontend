import { motion } from 'framer-motion';

import type { VocabInfo } from '@/api/learning/learning.types';
import defaultVocabImage from '@/assets/learning/vocab_default.png';
import PreloadedImage from '@/components/common/PreloadedImage';
import { normalizeImageUrl } from '@/lib/image';

type VocabCardProps = {
  vocab: VocabInfo;
  isFlipped: boolean;
  onFlip: () => void;
};

export default function VocabCard({
  vocab,
  isFlipped,
  onFlip,
}: VocabCardProps) {
  const frontImageUrl = normalizeImageUrl(vocab.frontImageUrl) ?? undefined;
  const descriptionLines = vocab.backMain
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <motion.div
      className="preserve-3d relative h-full w-full cursor-pointer"
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onClick={onFlip}
    >
      {/* Front */}
      <div className="backface-hidden group absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-[24px] border-2 border-slate-100 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-slate-100">
          <PreloadedImage
            src={frontImageUrl}
            fallbackSrc={defaultVocabImage}
            alt={`${vocab.frontMain} 이미지`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            skeletonClassName="bg-slate-100"
          />
        </div>

        <div className="flex min-h-[190px] shrink-0 flex-col items-center justify-center gap-10 border-t border-slate-100 bg-white px-7 py-8 text-center">
          <h2 className="break-keep border-b-2 border-primary pb-1 text-3xl font-bold leading-10 text-foreground">
            {vocab.frontMain}
          </h2>
          {vocab.frontSub ? (
            <div className="w-full rounded-xl border border-slate-100 bg-slate-100 px-4 py-4">
              <span className="block break-keep text-sm font-medium leading-5 text-slate-600">
                {vocab.frontSub}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Back */}
      <div className="backface-hidden rotate-y-180 absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-[24px] border-2 border-slate-100 bg-slate-200 p-[2px] shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
        <div className="flex h-full flex-col rounded-[22px] bg-slate-200 px-6 pb-7 pt-8 text-foreground">
          <div className="hide-scrollbar flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto">
            <div className="flex w-full flex-col items-center gap-8">
              <h3 className="border-b-2 border-primary px-0.5 pb-0.5 text-center text-2xl font-semibold leading-9">
                {vocab.frontMain}
              </h3>

              {vocab.frontSub ? (
                <div className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-4">
                  <p className="break-keep text-center text-base font-medium leading-6 text-slate-400">
                    {vocab.frontSub}
                  </p>
                </div>
              ) : null}

              <div className="w-full space-y-2 text-center text-base leading-6 text-foreground">
                {descriptionLines.map((line) => (
                  <p key={line} className="break-keep">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

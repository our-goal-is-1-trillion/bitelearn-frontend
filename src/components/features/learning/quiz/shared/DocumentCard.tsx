import { useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type DocumentCardField = {
  label: string;
  value: string;
};

export type DocumentCardData = {
  header: string;
  subHeader: string;
  fields: DocumentCardField[];
};

type InteractiveProps = {
  mode: 'interactive';
  choiceMode: 'multiple' | 'ox' | 'document_select';
  selectedValue?: string;
  onSelectField?: (value: string) => void;
  isChecking?: boolean;
  correctIndex?: number;
};

type ResultProps = {
  mode: 'result';
  correctIndex?: number;
  selectedAnswerIndex?: number;
};

type DocumentCardProps = {
  data: DocumentCardData;
  typography?: 'sans' | 'serif';
} & (InteractiveProps | ResultProps);

export default function DocumentCard(props: DocumentCardProps) {
  const { data } = props;
  const valueRefs = useRef<Record<number, HTMLSpanElement | null>>({});
  const [isWrappedMap, setIsWrappedMap] = useState<Record<number, boolean>>({});

  const isInteractive = props.mode === 'interactive';
  const isSerif = props.typography === 'serif';
  const isResult = props.mode === 'result';
  const isDocumentSelect =
    props.mode === 'interactive' && props.choiceMode === 'document_select';
  const isChecking = isInteractive && props.isChecking === true;
  const selectedValue = isInteractive ? (props.selectedValue ?? '') : '';
  const correctIndex = props.correctIndex;
  const titleUsesSerif = isSerif || isResult;
  const fieldUsesSerif = isSerif && !isResult && !isDocumentSelect;

  useLayoutEffect(() => {
    const measure = () => {
      const next: Record<number, boolean> = {};
      Object.entries(valueRefs.current).forEach(([key, el]) => {
        if (!el) return;
        const style = window.getComputedStyle(el);
        const lineHeight = Number.parseFloat(style.lineHeight || '0');
        next[Number(key)] =
          lineHeight > 0 ? el.scrollHeight > lineHeight + 1 : false;
      });
      setIsWrappedMap(next);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [data, selectedValue, isChecking]);

  return (
    <div className="relative mx-auto w-full max-w-[340px] overflow-hidden bg-card p-5 shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]">
      {isInteractive && (
        <AnimatePresence>
          {isChecking && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-x-0 z-30 h-1 bg-slate-900/40 shadow-[0_0_15px_rgba(15,23,42,0.3)]"
                initial={{ top: '0%' }}
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Header */}
      <div className="mb-4 flex flex-col items-center gap-2 border-b border-slate-300 pb-4 text-center">
        <p
          className={`text-lg leading-6 text-foreground ${
            titleUsesSerif
              ? 'font-serif font-bold tracking-[0.18em]'
              : 'font-sans font-bold'
          }`}
        >
          {data.header}
        </p>
        <p
          className={`text-sm leading-4 text-slate-500 ${
            titleUsesSerif ? 'font-serif font-bold' : 'font-sans font-medium'
          }`}
        >
          {data.subHeader}
        </p>
      </div>

      {/* Fields */}
      <div className={`w-full ${isResult || isDocumentSelect ? 'space-y-3' : ''}`}>
        {data.fields.map((field, index) => {
          const isSelected = selectedValue === String(index);
          const isAnswer = index === correctIndex;
          const isEmptyField = field.value.trim() === '';
          const isSelectedWrong =
            props.mode === 'result' &&
            props.selectedAnswerIndex === index &&
            !isAnswer;
          const documentFieldBaseClass =
            'rounded-lg border-2 border-slate-100 bg-slate-100 px-3 py-3 text-foreground shadow-[0_1px_0_0_rgba(0,0,0,0.05)]';

          let fieldClass = 'w-full text-left transition-all duration-200 ';
          let showAnswerBadge = false;

          if (props.mode === 'interactive') {
            const { choiceMode } = props;
            if (choiceMode === 'document_select') {
              fieldClass += `${documentFieldBaseClass} `;
              if (isChecking) {
                if (isSelected) {
                  fieldClass += 'border-slate-400';
                }
              } else if (isSelected) {
                fieldClass += 'border-slate-400';
              }
            } else {
              fieldClass += 'border-b border-slate-100 px-0 py-3 text-foreground cursor-default';
            }
          } else {
            // result mode
            if (isAnswer) {
              fieldClass +=
                'rounded-lg border-2 border-green-200 bg-green-50 px-3 py-3 text-foreground shadow-[0_1px_0_0_rgba(0,0,0,0.05)]';
              showAnswerBadge = true;
            } else if (isSelectedWrong) {
              fieldClass +=
                'rounded-lg border-2 border-slate-200 bg-slate-200 px-3 py-3 text-foreground shadow-[0_1px_0_0_rgba(0,0,0,0.05)]';
            } else {
              fieldClass += `${documentFieldBaseClass} `;
            }
          }

          const handleClick =
            props.mode === 'interactive' &&
            props.choiceMode === 'document_select' &&
            !isChecking &&
            !isEmptyField
              ? () => props.onSelectField?.(String(index))
              : undefined;

          const isDisabled =
            props.mode !== 'interactive' ||
            isChecking ||
            props.choiceMode !== 'document_select' ||
            isEmptyField;

          return (
            <div key={`${field.label}-${index}`} className="relative">
              <button
                type="button"
                className={fieldClass}
                onClick={handleClick}
                disabled={isDisabled}
              >
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={
                      isWrappedMap[index]
                        ? 'flex flex-col items-start gap-1'
                        : 'flex items-start gap-3'
                    }
                  >
                    <span
                      className={`text-sm leading-5 text-slate-500 ${
                        fieldUsesSerif
                          ? 'font-serif font-bold'
                          : 'font-sans font-medium'
                      }`}
                    >
                      {field.label}
                    </span>
                    <span
                      ref={(el) => {
                        valueRefs.current[index] = el;
                      }}
                      className={`min-w-0 flex-1 basis-0 break-words text-sm leading-5 ${
                        fieldUsesSerif
                          ? 'font-serif font-bold'
                          : 'font-sans font-medium'
                      }`}
                    >
                      {isEmptyField ? '-' : field.value}
                    </span>
                  </div>

                  {showAnswerBadge && (
                    <span className="shrink-0 rounded-full bg-green-400 px-2.5 py-1.5 text-xs font-medium leading-4 text-foreground">
                      정답
                    </span>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-center text-xs leading-4 font-serif font-bold text-slate-400">
        본 문서는 학습용 가상 서류입니다.
        <br />
        개인정보는 포함되어 있지 않습니다.
      </p>
    </div>
  );
}

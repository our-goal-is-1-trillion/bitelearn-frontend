import type {
  DocumentElementInfo,
  QuizInfo,
} from '@/api/learning/learning.types';
import type { DocumentCardData } from './shared/DocumentCard';

function normalizeDocumentText(text: string) {
  return text.replace(/\s+/g, '').trim();
}

function normalizeDocumentKey(text: string) {
  return normalizeDocumentText(text).replace(/\([^)]*\)/g, '');
}

// [키-값] 형태의 옵션 텍스트를 파싱하는 함수
function parseDocumentOption(optionText: string) {
  const trimmedOption = optionText.trim();
  const match = trimmedOption.match(/^\[(.+?)\s*-\s*(.+?)\]$/);

  if (!match) {
    return null;
  }

  return {
    key: match[1].trim(),
    value: match[2].trim(),
    raw: trimmedOption,
  };
}

// 문서 요소의 키가 옵션 텍스트와 동일한지 비교하는 함수
function isSameDocumentKey(left: string, right: string) {
  const normalizedLeft = normalizeDocumentKey(left);
  const normalizedRight = normalizeDocumentKey(right);

  return (
    normalizedLeft === normalizedRight ||
    normalizedLeft.includes(normalizedRight) ||
    normalizedRight.includes(normalizedLeft)
  );
}

// 문서 요소의 값이 옵션 텍스트와 동일한지 비교하는 함수
function isSameDocumentValue(left: string, right: string) {
  const normalizedLeft = normalizeDocumentText(left);
  const normalizedRight = normalizeDocumentText(right);

  return (
    normalizedLeft === normalizedRight ||
    normalizedLeft.includes(normalizedRight) ||
    normalizedRight.includes(normalizedLeft)
  );
}

// 문서 요소를 [키-값] 형태의 답변으로 변환하는 함수
function buildDocumentPairAnswer(documentElement?: DocumentElementInfo) {
  const documentKey = documentElement?.key?.trim();
  const documentValue = documentElement?.value?.trim();

  if (!documentKey || !documentValue) {
    return '';
  }

  return `[${documentKey} - ${documentValue}]`;
}

// 옵션 목록에서 문서 요소와 일치하는 옵션을 찾는 함수
function findMatchingDocumentOption(
  options: string[],
  documentElement: DocumentElementInfo
) {
  return options.find((option) => {
    const parsedOption = parseDocumentOption(option);

    if (parsedOption) {
      return (
        isSameDocumentKey(documentElement.key, parsedOption.key) &&
        isSameDocumentValue(documentElement.value, parsedOption.value)
      );
    }

    return (
      isSameDocumentKey(documentElement.key, option) ||
      isSameDocumentValue(documentElement.value, option)
    );
  });
}

// 문서 요소 목록에서 답변 텍스트와 일치하는 요소의 인덱스를 찾는 함수
export function findDocumentFieldIndexByAnswerText(
  documentElements: DocumentElementInfo[],
  answerText: string
) {
  const trimmedAnswerText = answerText.trim();

  if (!trimmedAnswerText) {
    return -1;
  }

  const parsedAnswer = parseDocumentOption(trimmedAnswerText);

  return documentElements.findIndex((element) => {
    if (parsedAnswer) {
      return (
        isSameDocumentKey(element.key, parsedAnswer.key) &&
        isSameDocumentValue(element.value, parsedAnswer.value)
      );
    }

    return (
      isSameDocumentKey(element.key, trimmedAnswerText) ||
      isSameDocumentValue(element.value, trimmedAnswerText)
    );
  });
}

// DOC_CLICK 퀴즈의 제출 답안을 결정하는 함수
export function resolveDocumentSubmitAnswer(
  quiz: Pick<QuizInfo, 'specificData'>,
  selectedAnswerIndex: number
) {
  const options = quiz.specificData?.options ?? [];
  const documentElement =
    quiz.specificData?.documentElements?.[selectedAnswerIndex];

  if (!documentElement) {
    return options[selectedAnswerIndex]?.trim() ?? '';
  }

  const matchedOptionAnswer = findMatchingDocumentOption(
    options,
    documentElement
  )?.trim();

  if (matchedOptionAnswer) {
    return matchedOptionAnswer;
  }

  return buildDocumentPairAnswer(documentElement);
}

export function toDocumentCardData(quiz: QuizInfo): DocumentCardData | null {
  const documentElements = quiz.specificData?.documentElements;
  const documentTitle = quiz.specificData?.documentTitle;
  const documentSubtitle = quiz.specificData?.documentSubtitle;

  if (!documentElements?.length) {
    return null;
  }

  return {
    header: documentTitle ?? '문서',
    subHeader: documentSubtitle ?? '',
    fields: documentElements.map((item: DocumentElementInfo) => ({
      label: item.key,
      value: item.value,
    })),
  };
}

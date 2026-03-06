import { useParams, useNavigate } from 'react-router-dom';
import WordLearning from './WordLearning';
import { CHOICE_QUESTION_SETS_BY_ID } from '@/mock/choiceQuestion';

export default function WordLearningRoute() {
  const { setId } = useParams();
  const navigate = useNavigate();

  // URL param으로 들어온 setId로 학습 세트 찾기
  const wordSet = setId
    ? CHOICE_QUESTION_SETS_BY_ID[
        setId as keyof typeof CHOICE_QUESTION_SETS_BY_ID
      ]
    : undefined;

  // 잘못된 setId일 경우
  if (!wordSet) {
    return (
      <main className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-sm font-medium text-slate-600">
            존재하지 않는 학습 세트입니다.
          </p>

          <button
            className="mt-4 text-sm font-semibold text-primary underline underline-offset-4"
            onClick={() => navigate(-1)}
          >
            이전 화면으로 돌아가기
          </button>
        </div>
      </main>
    );
  }

  return <WordLearning wordSet={wordSet} onBack={() => navigate(-1)} />;
}

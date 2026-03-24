import { useNavigate, useParams } from 'react-router-dom';

import Header from '@/components/common/Header';
import IncorrectNoteQuizViewer from '@/components/features/note/IncorrectNoteQuizViewer';
import { useIncorrectNoteDetailQuery } from '@/api/notes/notes.query';
import NotFoundPage from '@/pages/NotFoundPage';

export default function IncorrectNoteDetailPage() {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const parsedNoteId = Number(noteId);
  const isInvalidNoteId = Number.isNaN(parsedNoteId);
  const detailQuery = useIncorrectNoteDetailQuery(parsedNoteId);

  if (isInvalidNoteId) {
    return <NotFoundPage />;
  }

  if (detailQuery.isPending) {
    return (
      <main className="flex h-full min-h-0 items-center justify-center bg-white text-foreground">
        <p className="text-sm text-slate-400">오답노트를 불러오는 중이에요.</p>
      </main>
    );
  }

  if (detailQuery.isError || !detailQuery.data) {
    return (
      <main className="flex h-full min-h-0 items-center justify-center bg-white text-foreground">
        <p className="text-sm text-slate-400">
          오답노트 상세 정보를 불러오지 못했어요.
        </p>
      </main>
    );
  }

  const { quiz, explanation, correctAnswer, userAnswer } = detailQuery.data;

  return (
    <main className="flex h-full min-h-0 flex-col bg-white text-foreground">
      <Header
        title="오답노트"
        showCloseButton
        onCloseClick={() => navigate(-1)}
      />

      <IncorrectNoteQuizViewer
        quiz={quiz}
        userAnswer={userAnswer}
        correctAnswer={correctAnswer}
        explanation={explanation}
        onClose={() => navigate(-1)}
      />
    </main>
  );
}

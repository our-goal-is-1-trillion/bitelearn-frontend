import type { RefCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import type { Category } from '@/api/learning/learning.types';
import type { Note } from '@/api/notes/notes.types';

import IncorrectCard from '@/components/features/note/IncorrectCard';

type NoteCategory = {
  category: Category;
  categoryName: string;
};

type IncorrectNoteListProps = {
  categories: NoteCategory[];
  notes: Note[];
  isLoading?: boolean;
  isLoadingMore?: boolean;
  hasNext?: boolean;
  sentinelRef?: RefCallback<HTMLDivElement>;
};

export default function IncorrectNoteList({
  categories,
  notes,
  isLoading = false,
  isLoadingMore = false,
  hasNext = false,
  sentinelRef,
}: IncorrectNoteListProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="border-slate-100 py-20 text-center">
        <p className="text-sm font-bold text-slate-400">
          오답노트를 불러오는 중이에요
        </p>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="border-slate-100 py-20 text-center">
        <CheckCircle2 size={32} className="mx-auto mb-4 text-slate-200" />
        <p className="text-sm font-bold text-slate-400">
          아직 오답이 없어요
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pt-6">
      {notes.map((note) => (
        <IncorrectCard
          key={note.noteId}
          categoryName={
            categories.find((category) => category.category === note.category)
              ?.categoryName || '미분류'
          }
          createdAt={note.createdAt}
          chapterId={note.chapterId}
          topic={note.topic}
          questionTitle={note.questionTitle}
          onSelect={() => navigate(`/notes/incorrect/${note.noteId}`)}
        />
      ))}

      <div className="pt-2 text-center">
        {isLoadingMore && (
          <p className="text-xs font-bold text-slate-300">
            오답노트를 더 불러오는 중이에요
          </p>
        )}

        {!hasNext && notes.length > 0 && (
          <p className="text-sm font-medium text-slate-300">
            오답노트를 모두 확인했어요
          </p>
        )}

        {hasNext && <div ref={sentinelRef} className="h-4 w-full" />}
      </div>
    </div>
  );
}

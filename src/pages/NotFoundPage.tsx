import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-dvh flex-1 items-center justify-center bg-white px-5 text-foreground">
      <div className="flex w-full max-w-screen-sm flex-col items-center text-center">
        <p className="text-sm font-semibold text-slate-400">404</p>
        <h1 className="mt-2 text-xl font-semibold">페이지를 찾을 수 없어요</h1>
        <p className="mt-2 text-sm text-slate-500">
          요청한 경로가 올바른지 확인해 주세요.
        </p>

        <Button
          variant="outline"
          className="mt-6 h-11 rounded-xl border-slate-200 px-5 text-sm font-medium text-slate-700"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="size-4" />
          이전으로 돌아가기
        </Button>
      </div>
    </main>
  );
}

export default NotFoundPage;

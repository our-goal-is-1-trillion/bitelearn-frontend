import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-slate-900">404</h1>
      <h2 className="mb-2 text-2xl font-semibold text-slate-800">페이지를 찾을 수 없습니다</h2>
      <p className="mb-8 text-slate-500">
        요청하신 페이지가 사라졌거나 잘못된 경로입니다.
      </p>
      <Button onClick={() => navigate("/")} size="lg">
        홈으로 돌아가기
      </Button>
    </div>
  );
}

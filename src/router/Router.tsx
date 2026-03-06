import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import HomeLogined from '@/pages/HomeLogined';
import OnboardingPage from '@/pages/OnboardingPage';
import DashboardChapterPage from '@/pages/DashboardChapter';
import ChoiceQuizPage from '@/pages/ChoiceQuizPage';
import OxQuestion from '@/pages/OxQuestion';
import Result from '@/pages/Result';
import IA from '@/pages/IA';
import type { IAPath } from '@/pages/IA';
import ConversationQuestion from '@/components/features/conversationQuestion/ConversationQuestion';

function ConversationQuizPage() {
  const navigate = useNavigate()
  return (
    <ConversationQuestion
      onComplete={(total, correct) =>
        navigate('/quiz/result', { state: { total, correct, timeSpent: 125 } })
      }
    />
  )
}

function ResultPageWrapper() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as { total: number; correct: number; timeSpent?: number } | null
  
  return <Result resultData={state} onFinish={() => navigate('/ia')} />
}

function IAPage() {
  const navigate = useNavigate()

  const handleNavigate = (page: IAPath) => {
    const routeMap: Partial<Record<IAPath, string>> = {
      home: '/home',
      login: '/login',
      dashBoard: '/home',
      choiceQuestion: '/quiz/choice',
      oxQuestion: '/quiz/ox',
      conversationQuestion: '/quiz/conversation',
      result: '/resultPerfect',
    }

    const next = routeMap[page]
    if (!next) return
    navigate(next)
  }

  return <IA onNavigate={handleNavigate} />
}

function HomePage() {
  const navigate = useNavigate()

  return (
    <Home
      onMoveToChapter={() => navigate('/chapter')}
      onMoveToLogin={() => navigate('/login')}
    />
  )
}

/** IA 홈으로 돌아가는 전역 플로팅 버튼. / 또는 /ia 경로에서는 숨김 */
function IAHomeButton() {
  const navigate = useNavigate()
  const location = useLocation()

  const isIAPage = location.pathname === '/' || location.pathname === '/ia'
  if (isIAPage) return null

  return (
    <button
      onClick={() => navigate('/ia')}
      className="fixed left-4 top-4 z-50 rounded-lg border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-slate-50"
    >
      🗺️ IA 홈으로
    </button>
  )
}

export default function Router() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <IAHomeButton />
      <Routes>
        <Route path="/" element={<IAPage />} />
        <Route path="/ia" element={<IAPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home-logined" element={<HomeLogined />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chapter" element={<DashboardChapterPage />} />
        <Route path="/quiz/choice" element={<ChoiceQuizPage />} />
        <Route path="/quiz/ox" element={<OxQuestion />} />
        <Route path="/quiz/conversation" element={<ConversationQuizPage />} />
        <Route path="/quiz/result" element={<ResultPageWrapper />} />
        {/* IA에서 테스트용으로 접근하기 위한 결과 화면 라우트 */}
        <Route path="/resultPerfect" element={<Result resultData={null} variant="perfect" onFinish={() => window.location.href = '/ia'} />} />
        <Route path="/resultClose" element={<Result resultData={null} variant="close" onFinish={() => window.location.href = '/ia'} />} />
        <Route path="/resultFail" element={<Result resultData={null} variant="fail" onFinish={() => window.location.href = '/ia'} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

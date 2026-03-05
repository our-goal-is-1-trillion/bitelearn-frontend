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
        <Route path="/" element={<IA />} />
        <Route path="/ia" element={<IA />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home-logined" element={<HomeLogined />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chapter" element={<DashboardChapterPage />} />
        <Route path="/quiz/choice" element={<ChoiceQuizPage />} />
        <Route path="/quiz/ox" element={<OxQuestion />} />
        <Route path="/quiz/conversation" element={<ConversationQuizPage />} />
        <Route path="/quiz/result" element={<Result />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

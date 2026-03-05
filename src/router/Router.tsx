import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import HomeLogined from '@/pages/HomeLogined';
import DashboardChapterPage from '@/pages/DashboardChapter';
import ChoiceQuestion from '@/pages/ChoiceQuestion';
import Result from '@/pages/Result';

export default function Router() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home-logined" element={<HomeLogined />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chapter" element={<DashboardChapterPage />} />
        <Route path="/quiz/choice" element={<ChoiceQuestion />} />
        <Route path="/quiz/result" element={<Result />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import RootLayout from '@/layouts/RootLayout';
import AppLayout from '@/layouts/AppLayout';
import AuthLayout from '@/layouts/AuthLayout';

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import WordLearningRoute from '@/pages/wordLearning/WordLearningRoute';

export default function Router() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/learning/word/:setId" element={<WordLearningRoute />} />

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

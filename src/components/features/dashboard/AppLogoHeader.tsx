import { useLocation } from 'react-router-dom';

import logo from '@/assets/brand/logo.svg';
import { cn } from '@/lib/utils';

export default function AppLogoHeader() {
  const location = useLocation();
  const isNotesPage = location.pathname === '/notes';

  return (
    <header
      className={cn(
        'fixed left-1/2 top-0 z-40 flex h-[60px] w-full max-w-screen-sm -translate-x-1/2 items-center pl-5',
        isNotesPage
          ? 'bg-white'
          : 'bg-[rgba(255,255,255,0.80)] backdrop-blur-[6px] supports-[backdrop-filter]:bg-[rgba(255,255,255,0.80)]'
      )}
    >
      <img src={logo} alt="bitelearn" className="h-6 w-[111px]" />
    </header>
  );
}

import { useLocation } from 'react-router-dom';

import logo from '@/assets/brand/logo.svg';
import { cn } from '@/lib/utils';

export default function AppLogoHeader() {
  const location = useLocation();
  const isNotesPage = location.pathname === '/notes';

  return (
    <header
      className={cn(
        'fixed left-1/2 top-0 z-40 flex h-[60px] w-full max-w-app -translate-x-1/2 items-center pl-5',
        isNotesPage ? 'bg-white' : 'bg-white/80 backdrop-blur-[6px]'
      )}
    >
      <img src={logo} alt="bitelearn" className="h-6 w-[111px]" />
    </header>
  );
}

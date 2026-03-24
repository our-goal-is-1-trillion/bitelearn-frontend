import { NavLink, useLocation } from 'react-router-dom';
import { BOTTOM_NAV_TABS } from '@/constants/bottomNavTabs';

export default function BottomNav() {
  const location = useLocation();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center">
      <div
        className="relative w-full max-w-screen-sm"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="absolute inset-x-0 bottom-0">
          <nav
            aria-label="하단 탭 바"
            className="pointer-events-auto rounded-t-[20px] bg-white px-7 pb-6 pt-2.5 shadow-bl-popover"
          >
            <ul className="flex items-center justify-between">
              {BOTTOM_NAV_TABS.map((tab) => {
                const isActive =
                  tab.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(tab.path);

                return (
                  <li key={tab.path} className="flex justify-center">
                    <NavLink
                      to={tab.path}
                      className="flex w-11 flex-col items-center justify-center gap-0.5"
                    >
                      <img
                        src={isActive ? tab.activeIconSrc : tab.iconSrc}
                        alt={tab.label}
                        aria-hidden="true"
                        className="h-7 w-7 object-contain"
                      />
                      <span
                        className={`text-xs leading-4 tracking-normal ${
                          isActive
                            ? 'font-bold text-neutral-700'
                            : 'font-normal text-slate-600'
                        }`}
                      >
                        {tab.label}
                      </span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

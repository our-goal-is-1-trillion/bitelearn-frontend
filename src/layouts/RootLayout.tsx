import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="min-h-dvh bg-neutral-100">
      <div className="mx-auto flex min-h-dvh w-full max-w-app flex-col bg-white">
        <Outlet />
      </div>
    </div>
  );
}

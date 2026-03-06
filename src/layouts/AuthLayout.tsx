import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-dvh px-6 py-10">
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <Outlet />
      </div>
    </div>
  );
}

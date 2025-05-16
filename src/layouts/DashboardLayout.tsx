import { Outlet } from 'react-router-dom';

import { Sidebar } from '@/features/dashboard/Sidebar';

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 mt-[80px] p-2">
        <Outlet />
      </main>
    </div>
  );
};

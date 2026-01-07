import { Outlet } from 'react-router-dom';

import { Sidebar } from '@/features/dashboard/Sidebar';

export const DashboardLayout = () => {
  return (
    <div className="flex ">
      <Sidebar />

      <main className="flex-1 mt-[80px]">
        <Outlet />
      </main>
    </div>
  );
};

import { Outlet } from 'react-router';
import { AdminNavbar } from './AdminNavbar';
import { AdminSidebar } from './AdminSidebar';

export function AdminLayoutShell() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] text-[#2B2B2B]">
      <div className="lg:flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 min-w-0">
          <AdminNavbar />
          <main className="p-6 lg:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

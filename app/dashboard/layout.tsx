import type { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#020617]">
      <Sidebar />
      <main className="ml-[240px] w-full p-6 space-y-6">
        {children}
      </main>
    </div>
  );
}

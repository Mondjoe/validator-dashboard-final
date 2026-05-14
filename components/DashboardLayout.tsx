/*
 * DESIGN: Cyberpunk Noir Layout
 * - Fixed sidebar + scrollable main content
 * - Subtle scanline overlay on background
 * - Blockchain network background image
 */

import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#050810] relative overflow-hidden">
      {/* Background network image */}
      <div
        className="fixed inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663659348131/4KZdagUrFWEHG44B5BfNHN/blockchain-bg-BZRHmhNLjq2RqSLuEU5qvH.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px)',
        }}
      />
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content area */}
      <div
        className={cn(
          'relative z-10 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]',
          'ml-[240px]' // Will adjust based on sidebar state via CSS
        )}
        style={{ minHeight: '100vh' }}
      >
        {/* Top bar */}
        <TopBar title={title} subtitle={subtitle} />
        
        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

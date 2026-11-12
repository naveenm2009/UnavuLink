import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();

  // Determine if current route is a dashboard route requiring the sidebar
  const isDashboardRoute =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/donor') ||
    location.pathname.startsWith('/acceptor') ||
    location.pathname.startsWith('/ngo') ||
    location.pathname.startsWith('/volunteer') ||
    (location.pathname.startsWith('/community') && !location.pathname.includes('/map'));

  return (
    <div className="min-h-screen flex flex-col bg-warmCream">
      <Navbar />

      <div className="flex-1 flex">
        {isDashboardRoute && <Sidebar />}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

'use client';

import Link from 'next/link';
import React from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar({ className }: { className?: string }) {
  const { user } = useAuth();
  return (
    <aside className={className}>
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-purple-600 tracking-tight">Printflow</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-2">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/5 dark:bg-white/10 text-sm font-medium transition-colors hover:bg-black/10 dark:hover:bg-white/20">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          Master Calendar
        </Link>
        <Link href="/kanban" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-black/60 dark:text-white/60 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path></svg>
          Production Kanban
        </Link>
        <Link href="/quotes" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-black/60 dark:text-white/60 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Quotes & Invoices
        </Link>
        <Link href="/customers" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-black/60 dark:text-white/60 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          Customers
        </Link>

        <div className="my-8 hidden border-t border-black/5 dark:border-white/5 mx-4 md:block"></div>

        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-black/60 dark:text-white/60 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          Shop Settings
        </Link>
        <Link href="/pricing" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-black/60 dark:text-white/60 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Pricing Engine
        </Link>
      </nav>

      <div className="p-4 mt-auto">
        <div className="p-4 rounded-3xl glass-panel bg-gradient-to-br from-white/90 to-white/40 dark:from-white/10 dark:to-transparent border border-white/40 dark:border-white/10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/20 rounded-full blur-xl -mr-8 -mt-8"></div>
          <p className="text-xs font-semibold text-black/80 dark:text-white/80 mb-1 relative z-10">Embedded App</p>
          <p className="text-[10px] text-black/50 dark:text-white/50 mb-3 leading-relaxed relative z-10">Empower customers with a DTF Gangsheet Builder on your site.</p>
          <div className="flex flex-col gap-2 relative z-10">
            <button className="w-full py-2 px-3 text-xs font-semibold rounded-xl text-white bg-black/90 dark:bg-white/20 hover:bg-black transition-all backdrop-blur-md shadow-md active:scale-95">Configure Widget</button>
            {user?.uid && (
              <Link
                href={`/gangsheet/${user.uid}`}
                target="_blank"
                className="w-full py-2 px-3 text-xs font-semibold rounded-xl text-black bg-white dark:text-white dark:bg-black/40 border border-black/10 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-black/60 transition-all text-center backdrop-blur-md shadow-sm active:scale-95"
              >
                Preview Builder
              </Link>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

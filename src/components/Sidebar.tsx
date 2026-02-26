import Link from 'next/link';
import React from 'react';

export default function Sidebar({ className }: { className?: string }) {
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
        <Link href="/overview" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-black/60 dark:text-white/60 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          Dashboard Overview
        </Link>
        <Link href="/customers" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-black/60 dark:text-white/60 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          Customers
        </Link>
        <Link href="/kanban" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-black/60 dark:text-white/60 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path></svg>
          Production Kanban
        </Link>
        <Link href="/artwork" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-black/60 dark:text-white/60 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          Artwork Approvals
        </Link>
        <Link href="/quotes" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-black/60 dark:text-white/60 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Quotes & Invoices
        </Link>
      </nav>

      <div className="p-4 mt-auto">
        <div className="p-4 rounded-3xl glass-panel bg-gradient-to-br from-white/90 to-white/40 dark:from-white/10 dark:to-transparent border border-white/40 dark:border-white/10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/20 rounded-full blur-xl -mr-8 -mt-8"></div>
          <p className="text-xs font-semibold text-black/80 dark:text-white/80 mb-1 relative z-10">Embedded App</p>
          <p className="text-[10px] text-black/50 dark:text-white/50 mb-3 leading-relaxed relative z-10">Empower customers with a DTF Gangsheet Builder on your site.</p>
          <button className="w-full py-2 px-3 text-xs font-semibold rounded-xl text-white bg-black/90 dark:bg-white/20 hover:bg-black transition-all backdrop-blur-md shadow-md active:scale-95 relative z-10">Configure Widget</button>
        </div>
      </div>
    </aside>
  );
}

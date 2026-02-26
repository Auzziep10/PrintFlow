export default function QuotesPage() {
    return (
        <div className="p-8 md:p-10 h-full max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-black/90 dark:text-white/90">Quotes & Invoices</h1>
                    <p className="text-sm font-medium text-black/50 dark:text-white/50 mt-1.5">Create, send, and manage your billing.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group hidden sm:block">
                        <input type="text" placeholder="Search invoices..." className="pl-11 pr-4 py-2.5 rounded-2xl text-sm bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full md:w-64 transition-all group-hover:bg-black/10 dark:group-hover:bg-white-[0.15] backdrop-blur-md font-medium" />
                        <svg className="w-4 h-4 absolute left-4 top-3 text-black/40 dark:text-white/40 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        Create Quote
                    </button>
                </div>
            </header>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {[
                    { label: 'Drafts', val: '5', color: 'text-black/80 dark:text-white/80' },
                    { label: 'Awaiting Payment', val: '$4,250', color: 'text-orange-500' },
                    { label: 'Collected (30d)', val: '$18,400', color: 'text-[var(--status-quote)]' },
                ].map((metric) => (
                    <div key={metric.label} className="glass-panel rounded-[2rem] p-6 transition-all duration-300 cursor-default">
                        <h3 className="text-xs font-semibold text-black/50 dark:text-white/50 mb-2 uppercase tracking-wide">{metric.label}</h3>
                        <p className={`text-3xl font-bold tracking-tight ${metric.color} drop-shadow-sm`}>{metric.val}</p>
                    </div>
                ))}
            </div>

            <div className="glass-panel rounded-[2.5rem] p-8 min-h-[400px] flex items-center justify-center flex-col text-center">
                <div className="w-16 h-16 bg-black/5 dark:bg-white/10 rounded-full flex items-center justify-center mb-4 text-black/40 dark:text-white/40">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <h3 className="text-lg font-semibold text-black/80 dark:text-white/80 mb-1">No quotes found</h3>
                <p className="text-sm text-black/50 dark:text-white/50 max-w-sm mb-6">Create your first quote to send to a customer. Approved quotes automatically convert to production orders.</p>
                <button className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors">Learn about the Pricing Engine &rarr;</button>
            </div>
        </div>
    );
}

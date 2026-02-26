export default function CustomersPage() {
    return (
        <div className="p-8 md:p-10 h-full max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-black/90 dark:text-white/90">Customers</h1>
                    <p className="text-sm font-medium text-black/50 dark:text-white/50 mt-1.5">Manage your client list and details.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        Add Customer
                    </button>
                </div>
            </header>

            <div className="glass-panel rounded-[2.5rem] p-8 min-h-[500px] flex items-center justify-center flex-col text-center">
                <div className="w-16 h-16 bg-black/5 dark:bg-white/10 rounded-full flex items-center justify-center mb-4 text-black/40 dark:text-white/40">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <h3 className="text-lg font-semibold text-black/80 dark:text-white/80 mb-1">No customers yet</h3>
                <p className="text-sm text-black/50 dark:text-white/50 max-w-sm mb-6">You haven't added any customers. Start building your client base to track orders, quotes, and files.</p>
                <button className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors">Import from CSV</button>
            </div>
        </div>
    );
}

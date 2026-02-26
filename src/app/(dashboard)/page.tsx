export default function Home() {
  return (
    <div className="p-8 md:p-10 h-full max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black/90 dark:text-white/90">Overview</h1>
          <p className="text-sm font-medium text-black/50 dark:text-white/50 mt-1.5">Good morning, here is today's production summary.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <input type="text" placeholder="Search orders, clients..." className="pl-11 pr-4 py-2.5 rounded-2xl text-sm bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full md:w-72 transition-all group-hover:bg-black/10 dark:group-hover:bg-white-[0.15] backdrop-blur-md font-medium" />
            <svg className="w-4 h-4 absolute left-4 top-3 text-black/40 dark:text-white/40 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <button className="p-2.5 rounded-2xl glass-panel hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-0.5 shadow-sm active:scale-95 transition-transform cursor-pointer">
            <div className="w-full h-full bg-white dark:bg-black rounded-full border-2 border-transparent flex items-center justify-center overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'New Quotes', val: '12', color: 'text-[var(--status-quote)]', trend: '+2 today' },
          { label: 'Pending Art', val: '8', color: 'text-[var(--status-art)]', trend: '3 need review' },
          { label: 'In Production', val: '24', color: 'text-[var(--status-prod)]', trend: 'On schedule' },
          { label: 'Shipped (7d)', val: '142', color: 'text-[var(--status-shipped)]', trend: '+15% vs last wk' },
        ].map((metric) => (
          <div key={metric.label} className="glass-panel rounded-[2rem] p-7 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/5 cursor-default relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-current opacity-5 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity group-hover:opacity-10" style={{ color: `var(--status-${metric.label.toLowerCase().split(' ')[0]})` }}></div>
            <h3 className="text-sm font-semibold text-black/50 dark:text-white/50 mb-3">{metric.label}</h3>
            <p className={`text-5xl font-bold tracking-tighter ${metric.color} mb-2 drop-shadow-sm`}>{metric.val}</p>
            <p className="text-xs font-medium text-black/40 dark:text-white/40">{metric.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Orders List */}
        <div className="xl:col-span-2 glass-panel rounded-[2.5rem] p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold tracking-tight">Recent Orders</h2>
            <button className="text-sm font-semibold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">View All &rarr;</button>
          </div>
          <div className="space-y-3 flex-1">
            {[
              { id: 'ORD-001', client: 'Acme Corp', items: '500x Tees', status: 'In Production', statusClass: 'bg-[var(--status-prod)]/10 text-[var(--status-prod)] ring-1 ring-[var(--status-prod)]/20 shadow-[0_0_12px_rgba(0,122,255,0.1)]', date: 'Oct 24' },
              { id: 'ORD-002', client: 'Local High School', items: '120x Hoodies', status: 'Pending Art', statusClass: 'bg-[var(--status-art)]/10 text-[var(--status-art)] ring-1 ring-[var(--status-art)]/20 shadow-[0_0_12px_rgba(255,149,0,0.1)]', date: 'Oct 23' },
              { id: 'ORD-003', client: 'Stark Industries', items: '50x Polos', status: 'New Quote', statusClass: 'bg-[var(--status-quote)]/10 text-[var(--status-quote)] ring-1 ring-[var(--status-quote)]/20 shadow-[0_0_12px_rgba(52,199,89,0.1)]', date: 'Oct 23' },
              { id: 'ORD-004', client: 'Wayne Enterprises', items: '1000x Posters', status: 'Shipped', statusClass: 'bg-[var(--status-shipped)]/10 text-[var(--status-shipped)] ring-1 ring-[var(--status-shipped)]/20', date: 'Oct 21' },
            ].map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 px-5 rounded-2xl hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-all cursor-pointer group border border-transparent hover:border-black/5 dark:hover:border-white/5">
                <div className="flex items-center gap-5">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10 font-bold text-sm text-black/60 dark:text-white/60 group-hover:bg-white dark:group-hover:bg-black group-hover:text-black dark:group-hover:text-white transition-all shadow-sm ring-1 ring-black/5 dark:ring-white/5">
                    {order.client.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-black/90 dark:text-white/90">{order.client}</h4>
                    <p className="text-[13px] font-medium text-black/50 dark:text-white/50 mt-0.5">{order.id} <span className="mx-1.5 opacity-40">&bull;</span> {order.items}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <span className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase ${order.statusClass}`}>
                    {order.status}
                  </span>
                  <span className="text-[13px] text-black/40 dark:text-white/40 font-medium w-12 text-right">{order.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        <div className="glass-panel rounded-[2.5rem] p-8 flex flex-col">
          <h2 className="text-xl font-bold tracking-tight mb-8">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex flex-col items-center justify-center p-6 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 transition-all active:scale-95 group shadow-sm">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform group-hover:bg-blue-500 group-hover:text-white shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              </div>
              <span className="text-sm font-semibold text-black/80 dark:text-white/80">New Quote</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 transition-all active:scale-95 group shadow-sm">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform group-hover:bg-purple-500 group-hover:text-white shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              </div>
              <span className="text-sm font-semibold text-black/80 dark:text-white/80">Upload Art</span>
            </button>
          </div>

          <div className="mt-auto p-6 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden shadow-xl shadow-blue-500/20 group cursor-pointer transition-transform hover:scale-[1.02]">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 ease-out">
              <svg className="w-32 h-32 transform translate-x-8 -translate-y-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
              <h3 className="font-bold text-sm uppercase tracking-wider text-white/90">Production Alert</h3>
            </div>
            <p className="text-[13px] font-medium text-white/80 leading-relaxed mb-5 relative z-10 pr-6">3 jobs are waiting for manual artwork approval before they can hit the press.</p>
            <button className="px-5 py-2.5 bg-white/20 hover:bg-white text-white hover:text-blue-700 backdrop-blur-md rounded-xl text-xs font-bold transition-all relative z-10 shadow-sm">Review Artworks</button>
          </div>
        </div>
      </div>
    </div>
  );
}

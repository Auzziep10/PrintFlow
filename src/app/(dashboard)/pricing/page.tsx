'use client';

import React, { useState } from 'react';

// Pricing Engine Mock Data
const MOCK_GARMENT_MATRIX = [
    { id: 1, min: 1, max: 11, markup: 2.0 },
    { id: 2, min: 12, max: 23, markup: 1.8 },
    { id: 3, min: 24, max: 49, markup: 1.6 },
    { id: 4, min: 50, max: 99, markup: 1.5 },
    { id: 5, min: 100, max: 249, markup: 1.4 },
];

const MOCK_PRINT_MATRIX = [
    { id: 1, colors: 1, '1-11': 4.5, '12-23': 3.5, '24-49': 2.5, '50-99': 2.0 },
    { id: 2, colors: 2, '1-11': 5.5, '12-23': 4.5, '24-49': 3.25, '50-99': 2.5 },
    { id: 3, colors: 3, '1-11': 6.5, '12-23': 5.5, '24-49': 4.0, '50-99': 3.0 },
    { id: 4, colors: 4, '1-11': 8.0, '12-23': 6.5, '24-49': 5.0, '50-99': 3.5 },
];

const MOCK_FEES = [
    { id: 1, name: 'Screen Setup (per color)', amount: 25.00, type: 'flat' },
    { id: 2, name: 'Flash Charge (dark garments)', amount: 0.50, type: 'per_item' },
    { id: 3, name: 'Color Change', amount: 15.00, type: 'flat' },
    { id: 4, name: 'Rush Fee (3-Day)', amount: 25, type: 'percentage' },
];

export default function PricingEnginePage() {
    const [activeTab, setActiveTab] = useState<'garment' | 'print' | 'fees'>('garment');

    return (
        <div className="p-8 md:p-10 h-full max-w-7xl mx-auto flex flex-col">
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-black/90 dark:text-white/90">Pricing Engine</h1>
                    <p className="text-sm font-medium text-black/50 dark:text-white/50 mt-1.5">Configure your automated shop math.</p>
                </div>
                <div className="flex bg-black/5 dark:bg-white/10 p-1 rounded-2xl">
                    <button
                        onClick={() => setActiveTab('garment')}
                        className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === 'garment' ? 'bg-white dark:bg-black shadow-sm text-blue-600 dark:text-blue-400' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
                    >
                        Garment Markups
                    </button>
                    <button
                        onClick={() => setActiveTab('print')}
                        className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === 'print' ? 'bg-white dark:bg-black shadow-sm text-blue-600 dark:text-blue-400' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
                    >
                        Print Matrix
                    </button>
                    <button
                        onClick={() => setActiveTab('fees')}
                        className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === 'fees' ? 'bg-white dark:bg-black shadow-sm text-blue-600 dark:text-blue-400' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
                    >
                        Service Fees
                    </button>
                </div>
            </header>

            {/* Dynamic Content Area */}
            <div className="flex-1 glass-panel rounded-[2.5rem] p-8 overflow-y-auto">

                {/* Garment Matrix Tab */}
                {activeTab === 'garment' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold tracking-tight">Garment Markup Matrix</h2>
                            <button className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors">+ Add Tier</button>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-4 px-6 text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40">
                            <div>Min. Quantity</div>
                            <div>Max. Quantity</div>
                            <div>Markup Multiplier</div>
                            <div className="text-right">Actions</div>
                        </div>

                        <div className="space-y-3">
                            {MOCK_GARMENT_MATRIX.map((tier) => (
                                <div key={tier.id} className="grid grid-cols-4 gap-4 items-center bg-black/[0.03] dark:bg-white/[0.03] p-4 px-6 rounded-2xl border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors group">
                                    <div>
                                        <input type="number" defaultValue={tier.min} className="w-20 bg-transparent font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg px-2 py-1 -ml-2" />
                                    </div>
                                    <div>
                                        <input type="number" defaultValue={tier.max} className="w-20 bg-transparent font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg px-2 py-1 -ml-2" />
                                    </div>
                                    <div className="font-bold text-lg text-blue-600 dark:text-blue-400">
                                        {tier.markup}x
                                    </div>
                                    <div className="text-right">
                                        <button className="p-2 rounded-xl hover:bg-red-500/10 text-black/20 dark:text-white/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 rounded-3xl bg-blue-500/5 border border-blue-500/20 text-sm font-medium text-black/60 dark:text-white/60">
                            <span className="font-bold text-blue-600 dark:text-blue-400">How it works:</span> If a blank t-shirt costs $5.00 from S&S Activewear and the customer orders 30 shirts, the system will apply the 1.6x markup from the 24-49 tier. The charged garment price will be <b className="text-black dark:text-white">$8.00 per shirt</b> before printing fees.
                        </div>
                    </div>
                )}

                {/* Print Matrix Tab */}
                {activeTab === 'print' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold tracking-tight">Screen Printing Matrix</h2>
                            <button className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors">Edit Columns</button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40 border-b border-black/5 dark:border-white/5">Ink Colors</th>
                                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40 border-b border-black/5 dark:border-white/5">1-11 qty</th>
                                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40 border-b border-black/5 dark:border-white/5">12-23 qty</th>
                                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40 border-b border-black/5 dark:border-white/5">24-49 qty</th>
                                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40 border-b border-black/5 dark:border-white/5">50-99 qty</th>
                                        <th className="py-4 px-6 border-b border-black/5 dark:border-white/5"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_PRINT_MATRIX.map((row) => (
                                        <tr key={row.id} className="group border-b border-black/[0.02] dark:border-white/[0.02] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                                            <td className="py-4 px-6 font-bold text-sm">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex -space-x-1">
                                                        {Array.from({ length: row.colors }).map((_, i) => (
                                                            <div key={i} className="w-4 h-4 rounded-full border border-black/10 dark:border-white/10" style={{ backgroundColor: `hsl(${i * 60}, 70%, 50%)` }}></div>
                                                        ))}
                                                    </div>
                                                    {row.colors} Color{row.colors > 1 ? 's' : ''}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6"><span className="text-black/50 dark:text-white/50">$</span><input type="text" defaultValue={row['1-11'].toFixed(2)} className="w-16 bg-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded px-1" /></td>
                                            <td className="py-4 px-6"><span className="text-black/50 dark:text-white/50">$</span><input type="text" defaultValue={row['12-23'].toFixed(2)} className="w-16 bg-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded px-1" /></td>
                                            <td className="py-4 px-6"><span className="text-black/50 dark:text-white/50">$</span><input type="text" defaultValue={row['24-49'].toFixed(2)} className="w-16 bg-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded px-1" /></td>
                                            <td className="py-4 px-6"><span className="text-black/50 dark:text-white/50">$</span><input type="text" defaultValue={row['50-99'].toFixed(2)} className="w-16 bg-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded px-1" /></td>
                                            <td className="py-4 px-6 text-right">
                                                <button className="p-2 rounded-xl hover:bg-red-500/10 text-black/20 dark:text-white/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button className="mt-4 text-sm font-semibold text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            Add Color Row
                        </button>
                    </div>
                )}

                {/* Fees Tab */}
                {activeTab === 'fees' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold tracking-tight">Service & Setup Fees</h2>
                            <button className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors">+ Add Fee</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {MOCK_FEES.map((fee) => (
                                <div key={fee.id} className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 p-6 rounded-[2rem] hover:border-black/10 dark:hover:border-white/10 transition-colors group relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${fee.type === 'flat' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : fee.type === 'per_item' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' : 'bg-green-500/10 text-green-600 dark:text-green-400'}`}>
                                            {fee.type.replace('_', ' ')}
                                        </span>
                                        <button className="text-black/30 dark:text-white/30 hover:text-blue-500 transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                        </button>
                                    </div>

                                    <h3 className="font-semibold text-sm mb-1">{fee.name}</h3>
                                    <p className="text-3xl font-bold tracking-tight drop-shadow-sm">
                                        {fee.type === 'percentage' ? '' : '$'}
                                        {fee.amount.toFixed(2)}
                                        {fee.type === 'percentage' ? '%' : ''}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

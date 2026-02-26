'use client';

import React, { useState } from 'react';
import MockupBuilder from '@/components/MockupBuilder';

// Mock active orders needing artwork attention
const ARTWORK_ORDERS = [
    { id: 'ORD-004', clientName: 'Wayne Enterprises', status: 'Needs Mockups', date: 'Oct 26', items: 1000, theme: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
    { id: 'ORD-005', clientName: 'Local Gym Tanks', status: 'Pending Client Approval', date: 'Oct 28', items: 30, theme: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' },
    { id: 'ORD-002', clientName: 'High School Hoodies', status: 'Client Approved', date: 'Oct 24', items: 120, theme: 'bg-green-500/10 text-green-600 dark:text-green-400' },
];

export default function ArtworkApprovalsPage() {
    const [activeOrder, setActiveOrder] = useState(ARTWORK_ORDERS[0].id);
    const [isBuildingMockup, setIsBuildingMockup] = useState(false);

    return (
        <div className="p-8 h-full mx-auto max-w-[1700px] flex flex-col gap-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-black/90 dark:text-white/90">Artwork Approvals</h1>
                    <p className="text-sm font-medium text-black/50 dark:text-white/50 mt-1.5">Manage mockups, send portals, and track client sign-offs.</p>
                </div>
            </header>

            <div className="flex-1 flex gap-8 min-h-0">

                {/* Left Column: Orders List */}
                <div className="w-1/3 max-w-sm glass-panel rounded-[2.5rem] p-6 flex flex-col min-h-0">
                    <div className="relative mb-6">
                        <input type="text" placeholder="Search orders..." className="pl-11 pr-4 py-3 rounded-2xl text-sm bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full transition-all text-black/90 dark:text-white/90 font-medium" />
                        <svg className="w-4 h-4 absolute left-4 top-3.5 text-black/40 dark:text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>

                    <div className="overflow-y-auto pr-2 space-y-3 flex-1 custom-scrollbar">
                        {ARTWORK_ORDERS.map(order => (
                            <button
                                key={order.id}
                                onClick={() => setActiveOrder(order.id)}
                                className={`w-full text-left p-4 rounded-2xl transition-all border ${activeOrder === order.id ? 'bg-white dark:bg-white/10 shadow-sm border-black/10 dark:border-white/10 scale-[1.02]' : 'bg-transparent border-transparent hover:bg-black/5 dark:hover:bg-white/5'}`}
                            >
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${order.theme}`}>
                                        {order.status}
                                    </span>
                                    <span className="text-[11px] font-bold text-black/40 dark:text-white/40">{order.date}</span>
                                </div>
                                <h3 className="font-bold text-sm text-black/90 dark:text-white/90 truncate">{order.clientName}</h3>
                                <p className="text-xs font-medium text-black/50 dark:text-white/50">{order.id} &bull; {order.items} Items</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Column: Active Workspace */}
                <div className="flex-1 glass-panel rounded-[2.5rem] p-8 flex flex-col min-h-0 relative overflow-hidden">
                    {/* Subtle bg glow */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>

                    {isBuildingMockup ? (
                        <div className="absolute inset-0 z-20 bg-[var(--background)] flex flex-col p-8">
                            <MockupBuilder
                                onSave={() => setIsBuildingMockup(false)}
                                onCancel={() => setIsBuildingMockup(false)}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">Wayne Enterprises Mockups</h2>
                                    <p className="text-sm font-medium text-black/50 dark:text-white/50 mt-1">Order #ORD-004 &bull; 1000 Items</p>
                                </div>
                                <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-md active:scale-95 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                    Send Portal to Client
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-6">

                                    {/* Existing Uploaded Mockup */}
                                    <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-[2rem] overflow-hidden group">
                                        <div className="h-64 relative overflow-hidden bg-black/10 dark:bg-white/10 flex items-center justify-center">
                                            <img src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Mockup" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                                <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                </button>
                                                <button className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:scale-110 transition-transform">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-5 flex justify-between items-center bg-white/40 dark:bg-black/40 backdrop-blur-md">
                                            <div>
                                                <h3 className="font-bold text-sm mb-0.5">Front Left Chest</h3>
                                                <p className="text-xs font-semibold text-black/50 dark:text-white/50">1-Color (White) &bull; v1.0</p>
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-lg">Awaiting Client</span>
                                        </div>
                                    </div>

                                    {/* Upload / AI Generate Card */}
                                    <div className="border-2 border-dashed border-black/15 dark:border-white/15 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors relative overflow-hidden group">
                                        <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">Build New Mockup</h3>
                                        <p className="text-sm font-medium text-black/50 dark:text-white/50 mb-6 max-w-[200px]">Design a mockup inside the browser manually.</p>
                                        <div className="flex flex-col w-full gap-3 px-4">
                                            <button onClick={() => setIsBuildingMockup(true)} className="py-2.5 rounded-xl bg-black/5 dark:bg-white/10 text-sm font-bold hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
                                                Open Mockup Builder
                                            </button>
                                            <div className="flex items-center gap-3">
                                                <div className="h-px bg-black/10 dark:bg-white/10 flex-1"></div>
                                                <span className="text-xs font-bold text-black/30 dark:text-white/30 uppercase">OR</span>
                                                <div className="h-px bg-black/10 dark:bg-white/10 flex-1"></div>
                                            </div>
                                            <button className="py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group/ai relative overflow-hidden">
                                                <svg className="w-4 h-4 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                                                Generate AI Mockup
                                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/ai:translate-y-0 transition-transform duration-300"></div>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}

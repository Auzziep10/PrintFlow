'use client';

import React, { useState } from 'react';

// Mock Data for Roles & Settings
const MOCK_TEAM = [
    { id: 1, name: 'Alex Manager', email: 'alex@printshop.com', role: 'Owner' },
    { id: 2, name: 'Sam Pressman', email: 'sam@printshop.com', role: 'Printer' },
    { id: 3, name: 'Jordan Sales', email: 'jordan@printshop.com', role: 'Sales Rep' },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'team'>('team');

    return (
        <div className="p-8 h-full mx-auto max-w-[1400px] flex flex-col">
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 px-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-black/90 dark:text-white/90">Shop Settings</h1>
                    <p className="text-sm font-medium text-black/50 dark:text-white/50 mt-1.5">Manage your workshop team and account details.</p>
                </div>
                <div className="flex bg-black/5 dark:bg-white/10 p-1 rounded-2xl">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === 'profile' ? 'bg-white dark:bg-black shadow-sm text-blue-600 dark:text-blue-400' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
                    >
                        Shop Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('team')}
                        className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === 'team' ? 'bg-white dark:bg-black shadow-sm text-blue-600 dark:text-blue-400' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
                    >
                        Team & Roles
                    </button>
                </div>
            </header>

            <div className="flex-1 glass-panel rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden">
                {/* Subtle decorative glow */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl -ml-48 -mt-48 pointer-events-none"></div>

                {activeTab === 'profile' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl relative z-10">
                        <h2 className="text-xl font-bold tracking-tight mb-6">General Information</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-2 block">Shop Name</label>
                                <input type="text" defaultValue="Wayne Enterprises Apparel" className="w-full text-sm font-medium px-4 py-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-2 block">Contact Email</label>
                                <input type="email" defaultValue="orders@wayneapparel.com" className="w-full text-sm font-medium px-4 py-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-2 block">Billing Address</label>
                                <textarea rows={3} defaultValue="1007 Mountain Drive&#13;&#10;Gotham City, NJ 07001" className="w-full text-sm font-medium px-4 py-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"></textarea>
                            </div>
                            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-md active:scale-95">Save Profile Changes</button>
                        </div>
                    </div>
                )}

                {activeTab === 'team' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold tracking-tight">Team Members</h2>
                            <button className="px-5 py-2.5 bg-black/90 dark:bg-white/10 hover:bg-black dark:hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-all shadow-md active:scale-95 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                                Invite Member
                            </button>
                        </div>

                        <div className="overflow-hidden border border-black/5 dark:border-white/5 rounded-[2rem] bg-white/40 dark:bg-black/20">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40 border-b border-black/5 dark:border-white/5">Name</th>
                                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40 border-b border-black/5 dark:border-white/5">Email Address</th>
                                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40 border-b border-black/5 dark:border-white/5">Access Role</th>
                                        <th className="py-4 px-6 border-b border-black/5 dark:border-white/5"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_TEAM.map((member) => (
                                        <tr key={member.id} className="group border-b border-black/[0.02] dark:border-white/[0.02] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors">
                                            <td className="py-4 px-6 font-semibold text-sm">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs font-bold">{member.name.charAt(0)}</div>
                                                    {member.name}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-black/60 dark:text-white/60">{member.email}</td>
                                            <td className="py-4 px-6">
                                                <select defaultValue={member.role} className="bg-black/5 dark:bg-white/10 border border-transparent hover:border-black/10 dark:hover:border-white/10 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer appearance-none pr-8 relative">
                                                    <option value="Owner">Owner (All Access)</option>
                                                    <option value="Manager">Manager</option>
                                                    <option value="Printer">Printer (Prod Board Only)</option>
                                                    <option value="Sales Rep">Sales Rep (Quotes Only)</option>
                                                </select>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                {member.role !== 'Owner' && (
                                                    <button className="text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                                        Remove
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

'use client';

import React, { useState } from 'react';

// Mock Data for Roles & Settings
const MOCK_TEAM = [
    { id: 1, name: 'Alex Manager', email: 'alex@printshop.com', role: 'Owner' },
    { id: 2, name: 'Sam Pressman', email: 'sam@printshop.com', role: 'Printer' },
    { id: 3, name: 'Jordan Sales', email: 'jordan@printshop.com', role: 'Sales Rep' },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'team' | 'payments' | 'billing'>('billing');
    const [isConnectingStripe, setIsConnectingStripe] = useState(false);
    const [isSubscribing, setIsSubscribing] = useState<string | null>(null);

    const handleSubscribe = async (priceId: string, planName: string) => {
        setIsSubscribing(planName);
        try {
            const res = await fetch('/api/stripe/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId, planName })
            });
            const data = await res.json();

            if (data.url) {
                window.location.href = data.url; // Redirect to Stripe Checkout
            } else if (data.demo) {
                alert(data.message);
                setIsSubscribing(null);
            }
        } catch (error) {
            console.error(error);
            setIsSubscribing(null);
        }
    };

    const handleStripeConnect = async () => {
        setIsConnectingStripe(true);
        try {
            const res = await fetch('/api/stripe/connect', { method: 'POST' });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url; // Redirect to Stripe onboarding
            } else if (data.demo) {
                alert("Running in Demo Mode: Stripe Connect flow would launch here. Paste real keys in .env.local to activate!");
                setIsConnectingStripe(false);
            }
        } catch (error) {
            console.error(error);
            setIsConnectingStripe(false);
        }
    };

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
                    <button
                        onClick={() => setActiveTab('payments')}
                        className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === 'payments' ? 'bg-white dark:bg-black shadow-sm text-blue-600 dark:text-blue-400' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
                    >
                        Payments
                    </button>
                    <button
                        onClick={() => setActiveTab('billing')}
                        className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === 'billing' ? 'bg-white dark:bg-black shadow-sm text-blue-600 dark:text-blue-400' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
                    >
                        Billing & Plans
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

                {activeTab === 'payments' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl relative z-10">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center rounded-[1rem]">
                                <svg className="w-6 h-6" viewBox="0 0 40 40" fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM15.8242 16.0357C15.8242 14.7731 16.9208 13.7854 18.2323 13.7854H22.3732C23.6353 13.7854 24.6853 14.7397 24.6853 16.0357C24.6853 17.1593 23.9515 18.068 23.0163 18.2562V19.9926H22.4276C21.4363 19.9926 20.6322 20.8016 20.6322 21.7981C20.6322 22.7946 21.4363 23.6036 22.4276 23.6036H23.0163V25.3399C23.9515 25.5281 24.6853 26.4369 24.6853 27.5604C24.6853 28.8565 23.6353 29.8107 22.3732 29.8107H18.2323C16.9208 29.8107 15.8242 28.8231 15.8242 27.5604H17.8306C17.8306 27.7667 18.0195 27.9362 18.2323 27.9362H22.3732C22.6186 27.9362 22.8143 27.7297 22.8143 27.5604C22.8143 27.3912 22.6186 27.1848 22.3732 27.1848H18.2323C15.8458 27.1848 13.9533 25.3344 13.9533 23.0239C13.9533 20.7134 15.8458 18.863 18.2323 18.863H20.6322C20.8711 18.863 21.0567 18.667 21.0567 18.4116C21.0567 18.1561 20.8711 17.9602 20.6322 17.9602H18.2323C18.0195 17.9602 17.8306 17.7907 17.8306 17.5843C17.8306 17.378 18.0195 17.2085 18.2323 17.2085H22.3732C23.6847 17.2085 24.7813 16.2208 24.7813 14.9582C24.7813 13.6956 23.6847 12.708 22.3732 12.708H18.2323C15.8458 12.708 13.9533 14.5584 13.9533 16.8689V18.6052H15.8242V16.0357Z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight">Payment Processing</h2>
                        </div>
                        <p className="text-sm font-medium text-black/60 dark:text-white/60 mb-8 max-w-lg">
                            Securely link your real business bank account using Stripe Connect. We automatically attach an integrated "Pay Now" link directly onto your customer invoice portals.
                        </p>

                        <div className="bg-gradient-to-br from-[#635BFF]/5 to-[#00D4FF]/5 rounded-[2rem] p-8 border border-[#635BFF]/10 flex flex-col gap-6">
                            <div className="flex gap-4">
                                <div className="min-w-[40px] h-[40px] rounded-full bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 flex items-center justify-center font-bold text-[#635BFF]">1</div>
                                <div>
                                    <h4 className="font-bold text-black/90 dark:text-white/90">Identity Verification</h4>
                                    <p className="text-sm text-black/60 dark:text-white/60 mt-0.5">Stripe will securely collect your business entity details.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="min-w-[40px] h-[40px] rounded-full bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 flex items-center justify-center font-bold text-[#635BFF]">2</div>
                                <div>
                                    <h4 className="font-bold text-black/90 dark:text-white/90">Link Bank Account</h4>
                                    <p className="text-sm text-black/60 dark:text-white/60 mt-0.5">Decide where you want your customer payments routed to.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="min-w-[40px] h-[40px] rounded-full bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 flex items-center justify-center font-bold text-[#635BFF]">3</div>
                                <div>
                                    <h4 className="font-bold text-black/90 dark:text-white/90">Start Collecting</h4>
                                    <p className="text-sm text-black/60 dark:text-white/60 mt-0.5">Customers can immediately pay via CC, ACH, or Apple Pay.</p>
                                </div>
                            </div>

                            <button
                                onClick={handleStripeConnect}
                                disabled={isConnectingStripe}
                                className="w-full mt-4 py-4 bg-[#635BFF] hover:bg-[#5851E5] text-white rounded-2xl text-[15px] font-bold transition-all shadow-lg shadow-[#635BFF]/30 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isConnectingStripe ? (
                                    <>
                                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                        Connecting to Gateway...
                                    </>
                                ) : (
                                    <>
                                        Initialize Stripe Connect &rarr;
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'billing' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10 w-full max-w-5xl">
                        <div className="mb-8 max-w-2xl">
                            <h2 className="text-2xl font-bold tracking-tight mb-2">Platform Subscription</h2>
                            <p className="text-sm font-medium text-black/60 dark:text-white/60">
                                Upgrade your Printflow workspace to unlock powerful automation tools, AI mockups, and the embedded Gangsheet Builder.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Free Tier */}
                            <div className="glass-panel rounded-[2rem] p-8 flex flex-col border border-black/5 dark:border-white/5 opacity-80">
                                <h3 className="text-lg font-bold text-black/80 dark:text-white/80">Starter</h3>
                                <div className="mt-4 mb-6"><span className="text-4xl font-extrabold">$0</span><span className="text-black/50 dark:text-white/50 font-medium">/mo</span></div>
                                <ul className="flex flex-col gap-3 text-sm font-medium text-black/70 dark:text-white/70 mb-8 flex-1">
                                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Basic CRM</li>
                                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 1 User Seat</li>
                                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Manual Quoting</li>
                                </ul>
                                <button className="w-full py-3 bg-black/5 dark:bg-white/10 text-black/50 dark:text-white/50 rounded-xl text-sm font-bold cursor-default">Current Plan</button>
                            </div>

                            {/* Pro Tier */}
                            <div className="bg-gradient-to-b from-blue-600 to-blue-800 text-white rounded-[2rem] p-8 flex flex-col relative shadow-xl shadow-blue-900/20 transform md:-translate-y-4">
                                <div className="absolute top-0 right-8 -translate-y-1/2 bg-yellow-400 text-yellow-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">Popular</div>
                                <h3 className="text-lg font-bold text-blue-100">Pro Workshop</h3>
                                <div className="mt-4 mb-6"><span className="text-4xl font-extrabold">$49</span><span className="text-blue-200 font-medium">/mo</span></div>
                                <ul className="flex flex-col gap-3 text-sm font-medium text-blue-100 mb-8 flex-1">
                                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Pricing Engine Automations</li>
                                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> AI Image Mockups</li>
                                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 5 User Seats</li>
                                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Client Portal & Sign-offs</li>
                                </ul>
                                <button onClick={() => handleSubscribe('price_pro_placeholder', 'Pro')} disabled={isSubscribing !== null} className="w-full py-3 bg-white text-blue-800 hover:bg-blue-50 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95 flex items-center justify-center">
                                    {isSubscribing === 'Pro' ? <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> : 'Upgrade to Pro'}
                                </button>
                            </div>

                            {/* Enterprise Tier */}
                            <div className="glass-panel rounded-[2rem] p-8 flex flex-col border border-black/5 dark:border-white/5">
                                <h3 className="text-lg font-bold text-black/80 dark:text-white/80">Scale</h3>
                                <div className="mt-4 mb-6"><span className="text-4xl font-extrabold">$149</span><span className="text-black/50 dark:text-white/50 font-medium">/mo</span></div>
                                <ul className="flex flex-col gap-3 text-sm font-medium text-black/70 dark:text-white/70 mb-8 flex-1">
                                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Unlimited User Seats</li>
                                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Embedded Gangsheet Builder</li>
                                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Custom Invoice Templates</li>
                                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Priority Phone Support</li>
                                </ul>
                                <button onClick={() => handleSubscribe('price_scale_placeholder', 'Scale')} disabled={isSubscribing !== null} className="w-full py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center">
                                    {isSubscribing === 'Scale' ? <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> : 'Upgrade to Scale'}
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

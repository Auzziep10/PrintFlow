'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const router = useRouter();

    const [shopName, setShopName] = useState('');
    const [accentColor, setAccentColor] = useState('#635BFF');
    const [services, setServices] = useState<string[]>([]);

    const toggleService = (service: string) => {
        setServices(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]);
    };

    const handleComplete = () => {
        // Here we would typically save to Firebase/Firestore
        // For now we just route to dashboard
        router.push('/');
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[var(--background)] p-4 relative overflow-hidden font-sans">
            {/* Ambient Background Glows */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[150px] pointer-events-none" />

            <div className="w-full max-w-2xl relative z-10">
                {/* Stepper Header */}
                <div className="flex justify-center mb-8 gap-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-2 w-16 rounded-full transition-all duration-300 ${i <= step ? 'bg-blue-600' : 'bg-black/10 dark:bg-white/10'}`} />
                    ))}
                </div>

                <div className="glass-panel p-8 md:p-12 rounded-[3rem] shadow-2xl border border-white/20 dark:border-white/5 relative overflow-hidden min-h-[500px] flex flex-col justify-center transition-all bg-white/60 dark:bg-black/60 backdrop-blur-xl">

                    {/* Step 1: Shop Basics */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-md mx-auto w-full">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight mb-2 text-black/90 dark:text-white/90">Welcome to Printflow</h2>
                            <p className="text-black/60 dark:text-white/60 font-medium mb-8">Let's set up your shop's workspace so you can start managing orders professionally.</p>

                            <div className="space-y-5">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-2 block">Shop Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Acme Screenprinting"
                                        value={shopName}
                                        onChange={e => setShopName(e.target.value)}
                                        className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-semibold"
                                        autoFocus
                                    />
                                </div>
                                <button
                                    onClick={() => setStep(2)}
                                    disabled={!shopName.trim()}
                                    className="w-full py-4 text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:bg-blue-600 disabled:cursor-not-allowed rounded-2xl font-bold transition-all shadow-md active:scale-95 text-lg"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Branding */}
                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-md mx-auto w-full">
                            <div className="w-16 h-16 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight mb-2 text-black/90 dark:text-white/90">Brand Identity</h2>
                            <p className="text-black/60 dark:text-white/60 font-medium mb-8">Choose the primary color that represents your specific print shop.</p>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-3 block">Accent Color</label>
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <input
                                            type="color"
                                            value={accentColor}
                                            onChange={e => setAccentColor(e.target.value)}
                                            className="w-16 h-16 rounded-2xl cursor-pointer bg-transparent border-none appearance-none p-0 outline-none shadow-sm flex-shrink-0"
                                        />
                                        <div className="flex-1 px-5 py-4 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 font-mono font-bold text-center">
                                            {accentColor.toUpperCase()}
                                        </div>
                                    </div>
                                    <p className="text-xs text-black/40 dark:text-white/40 mt-3 font-medium">This color will be used on all your client-facing portals, invoices, and gangsheet builders.</p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="w-1/3 py-4 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-2xl font-bold transition-all text-black/60 dark:text-white/60 active:scale-95"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={() => setStep(3)}
                                        className="w-2/3 py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-md active:scale-95"
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Production Focus */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-md mx-auto w-full">
                            <div className="w-16 h-16 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight mb-2 text-black/90 dark:text-white/90">Your Services</h2>
                            <p className="text-black/60 dark:text-white/60 font-medium mb-8">What exactly does {shopName || "your shop"} print? We'll tailor the workspace to your needs.</p>

                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {[
                                    { id: 'screenprinting', label: 'Screen Printing', icon: '👕' },
                                    { id: 'dtg', label: 'DTG / DTF', icon: '🖨️' },
                                    { id: 'embroidery', label: 'Embroidery', icon: '🧵' },
                                    { id: 'sublimation', label: 'Sublimation', icon: '☕' }
                                ].map(service => (
                                    <button
                                        key={service.id}
                                        onClick={() => toggleService(service.id)}
                                        className={`p-4 flex flex-col items-center justify-center text-center rounded-2xl border-2 transition-all active:scale-95 gap-2 ${services.includes(service.id)
                                                ? 'border-blue-500 bg-blue-500/10'
                                                : 'border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 hover:border-black/10 dark:hover:border-white/10'
                                            }`}
                                    >
                                        <span className="text-2xl">{service.icon}</span>
                                        <span className={`text-xs font-bold ${services.includes(service.id) ? 'text-blue-700 dark:text-blue-400' : 'text-black/60 dark:text-white/60'}`}>{service.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(2)}
                                    className="w-1/3 py-4 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-2xl font-bold transition-all text-black/60 dark:text-white/60 active:scale-95"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleComplete}
                                    className="w-2/3 py-4 text-white hover:opacity-90 rounded-2xl font-bold transition-all shadow-lg active:scale-95 relative overflow-hidden group"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                    Launch Workspace
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

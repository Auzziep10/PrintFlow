'use client';

import { useEffect, useRef, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signup');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shopName, setShopName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (activeTab === 'signup') {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                // Automatically generate a Shop ID and save user config
                const newShopId = `shop_${Date.now()}`;
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    email: userCredential.user.email,
                    shopId: newShopId,
                    role: 'Owner'
                });

                await setDoc(doc(db, 'shops', newShopId), {
                    shopName: shopName || 'My Print Shop',
                    ownerId: userCredential.user.uid,
                    createdAt: new Date().toISOString()
                });

                router.push('/onboarding'); // Direct to wizard
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                router.push('/');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        setLoading(true);
        setError('');
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);

            // Check if user is new, if so send to onboarding (simplified check)
            router.push('/');
        } catch (err: any) {
            setError(err.message || 'An error occurred with Google Sign-In.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[var(--background)] p-4 relative overflow-hidden font-sans">
            {/* Ambient Background Glows */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[150px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10 glass-panel p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-white/5 bg-white/60 dark:bg-black/60 backdrop-blur-xl">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-purple-600 tracking-tight mb-2">Printflow</h1>
                    <p className="text-sm text-black/50 dark:text-white/50 font-medium">The Operating System for Print Shops.</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-2xl mb-8">
                    <button
                        onClick={() => { setActiveTab('signup'); setError(''); }}
                        className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === 'signup' ? 'bg-white dark:bg-black shadow-sm text-blue-600 dark:text-blue-400' : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white'}`}
                    >
                        Create Account
                    </button>
                    <button
                        onClick={() => { setActiveTab('signin'); setError(''); }}
                        className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === 'signin' ? 'bg-white dark:bg-black shadow-sm text-blue-600 dark:text-blue-400' : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white'}`}
                    >
                        Log In
                    </button>
                </div>

                <form onSubmit={handleEmailAuth} className="space-y-4">
                    {activeTab === 'signup' && (
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-1.5 block">Company Name</label>
                            <input
                                type="text"
                                required
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                placeholder="Acme Prints"
                                className="w-full text-sm font-medium px-4 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-black/30"
                            />
                        </div>
                    )}
                    <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-1.5 block">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@printshop.com"
                            className="w-full text-sm font-medium px-4 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-black/30"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-1.5 block">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full text-sm font-medium px-4 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-black/30"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-2xl text-sm font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                        ) : (
                            activeTab === 'signup' ? 'Create Print Shop' : 'Sign into Dashboard'
                        )}
                    </button>
                </form>

                <div className="flex items-center gap-4 my-6 opacity-60">
                    <div className="h-px bg-black/20 dark:bg-white/20 flex-1"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/60 dark:text-white/60">OR</span>
                    <div className="h-px bg-black/20 dark:bg-white/20 flex-1"></div>
                </div>

                <button
                    onClick={handleGoogleAuth}
                    disabled={loading}
                    className="w-full py-3.5 bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 rounded-2xl text-sm font-bold transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.8 15.71 17.58V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
                        <path d="M12 23C14.97 23 17.46 22.01 19.28 20.34L15.71 17.58C14.72 18.24 13.46 18.66 12 18.66C9.17 18.66 6.78 16.75 5.91 14.18H2.23V17.03C4.05 20.64 7.74 23 12 23Z" fill="#34A853" />
                        <path d="M5.91 14.18C5.69 13.52 5.56 12.78 5.56 12C5.56 11.22 5.69 10.48 5.91 9.82V6.97H2.23C1.49 8.44 1.06 10.15 1.06 12C1.06 13.85 1.49 15.56 2.23 17.03L5.91 14.18Z" fill="#FBBC05" />
                        <path d="M12 5.34C13.62 5.34 15.06 5.9 16.2 6.99L19.34 3.85C17.45 2.09 14.97 1 12 1C7.74 1 4.05 3.36 2.23 6.97L5.91 9.82C6.78 7.25 9.17 5.34 12 5.34Z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>
            </div>
        </div>
    );
}

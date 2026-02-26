'use client';

import { useEffect, useRef } from 'react';
import { auth } from '@/lib/firebase';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import 'firebaseui/dist/firebaseui.css';

export default function Login() {
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current && typeof window !== 'undefined') {
            isMounted.current = true;

            const loadFirebaseUI = async () => {
                // Dynamically import to avoid "window is not defined" SSR errors
                const firebaseui = await import('firebaseui');

                const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

                ui.start('#firebaseui-auth-container', {
                    signInOptions: [
                        EmailAuthProvider.PROVIDER_ID,
                        GoogleAuthProvider.PROVIDER_ID,
                    ],
                    signInSuccessUrl: '/', // Redirect back to Dashboard on success
                    tosUrl: '/terms',
                    privacyPolicyUrl: '/privacy'
                });
            };

            loadFirebaseUI();
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4 relative overflow-hidden">
            {/* Decorative Blur */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 dark:bg-blue-600/20 blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 dark:bg-purple-600/20 blur-[120px] pointer-events-none" />

            <div className="glass-panel w-full max-w-md rounded-[2.5rem] p-10 flex flex-col items-center relative z-10 shadow-xl shadow-black/5 dark:shadow-white/5">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-purple-600 tracking-tight mb-2">Printflow</h1>
                <p className="text-sm text-black/50 dark:text-white/50 font-medium mb-8 text-center">Sign in to manage your shop's workflow.</p>

                <div id="firebaseui-auth-container" className="w-full"></div>
            </div>
        </div>
    );
}

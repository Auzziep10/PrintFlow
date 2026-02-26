'use client';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { loading, user } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[var(--background)]">
                <div className="w-8 h-8 rounded-full border-4 border-black/10 dark:border-white/10 border-t-current animate-spin text-blue-500"></div>
            </div>
        );
    }

    // Double-checking user to avoid fleeting rendering
    if (!user) {
        return null;
    }

    return (
        <>
            <Sidebar className="w-64 flex-none border-r border-black/5 dark:border-white/5 glass-panel hidden md:flex flex-col m-4 rounded-[2rem] shadow-sm z-10" />
            <main className="flex-1 overflow-x-hidden overflow-y-auto relative z-10">
                {children}
            </main>
        </>
    );
}

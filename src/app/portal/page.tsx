'use client';

import React, { useState } from 'react';

// Mock Data for a Customer's specific order
const MOCK_ORDER = {
    id: 'ORD-004',
    clientName: 'Wayne Enterprises',
    status: 'Pending Art Approval',
    total: 6540.00,
    dueDate: 'Oct 26, 2026',
    items: [
        { title: 'Next Level 3600 Tees (Black)', quantity: 800, price: 6.50 },
        { title: 'Independent Trading Co Hoodies', quantity: 200, price: 10.70 },
    ],
    artworks: [
        {
            id: 'art-1',
            location: 'Front Left Chest',
            colors: '1-Color (White)',
            image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop', // Temporary mockup placeholder
            approved: false
        },
        {
            id: 'art-2',
            location: 'Full Back',
            colors: '3-Color (Yellow, Red, White)',
            image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
            approved: true
        }
    ]
};

export default function CustomerPortalPage() {
    const [artworks, setArtworks] = useState(MOCK_ORDER.artworks);
    const [isSigned, setIsSigned] = useState(false);
    const [signature, setSignature] = useState('');

    const allApproved = artworks.every(art => art.approved);

    const toggleApproval = (id: string) => {
        setArtworks(artworks.map(art =>
            art.id === id ? { ...art, approved: !art.approved } : art
        ));
    };

    return (
        <div className="min-h-screen bg-[var(--background)] p-4 md:p-10 relative overflow-hidden flex justify-center">
            {/* Decorative Blurs */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/10 dark:bg-purple-600/10 blur-[120px] pointer-events-none" />

            <div className="w-full max-w-5xl z-10 flex flex-col gap-8">

                {/* Portal Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between glass-panel p-6 rounded-[2rem] gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-black/90 dark:text-white/90">Printflow Portal</h1>
                        <p className="text-sm font-medium text-black/50 dark:text-white/50">{MOCK_ORDER.clientName} &bull; Order #{MOCK_ORDER.id}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-bold">
                        <div className="flex flex-col text-right">
                            <span className="text-black/40 dark:text-white/40 uppercase tracking-widest text-[10px]">Total Due</span>
                            <span className="text-xl text-black/90 dark:text-white/90">${MOCK_ORDER.total.toFixed(2)}</span>
                        </div>
                        <div className="w-px h-10 bg-black/10 dark:bg-white/10 mx-2"></div>
                        <div className="flex flex-col">
                            <span className="text-black/40 dark:text-white/40 uppercase tracking-widest text-[10px]">Status</span>
                            <span className="text-orange-500 py-0.5">{MOCK_ORDER.status}</span>
                        </div>
                    </div>
                </header>

                {/* Artworks Review Section */}
                <div>
                    <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        Review Mockups
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {artworks.map((art) => (
                            <div key={art.id} className={`glass-panel rounded-[2rem] overflow-hidden transition-all duration-300 ${art.approved ? 'ring-2 ring-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 'border border-black/5 dark:border-white/5'}`}>
                                <div className="h-64 overflow-hidden relative group">
                                    <img src={art.image} alt={art.location} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                        <p className="text-white font-bold text-sm bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl">{art.colors}</p>
                                    </div>
                                </div>
                                <div className="p-6 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{art.location}</h3>
                                        <p className="text-xs font-medium text-black/50 dark:text-white/50">Please verify sizing, placement, and colors.</p>
                                    </div>
                                    <button
                                        onClick={() => toggleApproval(art.id)}
                                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95 flex items-center gap-2 ${art.approved
                                                ? 'bg-green-500 text-white hover:bg-green-600'
                                                : 'bg-black/10 dark:bg-white/10 text-black/80 dark:text-white/80 hover:bg-black/20 dark:hover:bg-white/20'
                                            }`}
                                    >
                                        {art.approved ? (
                                            <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Approved</>
                                        ) : (
                                            'Approve Artwork'
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final Sign Off Box */}
                <div className={`glass-panel rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 overflow-hidden ${allApproved ? 'opacity-100 translate-y-0' : 'opacity-40 pointer-events-none translate-y-4 blur-[2px]'}`}>
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Final Approval & Sign-Off</h2>
                    <p className="text-sm font-medium text-black/60 dark:text-white/60 mb-8 max-w-2xl">
                        By signing below, I confirm that all artwork sizing, spelling, placement, and garment colors are completely accurate. <strong className="text-black dark:text-white">I understand that production will begin immediately following this approval.</strong>
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full">
                            <label className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-2 block">Type your full name to sign</label>
                            <input
                                type="text"
                                disabled={isSigned}
                                placeholder={MOCK_ORDER.clientName}
                                value={signature}
                                onChange={(e) => setSignature(e.target.value)}
                                className="w-full text-lg font-medium px-4 py-3 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50"
                                style={{ fontFamily: isSigned ? "'Brush Script MT', cursive, sans-serif" : "inherit" }}
                            />
                        </div>
                        <button
                            onClick={() => setIsSigned(true)}
                            disabled={isSigned || signature.length < 3}
                            className="w-full md:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white rounded-2xl text-sm font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                        >
                            {isSigned ? (
                                <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Order Approved</>
                            ) : (
                                'Submit Approval'
                            )}
                        </button>
                    </div>

                    {isSigned && (
                        <div className="mt-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-sm font-medium text-green-700 dark:text-green-400 animate-in fade-in slide-in-from-top-2">
                            Success! Your artwork has been approved. This order will now move to the "In Production" stage automatically. Thank you!
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

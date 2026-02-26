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
    const [isPaying, setIsPaying] = useState(false);

    const handlePayment = async () => {
        setIsPaying(true);
        try {
            const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: MOCK_ORDER.id,
                    amount: MOCK_ORDER.total,
                    shopConnectedAccountId: 'acct_demo123' // Example placeholder
                })
            });
            const data = await res.json();

            if (data.url) {
                window.location.href = data.url; // Trigger Stripe Hosted Checkout Redirect
            } else if (data.demo) {
                alert("Demo Mode: Customer is redirected to Stripe Checkout to pay via CC or Apple Pay. The funds are routed directly to the print shop's connected account.");
                setIsPaying(false);
            }
        } catch (error) {
            console.error("Payment Error:", error);
            setIsPaying(false);
        }
    };

    const allApproved = artworks.every(art => art.approved);

    const toggleApproval = (id: string) => {
        setArtworks(artworks.map(art =>
            art.id === id ? { ...art, approved: !art.approved } : art
        ));
    };

    return (
        <div className="min-h-screen bg-[var(--background)] p-4 md:p-10 relative">
            {/* Decorative Blurs */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/10 dark:bg-purple-600/10 blur-[120px] pointer-events-none" />

            <div className="w-full max-w-7xl z-10 flex flex-col gap-8">

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
                        <div className="mt-6 p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-sm font-medium animate-in fade-in slide-in-from-top-2 flex flex-col md:flex-row items-center justify-between gap-4">
                            <span className="text-green-700 dark:text-green-400">Success! Your artwork has been approved. This order will now move to the "In Production" stage automatically. Thank you!</span>

                            {/* DEMO STRIPE CHECKOUT BUTTON */}
                            <button
                                onClick={handlePayment}
                                disabled={isPaying}
                                className="w-full md:w-auto px-6 py-2.5 bg-[#635BFF] hover:bg-[#5851E5] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-50"
                            >
                                {isPaying ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" viewBox="0 0 40 40" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM15.8242 16.0357C15.8242 14.7731 16.9208 13.7854 18.2323 13.7854H22.3732C23.6353 13.7854 24.6853 14.7397 24.6853 16.0357C24.6853 17.1593 23.9515 18.068 23.0163 18.2562V19.9926H22.4276C21.4363 19.9926 20.6322 20.8016 20.6322 21.7981C20.6322 22.7946 21.4363 23.6036 22.4276 23.6036H23.0163V25.3399C23.9515 25.5281 24.6853 26.4369 24.6853 27.5604C24.6853 28.8565 23.6353 29.8107 22.3732 29.8107H18.2323C16.9208 29.8107 15.8242 28.8231 15.8242 27.5604H17.8306C17.8306 27.7667 18.0195 27.9362 18.2323 27.9362H22.3732C22.6186 27.9362 22.8143 27.7297 22.8143 27.5604C22.8143 27.3912 22.6186 27.1848 22.3732 27.1848H18.2323C15.8458 27.1848 13.9533 25.3344 13.9533 23.0239C13.9533 20.7134 15.8458 18.863 18.2323 18.863H20.6322C20.8711 18.863 21.0567 18.667 21.0567 18.4116C21.0567 18.1561 20.8711 17.9602 20.6322 17.9602H18.2323C18.0195 17.9602 17.8306 17.7907 17.8306 17.5843C17.8306 17.378 18.0195 17.2085 18.2323 17.2085H22.3732C23.6847 17.2085 24.7813 16.2208 24.7813 14.9582C24.7813 13.6956 23.6847 12.708 22.3732 12.708H18.2323C15.8458 12.708 13.9533 14.5584 13.9533 16.8689V18.6052H15.8242V16.0357Z" /></svg>
                                        Pay Invoice Now
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

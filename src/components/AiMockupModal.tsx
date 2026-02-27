'use client';

import React, { useState } from 'react';

export default function AiMockupModal({
    isOpen,
    onClose,
    onSave
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (url: string) => void;
}) {
    const [garment, setGarment] = useState('t-shirt');
    const [color, setColor] = useState('black');
    const [model, setModel] = useState('male model');
    const [setting, setSetting] = useState('minimalist bright studio');
    const [additionalDetails, setAdditionalDetails] = useState('');
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setError('');

        try {
            const finalPrompt = (model === 'Flatlay (No Model)'
                ? `A photorealistic flatlay of a ${color} ${garment} evenly lit, directly from above, in a ${setting}.`
                : `A photorealistic cinematic portrait of a ${model} wearing a ${color} ${garment} in a ${setting}.`)
                + (additionalDetails ? ` Additional details: ${additionalDetails}` : '');

            // Strip the data:image prefix if present, otherwise API might break
            const logoBase64 = logoPreview ? logoPreview.split(',')[1] : undefined;

            const res = await fetch('/api/generate-mockup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: finalPrompt,
                    logoBase64: logoBase64
                })
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || 'Failed to generate mockup');
            }

            // Immediately pass the resulting URL (which is a base64 encoded data URI)
            onSave(data.url);

            // Note: the caller handles closing the modal when they receive onSave
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Something went wrong.');
            setIsGenerating(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-black w-full max-w-2xl rounded-[2.5rem] p-8 shadow-2xl border border-black/10 dark:border-white/10 flex flex-col gap-6 relative overflow-hidden">
                {/* Subtle bg glow */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none"></div>

                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Generate AI Mockup</h2>
                    <p className="text-sm font-medium text-black/50 dark:text-white/50 mt-1">
                        Describe the scene and garment in detail. Nano Banana (Gemini 2.5 Flash Image) will create a completely custom presentation image.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Configuration Form */}
                    <div className="flex-1 flex flex-col gap-4 relative z-10">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50">Garment Type</label>
                                <select value={garment} onChange={e => setGarment(e.target.value)} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer">
                                    <option value="t-shirt">T-Shirt</option>
                                    <option value="pullover hoodie">Pullover Hoodie</option>
                                    <option value="crewneck sweatshirt">Crewneck Sweatshirt</option>
                                    <option value="long sleeve tee">Long Sleeve Tee</option>
                                    <option value="tank top">Tank Top</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50">Garment Color</label>
                                <select value={color} onChange={e => setColor(e.target.value)} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer">
                                    <option value="black">Black</option>
                                    <option value="white">White</option>
                                    <option value="heather grey">Heather Grey</option>
                                    <option value="navy blue">Navy Blue</option>
                                    <option value="dark red">Dark Red</option>
                                    <option value="forest green">Forest Green</option>
                                    <option value="sand or khaki">Sand / Khaki</option>
                                    <option value="baby pink">Baby Pink</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50">Model Style</label>
                                <select value={model} onChange={e => setModel(e.target.value)} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer">
                                    <option value="male model">Male Model</option>
                                    <option value="female model">Female Model</option>
                                    <option value="androgynous model">Unisex (Androgynous)</option>
                                    <option value="Flatlay (No Model)">Flat Lay (No Model)</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50">Environment</label>
                                <select value={setting} onChange={e => setSetting(e.target.value)} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer">
                                    <option value="minimalist bright studio">Studio (White/Grey)</option>
                                    <option value="urban street alley with graffiti">Urban Street / Graffiti</option>
                                    <option value="cozy coffee shop with warm lighting">Warm Coffee Shop</option>
                                    <option value="sunlit nature scenery">Sunlit Nature Scenery</option>
                                    <option value="modern gym with neon lights">Modern Gym / Neon</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50">Additional Details (Optional)</label>
                            <textarea
                                value={additionalDetails}
                                onChange={e => setAdditionalDetails(e.target.value)}
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none h-16"
                                placeholder="e.g. Model wearing sunglasses, holding a skateboard..."
                            />
                        </div>
                    </div>

                    {/* Optional Logo Reference */}
                    <div className="w-full md:w-1/3 flex flex-col gap-2 relative z-10">
                        <label className="text-xs font-bold uppercase tracking-wider text-black/60 dark:text-white/60">Reference Logo</label>
                        <div className="relative h-32 w-full">
                            <input
                                type="file"
                                onChange={handleLogoUpload}
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                            />
                            {logoPreview ? (
                                <div className="absolute inset-0 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex items-center justify-center overflow-hidden p-2">
                                    <img src={logoPreview} alt="Logo Preview" className="max-w-full max-h-full object-contain pointer-events-none" />
                                </div>
                            ) : (
                                <div className="absolute inset-0 rounded-xl border border-black/10 dark:border-white/10 border-dashed bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center text-center p-4 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                    <svg className="w-6 h-6 mb-2 text-black/40 dark:text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                    <span className="text-[10px] font-bold text-black/60 dark:text-white/60 uppercase">Add Optional Logo</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm font-bold relative z-10">
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-end gap-3 mt-4 relative z-10">
                    <button
                        onClick={onClose}
                        disabled={isGenerating}
                        className="px-5 py-2.5 rounded-xl text-sm font-bold text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
                    >
                        {isGenerating ? (
                            <>
                                <svg className="w-4 h-4 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                                Synthesizing...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                Generate Mockup
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

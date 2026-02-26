'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function MockupBuilder({ onSave, onCancel }: { onSave: () => void, onCancel: () => void }) {
    const [garmentImage, setGarmentImage] = useState<string | null>(null);
    const [logoImage, setLogoImage] = useState<string | null>(null);

    // Position and scale of the logo
    const [logoState, setLogoState] = useState({ x: 100, y: 100, width: 150 });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const dragStartRef = useRef({ x: 0, y: 0, initialX: 0, initialY: 0, initialWidth: 0 });

    const handleGarmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setGarmentImage(url);
        }
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setLogoImage(url);
        }
    };

    // Global Pointer Listeners for Drag/Resize
    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (isDragging) {
                const dx = e.clientX - dragStartRef.current.x;
                const dy = e.clientY - dragStartRef.current.y;
                setLogoState(prev => ({
                    ...prev,
                    x: dragStartRef.current.initialX + dx,
                    y: dragStartRef.current.initialY + dy
                }));
            } else if (isResizing) {
                const dx = e.clientX - dragStartRef.current.x;
                // Maintain aspect ratio generically by just growing width based on horizontal drag
                setLogoState(prev => ({
                    ...prev,
                    width: Math.max(50, dragStartRef.current.initialWidth + dx)
                }));
            }
        };

        const handlePointerUp = () => {
            setIsDragging(false);
            setIsResizing(false);
        };

        if (isDragging || isResizing) {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        }

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isDragging, isResizing]);

    return (
        <div className="flex flex-col h-full bg-white dark:bg-black rounded-[2.5rem] border border-black/5 dark:border-white/5 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                <div>
                    <h2 className="text-xl font-bold tracking-tight">Manual Mockup Builder</h2>
                    <p className="text-xs font-medium text-black/50 dark:text-white/50 mt-1">Upload files and drag to position.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={onCancel} className="px-5 py-2.5 rounded-xl text-sm font-bold text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        disabled={!garmentImage || !logoImage}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
                    >
                        Save Mockup
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-black/5 dark:bg-white/5">
                {/* Canvas Area */}
                <div className="flex-1 relative overflow-hidden flex items-center justify-center p-8">
                    <div
                        ref={containerRef}
                        className="relative w-full max-w-2xl aspect-[4/5] bg-white dark:bg-black rounded-xl shadow-sm border border-black/10 dark:border-white/10 overflow-hidden"
                    >
                        {!garmentImage ? (
                            <div className="absolute inset-0 flex items-center justify-center flex-col text-black/30 dark:text-white/30 p-10 text-center border-2 border-dashed border-black/10 dark:border-white/10 m-4 rounded-xl">
                                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <span className="text-sm font-bold uppercase tracking-wider">Garment Required</span>
                                <span className="text-xs mt-2 font-medium">Please upload a blank garment image using the controls on the right.</span>
                            </div>
                        ) : (
                            <img src={garmentImage} alt="Garment" className="w-full h-full object-cover pointer-events-none" />
                        )}

                        {garmentImage && logoImage && (
                            <div
                                style={{
                                    position: 'absolute',
                                    left: logoState.x,
                                    top: logoState.y,
                                    width: logoState.width,
                                    cursor: isDragging ? 'grabbing' : 'grab'
                                }}
                                className={`group touch-none ${isDragging ? 'opacity-80' : ''}`}
                            >
                                <img
                                    src={logoImage}
                                    alt="Logo"
                                    className="w-full h-auto drop-shadow-md pointer-events-none"
                                />

                                {/* Overlay bounds (shows on hover) */}
                                <div
                                    onPointerDown={(e) => {
                                        setIsDragging(true);
                                        dragStartRef.current = { x: e.clientX, y: e.clientY, initialX: logoState.x, initialY: logoState.y, initialWidth: logoState.width };
                                        e.stopPropagation();
                                    }}
                                    className="absolute inset-0 border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500/10"
                                >
                                    {/* Resize Handle */}
                                    <div
                                        onPointerDown={(e) => {
                                            setIsResizing(true);
                                            setIsDragging(false); // don't drag while resizing
                                            dragStartRef.current = { x: e.clientX, y: e.clientY, initialX: logoState.x, initialY: logoState.y, initialWidth: logoState.width };
                                            e.stopPropagation();
                                        }}
                                        className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-nwse-resize shadow-sm"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="w-80 bg-white/80 dark:bg-black/80 backdrop-blur-md border-l border-black/5 dark:border-white/5 p-6 flex flex-col gap-8">

                    {/* Step 1 */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">1</div>
                            <h3 className="font-bold text-sm tracking-tight text-black/90 dark:text-white/90">Blank Garment</h3>
                        </div>
                        <div className="relative">
                            <input type="file" onChange={handleGarmentUpload} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <div className="w-full px-4 py-8 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 border-dashed text-center transition-colors">
                                <span className="text-xs font-bold text-black/60 dark:text-white/60">Choose File...</span>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className={!garmentImage ? "opacity-40 pointer-events-none" : "transition-opacity"}>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">2</div>
                            <h3 className="font-bold text-sm tracking-tight text-black/90 dark:text-white/90">Artwork / Logo</h3>
                        </div>
                        <div className="relative">
                            <input type="file" onChange={handleLogoUpload} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <div className="w-full px-4 py-8 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 border-dashed text-center transition-colors">
                                <span className="text-xs font-bold text-black/60 dark:text-white/60">Choose File...</span>
                            </div>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="mt-auto p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider">Instructions</h4>
                        <p className="text-[11px] font-medium text-black/60 dark:text-white/60 leading-relaxed">
                            Upload both images to activate the canvas. Click and drag the logo to reposition it on the garment. Grab the circular handle on the bottom-right corner of the logo to resize it.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

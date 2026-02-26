'use client';

import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';

export default function MockupBuilder({ onSave, onCancel }: { onSave: (url: string) => void, onCancel: () => void }) {
    const [garmentImage, setGarmentImage] = useState<string | null>(null);
    const [logoImage, setLogoImage] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Position and scale of the logo
    const [logoState, setLogoState] = useState({ x: 150, y: 150, width: 150, rotate: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isRotating, setIsRotating] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const dragStartRef = useRef({ x: 0, y: 0, initialX: 0, initialY: 0, initialWidth: 0, initialRotate: 0, initialMouseAngle: 0 });
    const rotateCenterRef = useRef({ x: 0, y: 0 });

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

    // Global Pointer Listeners for Drag/Resize/Rotate
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
            } else if (isRotating) {
                const currentMouseAngle = Math.atan2(e.clientY - rotateCenterRef.current.y, e.clientX - rotateCenterRef.current.x) * (180 / Math.PI);
                const angleDifference = currentMouseAngle - dragStartRef.current.initialMouseAngle;
                setLogoState(prev => ({
                    ...prev,
                    rotate: dragStartRef.current.initialRotate + angleDifference
                }));
            }
        };

        const handlePointerUp = () => {
            setIsDragging(false);
            setIsResizing(false);
            setIsRotating(false);
        };

        if (isDragging || isResizing || isRotating) {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        }

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isDragging, isResizing, isRotating]);

    const handleMockupSave = async () => {
        if (!containerRef.current) return;
        setIsSaving(true);

        try {
            // First we drop any active selections to prevent the blue box from being captured.
            setIsDragging(false);
            setIsResizing(false);
            setIsRotating(false);

            // Wait a brief moment for React bounds states to clear out DOM elements
            await new Promise(res => setTimeout(res, 50));

            const canvas = await html2canvas(containerRef.current, {
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                scale: 2 // Output higher resolution image
            });

            canvas.toBlob((blob) => {
                if (blob) {
                    const flatImageURL = URL.createObjectURL(blob);
                    onSave(flatImageURL);
                }
                setIsSaving(false);
            }, 'image/png');
        } catch (error) {
            console.error("Failed to flatten canvas mockup", error);
            setIsSaving(false);
        }
    };

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
                        onClick={handleMockupSave}
                        disabled={!garmentImage || !logoImage || isSaving}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
                    >
                        {isSaving ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                Rendering...
                            </>
                        ) : (
                            'Save Mockup'
                        )}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-black/5 dark:bg-white/5">
                {/* Canvas Area */}
                <div className="flex-1 relative overflow-hidden flex items-center justify-center p-0 md:p-4">
                    <div
                        ref={containerRef}
                        className="relative w-full h-full bg-transparent overflow-hidden flex items-center justify-center"
                    >
                        {!garmentImage ? (
                            <div className="absolute inset-0 flex items-center justify-center flex-col text-black/30 dark:text-white/30 p-10 text-center border-2 border-dashed border-black/10 dark:border-white/10 m-4 rounded-xl">
                                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <span className="text-sm font-bold uppercase tracking-wider">Garment Required</span>
                                <span className="text-xs mt-2 font-medium">Please upload a blank garment image using the controls on the right.</span>
                            </div>
                        ) : (
                            // Changed from object-cover to object-contain so we never crop the garment
                            <img src={garmentImage} alt="Garment" className="w-auto h-full max-w-full max-h-full object-contain pointer-events-none" />
                        )}

                        {garmentImage && logoImage && (
                            <div
                                style={{
                                    position: 'absolute',
                                    left: logoState.x,
                                    top: logoState.y,
                                    width: logoState.width,
                                    transform: `rotate(${logoState.rotate}deg)`,
                                    transformOrigin: 'center center',
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
                                        dragStartRef.current = { x: e.clientX, y: e.clientY, initialX: logoState.x, initialY: logoState.y, initialWidth: logoState.width, initialRotate: logoState.rotate, initialMouseAngle: 0 };
                                        e.stopPropagation();
                                    }}
                                    className="absolute inset-0 border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500/10"
                                >
                                    {/* Rotate Handle (Top Right) */}
                                    <div
                                        onPointerDown={(e) => {
                                            setIsRotating(true);
                                            setIsDragging(false);
                                            dragStartRef.current = { x: e.clientX, y: e.clientY, initialX: logoState.x, initialY: logoState.y, initialWidth: logoState.width, initialRotate: logoState.rotate, initialMouseAngle: 0 };

                                            // Calculate the center of the logo for rotation math
                                            const rect = (e.target as HTMLElement).parentElement?.getBoundingClientRect();
                                            if (rect) {
                                                const centerX = rect.left + rect.width / 2;
                                                const centerY = rect.top + rect.height / 2;
                                                // Store the initial angle of the mouse click relative to the center
                                                rotateCenterRef.current = { x: centerX, y: centerY };
                                                const initialAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
                                                dragStartRef.current.initialMouseAngle = initialAngle;
                                            }
                                            e.stopPropagation();
                                        }}
                                        className="absolute -top-3 -right-3 w-6 h-6 bg-white border-2 border-blue-500 rounded-full cursor-grab shadow-sm flex items-center justify-center text-blue-500 hover:scale-110 transition-transform"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                    </div>

                                    {/* Resize Handle (Bottom Right) */}
                                    <div
                                        onPointerDown={(e) => {
                                            setIsResizing(true);
                                            setIsDragging(false); // don't drag while resizing
                                            dragStartRef.current = { x: e.clientX, y: e.clientY, initialX: logoState.x, initialY: logoState.y, initialWidth: logoState.width, initialRotate: logoState.rotate, initialMouseAngle: 0 };
                                            e.stopPropagation();
                                        }}
                                        className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-nwse-resize shadow-sm hover:scale-125 transition-transform"
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

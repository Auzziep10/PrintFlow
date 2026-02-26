'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { v4 as uuidv4 } from 'uuid';

// Standard DTF Film width is 22 inches, but we use a padding margin so usable width is ~22"
const CANVAS_WIDTH_INCHES = 22;
const CANVAS_PIXELS_PER_INCH = 30; // Scale factor for rendering the visual DOM (22 * 30 = 660px wide canvas)
const CANVAS_WIDTH_PX = CANVAS_WIDTH_INCHES * CANVAS_PIXELS_PER_INCH;

interface ArtworkInstance {
    id: string;
    url: string;
    width: number;
    height: number;
    x: number;
    y: number;
}

export default function GangsheetBuilderApp() {
    const [artworks, setArtworks] = useState<ArtworkInstance[]>([]);
    const [canvasHeightInches, setCanvasHeightInches] = useState(24); // Starting with 2ft min
    const canvasRef = useRef<HTMLDivElement>(null);

    // Dynamic Canvas Height Based on the longest placed item.
    useEffect(() => {
        let maxBottom = 0;
        artworks.forEach(art => {
            const bottom = art.y + art.height;
            if (bottom > maxBottom) maxBottom = bottom;
        });

        // Convert bottom px back to inches. If they hit the bottom edge, extend canvas by 12 inches
        const newMaxInches = Math.max(24, Math.ceil(maxBottom / CANVAS_PIXELS_PER_INCH));
        if (newMaxInches > canvasHeightInches - 5) { // Leave a buffer
            setCanvasHeightInches(newMaxInches + 12);
        }
    }, [artworks]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const url = event.target?.result as string;
            if (!url) return;

            // Load an image dom element quickly to grab intrinsic width/height ratio
            const img = new Image();
            img.onload = () => {
                const ratio = img.height / img.width;
                // Default drop width: 10 inches -> Pixels
                const dropWidthInches = 10;
                const dropWidthPx = dropWidthInches * CANVAS_PIXELS_PER_INCH;
                const dropHeightPx = dropWidthPx * ratio;

                setArtworks(prev => [...prev, {
                    id: uuidv4(),
                    url: url,
                    width: dropWidthPx,
                    height: dropHeightPx,
                    x: 20, // Default drop near top left
                    y: 20
                }]);
            };
            img.src = url;
        };
        reader.readAsDataURL(file);
    };

    const updateArtwork = (id: string, updates: Partial<ArtworkInstance>) => {
        setArtworks(prev => prev.map(art => art.id === id ? { ...art, ...updates } : art));
    };

    const removeArtwork = (id: string) => {
        setArtworks(prev => prev.filter(art => art.id !== id));
    };

    const duplicateArtwork = (art: ArtworkInstance) => {
        setArtworks(prev => [...prev, {
            ...art,
            id: uuidv4(),
            x: art.x + 20, // Offset it slightly so they can tell it duplicated
            y: art.y + 20
        }]);
    };

    const duplicateArtworkMultiple = (artToDuplicate: ArtworkInstance, count: number) => {
        if (count <= 0) return;
        const newArtworks: ArtworkInstance[] = [];
        for (let i = 0; i < count; i++) {
            newArtworks.push({
                ...artToDuplicate,
                id: uuidv4(),
                // shift them slightly right and down each time to avoid burying them perfectly, but wrap them around if going off canvas
                x: Math.min((artToDuplicate.x + ((i + 1) * 20)) % (CANVAS_WIDTH_PX - artToDuplicate.width), CANVAS_WIDTH_PX - artToDuplicate.width),
                y: artToDuplicate.y + ((i + 1) * 20)
            });
        }
        setArtworks(prev => [...prev, ...newArtworks]);
    };

    const handleExactResize = (id: string, newInches: number, dimension: 'width' | 'height') => {
        if (newInches <= 0 || isNaN(newInches)) return;

        setArtworks(prev => prev.map(art => {
            if (art.id !== id) return art;

            const currentRatio = art.width / art.height;
            let newWidthPx, newHeightPx;

            if (dimension === 'width') {
                newWidthPx = newInches * CANVAS_PIXELS_PER_INCH;
                newHeightPx = newWidthPx / currentRatio;
            } else {
                newHeightPx = newInches * CANVAS_PIXELS_PER_INCH;
                newWidthPx = newHeightPx * currentRatio;
            }

            return {
                ...art,
                width: newWidthPx,
                height: newHeightPx,
                // Clamp position to not overflow right side when expanding
                x: Math.min(art.x, CANVAS_WIDTH_PX - newWidthPx)
            };
        }));
    };

    return (
        <div className="h-screen w-full bg-[var(--background)] flex overflow-hidden font-sans">

            {/* Main Canvas Area */}
            <main className="flex-1 h-full overflow-y-auto bg-black/5 dark:bg-white/5 relative p-8 pb-32 flex justify-center">

                {/* The "Film Roll" */}
                <div
                    ref={canvasRef}
                    className="bg-white shadow-xl relative mt-10 transition-all duration-300 ease-in-out border border-black/10"
                    style={{
                        width: `${CANVAS_WIDTH_PX}px`,
                        height: `${canvasHeightInches * CANVAS_PIXELS_PER_INCH}px`,
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)`,
                        backgroundSize: '15px 15px'
                    }}
                >
                    {/* Top Tape Identifier */}
                    <div className="absolute top-0 left-0 w-full h-8 bg-black/5 flex items-center justify-between px-4 border-b border-black/10 pointer-events-none select-none">
                        <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">DTF Film Header</span>
                        <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Width: {CANVAS_WIDTH_INCHES}"</span>
                    </div>

                    {artworks.map((art) => (
                        <Rnd
                            key={art.id}
                            size={{ width: art.width, height: art.height }}
                            position={{ x: art.x, y: art.y }}
                            onDragStop={(e, d) => { updateArtwork(art.id, { x: d.x, y: d.y }) }}
                            onResizeStop={(e, direction, ref, delta, position) => {
                                updateArtwork(art.id, {
                                    width: parseInt(ref.style.width, 10),
                                    height: parseInt(ref.style.height, 10),
                                    ...position,
                                });
                            }}
                            bounds="parent"
                            lockAspectRatio={true}
                            className="group cursor-move border hover:border-blue-500 hover:shadow-lg transition-shadow active:cursor-grabbing"
                            dragHandleClassName="drag-handle"
                        >
                            {/* Hover Controls */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 text-white p-1.5 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 pointer-events-none group-hover:pointer-events-auto">
                                <button onClick={() => duplicateArtwork(art)} className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-md transition-colors" title="Duplicate">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                </button>
                                <button onClick={() => removeArtwork(art.id)} className="w-6 h-6 flex items-center justify-center hover:bg-red-500 text-red-400 hover:text-white rounded-md transition-colors" title="Delete">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>

                            {/* Dimensions Label */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white bg-black/60 px-2 py-0.5 rounded-md text-[10px] font-bold opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 shadow-sm pointer-events-none">
                                {(art.width / CANVAS_PIXELS_PER_INCH).toFixed(1)}" x {(art.height / CANVAS_PIXELS_PER_INCH).toFixed(1)}"
                            </div>

                            <div className="drag-handle w-full h-full p-2 bg-blue-500/10 group-hover:bg-transparent transition-colors">
                                <img src={art.url} alt="Placing Art" className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]" draggable={false} />
                            </div>
                        </Rnd>
                    ))}
                </div>

            </main>

            {/* Config Sidebar */}
            <aside className="w-80 h-full glass-panel border-l border-black/5 dark:border-white/5 shadow-2xl z-20 flex flex-col p-6 rounded-none">
                <div className="mb-6">
                    <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">Printflow Builder</h2>
                    <p className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40 mt-1">Direct-To-Film Gangsheet</p>
                </div>

                <div className="glass-panel p-4 rounded-2xl mb-6 shadow-sm">
                    <label className="w-full flex flex-col items-center justify-center py-8 border-2 border-dashed border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/5 transition-all rounded-xl cursor-pointer group">
                        <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                        </div>
                        <span className="text-sm font-bold text-black/70 dark:text-white/70 text-center">Upload Artwork<br /><span className="text-xs font-medium text-black/40">PNG, SVG (Min 300dpi)</span></span>
                        <input type="file" className="hidden" accept="image/png, image/svg+xml" onChange={handleImageUpload} />
                    </label>
                </div>

                <div className="flex-1 overflow-y-auto hidden-scrollbar pr-2 mb-6 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40 mb-2">Layers ({artworks.length})</h3>
                    {artworks.length === 0 ? (
                        <p className="text-sm text-black/50 dark:text-white/50 text-center py-4 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5">No layers yet.<br />Upload art to start building.</p>
                    ) : (
                        artworks.map((art, index) => (
                            <div key={art.id} className="flex flex-col gap-3 p-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl hover:bg-black/10 transition-colors">
                                <div className="flex items-center gap-3 w-full">
                                    <div className="w-12 h-12 bg-black/5 rounded-lg flex items-center justify-center p-1 shrink-0 overflow-hidden">
                                        <img src={art.url} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-xs font-bold truncate">Layer {index + 1}</p>
                                            <button onClick={() => removeArtwork(art.id)} className="w-5 h-5 flex items-center justify-center text-red-500/60 hover:text-red-500 transition-colors shrink-0">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-black/50 dark:text-white/50">
                                            <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded px-1.5 py-1">
                                                W: <input
                                                    type="number"
                                                    value={Number((art.width / CANVAS_PIXELS_PER_INCH).toFixed(2))}
                                                    onChange={(e) => handleExactResize(art.id, parseFloat(e.target.value), 'width')}
                                                    className="w-10 bg-transparent outline-none font-bold text-black dark:text-white hide-arrows"
                                                    step="0.1" min="0.1"
                                                />"
                                            </div>
                                            <span className="text-black/30 dark:text-white/30">x</span>
                                            <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded px-1.5 py-1">
                                                H: <input
                                                    type="number"
                                                    value={Number((art.height / CANVAS_PIXELS_PER_INCH).toFixed(2))}
                                                    onChange={(e) => handleExactResize(art.id, parseFloat(e.target.value), 'height')}
                                                    className="w-10 bg-transparent outline-none font-bold text-black dark:text-white hide-arrows"
                                                    step="0.1" min="0.1"
                                                />"
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5 mt-1">
                                    <span className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase tracking-widest">Duplicates</span>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        const input = e.currentTarget.elements.namedItem('copyCount') as HTMLInputElement;
                                        duplicateArtworkMultiple(art, parseInt(input.value, 10));
                                        input.value = '1';
                                    }} className="flex items-center gap-1">
                                        <input name="copyCount" type="number" defaultValue="1" min="1" max="50" className="w-12 h-6 text-xs font-bold text-center bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded" />
                                        <button type="submit" className="h-6 px-2 bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-bold rounded uppercase tracking-wider transition-colors">Add</button>
                                    </form>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="border-t border-black/10 dark:border-white/10 pt-6 mt-auto">
                    <div className="flex justify-between items-end mb-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40">Total Length</span>
                            <span className="text-2xl font-black">{canvasHeightInches}"</span>
                        </div>
                        <div className="flex flex-col text-right">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40">Est. Usage</span>
                            <span className="text-lg font-bold text-blue-500">{((canvasHeightInches / 24) * 100).toFixed(0)}% Roll</span>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[15px] font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
                        {/* Note: This button currently does nothing but placeholder UI */}
                        Submit Checkout
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                </div>
            </aside>
        </div>
    );
}

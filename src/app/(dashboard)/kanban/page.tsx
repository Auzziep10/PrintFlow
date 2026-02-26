'use client';

import React, { useState } from 'react';

// Mock data: distinct phases of production
const KANBAN_STAGES = [
    { id: 'quote', title: 'New Quotes', color: 'var(--status-quote)' },
    { id: 'art', title: 'Pending Art', color: 'var(--status-art)' },
    { id: 'prod', title: 'In Production', color: 'var(--status-prod)' },
    { id: 'shipped', title: 'Shipped', color: 'var(--status-shipped)' }
];

const mockJobs = [
    { id: 'ORD-001', title: 'Acme Corp Tees', stage: 'prod', date: 'Oct 25', items: '50x' },
    { id: 'ORD-002', title: 'High School Hoodies', stage: 'art', date: 'Oct 24', items: '120x' },
    { id: 'ORD-003', title: 'Stark Polos', stage: 'quote', date: 'Oct 23', items: '500x' },
    { id: 'ORD-004', title: 'Wayne Posters', stage: 'prod', date: 'Oct 26', items: '1000x' },
    { id: 'ORD-005', title: 'Local Gym Tanks', stage: 'art', date: 'Oct 28', items: '30x' },
    { id: 'ORD-006', title: 'Spring Festival', stage: 'shipped', date: 'Oct 20', items: '250x' },
    { id: 'ORD-007', title: 'Startup Merch', stage: 'quote', date: 'Oct 24', items: '100x' }
];

export default function KanbanPage() {
    const [jobs, setJobs] = useState(mockJobs);
    const [draggedJob, setDraggedJob] = useState<string | null>(null);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedJob(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // Necessary to allow dropping
    };

    const handleDrop = (e: React.DragEvent, stageId: string) => {
        e.preventDefault();
        if (!draggedJob) return;

        setJobs(jobs.map(job =>
            job.id === draggedJob ? { ...job, stage: stageId } : job
        ));
        setDraggedJob(null);
    };

    return (
        <div className="p-8 h-full mx-auto max-w-[1700px] flex flex-col">
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 px-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-black/90 dark:text-white/90">Production Kanban</h1>
                    <p className="text-sm font-medium text-black/50 dark:text-white/50 mt-1.5">Drag and drop orders across the workflow stages.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2.5 rounded-2xl glass-panel hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95 text-black/60 dark:text-white/60">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                    </button>
                    <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        New Job
                    </button>
                </div>
            </header>

            <div className="flex-1 flex gap-5 overflow-x-auto pb-4 custom-scrollbar">
                {KANBAN_STAGES.map(stage => {
                    const stageJobs = jobs.filter(j => j.stage === stage.id);

                    return (
                        <div
                            key={stage.id}
                            className="flex-shrink-0 w-80 glass-panel rounded-[2rem] p-5 flex flex-col transition-colors border border-transparent hover:border-black/5 dark:hover:border-white/5"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, stage.id)}
                        >
                            <div className="flex items-center justify-between mb-4 px-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: stage.color }}></div>
                                    <h3 className="font-bold text-black/80 dark:text-white/80">{stage.title}</h3>
                                </div>
                                <span className="text-xs font-bold text-black/40 dark:text-white/40 bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-full">{stageJobs.length}</span>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                                {stageJobs.map(job => (
                                    <div
                                        key={job.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, job.id)}
                                        className="p-4 rounded-[1.5rem] bg-white/60 dark:bg-black/40 backdrop-blur-md border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md hover:scale-[1.02] cursor-grab active:cursor-grabbing transition-all relative overflow-hidden group"
                                    >
                                        {/* Color Glow Overlay for specific cards based on current stage */}
                                        <div className="absolute top-0 right-0 w-16 h-16 rounded-full blur-xl -mr-8 -mt-8 opacity-10 transition-opacity group-hover:opacity-20" style={{ backgroundColor: stage.color }}></div>

                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold tracking-widest uppercase text-black/40 dark:text-white/40">{job.id}</span>
                                            <span className="text-xs font-medium text-black/40 dark:text-white/40">{job.date}</span>
                                        </div>
                                        <h4 className="font-semibold text-sm text-black/90 dark:text-white/90 relative z-10">{job.title}</h4>

                                        <div className="mt-4 flex items-center justify-between relative z-10">
                                            <span className="text-xs font-bold text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/5 px-2 py-1 rounded-lg">{job.items} items</span>
                                            <div className="w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-[10px] font-bold -mr-1 shadow-sm ring-1 ring-white dark:ring-black">
                                                {job.title.charAt(0)}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {stageJobs.length === 0 && (
                                    <div className="h-24 border-2 border-dashed border-black/10 dark:border-white/10 rounded-[1.5rem] flex items-center justify-center text-sm font-semibold text-black/30 dark:text-white/30">
                                        Drop here
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

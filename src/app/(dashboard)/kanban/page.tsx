'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
    const [selectedJob, setSelectedJob] = useState<string | null>(null);
    const [auditLogs, setAuditLogs] = useState<{ id: string, jobId: string, timestamp: Date, user: string, action: string, detail: string }[]>([
        { id: 'log1', jobId: 'ORD-001', timestamp: new Date(Date.now() - 86400000), user: 'System', action: 'Order Created', detail: 'Imported via API' },
        { id: 'log2', jobId: 'ORD-001', timestamp: new Date(Date.now() - 3600000), user: 'Alex (Manager)', action: 'Moved Stage', detail: 'Moved to Pending Art' },
    ]);

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

        const targetJob = jobs.find(j => j.id === draggedJob);
        if (!targetJob || targetJob.stage === stageId) {
            setDraggedJob(null);
            return;
        }

        const oldStageName = KANBAN_STAGES.find(s => s.id === targetJob.stage)?.title || 'Unknown';
        const newStageName = KANBAN_STAGES.find(s => s.id === stageId)?.title || 'Unknown';

        setJobs(jobs.map(job =>
            job.id === draggedJob ? { ...job, stage: stageId } : job
        ));

        // Append an Audit Log automatically
        setAuditLogs(prev => [...prev, {
            id: uuidv4(),
            jobId: draggedJob,
            timestamp: new Date(),
            user: 'You (Admin)',
            action: 'Changed Status',
            detail: `Moved from ${oldStageName} to ${newStageName}`
        }]);

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
                                        onClick={() => setSelectedJob(job.id)}
                                        className="p-4 rounded-[1.5rem] bg-white/60 dark:bg-black/40 backdrop-blur-md border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md hover:scale-[1.02] cursor-grab active:cursor-grabbing transition-all relative overflow-hidden group"
                                    >
                                        {/* Color Glow Overlay for specific cards based on current stage */}
                                        <div className="absolute top-0 right-0 w-16 h-16 rounded-full blur-xl -mr-8 -mt-8 opacity-10 transition-opacity group-hover:opacity-20" style={{ backgroundColor: stage.color }}></div>

                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold tracking-widest uppercase text-black/40 dark:text-white/40">{job.id}</span>
                                            <span className="text-xs font-medium text-black/40 dark:text-white/40">{job.date}</span>
                                        </div>
                                        <h4 className="font-semibold text-sm text-black/90 dark:text-white/90 relative z-10 pointer-events-none">{job.title}</h4>

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

            {/* Job Details Drawer (Audit Log Focus) */}
            {selectedJob && (() => {
                const job = jobs.find(j => j.id === selectedJob);
                const logs = auditLogs.filter(l => l.jobId === selectedJob).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
                if (!job) return null;

                return (
                    <div className="fixed inset-0 z-50 flex justify-end">
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSelectedJob(null)}></div>
                        <div className="w-full max-w-md bg-[var(--background)] h-full shadow-2xl relative z-10 flex flex-col border-l border-black/10 dark:border-white/10 animate-in slide-in-from-right duration-300">
                            {/* Drawer Header */}
                            <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-black/5 dark:bg-white/5">
                                <div>
                                    <p className="text-[10px] font-bold tracking-widest uppercase text-black/40 dark:text-white/40 mb-1">{job.id}</p>
                                    <h2 className="text-xl font-bold">{job.title}</h2>
                                </div>
                                <button onClick={() => setSelectedJob(null)} className="p-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 transition-colors rounded-full text-black/50 dark:text-white/50">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>

                            {/* Drawer Content */}
                            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl glass-panel">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40 block mb-1">Status</span>
                                        <span className="font-bold text-sm bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">{KANBAN_STAGES.find(s => s.id === job.stage)?.title}</span>
                                    </div>
                                    <div className="p-4 rounded-2xl glass-panel">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40 block mb-1">Quantity</span>
                                        <span className="font-bold text-sm bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">{job.items}</span>
                                    </div>
                                </div>

                                {/* Audit Log / History Feed */}
                                <div>
                                    <h3 className="text-sm font-bold tracking-widest uppercase text-black/40 dark:text-white/40 mb-4 border-b border-black/5 dark:border-white/5 pb-2">Activity Log & Audit Trail</h3>

                                    {logs.length === 0 ? (
                                        <p className="text-sm text-black/40 dark:text-white/40 text-center py-4">No audit logs available for this job.</p>
                                    ) : (
                                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-black/10 dark:before:via-white/10 before:to-transparent pt-2">
                                            {logs.map((log, index) => (
                                                <div key={log.id} className="relative flex items-start gap-4 p-4 rounded-2xl glass-panel bg-white/40 dark:bg-black/40 transition-shadow hover:shadow-md animate-in fade-in slide-in-from-bottom-2">
                                                    <div className="absolute -left-1.5 top-5 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_0_4px_var(--background)] z-10 hidden md:block"></div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1 gap-2">
                                                            <p className="text-xs font-bold truncate text-black dark:text-white">{log.action}</p>
                                                            <time className="text-[10px] font-bold uppercase tracking-wider text-black/40 dark:text-white/40 whitespace-nowrap shrink-0">{log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} &bull; {log.timestamp.toLocaleDateString()}</time>
                                                        </div>
                                                        <p className="text-sm text-black/70 dark:text-white/70 leading-snug mb-2">{log.detail}</p>
                                                        <div className="flex items-center gap-1.5 mt-2">
                                                            <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[8px] font-black uppercase">{log.user.charAt(0)}</div>
                                                            <span className="text-[10px] font-bold text-black/40 dark:text-white/40">By {log.user}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

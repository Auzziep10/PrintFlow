'use client';

import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, parseISO } from 'date-fns';

// Mock data: production schedule
const scheduledJobs = [
    { id: 'ORD-001', title: 'Acme Corp Tees', date: new Date().toISOString(), status: 'In Production', color: 'var(--status-prod)' },
    { id: 'ORD-002', title: 'High School Hoodies', date: new Date().toISOString(), status: 'Pending Art', color: 'var(--status-art)' },
    { id: 'ORD-003', title: 'Stark Polos', date: addDays(new Date(), 2).toISOString(), status: 'New Quote', color: 'var(--status-quote)' },
    { id: 'ORD-004', title: 'Wayne Posters', date: addDays(new Date(), 5).toISOString(), status: 'In Production', color: 'var(--status-prod)' },
    { id: 'ORD-005', title: 'Local Gym Tanks', date: addDays(new Date(), 5).toISOString(), status: 'Pending Art', color: 'var(--status-art)' },
];

export default function CalendarPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
        const cloneDay = day;

        // Find jobs for this day
        const dayJobs = scheduledJobs.filter(job => isSameDay(parseISO(job.date), cloneDay));

        days.push(
            <div
                key={day.toString()}
                onClick={() => setSelectedDate(cloneDay)}
                className={`min-h-[120px] p-3 border-r border-b border-black/5 dark:border-white/5 transition-all cursor-pointer relative overflow-hidden group
          ${!isSameMonth(day, monthStart) ? 'bg-black/[0.02] dark:bg-white/[0.02] text-black/30 dark:text-white/30' : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'}
          ${isSameDay(day, selectedDate) ? 'bg-blue-500/5 dark:bg-blue-500/10 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.5)]' : ''}
        `}
            >
                <span className={`text-sm font-semibold flex items-center justify-center w-7 h-7 rounded-full mb-2
          ${isSameDay(day, new Date()) ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30' : ''}
          ${isSameDay(day, selectedDate) && !isSameDay(day, new Date()) ? 'bg-black/10 dark:bg-white/10' : ''}
        `}>
                    {format(day, 'd')}
                </span>

                {/* Render Badges */}
                <div className="space-y-1 mt-1">
                    {dayJobs.slice(0, 3).map(job => (
                        <div key={job.id}
                            className="text-[10px] font-bold px-2 py-1 rounded border overflow-hidden text-ellipsis whitespace-nowrap"
                            style={{ backgroundColor: `color-mix(in srgb, ${job.color} 10%, transparent)`, color: job.color, borderColor: `color-mix(in srgb, ${job.color} 20%, transparent)` }}
                        >
                            {job.title}
                        </div>
                    ))}
                    {dayJobs.length > 3 && (
                        <div className="text-[10px] font-bold text-black/40 dark:text-white/40 px-2 py-0.5">+ {dayJobs.length - 3} more</div>
                    )}
                </div>
            </div>
        );
        day = addDays(day, 1);
    }

    // Selected date's agenda
    const selectedDayJobs = scheduledJobs.filter(job => isSameDay(parseISO(job.date), selectedDate));

    return (
        <div className="p-8 h-full mx-auto max-w-[1600px] flex gap-6">

            {/* Main Calendar Grid */}
            <div className="flex-1 glass-panel rounded-[2.5rem] p-6 flex flex-col h-[calc(100vh-4rem)]">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 px-2">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-black/90 dark:text-white/90">
                            {format(currentMonth, 'MMMM yyyy')}
                        </h1>
                        <p className="text-sm font-medium text-black/50 dark:text-white/50 mt-1.5">Production Schedule</p>
                    </div>
                    <div className="flex items-center gap-2 bg-black/5 dark:bg-white/10 p-1 rounded-2xl">
                        <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-white dark:hover:bg-black hover:shadow-sm transition-all text-black/60 dark:text-white/60">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                        <button onClick={() => setCurrentMonth(new Date())} className="px-4 py-2 text-sm font-bold rounded-xl hover:bg-white dark:hover:bg-black hover:shadow-sm transition-all text-black/80 dark:text-white/80">
                            Today
                        </button>
                        <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-white dark:hover:bg-black hover:shadow-sm transition-all text-black/60 dark:text-white/60">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                </div>

                {/* Days Header */}
                <div className="grid grid-cols-7 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(dayName => (
                        <div key={dayName} className="text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40 text-center pb-4">
                            {dayName}
                        </div>
                    ))}
                </div>

                {/* Grid */}
                <div className="flex-1 grid grid-cols-7 border-t border-l border-black/5 dark:border-white/5 rounded-2xl overflow-hidden bg-white/40 dark:bg-black/20">
                    {days}
                </div>
            </div>

            {/* Daily Agenda Pane */}
            <div className="w-[380px] hidden xl:flex flex-col glass-panel rounded-[2.5rem] p-8 h-[calc(100vh-4rem)]">
                <h2 className="text-xl font-bold tracking-tight mb-2">Agenda</h2>
                <p className="text-sm font-medium text-blue-500 mb-8">{format(selectedDate, 'EEEE, MMMM do')}</p>

                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    {selectedDayJobs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-center px-4">
                            <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-3 text-black/30 dark:text-white/30">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <p className="text-sm font-semibold text-black/60 dark:text-white/60">No jobs scheduled.</p>
                            <p className="text-xs text-black/40 dark:text-white/40 mt-1">Enjoy the clear day, or drag unscheduled orders here.</p>
                        </div>
                    ) : (
                        selectedDayJobs.map((job, idx) => (
                            <div key={job.id + idx} className="p-4 rounded-[1.5rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 relative overflow-hidden group hover:border-black/10 dark:hover:border-white/20 transition-all cursor-pointer">
                                <div className="absolute top-0 right-0 w-16 h-16 rounded-full blur-xl -mr-8 -mt-8 opacity-20" style={{ backgroundColor: job.color }}></div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `color-mix(in srgb, ${job.color} 10%, transparent)`, color: job.color }}>
                                        {job.status}
                                    </span>
                                    <span className="text-xs font-bold text-black/40 dark:text-white/40">{job.id}</span>
                                </div>
                                <h3 className="font-semibold text-sm text-black/90 dark:text-white/90 relative z-10">{job.title}</h3>
                                <div className="mt-3 flex gap-2 relative z-10">
                                    <button className="text-[11px] font-bold bg-white dark:bg-black px-3 py-1.5 rounded-lg shadow-sm hover:scale-105 transition-transform flex items-center gap-1.5">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                        View Order
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <button className="mt-6 w-full py-3 bg-black/90 dark:bg-white/10 hover:bg-black dark:hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Schedule Job
                </button>
            </div>

        </div>
    );
}

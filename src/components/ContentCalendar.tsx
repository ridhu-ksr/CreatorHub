import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { ContentProject, PlatformId } from '../types';
import { getPlatformIcon, getPlatformName, getPlatformBadgeColor } from '../utils/platformHelpers';

interface ContentCalendarProps {
  projects: ContentProject[];
  onSelectProject: (p: ContentProject) => void;
  onNewProject: () => void;
}

export const ContentCalendar: React.FC<ContentCalendarProps> = ({
  projects,
  onSelectProject,
  onNewProject
}) => {
  const [currentMonth, setCurrentMonth] = useState('October 2026');

  // Days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Mock a 35-day grid for calendar visualization
  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-10-${dayNum.toString().padStart(2, '0')}`;
    const dayProjects = projects.filter(p => p.scheduledDate === dateStr);
    const isToday = dayNum === 14;

    // Peak recommendation windows
    const hasOptimalWindow = [2, 4, 9, 11, 16, 18, 23, 25].includes(dayNum);

    return {
      dayNum,
      dateStr,
      projects: dayProjects,
      isToday,
      hasOptimalWindow
    };
  });

  return (
    <div className="space-y-6 font-sans pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <CalendarIcon className="h-4 w-4" /> Multi-Platform Scheduling
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">Peak Audience Windows Highlighted</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Content Calendar
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Synchronized publishing schedule across YouTube, Instagram, TikTok, X, and LinkedIn.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#0c0e18] border border-white/10 p-1.5 rounded-xl text-xs font-bold text-white">
            <button className="p-1 hover:bg-white/10 rounded"><ChevronLeft className="h-4 w-4 text-slate-400" /></button>
            <span className="px-2">{currentMonth}</span>
            <button className="p-1 hover:bg-white/10 rounded"><ChevronRight className="h-4 w-4 text-slate-400" /></button>
          </div>

          <button
            onClick={onNewProject}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:opacity-95 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Schedule Post</span>
          </button>
        </div>
      </div>

      {/* Best Posting Times Tip Banner */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-950/30 to-indigo-950/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-4 w-4 text-cyan-400 shrink-0" />
          <span className="text-slate-300">
            <strong className="text-white">Smart Posting Recommendation: </strong>
            Your audience displays peak retention velocity on <strong className="text-cyan-300">Tuesdays & Thursdays at 18:00</strong>.
          </span>
        </div>
        <span className="text-cyan-400 font-mono text-[11px] shrink-0">Algorithmically Verified</span>
      </div>

      {/* Calendar Grid Container */}
      <div className="rounded-2xl border border-white/10 bg-[#0b0d18] overflow-hidden p-4">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {daysOfWeek.map(d => (
            <div key={d} className="py-1">{d}</div>
          ))}
        </div>

        {/* 31-day cells */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day) => (
            <div
              key={day.dayNum}
              className={`min-h-[110px] rounded-xl border p-2 flex flex-col justify-between transition ${
                day.isToday
                  ? 'border-cyan-500/60 bg-cyan-500/10'
                  : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${day.isToday ? 'text-cyan-300 font-black' : 'text-slate-400'}`}>
                  {day.dayNum} {day.isToday && '(Today)'}
                </span>

                {day.hasOptimalWindow && (
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" title="Optimal Peak Audience Window" />
                )}
              </div>

              {/* Day scheduled projects */}
              <div className="space-y-1 my-1 overflow-y-auto max-h-[65px]">
                {day.projects.map(p => (
                  <div
                    key={p.id}
                    onClick={() => onSelectProject(p)}
                    className="group rounded-md border border-white/10 bg-white/[0.04] p-1 text-left cursor-pointer hover:border-cyan-400/50 transition"
                  >
                    <div className="flex items-center gap-1">
                      {p.targetPlatforms[0] && getPlatformIcon(p.targetPlatforms[0], 'w-2.5 h-2.5')}
                      <span className="text-[10px] font-medium text-white truncate block">
                        {p.title}
                      </span>
                    </div>
                    {p.scheduledTime && (
                      <span className="text-[9px] text-cyan-400 font-mono block">
                        {p.scheduledTime}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-right">
                {day.projects.length === 0 && day.hasOptimalWindow && (
                  <span className="text-[9px] text-slate-500 italic">Peak slot open</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiLocationMarker, HiClock, HiCheckCircle, HiExclamationCircle, HiPlay, HiChevronDown, HiSparkles, HiClipboardList } from 'react-icons/hi';

export default function IncidentCard({ incident, onStatusChange }) {
  const [expanded, setExpanded] = useState(false);

  // Styling helper for severity badges
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'High':
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      case 'Medium':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border border-slate-500/30';
    }
  };

  // Styling helper for status badge
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-500/10 text-green-400 border border-green-500/20';
      case 'In Progress':
        return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
      default:
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    }
  };

  // Helper for dynamic card glowing left-border matching severity
  const getCardBorderGlow = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'border-l-4 border-l-red-500';
      case 'High':
        return 'border-l-4 border-l-amber-500';
      case 'Medium':
        return 'border-l-4 border-l-blue-500';
      default:
        return 'border-l-4 border-l-slate-500';
    }
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -4, scale: 1.005 }}
      className={`w-full rounded-2xl glass-panel border border-slate-800/80 transition-all duration-300 hover:shadow-lg hover:shadow-violet-950/10 ${getCardBorderGlow(incident.severity)}`}
    >
      {/* Upper Main Card Part */}
      <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Side: Category, Title & Store */}
        <div className="flex-1 space-y-2.5 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full tracking-wider">
              {incident.category}
            </span>
            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider ${getSeverityStyle(incident.severity)}`}>
              {incident.severity}
            </span>
          </div>

          <h3 className="font-display font-bold text-base sm:text-lg text-slate-100 tracking-wide line-clamp-1">
            {incident.title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <HiLocationMarker className="w-4 h-4 text-violet-400 shrink-0" />
              <span>{incident.store}</span>
            </div>
            <div className="flex items-center gap-1">
              <HiClock className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Reported {incident.reportedTime}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Status and Expand controls */}
        <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 border-slate-800/60 pt-3 md:pt-0">
          
          {/* Quick status picker drop down */}
          <div className="flex flex-col items-start md:items-end">
            <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest mb-1">
              Workflow Status
            </span>
            <select
              value={incident.status}
              onChange={(e) => onStatusChange(incident.id, e.target.value)}
              className={`text-xs font-bold px-3 py-1 rounded-xl focus:outline-none cursor-pointer border hover:opacity-90 transition-all appearance-none pr-6 relative ${getStatusStyle(incident.status)}`}
              style={{
                background: 'rgba(15, 23, 42, 0.4)',
                backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27%23a78bfa%27%3E%3Cpath d=%27M7 10l5 5 5-5z%27/%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 4px center',
                backgroundSize: '16px'
              }}
            >
              <option value="Open" className="bg-slate-900 text-amber-400 font-bold">Open</option>
              <option value="In Progress" className="bg-slate-900 text-cyan-400 font-bold">In Progress</option>
              <option value="Resolved" className="bg-slate-900 text-green-400 font-bold">Resolved</option>
            </select>
          </div>

          {/* Details toggle button */}
          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-violet-500/30 transition-all cursor-pointer mt-4 md:mt-0 flex items-center gap-1.5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xs font-medium">Details</span>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <HiChevronDown className="w-4 h-4 text-violet-400" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Expanded drawer for description, action steps, AI diagnostic */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-800/80 bg-slate-950/40 rounded-b-2xl"
          >
            <div className="p-5 space-y-4 text-left">
              {/* Description paragraph */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-display">
                  Incident Description
                </span>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {incident.description}
                </p>
              </div>

              {/* Grid: AI Assist & Action Plan */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                {/* AI Assistant Diagnostics Card */}
                {incident.aiSummary && (
                  <div className="p-4.5 rounded-xl bg-violet-600/5 border border-violet-500/15 flex flex-col gap-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full filter blur-xl pointer-events-none" />
                    <div className="flex items-center gap-1.5 text-violet-400 font-semibold text-xs">
                      <HiSparkles className="w-4.5 h-4.5 text-violet-400 animate-pulse" />
                      <span className="font-display tracking-wide">AI Co-Pilot Diagnosis</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed italic">
                      "{incident.aiSummary}"
                    </p>
                  </div>
                )}

                {/* Recommended Action Checklist */}
                {incident.actionPlan && (
                  <div className="p-4.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-slate-300 font-semibold text-xs">
                      <HiClipboardList className="w-4.5 h-4.5 text-cyan-400" />
                      <span className="font-display tracking-wide">Recommended Recovery Playbook</span>
                    </div>
                    <ul className="space-y-1.5">
                      {incident.actionPlan.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

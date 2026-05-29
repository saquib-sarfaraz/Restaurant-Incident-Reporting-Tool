import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiLocationMarker, HiClock, HiCheckCircle, HiUserCircle, HiChevronDown, HiSparkles, HiClipboardCheck } from 'react-icons/hi';

export default function IncidentCard({ incident, onStatusChange }) {
  const [expanded, setExpanded] = useState(false);

  // Status Styling Utilities
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-emerald-500/10 text-emerald-555 dark:text-emerald-400 border-emerald-500/25';
      case 'In Progress':
        return 'bg-cyan-500/10 text-cyan-555 dark:text-cyan-400 border-cyan-500/25';
      case 'Under Review':
        return 'bg-indigo-500/10 text-indigo-555 dark:text-indigo-400 border-indigo-500/25';
      default:
        return 'bg-amber-500/10 text-amber-555 dark:text-amber-400 border-amber-500/25';
    }
  };

  // Severity Styling Utilities
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500/10 text-red-555 dark:text-red-400 border border-red-500/20';
      case 'High':
        return 'bg-amber-500/10 text-amber-555 dark:text-amber-400 border border-amber-500/20';
      case 'Medium':
        return 'bg-indigo-500/10 text-indigo-555 dark:text-indigo-400 border border-indigo-500/20';
      default:
        return 'bg-bg-saas border border-border-saas text-text-muted';
    }
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      className="w-full rounded-2xl bg-card-saas border border-border-saas hover:border-[#6366F1]/25 transition-all duration-300 shadow-sm overflow-hidden"
    >
      {/* Upper Log Bar */}
      <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Category, Title & Store details */}
        <div className="flex-1 space-y-2.5 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] font-extrabold uppercase bg-bg-saas border border-border-saas text-text-muted px-2.5 py-0.5 rounded-full tracking-wider font-mono">
              {incident.id}
            </span>
            <span className="text-[9px] font-extrabold uppercase bg-bg-saas/40 border border-border-saas text-text-main px-2.5 py-0.5 rounded-full tracking-wider">
              {incident.category}
            </span>
            <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider ${getSeverityStyle(incident.severity)}`}>
              {incident.severity}
            </span>
          </div>

          <h4 className="font-display font-bold text-text-main text-sm sm:text-base tracking-wide line-clamp-1">
            {incident.title}
          </h4>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-text-muted">
            <div className="flex items-center gap-1.5">
              <HiLocationMarker className="w-4 h-4 text-[#6366F1] shrink-0" />
              <span>{incident.store}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HiClock className="w-4 h-4 text-text-muted/70 shrink-0" />
              <span>Reported {incident.reportedTime}</span>
            </div>
          </div>
        </div>

        {/* Right: Assigned Manager, Workflow status & expandable controls */}
        <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-border-saas pt-3.5 md:pt-0">
          
          {/* Status badge */}
          <div className="text-left md:text-right">
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest block mb-1">
              Workflow Status
            </span>
            <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${getStatusStyle(incident.status)}`}>
              {incident.status}
            </span>
          </div>

          {/* Toggle details drawer */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-xl bg-bg-saas border border-border-saas text-text-muted hover:text-text-main cursor-pointer flex items-center gap-1 mt-3 md:mt-0 transition-all hover:border-[#6366F1]/20 hover:bg-surface-saas"
          >
            <span className="text-[11px] font-bold">Details</span>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.15 }}>
              <HiChevronDown className="w-4 h-4 text-[#6366F1]" />
            </motion.div>
          </button>
        </div>

      </div>

      {/* Expandable drawers panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border-saas bg-bg-saas/20"
          >
            <div className="p-5 space-y-5 text-left">
              
              {/* Detailed Description */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest block font-display">
                  Incident description report
                </span>
                <p className="text-xs sm:text-sm text-text-main leading-relaxed font-sans font-medium">
                  {incident.description}
                </p>
              </div>

              {/* Progress timeline visual progress indicators */}
              <div className="space-y-3 pt-3 border-t border-border-saas">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest block font-display">
                  Incident Progression Timeline
                </span>
                
                {/* Horizontal timelines */}
                <div className="flex items-center justify-between w-full max-w-xl mt-4 relative before:absolute before:left-3 before:right-3 before:top-2.5 before:h-[2px] before:bg-border-saas">
                  {["Reported", "Under Review", "In Progress", "Resolved"].map((step, idx) => {
                    const isCompleted = incident.status === 'Resolved' || 
                      (incident.status === 'In Progress' && step !== 'Resolved') ||
                      (incident.status === 'Under Review' && (step === 'Reported' || step === 'Under Review')) ||
                      (incident.status === 'Open' && step === 'Reported');
                    
                    const isActive = (incident.status === step) || (incident.status === 'Open' && step === 'Reported');

                    return (
                      <div key={step} className="flex flex-col items-center relative z-10 text-[9px] sm:text-[10px]">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[9px] transition-all duration-300 ${
                          isActive 
                            ? 'bg-[#6366F1] text-white border-[#6366F1]/30 shadow-md shadow-indigo-900/30' 
                            : isCompleted 
                              ? 'bg-bg-saas text-[#6366F1] border-border-saas' 
                              : 'bg-card-saas text-text-muted border-border-saas'
                        }`}>
                          {isCompleted ? "✓" : idx + 1}
                        </div>
                        <span className={`mt-1.5 font-bold ${
                          isActive ? 'text-[#6366F1]' : isCompleted ? 'text-text-main' : 'text-text-muted'
                        }`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sub-grid of Coordinator & AI highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-border-saas">
                {/* Coordinator notes */}
                {incident.resolutionNotes && (
                  <div className="p-4 rounded-xl bg-bg-saas/40 border border-border-saas text-left space-y-1">
                    <div className="flex items-center gap-1.5 text-cyan-550 dark:text-cyan-400 font-bold text-xs font-display">
                      <HiUserCircle className="w-4 h-4 text-cyan-500" />
                      <span>Manager Resolution Log</span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed font-medium font-sans">
                      {incident.resolutionNotes}
                    </p>
                    <span className="text-[10px] text-text-muted block pt-1.5">
                      Assigned Manager: <strong className="text-text-main">{incident.assignedManager || "Unassigned"}</strong>
                    </span>
                  </div>
                )}

                {/* AI Summary diagnostics */}
                {incident.aiSummary && (
                  <div className="p-4 rounded-xl bg-[#6366F1]/5 border border-[#6366F1]/10 text-left space-y-1 relative">
                    <div className="flex items-center gap-1.5 text-[#6366F1] font-bold text-xs font-display">
                      <HiSparkles className="w-4 h-4 text-[#6366F1] animate-pulse" />
                      <span>Co-Pilot Diagnostic Analysis</span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed font-sans italic">
                      "{incident.aiSummary}"
                    </p>
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

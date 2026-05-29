import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiX, HiUser, HiMail, HiLocationMarker, HiCalendar, 
  HiSparkles, HiTrendingUp, HiCog, HiPencilAlt, HiOutlineLogout 
} from 'react-icons/hi';

export default function ProfileDrawer({ isOpen, onClose, profile, userRole, onLogout, theme, setTheme }) {
  if (!isOpen) return null;

  // Choose display items depending on userRole
  const isManager = userRole === 'manager';

  return (
    <>
      {/* 1. Backdrop Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 transition-all cursor-pointer"
      />

      {/* 2. Slide-over Panel (380px width on desktop) */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[380px] bg-surface-saas/95 backdrop-blur-2xl border-l border-border-saas shadow-2xl p-6 flex flex-col justify-between overflow-y-auto text-left"
      >
        
        {/* Top Control Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-saas">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border border-indigo-500/25 px-2 py-0.5 rounded font-mono font-bold">
              {isManager ? "OPS CONTROL" : "STORE WORKER"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-bg-saas text-text-muted hover:text-text-main transition-all cursor-pointer"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section (flex-1 for scroll) */}
        <div className="flex-1 space-y-6 mt-6 pr-1">
          
          {/* Avatar and Primary Details */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-border-saas bg-bg-saas p-1">
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute bottom-1 right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border border-surface-saas"></span>
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="font-display font-black text-xl text-text-main tracking-tight">
                {profile.name}
              </h2>
              <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-widest block font-mono">
                {profile.role}
              </span>
              <div className="flex items-center justify-center gap-1.5 text-xs text-text-muted mt-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>Online</span>
              </div>
            </div>

            {/* Profile control panel actions */}
            <div className="flex items-center gap-2 w-full pt-1">
              <button className="flex-1 py-1.5 rounded-lg bg-bg-saas border border-border-saas text-text-muted hover:text-text-main hover:bg-surface-saas text-[10px] font-bold font-display cursor-pointer transition-all flex items-center justify-center gap-1.5">
                <HiPencilAlt className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
              <button className="flex-1 py-1.5 rounded-lg bg-bg-saas border border-border-saas text-text-muted hover:text-text-main hover:bg-surface-saas text-[10px] font-bold font-display cursor-pointer transition-all flex items-center justify-center gap-1.5">
                <HiCog className="w-3.5 h-3.5" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Details Deck */}
          <div className="p-4 rounded-xl bg-bg-saas/50 border border-border-saas space-y-2.5 text-xs text-text-muted font-sans">
            <div className="flex items-center gap-2.5 min-w-0">
              <HiUser className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
              <span className="truncate">
                {isManager ? "Manager ID" : "Employee ID"}: <strong className="text-text-main">{profile.id}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2.5 min-w-0">
              <HiMail className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
              <span className="truncate">{profile.email}</span>
            </div>
            <div className="flex items-center gap-2.5 min-w-0">
              <HiLocationMarker className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
              <span className="truncate">
                {isManager ? "Region" : "Store"}: <strong className="text-text-main">{isManager ? profile.region : profile.store}</strong>
              </span>
            </div>
            {isManager && (
              <div className="flex items-center gap-2.5 min-w-0">
                <HiLocationMarker className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                <span className="truncate">
                  Stores Managed: <strong className="text-text-main">{profile.storesManaged}</strong>
                </span>
              </div>
            )}
            <div className="flex items-center gap-2.5 min-w-0">
              <HiCalendar className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
              <span className="truncate">
                Joined: <strong className="text-text-main">{profile.joinDate}</strong>
              </span>
            </div>
          </div>

          {/* Statistics Grid Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-text-muted">
              <HiTrendingUp className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <h3 className="font-display font-extrabold text-[10px] uppercase tracking-wider text-text-muted">
                Performance Telemetry
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {isManager ? (
                <>
                  <div className="p-3 rounded-xl bg-card-saas border border-border-saas text-left">
                    <span className="text-[10px] text-text-muted font-medium block">Total Managed</span>
                    <strong className="text-text-main text-sm font-display font-black">{profile.metrics.totalIncidents}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-card-saas border border-border-saas text-left">
                    <span className="text-[10px] text-text-muted font-medium block">Resolution Rate</span>
                    <strong className="text-emerald-500 dark:text-emerald-400 text-sm font-display font-black">{profile.metrics.resolutionRate}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-card-saas border border-border-saas text-left">
                    <span className="text-[10px] text-text-muted font-medium block">Critical Resolved</span>
                    <strong className="text-rose-500 dark:text-rose-400 text-sm font-display font-black">{profile.metrics.criticalIssues}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-card-saas border border-border-saas text-left">
                    <span className="text-[10px] text-text-muted font-medium block">Team Avg Response</span>
                    <strong className="text-cyan-500 dark:text-cyan-400 text-sm font-display font-black">{profile.metrics.avgResponseTime}</strong>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 rounded-xl bg-card-saas border border-border-saas text-left">
                    <span className="text-[10px] text-text-muted font-medium block">Incidents Reported</span>
                    <strong className="text-text-main text-sm font-display font-black">{profile.metrics.reported}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-card-saas border border-border-saas text-left">
                    <span className="text-[10px] text-text-muted font-medium block">Resolved Incidents</span>
                    <strong className="text-emerald-500 dark:text-emerald-400 text-sm font-display font-black">{profile.metrics.resolved}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-card-saas border border-border-saas text-left col-span-2 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-text-muted font-medium block">Avg Resolution Time</span>
                      <strong className="text-text-main text-sm font-display font-black">{profile.metrics.avgResolutionTime}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-text-muted font-medium block">Performance Score</span>
                      <strong className="text-indigo-500 dark:text-indigo-400 text-sm font-display font-black">{profile.performanceScore}</strong>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Achievement Medals */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-text-muted">
              <HiSparkles className="w-4 h-4 text-violet-500 dark:text-violet-400 animate-pulse" />
              <h3 className="font-display font-extrabold text-[10px] uppercase tracking-wider text-text-muted">
                Operational Achievements
              </h3>
            </div>

            <div className="space-y-2.5">
              {profile.achievements.map((ach) => (
                <div 
                  key={ach.id} 
                  className="p-3 rounded-xl bg-card-saas border border-border-saas hover:border-indigo-500/20 transition-all flex items-start gap-3"
                >
                  <div className="text-xl shrink-0 p-1.5 bg-bg-saas rounded-lg border border-border-saas">
                    {ach.icon}
                  </div>
                  <div className="text-left space-y-0.5 min-w-0">
                    <h4 className="text-xs font-bold text-text-main">{ach.title}</h4>
                    <p className="text-[10px] text-text-muted leading-snug">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Log / Recent Timeline */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-text-muted">
              <HiUser className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <h3 className="font-display font-extrabold text-[10px] uppercase tracking-wider text-text-muted">
                {isManager ? "Recent Management Activity" : "Recent Activity Timeline"}
              </h3>
            </div>

            <div className="space-y-3 relative pl-3.5 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[1px] before:bg-border-saas">
              {profile.activityFeed.map((feed, idx) => (
                <div key={idx} className="flex items-start gap-3 relative text-[11px]">
                  <div className="absolute -left-[11px] top-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 border border-surface-saas" />
                  <div className="text-left space-y-0.5 min-w-0 flex-1">
                    <span className="text-[9px] font-mono text-text-muted block">{feed.date}</span>
                    <p className="text-text-main font-medium leading-relaxed">{feed.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Theme Settings Section */}
          <div className="space-y-3 pt-4 border-t border-border-saas">
            <div className="flex items-center gap-1.5 text-text-muted">
              <HiCog className="w-4 h-4 text-[#6366F1]" />
              <h3 className="font-display font-extrabold text-[10px] uppercase tracking-wider text-text-muted">
                Theme Settings
              </h3>
            </div>

            <div className="p-3 bg-card-saas border border-border-saas flex items-center justify-between rounded-xl">
              <span className="text-xs text-text-main font-semibold">Interface Theme</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-lg">
                🌙 Enterprise Dark
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Panel controls */}
        <div className="pt-4 border-t border-border-saas mt-6">
          <button
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/35 text-red-550 dark:text-red-400 text-xs font-bold font-display cursor-pointer transition-all shadow-sm animate-none"
          >
            <HiOutlineLogout className="w-4.5 h-4.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </motion.div>
    </>
  );
}

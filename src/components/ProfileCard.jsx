import React from 'react';
import { motion } from 'framer-motion';
import { HiUser, HiMail, HiLocationMarker, HiCalendar, HiSparkles, HiTrendingUp } from 'react-icons/hi';

export default function ProfileCard({ profile, userRole }) {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left w-full mt-4"
    >
      {/* Upper Grid: Portfolio card & Telemetry meters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Scanned ID badge */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 rounded-2xl p-6 bg-[#1E293B] border border-slate-700/85 relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6"
        >
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 p-1">
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 text-[8px] font-bold bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">
              ONLINE
            </span>
          </div>

          <div className="flex-1 space-y-3.5 text-center sm:text-left w-full min-w-0">
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/25">
                {profile.role}
              </span>
              <h2 className="font-display font-black text-xl text-slate-100 mt-2 tracking-tight">
                {profile.name}
              </h2>
            </div>

            {/* details deck */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-400">
              <div className="flex items-center justify-center sm:justify-start gap-2 min-w-0">
                <HiUser className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="truncate">ID: <strong className="text-slate-200">{profile.id || "MGR-0092"}</strong></span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 min-w-0">
                <HiMail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{profile.email}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 min-w-0">
                <HiLocationMarker className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="truncate">Affiliated: <strong className="text-slate-200">{profile.store || "Delhi NCR Regional Hub"}</strong></span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 min-w-0">
                <HiCalendar className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">Enlisted: <strong className="text-slate-200">{profile.joinDate}</strong></span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Telemetry card */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-6 bg-[#1E293B] border border-slate-700/85 flex flex-col justify-between"
        >
          <div className="space-y-4 w-full">
            <div className="flex items-center gap-1.5 text-slate-300">
              <HiTrendingUp className="w-4 h-4 text-indigo-400" />
              <h3 className="font-display font-bold text-xs uppercase tracking-widest">
                Operational Telemetry
              </h3>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-400">Reporter Compliance Score</span>
                  <span className="text-indigo-400">{profile.performanceScore || "96.4%"}</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: profile.performanceScore || '96.4%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-400">Active Task Response SLA</span>
                  <span className="text-green-400">92%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 uppercase font-mono mt-4 pt-3 border-t border-slate-800/80 text-right">
            SLA Rating: Clear
          </div>
        </motion.div>

      </div>

      {/* Lower Grid: Achievements & Action list feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Achievements list */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-5 bg-[#1E293B] border border-slate-750 space-y-4"
        >
          <div className="flex items-center gap-1.5 text-slate-350">
            <HiSparkles className="w-4.5 h-4.5 text-violet-400" />
            <h3 className="font-display font-bold text-xs uppercase tracking-widest text-slate-200">
              Operational Medals
            </h3>
          </div>

          <div className="space-y-2.5">
            {profile.achievements ? (
              profile.achievements.map((ach) => (
                <div key={ach.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-start gap-3 transition-all hover:border-slate-700">
                  <div className="text-2xl shrink-0">{ach.icon}</div>
                  <div className="text-left space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-200">{ach.title}</h4>
                    <p className="text-[10px] text-slate-500 leading-snug">{ach.desc}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-500 text-xs">
                No active medals logged.
              </div>
            )}
          </div>
        </motion.div>

        {/* Action log feed */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 rounded-2xl p-5 bg-[#1E293B] border border-slate-750 space-y-4"
        >
          <div className="flex items-center gap-1.5 text-slate-350">
            <HiUser className="w-4.5 h-4.5 text-indigo-400" />
            <h3 className="font-display font-bold text-xs uppercase tracking-widest text-slate-200">
              Action Timeline
            </h3>
          </div>

          <div className="space-y-3.5 relative before:absolute before:left-3.5 before:top-2.5 before:bottom-2.5 before:w-[1px] before:bg-slate-800">
            {profile.activityFeed ? (
              profile.activityFeed.map((feed, idx) => (
                <div key={idx} className="flex items-start gap-4 relative pl-8 text-xs">
                  {/* Timeline dot */}
                  <div className="absolute left-2.5 top-1.5 w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                  <div className="text-left space-y-0.5 min-w-0">
                    <span className="text-[9px] font-mono text-slate-500 block">{feed.date}</span>
                    <p className="text-slate-300 font-medium leading-relaxed">{feed.action}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-500 text-xs">
                No recent diagnostic logs reported.
              </div>
            )}
          </div>
        </motion.div>

      </div>

    </motion.div>
  );
}

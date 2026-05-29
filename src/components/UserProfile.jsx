import React from 'react';
import { motion } from 'framer-motion';
import { HiUser, HiMail, HiLocationMarker, HiCalendar, HiSparkles, HiTrendingUp } from 'react-icons/hi';

export default function UserProfile({ profile, userRole }) {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left w-full mt-4"
    >
      {/* Upper Grid: Cyber Badge and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Holographic ID Badge */}
        <motion.div
          variants={itemVariants}
          className={`lg:col-span-2 rounded-3xl p-6 relative overflow-hidden ${
            userRole === 'manager' ? 'neon-panel-secondary' : 'neon-panel-primary'
          }`}
        >
          <div className="cyber-scanner-bar" />
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            {/* Scanned Avatar Image */}
            <div className="relative">
              <div className={`w-28 h-28 rounded-2xl overflow-hidden border-2 p-1 bg-slate-950 ${
                userRole === 'manager' ? 'border-cyan-500' : 'border-violet-500'
              }`}>
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <span className={`absolute -bottom-2 -right-2 text-[9px] font-black px-2 py-0.5 rounded-full ${
                userRole === 'manager' ? 'bg-cyan-500 text-slate-950' : 'bg-violet-500 text-white'
              }`}>
                ACTIVE
              </span>
            </div>

            {/* Badge details */}
            <div className="flex-1 space-y-4 w-full">
              <div>
                <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-md ${
                  userRole === 'manager' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-violet-500/10 text-violet-400'
                }`}>
                  {profile.role}
                </span>
                <h2 className="font-display font-black text-2xl text-slate-100 tracking-wide mt-1.5">
                  {profile.name}
                </h2>
              </div>

              {/* Grid of details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <HiUser className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>ID: <strong className="text-slate-200">{profile.id || "MGR-0092"}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <HiMail className="w-4 h-4 text-violet-400 shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiLocationMarker className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Store: <strong className="text-slate-200">{profile.store || "North India regional hubs"}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <HiCalendar className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Enlisted: <strong className="text-slate-200">{profile.joinedDate}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic KPI Progress Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-3xl p-6 glass-panel border border-slate-800/80 flex flex-col justify-between"
        >
          <div className="space-y-4 w-full">
            <div className="flex items-center gap-2">
              <HiTrendingUp className="w-5 h-5 text-cyan-400" />
              <h3 className="font-display font-bold text-xs text-slate-200 uppercase tracking-widest">
                Operational Telemetry
              </h3>
            </div>

            {/* Performance Indicators */}
            <div className="space-y-3.5">
              {userRole === 'manager' ? (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Regional SLA Compliance</span>
                      <span className="text-cyan-400 font-bold">96.4%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-900">
                      <div className="bg-cyan-400 h-full rounded-full" style={{ width: '96.4%' }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Store Incident Reduction Rate</span>
                      <span className="text-green-400 font-bold">84.2%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-900">
                      <div className="bg-green-400 h-full rounded-full" style={{ width: '84.2%' }} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Reporter Accuracy Score</span>
                      <span className="text-violet-400 font-bold">98.2%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-900">
                      <div className="bg-violet-400 h-full rounded-full" style={{ width: '98.2%' }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Safety Protocol compliance</span>
                      <span className="text-green-400 font-bold">92%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-900">
                      <div className="bg-green-400 h-full rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
            <span className="text-slate-500 font-bold uppercase tracking-wider">Telemetry Core</span>
            <span className="text-slate-400">Active link: OK</span>
          </div>
        </motion.div>
      </div>

      {/* Lower Grid: Achievements & Activities Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Achievements list */}
        <motion.div
          variants={itemVariants}
          className="rounded-3xl p-5 glass-panel border border-slate-800/80 space-y-4"
        >
          <div className="flex items-center gap-2">
            <HiSparkles className="w-5 h-5 text-violet-400" />
            <h3 className="font-display font-bold text-xs text-slate-200 uppercase tracking-widest">
              Achievement Trophies
            </h3>
          </div>

          <div className="space-y-2.5">
            {profile.achievements ? (
              profile.achievements.map((ach) => (
                <div key={ach.id} className="p-3 rounded-xl bg-slate-950 border border-slate-900 hover:border-violet-500/20 transition-all flex items-start gap-3">
                  <div className="text-2xl">{ach.icon}</div>
                  <div className="text-left space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-200">{ach.title}</h4>
                    <p className="text-[10px] text-slate-500">{ach.desc}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-500 text-xs">
                No trophies locked on current security clearance.
              </div>
            )}
          </div>
        </motion.div>

        {/* Activity Timeline list */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 rounded-3xl p-5 glass-panel border border-slate-800/80 space-y-4"
        >
          <div className="flex items-center gap-2">
            <HiUser className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display font-bold text-xs text-slate-200 uppercase tracking-widest">
              Recent Action timeline
            </h3>
          </div>

          <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-800">
            {profile.activityTimeline ? (
              profile.activityTimeline.map((act, idx) => (
                <div key={idx} className="flex items-start gap-4 relative pl-8 text-xs">
                  {/* Timeline dot */}
                  <div className="absolute left-2.5 top-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f5ff] shrink-0" />
                  <div className="text-left space-y-0.5">
                    <span className="text-[9px] font-mono text-slate-500 block">{act.date}</span>
                    <p className="text-slate-300 font-medium leading-relaxed">{act.action}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-500 text-xs">
                No recent diagnostic operations records.
              </div>
            )}
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
}

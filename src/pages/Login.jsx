import React, { useState } from 'react';
import { motion as motionElement } from 'framer-motion';
import { HiShieldCheck, HiOutlineUser, HiOutlineKey, HiOutlineBriefcase } from 'react-icons/hi';
import { STAFF_PROFILE, MANAGER_PROFILE } from '../data/mockIncidents';

export default function Login({ onLogin }) {
  const [hoveredRole, setHoveredRole] = useState(null);

  return (
    <div className="min-h-screen bg-bg-saas text-text-main flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-250">
      
      {/* Background Subtle SaaS Gradients - hidden in light mode */}
      <div className="saas-glow-indigo top-[-20%] left-[-10%] w-[50vw] h-[50vw]" />
      <div className="saas-glow-cyan bottom-[-20%] right-[-10%] w-[45vw] h-[45vw]" />

      {/* Main Container */}
      <motionElement.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-4xl text-center space-y-8 z-10 animate-none"
      >
        
        {/* Hub Header */}
        <div className="space-y-3">
          <div className="flex justify-center">
            <motionElement.div 
              className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-500 dark:text-indigo-400"
              whileHover={{ scale: 1.05 }}
            >
              <HiShieldCheck className="w-8 h-8 text-indigo-550 dark:text-indigo-500" />
            </motionElement.div>
          </div>
          <div className="space-y-1">
            <h1 className="font-display font-black text-3xl sm:text-4xl text-text-main tracking-tight leading-tight">
              Incident Hub
            </h1>
            <p className="text-sm sm:text-base text-text-muted font-medium max-w-xl mx-auto">
              Restaurant Operations Overview • Track, manage and resolve incidents across stores.
            </p>
          </div>
        </div>

        {/* Dual Card Selections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          
          {/* Card: Staff */}
          <motionElement.div
            onMouseEnter={() => setHoveredRole('staff')}
            onMouseLeave={() => setHoveredRole(null)}
            className="saas-card rounded-3xl p-6 flex flex-col justify-between text-left space-y-6 relative border border-border-saas transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-500 dark:text-indigo-400">
                  <HiOutlineUser className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-text-main tracking-wide">
                    Restaurant Staff Portal
                  </h3>
                  <span className="text-[10px] text-indigo-650 dark:text-indigo-400 font-extrabold tracking-wider uppercase font-mono">
                    Delhi NCR Store Operations
                  </span>
                </div>
              </div>

              <p className="text-xs text-text-muted leading-relaxed font-sans">
                Report operational alerts, track incident workflows, and adopt AI suggested playbooks instantly. Optimized for branch crews.
              </p>
            </div>

            {/* Profile preview summary */}
            <div className="p-3 bg-bg-saas border border-border-saas rounded-xl flex items-center gap-3">
              <img 
                src={STAFF_PROFILE.avatar} 
                alt={STAFF_PROFILE.name} 
                className="w-9 h-9 rounded-lg object-cover border border-indigo-500/20"
              />
              <div className="text-xs">
                <span className="font-bold text-text-main block">{STAFF_PROFILE.name}</span>
                <span className="text-[10px] text-text-muted font-medium">Clearance: Store Staff</span>
              </div>
              <span className="ml-auto text-[9px] bg-surface-saas border border-border-saas text-text-muted px-2 py-0.5 rounded font-bold font-mono">
                {STAFF_PROFILE.id}
              </span>
            </div>

            <button
              onClick={() => onLogin('staff')}
              className="w-full py-2.5 rounded-xl bg-indigo-650 hover:bg-indigo-550 text-white font-display text-xs font-bold transition-all border border-indigo-550/30 flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-950/20 cursor-pointer"
            >
              <span>Continue as Staff</span>
              <HiOutlineBriefcase className="w-4 h-4 text-indigo-200" />
            </button>
          </motionElement.div>

          {/* Card: Manager */}
          <motionElement.div
            onMouseEnter={() => setHoveredRole('manager')}
            onMouseLeave={() => setHoveredRole(null)}
            className="saas-card rounded-3xl p-6 flex flex-col justify-between text-left space-y-6 relative border border-border-saas transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-600 dark:text-cyan-400">
                  <HiOutlineKey className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-text-main tracking-wide">
                    Operations Command
                  </h3>
                  <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-extrabold tracking-wider uppercase font-mono">
                    Regional SLA Controller
                  </span>
                </div>
              </div>

              <p className="text-xs text-text-muted leading-relaxed font-sans">
                Review regional queues, manage Kanban boards, edit resolution notes, audit staff leadboards, and review weekly forecast risk cores.
              </p>
            </div>

            {/* Profile preview summary */}
            <div className="p-3 bg-bg-saas border border-border-saas rounded-xl flex items-center gap-3">
              <img 
                src={MANAGER_PROFILE.avatar} 
                alt={MANAGER_PROFILE.name} 
                className="w-9 h-9 rounded-lg object-cover border border-cyan-500/20"
              />
              <div className="text-xs">
                <span className="font-bold text-text-main block">{MANAGER_PROFILE.name}</span>
                <span className="text-[10px] text-text-muted font-medium">Clearance: Ops Manager</span>
              </div>
              <span className="ml-auto text-[9px] bg-surface-saas border border-border-saas text-text-muted px-2 py-0.5 rounded font-bold font-mono">
                {MANAGER_PROFILE.id}
              </span>
            </div>

            <button
              onClick={() => onLogin('manager')}
              className="w-full py-2.5 rounded-xl bg-cyan-650 hover:bg-cyan-550 text-white font-display text-xs font-bold transition-all border border-cyan-550/30 flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/20 cursor-pointer"
            >
              <span>Continue as Manager</span>
              <HiOutlineBriefcase className="w-4 h-4 text-cyan-200" />
            </button>
          </motionElement.div>

        </div>

      </motionElement.div>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiShieldCheck, HiTerminal, HiPlusCircle, HiClipboardList, 
  HiSparkles, HiUserCircle, HiChartBar, HiUserGroup, HiLogout 
} from 'react-icons/hi';

export default function Sidebar({ userRole, activeTab, setActiveTab, profile, onLogout }) {
  // Staff Navigation Nodes
  const staffTabs = [
    { id: "dashboard", label: "Dashboard", icon: HiTerminal },
    { id: "report", label: "Report Incident", icon: HiPlusCircle },
    { id: "my-incidents", label: "My Incidents", icon: HiClipboardList },
    { id: "ai-assistant", label: "AI Co-Pilot", icon: HiSparkles },
    { id: "profile", label: "Staff Profile", icon: HiUserCircle }
  ];

  // Manager Navigation Nodes
  const managerTabs = [
    { id: "overview", label: "Operations Overview", icon: HiTerminal },
    { id: "kanban", label: "Incident Queue", icon: HiClipboardList },
    { id: "analytics", label: "Analytics Desk", icon: HiChartBar },
    { id: "staff", label: "Staff Performance", icon: HiUserGroup },
    { id: "ai-insights", label: "AI Command Center", icon: HiSparkles },
    { id: "profile", label: "Manager Profile", icon: HiUserCircle }
  ];

  const activeTabsList = userRole === 'manager' ? managerTabs : staffTabs;

  return (
    <aside className="w-full lg:w-64 shrink-0 glass-panel border-r border-slate-800/80 p-4 flex flex-col justify-between lg:h-screen lg:sticky lg:top-0">
      
      <div className="space-y-6">
        {/* Brand header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-900">
          <motion.div 
            className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400"
            whileHover={{ scale: 1.05, rotate: -5 }}
          >
            <HiShieldCheck className="w-5 h-5 text-cyan-400" />
          </motion.div>
          <div className="text-left">
            <span className="font-display font-black text-sm tracking-widest text-glow-secondary text-white block">
              INCIDENT HUB
            </span>
            <span className="block text-[8px] text-cyan-400 font-extrabold tracking-widest uppercase font-mono">
              v4.2.1 NEURAL COMPLY
            </span>
          </div>
        </div>

        {/* Profile Card Header */}
        <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-2xl flex items-center gap-3">
          <div className="relative">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="w-10 h-10 rounded-xl object-cover border border-violet-500/30"
            />
            <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border border-slate-950 rounded-full ${
              userRole === 'manager' ? 'bg-cyan-400 animate-pulse' : 'bg-green-400'
            }`} />
          </div>
          <div className="text-left text-xs min-w-0">
            <span className="font-bold text-slate-100 block truncate">{profile.name}</span>
            <span className={`text-[9px] font-extrabold uppercase tracking-wider block ${
              userRole === 'manager' ? 'text-cyan-400' : 'text-violet-400'
            }`}>
              {profile.role}
            </span>
          </div>
        </div>

        {/* Sidebar Nav links */}
        <nav className="space-y-1">
          {activeTabsList.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold font-display cursor-pointer transition-all ${
                  isActive 
                    ? userRole === 'manager'
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,245,255,0.15)]'
                      : 'bg-violet-500/10 text-violet-400 border border-violet-500/30 shadow-[0_0_10px_rgba(139,92,246,0.15)]'
                    : 'text-slate-400 border border-transparent hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <IconComponent className={`w-4.5 h-4.5 ${
                  isActive 
                    ? userRole === 'manager' ? 'text-cyan-400' : 'text-violet-400'
                    : 'text-slate-500'
                }`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout system action */}
      <div className="pt-4 border-t border-slate-900 mt-6 lg:mt-0">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 text-red-400 text-xs font-bold font-display cursor-pointer transition-all shadow-md"
        >
          <HiLogout className="w-4 h-4" />
          <span>System Termination</span>
        </button>
      </div>

    </aside>
  );
}

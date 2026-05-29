import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiShieldCheck, HiTerminal, HiPlusCircle, HiClipboardList, 
  HiSparkles, HiUserCircle, HiChartBar, HiUserGroup, HiOutlineLogout 
} from 'react-icons/hi';

export default function Sidebar({ userRole, activeTab, setActiveTab, profile, onLogout }) {
  
  // Staff Navigation Tab Setup
  const staffTabs = [
    { id: "dashboard", label: "Dashboard", icon: HiTerminal },
    { id: "report", label: "Report Incident", icon: HiPlusCircle },
    { id: "my-incidents", label: "My Incidents", icon: HiClipboardList },
    { id: "ai-assistant", label: "AI Assistant", icon: HiSparkles }
  ];

  // Manager Navigation Tab Setup
  const managerTabs = [
    { id: "overview", label: "Overview Feed", icon: HiTerminal },
    { id: "kanban", label: "Incident Queue", icon: HiClipboardList },
    { id: "analytics", label: "Analytics Desk", icon: HiChartBar },
    { id: "staff", label: "Store Performance", icon: HiUserGroup },
    { id: "ai-insights", label: "AI Assistant", icon: HiSparkles }
  ];

  const activeTabsList = userRole === 'manager' ? managerTabs : staffTabs;

  return (
    <aside className="w-full lg:w-60 shrink-0 bg-surface-saas border-r border-border-saas p-4 flex flex-col justify-between lg:h-screen lg:sticky lg:top-0">
      
      <div className="space-y-6">
        {/* Brand header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-border-saas">
          <div className="p-2 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-xl text-[#6366F1]">
            <HiShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="font-display font-black text-sm tracking-wide text-text-main block">
              Incident Hub
            </span>
            <span className="block text-[8px] text-text-muted font-extrabold tracking-widest uppercase font-mono">
              Operations Center
            </span>
          </div>
        </div>

        {/* Dynamic Nav link selections */}
        <nav className="space-y-1">
          {activeTabsList.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold font-display cursor-pointer transition-all duration-200 border ${
                  isActive 
                    ? 'bg-[#6366F1] text-white border-transparent shadow-sm shadow-[#6366F1]/10'
                    : 'text-text-muted border-transparent hover:text-text-main hover:bg-bg-saas'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-white' : 'text-text-muted group-hover:text-text-main'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout System trigger */}
      <div className="pt-4 border-t border-border-saas">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold font-display cursor-pointer transition-all"
        >
          <HiOutlineLogout className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

    </aside>
  );
}

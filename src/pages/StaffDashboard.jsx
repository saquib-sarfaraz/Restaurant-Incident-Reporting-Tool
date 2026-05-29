import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineTerminal, HiPlusCircle, HiClipboardList, HiSparkles, HiUserCircle, HiOutlineClock, HiOutlineThumbUp, HiTrendingUp } from 'react-icons/hi';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import IncidentCard from '../components/IncidentCard';
import IncidentForm from '../components/IncidentForm';
import AIAssistant from '../components/AIAssistant';
import ProfileDrawer from '../components/ProfileDrawer';
import { STAFF_PROFILE } from '../data/mockIncidents';

export default function StaffDashboard({ 
  incidents = [], 
  notifications = [], 
  onClearNotification, 
  onStatusChange, 
  onSubmitIncident, 
  onLogout,
  theme,
  setTheme
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Staff incidents are already scoped by backend (staff can only see their own).
  const staffIncidents = useMemo(() => {
    return incidents;
  }, [incidents]);

  // Dynamic filter for search bar
  const searchedIncidents = useMemo(() => {
    if (!searchQuery.trim()) return staffIncidents;
    return staffIncidents.filter(inc =>
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [staffIncidents, searchQuery]);

  // Compute local stats
  const staffStats = useMemo(() => {
    const total = staffIncidents.length;
    const open = staffIncidents.filter(i => i.status !== 'Resolved').length;
    const resolved = staffIncidents.filter(i => i.status === 'Resolved').length;
    return {
      total,
      open,
      resolved,
      avgTime: STAFF_PROFILE.metrics.avgResolutionTime
    };
  }, [staffIncidents]);

  return (
    <div className="min-h-screen bg-bg-saas text-text-main flex flex-col lg:flex-row">
      <Sidebar
        userRole="staff"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={STAFF_PROFILE}
        onLogout={onLogout}
      />

      {/* Main Panel Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={notifications}
          onClearNotification={onClearNotification}
          profile={STAFF_PROFILE}
          onLogout={onLogout}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto text-left flex-1 relative z-10">
          
          {/* Backdrop ambient glows - completely hidden in CSS */}
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* VIEW: DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  
                  {/* Greeting banner */}
                  <div className="p-6 sm:p-8 rounded-[24px] bg-gradient-to-r from-[#1E293B] to-[#111827] border border-border-saas relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Ambient subtle glow overlay inside card */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                    <div className="space-y-2 text-left relative z-10 min-w-0 flex-1">
                      <h1 className="font-display font-black text-3xl sm:text-4xl text-text-main tracking-tight">
                        Good Morning, Saquib 👋
                      </h1>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                          <span className="text-[#6366F1] font-bold">Restaurant Staff</span>
                          <span className="text-text-muted font-normal">•</span>
                          <span className="text-text-muted">California Burrito - Saket</span>
                        </div>
                        <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-xl">
                          Track, manage, and resolve incidents across stores in real-time.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab("report")}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-display text-xs font-bold transition-all border border-indigo-500/30 flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-950/20 cursor-pointer shrink-0 relative z-10"
                    >
                      <HiPlusCircle className="w-4.5 h-4.5" />
                      <span>Report Incident</span>
                    </button>
                  </div>

                  {/* Statistics block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard title="Incidents Reported" value={staffStats.total} trend="↑ 12% This Week" trendType="success" icon={HiClipboardList} />
                    <StatsCard title="Active Open Issues" value={staffStats.open} trend="↓ 5% Today" trendType="success" icon={HiOutlineClock} />
                    <StatsCard title="Resolved Issues" value={staffStats.resolved} trend="100% resolution rate" trendType="success" icon={HiOutlineThumbUp} />
                    <StatsCard title="Avg Resolution Time" value={staffStats.avgTime} trend="SLA compliant" trendType="success" icon={HiTrendingUp} />
                  </div>

                  {/* Recent Activity lists */}
                  <div className="space-y-3.5 pt-3 border-t border-border-saas">
                    <div className="flex items-center gap-2">
                      <HiOutlineTerminal className="w-4.5 h-4.5 text-[#6366F1]" />
                      <h3 className="font-display font-bold text-xs uppercase tracking-widest text-text-muted">
                        Recent Logged Activity Feed
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {searchedIncidents.slice(0, 3).map((inc) => (
                        <div key={inc.id} className="p-4 rounded-xl bg-card-saas border border-border-saas flex items-center justify-between gap-4">
                          <div className="space-y-1 text-left min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-bg-saas border border-border-saas text-text-muted font-mono">
                                {inc.id}
                              </span>
                              <span className="text-[9px] font-extrabold uppercase bg-bg-saas/40 border border-border-saas text-text-main px-2 py-0.5 rounded-full tracking-wider">
                                {inc.category}
                              </span>
                              <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                                inc.status === 'Resolved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400'
                              }`}>
                                {inc.status}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-text-main truncate">{inc.title}</h4>
                            <span className="text-[10px] text-text-muted block">Reported {inc.reportedTime}</span>
                          </div>
                          
                          <button
                            onClick={() => setActiveTab("my-incidents")}
                            className="px-3 py-1.5 rounded-lg bg-bg-saas border border-border-saas text-text-muted hover:text-text-main text-[10px] font-bold shrink-0 cursor-pointer"
                          >
                            Track Log
                          </button>
                        </div>
                      ))}

                      {searchedIncidents.length === 0 && (
                        <div className="p-8 text-center text-text-muted text-xs rounded-xl border border-border-saas">
                          No matching branch logs detected.
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* VIEW: REPORT INCIDENT */}
              {activeTab === 'report' && (
                <IncidentForm
                  onSubmit={onSubmitIncident}
                  onCancel={() => setActiveTab("dashboard")}
                  defaultStore={STAFF_PROFILE.store}
                />
              )}

              {/* VIEW: MY INCIDENTS */}
              {activeTab === 'my-incidents' && (
                <div className="space-y-4">
                  <div className="pb-3 border-b border-border-saas">
                    <h2 className="font-display font-black text-xl text-text-main tracking-tight">
                      My Submitted Incident Logs
                    </h2>
                    <p className="text-xs text-text-muted mt-1">
                      Monitor live progression and resolution notes of reports submitted at California Burrito Saket.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {searchedIncidents.map((inc) => (
                      <IncidentCard
                        key={inc.id}
                        incident={inc}
                        onStatusChange={onStatusChange}
                      />
                    ))}

                    {searchedIncidents.length === 0 && (
                      <div className="p-12 text-center text-text-muted text-xs rounded-2xl border border-border-saas">
                        No active logs to list.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* VIEW: AI ASSISTANT */}
              {activeTab === 'ai-assistant' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                  <div className="lg:col-span-2">
                    <AIAssistant />
                  </div>
                  
                  <div className="p-5 rounded-2xl bg-card-saas border border-border-saas text-xs text-text-muted">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-wider font-display">
                        <HiSparkles className="w-4.5 h-4.5 text-indigo-500 dark:text-indigo-400 animate-pulse" />
                        <span>AI Assistant</span>
                      </div>
                      <p className="leading-relaxed font-sans text-text-muted">
                        Helping managers identify trends and prioritize incidents.
                      </p>
                    </div>
                  </div>
                </div>
              )}


            </motion.div>
          </AnimatePresence>

        </main>
      </div>

      {/* Page Root Profile Drawer Overlay */}
      <AnimatePresence>
        {isProfileOpen && (
          <ProfileDrawer
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            profile={STAFF_PROFILE}
            userRole="staff"
            onLogout={onLogout}
            theme={theme}
            setTheme={setTheme}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

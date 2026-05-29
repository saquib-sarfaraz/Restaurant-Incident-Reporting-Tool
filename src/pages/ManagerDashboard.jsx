import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiClipboardList, HiLightningBolt, HiCheckCircle, HiTrendingUp, 
  HiSparkles, HiChevronRight, HiUserCircle, HiExclamation, 
  HiPencilAlt, HiShieldExclamation, HiArrowRight, HiArrowLeft, HiOutlineTerminal 
} from 'react-icons/hi';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import AnalyticsCharts from '../components/AnalyticsCharts';
import ProfileDrawer from '../components/ProfileDrawer';
import { 
  MANAGER_PROFILE, AI_OPERATIONAL_INSIGHTS, STATUSES, SEVERITIES 
} from '../data/mockIncidents';

export default function ManagerDashboard({ 
  incidents = [], 
  notifications = [], 
  onClearNotification, 
  onStatusChange, 
  onUpdateIncident, 
  onLogout,
  theme,
  setTheme
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Filter dynamic search query
  const searchedIncidents = useMemo(() => {
    if (!searchQuery.trim()) return incidents;
    return incidents.filter(inc =>
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [incidents, searchQuery]);

  // Kanban Columns Filter Memoization
  const kanbanColumns = useMemo(() => {
    return {
      "Open": searchedIncidents.filter(i => i.status === 'Open'),
      "Under Review": searchedIncidents.filter(i => i.status === 'Under Review'),
      "In Progress": searchedIncidents.filter(i => i.status === 'In Progress'),
      "Resolved": searchedIncidents.filter(i => i.status === 'Resolved')
    };
  }, [searchedIncidents]);

  // Compute dynamic regional stats
  const managerStats = useMemo(() => {
    const total = incidents.length;
    const open = incidents.filter(i => i.status !== 'Resolved').length;
    const critical = incidents.filter(i => i.severity === 'Critical' && i.status !== 'Resolved').length;
    const resolved = incidents.filter(i => i.status === 'Resolved').length;
    return {
      total,
      open,
      critical,
      resolvedToday: resolved,
      avgTime: MANAGER_PROFILE.metrics.avgResolutionTime
    };
  }, [incidents]);

  // Management notes modal states
  const [editingIncident, setEditingIncident] = useState(null);
  const [editNotes, setEditNotes] = useState("");
  const [editSeverity, setEditSeverity] = useState("");
  const [editManager, setEditManager] = useState("");

  const openEditModal = (inc) => {
    setEditingIncident(inc);
    setEditNotes(inc.resolutionNotes || "");
    setEditSeverity(inc.severity);
    setEditManager(inc.assignedManager || "Sarah Johnson");
  };

  const saveEditChanges = (e) => {
    e.preventDefault();
    if (!editingIncident) return;
    
    const payload = {
      ...editingIncident,
      severity: editSeverity,
      assignedManager: editManager,
      resolutionNotes: editNotes
    };

    onUpdateIncident(payload);
    setEditingIncident(null);
  };

  const shiftStatus = (id, currentStatus, direction) => {
    const order = ["Open", "Under Review", "In Progress", "Resolved"];
    const idx = order.indexOf(currentStatus);
    if (idx === -1) return;

    let targetIdx = idx;
    if (direction === 'forward' && idx < order.length - 1) {
      targetIdx = idx + 1;
    } else if (direction === 'backward' && idx > 0) {
      targetIdx = idx - 1;
    }

    if (targetIdx !== idx) {
      onStatusChange(id, order[targetIdx]);
    }
  };

  return (
    <div className="min-h-screen bg-bg-saas text-text-main flex flex-col lg:flex-row">
      <Sidebar
        userRole="manager"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={MANAGER_PROFILE}
        onLogout={onLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={notifications}
          onClearNotification={onClearNotification}
          profile={MANAGER_PROFILE}
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
              {/* VIEW: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  
                  {/* Greeting header */}
                  <div className="p-6 sm:p-8 rounded-[24px] bg-gradient-to-r from-[#1E293B] to-[#111827] border border-border-saas relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    {/* Ambient subtle glow overlay inside card */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                    <div className="space-y-2 text-left relative z-10">
                      <h1 className="font-display font-black text-3xl sm:text-4xl text-text-main tracking-tight">
                        Good Morning, Saquib 👋
                      </h1>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                          <span className="text-[#6366F1] font-bold">Operations Manager</span>
                          <span className="text-text-muted font-normal">•</span>
                          <span className="text-text-muted">Delhi NCR Region</span>
                        </div>
                        <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-xl">
                          Manage operational incidents across all assigned stores.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* KPIs Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <StatsCard title="Total Incidents" value={managerStats.total} icon={HiClipboardList} trend="↑ 12% This Week" trendType="success" />
                    <StatsCard title="Open Incidents" value={managerStats.open} icon={HiOutlineTerminal} trend="↓ 5% Today" trendType="success" />
                    <StatsCard title="Critical Issues" value={managerStats.critical} icon={HiLightningBolt} trend="Immediate Action" trendType="danger" />
                    <StatsCard title="Resolved Today" value={managerStats.resolvedToday} icon={HiCheckCircle} trend="94% Target SLA" trendType="success" />
                    <StatsCard title="Avg Resolution Time" value={managerStats.avgTime} icon={HiTrendingUp} trend="SLA Compliant" trendType="success" />
                  </div>

                  {/* Analytic Telemetry Panels */}
                  <div className="p-6 rounded-[24px] bg-card-saas border border-border-saas space-y-4">
                    <h3 className="font-display font-bold text-xs text-text-muted uppercase tracking-widest pb-2 border-b border-border-saas flex items-center gap-1.5">
                      <HiTrendingUp className="w-4 h-4 text-[#6366F1]" />
                      Operations Analytics Dashboard
                    </h3>
                    <AnalyticsCharts incidents={searchedIncidents} theme={theme} />
                  </div>

                </div>
              )}

              {/* VIEW: KANBAN INCIDENT QUEUE */}
              {activeTab === 'kanban' && (
                <div className="space-y-4">
                  <div className="pb-3 border-b border-border-saas">
                    <h2 className="font-display font-black text-xl text-text-main tracking-tight">
                      Operational Incident Queue
                    </h2>
                    <p className="text-xs text-text-muted mt-1">
                      Manage active incident pipelines. Move cards across status columns, reassign managers, and append resolution logs.
                    </p>
                  </div>

                  {/* Columns Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                    {STATUSES.map((colName) => {
                      const list = kanbanColumns[colName] || [];
                      return (
                        <div 
                          key={colName}
                          className="p-4 rounded-2xl bg-surface-saas/40 border border-border-saas flex flex-col gap-4 min-h-[500px]"
                        >
                          {/* Column Header */}
                          <div className="flex items-center justify-between pb-2 border-b border-border-saas">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-text-main font-display">
                              <span className={`w-2 h-2 rounded-full ${
                                colName === 'Open' ? 'bg-amber-400' :
                                colName === 'Under Review' ? 'bg-blue-400' :
                                colName === 'In Progress' ? 'bg-cyan-400' : 'bg-green-400'
                              }`} />
                              <span>{colName}</span>
                            </div>
                            <span className="text-[10px] bg-bg-saas border border-border-saas text-text-muted font-bold px-2 py-0.5 rounded-full">
                              {list.length}
                            </span>
                          </div>

                          {/* Cards Stack */}
                          <div className="flex-1 space-y-3.5 overflow-y-auto max-h-[600px] pr-1">
                            {list.map((inc) => (
                              <motion.div
                                layout
                                key={inc.id}
                                whileHover={{ y: -2 }}
                                className="p-4 rounded-xl bg-card-saas border border-border-saas hover:border-[#6366F1]/25 transition-all text-left space-y-3 relative overflow-hidden"
                                style={{
                                  borderLeft: inc.severity === 'Critical' ? '3px solid #ef4444' :
                                               inc.severity === 'High' ? '3px solid #f59e0b' :
                                               '3px solid #06b6d4'
                                }}
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-[9px] font-mono text-text-muted font-bold">{inc.id}</span>
                                  <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                                    inc.severity === 'Critical' ? 'bg-red-500/10 text-red-550 dark:text-red-400' :
                                    inc.severity === 'High' ? 'bg-amber-500/10 text-amber-555 dark:text-amber-450' :
                                    'bg-indigo-500/10 text-[#6366F1]'
                                  }`}>
                                    {inc.severity}
                                  </span>
                                </div>

                                <h4 className="text-xs font-bold text-text-main line-clamp-2 leading-snug">
                                  {inc.title}
                                </h4>

                                <div className="text-[10px] text-text-muted space-y-0.5">
                                  <p className="truncate">Store: <strong className="text-text-main">{inc.store}</strong></p>
                                  <p className="truncate">Date: <strong className="text-text-main">{inc.reportedTime}</strong></p>
                                </div>

                                {/* Shift & Actions panel */}
                                <div className="pt-2.5 border-t border-border-saas flex items-center justify-between gap-2 mt-1">
                                  <div className="flex gap-1.5">
                                    <button
                                      onClick={() => shiftStatus(inc.id, inc.status, 'backward')}
                                      disabled={inc.status === 'Open'}
                                      className="p-1 rounded bg-bg-saas border border-border-saas hover:border-border-saas text-text-muted hover:text-text-main disabled:opacity-30 cursor-pointer"
                                    >
                                      <HiArrowLeft className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => shiftStatus(inc.id, inc.status, 'forward')}
                                      disabled={inc.status === 'Resolved'}
                                      className="p-1 rounded bg-bg-saas border border-border-saas hover:border-border-saas text-text-muted hover:text-text-main disabled:opacity-30 cursor-pointer"
                                    >
                                      <HiArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  <button
                                    onClick={() => openEditModal(inc)}
                                    className="p-1.5 rounded-lg bg-bg-saas border border-border-saas hover:border-[#6366F1]/20 text-[#6366F1] text-[10px] font-bold flex items-center gap-0.5 cursor-pointer"
                                  >
                                    <HiPencilAlt className="w-3.5 h-3.5" />
                                    <span>Manage</span>
                                  </button>
                                </div>

                              </motion.div>
                            ))}

                            {list.length === 0 && (
                              <div className="py-12 text-center text-text-muted text-xs">Empty Column</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* VIEW: ANALYTICS DESK */}
              {activeTab === 'analytics' && (
                <div className="p-6 rounded-[24px] bg-card-saas border border-border-saas space-y-4">
                  <h3 className="font-display font-bold text-xs text-text-main uppercase tracking-widest pb-2 border-b border-border-saas flex items-center gap-1.5">
                    <HiTrendingUp className="w-4 h-4 text-[#6366F1]" />
                    Regional Analytics Telemetry Section
                  </h3>
                  <AnalyticsCharts incidents={searchedIncidents} theme={theme} />
                </div>
              )}

              {/* VIEW: STAFF PERFORMANCE */}
              {activeTab === 'staff' && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-xs text-text-muted uppercase tracking-widest pb-1 border-b border-border-saas">
                    Regional Store Staff Roster & Leaderboard
                  </h3>
                  
                  <div className="rounded-[24px] bg-card-saas border border-border-saas overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-bg-saas/60 border-b border-border-saas font-display font-bold text-text-muted">
                          <th className="p-4">Employee</th>
                          <th className="p-4">Location</th>
                          <th className="p-4">Clearance</th>
                          <th className="p-4">Logged Tickets</th>
                          <th className="p-4 text-right">Accuracy Rating</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-saas">
                        <tr className="hover:bg-bg-saas/20">
                          <td className="p-4 flex items-center gap-3">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80" className="w-8 h-8 rounded-lg object-cover" />
                            <div>
                              <strong className="text-text-main block">Alex Carter</strong>
                              <span className="text-[10px] text-text-muted">EMP-2048</span>
                            </div>
                          </td>
                          <td className="p-4 text-text-main">California Burrito - Saket</td>
                          <td className="p-4 text-[#6366F1] font-bold uppercase text-[9px]">Staff</td>
                          <td className="p-4 text-text-muted font-bold font-mono">14 Logs</td>
                          <td className="p-4 text-right text-emerald-500 dark:text-emerald-400 font-bold font-mono">98.2%</td>
                        </tr>
                        <tr className="hover:bg-bg-saas/20">
                          <td className="p-4 flex items-center gap-3">
                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=80" className="w-8 h-8 rounded-lg object-cover" />
                            <div>
                              <strong className="text-text-main block">Rohit Sharma</strong>
                              <span className="text-[10px] text-text-muted">EMP-9182</span>
                            </div>
                          </td>
                          <td className="p-4 text-text-main">California Burrito - Noida</td>
                          <td className="p-4 text-[#6366F1] font-bold uppercase text-[9px]">Staff</td>
                          <td className="p-4 text-text-muted font-bold font-mono">8 Logs</td>
                          <td className="p-4 text-right text-emerald-500 dark:text-emerald-400 font-bold font-mono">95.4%</td>
                        </tr>
                        <tr className="hover:bg-bg-saas/20">
                          <td className="p-4 flex items-center gap-3">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=80" className="w-8 h-8 rounded-lg object-cover" />
                            <div>
                              <strong className="text-text-main block">Priya Patel</strong>
                              <span className="text-[10px] text-text-muted">EMP-0294</span>
                            </div>
                          </td>
                          <td className="p-4 text-text-main">California Burrito - Gurgaon</td>
                          <td className="p-4 text-[#6366F1] font-bold uppercase text-[9px]">Staff</td>
                          <td className="p-4 text-text-muted font-bold font-mono">11 Logs</td>
                          <td className="p-4 text-right text-emerald-500 dark:text-emerald-400 font-bold font-mono">92.0%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* VIEW: AI ASSISTANT */}
              {activeTab === 'ai-insights' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-border-saas">
                    <h2 className="font-display font-black text-xl text-text-main tracking-tight">
                      AI Assistant
                    </h2>
                    <p className="text-xs text-text-muted mt-1">
                      Helping managers identify trends and prioritize incidents.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {AI_OPERATIONAL_INSIGHTS.map((ins) => (
                      <div 
                        key={ins.id}
                        className="p-5 rounded-2xl bg-card-saas border border-border-saas flex flex-col justify-between text-left space-y-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono text-text-muted font-bold">{ins.id.toUpperCase()}</span>
                            <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-[#6366F1]/25 px-2 py-0.5 rounded font-bold font-mono">
                              Conf: {ins.confidence}
                            </span>
                          </div>
                          
                          <h4 className="text-xs font-bold text-text-main leading-snug">
                            {ins.insight}
                          </h4>
                          <p className="text-[10px] text-text-muted leading-relaxed italic">
                            "{ins.details}"
                          </p>
                        </div>

                        <div className="pt-3 border-t border-border-saas space-y-1.5">
                          <span className="text-[8px] font-bold text-brand-accent uppercase tracking-widest block font-display">
                            Recommended Strategy
                          </span>
                          <p className="text-[10px] text-text-muted leading-relaxed font-sans font-medium">
                            {ins.action}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}


            </motion.div>
          </AnimatePresence>

          {/* Manage Modal Overlay */}
          <AnimatePresence>
            {editingIncident && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setEditingIncident(null)}
                className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.95, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 15 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-lg p-6 rounded-3xl bg-card-saas border border-border-saas shadow-2xl text-left"
                >
                  <h3 className="font-display font-black text-lg text-text-main mb-1">
                    Incident Control Board
                  </h3>
                  <span className="text-[9px] font-mono text-[#6366F1] block pb-3 border-b border-border-saas">
                    REF: {editingIncident.id} • Store: {editingIncident.store}
                  </span>

                  <form onSubmit={saveEditChanges} className="space-y-4 mt-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest block">Headline</span>
                      <strong className="text-text-main block font-bold">{editingIncident.title}</strong>
                      <p className="text-[10px] text-text-muted leading-relaxed">{editingIncident.description}</p>
                    </div>

                    {/* Override priority */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-text-muted uppercase tracking-widest block">
                        Severity Rating Override
                      </label>
                      <select
                        value={editSeverity}
                        onChange={(e) => setEditSeverity(e.target.value)}
                        className="w-full px-3 py-2 bg-bg-saas border border-border-saas focus:border-[#6366F1] rounded-xl text-xs text-text-main focus:outline-none cursor-pointer"
                      >
                        {SEVERITIES.map(sev => (
                          <option key={sev} value={sev}>{sev}</option>
                        ))}
                      </select>
                    </div>

                    {/* Coordinator */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-text-muted uppercase tracking-widest block">
                        Assigned Ops Coordinator
                      </label>
                      <select
                        value={editManager}
                        onChange={(e) => setEditManager(e.target.value)}
                        className="w-full px-3 py-2 bg-bg-saas border border-border-saas focus:border-[#6366F1] rounded-xl text-xs text-text-main focus:outline-none cursor-pointer"
                      >
                        <option value="Sarah Johnson">Sarah Johnson (Operations Manager)</option>
                        <option value="Amit Sharma (District Lead)">Amit Sharma (District Lead)</option>
                        <option value="Priya Nair (Compliance)">Priya Nair (Compliance)</option>
                      </select>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-text-muted uppercase tracking-widest block">
                        Resolution Notes & Diagnostic Feed
                      </label>
                      <textarea
                        rows={3}
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="Add step-by-step resolution playbooks or diagnostic comments..."
                        className="w-full p-3 bg-bg-saas border border-border-saas focus:border-[#6366F1] rounded-xl text-xs text-text-main placeholder-text-muted/65 focus:outline-none resize-none font-sans focus:ring-2 focus:ring-[#6366F1]/20"
                      />
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-border-saas flex justify-end gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setEditingIncident(null)}
                        className="px-4 py-2 rounded-xl border border-border-saas hover:bg-bg-saas text-text-muted text-xs font-bold font-display cursor-pointer transition-all"
                      >
                        Close
                      </button>
                      
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#6366F1] hover:bg-[#6366F1]/90 text-white text-xs font-bold font-display cursor-pointer transition-all border border-[#6366F1]/30 flex items-center gap-1 shadow-lg shadow-indigo-950/20"
                      >
                        <HiCheckCircle className="w-4 h-4" />
                        <span>Save Alterations</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </main>
      </div>

      {/* Page Root Profile Drawer Overlay */}
      <AnimatePresence>
        {isProfileOpen && (
          <ProfileDrawer
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            profile={MANAGER_PROFILE}
            userRole="manager"
            onLogout={onLogout}
            theme={theme}
            setTheme={setTheme}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

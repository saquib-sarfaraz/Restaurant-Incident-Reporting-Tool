import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiClipboardList, HiLightningBolt, HiCheckCircle, HiTrendingUp, 
  HiTerminal, HiSparkles, HiChevronRight, HiUserCircle, HiSelector, 
  HiExclamation, HiPencilAlt, HiShieldExclamation, HiArrowRight, HiArrowLeft 
} from 'react-icons/hi';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';
import AnalyticsCharts from '../components/AnalyticsCharts';
import { 
  MANAGER_PROFILE, AI_PREDICTIONS, REGIONAL_RISK_SCORE, 
  SEVERITIES, STATUSES, STORES 
} from '../data/cyberMockData';

export default function ManagerDashboard({ incidents, onStatusChange, onUpdateIncident, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");

  // Kanban Column Filter Memoization
  const kanbanColumns = useMemo(() => {
    return {
      "Open": incidents.filter(i => i.status === 'Open'),
      "Under Review": incidents.filter(i => i.status === 'Under Review'),
      "In Progress": incidents.filter(i => i.status === 'In Progress'),
      "Resolved": incidents.filter(i => i.status === 'Resolved')
    };
  }, [incidents]);

  // Dynamic Manager KPIs
  const managerKPIs = useMemo(() => {
    const total = incidents.length;
    const open = incidents.filter(i => i.status !== 'Resolved').length;
    const critical = incidents.filter(i => i.severity === 'Critical' && i.status !== 'Resolved').length;
    const resolved = incidents.filter(i => i.status === 'Resolved').length;
    
    // Average resolution time (simulated delta)
    const activeCritical = incidents.filter(i => i.severity === 'Critical').length;
    const resolvedTodayCount = incidents.filter(i => i.status === 'Resolved' && i.reportedTime.includes("day")).length + 2;

    return {
      total,
      open,
      critical,
      resolved,
      resolvedToday: resolvedTodayCount,
      avgResolutionTime: "2.8 Hours",
      storePerformanceScore: activeCritical > 2 ? "91.8%" : "96.4%"
    };
  }, [incidents]);

  // Manager Editor Action Overlay State
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
    
    const updatedPayload = {
      ...editingIncident,
      severity: editSeverity,
      assignedManager: editManager,
      resolutionNotes: editNotes
    };

    onUpdateIncident(updatedPayload);
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
    <div className="min-h-screen bg-cyber text-slate-100 flex flex-col lg:flex-row">
      <Sidebar 
        userRole="manager" 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        profile={MANAGER_PROFILE}
        onLogout={onLogout}
      />

      {/* Operations Panel container */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full text-left relative z-10">
        
        {/* Profile Header Bar */}
        <section className="pb-6 border-b border-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-cyan-400 font-extrabold tracking-widest uppercase font-mono">
              🛡️ LEVEL-2 OPERATIONS MANAGER OVERVIEW
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-100 tracking-tight mt-1">
              Regional HQ Command Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Security Clearance:</span>
            <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              OVERRIDE PERMITTED
            </span>
          </div>
        </section>

        {/* Dynamic sub-view panels based on active tab state */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-6"
          >
            {/* VIEW: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Manager KPI Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-violet-500/5 rounded-full filter blur-lg pointer-events-none" />
                    <div>
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Total Incidents</span>
                      <strong className="text-2xl font-display font-black text-slate-100 block mt-1">{managerKPIs.total}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      <HiClipboardList className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-red-500/5 rounded-full filter blur-lg pointer-events-none" />
                    <div>
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Critical Active</span>
                      <strong className="text-2xl font-display font-black text-red-400 block mt-1 animate-pulse">{managerKPIs.critical}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                      <HiLightningBolt className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-full filter blur-lg pointer-events-none" />
                    <div>
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Resolved SLA</span>
                      <strong className="text-2xl font-display font-black text-cyan-400 block mt-1">{managerKPIs.avgResolutionTime}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <HiTrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-green-500/5 rounded-full filter blur-lg pointer-events-none" />
                    <div>
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Resolved Today</span>
                      <strong className="text-2xl font-display font-black text-green-400 block mt-1">{managerKPIs.resolved}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
                      <HiCheckCircle className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-full filter blur-lg pointer-events-none" />
                    <div>
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Regional Score</span>
                      <strong className="text-2xl font-display font-black text-cyan-400 block mt-1 text-glow-secondary">{managerKPIs.storePerformanceScore}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-cyan-500/15 text-cyan-300 border border-cyan-500/20">
                      <HiSparkles className="w-5 h-5 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Regional Analytics Telemetry Section */}
                <div className="p-5 rounded-3xl glass-panel border border-slate-850 space-y-4">
                  <h3 className="font-display font-bold text-xs text-slate-200 uppercase tracking-widest pb-2 border-b border-slate-900 flex items-center gap-1.5">
                    <HiTrendingUp className="w-4 h-4 text-cyan-400" />
                    Operational Analytics Dashboard
                  </h3>
                  <AnalyticsCharts incidents={incidents} />
                </div>

              </div>
            )}

            {/* VIEW: KANBAN BOARD */}
            {activeTab === 'kanban' && (
              <div className="space-y-4">
                
                {/* Kanban board wrapper */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch mt-4">
                  
                  {STATUSES.map((colName) => {
                    const cards = kanbanColumns[colName] || [];
                    
                    return (
                      <div 
                        key={colName} 
                        className="rounded-2xl p-4 bg-slate-950/60 border border-slate-900 flex flex-col gap-4 min-h-[500px]"
                      >
                        {/* Column Header */}
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${
                              colName === 'Open' ? 'bg-amber-400 shadow-[0_0_6px_#ffb703]' :
                              colName === 'Under Review' ? 'bg-blue-400 shadow-[0_0_6px_#3b82f6]' :
                              colName === 'In Progress' ? 'bg-cyan-400 shadow-[0_0_6px_#00f5ff]' :
                              'bg-green-400 shadow-[0_0_6px_#00ff94]'
                            }`} />
                            <h3 className="font-display font-bold text-xs text-slate-200 uppercase tracking-wider">{colName}</h3>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                            {cards.length}
                          </span>
                        </div>

                        {/* Column Incident Cards list */}
                        <div className="flex-1 space-y-3.5 overflow-y-auto max-h-[600px] pr-1">
                          {cards.map((inc) => (
                            <motion.div
                              layout
                              key={inc.id}
                              whileHover={{ scale: 1.01 }}
                              className={`p-4 rounded-xl bg-card-cyber border border-slate-800 hover:border-violet-500/30 text-left space-y-3 relative overflow-hidden`}
                              style={{
                                borderLeft: inc.severity === 'Critical' ? '3px solid #ff4d6d' :
                                             inc.severity === 'High' ? '3px solid #ffb703' :
                                             '3px solid #00f5ff'
                              }}
                            >
                              {/* Header info */}
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-[9px] font-mono text-slate-500 font-bold">{inc.id}</span>
                                <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                                  inc.severity === 'Critical' ? 'bg-red-500/15 text-red-400' :
                                  inc.severity === 'High' ? 'bg-amber-500/15 text-amber-400' :
                                  'bg-blue-500/15 text-blue-400'
                                }`}>
                                  {inc.severity}
                                </span>
                              </div>

                              <h4 className="text-xs font-bold text-slate-200 line-clamp-2 leading-snug">{inc.title}</h4>

                              <div className="text-[10px] text-slate-400 space-y-1">
                                <p className="truncate">Store: <strong className="text-slate-200">{inc.store}</strong></p>
                                <p className="truncate">Reported: <strong className="text-slate-200">{inc.reportedTime}</strong></p>
                              </div>

                              {/* Action controls */}
                              <div className="pt-2.5 border-t border-slate-900 flex items-center justify-between gap-2 mt-2">
                                <div className="flex gap-1.5">
                                  {/* Left shift arrow */}
                                  <button
                                    onClick={() => shiftStatus(inc.id, inc.status, 'backward')}
                                    disabled={inc.status === 'Open'}
                                    className="p-1 rounded bg-slate-950 border border-slate-850 hover:border-slate-700 text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                  >
                                    <HiArrowLeft className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Right shift arrow */}
                                  <button
                                    onClick={() => shiftStatus(inc.id, inc.status, 'forward')}
                                    disabled={inc.status === 'Resolved'}
                                    className="p-1 rounded bg-slate-950 border border-slate-850 hover:border-slate-700 text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                  >
                                    <HiArrowRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => openEditModal(inc)}
                                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-850 hover:border-violet-500/30 text-violet-400 hover:text-violet-300 text-[10px] font-bold flex items-center gap-0.5 cursor-pointer"
                                >
                                  <HiPencilAlt className="w-3.5 h-3.5" />
                                  <span>Manage</span>
                                </button>
                              </div>

                            </motion.div>
                          ))}
                          {cards.length === 0 && (
                            <div className="py-12 text-center text-slate-600 text-xs">Empty Column</div>
                          )}
                        </div>

                      </div>
                    );
                  })}

                </div>

              </div>
            )}

            {/* VIEW: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
                <h3 className="font-display font-bold text-xs text-slate-200 uppercase tracking-widest pb-2 border-b border-slate-900 flex items-center gap-1.5">
                  <HiTrendingUp className="w-4 h-4 text-cyan-400" />
                  Regional Analytics Telemetry Section
                </h3>
                <AnalyticsCharts incidents={incidents} />
              </div>
            )}

            {/* VIEW: STAFF LEADERBOARD */}
            {activeTab === 'staff' && (
              <div className="space-y-4">
                <h3 className="font-display font-bold text-xs text-slate-400 uppercase tracking-widest pb-1 border-b border-slate-900">
                  Regional Store Staff Performance
                </h3>
                
                <div className="rounded-2xl glass-panel border border-slate-800 overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-850 font-display font-bold text-slate-400">
                        <th className="p-4">Employee</th>
                        <th className="p-4">Location Affiliation</th>
                        <th className="p-4">Clearance</th>
                        <th className="p-4">Incidents Logged</th>
                        <th className="p-4 text-right">Accuracy Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      <tr className="hover:bg-slate-900/40">
                        <td className="p-4 flex items-center gap-3">
                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80" className="w-8 h-8 rounded-xl object-cover" />
                          <div>
                            <strong className="text-slate-100 block">Alex Carter</strong>
                            <span className="text-[10px] text-slate-500">EMP-2048</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-300">California Burrito - Delhi</td>
                        <td className="p-4 text-violet-400 font-bold uppercase text-[10px]">Level-1</td>
                        <td className="p-4 text-slate-300 font-mono font-bold">14 Logs</td>
                        <td className="p-4 text-right text-green-400 font-mono font-bold">98.2%</td>
                      </tr>
                      <tr className="hover:bg-slate-900/40">
                        <td className="p-4 flex items-center gap-3">
                          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=80" className="w-8 h-8 rounded-xl object-cover" />
                          <div>
                            <strong className="text-slate-100 block">Rohit Sharma</strong>
                            <span className="text-[10px] text-slate-500">EMP-9182</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-300">California Burrito - Noida</td>
                        <td className="p-4 text-violet-400 font-bold uppercase text-[10px]">Level-1</td>
                        <td className="p-4 text-slate-300 font-mono font-bold">8 Logs</td>
                        <td className="p-4 text-right text-green-400 font-mono font-bold">95.4%</td>
                      </tr>
                      <tr className="hover:bg-slate-900/40">
                        <td className="p-4 flex items-center gap-3">
                          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=80" className="w-8 h-8 rounded-xl object-cover" />
                          <div>
                            <strong className="text-slate-100 block">Priya Patel</strong>
                            <span className="text-[10px] text-slate-500">EMP-0294</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-300">California Burrito - Gurgaon</td>
                        <td className="p-4 text-violet-400 font-bold uppercase text-[10px]">Level-1</td>
                        <td className="p-4 text-slate-300 font-mono font-bold">11 Logs</td>
                        <td className="p-4 text-right text-green-400 font-mono font-bold">92.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* VIEW: AI INSIGHTS */}
            {activeTab === 'ai-insights' && (
              <div className="space-y-6">
                
                {/* Header Risk Score */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                  <div className="p-5 rounded-3xl glass-panel border border-slate-800 text-left flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <HiTerminal className="w-5 h-5 text-cyan-400" />
                        <h3 className="font-display font-bold text-xs uppercase tracking-widest text-slate-200">
                          Forecasting Risk Rating
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        Dynamic neural networks compute weekly risk ratios based on regional machine reports and transit delays.
                      </p>
                    </div>

                    <div className="mt-6 flex items-baseline gap-2">
                      <strong className="text-5xl font-display font-black text-cyan-400 text-glow-secondary">
                        {REGIONAL_RISK_SCORE}%
                      </strong>
                      <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded font-bold uppercase">
                        STABLE RISK
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-2 p-5 rounded-3xl neon-panel-primary relative overflow-hidden flex flex-col justify-between">
                    <div className="cyber-scanner-bar" />
                    
                    <div className="space-y-3 z-10">
                      <div className="flex items-center gap-1.5 text-violet-400">
                        <HiSparkles className="w-4.5 h-4.5 text-violet-400 animate-pulse" />
                        <h4 className="font-display font-bold text-xs uppercase tracking-wider">AI Command Core</h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Automatic diagnostic warnings: high temperature warnings on cooling units in Delhi NCR have been bypassed without technician confirmations. Resolving thermal triggers within 3 hours reduces overall regional risk models by 14%.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-900 text-[10px] text-slate-500">
                      Core Version: v4.2.1 • Risk Forecast: Active
                    </div>
                  </div>
                </div>

                {/* AI Predictions log */}
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-xs text-slate-400 uppercase tracking-widest pb-1.5 border-b border-slate-900">
                    Active AI Diagnostic Warnings ({AI_PREDICTIONS.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {AI_PREDICTIONS.map((pred) => (
                      <div key={pred.id} className="p-4.5 rounded-2xl bg-slate-950 border border-slate-900 space-y-4 text-left flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono text-slate-500 font-bold">{pred.id.toUpperCase()}</span>
                            <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded ${
                              pred.riskFactor === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/25' : 'bg-amber-500/10 text-amber-400'
                            }`}>
                              Risk: {pred.riskFactor}
                            </span>
                          </div>
                          
                          <h4 className="text-xs font-bold text-slate-200 leading-snug">
                            {pred.insight}
                          </h4>
                          <p className="text-[10px] text-slate-500 leading-relaxed italic">
                            "{pred.details}"
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-900 space-y-1.5">
                          <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest block font-display">
                            Recommended Action
                          </span>
                          <p className="text-[10px] text-slate-400 leading-relaxed font-sans font-medium">
                            {pred.action}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* VIEW: PROFILE */}
            {activeTab === 'profile' && (
              <UserProfile profile={MANAGER_PROFILE} userRole="manager" />
            )}

          </motion.div>
        </AnimatePresence>

        {/* Manager Editing modal overlays */}
        <AnimatePresence>
          {editingIncident && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingIncident(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg glass-modal rounded-3xl p-6 relative overflow-hidden border border-cyan-500/30 text-left"
              >
                <div className="cyber-scanner-bar" />
                
                <h3 className="font-display font-black text-lg text-slate-100 mb-2">
                  Incident Review Board
                </h3>
                <span className="text-[9px] font-mono text-cyan-400 block pb-3 border-b border-slate-900">
                  REF: {editingIncident.id} • Store: {editingIncident.store}
                </span>

                <form onSubmit={saveEditChanges} className="space-y-4 mt-4">
                  {/* Title and details preview */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Headline</span>
                    <strong className="text-xs text-slate-200 block">{editingIncident.title}</strong>
                    <p className="text-[10px] text-slate-400 leading-relaxed">{editingIncident.description}</p>
                  </div>

                  {/* Severity priority override */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">
                      Priority / Severity level
                    </label>
                    <select
                      value={editSeverity}
                      onChange={(e) => setEditSeverity(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 focus:border-cyan-500/70 rounded-xl text-xs text-slate-200 focus:outline-none cursor-pointer"
                    >
                      {SEVERITIES.map(sev => (
                        <option key={sev} value={sev}>{sev}</option>
                      ))}
                    </select>
                  </div>

                  {/* Assign Manager */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">
                      Assigned Operations Coordinator
                    </label>
                    <select
                      value={editManager}
                      onChange={(e) => setEditManager(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 focus:border-cyan-500/70 rounded-xl text-xs text-slate-200 focus:outline-none cursor-pointer"
                    >
                      <option value="Sarah Johnson">Sarah Johnson (Operations Manager)</option>
                      <option value="Amit Sharma (Regional Lead)">Amit Sharma (Regional Lead)</option>
                      <option value="Priya Nair (Compliance)">Priya Nair (Compliance)</option>
                    </select>
                  </div>

                  {/* Resolution Notes */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">
                      Resolution Logs & Action notes
                    </label>
                    <textarea
                      rows={3}
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Add step-by-step resolution feedback or escalation reasons..."
                      className="w-full p-2.5 bg-slate-950/60 border border-slate-800 focus:border-cyan-500/70 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none resize-none font-sans"
                    />
                  </div>

                  {/* Submit actions */}
                  <div className="pt-3 border-t border-slate-900 flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setEditingIncident(null)}
                      className="px-4 py-2 rounded-xl border border-slate-800 hover:bg-slate-900/60 text-slate-400 text-xs font-bold font-display cursor-pointer transition-all"
                    >
                      Close Review
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold font-display cursor-pointer transition-all border border-cyan-500/30 flex items-center gap-1 shadow-lg shadow-cyan-950/20"
                    >
                      <HiCheckCircle className="w-4 h-4" />
                      Save Log Alterations
                    </button>
                  </div>
                </form>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiPlusCircle, HiClipboardList, HiSparkles, HiTerminal, 
  HiExclamationCircle, HiLocationMarker, HiCheckCircle, HiArrowRight 
} from 'react-icons/hi';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';
import AIAssistant from '../components/AIAssistant';
import { STAFF_PROFILE, CATEGORIES, SEVERITIES, STORES } from '../data/cyberMockData';

export default function StaffDashboard({ incidents, onStatusChange, onSubmitIncident, onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [store, setStore] = useState("California Burrito - Delhi");
  const [severity, setSeverity] = useState("");
  
  // Focus states
  const [titleFocused, setTitleFocused] = useState(false);
  const [descFocused, setDescFocused] = useState(false);

  // AI Assist States inside form
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // Filter staff's own incidents (Delhi branch)
  const staffIncidents = useMemo(() => {
    return incidents.filter(inc => inc.store.includes("Delhi"));
  }, [incidents]);

  // Dynamic stats
  const staffStats = useMemo(() => {
    const total = staffIncidents.length;
    const open = staffIncidents.filter(i => i.status !== 'Resolved').length;
    const resolved = staffIncidents.filter(i => i.status === 'Resolved').length;
    return { total, open, resolved };
  }, [staffIncidents]);

  // AI parser inside form
  const handleFormAIAssist = () => {
    if (!description.trim()) {
      setFormErrors({ description: "Please describe the incident first so the AI can analyze it." });
      return;
    }
    setFormErrors({});
    setAiAnalyzing(true);
    setAiRecommendation(null);

    setTimeout(() => {
      const text = description.toLowerCase();
      let suggestedCategory = "Facility/Safety";
      let suggestedSeverity = "Medium";
      let summary = "Holographic telemetry logs recommend caution protocol.";

      if (text.includes("pos") || text.includes("card") || text.includes("payment") || text.includes("kiosk")) {
        suggestedCategory = "POS Issue";
        suggestedSeverity = "High";
        summary = "POS gateway delay detected. Direct merchant network diagnostics advised.";
      } else if (text.includes("freezer") || text.includes("temp") || text.includes("cool") || text.includes("fridge")) {
        suggestedCategory = "Kitchen Equipment";
        suggestedSeverity = "Critical";
        summary = "Critical cold-chain thermal anomaly threatening physical food stocks.";
      } else if (text.includes("water") || text.includes("leak") || text.includes("drain") || text.includes("sewer")) {
        suggestedCategory = "Facility/Safety";
        suggestedSeverity = "Critical";
        summary = "Fluid hazard pooling detected near public dining aisles.";
      } else if (text.includes("slip") || text.includes("fall") || text.includes("injury")) {
        suggestedCategory = "Customer Complaint";
        suggestedSeverity = "High";
        summary = "Physical accident logged; customer liability assessment in queue.";
      } else if (text.includes("delivery") || text.includes("supplier") || text.includes("truck")) {
        suggestedCategory = "Supply Chain";
        suggestedSeverity = "Medium";
        summary = "Supplier cargo timing offset detected; cross-branch stocks transfer advised.";
      }

      setAiRecommendation({
        category: suggestedCategory,
        severity: suggestedSeverity,
        summary
      });
      setAiAnalyzing(false);
    }, 1200);
  };

  const adoptAISuggestions = () => {
    if (!aiRecommendation) return;
    setCategory(aiRecommendation.category);
    setSeverity(aiRecommendation.severity);
    setAiRecommendation(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let errs = {};
    if (!title.trim()) errs.title = "Incident title is required.";
    if (!description.trim() || description.length < 15) errs.description = "Provide details (minimum 15 characters).";
    if (!category) errs.category = "Select incident category.";
    if (!severity) errs.severity = "Select severity rating.";

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      category,
      store,
      severity,
      status: "Open",
      reportedTime: "Just now",
      date: new Date().toISOString().split('T')[0],
      assignedManager: "Sarah Johnson",
      timelineProgress: ["Reported"],
      resolutionNotes: "Awaiting managerial queue validation.",
      createdDate: new Date().toISOString(),
      aiSummary: `Neural dispatch of ${category} created at Delhi store.`
    };

    onSubmitIncident(payload);
    
    // Clear forms
    setTitle("");
    setDescription("");
    setCategory("");
    setSeverity("");
    setFormErrors({});
    setActiveTab("my-incidents");
  };

  return (
    <div className="min-h-screen bg-cyber text-slate-100 flex flex-col lg:flex-row">
      <Sidebar 
        userRole="staff" 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        profile={STAFF_PROFILE}
        onLogout={onLogout}
      />

      {/* Main Panel Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full text-left relative z-10">
        
        {/* Profile Stats Header Bar */}
        <section className="pb-6 border-b border-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-violet-400 font-extrabold tracking-widest uppercase font-mono">
              🛡️ LEVEL-1 RESTAURANT STAFF CONTROL
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-100 tracking-tight mt-1">
              Store Operations Deck
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Delhi store status:</span>
            <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              SYSTEMS GREEN
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
            {/* VIEW: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                
                {/* Greeting Hero card */}
                <div className="p-6 rounded-3xl neon-panel-primary relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="cyber-scanner-bar" />
                  <div className="space-y-1 z-10 max-w-lg">
                    <h2 className="font-display font-bold text-xl text-slate-100">
                      Welcome Back, {STAFF_PROFILE.name}
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      You are authenticated on EMP-2048 at {STAFF_PROFILE.store}. Your gold-clearance metrics are active. Monitor warnings or report new store incidents.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab("report")}
                    className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-display text-xs font-bold shrink-0 z-10 border border-violet-500/30 flex items-center gap-1.5 cursor-pointer shadow-lg shadow-violet-950/20"
                  >
                    <HiPlusCircle className="w-4 h-4" />
                    Report New Incident
                  </button>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Submitted Logs</span>
                      <strong className="text-2xl font-display font-black text-slate-100 block mt-1">{staffStats.total}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      <HiClipboardList className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Active Open Issues</span>
                      <strong className="text-2xl font-display font-black text-cyan-400 block mt-1">{staffStats.open}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <HiTerminal className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Resolved Issues</span>
                      <strong className="text-2xl font-display font-black text-green-400 block mt-1">{staffStats.resolved}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20">
                      <HiCheckCircle className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Local store incidents queue review */}
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-xs text-slate-400 uppercase tracking-widest pb-1.5 border-b border-slate-900">
                    Delhi Store Live Logs ({staffIncidents.length})
                  </h3>
                  <div className="space-y-3">
                    {staffIncidents.slice(0, 3).map((inc) => (
                      <div key={inc.id} className="p-4 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-between gap-4">
                        <div className="text-left space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                              {inc.category}
                            </span>
                            <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                              inc.status === 'Resolved' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
                            }`}>
                              {inc.status}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-200">{inc.title}</h4>
                          <span className="text-[10px] text-slate-500 block">Reported {inc.reportedTime}</span>
                        </div>
                        <button 
                          onClick={() => setActiveTab("my-incidents")}
                          className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-center justify-center shrink-0"
                        >
                          <HiArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {staffIncidents.length === 0 && (
                      <div className="p-8 text-center text-slate-500 text-xs">No active store incidents logged.</div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* VIEW: REPORT INCIDENT */}
            {activeTab === 'report' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* Form parameters */}
                <div className="lg:col-span-2 rounded-3xl p-6 glass-panel border border-slate-800 space-y-5">
                  <div className="flex items-center gap-2">
                    <HiPlusCircle className="w-5 h-5 text-violet-400" />
                    <h2 className="font-display font-bold text-sm text-slate-200 uppercase tracking-widest">
                      Enter Incident Telemetry
                    </h2>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Floating Title */}
                    <div className="floating-label-group">
                      <input
                        type="text"
                        value={title}
                        onFocus={() => setTitleFocused(true)}
                        onBlur={() => setTitleFocused(false)}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-3 bg-slate-950/60 border border-slate-800 focus:border-violet-500/70 rounded-xl text-xs text-slate-200 placeholder-transparent focus:outline-none transition-all"
                      />
                      <label className={`floating-label text-xs ${titleFocused || title ? 'floating-label-active' : ''}`}>
                        Incident short headline / Alert Title
                      </label>
                      {formErrors.title && (
                        <span className="text-[10px] text-red-400 font-bold mt-1 block flex items-center gap-0.5">
                          <HiExclamationCircle className="w-3.5 h-3.5" />
                          {formErrors.title}
                        </span>
                      )}
                    </div>

                    {/* Floating Description */}
                    <div className="floating-label-group">
                      <textarea
                        value={description}
                        rows={4}
                        onFocus={() => setDescFocused(true)}
                        onBlur={() => setDescFocused(false)}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={500}
                        className="w-full px-3 py-3 bg-slate-950/60 border border-slate-800 focus:border-violet-500/70 rounded-xl text-xs text-slate-200 placeholder-transparent focus:outline-none transition-all resize-none"
                      />
                      <label className={`floating-label text-xs ${descFocused || description ? 'floating-label-active' : ''}`}>
                        Describe what occurred in detail (POS failures, broken press, etc.)...
                      </label>
                      <div className="flex items-center justify-between mt-1 text-[10px]">
                        <div>
                          {formErrors.description && (
                            <span className="text-red-400 font-bold block flex items-center gap-0.5">
                              <HiExclamationCircle className="w-3.5 h-3.5" />
                              {formErrors.description}
                            </span>
                          )}
                        </div>
                        <span className="text-slate-500">{description.length}/500 chars</span>
                      </div>
                    </div>

                    {/* Dropdowns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Category */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-display">
                          Incident Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 focus:border-violet-500/70 rounded-xl text-xs text-slate-200 focus:outline-none cursor-pointer"
                        >
                          <option value="">Select Category</option>
                          {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        {formErrors.category && <span className="text-[9px] text-red-400 font-bold block">{formErrors.category}</span>}
                      </div>

                      {/* Severity */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-display">
                          Severity Level
                        </label>
                        <select
                          value={severity}
                          onChange={(e) => setSeverity(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 focus:border-violet-500/70 rounded-xl text-xs text-slate-200 focus:outline-none cursor-pointer"
                        >
                          <option value="">Select Severity</option>
                          {SEVERITIES.map(sev => (
                            <option key={sev} value={sev}>{sev}</option>
                          ))}
                        </select>
                        {formErrors.severity && <span className="text-[9px] text-red-400 font-bold block">{formErrors.severity}</span>}
                      </div>
                    </div>

                    {/* Store location */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-display flex items-center gap-1">
                        <HiLocationMarker className="w-3.5 h-3.5" />
                        Active Store Location Affiliation
                      </label>
                      <input
                        type="text"
                        value={store}
                        disabled
                        className="w-full px-3 py-2 bg-slate-950/40 border border-slate-900 rounded-xl text-xs text-slate-500 focus:outline-none"
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 border-t border-slate-900 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setTitle("");
                          setDescription("");
                          setCategory("");
                          setSeverity("");
                          setAiRecommendation(null);
                        }}
                        className="px-4 py-2 rounded-xl border border-slate-800 hover:bg-slate-900/60 text-slate-400 text-xs font-bold font-display cursor-pointer transition-all"
                      >
                        Reset Form
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold font-display cursor-pointer transition-all border border-violet-500/30 flex items-center gap-1 shadow-lg shadow-violet-950/20"
                      >
                        <HiPlusCircle className="w-4 h-4" />
                        Submit Incident Log
                      </button>
                    </div>
                  </form>
                </div>

                {/* Form AI side helper panel */}
                <div className="space-y-4">
                  <div className="p-5 rounded-3xl neon-panel-primary relative overflow-hidden text-left flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full filter blur-xl pointer-events-none" />
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5">
                        <HiSparkles className="w-4.5 h-4.5 text-violet-400 animate-pulse" />
                        <h3 className="font-display font-bold text-xs text-slate-100 uppercase tracking-wider">
                          Form AI Assistant
                        </h3>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                        Need help scoring your report? Write your description on the left first, then click analyze below to fetch recommended categories and severity.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleFormAIAssist}
                      disabled={aiAnalyzing || !description.trim()}
                      className="w-full py-2 bg-violet-600/20 hover:bg-violet-600/35 border border-violet-500/30 text-violet-300 text-xs font-bold font-display rounded-xl mt-4 cursor-pointer flex items-center justify-center gap-1 transition-all"
                    >
                      {aiAnalyzing ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 text-violet-400" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          <span>Analyzing Description...</span>
                        </>
                      ) : (
                        <>
                          <span>✨ Analyze Description</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* AI result adopting card */}
                  <AnimatePresence>
                    {aiRecommendation && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="p-4 rounded-2xl bg-slate-950 border border-violet-500/30 text-left space-y-3 relative overflow-hidden"
                      >
                        <div className="cyber-scanner-bar" />
                        
                        <div className="space-y-2">
                          <span className="text-[8px] font-bold text-violet-400 uppercase tracking-widest block font-mono">
                            AI Diagnostic Core recommendation
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                              {aiRecommendation.category}
                            </span>
                            <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                              Severity: {aiRecommendation.severity}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed italic">
                            "{aiRecommendation.summary}"
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={adoptAISuggestions}
                          className="w-full py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-display text-[10px] font-bold cursor-pointer transition-all border border-violet-500/30 text-center"
                        >
                          Adopt AI Suggested Parameters
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            )}

            {/* VIEW: MY INCIDENTS */}
            {activeTab === 'my-incidents' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-900">
                  <div className="flex items-center gap-2">
                    <HiClipboardList className="w-5 h-5 text-slate-400" />
                    <h3 className="font-display font-bold text-xs text-slate-200 uppercase tracking-widest">
                      Track Submitted Incidents ({staffIncidents.length})
                    </h3>
                  </div>
                </div>

                {/* Staggered Cards List */}
                <div className="space-y-4">
                  {staffIncidents.map((inc) => (
                    <div 
                      key={inc.id}
                      className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col gap-4 text-left"
                    >
                      {/* Top bar info */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-850 text-slate-400 font-mono">
                            {inc.id}
                          </span>
                          <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                            {inc.category}
                          </span>
                          <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                            inc.severity === 'Critical' ? 'bg-red-500/15 text-red-400 border border-red-500/30' :
                            inc.severity === 'High' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                            'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                          }`}>
                            Severity: {inc.severity}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500">{inc.reportedTime}</span>
                      </div>

                      {/* Header details */}
                      <div className="space-y-1">
                        <h4 className="font-display font-bold text-slate-100 text-sm sm:text-base">
                          {inc.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          {inc.description}
                        </p>
                      </div>

                      {/* Progress Timeline Tracker */}
                      <div className="space-y-2 pt-2 border-t border-slate-900">
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block font-display">
                          Incident Resolution Progression Timeline
                        </span>
                        
                        {/* Horizontal timeline */}
                        <div className="flex items-center justify-between w-full max-w-lg mt-3 relative before:absolute before:left-2 before:right-2 before:top-2 before:h-[2px] before:bg-slate-800">
                          {["Reported", "Under Review", "In Progress", "Resolved"].map((step, idx) => {
                            // Verify active progression
                            const isCompleted = inc.status === 'Resolved' || 
                              (inc.status === 'In Progress' && step !== 'Resolved') ||
                              (inc.status === 'Under Review' && (step === 'Reported' || step === 'Under Review')) ||
                              (inc.status === 'Open' && step === 'Reported');
                            
                            const isActive = (inc.status === step) || (inc.status === 'Open' && step === 'Reported');

                            return (
                              <div key={step} className="flex flex-col items-center relative z-10 text-[9px]">
                                <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center font-bold text-[8px] transition-all duration-300 ${
                                  isActive 
                                    ? 'bg-violet-600 text-white border-violet-400 shadow-[0_0_8px_#8b5cf6]' 
                                    : isCompleted 
                                      ? 'bg-slate-900 text-violet-400 border-violet-500/30' 
                                      : 'bg-slate-950 text-slate-600 border-slate-900'
                                }`}>
                                  {isCompleted ? "✓" : idx + 1}
                                </div>
                                <span className={`mt-1 font-bold ${
                                  isActive ? 'text-violet-400 text-glow-primary' : isCompleted ? 'text-slate-300' : 'text-slate-600'
                                }`}>
                                  {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Resolution details drawer */}
                      {inc.resolutionNotes && (
                        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-900/60 text-left space-y-1">
                          <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest block font-display">
                            Resolution Notes
                          </span>
                          <p className="text-[11px] text-slate-400 font-medium">
                            {inc.resolutionNotes}
                          </p>
                          <span className="text-[9px] text-slate-500 block pt-1">
                            Coordinator: <strong className="text-slate-300">{inc.assignedManager}</strong>
                          </span>
                        </div>
                      )}

                    </div>
                  ))}
                  {staffIncidents.length === 0 && (
                    <div className="p-12 rounded-2xl glass-panel text-center text-slate-500 text-xs">
                      No tickets logged by you yet.
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
                <div className="p-5 rounded-3xl glass-panel border border-slate-800 text-left flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1.5 text-violet-400">
                      <HiTerminal className="w-5 h-5 text-violet-400" />
                      <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200">
                        Operational AI Core
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Our neural co-pilot parses NLP keywords in real time. It uses historic operational logs from hundreds of retail points to generate diagnostic profiles, risk scores, and standard safety playbooks instantly.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-900 text-[10px] text-slate-500">
                    Neural engine: Active-v4 • Delhi node
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: PROFILE */}
            {activeTab === 'profile' && (
              <UserProfile profile={STAFF_PROFILE} userRole="staff" />
            )}

          </motion.div>
        </AnimatePresence>

      </main>
    </div>
  );
}

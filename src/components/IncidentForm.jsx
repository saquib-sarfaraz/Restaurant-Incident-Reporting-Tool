import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlusCircle, HiExclamation, HiSparkles, HiShieldCheck } from 'react-icons/hi';
import { CATEGORIES, SEVERITIES, STORES } from '../data/mockIncidents';

export default function IncidentForm({ onSubmit, onCancel, defaultStore = "California Burrito - Saket" }) {
  // Form parameters
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [store, setStore] = useState(defaultStore);

  // Floating label focus states
  const [titleFocused, setTitleFocused] = useState(false);
  const [descFocused, setDescFocused] = useState(false);

  // AI assistant simulation states inside form
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleAIAssist = () => {
    if (!description.trim()) {
      setErrors({ description: "Please enter a detailed description of the incident so your AI colleague can analyze it." });
      return;
    }
    setErrors({});
    setAiAnalyzing(true);
    setAiRecommendation(null);

    // Friendly colleague AI response simulation
    setTimeout(() => {
      const text = description.toLowerCase();
      let suggestedCategory = "Facility/Safety";
      let suggestedSeverity = "Medium";
      let summary = "Identified potential compliance or physical safety issue.";
      let action = "Deploy safety signs and log coordinator dispatcher checks.";

      if (text.includes("pos") || text.includes("card") || text.includes("payment") || text.includes("kiosk")) {
        suggestedCategory = "POS Issue";
        suggestedSeverity = "High";
        summary = "Front counter transaction delay affecting checkouts.";
        action = "Power cycle checkout kiosk and activate standby manual card readers.";
      } else if (text.includes("cooler") || text.includes("freezer") || text.includes("temp") || text.includes("compressor") || text.includes("cooling")) {
        suggestedCategory = "Kitchen Equipment";
        suggestedSeverity = "Critical";
        summary = "Walk-in freezer temperature drift threatening perishable stocks.";
        action = "Relocate perishables immediately and call HVAC engineering technicians.";
      } else if (text.includes("water") || text.includes("leak") || text.includes("drain") || text.includes("sewer") || text.includes("spill")) {
        suggestedCategory = "Facility/Safety";
        suggestedSeverity = "High";
        summary = "Spill water accumulation on public floor creating slip liability.";
        action = "Clean fluid puddles instantly and deploy 'Wet Floor' warnings.";
      } else if (text.includes("delivery") || text.includes("supplier") || text.includes("truck") || text.includes("shipment")) {
        suggestedCategory = "Supply Chain";
        suggestedSeverity = "Medium";
        summary = "Transit cargo delay affecting avocado recipe schedules.";
        action = "Pre-arrange stand-by stock transfer from Gurgaon sister branch.";
      }

      setAiRecommendation({
        category: suggestedCategory,
        severity: suggestedSeverity,
        summary,
        action
      });
      setAiAnalyzing(false);
    }, 1200);
  };

  const adoptSuggestions = () => {
    if (!aiRecommendation) return;
    setCategory(aiRecommendation.category);
    setSeverity(aiRecommendation.severity);
    setAiRecommendation(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setSubmitError("");
    let tempErrors = {};
    if (!title.trim()) tempErrors.title = "Incident title is required.";
    else if (title.trim().length < 5) tempErrors.title = "Title must be at least 5 characters.";

    if (!description.trim()) tempErrors.description = "Incident description is required.";
    else if (description.trim().length < 15) tempErrors.description = "Description must be at least 15 characters.";

    if (!category) tempErrors.category = "Please select a category.";
    if (!severity) tempErrors.severity = "Please select a severity rating.";
    if (!store) tempErrors.store = "Please select a store location.";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
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
      resolutionNotes: "Awaiting review in the incident queue.",
      createdDate: new Date().toISOString(),
      aiSummary: `Helpful diagnostics of ${category} reported at Saket.`
    };

    try {
      setSubmitting(true);
      const created = await onSubmit(payload);
      const ref = created?.id || created?._id;
      setSuccessMessage(ref ? `Incident submitted successfully. Reference ID: ${ref}` : "Incident submitted successfully.");
      setTitle("");
      setDescription("");
      setCategory("");
      setSeverity("");
      setErrors({});
    } catch (err) {
      setSubmitError(err?.message || "Failed to submit incident.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start text-left">
      
      {/* Left Columns: Form Fields */}
      <div className="lg:col-span-2 p-6 rounded-2xl bg-card-saas border border-border-saas space-y-6">
        <div className="flex items-center gap-2">
          <HiPlusCircle className="w-5 h-5 text-[#6366F1]" />
          <h2 className="font-display font-bold text-sm text-text-main uppercase tracking-widest">
            Enter Incident Telemetry
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Floating Title Input */}
          <div className="floating-label-group">
            <input
              type="text"
              value={title}
              onFocus={() => setTitleFocused(true)}
              onBlur={() => setTitleFocused(false)}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-3.5 bg-bg-saas border border-border-saas focus:border-[#6366F1] rounded-xl text-xs text-text-main placeholder-transparent focus:outline-none transition-all focus:ring-2 focus:ring-[#6366F1]/20"
            />
            <label className={`floating-label text-xs sm:text-sm ${titleFocused || title ? 'floating-label-active' : ''}`}>
              Incident Alert Title / Short Headline
            </label>
            {errors.title && (
              <span className="text-[10px] text-red-500 font-bold mt-1 block flex items-center gap-0.5">
                <HiExclamation className="w-3.5 h-3.5" />
                {errors.title}
              </span>
            )}
          </div>

          {/* Floating Description Textarea */}
          <div className="floating-label-group">
            <textarea
              value={description}
              rows={4}
              onFocus={() => setDescFocused(true)}
              onBlur={() => setDescFocused(false)}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              className="w-full px-3.5 py-3.5 bg-bg-saas border border-border-saas focus:border-[#6366F1] rounded-xl text-xs text-text-main placeholder-transparent focus:outline-none transition-all focus:ring-2 focus:ring-[#6366F1]/20 resize-none font-sans"
            />
            <label className={`floating-label text-xs sm:text-sm ${descFocused || description ? 'floating-label-active' : ''}`}>
              Describe what occurred in detail (compressor leak, card swipes timeout, etc.)...
            </label>
            
            <div className="flex items-center justify-between mt-1 text-[10px]">
              <div>
                {errors.description && (
                  <span className="text-red-500 font-bold block flex items-center gap-0.5">
                    <HiExclamation className="w-3.5 h-3.5" />
                    {errors.description}
                  </span>
                )}
              </div>
              <span className="text-text-muted font-mono">{description.length}/500 chars</span>
            </div>
          </div>

          {/* Dropdown selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Dropdown */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-text-muted uppercase tracking-widest block font-display">
                Incident Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-bg-saas border border-border-saas focus:border-[#6366F1] rounded-xl text-xs text-text-main focus:outline-none cursor-pointer"
              >
                <option value="">Select Category</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <span className="text-[9px] text-red-500 font-bold block">{errors.category}</span>}
            </div>

            {/* Severity Dropdown */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-text-muted uppercase tracking-widest block font-display">
                Severity Level
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full px-3 py-2 bg-bg-saas border border-border-saas focus:border-[#6366F1] rounded-xl text-xs text-text-main focus:outline-none cursor-pointer"
              >
                <option value="">Select Severity</option>
                {SEVERITIES.map(sev => (
                  <option key={sev} value={sev}>{sev}</option>
                ))}
              </select>
              {errors.severity && <span className="text-[9px] text-red-500 font-bold block">{errors.severity}</span>}
            </div>
          </div>

          {/* Preset location */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-text-muted uppercase tracking-widest block font-display">
              Reporting Store Location Affiliation
            </label>
            <select
              value={store}
              onChange={(e) => setStore(e.target.value)}
              className="w-full px-3 py-2 bg-bg-saas border border-border-saas text-xs text-text-main rounded-xl focus:outline-none cursor-pointer"
            >
              {STORES.map(str => (
                <option key={str} value={str}>{str}</option>
              ))}
            </select>
          </div>

          {/* Form Actions */}
          {(successMessage || submitError) && (
            <div
              className={`p-3 rounded-xl border text-xs font-semibold ${
                successMessage
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              {successMessage || submitError}
            </div>
          )}

          <div className="pt-4 border-t border-border-saas flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl border border-border-saas hover:bg-bg-saas text-text-muted text-xs font-bold font-display cursor-pointer transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-[#6366F1] hover:bg-[#6366F1]/95 disabled:bg-bg-saas disabled:text-text-muted/40 disabled:border-border-saas text-white text-xs font-bold font-display cursor-pointer transition-all border border-transparent flex items-center gap-1.5 shadow-lg shadow-indigo-950/20"
            >
              <HiPlusCircle className="w-4 h-4" />
              <span>{submitting ? "Submitting..." : "Submit Report"}</span>
            </button>
          </div>

        </form>
      </div>

      {/* Right Column: AI Assistant colleague feedback */}
      <div className="space-y-4">
        <div className="p-5 rounded-2xl bg-card-saas border border-border-saas text-left flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-[#6366F1]">
              <HiSparkles className="w-4.5 h-4.5 text-[#6366F1] animate-pulse" />
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-text-main">
                AI Operations Assistant
              </h3>
            </div>
            <p className="text-[10px] text-text-muted leading-relaxed font-sans font-medium">
              Write a description on the left first, then click analyze. I will review it based on prior incident records and suggest categories, priority levels, and immediate recovery actions.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAIAssist}
            disabled={aiAnalyzing || !description.trim()}
            className="w-full py-2 bg-[#6366F1]/10 hover:bg-[#6366F1]/20 border border-[#6366F1]/30 text-[#6366F1] dark:text-indigo-300 text-xs font-bold font-display rounded-xl mt-5 cursor-pointer flex items-center justify-center gap-1.5 transition-all"
          >
            {aiAnalyzing ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-[#6366F1]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Reviewing details...</span>
              </>
            ) : (
              <>
                <span>✨ Analyze Incident details</span>
              </>
            )}
          </button>
        </div>

        {/* Adopt Recommendations Overlay */}
        <AnimatePresence>
          {aiRecommendation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 rounded-2xl bg-card-saas border border-[#6366F1]/25 text-left space-y-3 relative overflow-hidden"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-[9px] font-bold text-[#6366F1] uppercase tracking-widest font-mono">
                  <HiShieldCheck className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span>Colleague Diagnostics Advice</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20">
                    {aiRecommendation.category}
                  </span>
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-500/10 text-red-550 dark:text-red-400 border border-red-500/25">
                    Severity: {aiRecommendation.severity}
                  </span>
                </div>
                
                <p className="text-[10px] text-text-muted leading-relaxed italic">
                  "{aiRecommendation.summary}"
                </p>
                
                <div className="space-y-0.5 pt-1.5 border-t border-border-saas">
                  <span className="text-[8px] font-bold text-cyan-550 dark:text-cyan-400 uppercase tracking-widest block font-display">
                    Recommended Playbook Step
                  </span>
                  <p className="text-[10px] text-text-muted font-sans leading-relaxed">
                    {aiRecommendation.action}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={adoptSuggestions}
                className="w-full py-1.5 rounded-lg bg-[#6366F1] hover:bg-[#6366F1]/95 text-white font-display text-[10px] font-bold cursor-pointer transition-all border border-transparent text-center"
              >
                Adopt Recommendations
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

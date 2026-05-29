import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiPlusCircle, HiExclamation, HiCalendar, HiShieldExclamation } from 'react-icons/hi';
import { CATEGORIES, SEVERITIES, STORES } from '../data/mockIncidents';

export default function IncidentFormModal({ isOpen, onClose, onSubmitIncident }) {
  // Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [store, setStore] = useState("");
  const [severity, setSeverity] = useState("");
  
  // Floating label focus states
  const [titleFocused, setTitleFocused] = useState(false);
  const [descFocused, setDescFocused] = useState(false);

  // Validation States
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!title.trim()) tempErrors.title = "Incident Title is required";
    else if (title.trim().length < 5) tempErrors.title = "Title must be at least 5 characters";

    if (!description.trim()) tempErrors.description = "Detailed Description is required";
    else if (description.trim().length < 15) tempErrors.description = "Description must be at least 15 characters";

    if (!category) tempErrors.category = "Please select a Category";
    if (!store) tempErrors.store = "Please select a Store Location";
    if (!severity) tempErrors.severity = "Please select a Severity level";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Package new incident
      const newIncident = {
        title: title.trim(),
        description: description.trim(),
        category,
        store,
        severity,
        status: "Open",
        reportedTime: "Just now",
        date: new Date().toISOString().split('T')[0],
        aiSummary: `High-fidelity reporting of ${category} at ${store} logged by operations desk.`,
        actionPlan: [
          "Establish perimeter and safety check.",
          "Coordinate on-site diagnostic investigation.",
          "Inform district manager of immediate operational status."
        ]
      };

      onSubmitIncident(newIncident);
      handleReset();
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setStore("");
    setSeverity("");
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            {/* Modal Body Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()} // Stop bubble up
              className="w-full max-w-2xl glass-modal rounded-3xl p-6 sm:p-8 relative text-left my-8"
            >
              {/* Close Button */}
              <button
                onClick={handleReset}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-violet-500/30 transition-all cursor-pointer"
              >
                <HiX className="w-4 h-4" />
              </button>

              {/* Title Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-violet-600/20 border border-violet-500/20 rounded-2xl flex items-center justify-center text-violet-400">
                  <HiShieldExclamation className="w-6 h-6 text-violet-400 animate-pulse" />
                </div>
                <div>
                  <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-100 tracking-wide">
                    Report Operations Incident
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">
                    Submit incident parameters below to initiate a diagnostic playbook.
                  </p>
                </div>
              </div>

              {/* Form starts */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Floating Title Input */}
                <div className="floating-label-group">
                  <input
                    type="text"
                    value={title}
                    onFocus={() => setTitleFocused(true)}
                    onBlur={() => setTitleFocused(false)}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-3.5 bg-slate-950/60 border border-slate-800 focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/20 rounded-xl text-sm text-slate-200 placeholder-transparent focus:outline-none transition-all"
                  />
                  <label className={`floating-label text-xs sm:text-sm ${titleFocused || title ? 'floating-label-active' : ''}`}>
                    Incident Title / Short Headline
                  </label>
                  {errors.title && (
                    <span className="text-[10px] text-red-400 font-semibold mt-1 block flex items-center gap-1">
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
                    className="w-full px-3 py-3.5 bg-slate-950/60 border border-slate-800 focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/20 rounded-xl text-sm text-slate-200 placeholder-transparent focus:outline-none transition-all resize-none"
                  />
                  <label className={`floating-label text-xs sm:text-sm ${descFocused || description ? 'floating-label-active' : ''}`}>
                    Describe what happened in detail...
                  </label>
                  
                  {/* Footer under text area: Error & Counter */}
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      {errors.description && (
                        <span className="text-[10px] text-red-400 font-semibold block flex items-center gap-1">
                          <HiExclamation className="w-3.5 h-3.5" />
                          {errors.description}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      {description.length}/500 chars
                    </span>
                  </div>
                </div>

                {/* Dropdowns Grid (3 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Category dropdown */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-display">
                      Incident Category
                    </label>
                    <div className="relative flex items-center">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3.5 py-3 bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 rounded-xl text-xs text-slate-200 focus:outline-none cursor-pointer appearance-none pr-8"
                      >
                        <option value="">Choose Category</option>
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 pointer-events-none text-slate-500 text-[10px]">▼</div>
                    </div>
                    {errors.category && (
                      <span className="text-[9px] text-red-400 font-semibold mt-1 block flex items-center gap-0.5">
                        <HiExclamation className="w-3.5 h-3.5" />
                        {errors.category}
                      </span>
                    )}
                  </div>

                  {/* Store Selector */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-display">
                      Store Location
                    </label>
                    <div className="relative flex items-center">
                      <select
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                        className="w-full px-3.5 py-3 bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 rounded-xl text-xs text-slate-200 focus:outline-none cursor-pointer appearance-none pr-8"
                      >
                        <option value="">Select Location</option>
                        {STORES.map(str => (
                          <option key={str} value={str}>{str}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 pointer-events-none text-slate-500 text-[10px]">▼</div>
                    </div>
                    {errors.store && (
                      <span className="text-[9px] text-red-400 font-semibold mt-1 block flex items-center gap-0.5">
                        <HiExclamation className="w-3.5 h-3.5" />
                        {errors.store}
                      </span>
                    )}
                  </div>

                  {/* Severity level */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-display">
                      Severity Level
                    </label>
                    <div className="relative flex items-center">
                      <select
                        value={severity}
                        onChange={(e) => setSeverity(e.target.value)}
                        className="w-full px-3.5 py-3 bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 rounded-xl text-xs text-slate-200 focus:outline-none cursor-pointer appearance-none pr-8"
                      >
                        <option value="">Set Severity</option>
                        {SEVERITIES.map(sev => (
                          <option key={sev} value={sev}>{sev}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 pointer-events-none text-slate-500 text-[10px]">▼</div>
                    </div>
                    {errors.severity && (
                      <span className="text-[9px] text-red-400 font-semibold mt-1 block flex items-center gap-0.5">
                        <HiExclamation className="w-3.5 h-3.5" />
                        {errors.severity}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-end gap-3 mt-8">
                  {/* Cancel button */}
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl border border-slate-850 hover:bg-slate-900/60 text-slate-400 hover:text-slate-200 text-xs font-bold font-display cursor-pointer transition-all"
                  >
                    Cancel Submission
                  </button>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-bold font-display cursor-pointer transition-all flex items-center gap-1.5 border border-violet-500/30 shadow-lg shadow-violet-950/20"
                  >
                    <HiPlusCircle className="w-4.5 h-4.5" />
                    Submit Log Entry
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

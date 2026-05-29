import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSparkles, HiChevronRight, HiCheckCircle } from 'react-icons/hi';
import { api } from '../services/api';

export default function AIAssistant() {
  const [description, setDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!description.trim()) return;

    setAnalyzing(true);
    setResult(null);

    try {
      const analysis = await api.analyzeIncident(description, "staff", "Alex");
      if (analysis) {
        setResult({
          category: analysis.category,
          severity: analysis.severity,
          summary: analysis.summary,
          actionPlan: [analysis.recommendedAction].filter(Boolean)
        });
      }
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-card-saas border border-border-saas text-left relative flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
            <HiSparkles className="w-5 h-5 animate-pulse" />
          </div>
          <h3 className="font-display font-bold text-sm text-text-main uppercase tracking-widest">
            AI Assistant
          </h3>
        </div>
        
        <p className="text-xs text-text-muted leading-relaxed font-sans">
          Helping managers identify trends and prioritize incidents. Describe what occurred at your store to get diagnostics.
        </p>

        {/* Input box */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="E.g., The main cold table cooler is warning at 12°C and avocado supplies are running low..."
          rows={4}
          className="w-full p-3 bg-bg-saas border border-border-saas focus:border-indigo-500 rounded-xl text-xs text-text-main placeholder-slate-500 dark:placeholder-slate-650 focus:outline-none resize-none focus:ring-2 focus:ring-indigo-500/20 font-sans shadow-sm"
        />
      </div>

      {/* Button & outputs */}
      <div className="mt-4 space-y-4">
        <button
          onClick={handleAnalyze}
          disabled={analyzing || !description.trim()}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-bg-saas disabled:text-text-muted/40 disabled:border-border-saas text-white text-xs font-bold font-display cursor-pointer transition-all flex items-center justify-center gap-1.5 border border-indigo-500/30 shadow-lg shadow-indigo-950/20"
        >
          {analyzing ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Analyzing scenario...</span>
            </>
          ) : (
            <>
              <span>Analyse Incident</span>
              <HiChevronRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Diagnosis log drawer */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-bg-saas/50 border border-border-saas space-y-3 shadow-inner"
            >
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/25">
                  {result.category}
                </span>
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  result.severity === 'Critical' ? 'bg-red-500/15 text-red-500 dark:text-red-400 border border-red-550/25' :
                  result.severity === 'High' ? 'bg-amber-500/15 text-amber-500 dark:text-amber-400 border border-amber-550/25' :
                  'bg-blue-500/15 text-blue-500 dark:text-blue-400 border border-blue-550/25'
                }`}>
                  Colleague Suggested Severity: {result.severity}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest block font-display">
                  Incident Diagnostics Summary
                </span>
                <p className="text-xs text-text-main leading-relaxed font-sans italic">
                  "{result.summary}"
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-border-saas">
                <span className="text-[8px] font-bold text-brand-accent uppercase tracking-widest block font-display">
                  Recommended Immediate Protocol
                </span>
                <ul className="space-y-1">
                  {result.actionPlan.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[11px] text-text-muted leading-relaxed">
                      <HiCheckCircle className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

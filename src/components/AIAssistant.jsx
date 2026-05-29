import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSparkles, HiChevronRight, HiCheckCircle, HiOutlineEmojiHappy } from 'react-icons/hi';

export default function AIAssistant() {
  const [description, setDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  // Dynamic Keyword-based Analysis Engine (Simulation)
  const handleAnalyze = () => {
    if (!description.trim()) return;

    setAnalyzing(true);
    setResult(null);

    // Simulate AI processing delay of 1.5s
    setTimeout(() => {
      const text = description.toLowerCase();
      let category = "Facility/Safety";
      let severity = "Medium";
      let summary = "General operational incident reported at local retail outlet.";
      let actionPlan = [
        "Inspect the site to prevent escalating hazards.",
        "Inform the on-duty manager of the incident log.",
        "Take photographs of the scene for compliance documentation."
      ];

      // POS / Card Checkout Keywords
      if (text.includes("pos") || text.includes("card") || text.includes("payment") || text.includes("kiosk") || text.includes("charge")) {
        category = "POS Issue";
        severity = "High";
        summary = "Payment terminal checkout disruption impacting peak consumer purchase velocity.";
        actionPlan = [
          "Power cycle the affected counter or checkout kiosk.",
          "Activate stand-alone manual card readers to minimize customer delays.",
          "Verify merchant gateway status online or file IT support ticket."
        ];
      }
      // Temperature / Spoilage Keywords
      else if (text.includes("freezer") || text.includes("temperature") || text.includes("fridge") || text.includes("ice") || text.includes("cold") || text.includes("cooling")) {
        category = "Kitchen Equipment";
        severity = "Critical";
        summary = "Cold-chain thermal breach risking inventory loss and health-code infractions.";
        actionPlan = [
          "Transfer perishable assets immediately to secondary functional refrigeration unit.",
          "Verify door gasket seals for thermal integrity and ensure vents are free of ice build-up.",
          "Contact contracted emergency refrigeration vendor (e.g. CoolTech Support)."
        ];
      }
      // Water / Sewer / Plumbing Keywords
      else if (text.includes("water") || text.includes("leak") || text.includes("drain") || text.includes("sewer") || text.includes("pipe") || text.includes("flood")) {
        category = "Facility/Safety";
        severity = "Critical";
        summary = "Active liquid leak or sewage backup creating slipping risk and sanitation violation.";
        actionPlan = [
          "Shut off the main local incoming water line valve.",
          "Clean the pooling liquid and deploy high-visibility 'Wet Floor' signs.",
          "Call emergency plumbing service immediately."
        ];
      }
      // Customer / Injury / Slip Keywords
      else if (text.includes("slip") || text.includes("fall") || text.includes("customer") || text.includes("injury") || text.includes("hurt") || text.includes("accident")) {
        category = "Customer Complaint";
        severity = "High";
        summary = "On-premise visitor incident with potential liability; immediate care and reports required.";
        actionPlan = [
          "Render basic first-aid immediately and ask if professional medical attention is desired.",
          "Secure physical environment (dry floor or fix hazard) to prevent further incident.",
          "Record witness statements, visitor contact details, and back up CCTV security tape."
        ];
      }
      // Supply Chain Keywords
      else if (text.includes("delivery") || text.includes("supplier") || text.includes("truck") || text.includes("order") || text.includes("run out") || text.includes("ingredient")) {
        category = "Supply Chain";
        severity = "Medium";
        summary = "Delivery delay threatening ingredient stocks and menu availability.";
        actionPlan = [
          "Establish contact with supply dispatcher for real-time truck tracking status.",
          "Check secondary branches for emergency stock transfer possibilities.",
          "Instruct order takers to suggest alternative items if primary recipes sell out."
        ];
      }

      setResult({
        category,
        severity,
        summary,
        actionPlan
      });
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="p-5 rounded-2xl glass-panel-glow border border-violet-500/20 relative text-left h-full flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 rounded-full filter blur-2xl pointer-events-none" />
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-violet-500/20 text-violet-400">
            <HiSparkles className="w-5 h-5 text-violet-400 animate-pulse" />
          </div>
          <h3 className="font-display font-bold text-sm text-slate-100 uppercase tracking-wider">
            AI Incident Co-Pilot
          </h3>
        </div>
        <p className="text-[11px] text-slate-400 font-medium mb-4">
          Describe the situation below. Our neural diagnostics model will recommend classifications, severity scoring, and immediate action items.
        </p>

        {/* Text Area */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="E.g., POS kiosk #2 in Bandra is freezing and double charging credit cards during the evening rush..."
          rows={4}
          className="w-full p-3 bg-slate-950/60 border border-slate-800 focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/20 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none resize-none font-sans"
        />
      </div>

      <div className="mt-4 space-y-4">
        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={analyzing || !description.trim()}
          className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-950/20 disabled:text-slate-600 disabled:border-violet-950/10 text-white text-xs font-bold font-display cursor-pointer transition-all flex items-center justify-center gap-2 border border-violet-500/30 shadow-lg shadow-violet-950/20"
        >
          {analyzing ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Analyzing Scenario...</span>
            </>
          ) : (
            <>
              <span>✨ Analyze Incident Scenario</span>
              <HiChevronRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Results Presentation Panel */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
            >
              {/* Badges */}
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  {result.category}
                </span>
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  result.severity === 'Critical' ? 'bg-red-500/15 text-red-400 border border-red-500/30' :
                  result.severity === 'High' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                  'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                }`}>
                  AI Suggested Severity: {result.severity}
                </span>
              </div>

              {/* Summary */}
              <div className="space-y-1">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block font-display">
                  Automated Summary
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium italic">
                  "{result.summary}"
                </p>
              </div>

              {/* Action Plan Checklist */}
              <div className="space-y-1.5 pt-1 border-t border-slate-900">
                <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest block font-display">
                  Recommended Immediate Protocol
                </span>
                <ul className="space-y-1">
                  {result.actionPlan.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-400">
                      <HiCheckCircle className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

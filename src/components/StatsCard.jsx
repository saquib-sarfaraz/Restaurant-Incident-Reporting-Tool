import React from 'react';
import { motion } from 'framer-motion';

export default function StatsCard({ title, value, trend, trendType, icon: IconComponent }) {
  
  const getTrendStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'danger':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'warning':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700/80';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-5 rounded-2xl bg-card-saas border border-border-saas hover:border-[#6366F1]/30 transition-all duration-300 shadow-sm relative overflow-hidden flex flex-col justify-between"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest block font-display">
            {title}
          </span>
          <strong className="text-2xl sm:text-3xl font-display font-black text-text-main tracking-tight block">
            {value}
          </strong>
        </div>

        {/* Icon wrapper */}
        {IconComponent && (
          <div className="p-2.5 rounded-xl bg-bg-saas border border-border-saas text-[#6366F1]">
            <IconComponent className="w-5 h-5 text-[#6366F1]" />
          </div>
        )}
      </div>

      {/* Footer Trend alert */}
      {trend && (
        <div className="mt-4 pt-3 border-t border-border-saas flex items-center justify-between text-[10px]">
          <span className={`font-bold px-2 py-0.5 rounded-full border ${getTrendStyles(trendType)}`}>
            {trend}
          </span>
          <span className="text-text-muted/70 font-semibold uppercase font-mono">
            OPERATIONS
          </span>
        </div>
      )}

    </motion.div>
  );
}

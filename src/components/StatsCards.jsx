import React from 'react';
import { HiClipboardList, HiClock, HiLightningBolt, HiCheckCircle } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function StatsCards({ total, open, critical, resolved }) {
  const statsData = [
    {
      id: "total",
      title: "Total Incidents",
      value: total,
      trend: "+4 this week",
      trendType: "neutral",
      icon: HiClipboardList,
      color: "from-violet-500/20 to-purple-500/5",
      borderColor: "group-hover:border-violet-500/50",
      iconColor: "text-violet-400 bg-violet-500/10 border border-violet-500/20",
      glowColor: "rgba(124, 58, 237, 0.15)",
    },
    {
      id: "open",
      title: "Open Incidents",
      value: open,
      trend: "Requires attention",
      trendType: "warning",
      icon: HiClock,
      color: "from-cyan-500/20 to-blue-500/5",
      borderColor: "group-hover:border-cyan-500/50",
      iconColor: "text-cyan-400 bg-cyan-500/10 border border-cyan-500/20",
      glowColor: "rgba(6, 182, 212, 0.15)",
    },
    {
      id: "critical",
      title: "Critical Incidents",
      value: critical,
      trend: "Immediate action required",
      trendType: "danger",
      icon: HiLightningBolt,
      color: "from-red-500/20 to-rose-500/5",
      borderColor: "group-hover:border-red-500/50",
      iconColor: "text-red-400 bg-red-500/10 border border-red-500/20 animate-pulse",
      glowColor: "rgba(239, 68, 68, 0.2)",
    },
    {
      id: "resolved",
      title: "Resolved Incidents",
      value: resolved,
      trend: "94% target SLA rate",
      trendType: "success",
      icon: HiCheckCircle,
      color: "from-green-500/20 to-emerald-500/5",
      borderColor: "group-hover:border-green-500/50",
      iconColor: "text-green-400 bg-green-500/10 border border-green-500/20",
      glowColor: "rgba(34, 197, 94, 0.15)",
    }
  ];

  // Motion variants for container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mt-6"
    >
      {statsData.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={stat.id}
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative rounded-2xl p-5 glass-panel overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[rgba(15,23,42,0.8)] border border-slate-800/80 cursor-pointer"
            style={{
              boxShadow: `0 0 30px -10px ${stat.glowColor}`
            }}
          >
            {/* Subtle internal glowing element */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
            
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block font-display">
                  {stat.title}
                </span>
                
                {/* Count value */}
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="text-3xl font-extrabold text-slate-50 tracking-tight font-display"
                >
                  {stat.value}
                </motion.div>
              </div>

              {/* Status Icon */}
              <div className={`p-2.5 rounded-xl transition-all duration-300 ${stat.iconColor}`}>
                <IconComponent className="w-6 h-6" />
              </div>
            </div>

            {/* Trend status message */}
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between relative z-10">
              <span className={`text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-full ${
                stat.trendType === 'success' ? 'bg-green-500/10 text-green-400' :
                stat.trendType === 'danger' ? 'bg-red-500/10 text-red-400' :
                stat.trendType === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                'bg-slate-800 text-slate-400'
              }`}>
                {stat.trend}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase">
                Global KPI
              </span>
            </div>
            
            {/* Soft border transition accent */}
            <div className={`absolute bottom-0 inset-x-0 h-[2px] bg-slate-800 transition-colors duration-300 ${stat.borderColor}`} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

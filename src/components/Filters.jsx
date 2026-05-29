import React from 'react';
import { HiSearch, HiFilter, HiXCircle, HiFolder, HiExclamationCircle, HiClipboardCheck } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES, SEVERITIES, STATUSES } from '../data/mockIncidents';

export default function Filters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSeverity,
  setSelectedSeverity,
  selectedStatus,
  setSelectedStatus,
  resetFilters
}) {
  const isFiltering = searchQuery !== "" || selectedCategory !== "" || selectedSeverity !== "" || selectedStatus !== "";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="w-full mt-8 p-4 rounded-2xl glass-panel border border-slate-800/80 flex flex-col gap-4"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title / Description */}
        <div className="flex items-center gap-2">
          <HiFilter className="w-5 h-5 text-violet-400" />
          <span className="font-display font-semibold text-sm text-slate-300">Filter Incidents</span>
          {isFiltering && (
            <span className="text-[10px] bg-violet-500/20 text-violet-400 font-bold px-2 py-0.5 rounded-full animate-pulse">
              Active Filters
            </span>
          )}
        </div>

        {/* Clear filters shortcut */}
        <AnimatePresence>
          {isFiltering && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={resetFilters}
              className="self-start lg:self-auto flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors font-semibold py-1 px-2.5 rounded-lg bg-red-500/10 border border-red-500/20 cursor-pointer"
            >
              <HiXCircle className="w-4 h-4" />
              Reset All Filters
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative flex items-center">
          <HiSearch className="absolute left-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 rounded-xl text-xs text-slate-200 placeholder-slate-500 transition-all focus:outline-none"
          />
        </div>

        {/* Category Filter */}
        <div className="relative flex items-center">
          <HiFolder className="absolute left-3 w-4 h-4 text-slate-500 pointer-events-none" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 rounded-xl text-xs text-slate-300 focus:outline-none cursor-pointer appearance-none"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none text-slate-500 text-xs">▼</div>
        </div>

        {/* Severity Filter */}
        <div className="relative flex items-center">
          <HiExclamationCircle className="absolute left-3 w-4 h-4 text-slate-500 pointer-events-none" />
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 rounded-xl text-xs text-slate-300 focus:outline-none cursor-pointer appearance-none"
          >
            <option value="">All Severities</option>
            {SEVERITIES.map(sev => (
              <option key={sev} value={sev}>{sev}</option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none text-slate-500 text-xs">▼</div>
        </div>

        {/* Status Filter */}
        <div className="relative flex items-center">
          <HiClipboardCheck className="absolute left-3 w-4 h-4 text-slate-500 pointer-events-none" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 rounded-xl text-xs text-slate-300 focus:outline-none cursor-pointer appearance-none"
          >
            <option value="">All Statuses</option>
            {STATUSES.map(stat => (
              <option key={stat} value={stat}>{stat}</option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none text-slate-500 text-xs">▼</div>
        </div>
      </div>
    </motion.div>
  );
}

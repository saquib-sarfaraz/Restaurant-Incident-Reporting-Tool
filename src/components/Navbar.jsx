import React, { useState } from 'react';
import { HiShieldCheck, HiBell, HiSearch, HiOutlineAdjustments, HiUserCircle } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ searchFilter, setSearchFilter, openIncidentsCount, criticalIncidentsCount, activeIncidents = [] }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-panel px-4 lg:px-8 py-3 flex items-center justify-between border-b border-slate-800/80 backdrop-blur-md">
      {/* Brand logo */}
      <div className="flex items-center gap-3">
        <motion.div 
          className="p-2 bg-violet-600/20 border border-violet-500/30 rounded-xl flex items-center justify-center text-violet-400"
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiShieldCheck className="w-6 h-6 text-violet-500" />
        </motion.div>
        <div>
          <span className="font-display font-bold text-lg tracking-wider bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            INCIDENT HUB
          </span>
          <span className="block text-[10px] text-violet-400 font-semibold tracking-widest uppercase">
            RESTAURANT CHAIN CONTROLLER
          </span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
        <div className={`w-full relative flex items-center rounded-xl transition-all duration-300 ${searchFocused ? 'ring-2 ring-violet-500/50 bg-slate-900' : 'bg-slate-900/50 border border-slate-800'}`}>
          <HiSearch className={`absolute left-3 w-5 h-5 transition-colors duration-200 ${searchFocused ? 'text-violet-400' : 'text-slate-500'}`} />
          <input 
            type="text" 
            placeholder="Quick search across all stores..." 
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pl-10 pr-4 py-2 bg-transparent text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications Icon with Badge */}
        <div className="relative">
          <motion.button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/30 hover:bg-slate-800/50 text-slate-300 hover:text-violet-400 transition-all cursor-pointer relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HiBell className="w-5 h-5" />
            {criticalIncidentsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] font-bold text-white items-center justify-center">
                  {criticalIncidentsCount}
                </span>
              </span>
            )}
          </motion.button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <>
                {/* Backdrop overlay to close */}
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2.5 w-80 md:w-96 glass-panel-glow rounded-2xl p-4 z-50 text-left border border-slate-800"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="font-display font-semibold text-sm text-slate-200">Alerts & Notifications</h3>
                    <span className="text-xs bg-red-500/20 text-red-400 font-bold px-2 py-0.5 rounded-full">
                      {criticalIncidentsCount} Critical
                    </span>
                  </div>
                  
                  <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {activeIncidents.filter(inc => inc.severity === 'Critical' || inc.severity === 'High').slice(0, 4).map((inc) => (
                      <div 
                        key={inc.id} 
                        className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/20 transition-all flex flex-col gap-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded ${inc.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                            {inc.severity}
                          </span>
                          <span className="text-[10px] text-slate-500">{inc.reportedTime}</span>
                        </div>
                        <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">{inc.title}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2">{inc.description}</p>
                      </div>
                    ))}
                    {activeIncidents.length === 0 && (
                      <div className="py-8 text-center text-slate-500 text-xs">
                        🛡️ All systems green. No active incidents.
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800 text-center">
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors w-full cursor-pointer"
                    >
                      Close Panel
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User profile avatar */}
        <div className="flex items-center gap-2.5 border-l border-slate-800 pl-4">
          <div className="relative group">
            <motion.div 
              className="w-9 h-9 rounded-xl overflow-hidden border border-violet-500/30 flex items-center justify-center bg-violet-600/10 cursor-pointer relative"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                alt="HQ Controller Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {/* Fallback */}
              <HiUserCircle className="w-full h-full text-violet-500 hidden group-error:block" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-slate-950 rounded-full" />
            </motion.div>
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-200">Sarah Jenkins</span>
            <span className="text-[10px] text-violet-400 font-semibold tracking-wider">Store Operations Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
}

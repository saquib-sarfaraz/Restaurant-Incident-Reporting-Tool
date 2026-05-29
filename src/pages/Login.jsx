import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiShieldCheck, HiOutlineUserGroup, HiKey, HiFingerPrint, HiLightningBolt } from 'react-icons/hi';
import { STAFF_PROFILE, MANAGER_PROFILE } from '../data/cyberMockData';

export default function Login({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [currentLogIdx, setCurrentLogIdx] = useState(0);

  const logs = [
    "🤖 [HOLO_GATEWAY]: INITIALIZING SECURE OPERATIONAL SOCKET...",
    "🛡️ [SEC_ENG]: NEGOTIATING RSA-4096 COMPLIANCE HANDSHAKE...",
    "🛰️ [NET_SYS]: TUNNELING REGIONAL TELEMETRY FROM DELHI DATA HUB...",
    "⚡ [DB_CORE]: FETCHING PROFILE RECORDS FOR ACTIVE DIRECTORY...",
    "🔑 [AUTH_LOG]: MATCH FOUND. SIGNATURE VALIDATED.",
    "🚀 [SYSTEM]: DISPATCHING COMMAND INTERFACE. STAND BY..."
  ];

  // Trigger terminal typing simulation when a role is clicked
  useEffect(() => {
    if (selectedRole) {
      setTerminalLogs([]);
      setCurrentLogIdx(0);
    }
  }, [selectedRole]);

  useEffect(() => {
    if (selectedRole && currentLogIdx < logs.length) {
      const timeout = setTimeout(() => {
        setTerminalLogs(prev => [...prev, logs[currentLogIdx]]);
        setCurrentLogIdx(idx => idx + 1);
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [selectedRole, currentLogIdx]);

  const handleLoginSubmit = () => {
    if (!selectedRole) return;
    setLoading(true);

    // Simulate final biometric scans and gateway handshake
    setTimeout(() => {
      onLogin(selectedRole);
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-cyber text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Matrix-styles Glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-violet-900/10 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[45vw] h-[45vw] bg-cyan-900/10 rounded-full filter blur-[150px] pointer-events-none" />
      
      {/* Fine scanner horizontal bars */}
      <div className="cyber-scanlines absolute inset-0 opacity-40 pointer-events-none" />

      {/* Main Login Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-3xl glass-modal rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-violet-500/25 z-10"
      >
        <div className="cyber-scanner-bar" />

        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="flex justify-center">
            <motion.div 
              className="p-3 bg-cyan-500/15 border border-cyan-500/30 rounded-2xl text-cyan-400"
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              <HiShieldCheck className="w-9 h-9" />
            </motion.div>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl tracking-wider text-glow-secondary">
            INCIDENT MANAGEMENT HUB
          </h1>
          <span className="block text-xs text-violet-400 font-extrabold tracking-widest uppercase font-display">
            🛡️ NEURAL OPERATIONS CENTER — CORE PORTAL
          </span>
        </div>

        {/* Roles Selection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
          
          {/* Role Card: Staff */}
          <motion.div
            onClick={() => setSelectedRole("staff")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group rounded-2xl p-5 border cursor-pointer transition-all duration-300 relative overflow-hidden ${
              selectedRole === 'staff'
                ? 'bg-violet-950/40 border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.25)]'
                : 'bg-card-cyber/60 border-slate-800 hover:border-violet-500/30'
            }`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-full filter blur-xl ${selectedRole === 'staff' ? 'opacity-100' : 'opacity-0'}`} />
            
            <div className="flex items-center gap-3.5">
              <div className={`p-3 rounded-xl border ${
                selectedRole === 'staff' 
                  ? 'bg-violet-500/20 text-violet-400 border-violet-500/30' 
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}>
                <HiOutlineUserGroup className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-display font-bold text-sm text-slate-100 tracking-wide">
                  Staff Operations Portal
                </h3>
                <span className="text-[10px] text-violet-400 font-bold tracking-widest uppercase">
                  Level-1 Clearing
                </span>
              </div>
            </div>

            {/* Profile simulation preview */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center gap-3">
              <img 
                src={STAFF_PROFILE.avatar} 
                alt={STAFF_PROFILE.name} 
                className="w-10 h-10 rounded-xl object-cover border border-violet-500/20"
              />
              <div className="text-left text-xs">
                <span className="font-bold text-slate-200 block">{STAFF_PROFILE.name}</span>
                <span className="text-[10px] text-slate-400 font-medium">Store Staff • Delhi</span>
              </div>
              <span className="ml-auto text-[9px] bg-amber-500/10 text-amber-400 font-extrabold px-2 py-0.5 rounded border border-amber-500/25">
                {STAFF_PROFILE.performanceBadge}
              </span>
            </div>
          </motion.div>

          {/* Role Card: Manager */}
          <motion.div
            onClick={() => setSelectedRole("manager")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group rounded-2xl p-5 border cursor-pointer transition-all duration-300 relative overflow-hidden ${
              selectedRole === 'manager'
                ? 'bg-cyan-950/40 border-cyan-500 shadow-[0_0_20px_rgba(0,245,255,0.25)]'
                : 'bg-card-cyber/60 border-slate-800 hover:border-cyan-500/30'
            }`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-cyan-600/5 rounded-full filter blur-xl ${selectedRole === 'manager' ? 'opacity-100' : 'opacity-0'}`} />

            <div className="flex items-center gap-3.5">
              <div className={`p-3 rounded-xl border ${
                selectedRole === 'manager' 
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' 
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}>
                <HiKey className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-display font-bold text-sm text-slate-100 tracking-wide">
                  Operations Command
                </h3>
                <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">
                  Level-2 Override
                </span>
              </div>
            </div>

            {/* Profile simulation preview */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center gap-3">
              <img 
                src={MANAGER_PROFILE.avatar} 
                alt={MANAGER_PROFILE.name} 
                className="w-10 h-10 rounded-xl object-cover border border-cyan-500/20"
              />
              <div className="text-left text-xs">
                <span className="font-bold text-slate-200 block">{MANAGER_PROFILE.name}</span>
                <span className="text-[10px] text-slate-400 font-medium">Ops Manager • North India</span>
              </div>
              <span className="ml-auto text-[9px] bg-cyan-500/10 text-cyan-400 font-extrabold px-2 py-0.5 rounded border border-cyan-500/25">
                {MANAGER_PROFILE.storesManaged} Stores
              </span>
            </div>
          </motion.div>

        </div>

        {/* Dynamic Security Terminal Logger */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-900 font-mono text-[10px] text-left min-h-[110px] space-y-1 text-slate-400 max-h-[110px] overflow-y-auto">
          {selectedRole ? (
            terminalLogs.map((log, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={idx === logs.length - 1 ? 'text-green-400 font-bold' : ''}
              >
                {log}
              </motion.p>
            ))
          ) : (
            <p className="text-slate-600 animate-pulse">🤖 SELECT PORTAL IDENTIFIER TO INITIATE CRYPTO-LINK...</p>
          )}
        </div>

        {/* Holographic Action Button & Scanner */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 border-t border-slate-900 pt-6">
          <div className="flex items-center gap-2">
            <div className={`p-2.5 rounded-full border ${selectedRole ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-slate-900 text-slate-600 border-slate-800'}`}>
              <HiFingerPrint className={`w-6 h-6 ${selectedRole && !loading ? 'animate-pulse' : ''}`} />
            </div>
            <div className="text-left">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Scan Matrix</span>
              <span className="text-[10px] text-slate-300 font-bold block">Biometric Node Ready</span>
            </div>
          </div>

          <button
            onClick={handleLoginSubmit}
            disabled={!selectedRole || loading}
            className="w-full sm:w-auto sm:ml-auto px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 disabled:from-slate-950 disabled:to-slate-950 disabled:text-slate-600 disabled:border-slate-900 hover:from-violet-500 hover:to-cyan-400 text-white font-display text-xs font-black tracking-wider uppercase transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 border border-violet-500/30"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Decrypting Gateway...</span>
              </>
            ) : (
              <>
                <HiLightningBolt className="w-4 h-4 text-cyan-300" />
                <span>Initiate Security Handshake</span>
              </>
            )}
          </button>
        </div>

      </motion.div>
    </div>
  );
}

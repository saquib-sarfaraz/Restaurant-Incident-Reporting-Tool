import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiBell, HiLightningBolt, HiCheckCircle, HiExclamation } from 'react-icons/hi';

export default function NotificationHud({ notifications = [], onCloseNotification }) {
  
  const getAlertStyle = (type) => {
    switch (type) {
      case 'danger':
      case 'critical':
        return {
          border: 'border-red-500/40',
          bg: 'bg-red-950/70',
          text: 'text-red-400',
          icon: HiLightningBolt,
          glow: 'shadow-[0_0_15px_rgba(255,77,109,0.15)]'
        };
      case 'success':
        return {
          border: 'border-green-500/40',
          bg: 'bg-green-950/70',
          text: 'text-green-400',
          icon: HiCheckCircle,
          glow: 'shadow-[0_0_15px_rgba(0,255,148,0.15)]'
        };
      case 'warning':
        return {
          border: 'border-amber-500/40',
          bg: 'bg-amber-950/70',
          text: 'text-amber-400',
          icon: HiExclamation,
          glow: 'shadow-[0_0_15px_rgba(255,183,3,0.15)]'
        };
      default:
        return {
          border: 'border-cyan-500/40',
          bg: 'bg-cyan-950/70',
          text: 'text-cyan-400',
          icon: HiBell,
          glow: 'shadow-[0_0_15px_rgba(0,245,255,0.15)]'
        };
    }
  };

  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {notifications.map((notif) => {
          const styles = getAlertStyle(notif.type);
          const Icon = styles.icon;
          
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className={`pointer-events-auto w-full p-4 rounded-2xl glass-panel-glow border ${styles.border} ${styles.bg} ${styles.glow} flex items-start gap-3 relative`}
            >
              {/* Left icon wrapper */}
              <div className={`p-2 rounded-xl bg-slate-950 border border-slate-900 ${styles.text}`}>
                <Icon className="w-5 h-5" />
              </div>

              {/* Text content */}
              <div className="text-left flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-extrabold uppercase tracking-widest ${styles.text}`}>
                    {notif.type === 'danger' || notif.type === 'critical' ? '⚡ Emergency Alert' : '📡 Operations Alert'}
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">{notif.timestamp || "Just now"}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-100">{notif.title}</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">{notif.message}</p>
              </div>

              {/* Close action */}
              <button
                onClick={() => onCloseNotification(notif.id)}
                className="p-1 rounded bg-slate-950/40 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <HiX className="w-3 h-3" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

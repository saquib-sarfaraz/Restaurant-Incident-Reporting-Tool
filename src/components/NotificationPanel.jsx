import React from 'react';
import { motion } from 'framer-motion';
import { HiX, HiBell, HiLightningBolt, HiCheckCircle, HiExclamation, HiChevronRight } from 'react-icons/hi';

export default function NotificationPanel({ isOpen, onClose, notifications = [], onClearNotification }) {
  
  const getAlertStyles = (type) => {
    switch (type) {
      case 'danger':
      case 'critical':
        return {
          border: 'border-red-500/20',
          bg: 'bg-red-500/10',
          text: 'text-red-400',
          icon: HiLightningBolt
        };
      case 'success':
        return {
          border: 'border-green-500/20',
          bg: 'bg-green-500/10',
          text: 'text-green-400',
          icon: HiCheckCircle
        };
      case 'warning':
        return {
          border: 'border-amber-500/20',
          bg: 'bg-amber-500/10',
          text: 'text-amber-400',
          icon: HiExclamation
        };
      default:
        return {
          border: 'border-indigo-500/20',
          bg: 'bg-indigo-500/10',
          text: 'text-indigo-400',
          icon: HiBell
        };
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay to close */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      {/* Dropdown Container */}
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="absolute right-0 mt-3.5 w-80 sm:w-96 p-4 rounded-2xl bg-[#1E293B] border border-slate-700/80 shadow-2xl z-50 text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <HiBell className="w-4 h-4 text-indigo-400" />
            <h3 className="font-display font-bold text-xs text-slate-200 uppercase tracking-widest">
              Notification Center
            </h3>
          </div>
          {notifications.length > 0 && (
            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-bold px-2 py-0.5 rounded-full">
              {notifications.length} Active
            </span>
          )}
        </div>

        {/* Alerts List */}
        <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {notifications.map((notif) => {
            const styles = getAlertStyles(notif.type);
            const Icon = styles.icon;
            return (
              <div
                key={notif.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/25 transition-all flex items-start gap-3 relative group"
              >
                <div className={`p-1.5 rounded-lg shrink-0 ${styles.bg} ${styles.text}`}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 space-y-0.5 text-left text-xs min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-[8px] font-extrabold uppercase font-mono ${styles.text}`}>
                      {notif.type || 'SYSTEM'}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">{notif.timestamp}</span>
                  </div>
                  <h4 className="font-bold text-slate-200 line-clamp-1">{notif.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans">{notif.message}</p>
                </div>

                {/* Individual close action */}
                <button
                  onClick={() => onClearNotification(notif.id)}
                  className="p-1 rounded bg-slate-950/40 hover:bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-500 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                >
                  <HiX className="w-3 h-3" />
                </button>
              </div>
            );
          })}

          {notifications.length === 0 && (
            <div className="py-10 text-center text-slate-500 text-xs flex flex-col items-center gap-1.5">
              <span>📋</span>
              <span>No notifications in queue. Systems are clear.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors w-full cursor-pointer flex items-center justify-center gap-0.5"
          >
            <span>Close Panel</span>
            <HiChevronRight className="w-3 h-3" />
          </button>
        </div>
      </motion.div>
    </>
  );
}

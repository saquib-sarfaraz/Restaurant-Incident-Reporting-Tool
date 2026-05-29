import React, { useState } from 'react';
import { HiShieldCheck, HiSearch, HiBell, HiOutlineLogout, HiChevronDown } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationPanel from './NotificationPanel';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  notifications = [], 
  onClearNotification, 
  profile, 
  onLogout,
  onOpenProfile
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Count active warnings/critical alerts
  const criticalCount = notifications.filter(n => n.type === 'danger' || n.type === 'critical').length;

  return (
    <header className="sticky top-0 z-40 w-full bg-bg-saas/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between border-b border-border-saas">
      
      {/* Brand Logo (Visible only on mobile/tablet when sidebar is hidden) */}
      <div className="flex lg:hidden items-center gap-2">
        <div className="p-1.5 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-lg text-[#6366F1]">
          <HiShieldCheck className="w-5 h-5" />
        </div>
        <span className="font-display font-black text-sm tracking-wide text-text-main">
          Incident Hub
        </span>
      </div>

      {/* Central Search (SaaS Style) */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
        <div className={`w-full relative flex items-center rounded-xl transition-all duration-200 ${
          searchFocused 
            ? 'ring-2 ring-[#6366F1]/20 border-[#6366F1] bg-surface-saas' 
            : 'bg-surface-saas/55 border border-border-saas'
        }`}>
          <HiSearch className={`absolute left-3.5 w-4.5 h-4.5 transition-colors ${searchFocused ? 'text-[#6366F1]' : 'text-text-muted'}`} />
          <input
            type="text"
            placeholder="Search across stores, titles, IDs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pl-10 pr-4 py-2 bg-transparent text-text-main placeholder-text-muted/60 text-xs rounded-xl focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Actions: Notifications & Avatar */}
      <div className="flex items-center gap-3">
        
        {/* Notification button and dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-surface-saas/40 border border-border-saas hover:border-[#6366F1]/25 text-text-muted hover:text-text-main transition-all cursor-pointer relative"
          >
            <HiBell className="w-4.5 h-4.5" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-red-500 text-[9px] font-bold text-white items-center justify-center">
                  {notifications.length}
                </span>
              </span>
            )}
          </button>

          <AnimatePresence>
            <NotificationPanel
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
              notifications={notifications}
              onClearNotification={onClearNotification}
            />
          </AnimatePresence>
        </div>

        {/* Profile trigger button */}
        <div className="flex items-center border-l border-border-saas pl-4">
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-surface-saas border border-transparent hover:border-border-saas text-left transition-all cursor-pointer group"
          >
            {/* Circular Avatar */}
            <div className="relative shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-8 h-8 rounded-full object-cover border border-border-saas group-hover:border-[#6366F1]/30 transition-colors"
              />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border border-surface-saas rounded-full" />
            </div>
            
            {/* User Name & Role Badge with dropdown chevron */}
            <div className="hidden sm:flex flex-col text-xs min-w-0 text-left">
              <span className="font-bold text-text-main group-hover:text-[#6366F1] transition-colors block truncate leading-none">
                {profile.name.split(' ')[0]}
              </span>
              <span className="text-[10px] text-text-muted group-hover:text-text-main transition-colors flex items-center gap-1 font-sans truncate leading-none mt-1">
                <span>{profile.role}</span>
                <HiChevronDown className="w-3 h-3 text-text-muted group-hover:text-text-main transition-colors shrink-0" />
              </span>
            </div>
          </button>
        </div>

      </div>

    </header>
  );
}

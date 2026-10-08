import React, { useState } from 'react';
import {
  Menu,
  X,
  Compass,
  Bookmark,
  Bell,
  Sparkles,
  User,
  PlusCircle,
  Search,
  Radio,
  MapPin
} from 'lucide-react';
import { NotificationsDropdown } from './NotificationsDropdown';
import { NotificationItem } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: 'home' | 'discover' | 'opportunities' | 'challenges' | 'map' | 'about') => void;
  onOpenCreateProfile: () => void;
  onOpenSaved: () => void;
  savedCount: number;
  notifications: NotificationItem[];
  onMarkNotificationsRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
  onSearchFocus?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenCreateProfile,
  onOpenSaved,
  savedCount,
  notifications,
  onMarkNotificationsRead,
  onSelectNotification,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userProfilePopover, setUserProfilePopover] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const navLinks: { id: 'home' | 'discover' | 'opportunities' | 'challenges' | 'map' | 'about'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'discover', label: 'Discover' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'map', label: 'Map' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-300">
            {/* Spotlight icon motif */}
            <div className="absolute inset-0 rounded-xl bg-white/10 blur-xs" />
            <Radio className="w-5 h-5 text-cyan-200" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-slate-950" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                NO<span className="text-cyan-400">VA</span>
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase tracking-widest hidden sm:inline-block">
                Beta
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block -mt-1">
              Your talent deserves a stage
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'map' && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase">
                    Live
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-extrabold flex items-center justify-center ring-2 ring-slate-950">
                  {unreadCount}
                </span>
              )}
            </button>

            <NotificationsDropdown
              notifications={notifications}
              isOpen={notificationsOpen}
              onClose={() => setNotificationsOpen(false)}
              onMarkAllAsRead={onMarkNotificationsRead}
              onSelectNotification={(notif) => {
                setNotificationsOpen(false);
                onSelectNotification(notif);
              }}
            />
          </div>

          {/* Saved Bookmarks Button */}
          <button
            onClick={onOpenSaved}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition relative cursor-pointer"
            title="Saved Items"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-purple-500 text-white text-[10px] font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* Sign In demo toggle */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setUserProfilePopover(!userProfilePopover)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition flex items-center gap-1.5 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Sign In</span>
            </button>

            {userProfilePopover && (
              <div className="absolute right-0 top-12 w-64 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl text-xs text-white z-50 animate-in fade-in">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
                    RL
                  </div>
                  <div>
                    <h5 className="font-bold">Rahul Local (Demo)</h5>
                    <p className="text-[10px] text-slate-400">Vijayawada Hub</p>
                  </div>
                </div>
                <div className="pt-3 space-y-2 text-slate-300">
                  <button
                    onClick={() => {
                      setUserProfilePopover(false);
                      onOpenCreateProfile();
                    }}
                    className="w-full text-left py-1.5 hover:text-cyan-400 font-medium"
                  >
                    Edit My Talent Profile
                  </button>
                  <button
                    onClick={() => {
                      setUserProfilePopover(false);
                      onOpenSaved();
                    }}
                    className="w-full text-left py-1.5 hover:text-cyan-400 font-medium"
                  >
                    Saved Opportunities
                  </button>
                  <button
                    onClick={() => setUserProfilePopover(false)}
                    className="w-full text-left py-1.5 text-slate-500 hover:text-slate-300"
                  >
                    Switch Account
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Primary CTA: Create Profile */}
          <button
            onClick={onOpenCreateProfile}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/25 transition cursor-pointer select-none"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Profile</span>
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                currentView === item.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span>{item.label}</span>
              {item.id === 'map' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/30 text-cyan-300 uppercase">
                  Map View
                </span>
              )}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenCreateProfile();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold text-center"
            >
              + Create Talent Profile
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import React from 'react';
import { Bell, Check, Clock, ExternalLink, Sparkles, X } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsDropdownProps {
  notifications: NotificationItem[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
}

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAllAsRead,
  onSelectNotification,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider">Notifications</h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onMarkAllAsRead}
            className="text-[11px] text-cyan-300 hover:text-white transition flex items-center gap-1"
          >
            <Check className="w-3 h-3" />
            <span>Mark all read</span>
          </button>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500">
            No new notifications right now.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onSelectNotification(notif)}
              className={`p-3.5 hover:bg-slate-50 transition cursor-pointer flex items-start gap-3 ${
                notif.unread ? 'bg-cyan-50/50' : 'bg-white'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  notif.unread ? 'bg-cyan-500' : 'bg-transparent'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-900 leading-snug">
                    {notif.title}
                  </h5>
                  <span className="text-[10px] text-slate-400">{notif.time}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {notif.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
        Live community activity in Andhra & South India
      </div>
    </div>
  );
};

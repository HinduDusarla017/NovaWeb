import React, { useState } from 'react';
import { X, Send, Calendar, MapPin, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { TalentProfile } from '../types';

interface CollaborationModalProps {
  talent: TalentProfile | null;
  onClose: () => void;
}

export const CollaborationModal: React.FC<CollaborationModalProps> = ({ talent, onClose }) => {
  const [eventTitle, setEventTitle] = useState('College Cultural Fest 2026 - Acoustic Stage');
  const [organizerName, setOrganizerName] = useState('Cultural Committee, VRSEC Vijayawada');
  const [eventDate, setEventDate] = useState('2026-11-20');
  const [budgetOffer, setBudgetOffer] = useState('₹5,000 + Travel & Refreshments');
  const [message, setMessage] = useState(
    'Hi! We loved your performance clips on STAGELOCAL and would love to invite you to perform a 45-minute live set at our annual college fest.'
  );
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!talent) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-7">
          {sentSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Invitation Sent to {talent.name}!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {talent.name} has been notified on NOVA. You will receive an SMS and email notification once they accept.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                <img
                  src={talent.avatar}
                  alt={talent.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-cyan-500"
                />
                <div>
                  <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider block">
                    Invite to Event or Collab
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {talent.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {talent.skill} • {talent.city}
                  </p>
                </div>
              </div>

              <div className="text-xs space-y-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Event / Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Organizer / College Club *
                    </label>
                    <input
                      type="text"
                      required
                      value={organizerName}
                      onChange={(e) => setOrganizerName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Honorarium / Budget Offer
                  </label>
                  <input
                    type="text"
                    value={budgetOffer}
                    onChange={(e) => setBudgetOffer(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Personalized Message *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-600/20 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Invitation</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

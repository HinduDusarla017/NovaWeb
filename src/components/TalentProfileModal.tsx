import React, { useState } from 'react';
import {
  X,
  Star,
  MapPin,
  CheckCircle2,
  Bookmark,
  Share2,
  Calendar,
  MessageSquare,
  Compass,
  Award,
  Sparkles,
  ExternalLink,
  Send,
  Play,
  Instagram,
  Youtube,
  Radio,
  Check
} from 'lucide-react';
import { TalentProfile } from '../types';

interface TalentProfileModalProps {
  talent: TalentProfile | null;
  onClose: () => void;
  onViewOnMap: (talent: TalentProfile) => void;
  onOpenCollaboration: (talent: TalentProfile) => void;
  isSaved?: boolean;
  onToggleSave?: (talentId: string) => void;
}

export const TalentProfileModal: React.FC<TalentProfileModalProps> = ({
  talent,
  onClose,
  onViewOnMap,
  onOpenCollaboration,
  isSaved = false,
  onToggleSave,
}) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'about' | 'reviews'>('portfolio');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!talent) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition shadow-md"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Header Banner */}
          <div className="relative h-56 sm:h-64 bg-slate-900 overflow-hidden">
            <img
              src={talent.coverImage || talent.avatar}
              alt={talent.name}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Top Quick Actions */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                {talent.category}
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-medium border border-slate-700">
                {talent.availability}
              </span>
            </div>

            {/* Title / Avatar Overlay */}
            <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <img
                  src={talent.avatar}
                  alt={talent.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-white shadow-xl bg-white"
                />
                <div className="text-white pb-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold">{talent.name}</h2>
                    {talent.verified && (
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
                    )}
                  </div>
                  <p className="text-cyan-300 font-semibold text-sm sm:text-base">
                    {talent.skill} • {talent.experience}
                  </p>
                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{talent.locationDetails}</span>
                  </p>
                </div>
              </div>

              {/* Rating Box */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-amber-300 font-bold text-sm w-fit">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{talent.rating}</span>
                <span className="text-slate-400 text-xs font-normal">
                  ({talent.reviewsCount} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onViewOnMap(talent);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-xs transition"
              >
                <Compass className="w-4 h-4 text-cyan-600" />
                <span>View on Map</span>
              </button>

              {onToggleSave && (
                <button
                  onClick={() => onToggleSave(talent.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                    isSaved
                      ? 'bg-cyan-50 border-cyan-300 text-cyan-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-cyan-600' : ''}`} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
              )}

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-xs transition"
                title="Share profile"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'Copied Link' : 'Share'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenCollaboration(talent);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-cyan-600/20 transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Invite / Collaborate</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 border-b border-slate-200 flex items-center gap-6">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 transition ${
                activeTab === 'portfolio'
                  ? 'border-cyan-600 text-cyan-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Portfolio ({talent.portfolio.length})
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 transition ${
                activeTab === 'about'
                  ? 'border-cyan-600 text-cyan-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              About & Experience
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 transition ${
                activeTab === 'reviews'
                  ? 'border-cyan-600 text-cyan-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Endorsements ({talent.reviews.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* PORTFOLIO TAB */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {talent.portfolio.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition flex flex-col"
                    >
                      <div className="relative h-44 bg-slate-200 overflow-hidden">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition" />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold uppercase backdrop-blur-xs">
                          {item.type}
                        </div>
                        {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-cyan-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                              <Play className="w-5 h-5 ml-0.5 fill-white" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        {item.year && (
                          <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] text-slate-400 font-medium">
                            Released {item.year}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Connect bar */}
                <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-4 text-white flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold">Connect on Creative Channels</h4>
                    <p className="text-xs text-slate-300">
                      Explore full tracks, performances & artwork updates
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {talent.socials.instagram && (
                      <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition">
                        <Instagram className="w-3.5 h-3.5 text-pink-400" />
                        <span>{talent.socials.instagram}</span>
                      </span>
                    )}
                    {talent.socials.youtube && (
                      <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition">
                        <Youtube className="w-3.5 h-3.5 text-red-400" />
                        <span>{talent.socials.youtube}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ABOUT & EXPERIENCE TAB */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">
                    Biography
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                    {talent.bio}
                  </p>
                </div>

                {/* Key Skills & Tags */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Specializations & Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {talent.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Achievements */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Stage Milestones & Recognition</span>
                  </h4>
                  <div className="space-y-2">
                    {talent.achievements.map((ach, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-950 font-medium"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rates & Logistics Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 font-semibold block">
                      Estimated Rate
                    </span>
                    <span className="text-base font-bold text-slate-900 mt-1 block">
                      {talent.hourlyRate || 'Negotiable for student fests'}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 font-semibold block">
                      Base Location
                    </span>
                    <span className="text-base font-bold text-slate-900 mt-1 block">
                      {talent.city}, Andhra Pradesh
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* REVIEWS & ENDORSEMENTS TAB */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900">
                    Community Reviews & College Endorsements
                  </h4>
                  <span className="text-xs text-slate-500">Verified Stage Organizers</span>
                </div>

                {talent.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-bold text-slate-900">{rev.author}</h5>
                        <p className="text-xs text-cyan-700 font-medium">
                          {rev.role} {rev.organization && `• ${rev.organization}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 italic leading-relaxed">
                      "{rev.comment}"
                    </p>
                    <div className="text-[10px] text-slate-400">{rev.date}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

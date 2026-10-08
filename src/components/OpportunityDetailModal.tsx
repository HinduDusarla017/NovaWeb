import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Award,
  Users,
  CheckCircle2,
  Share2,
  Bookmark,
  Send,
  Building,
  AlertCircle,
  Check,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Opportunity } from '../types';

interface OpportunityDetailModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
  isSaved?: boolean;
  onToggleSave?: (opportunityId: string) => void;
  onViewOnMap?: (city: string) => void;
  initialApplyOpen?: boolean;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  onClose,
  isSaved = false,
  onToggleSave,
  onViewOnMap,
  initialApplyOpen = false,
}) => {
  const [isApplying, setIsApplying] = useState(initialApplyOpen);
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Application form fields
  const [applicantName, setApplicantName] = useState('Rahul Kumar');
  const [applicantPhone, setApplicantPhone] = useState('+91 98480 22334');
  const [applicantEmail, setApplicantEmail] = useState('rahulkumar.guitar@gmail.com');
  const [portfolioLink, setPortfolioLink] = useState('https://stagelocal.app/u/rahul-guitar');
  const [experienceNotes, setExperienceNotes] = useState(
    'Have performed at 15+ live college fests and acoustic events across Vijayawada and Hyderabad. Ready to deliver an energetic set!'
  );
  const [sampleTracks, setSampleTracks] = useState('Acoustic_Medley_Live.mp3');

  if (!opportunity) return null;

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSuccess(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition shadow-md"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Banner */}
          <div className="relative h-56 sm:h-64 bg-slate-900 overflow-hidden">
            <img
              src={opportunity.bannerImage}
              alt={opportunity.title}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                {opportunity.type}
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-medium border border-slate-700">
                {opportunity.category}
              </span>
            </div>

            {/* Title & Organizer */}
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <p className="text-xs sm:text-sm text-cyan-300 font-semibold flex items-center gap-1.5 mb-1">
                <Building className="w-4 h-4 text-cyan-400" />
                <span>{opportunity.organizer}</span>
              </p>
              <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                {opportunity.title}
              </h2>
            </div>
          </div>

          {/* Action Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {onViewOnMap && (
                <button
                  onClick={() => {
                    onClose();
                    onViewOnMap(opportunity.city);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-xs transition"
                >
                  <Compass className="w-3.5 h-3.5 text-cyan-600" />
                  <span>View City Hub</span>
                </button>
              )}

              {onToggleSave && (
                <button
                  onClick={() => onToggleSave(opportunity.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                    isSaved
                      ? 'bg-cyan-50 border-cyan-300 text-cyan-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-cyan-600' : ''}`} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
              )}

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-xs transition"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied Link' : 'Share'}</span>
              </button>
            </div>

            {!isApplying && !appliedSuccess && (
              <button
                onClick={() => setIsApplying(true)}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-cyan-600/20 transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Apply Now</span>
              </button>
            )}
          </div>

          {/* Modal Main Body */}
          <div className="p-6">
            {appliedSuccess ? (
              /* Application Success View */
              <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Your profile and portfolio have been securely sent to{' '}
                    <strong className="text-slate-700">{opportunity.organizer}</strong>.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Applicant:</span>
                    <span className="font-bold text-slate-800">{applicantName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Opportunity:</span>
                    <span className="font-semibold text-slate-800 truncate max-w-[180px]">
                      {opportunity.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Application ID:</span>
                    <span className="font-mono font-bold text-cyan-700">
                      STAGE-2026-OP{opportunity.id.slice(-2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Under Review
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
                  >
                    Done & Return
                  </button>
                </div>
              </div>
            ) : isApplying ? (
              /* APPLICATION FORM */
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Submit Your Application
                    </h3>
                    <p className="text-xs text-slate-500">
                      Apply with your verified NOVA talent details
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsApplying(false)}
                    className="text-xs text-slate-500 hover:text-slate-900 underline"
                  >
                    View Details
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Portfolio / Demo Reel Link *
                    </label>
                    <input
                      type="url"
                      required
                      value={portfolioLink}
                      onChange={(e) => setPortfolioLink(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-slate-700 font-semibold mb-1">
                    Why are you the right fit? (Pitch / Experience) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={experienceNotes}
                    onChange={(e) => setExperienceNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="p-3 bg-cyan-50/70 border border-cyan-200 rounded-xl text-xs text-cyan-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <span>
                    Your NOVA verified badge and ratings will be automatically attached to this submission.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsApplying(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-600/20 transition cursor-pointer"
                  >
                    Confirm & Submit Application
                  </button>
                </div>
              </form>
            ) : (
              /* NORMAL DETAILS VIEW */
              <div className="space-y-6">
                {/* Logistics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" /> Date
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 mt-1 block">
                      {opportunity.date}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-purple-600" /> Time
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 mt-1 block">
                      {opportunity.time || '10:00 AM - 6:00 PM'}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-600" /> Location
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 mt-1 block truncate">
                      {opportunity.city}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
                    <span className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> Deadline
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-amber-950 mt-1 block">
                      {opportunity.deadline}
                    </span>
                  </div>
                </div>

                {/* Compensation Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block">
                      Prize / Compensation / Stipend
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-amber-950 mt-0.5">
                      {opportunity.compensation}
                    </h3>
                  </div>
                  <Award className="w-8 h-8 text-amber-600 shrink-0" />
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    About this Opportunity
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                    {opportunity.description}
                  </p>
                </div>

                {/* Venue Details */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Venue & On-Ground Address</span>
                  </h4>
                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {opportunity.venue}
                  </p>
                </div>

                {/* Eligibility */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Eligibility & Criteria
                  </h4>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    {opportunity.eligibility}
                  </div>
                </div>

                {/* Perks list */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Included Benefits & Perks
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {opportunity.perks.map((perk, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-cyan-50/60 border border-cyan-200/60 text-xs text-cyan-900 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>{opportunity.applicantsCount} other artists applied</span>
                  </div>

                  <button
                    onClick={() => setIsApplying(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-sm font-bold shadow-md shadow-cyan-600/20 transition cursor-pointer"
                  >
                    <span>Proceed to Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

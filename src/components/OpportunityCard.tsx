import React from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Award,
  Users,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Opportunity } from '../types';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onSelect: (opportunity: Opportunity) => void;
  onApplyDirectly?: (opportunity: Opportunity) => void;
  isSaved?: boolean;
  onToggleSave?: (opportunityId: string) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onSelect,
  onApplyDirectly,
  isSaved = false,
  onToggleSave,
}) => {
  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case 'Audition':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Gig':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Competition':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Workshop':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Internship':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Banner Image */}
      <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
        <img
          src={opportunity.bannerImage}
          alt={opportunity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border backdrop-blur-md ${getTypeBadgeClass(
              opportunity.type
            )}`}
          >
            {opportunity.type}
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-black/50 text-white backdrop-blur-md">
            {opportunity.category}
          </span>
        </div>

        {/* Save button */}
        {onToggleSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(opportunity.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition ${
              isSaved
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60'
            }`}
            title="Save opportunity"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        )}

        {/* Bottom Banner Info */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[11px] text-cyan-300 font-medium">{opportunity.organizer}</p>
          <h3 className="text-base font-bold text-white line-clamp-1 leading-snug">
            {opportunity.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Key metadata */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-3">
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
              <span className="truncate">{opportunity.city}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{opportunity.date}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {opportunity.description}
          </p>

          {/* Compensation / Prize badge */}
          <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs font-semibold flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="truncate">{opportunity.compensation}</span>
          </div>

          {/* Perks tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {opportunity.perks.slice(0, 2).map((perk, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
              >
                ✓ {perk}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{opportunity.applicantsCount} applied</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(opportunity)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              Details
            </button>
            <button
              onClick={() => (onApplyDirectly ? onApplyDirectly(opportunity) : onSelect(opportunity))}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-xs hover:shadow transition cursor-pointer"
            >
              <span>Apply</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Star, MapPin, CheckCircle2, Bookmark, ExternalLink, Compass } from 'lucide-react';
import { TalentProfile } from '../types';

interface TalentCardProps {
  talent: TalentProfile;
  onSelect: (talent: TalentProfile) => void;
  onViewOnMap: (talent: TalentProfile) => void;
  isSaved?: boolean;
  onToggleSave?: (talentId: string) => void;
}

export const TalentCard: React.FC<TalentCardProps> = ({
  talent,
  onSelect,
  onViewOnMap,
  isSaved = false,
  onToggleSave,
}) => {
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Music':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Dance':
        return 'text-rose-600 bg-rose-50 border-rose-200';
      case 'Art':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Photography':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Film':
        return 'text-cyan-700 bg-cyan-50 border-cyan-200';
      case 'Speaking':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Writing':
        return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      case 'Crafts':
        return 'text-teal-700 bg-teal-50 border-teal-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Cover/Avatar Header */}
      <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
        <img
          src={talent.coverImage || talent.avatar}
          alt={talent.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Category & Status */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-md border ${getCategoryBadgeClass(
              talent.category
            )} shadow-xs`}
          >
            {talent.category}
          </span>
          {talent.trending && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/90 text-white shadow-xs">
              🔥 Trending
            </span>
          )}
        </div>

        {/* Save/Bookmark Button */}
        {onToggleSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(talent.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
              isSaved
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save profile'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        )}

        {/* Bottom Banner Info with Avatar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={talent.avatar}
              alt={talent.name}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-md"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-white leading-tight">
                  {talent.name}
                </h3>
                {talent.verified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
                )}
              </div>
              <p className="text-xs text-cyan-200 font-medium">{talent.skill}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{talent.rating}</span>
            <span className="text-[10px] text-slate-300 font-normal">
              ({talent.reviewsCount})
            </span>
          </div>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Experience meta */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
              <span>{talent.city}</span>
            </span>
            <span className="text-slate-400">Exp: {talent.experience}</span>
          </div>

          {/* Bio excerpt */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {talent.bio}
          </p>

          {/* Skill tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {talent.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
              >
                {tag}
              </span>
            ))}
            {talent.tags.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-medium">
                +{talent.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <button
            onClick={() => onViewOnMap(talent)}
            className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-cyan-600 transition px-2 py-1.5 rounded-lg hover:bg-cyan-50"
            title="View on Map"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-500" />
            <span>View on Map</span>
          </button>

          <button
            onClick={() => onSelect(talent)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs hover:shadow transition"
          >
            <span>View Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

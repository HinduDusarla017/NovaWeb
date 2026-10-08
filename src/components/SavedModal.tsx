import React, { useState } from 'react';
import { X, Bookmark, ExternalLink, Trash2, ArrowRight } from 'lucide-react';
import { TalentProfile, Opportunity } from '../types';

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTalentIds: string[];
  savedOpportunityIds: string[];
  allTalents: TalentProfile[];
  allOpportunities: Opportunity[];
  onSelectTalent: (talent: TalentProfile) => void;
  onSelectOpportunity: (opportunity: Opportunity) => void;
  onRemoveSavedTalent: (id: string) => void;
  onRemoveSavedOpportunity: (id: string) => void;
}

export const SavedModal: React.FC<SavedModalProps> = ({
  isOpen,
  onClose,
  savedTalentIds,
  savedOpportunityIds,
  allTalents,
  allOpportunities,
  onSelectTalent,
  onSelectOpportunity,
  onRemoveSavedTalent,
  onRemoveSavedOpportunity,
}) => {
  const [activeTab, setActiveTab] = useState<'talents' | 'opportunities'>('talents');

  if (!isOpen) return null;

  const savedTalents = allTalents.filter((t) => savedTalentIds.includes(t.id));
  const savedOpportunities = allOpportunities.filter((o) =>
    savedOpportunityIds.includes(o.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 bg-slate-900 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Bookmark className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold">My Saved Collection</h3>
          </div>
          <p className="text-xs text-slate-400">
            Keep track of talents to collaborate with and upcoming opportunities to apply for.
          </p>

          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('talents')}
              className={`text-xs font-bold py-1.5 border-b-2 transition ${
                activeTab === 'talents'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Saved Talents ({savedTalents.length})
            </button>
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`text-xs font-bold py-1.5 border-b-2 transition ${
                activeTab === 'opportunities'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Saved Opportunities ({savedOpportunities.length})
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'talents' ? (
            savedTalents.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                No saved talents yet. Browse talent cards and click the bookmark icon to save.
              </div>
            ) : (
              <div className="space-y-3">
                {savedTalents.map((talent) => (
                  <div
                    key={talent.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:bg-slate-100/80 transition"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={talent.avatar}
                        alt={talent.name}
                        className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          {talent.name}
                        </h4>
                        <p className="text-xs text-cyan-700 font-semibold">
                          {talent.skill} • {talent.city}
                        </p>
                        <span className="text-[11px] text-slate-400">
                          ⭐ {talent.rating} ({talent.reviewsCount} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectTalent(talent);
                        }}
                        className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition flex items-center gap-1"
                      >
                        <span>Profile</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onRemoveSavedTalent(talent.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : savedOpportunities.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              No saved opportunities yet. Bookmark college fests and gigs to review later.
            </div>
          ) : (
            <div className="space-y-3">
              {savedOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:bg-slate-100/80 transition"
                >
                  <div>
                    <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider block">
                      {opp.category} • {opp.type}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {opp.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      📍 {opp.city} • 📅 {opp.date} • 💰 {opp.compensation}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectOpportunity(opp);
                      }}
                      className="px-3 py-1.5 bg-cyan-600 text-white rounded-xl text-xs font-semibold hover:bg-cyan-500 transition flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onRemoveSavedOpportunity(opp.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

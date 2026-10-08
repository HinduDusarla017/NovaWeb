import React, { useState, useMemo } from 'react';
import {
  Search,
  Calendar,
  MapPin,
  Award,
  Filter,
  X,
  Briefcase,
  Sparkles,
  PlusCircle,
  Building
} from 'lucide-react';
import { Opportunity, OpportunityType, TalentCategory } from '../types';
import { OpportunityCard } from '../components/OpportunityCard';

interface OpportunitiesViewProps {
  opportunities: Opportunity[];
  onSelectOpportunity: (opportunity: Opportunity) => void;
  savedOpportunityIds: string[];
  onToggleSaveOpportunity: (id: string) => void;
}

const TYPES: ('All' | OpportunityType)[] = [
  'All',
  'Audition',
  'Gig',
  'Competition',
  'Workshop',
  'Collaboration',
  'Event',
  'Internship',
];

const CITIES = [
  'All Cities',
  'Vijayawada',
  'Guntur',
  'Hyderabad',
  'Visakhapatnam',
  'Bengaluru',
  'Chennai',
];

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  opportunities,
  onSelectOpportunity,
  savedOpportunityIds,
  onToggleSaveOpportunity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'All' | OpportunityType>('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        opp.title.toLowerCase().includes(q) ||
        opp.organizer.toLowerCase().includes(q) ||
        opp.description.toLowerCase().includes(q) ||
        opp.category.toLowerCase().includes(q) ||
        opp.city.toLowerCase().includes(q);

      const matchType = selectedType === 'All' || opp.type === selectedType;
      const matchCity =
        selectedCity === 'All Cities' || opp.city.toLowerCase() === selectedCity.toLowerCase();

      return matchQuery && matchType && matchCity;
    });
  }, [opportunities, searchQuery, selectedType, selectedCity]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedCity('All Cities');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider inline-block">
          Beyond Social Media
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          Find Your Next Opportunity
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Real college fests, acoustic gigs, short film auditions, and workshops looking for local talent right now.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-md space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search opportunities (e.g. College Fest, Dance Team, Acoustic Night, Audition)..."
            className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Opportunity Type Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedType === type
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              {type === 'All' ? '⚡ All Opportunities' : type}
            </button>
          ))}
        </div>

        {/* City Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-semibold">City:</span>
            <div className="flex items-center gap-1 overflow-x-auto">
              {CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCity(c)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    selectedCity === c
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <span className="text-slate-500">
            Showing <strong className="text-slate-900">{filteredOpportunities.length}</strong> opportunities
          </span>
        </div>
      </div>

      {/* Grid */}
      {filteredOpportunities.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Briefcase className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              No opportunities found matching your criteria.
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Try switching your filters or exploring events in neighboring cities like Vijayawada or Hyderabad.
            </p>
          </div>
          <button
            onClick={clearFilters}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onSelect={onSelectOpportunity}
              isSaved={savedOpportunityIds.includes(opp.id)}
              onToggleSave={onToggleSaveOpportunity}
            />
          ))}
        </div>
      )}
    </div>
  );
};

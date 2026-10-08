import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  Compass,
  X,
  Filter,
  Sparkles,
  CheckCircle2,
  Users
} from 'lucide-react';
import { TalentProfile, TalentCategory } from '../types';
import { TalentCard } from '../components/TalentCard';

interface DiscoverViewProps {
  talents: TalentProfile[];
  onSelectTalent: (talent: TalentProfile) => void;
  onViewTalentOnMap: (talent: TalentProfile) => void;
  savedTalentIds: string[];
  onToggleSaveTalent: (id: string) => void;
  initialSearchQuery?: string;
  onClearInitialSearch?: () => void;
}

const CATEGORIES: ('All' | TalentCategory)[] = [
  'All',
  'Music',
  'Dance',
  'Art',
  'Photography',
  'Writing',
  'Film',
  'Crafts',
  'Speaking',
];

const CITIES = [
  'All Cities',
  'Vijayawada',
  'Guntur',
  'Hyderabad',
  'Visakhapatnam',
  'Bengaluru',
  'Chennai',
  'Tirupati',
];

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  talents,
  onSelectTalent,
  onViewTalentOnMap,
  savedTalentIds,
  onToggleSaveTalent,
  initialSearchQuery = '',
  onClearInitialSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<'All' | TalentCategory>('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'views' | 'experience'>('recommended');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Sync external search query if given
  React.useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Filter and Sort talents
  const filteredTalents = useMemo(() => {
    let result = talents.filter((t) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.skill.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.bio.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q));

      // Category
      const matchCat = selectedCategory === 'All' || t.category === selectedCategory;

      // City
      const matchCity = selectedCity === 'All Cities' || t.city.toLowerCase() === selectedCity.toLowerCase();

      // Rating
      const matchRating = t.rating >= minRating;

      // Verified
      const matchVerified = !verifiedOnly || t.verified;

      return matchQuery && matchCat && matchCity && matchRating && matchVerified;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'views') return b.viewsCount - a.viewsCount;
      if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience);
      // Recommended: featured first, then rating
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });

    return result;
  }, [talents, searchQuery, selectedCategory, selectedCity, minRating, sortBy, verifiedOnly]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCity('All Cities');
    setMinRating(0);
    setVerifiedOnly(false);
    if (onClearInitialSearch) onClearInitialSearch();
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'All' ||
    selectedCity !== 'All Cities' ||
    minRating > 0 ||
    verifiedOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider inline-block">
          Talent Directory & Discovery
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          Discover Extraordinary Talent Around You
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Explore {talents.length} verified creators, instrumentalists, dancers, and visual artists across Vijayawada, Guntur, Hyderabad, and South India.
        </p>
      </div>

      {/* Main Search & Control Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-md space-y-4">
        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search talents, skills or names... (e.g. Rahul Kumar, Guitar, Singer, Vijayawada)"
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

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              {cat === 'All' ? '🌟 All Disciplines' : cat}
            </button>
          ))}
        </div>

        {/* Filter Secondary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100 text-xs">
          {/* Location filter */}
          <div>
            <label className="block text-slate-500 font-semibold mb-1">City Hub</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-none focus:border-cyan-500"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  📍 {c}
                </option>
              ))}
            </select>
          </div>

          {/* Rating filter */}
          <div>
            <label className="block text-slate-500 font-semibold mb-1">Minimum Rating</label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-none focus:border-cyan-500"
            >
              <option value="0">All Ratings</option>
              <option value="4.6">⭐ 4.6 & Above</option>
              <option value="4.8">⭐ 4.8 & Above (Top Rated)</option>
              <option value="4.9">⭐ 4.9 & Above (Master)</option>
            </select>
          </div>

          {/* Sorting */}
          <div>
            <label className="block text-slate-500 font-semibold mb-1">Sort Talents</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-none focus:border-cyan-500"
            >
              <option value="recommended">Recommended (Featured)</option>
              <option value="rating">Highest Rated</option>
              <option value="views">Most Viewed</option>
              <option value="experience">Most Experienced</option>
            </select>
          </div>

          {/* Verified Checkbox */}
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium select-none">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 rounded-sm"
              />
              <span>Verified Talents Only</span>
            </label>
          </div>
        </div>

        {/* Active Filters Bar */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500">
              Showing <strong className="text-slate-900">{filteredTalents.length}</strong> of{' '}
              {talents.length} talents
            </span>
            <button
              onClick={clearAllFilters}
              className="text-cyan-600 hover:text-cyan-800 font-semibold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Talent Cards Grid */}
      {filteredTalents.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              No talents match your search or filter.
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Try searching for broader skills like "Guitar", "Singing", or switch the city filter to "All Cities".
            </p>
          </div>
          <button
            onClick={clearAllFilters}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTalents.map((talent) => (
            <TalentCard
              key={talent.id}
              talent={talent}
              onSelect={onSelectTalent}
              onViewOnMap={onViewTalentOnMap}
              isSaved={savedTalentIds.includes(talent.id)}
              onToggleSave={onToggleSaveTalent}
            />
          ))}
        </div>
      )}
    </div>
  );
};

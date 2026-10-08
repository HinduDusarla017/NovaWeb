import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Star,
  ExternalLink,
  Search,
  Filter,
  Sparkles,
  Users
} from 'lucide-react';
import { TalentProfile, TalentCategory } from '../types';
import { InteractiveMap } from '../components/InteractiveMap';
import { CITY_COORDINATES } from '../data/mockData';

interface MapViewProps {
  talents: TalentProfile[];
  onSelectTalent: (talent: TalentProfile) => void;
  targetCity?: string | null;
  targetTalentId?: string | null;
}

const CATEGORIES: ('All' | TalentCategory)[] = [
  'All',
  'Music',
  'Dance',
  'Art',
  'Photography',
  'Film',
  'Speaking',
  'Writing',
  'Crafts',
];

export const MapView: React.FC<MapViewProps> = ({
  talents,
  onSelectTalent,
  targetCity,
  targetTalentId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | TalentCategory>('All');
  const [selectedCity, setSelectedCity] = useState<string>(targetCity || 'Vijayawada');
  const [highlightedTalent, setHighlightedTalent] = useState<string | null>(targetTalentId || null);

  const filteredList = talents.filter((t) => {
    const matchCat = selectedCategory === 'All' || t.category === selectedCategory;
    const matchCity =
      !selectedCity || selectedCity === 'All' || t.city.toLowerCase() === selectedCity.toLowerCase();
    return matchCat && matchCity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
            <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
              Hyperlocal Spatial Talent Discovery
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Interactive Talent Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Pinpoint emerging artists and college performers across Andhra Pradesh, Telangana, and South India.
          </p>
        </div>

        {/* Quick City Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {Object.keys(CITY_COORDINATES).map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
                selectedCity === city
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              📍 {city}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Filters and Talent Directory List */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4 max-h-[640px] flex flex-col">
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Filter by Category
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-cyan-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Found <strong className="text-slate-900">{filteredList.length}</strong> talents in{' '}
              {selectedCity}
            </span>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-cyan-600 hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          {/* Scrollable Talent Mini-List */}
          <div className="overflow-y-auto flex-1 space-y-2.5 pr-1 divide-y divide-slate-100">
            {filteredList.map((talent) => (
              <div
                key={talent.id}
                onClick={() => {
                  setHighlightedTalent(talent.id);
                }}
                className={`pt-2.5 first:pt-0 p-2 rounded-2xl transition cursor-pointer flex items-center justify-between gap-3 ${
                  highlightedTalent === talent.id
                    ? 'bg-cyan-50/80 border border-cyan-200 shadow-xs'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={talent.avatar}
                    alt={talent.name}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {talent.name}
                    </h4>
                    <p className="text-[11px] text-cyan-700 font-medium truncate">
                      {talent.skill} • {talent.category}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {talent.locationDetails}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="flex items-center gap-0.5 text-amber-500 text-[11px] font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{talent.rating}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTalent(talent);
                    }}
                    className="text-[10px] font-bold text-slate-700 hover:text-cyan-600 flex items-center gap-0.5"
                  >
                    <span>Profile</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Map */}
        <div className="lg:col-span-8">
          <InteractiveMap
            talents={talents}
            selectedCategory={selectedCategory}
            onSelectTalent={onSelectTalent}
            highlightedTalentId={highlightedTalent}
            targetCity={selectedCity}
            className="w-full h-[640px]"
          />
        </div>
      </div>
    </div>
  );
};

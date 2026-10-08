import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Navigation,
  ZoomIn,
  ZoomOut,
  Maximize2,
  SlidersHorizontal,
  Star,
  ExternalLink,
  Search,
  Sparkles,
  Info,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { TalentProfile, TalentCategory } from '../types';
import { CITY_COORDINATES } from '../data/mockData';

interface InteractiveMapProps {
  talents: TalentProfile[];
  selectedCategory?: string;
  onSelectTalent: (talent: TalentProfile) => void;
  highlightedTalentId?: string | null;
  targetCity?: string | null;
  className?: string;
  showTitle?: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  talents,
  selectedCategory = 'All',
  onSelectTalent,
  highlightedTalentId,
  targetCity,
  className = '',
  showTitle = true,
}) => {
  // Center coordinates (default Vijayawada: lat 16.5062, lng 80.6480)
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 16.5062, lng: 80.648 });
  const [zoom, setZoom] = useState<number>(2.4); // Visual scale
  const [activeTalent, setActiveTalent] = useState<TalentProfile | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userLocationName, setUserLocationName] = useState<string>('Vijayawada, AP');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationSuccessNotice, setLocationSuccessNotice] = useState<string | null>(null);

  // Sync category changes from parent if passed
  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // When targetCity changes or highlightedTalentId changes, refocus map
  useEffect(() => {
    if (highlightedTalentId) {
      const talent = talents.find((t) => t.id === highlightedTalentId);
      if (talent) {
        setCenter(talent.coordinates);
        setActiveTalent(talent);
        setUserLocationName(`${talent.city} (${talent.locationDetails})`);
        setZoom(3.2);
      }
    } else if (targetCity && CITY_COORDINATES[targetCity]) {
      setCenter(CITY_COORDINATES[targetCity]);
      setUserLocationName(`${targetCity}, South India`);
      setZoom(2.8);
      // Select the first talent in this city if any
      const inCity = talents.find((t) => t.city.toLowerCase() === targetCity.toLowerCase());
      if (inCity) {
        setActiveTalent(inCity);
      }
    }
  }, [highlightedTalentId, targetCity, talents]);

  // Filter talents by category and search
  const filteredTalents = talents.filter((t) => {
    const matchCategory = activeCategory === 'All' || t.category === activeCategory;
    const matchQuery =
      searchQuery.trim() === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.locationDetails.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  // Calculate city statistics for the active center city
  const currentCityTalents = talents.filter((t) => {
    const dLat = Math.abs(t.coordinates.lat - center.lat);
    const dLng = Math.abs(t.coordinates.lng - center.lng);
    return dLat < 0.35 && dLng < 0.35;
  });

  const cityMusicCount = currentCityTalents.filter((t) => t.category === 'Music').length || 7;
  const cityDanceCount = currentCityTalents.filter((t) => t.category === 'Dance').length || 4;
  const cityArtCount = currentCityTalents.filter((t) => t.category === 'Art').length || 5;
  const cityPhotoCount = currentCityTalents.filter((t) => t.category === 'Photography').length || 3;

  // Geographic projection bounds: Andhra Pradesh, Telangana, Karnataka, Tamil Nadu
  // Lat: 11.5 (South) to 19.5 (North) = span 8.0
  // Lng: 76.0 (West) to 84.5 (East) = span 8.5
  const minLat = 11.5;
  const maxLat = 19.5;
  const minLng = 76.0;
  const maxLng = 84.5;

  const projectToPercent = (coords: { lat: number; lng: number }) => {
    // Relative to center with zoom factor
    const baseNormX = (coords.lng - minLng) / (maxLng - minLng);
    const baseNormY = 1 - (coords.lat - minLat) / (maxLat - minLat);

    const centerNormX = (center.lng - minLng) / (maxLng - minLng);
    const centerNormY = 1 - (center.lat - minLat) / (maxLat - minLat);

    // Apply zoom and center offset
    const posX = 50 + (baseNormX - centerNormX) * 100 * zoom;
    const posY = 50 + (baseNormY - centerNormY) * 100 * zoom;

    return { x: posX, y: posY };
  };

  const handleCitySelect = (cityName: string) => {
    if (CITY_COORDINATES[cityName]) {
      setCenter(CITY_COORDINATES[cityName]);
      setUserLocationName(`${cityName}, South India`);
      setZoom(2.8);
      const match = talents.find((t) => t.city.toLowerCase() === cityName.toLowerCase());
      if (match) setActiveTalent(match);
      setLocationSuccessNotice(`Centered on ${cityName}`);
      setTimeout(() => setLocationSuccessNotice(null), 3000);
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setCenter(coords);
          setUserLocationName('Your Live GPS Location');
          setZoom(3.0);
          setLocationSuccessNotice('📍 Location selected successfully via GPS');
          setTimeout(() => setLocationSuccessNotice(null), 4000);
        },
        (err) => {
          setIsLocating(false);
          // Fallback to Vijayawada default gracefully
          setCenter(CITY_COORDINATES['Vijayawada']);
          setUserLocationName('Vijayawada (Default Demo Hub)');
          setLocationSuccessNotice('Using Vijayawada Hub (GPS permission skipped)');
          setTimeout(() => setLocationSuccessNotice(null), 3000);
        },
        { timeout: 7000 }
      );
    } else {
      setCenter(CITY_COORDINATES['Vijayawada']);
      setUserLocationName('Vijayawada Hub');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    // Check if user searched a known city
    const matchedCity = Object.keys(CITY_COORDINATES).find((c) =>
      c.toLowerCase().includes(query)
    );
    if (matchedCity) {
      handleCitySelect(matchedCity);
      return;
    }

    // Check if user searched a talent
    const matchedTalent = talents.find(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.skill.toLowerCase().includes(query) ||
        t.city.toLowerCase().includes(query)
    );
    if (matchedTalent) {
      setCenter(matchedTalent.coordinates);
      setActiveTalent(matchedTalent);
      setUserLocationName(`${matchedTalent.city} - ${matchedTalent.name}`);
      setZoom(3.2);
      setLocationSuccessNotice(`Found ${matchedTalent.name} in ${matchedTalent.city}`);
      setTimeout(() => setLocationSuccessNotice(null), 3000);
    }
  };

  const getCategoryColor = (cat: TalentCategory | string) => {
    switch (cat) {
      case 'Music':
        return 'bg-blue-600 text-white border-blue-400';
      case 'Dance':
        return 'bg-rose-600 text-white border-rose-400';
      case 'Art':
        return 'bg-purple-600 text-white border-purple-400';
      case 'Photography':
        return 'bg-amber-600 text-white border-amber-400';
      case 'Film':
        return 'bg-cyan-600 text-white border-cyan-400';
      case 'Speaking':
        return 'bg-emerald-600 text-white border-emerald-400';
      case 'Writing':
        return 'bg-indigo-600 text-white border-indigo-400';
      case 'Crafts':
        return 'bg-teal-600 text-white border-teal-400';
      default:
        return 'bg-slate-700 text-white border-slate-500';
    }
  };

  const getCategoryEmoji = (cat: TalentCategory | string) => {
    switch (cat) {
      case 'Music':
        return '🎸';
      case 'Dance':
        return '💃';
      case 'Art':
        return '🎨';
      case 'Photography':
        return '📸';
      case 'Film':
        return '🎬';
      case 'Speaking':
        return '🎤';
      case 'Writing':
        return '✍️';
      case 'Crafts':
        return '🧵';
      default:
        return '⭐';
    }
  };

  return (
    <div className={`relative flex flex-col bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl ${className}`}>
      {/* Top Map Bar / Controls */}
      <div className="z-20 bg-slate-950/90 backdrop-blur-md px-4 py-3 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Interactive Talent Radar</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{userLocationName}</span>
            </div>
          </div>
        </div>

        {/* Search input on map */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 min-w-[220px] max-w-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Vijayawada, Guitar, Singer..."
            className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </form>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUseMyLocation}
            disabled={isLocating}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 rounded-xl transition shadow-sm hover:text-white"
            title="Locate around your current position"
          >
            <Navigation className={`w-3.5 h-3.5 text-cyan-400 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating...' : 'Use My Location'}</span>
          </button>

          <div className="flex items-center bg-slate-800/80 rounded-xl border border-slate-700/80 p-0.5">
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.5, 4.5))}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.5, 1.2))}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setCenter({ lat: 16.5062, lng: 80.648 });
                setZoom(2.4);
                setUserLocationName('Vijayawada Hub');
              }}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition"
              title="Reset View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* City Presets Bar */}
      <div className="z-20 bg-slate-950/80 px-4 py-2 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
        <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
          <span>Hubs:</span>
        </span>
        {Object.keys(CITY_COORDINATES).map((city) => {
          const isSelected =
            Math.abs(CITY_COORDINATES[city].lat - center.lat) < 0.1 &&
            Math.abs(CITY_COORDINATES[city].lng - center.lng) < 0.1;
          return (
            <button
              key={city}
              onClick={() => handleCitySelect(city)}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>{city}</span>
            </button>
          );
        })}
      </div>

      {/* Success Notification Pill */}
      {locationSuccessNotice && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 px-4 py-1.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-1.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{locationSuccessNotice}</span>
        </div>
      )}

      {/* Map Canvas Area */}
      <div className="relative flex-1 min-h-[460px] md:min-h-[520px] bg-slate-950 overflow-hidden select-none">
        {/* Vector Background Grid & Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Stylized Coastal Line / Rivers / Road Network Vectors */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          {/* Stylized Krishna / Godavari Rivers & Coastline */}
          <path
            d="M 120 180 Q 280 240, 480 320 T 780 360 T 920 480"
            fill="none"
            stroke="url(#streamGrad)"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <path
            d="M 220 100 Q 380 280, 520 340 T 840 450"
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="2"
          />
          <path
            d="M 350 450 Q 500 480, 700 520 T 900 620"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
          {/* Highway network grid lines */}
          <line x1="15%" y1="0%" x2="85%" y2="100%" stroke="#334155" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="85%" y1="0%" x2="15%" y2="100%" stroke="#334155" strokeWidth="1" strokeDasharray="4 8" />
        </svg>

        {/* Interactive Talent Markers */}
        <div className="absolute inset-0 overflow-hidden">
          {filteredTalents.map((talent) => {
            const { x, y } = projectToPercent(talent.coordinates);
            // Hide markers that fall outside visible bounds
            if (x < -10 || x > 110 || y < -10 || y > 110) return null;

            const isSelected = activeTalent?.id === talent.id;
            const isHighlighted = highlightedTalentId === talent.id;

            return (
              <div
                key={talent.id}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -100%)',
                }}
                className={`absolute z-10 transition-transform duration-300 cursor-pointer ${
                  isSelected || isHighlighted ? 'z-30 scale-110' : 'hover:scale-105'
                }`}
                onClick={() => setActiveTalent(talent)}
              >
                {/* Radar pulse effect for selected or highlighted talent */}
                {(isSelected || isHighlighted) && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-cyan-400/30 rounded-full animate-ping pointer-events-none" />
                )}

                {/* Pin Card */}
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border shadow-xl backdrop-blur-md transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-cyan-400 ring-2 ring-cyan-400/50 shadow-cyan-500/40'
                      : 'bg-slate-900/90 text-slate-200 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <img
                    src={talent.avatar}
                    alt={talent.name}
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-700"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-bold leading-tight flex items-center gap-1">
                      <span>{getCategoryEmoji(talent.category)}</span>
                      <span>{talent.name.split(' ')[0]}</span>
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium leading-none">
                      {talent.skill}
                    </span>
                  </div>
                  <div className="ml-0.5 px-1 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-semibold flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span>{talent.rating}</span>
                  </div>
                </div>

                {/* Pin pointer triangle */}
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-800 mx-auto -mt-0.5" />
              </div>
            );
          })}
        </div>

        {/* Selected Talent Detailed Popover Preview */}
        {activeTalent && (
          <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:w-96 z-30 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={activeTalent.avatar}
                    alt={activeTalent.name}
                    className="w-14 h-14 rounded-xl object-cover ring-2 ring-cyan-500/50 shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-cyan-600 text-white rounded text-[10px] font-bold">
                    {getCategoryEmoji(activeTalent.category)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-base font-bold text-white leading-tight">
                      {activeTalent.name}
                    </h4>
                    {activeTalent.verified && (
                      <span className="text-cyan-400 text-xs" title="Verified Talent">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-cyan-300 font-medium mt-0.5">
                    {activeTalent.skill} • {activeTalent.experience}
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{activeTalent.locationDetails}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTalent(null)}
                className="text-slate-400 hover:text-white p-1 text-xs"
                title="Close"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 line-clamp-2 mt-3 leading-relaxed">
              "{activeTalent.bio}"
            </p>

            <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{activeTalent.rating}</span>
                <span className="text-slate-400 font-normal">({activeTalent.reviewsCount} reviews)</span>
              </div>
              <button
                onClick={() => onSelectTalent(activeTalent)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-semibold shadow-md shadow-cyan-500/20 transition cursor-pointer"
              >
                <span>View Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* City Stats Overlay Card */}
        <div className="absolute top-4 right-4 z-20 bg-slate-950/85 backdrop-blur-md border border-slate-800/80 rounded-xl p-3 shadow-xl max-w-[210px] hidden sm:block">
          <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Talent In This Hub</span>
          </div>
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1">🎸 Musicians</span>
              <span className="font-bold text-cyan-300">{cityMusicCount * 3 + 3}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1">💃 Dancers</span>
              <span className="font-bold text-rose-300">{cityDanceCount * 3 + 6}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1">🎨 Artists</span>
              <span className="font-bold text-purple-300">{cityArtCount * 4 + 7}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1">📸 Photographers</span>
              <span className="font-bold text-amber-300">{cityPhotoCount * 3 + 3}</span>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
            Local talent active in college fests & events
          </div>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 right-4 z-20 bg-slate-950/80 backdrop-blur-md border border-slate-800/80 rounded-xl px-3 py-1.5 text-[11px] text-slate-400 hidden lg:flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Music
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Dance
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-500" /> Art
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Photo
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-500" /> Film
          </span>
        </div>
      </div>
    </div>
  );
};

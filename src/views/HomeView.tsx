import React, { useState, useEffect } from 'react';
import {
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  Star,
  Users,
  Award,
  Calendar,
  CheckCircle2,
  Play,
  TrendingUp,
  Search,
  Radio,
  Flame,
  ChevronRight
} from 'lucide-react';
import { TalentProfile, Opportunity, Challenge } from '../types';
import { TALENT_CATEGORIES } from '../data/mockData';
import { TalentCard } from '../components/TalentCard';
import { OpportunityCard } from '../components/OpportunityCard';
import { InteractiveMap } from '../components/InteractiveMap';

interface HomeViewProps {
  talents: TalentProfile[];
  opportunities: Opportunity[];
  challenges: Challenge[];
  onNavigate: (view: 'home' | 'discover' | 'opportunities' | 'challenges' | 'map' | 'about') => void;
  onSelectTalent: (talent: TalentProfile) => void;
  onViewTalentOnMap: (talent: TalentProfile) => void;
  onSelectOpportunity: (opportunity: Opportunity) => void;
  onSelectChallenge: (challenge: Challenge) => void;
  onOpenCreateProfile: () => void;
  savedTalentIds: string[];
  savedOpportunityIds: string[];
  onToggleSaveTalent: (id: string) => void;
  onToggleSaveOpportunity: (id: string) => void;
  onSearchQueryPreset?: (query: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  talents,
  opportunities,
  challenges,
  onNavigate,
  onSelectTalent,
  onViewTalentOnMap,
  onSelectOpportunity,
  onSelectChallenge,
  onOpenCreateProfile,
  savedTalentIds,
  savedOpportunityIds,
  onToggleSaveTalent,
  onToggleSaveOpportunity,
  onSearchQueryPreset,
}) => {
  const [heroSearch, setHeroSearch] = useState('');

  // Counter animations
  const [stats, setStats] = useState({ talents: 0, opps: 0, cities: 0, events: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ talents: 10420, opps: 540, cities: 124, events: 260 });
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchQueryPreset && heroSearch) {
      onSearchQueryPreset(heroSearch);
    }
    onNavigate('discover');
  };

  const featuredTalents = talents.filter((t) => t.featured).slice(0, 4);
  const trendingChallenges = challenges.slice(0, 3);
  const featuredOpportunities = opportunities.slice(0, 3);

  // Floating hero demo cards
  const heroCard1 = talents.find((t) => t.name === 'Rahul Kumar') || talents[0];
  const heroCard2 = talents.find((t) => t.name === 'Ananya Reddy') || talents[1];
  const heroCard3 = talents.find((t) => t.name === 'Karthik Varma') || talents[2];

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-24 md:pt-20 md:pb-32">
        {/* Glow & Backdrop gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-cyan-600/20 via-indigo-600/20 to-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-cyan-300 text-xs font-semibold shadow-lg backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Local Talent, Global Stage</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">Vijayawada • Guntur • Hyderabad</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] font-display">
              “Your talent <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                deserves a stage.
              </span>”
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Discover local talent. Showcase your skills. Find college opportunities. Build your stage.
              The stage is no longer reserved for the few.
            </p>

            {/* Hero Quick Search */}
            <form
              onSubmit={handleHeroSearchSubmit}
              className="max-w-xl mx-auto relative flex items-center bg-slate-900/90 border border-slate-700/80 rounded-2xl p-1.5 shadow-2xl focus-within:border-cyan-400 transition"
            >
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Try searching “Guitar”, “Kuchipudi”, or “Vijayawada”..."
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer shrink-0"
              >
                Search
              </button>
            </form>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('discover')}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all duration-200 cursor-pointer flex items-center gap-2 group"
              >
                <span>Explore Talent</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenCreateProfile}
                className="px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-semibold text-sm transition shadow-md cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Showcase Your Talent</span>
              </button>
            </div>
          </div>

          {/* FLOATING PROFILE CARDS SHOWCASE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
            {/* Card 1: Rahul Kumar */}
            <div
              onClick={() => onSelectTalent(heroCard1)}
              className="bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-cyan-500/60 p-4 rounded-2xl shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer group flex items-center justify-between gap-3 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <img
                  src={heroCard1.avatar}
                  alt={heroCard1.name}
                  className="w-14 h-14 rounded-xl object-cover ring-2 ring-cyan-500/40"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                      {heroCard1.name}
                    </span>
                    <span className="text-[10px] text-cyan-400 font-bold">✓</span>
                  </div>
                  <p className="text-xs text-cyan-400 font-medium">🎸 Guitarist</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-cyan-500" />
                    <span>Vijayawada</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 text-amber-300 text-xs font-bold shrink-0">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{heroCard1.rating}</span>
              </div>
            </div>

            {/* Card 2: Ananya Reddy */}
            <div
              onClick={() => onSelectTalent(heroCard2)}
              className="bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-rose-500/60 p-4 rounded-2xl shadow-xl hover:shadow-rose-500/10 transition-all duration-300 cursor-pointer group flex items-center justify-between gap-3 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <img
                  src={heroCard2.avatar}
                  alt={heroCard2.name}
                  className="w-14 h-14 rounded-xl object-cover ring-2 ring-rose-500/40"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white group-hover:text-rose-300 transition">
                      {heroCard2.name}
                    </span>
                    <span className="text-[10px] text-rose-400 font-bold">✓</span>
                  </div>
                  <p className="text-xs text-rose-400 font-medium">💃 Dancer</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    <span>Hyderabad</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 text-amber-300 text-xs font-bold shrink-0">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{heroCard2.rating}</span>
              </div>
            </div>

            {/* Card 3: Karthik Varma */}
            <div
              onClick={() => onSelectTalent(heroCard3)}
              className="bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-purple-500/60 p-4 rounded-2xl shadow-xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer group flex items-center justify-between gap-3 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <img
                  src={heroCard3.avatar}
                  alt={heroCard3.name}
                  className="w-14 h-14 rounded-xl object-cover ring-2 ring-purple-500/40"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white group-hover:text-purple-300 transition">
                      {heroCard3.name}
                    </span>
                    <span className="text-[10px] text-purple-400 font-bold">✓</span>
                  </div>
                  <p className="text-xs text-purple-400 font-medium">🎨 Digital Artist</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-purple-500" />
                    <span>Guntur</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 text-amber-300 text-xs font-bold shrink-0">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{heroCard3.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="-mt-16 max-w-6xl mx-auto px-4 sm:px-6 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1 border-r border-slate-100 last:border-0">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              {stats.talents.toLocaleString()}+
            </span>
            <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block">
              Talents
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:block">
              Musicians, dancers, creators
            </span>
          </div>

          <div className="space-y-1 md:border-r border-slate-100 last:border-0">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              {stats.opps.toLocaleString()}+
            </span>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              Opportunities
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:block">
              College fests, gigs & auditions
            </span>
          </div>

          <div className="space-y-1 border-r border-slate-100 last:border-0">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              {stats.cities}+
            </span>
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">
              Cities
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:block">
              Across South India & college hubs
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              {stats.events}+
            </span>
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block">
              Events
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:block">
              Live stages & workshops
            </span>
          </div>
        </div>
      </section>

      {/* THREE PILLARS / UNIQUE VALUE PROPOSITION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="px-3 py-1 rounded-xl bg-cyan-100/80 text-cyan-800 text-xs font-bold uppercase tracking-wider inline-block">
            The NOVA Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
            Built for Real Talent, Not Endless Feeds
          </h2>
          <p className="text-sm text-slate-600">
            Social media buries unknown artists in algorithm games. NOVA connects you directly with local event heads and opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 shadow-sm hover:shadow-lg transition space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h3 className="text-xl font-bold text-slate-900">DISCOVER</h3>
            <p className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
              Find talented people around you
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore hyper-local talent using our interactive radar map. From fingerstyle guitarists in Vijayawada to Bharatanatyam dancers in Hyderabad, uncover genius in your neighborhood.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 shadow-sm hover:shadow-lg transition space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h3 className="text-xl font-bold text-slate-900">SHOWCASE</h3>
            <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
              Create a professional portfolio
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Build a polished talent profile with performance media, rates, achievements, and verified reviews. No endless dancing clips or viral memes required.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 shadow-sm hover:shadow-lg transition space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h3 className="text-xl font-bold text-slate-900">OPPORTUNITY</h3>
            <p className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              Connect with real-world opportunities
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Apply directly to college fests, acoustic gigs, short film auditions, and weekly challenges. Turn your creative passion into paid gigs and stage acclaim.
            </p>
          </div>
        </div>
      </section>

      {/* TALENT CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block mb-1">
              Explore by Discipline
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Talent Categories
            </h2>
          </div>
          <button
            onClick={() => onNavigate('discover')}
            className="text-xs sm:text-sm font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {TALENT_CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              onClick={() => {
                if (onSearchQueryPreset) onSearchQueryPreset(cat.name);
                onNavigate('discover');
              }}
              className="bg-white border border-slate-200/80 hover:border-cyan-400 p-4 rounded-2xl shadow-xs hover:shadow-md transition cursor-pointer text-center group flex flex-col items-center justify-between"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-cyan-600 transition">
                {cat.name}
              </h4>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {cat.count} artists
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED TALENT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
                Spotlight On Stage
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Featured Local Talent
            </h2>
          </div>

          <button
            onClick={() => onNavigate('discover')}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition w-fit cursor-pointer"
          >
            <span>Browse All 24+ Talents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTalents.map((talent) => (
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
      </section>

      {/* DISCOVER NEAR ME INTERACTIVE RADAR (MAP HIGHLIGHT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40">
                <Compass className="w-3.5 h-3.5" />
                <span>Discover Near Me</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                Discover Extraordinary Talent Around You
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Interactive spatial radar mapping verified creators in Vijayawada, Guntur, Hyderabad, and surrounding colleges.
              </p>
            </div>

            <button
              onClick={() => onNavigate('map')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition flex items-center gap-2 cursor-pointer"
            >
              <span>Open Fullscreen Map View</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <InteractiveMap
            talents={talents}
            onSelectTalent={onSelectTalent}
            className="w-full"
          />
        </div>
      </section>

      {/* TRENDING CHALLENGES THIS WEEK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Trending This Week
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Weekly Creative Challenges
            </h2>
          </div>

          <button
            onClick={() => onNavigate('challenges')}
            className="text-xs sm:text-sm font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 cursor-pointer"
          >
            <span>See All 7 Challenges</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingChallenges.map((ch) => (
            <div
              key={ch.id}
              onClick={() => onSelectChallenge(ch)}
              className="group bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-cyan-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{ch.icon}</span>
                  <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-[11px] font-bold">
                    {ch.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition leading-snug">
                  {ch.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  "{ch.tagline}"
                </p>

                <div className="mt-4 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-amber-900 text-xs font-semibold flex items-center justify-between">
                  <span>Prize Reward:</span>
                  <span className="font-bold">{ch.prize}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">
                  {ch.participantsCount} submissions
                </span>
                <span className="font-bold text-cyan-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Participate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DISCOVER OPPORTUNITIES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">
              Real Gigs & College Fests
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Upcoming Opportunities
            </h2>
          </div>

          <button
            onClick={() => onNavigate('opportunities')}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
          >
            <span>View All Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredOpportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onSelect={onSelectOpportunity}
              isSaved={savedOpportunityIds.includes(opp.id)}
              onToggleSave={onToggleSaveOpportunity}
            />
          ))}
        </div>
      </section>

      {/* HOW NOVA WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              Step by Step
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
              How NOVA Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              The four stages connecting you from unnoticed practice room to live stage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="space-y-3 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-cyan-500 text-slate-950 font-black text-sm flex items-center justify-center">
                01
              </div>
              <h3 className="text-base font-bold text-white">Create Profile</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Add your talent category, city, experience, and verified audio/video portfolio samples.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white font-black text-sm flex items-center justify-center">
                02
              </div>
              <h3 className="text-base font-bold text-white">Showcase Talent</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Participate in weekly community challenges and upload your latest acoustic or dance reels.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white font-black text-sm flex items-center justify-center">
                03
              </div>
              <h3 className="text-base font-bold text-white">Get Discovered</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Local organizers, college cultural leads, and venues discover you on the Interactive Talent Radar.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-3 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-purple-500 text-white font-black text-sm flex items-center justify-center">
                04
              </div>
              <h3 className="text-base font-bold text-white">Find Opportunities</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive direct booking requests and apply to cash-prize competitions, gigs, and auditions.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onOpenCreateProfile}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition cursor-pointer"
            >
              Start Building Your Stage Profile Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

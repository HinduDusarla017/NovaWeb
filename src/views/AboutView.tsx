import React from 'react';
import {
  Compass,
  Sparkles,
  Users,
  Target,
  Award,
  Radio,
  CheckCircle2,
  Heart,
  ArrowRight
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: 'home' | 'discover' | 'opportunities' | 'challenges' | 'map') => void;
  onOpenCreateProfile: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigate,
  onOpenCreateProfile,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero / Vision Statement */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider inline-block">
          About NOVA
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          “Every talented person deserves a stage.”
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          We believe genius isn't confined to metro studios or celebrity agencies. It is practicing in college hostel rooms, sketching at midnight, and humming tunes across Vijayawada, Guntur, and every neighborhood in India.
        </p>
      </div>

      {/* The Problem vs The Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* The Problem */}
        <div className="p-8 rounded-3xl bg-rose-50/70 border border-rose-200/80 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 font-bold flex items-center justify-center">
            ✕
          </div>
          <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
            The Dilemma
          </span>
          <h2 className="text-2xl font-bold text-slate-900 font-display">
            The Problem: Local Talent is Invisible
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Thousands of talented college students, musicians, and artists spend years honing craft, yet remain invisible. Mainstream social media forces them to play viral video algorithms rather than connecting them with real stages.
          </p>
          <ul className="space-y-2 text-xs text-slate-600 pt-2">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>College fests struggle to find quality local performers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>Budding filmmakers and photographers lack local collaborators.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>Artists receive likes from strangers but zero opportunities in their town.</span>
            </li>
          </ul>
        </div>

        {/* The Solution */}
        <div className="p-8 rounded-3xl bg-cyan-50/70 border border-cyan-200/80 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 font-bold flex items-center justify-center">
            ✓
          </div>
          <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
            The Architecture
          </span>
          <h2 className="text-2xl font-bold text-slate-900 font-display">
            The Solution: NOVA
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            NOVA connects emerging talent with people and organizations looking for those skills. By combining interactive spatial location mapping with verifiable portfolios and direct applications, we build a bridge between talent and opportunity.
          </p>
          <ul className="space-y-2 text-xs text-slate-600 pt-2">
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">•</span>
              <span><strong>Hyperlocal Radar:</strong> Find artists within a few kilometers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">•</span>
              <span><strong>Curated Opportunities:</strong> College fests, cash competitions, and gigs.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">•</span>
              <span><strong>Zero Friction:</strong> Direct invitations with clear honorariums.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Mission & Vision Statements */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Our Mission</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display">
            “To make talent discovery local, accessible and opportunity-driven.”
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Eliminating geographic and network barriers so any student with dedication can book college fests and build sustainable creative visibility.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Our Vision</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display">
            “Local Talent, Global Stage.”
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Transforming every city—from Tier-1 capitals to regional educational hubs like Vijayawada and Guntur—into thriving creative epicenters.
          </p>
        </div>
      </div>

      {/* Target Audiences */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Who is NOVA For?
          </h2>
          <p className="text-xs text-slate-500">
            Designed specifically for both creators and the cultural hosts who need them.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <span className="text-2xl">🎓</span>
            <h4 className="text-sm font-bold text-slate-900">College Students & Artists</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Singers, dancers, poets, beatboxers, and actors eager to perform and get recognized.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <span className="text-2xl">🏛️</span>
            <h4 className="text-sm font-bold text-slate-900">College Clubs & Fests</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Cultural committees seeking talent lineups for annual youth festivals.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <span className="text-2xl">☕</span>
            <h4 className="text-sm font-bold text-slate-900">Local Cafés & Venues</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Spaces hosting acoustic nights, poetry slams, stand-up comedy, and art popups.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <span className="text-2xl">🎬</span>
            <h4 className="text-sm font-bold text-slate-900">Indie Filmmakers & Crews</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Directors seeking local actors, cinematographers, score composers, and editors.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-xl space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
          Ready to Step Onto the Stage?
        </h2>
        <p className="text-xs sm:text-sm text-cyan-100 max-w-md mx-auto">
          Join hundreds of emerging artists already receiving stage invitations and building their community.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={onOpenCreateProfile}
            className="px-6 py-3 bg-white text-slate-900 rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-100 transition shadow-md cursor-pointer"
          >
            Create My Profile
          </button>
          <button
            onClick={() => onNavigate('discover')}
            className="px-6 py-3 bg-black/30 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-black/50 transition cursor-pointer"
          >
            Explore Talent
          </button>
        </div>
      </div>
    </div>
  );
};

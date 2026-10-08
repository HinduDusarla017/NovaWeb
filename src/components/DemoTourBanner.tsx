import React from 'react';
import { Sparkles, Play, ChevronRight, X, MapPin, Compass } from 'lucide-react';

interface DemoTourBannerProps {
  onStartDemo: () => void;
  onJumpToFlow: (step: 'search-guitar' | 'rahul-profile' | 'view-map' | 'opportunities' | 'challenges') => void;
}

export const DemoTourBanner: React.FC<DemoTourBannerProps> = ({
  onStartDemo,
  onJumpToFlow,
}) => {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white border-b border-indigo-900/50 px-4 py-2 text-xs relative z-30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 text-[10px] uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Judge / Presentation Demo Mode</span>
          </span>
          <span className="text-slate-300 hidden md:inline">
            Recommended Flow: Discover → Search "Guitar" → Rahul Kumar → View on Map (Vijayawada) → Opportunities
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => onJumpToFlow('search-guitar')}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 hover:text-white font-semibold transition"
          >
            1. Search "Guitar"
          </button>
          <button
            onClick={() => onJumpToFlow('rahul-profile')}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 hover:text-white font-semibold transition"
          >
            2. Rahul Kumar Profile
          </button>
          <button
            onClick={() => onJumpToFlow('view-map')}
            className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition flex items-center gap-1 shadow-sm"
          >
            <Compass className="w-3 h-3" />
            <span>3. View on Map</span>
          </button>
          <button
            onClick={() => onJumpToFlow('opportunities')}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-semibold transition hidden sm:inline-block"
          >
            4. College Fest Apply
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-slate-400 hover:text-white ml-1"
            title="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

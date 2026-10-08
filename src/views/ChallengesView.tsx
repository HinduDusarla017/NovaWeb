import React from 'react';
import {
  Trophy,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  Flame,
  Medal,
  Play,
  Heart
} from 'lucide-react';
import { Challenge } from '../types';

interface ChallengesViewProps {
  challenges: Challenge[];
  onSelectChallenge: (challenge: Challenge) => void;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({
  challenges,
  onSelectChallenge,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider inline-block border border-cyan-500/40">
            Weekly Stage Battles
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            “Show the World What You Can Do”
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Record, upload, and compete with peers across colleges. Judged by senior mentors and community votes. Real studio gear, stage spots, and cash rewards every week.
          </p>
        </div>

        {/* Global Challenge Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800 text-xs relative z-10">
          <div>
            <span className="text-slate-400 block">Active Battles</span>
            <span className="text-xl font-bold text-white mt-0.5 block">7 Categories</span>
          </div>
          <div>
            <span className="text-slate-400 block">Weekly Submissions</span>
            <span className="text-xl font-bold text-cyan-400 mt-0.5 block">840+ Entries</span>
          </div>
          <div>
            <span className="text-slate-400 block">Total Prize Pool</span>
            <span className="text-xl font-bold text-amber-400 mt-0.5 block">₹85,000+</span>
          </div>
          <div>
            <span className="text-slate-400 block">Voting System</span>
            <span className="text-xl font-bold text-rose-400 mt-0.5 block">100% Verified</span>
          </div>
        </div>
      </div>

      {/* Challenge Cards Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              All Active Challenges
            </h2>
          </div>
          <span className="text-xs text-slate-500">Updated every Monday</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((ch) => (
            <div
              key={ch.id}
              onClick={() => onSelectChallenge(ch)}
              className="group bg-white rounded-3xl p-6 border border-slate-200 hover:border-cyan-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {ch.icon}
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
                    {ch.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition leading-snug">
                  {ch.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 italic">
                  "{ch.tagline}"
                </p>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {ch.description}
                </p>

                {/* Prize Banner */}
                <div className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-950 text-xs font-bold flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="truncate">{ch.prize}</span>
                </div>
              </div>

              {/* Bottom Meta */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-slate-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ch.participantsCount}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ch.deadline}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 font-bold text-cyan-600 group-hover:translate-x-1 transition-transform">
                  <span>Enter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Leaderboard Spotlight */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Medal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Current Community Leaderboard
              </h3>
              <p className="text-xs text-slate-500">
                Top rated creators across all weekly stage challenges
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-cyan-700">
            ⚡ Resets in 3 days
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt="Rahul Kumar"
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-amber-400"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate">Rahul Kumar</h4>
              <p className="text-[11px] text-slate-500">Guitarist • Vijayawada</p>
              <span className="text-[10px] text-amber-700 font-bold">312 Votes</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-black text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
              alt="Sravani Devi"
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-300"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate">Sravani Devi</h4>
              <p className="text-[11px] text-slate-500">Classical Vocal • Vijayawada</p>
              <span className="text-[10px] text-slate-700 font-bold">284 Votes</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
              alt="Karthik Varma"
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-amber-700"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate">Karthik Varma</h4>
              <p className="text-[11px] text-slate-500">Digital Artist • Guntur</p>
              <span className="text-[10px] text-slate-700 font-bold">278 Votes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  Radio,
  MapPin,
  Heart,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'discover' | 'opportunities' | 'challenges' | 'map' | 'about') => void;
  onOpenCreateProfile: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCreateProfile }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Radio className="w-4 h-4 text-cyan-200" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                NO<span className="text-cyan-400">VA</span>
              </span>
            </div>

            <p className="text-sm text-slate-300 font-medium italic">
              “Your talent deserves a stage.”
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The talent discovery & opportunity engine connecting emerging college performers,
              artists, and creators across Vijayawada, Guntur, Hyderabad, and South India with real stages, auditions, and gigs.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition border border-slate-800"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition border border-slate-800"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition border border-slate-800"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition border border-slate-800"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-cyan-400 transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('discover')}
                  className="hover:text-cyan-400 transition"
                >
                  Discover Talent
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('opportunities')}
                  className="hover:text-cyan-400 transition"
                >
                  Opportunities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('challenges')}
                  className="hover:text-cyan-400 transition"
                >
                  Challenges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('map')}
                  className="hover:text-cyan-400 transition"
                >
                  Talent Radar Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-cyan-400 transition"
                >
                  About STAGELOCAL
                </button>
              </li>
            </ul>
          </div>

          {/* For Talent */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              For Talent
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenCreateProfile}
                  className="hover:text-cyan-400 transition text-left"
                >
                  Create Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('discover')}
                  className="hover:text-cyan-400 transition text-left"
                >
                  Showcase Talent
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('opportunities')}
                  className="hover:text-cyan-400 transition text-left"
                >
                  Find Opportunities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('challenges')}
                  className="hover:text-cyan-400 transition text-left"
                >
                  Weekly Competitions
                </button>
              </li>
            </ul>
          </div>

          {/* For Organizers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              For Organizers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('opportunities')}
                  className="hover:text-cyan-400 transition text-left"
                >
                  Post Opportunity
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('discover')}
                  className="hover:text-cyan-400 transition text-left"
                >
                  Find College Talent
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('map')}
                  className="hover:text-cyan-400 transition text-left"
                >
                  Explore Talent by City
                </button>
              </li>
              <li>
                <span className="text-[11px] text-slate-500 block">
                  College Fest Partnerships: hello@nova.stage
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© 2026 NOVA. All rights reserved.</div>
          <div className="flex items-center gap-1">
            <span>Built for local talents, college stages & cultural dreamers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

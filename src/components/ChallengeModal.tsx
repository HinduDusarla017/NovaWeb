import React, { useState } from 'react';
import {
  X,
  Trophy,
  Users,
  Clock,
  Heart,
  Share2,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Play,
  ArrowRight
} from 'lucide-react';
import { Challenge, ChallengeSubmission } from '../types';

interface ChallengeModalProps {
  challenge: Challenge | null;
  onClose: () => void;
  onParticipateSuccess?: (challengeId: string) => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  challenge,
  onClose,
  onParticipateSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'submissions' | 'rules' | 'participate'>('submissions');
  const [submissionsList, setSubmissionsList] = useState<ChallengeSubmission[]>(
    challenge ? challenge.submissions : []
  );
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  // Submission Form State
  const [entryTitle, setEntryTitle] = useState('');
  const [entryMediaUrl, setEntryMediaUrl] = useState('');
  const [authorName, setAuthorName] = useState('Rahul Kumar');
  const [authorCity, setAuthorCity] = useState('Vijayawada');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!challenge) return null;

  const toggleLike = (subId: string) => {
    setLikedMap((prev) => ({
      ...prev,
      [subId]: !prev[subId],
    }));
    setSubmissionsList((prev) =>
      prev.map((s) => {
        if (s.id === subId) {
          const isLiked = likedMap[subId];
          return { ...s, likes: isLiked ? s.likes - 1 : s.likes + 1 };
        }
        return s;
      })
    );
  };

  const handleSubmitEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const newSub: ChallengeSubmission = {
      id: `sub-${Date.now()}`,
      authorName,
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      authorCity,
      title: entryTitle || 'Acoustic Guitar Cover',
      mediaUrl: entryMediaUrl || 'https://youtube.com',
      likes: 1,
      submittedAt: 'Just now',
    };
    setSubmissionsList([newSub, ...submissionsList]);
    setSubmittedSuccess(true);
    if (onParticipateSuccess) onParticipateSuccess(challenge.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{challenge.icon}</span>
              <span className="px-3 py-1 rounded-xl bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                {challenge.category} Challenge
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold leading-tight">
              {challenge.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
              "{challenge.tagline}"
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-5 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Participants</span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {challenge.participantsCount + (submittedSuccess ? 1 : 0)} creators
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Deadline</span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {challenge.deadline}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Reward</span>
                  <span className="text-xs sm:text-sm font-bold text-amber-300 truncate block">
                    {challenge.prize}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-1 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab('submissions')}
                className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition ${
                  activeTab === 'submissions'
                    ? 'border-cyan-600 text-cyan-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Community Entries ({submissionsList.length})
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition ${
                  activeTab === 'rules'
                    ? 'border-cyan-600 text-cyan-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Rules & Judges
              </button>
            </div>

            <button
              onClick={() => setActiveTab('participate')}
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-600/20 transition cursor-pointer"
            >
              + Submit Entry
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {/* SUBMISSIONS TAB */}
            {activeTab === 'submissions' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Top Trending Community Submissions
                  </h4>
                  <span className="text-xs text-slate-500">Vote for your favorite</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {submissionsList.map((sub, index) => {
                    const isLiked = likedMap[sub.id];
                    return (
                      <div
                        key={sub.id}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition flex flex-col justify-between"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={sub.authorAvatar}
                            alt={sub.authorName}
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-bold text-slate-900 truncate">
                                {sub.authorName}
                              </h5>
                              <span className="text-[10px] text-slate-400 font-medium">
                                #{index + 1}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-medium">
                              📍 {sub.authorCity} • {sub.submittedAt}
                            </span>
                            <p className="text-xs font-semibold text-cyan-800 mt-1 line-clamp-1">
                              "{sub.title}"
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
                          <a
                            href={sub.mediaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-cyan-600"
                          >
                            <Play className="w-3 h-3 text-cyan-500 fill-cyan-500" />
                            <span>Watch Clip</span>
                          </a>

                          <button
                            onClick={() => toggleLike(sub.id)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                              isLiked
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-white border border-slate-200 text-slate-600 hover:text-rose-600'
                            }`}
                          >
                            <Heart
                              className={`w-3.5 h-3.5 ${
                                isLiked ? 'fill-rose-500 text-rose-500' : ''
                              }`}
                            />
                            <span>{sub.likes}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* RULES TAB */}
            {activeTab === 'rules' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Challenge Overview
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Submission Guidelines & Rules
                  </h4>
                  <div className="space-y-2">
                    {challenge.rules.map((rule, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {challenge.featuredJudge && (
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                        Featured Jury & Mentors
                      </span>
                      <h4 className="text-xs font-bold text-amber-950 mt-0.5">
                        {challenge.featuredJudge}
                      </h4>
                    </div>
                    <Sparkles className="w-5 h-5 text-amber-600" />
                  </div>
                )}
              </div>
            )}

            {/* PARTICIPATE FORM TAB */}
            {activeTab === 'participate' && (
              <div>
                {submittedSuccess ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      Entry Submitted Successfully!
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Your submission is now live on the {challenge.title} challenge board.
                    </p>
                    <button
                      onClick={() => setActiveTab('submissions')}
                      className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
                    >
                      View in Submissions
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitEntry} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Title of Your Submission *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Acoustic Cover - Telugu Hits"
                        value={entryTitle}
                        onChange={(e) => setEntryTitle(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={authorCity}
                          onChange={(e) => setAuthorCity(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Video / Audio / Image URL (YouTube, Instagram Reel, Drive) *
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://instagram.com/reel/... or https://youtube.com/..."
                        value={entryMediaUrl}
                        onChange={(e) => setEntryMediaUrl(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-slate-600">
                      <div className="flex items-center gap-2">
                        <UploadCloud className="w-5 h-5 text-cyan-600" />
                        <div>
                          <span className="font-semibold text-slate-800 block">
                            Direct Upload File (Demo)
                          </span>
                          <span className="text-[10px] text-slate-400">
                            MP4, MOV, MP3, JPG up to 50MB
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-cyan-600">Simulated</span>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setActiveTab('submissions')}
                        className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-600/20 transition cursor-pointer"
                      >
                        Submit Entry
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

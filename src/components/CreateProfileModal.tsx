import React, { useState } from 'react';
import {
  X,
  MapPin,
  CheckCircle2,
  Sparkles,
  Camera,
  Compass,
  ArrowRight,
  ExternalLink,
  Plus,
  Navigation
} from 'lucide-react';
import { TalentProfile, TalentCategory } from '../types';
import { CITY_COORDINATES } from '../data/mockData';

interface CreateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileCreated: (newProfile: TalentProfile) => void;
}

const SAMPLE_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
];

export const CreateProfileModal: React.FC<CreateProfileModalProps> = ({
  isOpen,
  onClose,
  onProfileCreated,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<TalentCategory>('Music');
  const [skill, setSkill] = useState('');
  const [city, setCity] = useState('Vijayawada');
  const [locationAddress, setLocationAddress] = useState('Benz Circle, Vijayawada');
  const [locationSuccessNotice, setLocationSuccessNotice] = useState(false);
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('3+ Years');
  const [availability, setAvailability] = useState('Available for College Fests & Gigs');
  const [skillsTagInput, setSkillsTagInput] = useState('Acoustic, Live Vocals, Fingerstyle');
  const [hourlyRate, setHourlyRate] = useState('₹2,500 / event');
  const [selectedAvatar, setSelectedAvatar] = useState(SAMPLE_AVATARS[0]);
  const [instagram, setInstagram] = useState('@my_stage_profile');
  const [portfolioTitle, setPortfolioTitle] = useState('Original Acoustic Jam Video');
  const [createdProfile, setCreatedProfile] = useState<TalentProfile | null>(null);

  if (!isOpen) return null;

  const handleSelectCity = (c: string) => {
    setCity(c);
    setLocationAddress(`Center City, ${c}`);
    setLocationSuccessNotice(true);
    setTimeout(() => setLocationSuccessNotice(false), 3000);
  };

  const handleUseGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocationAddress('Detected Local GPS Landmark, ' + city);
          setLocationSuccessNotice(true);
        },
        () => {
          setLocationSuccessNotice(true);
        }
      );
    } else {
      setLocationSuccessNotice(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cityCoords = CITY_COORDINATES[city] || { lat: 16.5062, lng: 80.648 };
    // Slightly jitter coords to not overlap exactly
    const coords = {
      lat: cityCoords.lat + (Math.random() - 0.5) * 0.02,
      lng: cityCoords.lng + (Math.random() - 0.5) * 0.02,
    };

    const tags = skillsTagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newTalent: TalentProfile = {
      id: `talent-${Date.now()}`,
      name: name || 'Emerging Artist',
      category,
      skill: skill || 'Performer',
      city,
      locationDetails: locationAddress,
      coordinates: coords,
      rating: 5.0,
      reviewsCount: 1,
      experience,
      bio:
        bio ||
        'Passionate local creator showcasing talent on NOVA. Excited to collaborate with college fests, competitions, and indie groups.',
      avatar: selectedAvatar,
      coverImage:
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      availability,
      tags: tags.length ? tags : ['Live Performance', 'Creative Collab'],
      hourlyRate,
      verified: true,
      featured: true,
      trending: true,
      viewsCount: 12,
      socials: {
        instagram,
        youtube: name.replace(/\s+/g, '') + 'Official',
      },
      portfolio: [
        {
          id: `p-${Date.now()}`,
          title: portfolioTitle,
          type: 'video',
          url: 'https://youtube.com',
          thumbnail:
            'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80',
          description: 'Live performance demo recorded in local studio',
          year: '2026',
        },
      ],
      reviews: [
        {
          id: `r-${Date.now()}`,
          author: 'NOVA Welcome Community',
          role: 'Talent Curator',
          organization: 'Discovery Board',
          rating: 5,
          comment: 'Welcome to NOVA! Verified profile ready to be booked for college stages.',
          date: 'Just now',
        },
      ],
      achievements: ['Newly Verified NOVA Rising Star (2026)'],
    };

    setCreatedProfile(newTalent);
    onProfileCreated(newTalent);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          {createdProfile ? (
            /* CELEBRATION PROFILE PREVIEW */
            <div className="text-center py-4 space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Your Profile is Live on Stage!
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  Congratulations! Organizers in <strong>{createdProfile.city}</strong> and across South India can now discover your talent.
                </p>
              </div>

              {/* Profile Card Preview */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto text-left shadow-md">
                <div className="flex items-center gap-3">
                  <img
                    src={createdProfile.avatar}
                    alt={createdProfile.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-cyan-500 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-base font-bold text-slate-900">
                        {createdProfile.name}
                      </h4>
                      <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                    </div>
                    <p className="text-xs text-cyan-700 font-semibold">
                      {createdProfile.skill} • {createdProfile.category}
                    </p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{createdProfile.locationDetails}</span>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 italic line-clamp-2">
                  "{createdProfile.bio}"
                </p>

                <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Availability:</span>
                  <span className="font-semibold text-emerald-700">
                    {createdProfile.availability}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-600/20 transition cursor-pointer"
                >
                  Explore Your Profile on NOVA
                </button>
              </div>
            </div>
          ) : (
            /* FORM */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <span className="px-3 py-1 rounded-xl bg-cyan-50 text-cyan-700 text-xs font-bold uppercase tracking-wider inline-block mb-1">
                  Join The Stage
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Create Your Talent Profile
                </h2>
                <p className="text-xs text-slate-500">
                  Build your local portfolio, get discovered by college fests, and find real gigs.
                </p>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Choose Profile Photo
                </label>
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {SAMPLE_AVATARS.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt="Avatar"
                      onClick={() => setSelectedAvatar(url)}
                      className={`w-12 h-12 rounded-xl object-cover cursor-pointer transition ${
                        selectedAvatar === url
                          ? 'ring-3 ring-cyan-500 scale-105 shadow-md'
                          : 'opacity-70 hover:opacity-100 ring-1 ring-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Srikant Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Primary Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TalentCategory)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Music">🎵 Music</option>
                    <option value="Dance">💃 Dance</option>
                    <option value="Art">🎨 Art</option>
                    <option value="Photography">📸 Photography</option>
                    <option value="Writing">✍️ Writing</option>
                    <option value="Film">🎬 Film</option>
                    <option value="Crafts">🧵 Crafts</option>
                    <option value="Speaking">🎤 Speaking</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Specific Skill / Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acoustic Guitarist, Bharatanatyam Dancer"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Years of Experience *
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="1+ Year">1+ Year (Emerging)</option>
                    <option value="3+ Years">3+ Years (College Performer)</option>
                    <option value="5+ Years">5+ Years (Seasoned Artist)</option>
                    <option value="8+ Years">8+ Years (Expert/Trained)</option>
                  </select>
                </div>
              </div>

              {/* Location Picker with Interactive Map Simulation */}
              <div className="space-y-2 text-xs">
                <label className="block text-slate-700 font-semibold">
                  Location & City (Google Maps Integration) *
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <span className="text-[11px] text-slate-500 mb-1 block">City Hub</span>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.keys(CITY_COORDINATES).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => handleSelectCity(c)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                            city === c
                              ? 'bg-cyan-500 text-white border-cyan-500 shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-500 mb-1 block">
                      Specific Address / Landmark
                    </span>
                    <div className="relative">
                      <input
                        type="text"
                        value={locationAddress}
                        onChange={(e) => {
                          setLocationAddress(e.target.value);
                          setLocationSuccessNotice(true);
                        }}
                        placeholder="Search Vijayawada, Benz Circle..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-3 py-1.5 text-slate-900 focus:outline-none focus:border-cyan-500 text-xs"
                      />
                      <MapPin className="w-3.5 h-3.5 text-cyan-600 absolute left-2.5 top-2" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleUseGPS}
                    className="flex items-center gap-1.5 text-xs text-cyan-700 font-semibold hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Use My Current Location</span>
                  </button>

                  {locationSuccessNotice && (
                    <span className="text-emerald-700 font-bold text-xs flex items-center gap-1 animate-pulse">
                      📍 Location selected successfully
                    </span>
                  )}
                </div>
              </div>

              {/* Bio & Story */}
              <div className="text-xs">
                <label className="block text-slate-700 font-semibold mb-1">
                  Bio & Talent Story *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Tell organizers about your passion, preferred genres, and performance style..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Tags & Logistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Key Skill Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={skillsTagInput}
                    onChange={(e) => setSkillsTagInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Availability Status
                  </label>
                  <input
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Portfolio Sample Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    First Portfolio Title
                  </label>
                  <input
                    type="text"
                    value={portfolioTitle}
                    onChange={(e) => setPortfolioTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-cyan-600/20 transition cursor-pointer"
                >
                  Create My Profile
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

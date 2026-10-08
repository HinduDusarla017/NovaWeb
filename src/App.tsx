import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoTourBanner } from './components/DemoTourBanner';
import { TalentProfileModal } from './components/TalentProfileModal';
import { OpportunityDetailModal } from './components/OpportunityDetailModal';
import { ChallengeModal } from './components/ChallengeModal';
import { CreateProfileModal } from './components/CreateProfileModal';
import { CollaborationModal } from './components/CollaborationModal';
import { SavedModal } from './components/SavedModal';

import { HomeView } from './views/HomeView';
import { DiscoverView } from './views/DiscoverView';
import { OpportunitiesView } from './views/OpportunitiesView';
import { ChallengesView } from './views/ChallengesView';
import { MapView } from './views/MapView';
import { AboutView } from './views/AboutView';

import {
  DEMO_TALENTS,
  DEMO_OPPORTUNITIES,
  DEMO_CHALLENGES,
  DEMO_NOTIFICATIONS,
} from './data/mockData';
import { TalentProfile, Opportunity, Challenge, NotificationItem } from './types';

export default function App() {
  // Navigation
  const [currentView, setCurrentView] = useState<
    'home' | 'discover' | 'opportunities' | 'challenges' | 'map' | 'about'
  >('home');

  // Main Datasets
  const [talents, setTalents] = useState<TalentProfile[]>(DEMO_TALENTS);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(DEMO_OPPORTUNITIES);
  const [challenges, setChallenges] = useState<Challenge[]>(DEMO_CHALLENGES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEMO_NOTIFICATIONS);

  // Saved / Bookmarks
  const [savedTalentIds, setSavedTalentIds] = useState<string[]>(['talent-1', 'talent-2']);
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(['opp-1', 'opp-2']);

  // Modals & Active Selections
  const [selectedTalent, setSelectedTalent] = useState<TalentProfile | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [collaborationTalent, setCollaborationTalent] = useState<TalentProfile | null>(null);
  const [createProfileOpen, setCreateProfileOpen] = useState(false);
  const [savedModalOpen, setSavedModalOpen] = useState(false);
  const [directApplyOpen, setDirectApplyOpen] = useState(false);

  // Map targeting state
  const [mapTargetCity, setMapTargetCity] = useState<string | null>('Vijayawada');
  const [mapTargetTalentId, setMapTargetTalentId] = useState<string | null>(null);

  // Search query preset for Discover page
  const [discoverSearchPreset, setDiscoverSearchPreset] = useState<string>('');

  // Handle Save Toggles
  const handleToggleSaveTalent = (id: string) => {
    setSavedTalentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSaveOpportunity = (id: string) => {
    setSavedOpportunityIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // View on Map Handler (Switches to map view & centers on talent / city)
  const handleViewTalentOnMap = (talent: TalentProfile) => {
    setSelectedTalent(null);
    setMapTargetCity(talent.city);
    setMapTargetTalentId(talent.id);
    setCurrentView('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCityOnMap = (cityName: string) => {
    setSelectedOpportunity(null);
    setMapTargetCity(cityName);
    setMapTargetTalentId(null);
    setCurrentView('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add newly created profile
  const handleProfileCreated = (newProfile: TalentProfile) => {
    setTalents((prev) => [newProfile, ...prev]);
    // Also add a celebration notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Profile Published!',
      message: `Your talent profile for ${newProfile.name} is now live and visible on the Vijayawada / ${newProfile.city} radar!`,
      time: 'Just now',
      unread: true,
      type: 'system',
      targetId: newProfile.id,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Notification Click routing
  const handleSelectNotification = (notif: NotificationItem) => {
    if (notif.targetId) {
      const matchTalent = talents.find((t) => t.id === notif.targetId);
      if (matchTalent) {
        setSelectedTalent(matchTalent);
        return;
      }
      const matchOpp = opportunities.find((o) => o.id === notif.targetId);
      if (matchOpp) {
        setSelectedOpportunity(matchOpp);
        return;
      }
      const matchCh = challenges.find((c) => c.id === notif.targetId);
      if (matchCh) {
        setSelectedChallenge(matchCh);
        return;
      }
    }
  };

  // Demo Tour Jumps
  const handleDemoJump = (step: 'search-guitar' | 'rahul-profile' | 'view-map' | 'opportunities' | 'challenges') => {
    if (step === 'search-guitar') {
      setDiscoverSearchPreset('Guitar');
      setCurrentView('discover');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 'rahul-profile') {
      const rahul = talents.find((t) => t.name === 'Rahul Kumar') || talents[0];
      setSelectedTalent(rahul);
    } else if (step === 'view-map') {
      const rahul = talents.find((t) => t.name === 'Rahul Kumar') || talents[0];
      setMapTargetCity('Vijayawada');
      setMapTargetTalentId(rahul.id);
      setCurrentView('map');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 'opportunities') {
      const festOpp = opportunities.find((o) => o.title.includes('College Fest')) || opportunities[0];
      setSelectedOpportunity(festOpp);
      setDirectApplyOpen(true);
      setCurrentView('opportunities');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 'challenges') {
      const singCh = challenges[0];
      setSelectedChallenge(singCh);
      setCurrentView('challenges');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Demo Tour Banner for Judges & Evaluation */}
      <DemoTourBanner
        onStartDemo={() => handleDemoJump('search-guitar')}
        onJumpToFlow={handleDemoJump}
      />

      {/* Primary Sticky Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCreateProfile={() => setCreateProfileOpen(true)}
        onOpenSaved={() => setSavedModalOpen(true)}
        savedCount={savedTalentIds.length + savedOpportunityIds.length}
        notifications={notifications}
        onMarkNotificationsRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
        }
        onSelectNotification={handleSelectNotification}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            talents={talents}
            opportunities={opportunities}
            challenges={challenges}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectTalent={(t) => setSelectedTalent(t)}
            onViewTalentOnMap={handleViewTalentOnMap}
            onSelectOpportunity={(opp) => {
              setDirectApplyOpen(false);
              setSelectedOpportunity(opp);
            }}
            onSelectChallenge={(ch) => setSelectedChallenge(ch)}
            onOpenCreateProfile={() => setCreateProfileOpen(true)}
            savedTalentIds={savedTalentIds}
            savedOpportunityIds={savedOpportunityIds}
            onToggleSaveTalent={handleToggleSaveTalent}
            onToggleSaveOpportunity={handleToggleSaveOpportunity}
            onSearchQueryPreset={(q) => setDiscoverSearchPreset(q)}
          />
        )}

        {currentView === 'discover' && (
          <DiscoverView
            talents={talents}
            onSelectTalent={(t) => setSelectedTalent(t)}
            onViewTalentOnMap={handleViewTalentOnMap}
            savedTalentIds={savedTalentIds}
            onToggleSaveTalent={handleToggleSaveTalent}
            initialSearchQuery={discoverSearchPreset}
            onClearInitialSearch={() => setDiscoverSearchPreset('')}
          />
        )}

        {currentView === 'opportunities' && (
          <OpportunitiesView
            opportunities={opportunities}
            onSelectOpportunity={(opp) => {
              setDirectApplyOpen(false);
              setSelectedOpportunity(opp);
            }}
            savedOpportunityIds={savedOpportunityIds}
            onToggleSaveOpportunity={handleToggleSaveOpportunity}
          />
        )}

        {currentView === 'challenges' && (
          <ChallengesView
            challenges={challenges}
            onSelectChallenge={(ch) => setSelectedChallenge(ch)}
          />
        )}

        {currentView === 'map' && (
          <MapView
            talents={talents}
            onSelectTalent={(t) => setSelectedTalent(t)}
            targetCity={mapTargetCity}
            targetTalentId={mapTargetTalentId}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCreateProfile={() => setCreateProfileOpen(true)}
          />
        )}
      </main>

      {/* Global Modals */}
      {selectedTalent && (
        <TalentProfileModal
          talent={selectedTalent}
          onClose={() => setSelectedTalent(null)}
          onViewOnMap={handleViewTalentOnMap}
          onOpenCollaboration={(t) => setCollaborationTalent(t)}
          isSaved={savedTalentIds.includes(selectedTalent.id)}
          onToggleSave={handleToggleSaveTalent}
        />
      )}

      {selectedOpportunity && (
        <OpportunityDetailModal
          opportunity={selectedOpportunity}
          onClose={() => {
            setSelectedOpportunity(null);
            setDirectApplyOpen(false);
          }}
          isSaved={savedOpportunityIds.includes(selectedOpportunity.id)}
          onToggleSave={handleToggleSaveOpportunity}
          onViewOnMap={handleViewCityOnMap}
          initialApplyOpen={directApplyOpen}
        />
      )}

      {selectedChallenge && (
        <ChallengeModal
          challenge={selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
        />
      )}

      <CreateProfileModal
        isOpen={createProfileOpen}
        onClose={() => setCreateProfileOpen(false)}
        onProfileCreated={handleProfileCreated}
      />

      <CollaborationModal
        talent={collaborationTalent}
        onClose={() => setCollaborationTalent(null)}
      />

      <SavedModal
        isOpen={savedModalOpen}
        onClose={() => setSavedModalOpen(false)}
        savedTalentIds={savedTalentIds}
        savedOpportunityIds={savedOpportunityIds}
        allTalents={talents}
        allOpportunities={opportunities}
        onSelectTalent={(t) => {
          setSavedModalOpen(false);
          setSelectedTalent(t);
        }}
        onSelectOpportunity={(o) => {
          setSavedModalOpen(false);
          setSelectedOpportunity(o);
        }}
        onRemoveSavedTalent={handleToggleSaveTalent}
        onRemoveSavedOpportunity={handleToggleSaveOpportunity}
      />

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCreateProfile={() => setCreateProfileOpen(true)}
      />
    </div>
  );
}

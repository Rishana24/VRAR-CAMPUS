import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import CampusScene from './components/CampusScene/CampusScene';
import CampusMapPage from './components/CampusMapPage';
import Explore from './components/Explore';
import About from './components/About';
import Help from './components/Help';
import { soundManager } from './utils/soundEffects';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [focusLocationId, setFocusLocationId] = useState(null);

  const handleNavigate = (viewId) => {
    setActiveView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTour = () => {
    setFocusLocationId('main-entrance');
    setActiveView('tour');
  };

  const handleExploreCampus = () => {
    setFocusLocationId(null);
    setActiveView('tour');
  };

  const handleSelectLocation = (locationId) => {
    setFocusLocationId(locationId);
    setActiveView('tour');
  };

  return (
    <div className="app-layout">
      {/* Fixed Top Navigation Bar */}
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        onStartTour={handleStartTour}
      />

      {/* Main View Area */}
      <main className="main-content-area">
        {activeView === 'home' && (
          <Home
            onStartTour={handleStartTour}
            onExploreCampus={handleExploreCampus}
            onSelectLocation={handleSelectLocation}
          />
        )}

        {activeView === 'tour' && (
          <CampusScene
            initialFocusLocationId={focusLocationId}
            onBackToHome={() => handleNavigate('home')}
          />
        )}

        {activeView === 'map' && (
          <CampusMapPage
            onSelectBuilding={handleSelectLocation}
          />
        )}

        {activeView === 'explore' && (
          <Explore
            onVisitLocation={handleSelectLocation}
          />
        )}

        {activeView === 'about' && (
          <About
            onStartTour={handleStartTour}
          />
        )}

        {activeView === 'help' && (
          <Help
            onStartTour={handleStartTour}
          />
        )}
      </main>

      {/* University Footer (rendered on non-3D pages or below content) */}
      {activeView !== 'tour' && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { CAMPUS_LOCATIONS } from '../../data/campusData';
import { Maximize2, Minimize2, MapPin, Navigation } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

export default function MiniMap({ activeLocationId, onSelectLocation, cameraPos }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Map world bounds (-150 to 150 X, -90 to 140 Z) to 0-100% SVG coordinates
  const worldToMap = (wx, wz) => {
    // X range: -140 to 140 => 0 to 100%
    const left = ((wx + 140) / 280) * 100;
    // Z range: 130 to -80 => 0 to 100% (south is +Z, so top is -Z or +Z depending on orientation)
    // In our scene: +Z is entrance (south), -Z is north. Let's orient North up:
    // top = 0% is north (Z = -90), top = 100% is south (Z = 130)
    const top = ((wz - -90) / 220) * 100;
    return { left: `${Math.max(5, Math.min(95, left))}%`, top: `${Math.max(6, Math.min(94, 100 - top))}%` };
  };

  const handlePinClick = (loc) => {
    soundManager.playClick();
    onSelectLocation(loc);
  };

  return (
    <div className={`mini-map-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="mini-map-header">
        <div className="mini-map-title">
          <Navigation size={14} className="radar-icon" />
          <span>Campus Radar</span>
        </div>
        <button
          className="mini-map-toggle"
          onClick={() => {
            soundManager.playClick();
            setIsExpanded(!isExpanded);
          }}
          title={isExpanded ? 'Minimize Radar' : 'Expand Radar'}
        >
          {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

      <div className="mini-map-canvas">
        {/* Background Grid & Compass Rose */}
        <div className="mini-map-compass">N</div>
        
        {/* Simplified Campus Roadways Overlay */}
        <svg className="mini-map-roads" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Main Central Boulevard */}
          <line x1="50" y1="10" x2="50" y2="92" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
          {/* Cross Boulevard */}
          <line x1="8" y1="48" x2="92" y2="48" stroke="rgba(255,255,255,0.18)" strokeWidth="2.5" />
          {/* Rear Boulevard */}
          <line x1="12" y1="18" x2="88" y2="18" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
          {/* Sports Oval */}
          <ellipse cx="86" cy="52" rx="9" ry="14" fill="none" stroke="rgba(22,163,74,0.4)" strokeWidth="2" />
        </svg>

        {/* Building Markers */}
        {CAMPUS_LOCATIONS.map((loc) => {
          const coords = worldToMap(loc.coordinates.x, loc.coordinates.z);
          const isActive = activeLocationId === loc.id;

          return (
            <button
              key={loc.id}
              className={`mini-map-pin ${isActive ? 'active' : ''}`}
              style={{
                left: coords.left,
                top: coords.top,
                '--pin-color': loc.color
              }}
              onClick={() => handlePinClick(loc)}
              title={`${loc.name} - Click to visit`}
            >
              <div className="pin-dot" />
              {isExpanded && <span className="pin-label">{loc.shortName}</span>}
            </button>
          );
        })}

        {/* Current Camera Indicator */}
        {cameraPos && (
          <div
            className="mini-map-user"
            style={{
              left: worldToMap(cameraPos.x, cameraPos.z).left,
              top: worldToMap(cameraPos.x, cameraPos.z).top
            }}
            title="Your Viewpoint"
          >
            <div className="user-cone" />
            <div className="user-blip" />
          </div>
        )}
      </div>

      <div className="mini-map-footer">
        <span>Click any pin to navigate</span>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { CAMPUS_LOCATIONS } from '../data/campusData';
import { Map, ArrowRight, Compass, Layers, Check } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function CampusMapPage({ onSelectBuilding }) {
  const [selectedLoc, setSelectedLoc] = useState(CAMPUS_LOCATIONS[0]);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredLocations = CAMPUS_LOCATIONS.filter(l => {
    if (activeFilter === 'all') return true;
    return l.category === activeFilter;
  });

  const handleBuildingSelect = (loc) => {
    soundManager.playClick();
    setSelectedLoc(loc);
  };

  const handleVisit3D = (loc) => {
    soundManager.playTransition();
    onSelectBuilding(loc.id);
  };

  return (
    <div className="campus-map-page animate-fade-in">
      {/* Map Header */}
      <div className="map-page-header">
        <div className="map-title-area">
          <div className="map-badge">
            <Compass size={16} />
            <span>Interactive Schematic</span>
          </div>
          <h1>Campus Architectural Map</h1>
          <p>Click on any building or zone to view details or fly directly to its 3D location.</p>
        </div>

        {/* Filter Pills */}
        <div className="map-filter-pills">
          {[
            { id: 'all', label: 'All Zones' },
            { id: 'academic', label: 'Academic & Labs' },
            { id: 'administrative', label: 'Admin' },
            { id: 'student-life', label: 'Student Life' },
            { id: 'facility', label: 'Facilities' }
          ].map(filter => (
            <button
              key={filter.id}
              className={`filter-pill ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => {
                soundManager.playClick();
                setActiveFilter(filter.id);
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Layout */}
      <div className="map-content-layout">
        {/* Schematic 2D Blueprint Map */}
        <div className="schematic-map-container">
          <div className="blueprint-grid-bg" />

          {/* Compass Rose */}
          <div className="blueprint-compass">
            <div className="compass-arrow">&uarr;</div>
            <span className="compass-label">NORTH</span>
          </div>

          {/* Roads & Pathways SVG Graphic */}
          <svg className="blueprint-roads" viewBox="0 0 1000 700" preserveAspectRatio="none">
            {/* Outer Perimeter Road */}
            <rect x="60" y="60" width="880" height="580" rx="30" fill="none" stroke="#334155" strokeWidth="24" strokeLinecap="round" />
            <rect x="60" y="60" width="880" height="580" rx="30" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="12 8" />

            {/* Central Avenue from Main Entrance */}
            <line x1="500" y1="640" x2="500" y2="240" stroke="#334155" strokeWidth="32" />
            <line x1="500" y1="640" x2="500" y2="240" stroke="#f8fafc" strokeWidth="2" strokeDasharray="14 10" />

            {/* Cross Avenue */}
            <line x1="160" y1="360" x2="840" y2="360" stroke="#334155" strokeWidth="26" />
            <line x1="160" y1="360" x2="840" y2="360" stroke="#f8fafc" strokeWidth="2" strokeDasharray="12 8" />

            {/* Admin Roundabout Plaza */}
            <circle cx="500" cy="360" r="60" fill="#1e293b" stroke="#475569" strokeWidth="4" />
            <circle cx="500" cy="360" r="25" fill="#3b82f6" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2" />

            {/* Connecting Pathways */}
            <line x1="500" y1="360" x2="300" y2="320" stroke="#475569" strokeWidth="6" strokeDasharray="6 4" />
            <line x1="500" y1="360" x2="700" y2="320" stroke="#475569" strokeWidth="6" strokeDasharray="6 4" />
            <line x1="300" y1="320" x2="260" y2="180" stroke="#475569" strokeWidth="6" strokeDasharray="6 4" />
            <line x1="700" y1="320" x2="730" y2="170" stroke="#475569" strokeWidth="6" strokeDasharray="6 4" />

            {/* Sports Oval Track */}
            <ellipse cx="800" cy="350" rx="90" ry="120" fill="none" stroke="#c2410c" strokeWidth="12" />
            <rect x="750" y="290" width="100" height="120" fill="#16a34a" fillOpacity="0.4" rx="6" />
          </svg>

          {/* Interactive Landmark Pins on Blueprint */}
          {CAMPUS_LOCATIONS.map((loc) => {
            // Coordinate mapping to 1000 x 700
            const leftPct = ((loc.coordinates.x + 140) / 280) * 100;
            const topPct = 100 - (((loc.coordinates.z - -90) / 220) * 100);

            const isSelected = selectedLoc.id === loc.id;
            const matchesFilter = activeFilter === 'all' || loc.category === activeFilter;

            return (
              <div
                key={loc.id}
                className={`blueprint-node ${isSelected ? 'active' : ''} ${!matchesFilter ? 'dimmed' : ''}`}
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  '--node-color': loc.color
                }}
                onClick={() => handleBuildingSelect(loc)}
              >
                <div className="node-box">
                  <span className="node-code">{loc.shortName}</span>
                </div>
                {isSelected && <div className="node-pulse" />}
              </div>
            );
          })}
        </div>

        {/* Selected Building Details Sidebar */}
        <div className="map-detail-sidebar">
          {selectedLoc && (
            <div className="selected-sidebar-card">
              <div className="sidebar-badge" style={{ backgroundColor: `${selectedLoc.color}20`, color: selectedLoc.color }}>
                {selectedLoc.badge}
              </div>

              <h2>{selectedLoc.name}</h2>
              <p className="sidebar-subtitle">{selectedLoc.subtitle}</p>

              <div className="sidebar-desc-box">
                <p>{selectedLoc.description}</p>
              </div>

              <div className="sidebar-facilities-list">
                <h4>Key Facilities:</h4>
                <ul>
                  {selectedLoc.keyFacilities.slice(0, 4).map((f, i) => (
                    <li key={i}>
                      <Check size={14} style={{ color: selectedLoc.color }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-cta-row">
                <button
                  className="btn-flyto-3d"
                  style={{ backgroundColor: selectedLoc.color }}
                  onClick={() => handleVisit3D(selectedLoc)}
                >
                  <span>Fly to in 3D Tour</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

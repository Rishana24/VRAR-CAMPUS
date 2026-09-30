import React, { useState } from 'react';
import { CAMPUS_LOCATIONS, TOUR_CATEGORIES } from '../data/campusData';
import { Search, Compass, ArrowRight, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function Explore({ onVisitLocation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredLocations = CAMPUS_LOCATIONS.filter((loc) => {
    const matchesSearch =
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.keyFacilities.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || loc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleVisit = (locId) => {
    soundManager.playTransition();
    onVisitLocation(locId);
  };

  return (
    <div className="explore-page-container animate-fade-in">
      {/* Page Header */}
      <div className="explore-header">
        <div className="explore-title-wrapper">
          <div className="explore-badge">
            <Sparkles size={14} />
            <span>Campus Directory</span>
          </div>
          <h1>Explore Campus Locations</h1>
          <p>Browse through all 11 university departments, student facilities, and landmarks. Click "Visit" to jump directly into the 3D scene.</p>
        </div>

        {/* Search Bar */}
        <div className="explore-search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search departments, facilities (e.g. AI Lab, Library, Sports)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Filter Categories */}
      <div className="category-tabs-row">
        {TOUR_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`cat-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => {
              soundManager.playClick();
              setSelectedCategory(cat.id);
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="explore-cards-grid">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((loc) => (
            <div
              key={loc.id}
              className="explore-location-card"
              style={{ '--card-accent': loc.color }}
            >
              {/* Card Visual Header */}
              <div
                className="card-visual-banner"
                style={{
                  background: `linear-gradient(135deg, ${loc.color}22 0%, #1e293b 100%)`
                }}
              >
                <span className="card-badge-pill" style={{ backgroundColor: `${loc.color}25`, color: loc.color }}>
                  {loc.badge}
                </span>
                <div className="card-icon-emblem" style={{ borderColor: loc.color }}>
                  <Building2 size={24} style={{ color: loc.accentColor }} />
                </div>
              </div>

              {/* Card Body */}
              <div className="card-content-body">
                <h3 className="location-name">{loc.name}</h3>
                <h5 className="location-subtitle">{loc.subtitle}</h5>
                <p className="location-short-desc">{loc.tagline}</p>

                {/* Key Facilities highlights */}
                <div className="card-facilities-preview">
                  <span className="fac-preview-heading">Key Highlights:</span>
                  <div className="fac-chips">
                    {loc.keyFacilities.slice(0, 3).map((f, idx) => (
                      <span key={idx} className="fac-chip">
                        <CheckCircle2 size={12} style={{ color: loc.color }} />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="card-action-footer">
                <button
                  className="btn-visit-location"
                  style={{ backgroundColor: loc.color }}
                  onClick={() => handleVisit(loc.id)}
                >
                  <span>Visit in 3D Tour</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-search-state">
            <p>No campus locations found matching "{searchTerm}".</p>
            <button
              className="btn-reset-filter"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

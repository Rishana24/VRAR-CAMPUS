import React from 'react';
import {
  Compass,
  ArrowRight,
  Play,
  Layers,
  MousePointer,
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { CAMPUS_LOCATIONS, CAMPUS_STATS } from '../data/campusData';
import { soundManager } from '../utils/soundEffects';

export default function Home({ onStartTour, onExploreCampus, onSelectLocation }) {
  const previewLocations = CAMPUS_LOCATIONS.slice(0, 4);

  return (
    <div className="home-page-container animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-pill-badge">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Interactive 3D Virtual Tour &bull; No Headset Required</span>
          </div>

          <h1 className="hero-main-title">
            Explore Our <span className="gradient-text">Campus</span>
          </h1>

          <p className="hero-subtitle-text">
            Experience our campus through an interactive virtual tour. Navigate through world-class academic blocks, state-of-the-art research labs, central library, and athletic grounds directly from your laptop browser.
          </p>

          <div className="hero-cta-group">
            <button
              className="btn-hero-primary"
              onClick={() => {
                soundManager.playTransition();
                onStartTour();
              }}
            >
              <Play size={18} className="fill-current" />
              <span>Start Tour</span>
            </button>

            <button
              className="btn-hero-secondary"
              onClick={() => {
                soundManager.playClick();
                onExploreCampus();
              }}
            >
              <Compass size={18} />
              <span>Explore Campus</span>
            </button>
          </div>

          {/* Quick Browser Compatibility Badges */}
          <div className="hero-guarantees">
            <div className="guarantee-item">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Runs smoothly on any laptop</span>
            </div>
            <div className="guarantee-item">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Mouse, keyboard & touchpad controls</span>
            </div>
            <div className="guarantee-item">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>11 key university landmarks</span>
            </div>
          </div>
        </div>

        {/* 3D Campus Interactive Preview Card */}
        <div className="hero-visual-card">
          <div className="visual-card-glass">
            <div className="preview-skyline-scene">
              {/* Stylized Architectural Preview Graphic */}
              <div className="preview-badge-overlay">
                <span className="live-radar-blip" />
                <span>3D Interactive Engine Ready</span>
              </div>

              {/* Graphic Building Blocks Illustration */}
              <div className="campus-isometric-art">
                <div className="iso-building iso-admin">
                  <div className="iso-roof" />
                  <div className="iso-spire" />
                  <span>Admin Tower</span>
                </div>
                <div className="iso-building iso-library">
                  <div className="iso-dome" />
                  <span>Central Library</span>
                </div>
                <div className="iso-building iso-cs">
                  <div className="iso-cyber-grid" />
                  <span>AI & CS Hub</span>
                </div>
                <div className="iso-building iso-sports">
                  <div className="iso-track-oval" />
                  <span>Athletics</span>
                </div>
              </div>

              <div className="preview-action-overlay">
                <button
                  className="preview-enter-btn"
                  onClick={() => {
                    soundManager.playTransition();
                    onExploreCampus();
                  }}
                >
                  <MousePointer size={16} />
                  <span>Launch 3D Environment</span>
                </button>
              </div>
            </div>

            {/* Quick mini ticker */}
            <div className="preview-stats-bar">
              <div>
                <strong>11</strong> Landmarks
              </div>
              <div>
                <strong>60 FPS</strong> WebGL
              </div>
              <div>
                <strong>360°</strong> Free Roam
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Key Metrics Grid */}
      <section className="campus-metrics-section">
        <div className="metrics-grid">
          {CAMPUS_STATS.map((stat, idx) => (
            <div key={idx} className="metric-card">
              <span className="metric-value">{stat.value}</span>
              <span className="metric-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Campus Landmarks */}
      <section className="featured-landmarks-section">
        <div className="section-header-center">
          <span className="section-eyebrow">Highlights</span>
          <h2 className="section-title">Iconic Campus Landmarks</h2>
          <p className="section-desc">
            Click on any landmark to fly directly to its location inside the 3D campus.
          </p>
        </div>

        <div className="landmarks-preview-grid">
          {previewLocations.map((loc) => (
            <div
              key={loc.id}
              className="landmark-preview-card"
              style={{ '--loc-accent': loc.color }}
              onClick={() => {
                soundManager.playClick();
                onSelectLocation(loc.id);
              }}
            >
              <div className="card-top-row">
                <span className="card-category-pill" style={{ backgroundColor: `${loc.color}20`, color: loc.color }}>
                  {loc.badge}
                </span>
                <span className="visit-arrow">
                  <ArrowRight size={16} />
                </span>
              </div>
              <h3 className="card-building-name">{loc.name}</h3>
              <p className="card-short-desc">{loc.tagline}</p>
              <div className="card-facilities-tags">
                {loc.keyFacilities.slice(0, 2).map((fac, i) => (
                  <span key={i} className="facility-tag">{fac}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-cta">
          <button
            className="btn-view-all"
            onClick={() => {
              soundManager.playClick();
              onExploreCampus();
            }}
          >
            <span>View All 11 Campus Locations</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* How to Navigate Featurettes */}
      <section className="controls-summary-section">
        <div className="controls-summary-box">
          <div className="controls-col">
            <h3>Smooth Laptop Navigation</h3>
            <p>
              Designed from the ground up for seamless navigation on any standard laptop or desktop keyboard and trackpad.
            </p>
            <div className="features-checklist">
              <div className="feat-row">
                <kbd>WASD</kbd> or <kbd>&uarr;&darr;&larr;&rarr;</kbd> keys to walk smoothly across grounds
              </div>
              <div className="feat-row">
                <strong>Mouse Left Drag:</strong> Orbit camera 360 degrees around any landmark
              </div>
              <div className="feat-row">
                <strong>Scroll Wheel:</strong> Zoom in to inspect architecture & classrooms
              </div>
              <div className="feat-row">
                <strong>Click Any Building:</strong> Instantly brings up historical info & facilities
              </div>
            </div>
          </div>
          <div className="controls-col-actions">
            <button
              className="btn-launch-tour-large"
              onClick={() => {
                soundManager.playTransition();
                onStartTour();
              }}
            >
              <Play size={20} className="fill-current" />
              <span>Launch Virtual Tour</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

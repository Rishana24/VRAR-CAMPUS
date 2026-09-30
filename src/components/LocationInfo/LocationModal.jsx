import React, { useState } from 'react';
import {
  X,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Volume2,
  Clock,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

export default function LocationModal({
  location,
  onClose,
  onEnterDetail
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showInteriorSim, setShowInteriorSim] = useState(false);

  if (!location) return null;

  const handleSpeak = () => {
    soundManager.playClick();
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      window.speechSynthesis.cancel();
      const text = `${location.name}. ${location.tagline}. ${location.description}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleClose = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    soundManager.playClick();
    onClose();
  };

  return (
    <div className="location-modal-backdrop" onClick={handleClose}>
      <div
        className="location-modal-card animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{ '--accent-color': location.color }}
      >
        {/* Header Bar */}
        <div className="location-modal-header">
          <div className="header-badge-row">
            <span className="location-category-badge" style={{ backgroundColor: `${location.color}25`, color: location.color }}>
              {location.badge}
            </span>
            <span className="location-coords-badge">
              Sector: [{location.coordinates.x}, {location.coordinates.z}]
            </span>
          </div>
          <button
            className="modal-close-btn"
            onClick={handleClose}
            title="Close / Back to Campus (ESC)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Hero Visual Presentation */}
        <div className="location-hero-visual" style={{ background: `linear-gradient(135deg, ${location.color}22 0%, #0f172a 100%)` }}>
          {/* Stylized Architectural Card Icon / Art */}
          <div className="hero-art-icon" style={{ borderColor: location.color }}>
            <Sparkles size={28} style={{ color: location.accentColor }} />
          </div>
          <div className="hero-titles">
            <h2 className="hero-building-name">{location.name}</h2>
            <p className="hero-subtitle">{location.subtitle}</p>
          </div>
          <button
            className={`speech-btn ${isSpeaking ? 'speaking' : ''}`}
            onClick={handleSpeak}
            title={isSpeaking ? "Mute audio narration" : "Listen to audio narration"}
          >
            <Volume2 size={18} />
          </button>
        </div>

        {/* Body Content */}
        <div className="location-modal-body">
          {/* Main Description */}
          <div className="modal-section">
            <h4 className="section-label">Overview</h4>
            <p className="location-description-text">{location.description}</p>
          </div>

          {/* Key Facilities List */}
          <div className="modal-section">
            <h4 className="section-label">Important Facilities & Infrastructure</h4>
            <div className="facilities-grid">
              {location.keyFacilities.map((facility, idx) => (
                <div key={idx} className="facility-item">
                  <CheckCircle2 size={16} className="facility-check" style={{ color: location.color }} />
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Statistics Table */}
          {location.stats && (
            <div className="modal-section">
              <h4 className="section-label">Key Specifications</h4>
              <div className="stats-badges-grid">
                {Object.entries(location.stats).map(([k, v], idx) => (
                  <div key={idx} className="stat-pill">
                    <span className="stat-pill-label">{k}</span>
                    <span className="stat-pill-value">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Highlight & Tour Note */}
          <div className="architecture-box" style={{ borderLeftColor: location.color }}>
            <p className="arch-note-text">
              <strong>Architectural Style:</strong> {location.architecturalStyle}
            </p>
            <p className="tour-tip-text">
              <strong>Tour Guide Note:</strong> {location.virtualTourNote}
            </p>
          </div>

          {/* Simulated Interior Panorama View */}
          {showInteriorSim && (
            <div className="interior-sim-preview animate-fade-in">
              <div className="sim-header">
                <span>Immersive 360° Interior Simulation</span>
                <button
                  className="sim-close"
                  onClick={() => setShowInteriorSim(false)}
                >
                  <X size={14} />
                </button>
              </div>
              <div className="sim-viewbox" style={{ borderColor: location.color }}>
                <div className="sim-scanlines" />
                <div className="sim-content">
                  <Maximize2 size={32} style={{ color: location.color }} />
                  <p>Interior Panorama View Active</p>
                  <small>Equipped with high-definition digital podiums, ambient lighting & accessible zones.</small>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="location-modal-footer">
          <button
            className="btn-back-campus"
            onClick={handleClose}
          >
            <ArrowLeft size={16} />
            <span>Back to Campus</span>
          </button>

          <div className="footer-right-actions">
            <button
              className="btn-interior-view"
              onClick={() => {
                soundManager.playClick();
                setShowInteriorSim(!showInteriorSim);
              }}
            >
              <Sparkles size={16} />
              <span>{showInteriorSim ? "Hide Interior" : "Virtual View"}</span>
            </button>

            <button
              className="btn-enter-explore"
              style={{ backgroundColor: location.color }}
              onClick={() => {
                soundManager.playTransition();
                if (onEnterDetail) onEnterDetail(location);
                handleClose();
              }}
            >
              <span>Explore Location</span>
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

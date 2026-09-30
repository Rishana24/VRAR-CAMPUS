import React, { useState } from 'react';
import {
  GraduationCap,
  Compass,
  Map,
  Grid,
  Info,
  HelpCircle,
  Volume2,
  VolumeX,
  Play,
  Menu,
  X,
  Building
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function Navbar({
  activeView,
  onNavigate,
  onStartTour
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'tour', label: '3D Campus', icon: GraduationCap },
    { id: 'map', label: 'Campus Map', icon: Map },
    { id: 'explore', label: 'Explore', icon: Grid },
    { id: 'about', label: 'About', icon: Info },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  const handleNavClick = (viewId) => {
    soundManager.playClick();
    onNavigate(viewId);
    setIsMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) soundManager.playClick();
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => handleNavClick('home')}>
          <div className="brand-icon-wrapper">
            <GraduationCap className="brand-icon" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-title">CAMPUS 3D</span>
            <span className="brand-subtitle">Virtual Tour</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={16} className="nav-icon" />
                <span>{item.label}</span>
                {isActive && <span className="active-pill-glow" />}
              </button>
            );
          })}
        </nav>

        {/* Action Controls (Audio toggle + Quick Tour CTA) */}
        <div className="navbar-actions">
          <button
            className={`audio-toggle-btn ${isMuted ? 'muted' : ''}`}
            onClick={toggleSound}
            title={isMuted ? 'Unmute audio cues' : 'Mute audio cues'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <button
            className="quick-tour-btn"
            onClick={() => {
              soundManager.playTransition();
              onStartTour();
            }}
          >
            <Play size={14} className="fill-current" />
            <span>Start Tour</span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-drawer animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}

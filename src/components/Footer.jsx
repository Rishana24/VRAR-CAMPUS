import React from 'react';
import { GraduationCap, MapPin, Phone, Mail, Globe, Heart } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function Footer({ onNavigate }) {
  const handleLinkClick = (view) => {
    soundManager.playClick();
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container">
      <div className="footer-top-row">
        {/* Brand Col */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <div className="footer-icon-wrap">
              <GraduationCap size={22} />
            </div>
            <span>CAMPUS 3D TOUR</span>
          </div>
          <p className="footer-brand-desc">
            An interactive WebGL 3D virtual tour of the university campus. Designed to run smoothly on modern laptop and desktop browsers with zero VR headset prerequisites.
          </p>
          <div className="footer-contact-info">
            <div>
              <MapPin size={14} />
              <span>University Boulevard, Academic Heights</span>
            </div>
            <div>
              <Phone size={14} />
              <span>+1 (800) 555-CAMPUS / Admissions Helpline</span>
            </div>
            <div>
              <Mail size={14} />
              <span>info@campustour.edu</span>
            </div>
          </div>
        </div>

        {/* Quick Navigation Col */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul>
            <li>
              <button onClick={() => handleLinkClick('home')}>Home</button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('tour')}>3D Virtual Campus</button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('map')}>Campus Architectural Map</button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('explore')}>Location Directory</button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('about')}>About The Project</button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('help')}>Help & Controls</button>
            </li>
          </ul>
        </div>

        {/* Landmarks Col */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Key Locations</h4>
          <ul>
            <li>
              <button onClick={() => handleLinkClick('tour')}>Administration Block</button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('tour')}>CS & AI Department</button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('tour')}>Central Library</button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('tour')}>Grand Auditorium</button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('tour')}>Sports Complex</button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('tour')}>Advanced Labs</button>
            </li>
          </ul>
        </div>

        {/* Tech Specs */}
        <div className="footer-links-col">
          <h4 className="footer-heading">System Specs</h4>
          <div className="specs-card">
            <div><strong>Rendering:</strong> Three.js WebGL 2.0</div>
            <div><strong>Framework:</strong> React 18 + Vite</div>
            <div><strong>Performance:</strong> 60 FPS Target</div>
            <div><strong>Compatibility:</strong> Chrome, Edge, Firefox, Safari</div>
            <div><strong>Spatial Audio:</strong> Web Audio Synth</div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p>
          &copy; {new Date().getFullYear()} Virtual Campus Tour &bull; Developed for Virtual & Augmented Reality (VR/AR) College Curriculum.
        </p>
        <p className="footer-credit">
          Crafted with modern WebGL and responsive web design.
        </p>
      </div>
    </footer>
  );
}

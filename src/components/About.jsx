import React from 'react';
import {
  GraduationCap,
  Users,
  Compass,
  Cpu,
  Eye,
  Award,
  Globe,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function About({ onStartTour }) {
  return (
    <div className="about-page-container animate-fade-in">
      {/* Hero Banner */}
      <div className="about-hero-section">
        <div className="about-hero-badge">
          <GraduationCap size={16} />
          <span>Academic Innovation</span>
        </div>
        <h1>About the Virtual Campus Tour</h1>
        <p className="about-hero-subtitle">
          Bridging physical distance with immersive 3D spatial web technologies to empower prospective scholars, parents, alumni, and global visitors.
        </p>
      </div>

      {/* Mission & Purpose Grid */}
      <div className="about-grid-section">
        <div className="about-card">
          <div className="about-card-icon icon-prospective">
            <Users size={24} />
          </div>
          <h3>Prospective Students</h3>
          <p>
            Experience campus life before enrollment. Tour smart lecture halls, advanced computing clusters, dining courtyards, and residential halls without traveling hundreds of miles.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-icon icon-visitors">
            <Compass size={24} />
          </div>
          <h3>Visitors & Conference Guests</h3>
          <p>
            Effortlessly locate event venues, parking hubs, administrative desks, and auditoriums before your arrival. Navigate unfamiliar campus avenues with spatial confidence.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-icon icon-tech">
            <Cpu size={24} />
          </div>
          <h3>Zero Hardware Barrier</h3>
          <p>
            Built using modern WebGL and WebXR standards, this platform requires zero specialized VR headsets. Standard laptop trackpads, keyboards, and mice provide fluid 60 FPS exploration.
          </p>
        </div>
      </div>

      {/* Technological Pillars */}
      <div className="tech-architecture-section">
        <h2>Architecture & Technology Stack</h2>
        <div className="tech-stack-row">
          <div className="tech-pill">
            <span className="pill-dot" />
            <strong>Frontend:</strong> React 18 & Modern Component Architecture
          </div>
          <div className="tech-pill">
            <span className="pill-dot" />
            <strong>3D Graphics:</strong> Three.js WebGL Engine with Custom Shaders
          </div>
          <div className="tech-pill">
            <span className="pill-dot" />
            <strong>Audio Synthesis:</strong> Web Audio API
          </div>
          <div className="tech-pill">
            <span className="pill-dot" />
            <strong>Spatial Physics:</strong> Raycasting & Frustum Optimization
          </div>
          <div className="tech-pill">
            <span className="pill-dot" />
            <strong>Styling:</strong> CSS Glassmorphism & Responsive Grids
          </div>
        </div>
      </div>

      {/* College Project Vision */}
      <div className="project-vision-banner">
        <div className="vision-text">
          <Sparkles size={24} className="sparkle-gold" />
          <div>
            <h3>Academic Virtual Reality & Spatial Computing Initiative</h3>
            <p>
              Developed as an interactive campus digital twin to demonstrate the power of lightweight, accessible 3D spatial web applications. Designed to scale seamlessly with new departments, interior panoramas, and real-time event schedules.
            </p>
          </div>
        </div>
        <button
          className="btn-vision-tour"
          onClick={() => {
            soundManager.playTransition();
            onStartTour();
          }}
        >
          <span>Experience Campus in 3D</span>
        </button>
      </div>
    </div>
  );
}

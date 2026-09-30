import React from 'react';
import {
  Keyboard,
  MousePointer,
  ZoomIn,
  MapPin,
  Compass,
  RotateCcw,
  Sparkles,
  Play,
  Layers,
  HelpCircle
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function Help({ onStartTour }) {
  return (
    <div className="help-page-container animate-fade-in">
      {/* Help Hero */}
      <div className="help-hero-section">
        <div className="help-badge">
          <HelpCircle size={16} />
          <span>User Navigation Guide</span>
        </div>
        <h1>Campus Tour Controls & Help</h1>
        <p>Master mouse, keyboard, and on-screen controls to easily explore our 3D college campus.</p>
      </div>

      {/* Control Guides Grid */}
      <div className="controls-guide-grid">
        {/* 1. Keyboard Navigation */}
        <div className="guide-card">
          <div className="guide-header">
            <div className="guide-icon-box">
              <Keyboard size={22} />
            </div>
            <h3>1. Moving with Keyboard</h3>
          </div>
          <p className="guide-desc">
            Use standard gaming and navigation keys to walk across campus avenues in real time:
          </p>
          <div className="keys-showcase">
            <div className="key-item">
              <kbd>W</kbd> / <kbd>&uarr;</kbd>
              <span>Move Forward along camera line of sight</span>
            </div>
            <div className="key-item">
              <kbd>S</kbd> / <kbd>&darr;</kbd>
              <span>Move Backward</span>
            </div>
            <div className="key-item">
              <kbd>A</kbd> / <kbd>&larr;</kbd>
              <span>Strafe Left</span>
            </div>
            <div className="key-item">
              <kbd>D</kbd> / <kbd>&rarr;</kbd>
              <span>Strafe Right</span>
            </div>
            <div className="key-item">
              <kbd>R</kbd>
              <span>Reset camera to panoramic campus overview</span>
            </div>
            <div className="key-item">
              <kbd>ESC</kbd>
              <span>Close location info card / exit inspection</span>
            </div>
          </div>
        </div>

        {/* 2. Mouse & Trackpad Rotation */}
        <div className="guide-card">
          <div className="guide-header">
            <div className="guide-icon-box">
              <MousePointer size={22} />
            </div>
            <h3>2. Rotating Camera with Mouse</h3>
          </div>
          <p className="guide-desc">
            Effortlessly look around buildings and change your viewpoint angle:
          </p>
          <div className="keys-showcase">
            <div className="key-item">
              <strong>Left Click + Drag</strong>
              <span>Rotate & orbit the camera around the campus or selected building</span>
            </div>
            <div className="key-item">
              <strong>Right Click + Drag</strong>
              <span>Pan the camera view horizontally & vertically</span>
            </div>
            <div className="key-item">
              <strong>Touchpad Drag</strong>
              <span>Two-finger drag rotates the 3D scene smoothly</span>
            </div>
          </div>
        </div>

        {/* 3. Zooming Controls */}
        <div className="guide-card">
          <div className="guide-header">
            <div className="guide-icon-box">
              <ZoomIn size={22} />
            </div>
            <h3>3. Zooming In & Out</h3>
          </div>
          <p className="guide-desc">
            Inspect architectural details closely or pull back for bird's-eye quad views:
          </p>
          <div className="keys-showcase">
            <div className="key-item">
              <strong>Mouse Scroll Wheel</strong>
              <span>Scroll up to zoom in, scroll down to zoom out</span>
            </div>
            <div className="key-item">
              <strong>Trackpad Pinch</strong>
              <span>Pinch in/out to smoothly zoom</span>
            </div>
            <div className="key-item">
              <strong>On-Screen Buttons</strong>
              <span>Click the <kbd>+</kbd> and <kbd>-</kbd> buttons on the floating HUD</span>
            </div>
          </div>
        </div>

        {/* 4. Selecting Locations */}
        <div className="guide-card">
          <div className="guide-header">
            <div className="guide-icon-box">
              <MapPin size={22} />
            </div>
            <h3>4. Selecting & Inspecting Locations</h3>
          </div>
          <p className="guide-desc">
            Interact directly with any of the 11 landmarks across campus:
          </p>
          <div className="keys-showcase">
            <div className="key-item">
              <strong>Click Any Building</strong>
              <span>Click on any 3D building or floating crystal marker to fly directly to it</span>
            </div>
            <div className="key-item">
              <strong>Location Info Panel</strong>
              <span>Displays overview, facilities, statistics, and interior panorama view</span>
            </div>
            <div className="key-item">
              <strong>Audio Narration</strong>
              <span>Click the speaker icon inside the location panel to listen to voice narration</span>
            </div>
          </div>
        </div>

        {/* 5. Campus Mini-Map & Radar */}
        <div className="guide-card">
          <div className="guide-header">
            <div className="guide-icon-box">
              <Compass size={22} />
            </div>
            <h3>5. Using the Campus Map</h3>
          </div>
          <p className="guide-desc">
            Keep your bearings with the real-time 2D radar mini-map:
          </p>
          <div className="keys-showcase">
            <div className="key-item">
              <strong>Radar Overlay</strong>
              <span>Located in the bottom-left corner of the 3D scene</span>
            </div>
            <div className="key-item">
              <strong>Real-Time Blip</strong>
              <span>Shows your current camera location and direction</span>
            </div>
            <div className="key-item">
              <strong>Click-to-Teleport</strong>
              <span>Click any building icon on the map to fly the camera immediately there</span>
            </div>
            <div className="key-item">
              <strong>Expand / Minimize</strong>
              <span>Toggle the expand icon to see labeled building blueprints</span>
            </div>
          </div>
        </div>

        {/* 6. Guided Tour Autopilot */}
        <div className="guide-card">
          <div className="guide-header">
            <div className="guide-icon-box">
              <Play size={22} />
            </div>
            <h3>6. Guided Tour Mode</h3>
          </div>
          <p className="guide-desc">
            Sit back and enjoy an automated cinematic flythrough:
          </p>
          <div className="keys-showcase">
            <div className="key-item">
              <strong>Start Tour</strong>
              <span>Click "Start Tour" in the navigation bar or HUD to begin the autopilot</span>
            </div>
            <div className="key-item">
              <strong>Sequential Flight</strong>
              <span>The camera smoothly glides through all 11 stations with pauses for briefing</span>
            </div>
            <div className="key-item">
              <strong>Pause / Resume</strong>
              <span>Take manual control whenever you want, or resume autopilot anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launch CTA */}
      <div className="help-cta-footer">
        <button
          className="btn-try-now"
          onClick={() => {
            soundManager.playTransition();
            onStartTour();
          }}
        >
          <Play size={18} className="fill-current" />
          <span>Launch 3D Campus Tour Now</span>
        </button>
      </div>
    </div>
  );
}

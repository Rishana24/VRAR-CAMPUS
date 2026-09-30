import React from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  RotateCcw,
  Play,
  Pause,
  Compass,
  Glasses,
  HelpCircle
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

export default function NavigationControls({
  onMove,
  onZoom,
  onResetView,
  isTourRunning,
  onToggleTour,
  tourCurrentStep,
  tourTotalSteps,
  onToggleVR,
  isVRSupported,
  showHelp,
  onToggleHelp
}) {
  const handleNavClick = (direction) => {
    soundManager.playClick();
    onMove(direction);
  };

  const handleZoomClick = (delta) => {
    soundManager.playClick();
    onZoom(delta);
  };

  return (
    <div className="nav-controls-overlay">
      {/* On-Screen D-Pad for Touch/Mouse */}
      <div className="dpad-container" title="On-Screen Movement Controls">
        <button
          className="dpad-btn dpad-up"
          onClick={() => handleNavClick('forward')}
          title="Move Forward (W / Up Arrow)"
        >
          <ChevronUp size={22} />
        </button>
        <div className="dpad-middle-row">
          <button
            className="dpad-btn dpad-left"
            onClick={() => handleNavClick('left')}
            title="Move Left (A / Left Arrow)"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="dpad-btn dpad-center"
            onClick={() => {
              soundManager.playClick();
              onResetView();
            }}
            title="Reset Campus Overview (R)"
          >
            <RotateCcw size={18} />
          </button>
          <button
            className="dpad-btn dpad-right"
            onClick={() => handleNavClick('right')}
            title="Move Right (D / Right Arrow)"
          >
            <ChevronRight size={22} />
          </button>
        </div>
        <button
          className="dpad-btn dpad-down"
          onClick={() => handleNavClick('backward')}
          title="Move Backward (S / Down Arrow)"
        >
          <ChevronDown size={22} />
        </button>
      </div>

      {/* Vertical Action Bar (Zoom, Reset, Tour, VR) */}
      <div className="action-buttons-group">
        <button
          className="control-btn"
          onClick={() => handleZoomClick(1)}
          title="Zoom In (+ / Scroll Up)"
        >
          <Plus size={18} />
        </button>
        <button
          className="control-btn"
          onClick={() => handleZoomClick(-1)}
          title="Zoom Out (- / Scroll Down)"
        >
          <Minus size={18} />
        </button>
        <button
          className="control-btn reset-btn"
          onClick={() => {
            soundManager.playClick();
            onResetView();
          }}
          title="Reset View (R)"
        >
          <RotateCcw size={18} />
        </button>

        {/* Guided Tour Autopilot Toggle */}
        <button
          className={`control-btn tour-btn ${isTourRunning ? 'tour-active' : ''}`}
          onClick={() => {
            soundManager.playClick();
            onToggleTour();
          }}
          title={isTourRunning ? "Pause Guided Tour" : "Start Guided Tour Flythrough"}
        >
          {isTourRunning ? <Pause size={18} /> : <Play size={18} />}
        </button>

        {/* Optional WebXR VR Mode */}
        <button
          className="control-btn vr-btn"
          onClick={() => {
            soundManager.playClick();
            onToggleVR();
          }}
          title="Toggle VR Mode (Optional WebXR / Fullscreen Immersive)"
        >
          <Glasses size={18} />
        </button>

        {/* Small Instruction Panel Toggle */}
        <button
          className={`control-btn help-btn ${showHelp ? 'active' : ''}`}
          onClick={() => {
            soundManager.playClick();
            onToggleHelp();
          }}
          title="Toggle Controls Guide"
        >
          <HelpCircle size={18} />
        </button>
      </div>

      {/* Small floating quick instructions badge */}
      {showHelp && (
        <div className="quick-help-panel">
          <div className="quick-help-header">
            <Compass size={16} />
            <span>Laptop Controls</span>
          </div>
          <div className="quick-help-grid">
            <div className="help-row">
              <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd>
              <span>Move in Campus</span>
            </div>
            <div className="help-row">
              <kbd>Left Drag</kbd>
              <span>Orbit Camera</span>
            </div>
            <div className="help-row">
              <kbd>Right Drag</kbd>
              <span>Pan Camera</span>
            </div>
            <div className="help-row">
              <kbd>Scroll</kbd>
              <span>Zoom In / Out</span>
            </div>
            <div className="help-row">
              <kbd>Click</kbd>
              <span>Inspect Building</span>
            </div>
            <div className="help-row">
              <kbd>R</kbd>
              <span>Reset Overview</span>
            </div>
            <div className="help-row">
              <kbd>ESC</kbd>
              <span>Close Location Info</span>
            </div>
          </div>
        </div>
      )}

      {/* Guided Tour Banner Overlay when Autopilot is Running */}
      {isTourRunning && (
        <div className="tour-status-banner">
          <div className="tour-live-indicator">
            <span className="pulsing-dot" />
            <span>GUIDED TOUR IN PROGRESS</span>
          </div>
          <div className="tour-counter">
            Station {tourCurrentStep + 1} of {tourTotalSteps}
          </div>
          <button
            className="tour-stop-btn"
            onClick={() => {
              soundManager.playClick();
              onToggleTour();
            }}
          >
            Stop Tour
          </button>
        </div>
      )}
    </div>
  );
}

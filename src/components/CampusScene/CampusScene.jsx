import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { CAMPUS_LOCATIONS, DEFAULT_CAMERA_VIEW } from '../../data/campusData';
import { createCampusEnvironment } from './CampusModels';
import MiniMap from './MiniMap';
import NavigationControls from './NavigationControls';
import LocationModal from '../LocationInfo/LocationModal';
import { soundManager } from '../../utils/soundEffects';
import { Loader2, Compass, Layers } from 'lucide-react';

export default function CampusScene({ initialFocusLocationId = null, onBackToHome }) {
  const containerRef = useRef(null);

  // State
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(20);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hoveredBuildingName, setHoveredBuildingName] = useState(null);
  const [isTourRunning, setIsTourRunning] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [cameraCoords, setCameraCoords] = useState({ x: DEFAULT_CAMERA_VIEW.position.x, z: DEFAULT_CAMERA_VIEW.position.z });
  const [showHelpPanel, setShowHelpPanel] = useState(false);
  const [isVRMode, setIsVRMode] = useState(false);

  // Three.js internal references stored in ref to prevent re-render re-initialization
  const threeRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    interactiveObjects: [],
    pinMarkers: [],
    targetCamPos: new THREE.Vector3(DEFAULT_CAMERA_VIEW.position.x, DEFAULT_CAMERA_VIEW.position.y, DEFAULT_CAMERA_VIEW.position.z),
    targetLookAt: new THREE.Vector3(DEFAULT_CAMERA_VIEW.target.x, DEFAULT_CAMERA_VIEW.target.y, DEFAULT_CAMERA_VIEW.target.z),
    currentLookAt: new THREE.Vector3(DEFAULT_CAMERA_VIEW.target.x, DEFAULT_CAMERA_VIEW.target.y, DEFAULT_CAMERA_VIEW.target.z),
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    spherical: new THREE.Spherical(170, Math.PI / 3.2, 0),
    keysPressed: {},
    clock: new THREE.Clock(),
    animFrameId: null
  });

  // Smoothly fly camera to a target position and lookAt target
  const flyToLocation = useCallback((loc) => {
    if (!loc || !threeRef.current.camera) return;

    soundManager.playTransition();
    const t = threeRef.current;
    t.targetCamPos.set(loc.cameraPosition.x, loc.cameraPosition.y, loc.cameraPosition.z);
    t.targetLookAt.set(loc.cameraTarget.x, loc.cameraTarget.y, loc.cameraTarget.z);

    setSelectedLocation(loc);
  }, []);

  // Reset view to panoramic campus overview
  const resetView = useCallback(() => {
    soundManager.playTransition();
    const t = threeRef.current;
    t.targetCamPos.set(DEFAULT_CAMERA_VIEW.position.x, DEFAULT_CAMERA_VIEW.position.y, DEFAULT_CAMERA_VIEW.position.z);
    t.targetLookAt.set(DEFAULT_CAMERA_VIEW.target.x, DEFAULT_CAMERA_VIEW.target.y, DEFAULT_CAMERA_VIEW.target.z);
    setSelectedLocation(null);
  }, []);

  // Keyboard navigation step
  const handleKeyMovement = useCallback((direction, speed = 4) => {
    const t = threeRef.current;
    if (!t.camera) return;

    // Vector pointing from camera to current look target
    const forward = new THREE.Vector3().subVectors(t.targetLookAt, t.camera.position);
    forward.y = 0; // lock to horizontal ground plane
    forward.normalize();

    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    const moveVector = new THREE.Vector3();
    if (direction === 'forward') moveVector.addScaledVector(forward, speed);
    if (direction === 'backward') moveVector.addScaledVector(forward, -speed);
    if (direction === 'left') moveVector.addScaledVector(right, -speed);
    if (direction === 'right') moveVector.addScaledVector(right, speed);

    t.targetCamPos.add(moveVector);
    t.targetLookAt.add(moveVector);
  }, []);

  // Zoom step
  const handleZoom = useCallback((directionDelta) => {
    const t = threeRef.current;
    if (!t.camera) return;

    const zoomDir = new THREE.Vector3().subVectors(t.targetLookAt, t.targetCamPos).normalize();
    const step = directionDelta * 12;

    // Limit zoom range
    const dist = t.targetCamPos.distanceTo(t.targetLookAt);
    if ((dist < 20 && directionDelta > 0) || (dist > 280 && directionDelta < 0)) {
      return;
    }

    t.targetCamPos.addScaledVector(zoomDir, step);
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdbeafe); // Soft morning atmosphere sky
    scene.fog = new THREE.FogExp2(0xdbeafe, 0.0028);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.5, 800);
    camera.position.set(DEFAULT_CAMERA_VIEW.position.x, DEFAULT_CAMERA_VIEW.position.y, DEFAULT_CAMERA_VIEW.position.z);
    camera.lookAt(DEFAULT_CAMERA_VIEW.target.x, DEFAULT_CAMERA_VIEW.target.y, DEFAULT_CAMERA_VIEW.target.z);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Clear previous children and attach canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    setLoadProgress(50);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x3d6b4a, 0.55);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 1.25);
    sunLight.position.set(120, 160, 90);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 400;
    const shadowD = 160;
    sunLight.shadow.camera.left = -shadowD;
    sunLight.shadow.camera.right = shadowD;
    sunLight.shadow.camera.top = shadowD;
    sunLight.shadow.camera.bottom = -shadowD;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Decorative soft fill light
    const fillLight = new THREE.DirectionalLight(0xa5b4fc, 0.35);
    fillLight.position.set(-100, 80, -90);
    scene.add(fillLight);

    setLoadProgress(75);

    // 5. Build Procedural 3D Campus
    const { interactiveObjects, pinMarkers } = createCampusEnvironment(scene);

    const t = threeRef.current;
    t.scene = scene;
    t.camera = camera;
    t.renderer = renderer;
    t.interactiveObjects = interactiveObjects;
    t.pinMarkers = pinMarkers;

    setLoadProgress(100);
    setTimeout(() => setLoading(false), 300);

    // If an initial location was requested, fly there
    if (initialFocusLocationId) {
      const targetLoc = CAMPUS_LOCATIONS.find(l => l.id === initialFocusLocationId);
      if (targetLoc) {
        setTimeout(() => flyToLocation(targetLoc), 450);
      }
    }

    // 6. Raycasting Setup for Clicking & Hovering
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const findParentLocation = (obj) => {
      let curr = obj;
      while (curr) {
        if (curr.userData && curr.userData.locationId) {
          return curr.userData.locationId;
        }
        curr = curr.parent;
      }
      return null;
    };

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects, true);

      if (intersects.length > 0) {
        const locId = findParentLocation(intersects[0].object);
        if (locId) {
          const locObj = CAMPUS_LOCATIONS.find(l => l.id === locId);
          if (locObj) {
            setHoveredBuildingName(locObj.name);
            container.style.cursor = 'pointer';
            return;
          }
        }
      }
      setHoveredBuildingName(null);
      container.style.cursor = t.isDragging ? 'grabbing' : 'grab';
    };

    const handleCanvasClick = (e) => {
      // Don't trigger click if user was dragging camera
      if (t.hasMovedSignificantly) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects, true);

      if (intersects.length > 0) {
        const locId = findParentLocation(intersects[0].object);
        if (locId) {
          const locObj = CAMPUS_LOCATIONS.find(l => l.id === locId);
          if (locObj) {
            flyToLocation(locObj);
          }
        }
      }
    };

    // 7. Mouse Orbit & Pan Listeners
    const handleMouseDown = (e) => {
      t.isDragging = true;
      t.hasMovedSignificantly = false;
      t.dragStart = { x: e.clientX, y: e.clientY };
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
      handlePointerMove(e);

      if (!t.isDragging) return;

      const deltaX = e.clientX - t.dragStart.x;
      const deltaY = e.clientY - t.dragStart.y;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        t.hasMovedSignificantly = true;
      }

      // Right mouse button (button 2) or Shift + Left click -> Pan
      if (e.buttons === 2 || e.shiftKey) {
        const panSpeed = 0.15;
        const forward = new THREE.Vector3().subVectors(t.targetLookAt, camera.position).setY(0).normalize();
        const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

        const panVec = new THREE.Vector3()
          .addScaledVector(right, -deltaX * panSpeed)
          .addScaledVector(forward, deltaY * panSpeed);

        t.targetCamPos.add(panVec);
        t.targetLookAt.add(panVec);
      } else {
        // Left mouse button -> Orbit around current target
        const rotSpeed = 0.005;
        const offset = new THREE.Vector3().subVectors(t.targetCamPos, t.targetLookAt);

        // Calculate current spherical coordinates
        const radius = offset.length();
        let theta = Math.atan2(offset.x, offset.z);
        let phi = Math.acos(Math.max(-1, Math.min(1, offset.y / radius)));

        theta -= deltaX * rotSpeed;
        phi = Math.max(0.1, Math.min(Math.PI / 2.1, phi - deltaY * rotSpeed));

        offset.x = radius * Math.sin(phi) * Math.sin(theta);
        offset.y = radius * Math.cos(phi);
        offset.z = radius * Math.sin(phi) * Math.cos(theta);

        t.targetCamPos.copy(t.targetLookAt).add(offset);
      }

      t.dragStart = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      t.isDragging = false;
      container.style.cursor = 'grab';
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1 : -1;
      handleZoom(zoomFactor * 0.7);
    };

    // Prevent context menu on right click for smooth pan
    const handleContextMenu = (e) => e.preventDefault();

    // 8. Keyboard Listeners
    const handleKeyDown = (e) => {
      t.keysPressed[e.key.toLowerCase()] = true;

      if (e.key === 'r' || e.key === 'R') {
        resetView();
      }
      if (e.key === 'Escape') {
        setSelectedLocation(null);
      }
    };

    const handleKeyUp = (e) => {
      t.keysPressed[e.key.toLowerCase()] = false;
    };

    // 9. Window Resize
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    // Attach event listeners
    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domEl.addEventListener('click', handleCanvasClick);
    domEl.addEventListener('wheel', handleWheel, { passive: false });
    domEl.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', handleResize);

    // 10. Animation & Render Loop
    let lastTime = 0;
    const animate = (time) => {
      t.animFrameId = requestAnimationFrame(animate);

      const delta = t.clock.getDelta();
      const elapsed = t.clock.getElapsedTime();

      // Continuous keyboard movement check
      const moveSpeed = delta * 45;
      if (t.keysPressed['w'] || t.keysPressed['arrowup']) handleKeyMovement('forward', moveSpeed);
      if (t.keysPressed['s'] || t.keysPressed['arrowdown']) handleKeyMovement('backward', moveSpeed);
      if (t.keysPressed['a'] || t.keysPressed['arrowleft']) handleKeyMovement('left', moveSpeed);
      if (t.keysPressed['d'] || t.keysPressed['arrowright']) handleKeyMovement('right', moveSpeed);

      // Smooth camera position interpolation (lerp)
      camera.position.lerp(t.targetCamPos, 0.08);
      t.currentLookAt.lerp(t.targetLookAt, 0.08);
      camera.lookAt(t.currentLookAt);

      // Animate floating pin markers (bobbing & rotating)
      t.pinMarkers.forEach((pin, idx) => {
        const baseY = pin.userData.baseY || 18;
        pin.position.y = baseY + Math.sin(elapsed * 2.5 + idx) * 0.8;
        pin.rotation.y = elapsed * 1.2;
      });

      // Update camera coordinate state for MiniMap radar every 150ms
      if (time - lastTime > 150) {
        setCameraCoords({ x: Math.round(camera.position.x), z: Math.round(camera.position.z) });
        lastTime = time;
      }

      renderer.render(scene, camera);
    };

    animate(0);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(t.animFrameId);
      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domEl.removeEventListener('click', handleCanvasClick);
      domEl.removeEventListener('wheel', handleWheel);
      domEl.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);

      if (renderer) {
        renderer.dispose();
      }
    };
  }, [flyToLocation, handleKeyMovement, handleZoom, initialFocusLocationId, resetView]);

  // Guided Tour Step Management
  useEffect(() => {
    let tourTimer;
    if (isTourRunning) {
      const currentLoc = CAMPUS_LOCATIONS[tourStep];
      flyToLocation(currentLoc);

      // Stay at location for 8 seconds, then advance to next
      tourTimer = setTimeout(() => {
        setTourStep((prev) => {
          const next = prev + 1;
          if (next >= CAMPUS_LOCATIONS.length) {
            setIsTourRunning(false);
            resetView();
            return 0;
          }
          return next;
        });
      }, 8000);
    }

    return () => clearTimeout(tourTimer);
  }, [isTourRunning, tourStep, flyToLocation, resetView]);

  const toggleTour = () => {
    if (!isTourRunning) {
      setIsTourRunning(true);
      setTourStep(0);
    } else {
      setIsTourRunning(false);
    }
  };

  const toggleVR = () => {
    setIsVRMode(!isVRMode);
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="campus-scene-wrapper">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="webgl-container" />

      {/* Loading Screen */}
      {loading && (
        <div className="scene-loader-overlay">
          <div className="loader-box">
            <Loader2 className="loader-spinner" size={42} />
            <h3>Generating 3D Virtual Campus</h3>
            <p>Constructing buildings, pathways, and lush grounds...</p>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${loadProgress}%` }} />
            </div>
            <span className="progress-text">{loadProgress}% Loaded</span>
          </div>
        </div>
      )}

      {/* Hovered Building Floating Tooltip */}
      {hoveredBuildingName && !selectedLocation && (
        <div className="hovered-building-tooltip">
          <Layers size={14} />
          <span>{hoveredBuildingName}</span>
          <small>Click to visit</small>
        </div>
      )}

      {/* 2D Mini-Map Radar */}
      <MiniMap
        activeLocationId={selectedLocation ? selectedLocation.id : null}
        onSelectLocation={flyToLocation}
        cameraPos={cameraCoords}
      />

      {/* On-Screen Navigation Controls & D-Pad */}
      <NavigationControls
        onMove={handleKeyMovement}
        onZoom={handleZoom}
        onResetView={resetView}
        isTourRunning={isTourRunning}
        onToggleTour={toggleTour}
        tourCurrentStep={tourStep}
        tourTotalSteps={CAMPUS_LOCATIONS.length}
        onToggleVR={toggleVR}
        isVRSupported={true}
        showHelp={showHelpPanel}
        onToggleHelp={() => setShowHelpPanel(!showHelpPanel)}
      />

      {/* Detailed Location Modal when a building is active */}
      {selectedLocation && (
        <LocationModal
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
          onEnterDetail={(loc) => {
            // Optional close-up or inspect mode
            flyToLocation(loc);
          }}
        />
      )}
    </div>
  );
}

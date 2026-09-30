import * as THREE from 'three';

/**
 * Creates the entire 3D virtual campus environment:
 * - Ground terrain, perimeter roads, pathways
 * - All 11 distinct architectural buildings
 * - Trees, streetlamps, cars, sports track, fountains
 * - Interactive floating markers for raycasting
 */

// Shared Materials & Color Palette for high performance and visual cohesion
const MATERIALS = {
  ground: new THREE.MeshLambertMaterial({ color: 0x4a7c59 }), // lush campus grass
  groundDark: new THREE.MeshLambertMaterial({ color: 0x3d6b4a }),
  road: new THREE.MeshLambertMaterial({ color: 0x2b2e3b }),   // dark asphalt
  roadMarking: new THREE.MeshBasicMaterial({ color: 0xffffff }),
  pathway: new THREE.MeshLambertMaterial({ color: 0xd6d3cb }),// sandstone/concrete pavers
  plaza: new THREE.MeshLambertMaterial({ color: 0xc8c3b9 }),
  water: new THREE.MeshLambertMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 }),
  curb: new THREE.MeshLambertMaterial({ color: 0x9ca3af }),

  // Building Materials
  concrete: new THREE.MeshLambertMaterial({ color: 0xe2e8f0 }),
  concreteDark: new THREE.MeshLambertMaterial({ color: 0x94a3b8 }),
  brick: new THREE.MeshLambertMaterial({ color: 0xb45309 }),
  stoneSand: new THREE.MeshLambertMaterial({ color: 0xfde047 }),
  glassBlue: new THREE.MeshLambertMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 }),
  glassCyan: new THREE.MeshLambertMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.7 }),
  glassDark: new THREE.MeshLambertMaterial({ color: 0x0f172a, transparent: true, opacity: 0.8 }),
  roofDark: new THREE.MeshLambertMaterial({ color: 0x334155 }),
  roofRed: new THREE.MeshLambertMaterial({ color: 0x991b1b }),
  wood: new THREE.MeshLambertMaterial({ color: 0x854d0e }),
  metal: new THREE.MeshLambertMaterial({ color: 0x64748b }),
  gold: new THREE.MeshLambertMaterial({ color: 0xf59e0b }),

  // Department Accents
  csGlow: new THREE.MeshBasicMaterial({ color: 0x22d3ee }),
  adminAccent: new THREE.MeshLambertMaterial({ color: 0x7c3aed }),
  libraryAccent: new THREE.MeshLambertMaterial({ color: 0x059669 }),
  audiAccent: new THREE.MeshLambertMaterial({ color: 0xd97706 }),

  // Foliage
  trunk: new THREE.MeshLambertMaterial({ color: 0x5c4033 }),
  leafDark: new THREE.MeshLambertMaterial({ color: 0x2e7d32 }),
  leafLight: new THREE.MeshLambertMaterial({ color: 0x4caf50 }),
  leafPine: new THREE.MeshLambertMaterial({ color: 0x1b5e20 }),
  hedge: new THREE.MeshLambertMaterial({ color: 0x388e3c }),

  // Sports Field
  turf: new THREE.MeshLambertMaterial({ color: 0x2e7d32 }),
  track: new THREE.MeshLambertMaterial({ color: 0xc2410c }), // terracotta running track
  courtBlue: new THREE.MeshLambertMaterial({ color: 0x2563eb }),

  // Vehicles
  carRed: new THREE.MeshLambertMaterial({ color: 0xdc2626 }),
  carBlue: new THREE.MeshLambertMaterial({ color: 0x2563eb }),
  carSilver: new THREE.MeshLambertMaterial({ color: 0x94a3b8 }),
  carWhite: new THREE.MeshLambertMaterial({ color: 0xf8fafc }),
  carBlack: new THREE.MeshLambertMaterial({ color: 0x1e293b }),
  carYellow: new THREE.MeshLambertMaterial({ color: 0xeab308 }),
  carTire: new THREE.MeshLambertMaterial({ color: 0x111827 })
};

export function createCampusEnvironment(scene) {
  const interactiveObjects = []; // Meshes to be raycasted
  const pinMarkers = [];         // Floating 3D UI indicators

  // 1. Terrain Base
  const terrainGroup = new THREE.Group();

  // Main grass lawn (360x360)
  const groundGeo = new THREE.PlaneGeometry(380, 380, 1, 1);
  const ground = new THREE.Mesh(groundGeo, MATERIALS.ground);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  terrainGroup.add(ground);

  // Outer boundary subtle elevation / hills
  const boundaryGeo = new THREE.RingGeometry(180, 240, 32);
  const boundary = new THREE.Mesh(boundaryGeo, MATERIALS.groundDark);
  boundary.rotation.x = -Math.PI / 2;
  boundary.position.y = -0.05;
  terrainGroup.add(boundary);

  // 2. Roads and Pathways
  createRoadsAndWalkways(terrainGroup);

  scene.add(terrainGroup);

  // 3. Create all 11 Buildings
  const buildingsGroup = new THREE.Group();

  // 1) Main Entrance
  const entrance = createMainEntrance();
  entrance.position.set(0, 0, 110);
  entrance.userData = { locationId: "main-entrance", name: "Main Entrance" };
  buildingsGroup.add(entrance);
  interactiveObjects.push(entrance);

  // 2) Administration Block
  const admin = createAdminBlock();
  admin.position.set(0, 0, 45);
  admin.userData = { locationId: "admin-block", name: "Administration Block" };
  buildingsGroup.add(admin);
  interactiveObjects.push(admin);

  // 3) Academic Block
  const academic = createAcademicBlock();
  academic.position.set(-58, 0, 20);
  academic.userData = { locationId: "academic-block", name: "Academic Block" };
  buildingsGroup.add(academic);
  interactiveObjects.push(academic);

  // 4) CS & AI Dept
  const csDept = createCSDepartment();
  csDept.position.set(-65, 0, -50);
  csDept.userData = { locationId: "cs-ai-dept", name: "Computer Science / AI & DS Department" };
  buildingsGroup.add(csDept);
  interactiveObjects.push(csDept);

  // 5) Central Library
  const library = createLibrary();
  library.position.set(58, 0, 25);
  library.userData = { locationId: "library", name: "Central Library" };
  buildingsGroup.add(library);
  interactiveObjects.push(library);

  // 6) Auditorium
  const auditorium = createAuditorium();
  auditorium.position.set(68, 0, -45);
  auditorium.userData = { locationId: "auditorium", name: "Grand Auditorium" };
  buildingsGroup.add(auditorium);
  interactiveObjects.push(auditorium);

  // 7) Laboratory
  const lab = createLaboratory();
  lab.position.set(-15, 0, -60);
  lab.userData = { locationId: "laboratory", name: "Advanced Laboratory Complex" };
  buildingsGroup.add(lab);
  interactiveObjects.push(lab);

  // 8) Cafeteria
  const cafeteria = createCafeteria();
  cafeteria.position.set(25, 0, -55);
  cafeteria.userData = { locationId: "cafeteria", name: "Campus Cafeteria" };
  buildingsGroup.add(cafeteria);
  interactiveObjects.push(cafeteria);

  // 9) Sports Ground
  const sports = createSportsGround();
  sports.position.set(110, 0, 10);
  sports.userData = { locationId: "sports-ground", name: "Sports Complex & Athletic Ground" };
  buildingsGroup.add(sports);
  interactiveObjects.push(sports);

  // 10) Hostel
  const hostel = createHostel();
  hostel.position.set(-110, 0, -20);
  hostel.userData = { locationId: "hostel", name: "Student Residential Hostel" };
  buildingsGroup.add(hostel);
  interactiveObjects.push(hostel);

  // 11) Parking Area
  const parking = createParkingArea();
  parking.position.set(75, 0, 95);
  parking.userData = { locationId: "parking-area", name: "Campus Parking & Mobility Hub" };
  buildingsGroup.add(parking);
  interactiveObjects.push(parking);

  scene.add(buildingsGroup);

  // 4. Foliage & Landscaping (Trees, streetlamps, benches)
  const landscapingGroup = new THREE.Group();
  populateFoliage(landscapingGroup);
  scene.add(landscapingGroup);

  // 5. Floating Interactive Location Pins
  const markerPositions = [
    { id: "main-entrance", pos: [0, 14, 110], color: 0x3b82f6 },
    { id: "admin-block", pos: [0, 24, 45], color: 0x8b5cf6 },
    { id: "academic-block", pos: [-58, 20, 20], color: 0x0284c7 },
    { id: "cs-ai-dept", pos: [-65, 20, -50], color: 0x06b6d4 },
    { id: "library", pos: [58, 20, 25], color: 0x10b981 },
    { id: "auditorium", pos: [68, 22, -45], color: 0xf59e0b },
    { id: "laboratory", pos: [-15, 18, -60], color: 0x6366f1 },
    { id: "cafeteria", pos: [25, 15, -55], color: 0xec4899 },
    { id: "sports-ground", pos: [110, 16, 10], color: 0x16a34a },
    { id: "hostel", pos: [-110, 20, -20], color: 0xea580c },
    { id: "parking-area", pos: [75, 14, 95], color: 0x64748b }
  ];

  markerPositions.forEach(m => {
    const pin = createFloatingMarker(m.color, m.id);
    pin.position.set(m.pos[0], m.pos[1], m.pos[2]);
    pin.userData = { locationId: m.id, isPin: true, baseY: m.pos[1] };
    scene.add(pin);
    pinMarkers.push(pin);
    interactiveObjects.push(pin);
  });

  return { interactiveObjects, pinMarkers };
}

// -------------------------------------------------------------
// Roads, Walkways & Plazas
// -------------------------------------------------------------
function createRoadsAndWalkways(parent) {
  // Main Entrance boulevard road (Z: 140 to 0)
  const mainRoadGeo = new THREE.PlaneGeometry(16, 150);
  const mainRoad = new THREE.Mesh(mainRoadGeo, MATERIALS.road);
  mainRoad.rotation.x = -Math.PI / 2;
  mainRoad.position.set(0, 0.02, 60);
  parent.add(mainRoad);

  // Main road center stripes
  for (let z = 130; z >= -10; z -= 8) {
    const stripeGeo = new THREE.PlaneGeometry(0.5, 4);
    const stripe = new THREE.Mesh(stripeGeo, MATERIALS.roadMarking);
    stripe.rotation.x = -Math.PI / 2;
    stripe.position.set(0, 0.03, z);
    parent.add(stripe);
  }

  // Cross campus boulevard (X: -140 to 140, Z: 0)
  const crossRoadGeo = new THREE.PlaneGeometry(270, 14);
  const crossRoad = new THREE.Mesh(crossRoadGeo, MATERIALS.road);
  crossRoad.rotation.x = -Math.PI / 2;
  crossRoad.position.set(0, 0.02, 0);
  parent.add(crossRoad);

  // Rear loop road (Z: -80)
  const rearRoadGeo = new THREE.PlaneGeometry(240, 12);
  const rearRoad = new THREE.Mesh(rearRoadGeo, MATERIALS.road);
  rearRoad.rotation.x = -Math.PI / 2;
  rearRoad.position.set(0, 0.02, -80);
  parent.add(rearRoad);

  // Left road connecting cross to rear (X: -130)
  const leftRoadGeo = new THREE.PlaneGeometry(12, 90);
  const leftRoad = new THREE.Mesh(leftRoadGeo, MATERIALS.road);
  leftRoad.rotation.x = -Math.PI / 2;
  leftRoad.position.set(-130, 0.02, -40);
  parent.add(leftRoad);

  // Right road connecting to sports & parking (X: 135)
  const rightRoadGeo = new THREE.PlaneGeometry(12, 90);
  const rightRoad = new THREE.Mesh(rightRoadGeo, MATERIALS.road);
  rightRoad.rotation.x = -Math.PI / 2;
  rightRoad.position.set(135, 0.02, -40);
  parent.add(rightRoad);

  // Central Plaza around Admin (stone pavers)
  const plazaGeo = new THREE.CylinderGeometry(28, 28, 0.1, 32);
  const plaza = new THREE.Mesh(plazaGeo, MATERIALS.plaza);
  plaza.position.set(0, 0.05, 45);
  parent.add(plaza);

  // Pedestrian walkways connecting buildings
  createWalkway(parent, [0, 45], [-58, 20]);  // Admin to Academic
  createWalkway(parent, [0, 45], [58, 25]);   // Admin to Library
  createWalkway(parent, [0, 45], [-15, -60]); // Admin to Labs
  createWalkway(parent, [0, 45], [25, -55]);  // Admin to Cafeteria
  createWalkway(parent, [-58, 20], [-65, -50]); // Academic to CS
  createWalkway(parent, [58, 25], [68, -45]);   // Library to Auditorium
}

function createWalkway(parent, [x1, z1], [x2, z2]) {
  const dx = x2 - x1;
  const dz = z2 - z1;
  const length = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dx, dz);

  const walkGeo = new THREE.PlaneGeometry(4, length);
  const walkway = new THREE.Mesh(walkGeo, MATERIALS.pathway);
  walkway.rotation.x = -Math.PI / 2;
  walkway.rotation.z = -angle;
  walkway.position.set((x1 + x2) / 2, 0.03, (z1 + z2) / 2);
  parent.add(walkway);
}

// -------------------------------------------------------------
// 1. MAIN ENTRANCE
// -------------------------------------------------------------
function createMainEntrance() {
  const group = new THREE.Group();

  // Grand Entrance Gateway Arch
  const pillarGeo = new THREE.BoxGeometry(3, 10, 3);
  const p1 = new THREE.Mesh(pillarGeo, MATERIALS.concrete);
  p1.position.set(-10, 5, 0);
  p1.castShadow = true;
  group.add(p1);

  const p2 = new THREE.Mesh(pillarGeo, MATERIALS.concrete);
  p2.position.set(10, 5, 0);
  p2.castShadow = true;
  group.add(p2);

  // Top arch beam
  const archGeo = new THREE.BoxGeometry(26, 3, 4);
  const arch = new THREE.Mesh(archGeo, MATERIALS.concrete);
  arch.position.set(0, 11, 0);
  arch.castShadow = true;
  group.add(arch);

  // University Sign Plaque
  const signGeo = new THREE.BoxGeometry(18, 1.4, 0.5);
  const sign = new THREE.Mesh(signGeo, MATERIALS.gold);
  sign.position.set(0, 11, 2.2);
  group.add(sign);

  // Security Guardposts
  const boothGeo = new THREE.BoxGeometry(4, 3.5, 4);
  const booth = new THREE.Mesh(boothGeo, MATERIALS.concrete);
  booth.position.set(-14, 1.75, 0);
  group.add(booth);

  const boothRoof = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.5, 4.8), MATERIALS.roofDark);
  boothRoof.position.set(-14, 3.75, 0);
  group.add(boothRoof);

  // Central Welcome Roundabout with 3-tier fountain
  const roundaboutGeo = new THREE.CylinderGeometry(8, 8, 0.6, 24);
  const roundabout = new THREE.Mesh(roundaboutGeo, MATERIALS.curb);
  roundabout.position.set(0, 0.3, 20);
  group.add(roundabout);

  const lawnGeo = new THREE.CylinderGeometry(7.5, 7.5, 0.7, 24);
  const lawn = new THREE.Mesh(lawnGeo, MATERIALS.leafLight);
  lawn.position.set(0, 0.35, 20);
  group.add(lawn);

  // Fountain pool
  const poolGeo = new THREE.CylinderGeometry(4.5, 4.5, 0.5, 24);
  const pool = new THREE.Mesh(poolGeo, MATERIALS.curb);
  pool.position.set(0, 0.6, 20);
  group.add(pool);

  const waterGeo = new THREE.CylinderGeometry(4.2, 4.2, 0.52, 24);
  const water = new THREE.Mesh(waterGeo, MATERIALS.water);
  water.position.set(0, 0.65, 20);
  group.add(water);

  // Fountain Spire
  const spireGeo = new THREE.CylinderGeometry(0.8, 1.4, 3, 16);
  const spire = new THREE.Mesh(spireGeo, MATERIALS.concrete);
  spire.position.set(0, 2.1, 20);
  group.add(spire);

  return group;
}

// -------------------------------------------------------------
// 2. ADMINISTRATION BLOCK
// -------------------------------------------------------------
function createAdminBlock() {
  const group = new THREE.Group();

  // Grand podium base steps
  const baseGeo = new THREE.BoxGeometry(42, 1.2, 28);
  const base = new THREE.Mesh(baseGeo, MATERIALS.concrete);
  base.position.set(0, 0.6, 0);
  base.receiveShadow = true;
  group.add(base);

  // Central Main Building Block (4 stories)
  const mainGeo = new THREE.BoxGeometry(36, 14, 22);
  const main = new THREE.Mesh(mainGeo, MATERIALS.stoneSand);
  main.position.set(0, 8, 0);
  main.castShadow = true;
  group.add(main);

  // Neoclassical front portico with columns
  const porticoRoof = new THREE.Mesh(new THREE.BoxGeometry(16, 1.5, 6), MATERIALS.concrete);
  porticoRoof.position.set(0, 14.5, 12);
  group.add(porticoRoof);

  // 6 Ionic pillars
  for (let i = -6; i <= 6; i += 2.4) {
    const colGeo = new THREE.CylinderGeometry(0.5, 0.5, 13, 16);
    const col = new THREE.Mesh(colGeo, MATERIALS.concrete);
    col.position.set(i, 7.5, 12);
    col.castShadow = true;
    group.add(col);
  }

  // Grand Entrance Pediment (triangle)
  const pedimentShape = new THREE.Shape();
  pedimentShape.moveTo(-8, 0);
  pedimentShape.lineTo(8, 0);
  pedimentShape.lineTo(0, 4);
  pedimentShape.closePath();
  const pedimentGeo = new THREE.ExtrudeGeometry(pedimentShape, { depth: 1, bevelEnabled: false });
  const pediment = new THREE.Mesh(pedimentGeo, MATERIALS.concrete);
  pediment.position.set(0, 15.2, 12.5);
  group.add(pediment);

  // Clock Tower Spire
  const towerGeo = new THREE.BoxGeometry(8, 12, 8);
  const tower = new THREE.Mesh(towerGeo, MATERIALS.concrete);
  tower.position.set(0, 20, 0);
  tower.castShadow = true;
  group.add(tower);

  // Clock face
  const clockGeo = new THREE.CylinderGeometry(2, 2, 0.3, 24);
  const clock = new THREE.Mesh(clockGeo, MATERIALS.gold);
  clock.rotation.x = Math.PI / 2;
  clock.position.set(0, 21, 4.1);
  group.add(clock);

  // Tower Pyramid Roof
  const pyramidGeo = new THREE.ConeGeometry(5.8, 6, 4);
  const pyramid = new THREE.Mesh(pyramidGeo, MATERIALS.roofRed);
  pyramid.rotation.y = Math.PI / 4;
  pyramid.position.set(0, 29, 0);
  group.add(pyramid);

  // Window ribbons
  addWindowBands(group, 36, 14, 22, 0, 8, 0);

  return group;
}

// -------------------------------------------------------------
// 3. ACADEMIC BLOCK
// -------------------------------------------------------------
function createAcademicBlock() {
  const group = new THREE.Group();

  // East Wing
  const wing1Geo = new THREE.BoxGeometry(16, 16, 32);
  const wing1 = new THREE.Mesh(wing1Geo, MATERIALS.concrete);
  wing1.position.set(-12, 8, 0);
  wing1.castShadow = true;
  group.add(wing1);
  addWindowBands(group, 16, 16, 32, -12, 8, 0);

  // West Wing
  const wing2Geo = new THREE.BoxGeometry(16, 16, 32);
  const wing2 = new THREE.Mesh(wing2Geo, MATERIALS.concrete);
  wing2.position.set(12, 8, 0);
  wing2.castShadow = true;
  group.add(wing2);
  addWindowBands(group, 16, 16, 32, 12, 8, 0);

  // Central Glass Atrium Bridge
  const atriumGeo = new THREE.BoxGeometry(12, 12, 20);
  const atrium = new THREE.Mesh(atriumGeo, MATERIALS.glassBlue);
  atrium.position.set(0, 8, 0);
  group.add(atrium);

  // Connecting arch structure
  const bridgeRoof = new THREE.Mesh(new THREE.BoxGeometry(14, 1.2, 22), MATERIALS.roofDark);
  bridgeRoof.position.set(0, 14.5, 0);
  group.add(bridgeRoof);

  // Rooftop astronomical observatory dome
  const domeGeo = new THREE.SphereGeometry(4, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const dome = new THREE.Mesh(domeGeo, MATERIALS.concrete);
  dome.position.set(12, 16, -6);
  group.add(dome);

  return group;
}

// -------------------------------------------------------------
// 4. COMPUTER SCIENCE / AI & DS DEPARTMENT
// -------------------------------------------------------------
function createCSDepartment() {
  const group = new THREE.Group();

  // Futuristic tech block with stepped geometric volumes
  const baseGeo = new THREE.BoxGeometry(32, 18, 26);
  const base = new THREE.Mesh(baseGeo, MATERIALS.roofDark);
  base.position.set(0, 9, 0);
  base.castShadow = true;
  group.add(base);

  // Full cyan glass curtain wall on front facade
  const glassFrontGeo = new THREE.BoxGeometry(30, 15, 1);
  const glassFront = new THREE.Mesh(glassFrontGeo, MATERIALS.glassCyan);
  glassFront.position.set(0, 9, 13.2);
  group.add(glassFront);

  // High-tech Neon Blue light accent stripes
  for (let y = 3; y <= 16; y += 3) {
    const neonGeo = new THREE.BoxGeometry(30.4, 0.3, 0.4);
    const neon = new THREE.Mesh(neonGeo, MATERIALS.csGlow);
    neon.position.set(0, y, 13.5);
    group.add(neon);
  }

  // CS • AI & DS Dept Header Sign
  const bannerGeo = new THREE.BoxGeometry(20, 2.2, 0.6);
  const banner = new THREE.Mesh(bannerGeo, MATERIALS.csGlow);
  banner.position.set(0, 18.5, 12);
  group.add(banner);

  // Satellite dish & tech antennas on roof
  const dishPole = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 4), MATERIALS.metal);
  dishPole.position.set(-8, 20, -5);
  group.add(dishPole);

  const dishGeo = new THREE.SphereGeometry(2.5, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2.5);
  const dish = new THREE.Mesh(dishGeo, MATERIALS.concrete);
  dish.rotation.x = -Math.PI / 3;
  dish.position.set(-8, 22, -5);
  group.add(dish);

  // AI Server cooling towers
  for (let x = 4; x <= 10; x += 3) {
    const vent = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 3, 12), MATERIALS.metal);
    vent.position.set(x, 19.5, -4);
    group.add(vent);
  }

  return group;
}

// -------------------------------------------------------------
// 5. CENTRAL LIBRARY
// -------------------------------------------------------------
function createLibrary() {
  const group = new THREE.Group();

  // Cylindrical 3-tier building
  const tier1Geo = new THREE.CylinderGeometry(18, 19, 6, 32);
  const tier1 = new THREE.Mesh(tier1Geo, MATERIALS.stoneSand);
  tier1.position.set(0, 3, 0);
  tier1.castShadow = true;
  group.add(tier1);

  const tier2Geo = new THREE.CylinderGeometry(15, 16, 6, 32);
  const tier2 = new THREE.Mesh(tier2Geo, MATERIALS.concrete);
  tier2.position.set(0, 9, 0);
  tier2.castShadow = true;
  group.add(tier2);

  // Perimeter reading pillars
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const px = Math.cos(angle) * 16.5;
    const pz = Math.sin(angle) * 16.5;
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 6), MATERIALS.concrete);
    pillar.position.set(px, 9, pz);
    group.add(pillar);
  }

  // Spectacular glass reading dome
  const domeGeo = new THREE.SphereGeometry(11, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const dome = new THREE.Mesh(domeGeo, MATERIALS.glassBlue);
  dome.position.set(0, 12, 0);
  group.add(dome);

  // Library Grand Entrance Canopy
  const porchGeo = new THREE.BoxGeometry(10, 1, 6);
  const porch = new THREE.Mesh(porchGeo, MATERIALS.concrete);
  porch.position.set(0, 5, 19);
  group.add(porch);

  return group;
}

// -------------------------------------------------------------
// 6. GRAND AUDITORIUM
// -------------------------------------------------------------
function createAuditorium() {
  const group = new THREE.Group();

  // Sculptural trapezoidal amphitheater
  const audiGeo = new THREE.CylinderGeometry(18, 22, 14, 8); // 8-sided faceted shell
  const audi = new THREE.Mesh(audiGeo, MATERIALS.concrete);
  audi.position.set(0, 7, 0);
  audi.castShadow = true;
  group.add(audi);

  // Sloped acoustic cantilevered roof
  const roofGeo = new THREE.ConeGeometry(24, 6, 8);
  const roof = new THREE.Mesh(roofGeo, MATERIALS.audiAccent);
  roof.position.set(0, 16, 0);
  group.add(roof);

  // Grand Marquee entrance canopy
  const marquee = new THREE.Mesh(new THREE.BoxGeometry(16, 1.2, 8), MATERIALS.roofDark);
  marquee.position.set(0, 4.5, 18);
  marquee.castShadow = true;
  group.add(marquee);

  // Columns supporting marquee
  const c1 = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 4.5), MATERIALS.metal);
  c1.position.set(-6, 2.25, 20);
  group.add(c1);

  const c2 = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 4.5), MATERIALS.metal);
  c2.position.set(6, 2.25, 20);
  group.add(c2);

  // Warm amber glass entrance foyer
  const foyerGeo = new THREE.BoxGeometry(14, 4, 2);
  const foyer = new THREE.Mesh(foyerGeo, MATERIALS.gold);
  foyer.position.set(0, 2, 16.5);
  group.add(foyer);

  return group;
}

// -------------------------------------------------------------
// 7. ADVANCED LABORATORY COMPLEX
// -------------------------------------------------------------
function createLaboratory() {
  const group = new THREE.Group();

  // Industrial Modular Research Wings (L-shape)
  const wing1Geo = new THREE.BoxGeometry(32, 14, 18);
  const wing1 = new THREE.Mesh(wing1Geo, MATERIALS.concrete);
  wing1.position.set(0, 7, 0);
  wing1.castShadow = true;
  group.add(wing1);

  const wing2Geo = new THREE.BoxGeometry(16, 14, 18);
  const wing2 = new THREE.Mesh(wing2Geo, MATERIALS.concreteDark);
  wing2.position.set(-16, 7, -10);
  wing2.castShadow = true;
  group.add(wing2);

  // Rooftop Exhaust Chimneys & Cleanroom air vents
  for (let x = -8; x <= 8; x += 4) {
    const vent = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 4), MATERIALS.metal);
    vent.position.set(x, 16, 0);
    group.add(vent);
  }

  // Rooftop Solar Panel Arrays
  for (let z = -5; z <= 5; z += 3) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(8, 0.2, 2.2), MATERIALS.glassDark);
    panel.rotation.x = Math.PI / 8;
    panel.position.set(8, 14.5, z);
    group.add(panel);
  }

  addWindowBands(group, 32, 14, 18, 0, 7, 0);

  return group;
}

// -------------------------------------------------------------
// 8. CAFETERIA & FOOD COURT
// -------------------------------------------------------------
function createCafeteria() {
  const group = new THREE.Group();

  // Open-plan contemporary dining pavilion
  const bodyGeo = new THREE.BoxGeometry(26, 8, 20);
  const body = new THREE.Mesh(bodyGeo, MATERIALS.concrete);
  body.position.set(0, 4, 0);
  body.castShadow = true;
  group.add(body);

  // Wide panoramic dining windows
  const winGeo = new THREE.BoxGeometry(24, 5, 20.4);
  const win = new THREE.Mesh(winGeo, MATERIALS.glassCyan);
  win.position.set(0, 4.5, 0);
  group.add(win);

  // Flat floating roof with overhang
  const roofGeo = new THREE.BoxGeometry(30, 1, 24);
  const roof = new THREE.Mesh(roofGeo, MATERIALS.wood);
  roof.position.set(0, 8.5, 0);
  group.add(roof);

  // Outdoor dining patio terrace
  const patioGeo = new THREE.BoxGeometry(28, 0.2, 14);
  const patio = new THREE.Mesh(patioGeo, MATERIALS.wood);
  patio.position.set(0, 0.1, 16);
  group.add(patio);

  // Outdoor Dining Parasols / Umbrellas
  const umbrellaColors = [0xec4899, 0xf59e0b, 0x10b981, 0x3b82f6];
  [-8, 0, 8].forEach((x, idx) => {
    // Pole
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 4), MATERIALS.metal);
    pole.position.set(x, 2, 16);
    group.add(pole);

    // Canopy cone
    const mat = new THREE.MeshLambertMaterial({ color: umbrellaColors[idx % umbrellaColors.length] });
    const canopy = new THREE.Mesh(new THREE.ConeGeometry(3, 1.2, 12), mat);
    canopy.position.set(x, 4, 16);
    group.add(canopy);

    // Picnic Table
    const table = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 1.2, 12), MATERIALS.wood);
    table.position.set(x, 0.7, 16);
    group.add(table);
  });

  return group;
}

// -------------------------------------------------------------
// 9. SPORTS GROUND & STADIUM
// -------------------------------------------------------------
function createSportsGround() {
  const group = new THREE.Group();

  // Synthetic 400m Running Track Oval (terracotta base)
  const trackGeo = new THREE.CylinderGeometry(28, 28, 0.2, 32);
  const track = new THREE.Mesh(trackGeo, MATERIALS.track);
  track.scale.set(1.4, 1, 1); // oval
  track.position.set(0, 0.1, 0);
  group.add(track);

  // Inner Green Soccer / Athletic Turf
  const fieldGeo = new THREE.BoxGeometry(32, 0.25, 20);
  const field = new THREE.Mesh(fieldGeo, MATERIALS.turf);
  field.position.set(0, 0.15, 0);
  group.add(field);

  // Field goal posts
  const post1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3, 4), MATERIALS.concrete);
  post1.position.set(-15, 1.5, 0);
  group.add(post1);

  const post2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3, 4), MATERIALS.concrete);
  post2.position.set(15, 1.5, 0);
  group.add(post2);

  // Spectator Bleachers / Grandstand
  for (let step = 0; step < 4; step++) {
    const bleacherGeo = new THREE.BoxGeometry(26, 1, 2);
    const bleacher = new THREE.Mesh(bleacherGeo, MATERIALS.concrete);
    bleacher.position.set(0, 0.5 + step * 1, -22 - step * 1.8);
    group.add(bleacher);
  }

  // Bleacher Canopy
  const grandstandRoof = new THREE.Mesh(new THREE.BoxGeometry(28, 0.5, 10), MATERIALS.roofDark);
  grandstandRoof.position.set(0, 7.5, -24);
  grandstandRoof.rotation.x = Math.PI / 18;
  group.add(grandstandRoof);

  // Adjacent Basketball Court (Blue acrylic)
  const courtGeo = new THREE.BoxGeometry(16, 0.22, 10);
  const court = new THREE.Mesh(courtGeo, MATERIALS.courtBlue);
  court.position.set(0, 0.12, 26);
  group.add(court);

  // 4 Stadium Floodlight Towers
  const lightTowerPositions = [
    [-24, -18], [24, -18], [-24, 18], [24, 18]
  ];
  lightTowerPositions.forEach(([lx, lz]) => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 16), MATERIALS.metal);
    pole.position.set(lx, 8, lz);
    group.add(pole);

    const lightBox = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.5, 1), MATERIALS.gold);
    lightBox.position.set(lx, 16, lz);
    group.add(lightBox);
  });

  return group;
}

// -------------------------------------------------------------
// 10. STUDENT RESIDENTIAL HOSTEL
// -------------------------------------------------------------
function createHostel() {
  const group = new THREE.Group();

  // 3 Terraced Residential Dormitory Wings around a central courtyard
  // North Block
  const nBlock = new THREE.Mesh(new THREE.BoxGeometry(28, 16, 12), MATERIALS.brick);
  nBlock.position.set(0, 8, -14);
  nBlock.castShadow = true;
  group.add(nBlock);
  addWindowBands(group, 28, 16, 12, 0, 8, -14);

  // West Block
  const wBlock = new THREE.Mesh(new THREE.BoxGeometry(12, 16, 26), MATERIALS.brick);
  wBlock.position.set(-16, 8, 4);
  wBlock.castShadow = true;
  group.add(wBlock);
  addWindowBands(group, 12, 16, 26, -16, 8, 4);

  // East Block
  const eBlock = new THREE.Mesh(new THREE.BoxGeometry(12, 16, 26), MATERIALS.brick);
  eBlock.position.set(16, 8, 4);
  eBlock.castShadow = true;
  group.add(eBlock);
  addWindowBands(group, 12, 16, 26, 16, 8, 4);

  // Central residential lawn
  const courtLawn = new THREE.Mesh(new THREE.BoxGeometry(18, 0.2, 20), MATERIALS.leafLight);
  courtLawn.position.set(0, 0.1, 4);
  group.add(courtLawn);

  // Hostel reception canopy
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(8, 0.6, 6), MATERIALS.concrete);
  canopy.position.set(0, 3.5, 16);
  group.add(canopy);

  return group;
}

// -------------------------------------------------------------
// 11. PARKING AREA & TRANSIT HUB
// -------------------------------------------------------------
function createParkingArea() {
  const group = new THREE.Group();

  // Asphalt lot surface
  const lotGeo = new THREE.BoxGeometry(36, 0.2, 32);
  const lot = new THREE.Mesh(lotGeo, MATERIALS.road);
  lot.position.set(0, 0.1, 0);
  lot.receiveShadow = true;
  group.add(lot);

  // White parking slot lines
  for (let z = -12; z <= 12; z += 6) {
    [-10, 10].forEach(x => {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(6, 0.3), MATERIALS.roadMarking);
      line.rotation.x = -Math.PI / 2;
      line.position.set(x, 0.22, z);
      group.add(line);
    });
  }

  // Solar Canopy over central parking rows
  const solarRoof = new THREE.Mesh(new THREE.BoxGeometry(14, 0.4, 28), MATERIALS.glassDark);
  solarRoof.position.set(0, 6, 0);
  group.add(solarRoof);

  // Canopy support columns
  [-6, 6].forEach(x => {
    [-10, 0, 10].forEach(z => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 6), MATERIALS.metal);
      col.position.set(x, 3, z);
      group.add(col);
    });
  });

  // Stylized Low-Poly Cars parked in stalls
  const carColors = [
    MATERIALS.carRed,
    MATERIALS.carBlue,
    MATERIALS.carSilver,
    MATERIALS.carWhite,
    MATERIALS.carYellow,
    MATERIALS.carBlack
  ];

  const carSlots = [
    { x: -10, z: -9, color: carColors[0] },
    { x: -10, z: -3, color: carColors[1] },
    { x: -10, z: 3,  color: carColors[2] },
    { x: -10, z: 9,  color: carColors[3] },
    { x: 10,  z: -9, color: carColors[4] },
    { x: 10,  z: 3,  color: carColors[5] }
  ];

  carSlots.forEach(slot => {
    const car = createCar(slot.color);
    car.position.set(slot.x, 0.2, slot.z);
    group.add(car);
  });

  // Green EV Charging Stations
  [-14, -14].forEach((x, idx) => {
    const evPole = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.5, 0.8), MATERIALS.leafLight);
    evPole.position.set(x, 1.25, idx === 0 ? -6 : 6);
    group.add(evPole);

    const evGlow = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.2), MATERIALS.csGlow);
    evGlow.position.set(x + 0.4, 1.8, idx === 0 ? -6 : 6);
    group.add(evGlow);
  });

  return group;
}

// -------------------------------------------------------------
// Helper: Stylized 3D Car
// -------------------------------------------------------------
function createCar(bodyMaterial) {
  const car = new THREE.Group();

  // Chassis
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1, 2.2), bodyMaterial);
  chassis.position.set(0, 0.7, 0);
  car.add(chassis);

  // Cabin
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 1.9), MATERIALS.glassDark);
  cabin.position.set(-0.3, 1.5, 0);
  car.add(cabin);

  // 4 Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.4, 12);
  const wheelPositions = [
    [-1.3, 0.4, 1.1],
    [1.3, 0.4, 1.1],
    [-1.3, 0.4, -1.1],
    [1.3, 0.4, -1.1]
  ];
  wheelPositions.forEach(([wx, wy, wz]) => {
    const wheel = new THREE.Mesh(wheelGeo, MATERIALS.carTire);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(wx, wy, wz);
    car.add(wheel);
  });

  return car;
}

// -------------------------------------------------------------
// Helper: Decorative Window Bands for Buildings
// -------------------------------------------------------------
function addWindowBands(parent, width, height, depth, cx, cy, cz) {
  const floors = Math.floor(height / 3.5);
  for (let f = 1; f < floors; f++) {
    const yPos = cy - height / 2 + f * 3.5;
    // Front ribbon
    const frontBand = new THREE.Mesh(new THREE.BoxGeometry(width * 0.85, 1.4, 0.2), MATERIALS.glassCyan);
    frontBand.position.set(cx, yPos, cz + depth / 2 + 0.1);
    parent.add(frontBand);

    // Back ribbon
    const backBand = new THREE.Mesh(new THREE.BoxGeometry(width * 0.85, 1.4, 0.2), MATERIALS.glassCyan);
    backBand.position.set(cx, yPos, cz - depth / 2 - 0.1);
    parent.add(backBand);
  }
}

// -------------------------------------------------------------
// Landscaping: Trees, Hedges, Street Lamps
// -------------------------------------------------------------
function populateFoliage(group) {
  // Tree placement coordinates across campus quads and avenues
  const treeCoords = [
    // Entrance avenue trees
    [-14, 90], [14, 90], [-14, 75], [14, 75], [-14, 60], [14, 60],
    [-14, 45], [14, 45], [-14, 30], [14, 30],
    // Admin quad
    [-28, 45], [28, 45], [-28, 30], [28, 30],
    // Library gardens
    [45, 10], [45, 40], [75, 10], [75, 40], [60, 5],
    // Academic & CS avenues
    [-40, 0], [-40, -20], [-40, -40], [-80, 0], [-80, -20], [-80, -40],
    // Cafeteria terrace grove
    [15, -40], [35, -40], [15, -70], [35, -70],
    // Hostel courtyard
    [-95, -5], [-95, 15], [-125, -5], [-125, 15],
    // Campus perimeter greenery
    [-130, 60], [-100, 80], [-60, 95], [60, 120], [110, 80], [130, 45],
    [-30, -90], [0, -95], [40, -95], [-80, -90], [90, -90]
  ];

  treeCoords.forEach(([tx, tz], i) => {
    const tree = createTree(i % 3);
    tree.position.set(tx, 0, tz);
    group.add(tree);
  });

  // Street Lamps along roads
  const lampCoords = [
    [-10, 100], [10, 100], [-10, 70], [10, 70], [-10, 40], [10, 40],
    [-35, 8], [35, 8], [-70, 8], [70, 8], [-100, 8], [100, 8],
    [-40, -74], [0, -74], [40, -74]
  ];

  lampCoords.forEach(([lx, lz]) => {
    const lamp = createStreetLamp();
    lamp.position.set(lx, 0, lz);
    group.add(lamp);
  });
}

function createTree(variant) {
  const tree = new THREE.Group();

  // Trunk
  const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 3.5, 8);
  const trunk = new THREE.Mesh(trunkGeo, MATERIALS.trunk);
  trunk.position.y = 1.75;
  trunk.castShadow = true;
  tree.add(trunk);

  // Foliage
  if (variant === 0) {
    // Deciduous round tree
    const leafGeo = new THREE.SphereGeometry(2.5, 10, 8);
    const leaves = new THREE.Mesh(leafGeo, MATERIALS.leafDark);
    leaves.position.y = 4.5;
    leaves.castShadow = true;
    tree.add(leaves);
  } else if (variant === 1) {
    // Pine / Conifer tree
    for (let c = 0; c < 3; c++) {
      const coneGeo = new THREE.ConeGeometry(2.8 - c * 0.6, 2.5, 8);
      const cone = new THREE.Mesh(coneGeo, MATERIALS.leafPine);
      cone.position.y = 3.5 + c * 1.6;
      cone.castShadow = true;
      tree.add(cone);
    }
  } else {
    // Blossom / Bright green tree
    const leafGeo = new THREE.DodecahedronGeometry(2.4, 0);
    const leaves = new THREE.Mesh(leafGeo, MATERIALS.leafLight);
    leaves.position.y = 4.4;
    leaves.castShadow = true;
    tree.add(leaves);
  }

  return tree;
}

function createStreetLamp() {
  const lamp = new THREE.Group();

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 6, 8), MATERIALS.metal);
  pole.position.y = 3;
  lamp.add(pole);

  const arm = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 0.12), MATERIALS.metal);
  arm.position.set(0.5, 5.9, 0);
  lamp.add(arm);

  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), MATERIALS.gold);
  bulb.position.set(1.0, 5.7, 0);
  lamp.add(bulb);

  return lamp;
}

// -------------------------------------------------------------
// Floating 3D Interactive Location Marker
// -------------------------------------------------------------
function createFloatingMarker(hexColor, locationId) {
  const marker = new THREE.Group();

  const pinMat = new THREE.MeshLambertMaterial({ color: hexColor });

  // Inverted Diamond / Crystal
  const crystalGeo = new THREE.OctahedronGeometry(1.4, 0);
  const crystal = new THREE.Mesh(crystalGeo, pinMat);
  crystal.scale.set(1, 1.6, 1);
  crystal.position.y = 1.6;
  marker.add(crystal);

  // Outer pulsing halo ring
  const haloGeo = new THREE.RingGeometry(1.8, 2.2, 24);
  const haloMat = new THREE.MeshBasicMaterial({
    color: hexColor,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.75
  });
  const halo = new THREE.Mesh(haloGeo, haloMat);
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 1.6;
  marker.add(halo);

  // Ground beacon disc
  const beaconGeo = new THREE.RingGeometry(0.5, 3.5, 24);
  const beaconMat = new THREE.MeshBasicMaterial({
    color: hexColor,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.35
  });
  const beacon = new THREE.Mesh(beaconGeo, beaconMat);
  beacon.rotation.x = Math.PI / 2;
  beacon.position.y = -marker.position.y + 0.1; // projected to ground
  marker.add(beacon);

  marker.userData = { locationId, isMarker: true };
  return marker;
}

/**
 * Comprehensive Campus Data Configuration
 * Contains detailed architectural, coordinate, and educational information
 * for all 11 campus locations.
 */

export const CAMPUS_LOCATIONS = [
  {
    id: "main-entrance",
    name: "Main Entrance",
    shortName: "Entrance Gate",
    subtitle: "The Gateway to Academic Excellence",
    category: "facility",
    badge: "Welcome Plaza",
    coordinates: { x: 0, y: 0, z: 110 },
    cameraPosition: { x: 0, y: 16, z: 155 },
    cameraTarget: { x: 0, y: 5, z: 110 },
    color: "#3b82f6",
    accentColor: "#60a5fa",
    icon: "Compass",
    tagline: "Security check, visitor reception, and iconic university grand portal.",
    description:
      "The Main Entrance features an imposing triumphal archway with dual entry/exit lanes, automated RFID barrier gates, 24/7 security surveillance posts, and a landscaped central roundabout with an illuminated fountain that greets students and visitors.",
    keyFacilities: [
      "24/7 Campus Security Control Room",
      "Visitor Reception & Pass Counter",
      "Automated RFID & License Plate Recognition Gates",
      "Central Heritage Fountain & Landscaped Roundabout",
      "Pedestrian Turnstiles & Disabled Access Ramps"
    ],
    stats: {
      "Daily Footfall": "12,000+ Visitors & Students",
      "Surveillance": "32 High-Definition AI Cameras",
      "Entry Lanes": "4 Motorized + 2 Pedestrian",
      "Operating Hours": "24 Hours / 365 Days"
    },
    architecturalStyle: "Neo-Classical Portico with Reinforced Granite Arch",
    virtualTourNote: "Start your journey here as all primary campus avenues radiate from this central portal."
  },
  {
    id: "admin-block",
    name: "Administration Block",
    shortName: "Admin Central",
    subtitle: "Headquarters of Governance & Student Services",
    category: "administrative",
    badge: "Central Plaza",
    coordinates: { x: 0, y: 0, z: 45 },
    cameraPosition: { x: 0, y: 22, z: 90 },
    cameraTarget: { x: 0, y: 8, z: 45 },
    color: "#8b5cf6",
    accentColor: "#a78bfa",
    icon: "Building2",
    tagline: "Offices of the Chancellor, Vice-Chancellor, Registrar, and Admissions.",
    description:
      "Standing tall at the heart of the campus, the Administration Block houses key executive administrative leadership, admissions council, international student affairs, finance division, and a grand boardroom overlooking the campus central promenade.",
    keyFacilities: [
      "Admissions & Financial Aid Helpdesk",
      "Office of the Vice-Chancellor & Deans",
      "Controller of Examinations & Records Center",
      "Council Chamber & Conference Amphitheater",
      "Student Career & Counseling Cells"
    ],
    stats: {
      "Total Area": "45,000 sq. ft.",
      "Floors": "4 Levels + Central Clock Tower",
      "Staff Members": "140+ Administrative Personnel",
      "Service Timings": "8:30 AM – 5:30 PM (Mon-Sat)"
    },
    architecturalStyle: "Symmetrical Colonnade with 30m Clock Spire",
    virtualTourNote: "Notice the 4-sided working clock tower visible across the entire campus quad."
  },
  {
    id: "academic-block",
    name: "Academic Block",
    shortName: "Academic Block",
    subtitle: "Interdisciplinary Lectures & Smart Classrooms",
    category: "academic",
    badge: "Instructional Core",
    coordinates: { x: -58, y: 0, z: 20 },
    cameraPosition: { x: -58, y: 24, z: 65 },
    cameraTarget: { x: -58, y: 9, z: 20 },
    color: "#0284c7",
    accentColor: "#38bdf8",
    icon: "GraduationCap",
    tagline: "Tiered lecture theatres, tutorial wings, and faculty consultation suites.",
    description:
      "The Academic Block is the educational nexus housing 36 smart classrooms, multi-tier lecture theaters equipped with high-fidelity acoustic arrays and digital touch podiums, departmental seminar rooms, and quiet faculty study rooms.",
    keyFacilities: [
      "36 Tiered Smart Classrooms with 4K Laser Projection",
      "Hybrid Lecture Recording & Broadcast Systems",
      "3 Faculty Lounges & Department Consultation Offices",
      "Student Collaborative Project Commons",
      "Central Elevator Bank & Accessible Skybridge"
    ],
    stats: {
      "Student Capacity": "3,200 Seats",
      "Classrooms": "36 Smart Theaters",
      "Floors": "5 Levels with Double-Height Atrium",
      "Wi-Fi Coverage": "Wi-Fi 6 Gigabit Dual-Band"
    },
    architecturalStyle: "Modern Functionalist with Glazed Ribbon Windows",
    virtualTourNote: "Equipped with eco-friendly natural ventilation and daylight harvesting skylights."
  },
  {
    id: "cs-ai-dept",
    name: "Computer Science / AI & DS Department",
    shortName: "CS & AI Hub",
    subtitle: "Next-Gen Computing, AI Research & Software Labs",
    category: "academic",
    badge: "Center of Excellence",
    coordinates: { x: -65, y: 0, z: -50 },
    cameraPosition: { x: -65, y: 22, z: -5 },
    cameraTarget: { x: -65, y: 9, z: -50 },
    color: "#06b6d4",
    accentColor: "#22d3ee",
    icon: "Cpu",
    tagline: "High-Performance GPU Clusters, Robotics Bay, and VR/AR Innovation Lab.",
    description:
      "A futuristic tech ecosystem dedicated to Computer Science, Artificial Intelligence, and Data Science. Features state-of-the-art supercomputing nodes, specialized Machine Learning labs, immersive VR/AR studios, and incubator spaces for student startups.",
    keyFacilities: [
      "NVIDIA GPU AI Research Cluster & Data Center",
      "Virtual Reality & Augmented Reality Spatial Lab",
      "Cloud Computing & Cybersecurity Testing Sandbox",
      "Open Source Innovation & Hackathon Arena",
      "Robotics Prototyping & IoT Hardware Station"
    ],
    stats: {
      "Workstations": "480+ High-Performance Terminals",
      "Server Node": "64 TFLOPS Dedicated Research Rack",
      "Active Startups": "18 Incubated Student Teams",
      "Specializations": "AI, Data Science, Cyber Security, Cloud"
    },
    architecturalStyle: "Cyber-Tech Glass Curtain Wall with Neon LED Matrix Sign",
    virtualTourNote: "Home to the VR Campus Tour project and student-led robotics innovations."
  },
  {
    id: "library",
    name: "Central Library",
    shortName: "Library",
    subtitle: "The Temple of Knowledge & Digital Repositories",
    category: "academic",
    badge: "Learning Resource",
    coordinates: { x: 58, y: 0, z: 25 },
    cameraPosition: { x: 58, y: 22, z: 70 },
    cameraTarget: { x: 58, y: 8, z: 25 },
    color: "#10b981",
    accentColor: "#34d399",
    icon: "BookOpen",
    tagline: "120,000+ print volumes, online research databases, and 24/7 quiet study halls.",
    description:
      "Featuring a magnificent cylindrical rotunda with a glass skylight dome, the Central Library provides multi-tiered open reading zones, RFID book checkout kiosks, private thesis study cubicles, and seamless access to IEEE, ACM, Springer, and Nature journals.",
    keyFacilities: [
      "120,000+ Hardcover Volumes & Monographs",
      "Digital Knowledge Center with 100 E-Terminals",
      "24/7 Exam Quiet Study Reading Hall",
      "Group Brainstorming & Research Pods",
      "Automated RFID Return Dropboxes"
    ],
    stats: {
      "Collection": "120,000+ Books & 40,000+ E-Journals",
      "Seating Capacity": "900 Readers Simultaneously",
      "Floors": "3 Mezzanine Gallery Levels",
      "Library System": "Fully Automated Koha RFID"
    },
    architecturalStyle: "Circular Glass Dome with Tiered Peripheral Stacks",
    virtualTourNote: "Features quiet reading balconies overlooking the east ornamental gardens."
  },
  {
    id: "auditorium",
    name: "Grand Auditorium",
    shortName: "Auditorium",
    subtitle: "Convocations, Cultural Galas & Keynote Summits",
    category: "facility",
    badge: "Event Stage",
    coordinates: { x: 68, y: 0, z: -45 },
    cameraPosition: { x: 68, y: 24, z: 0 },
    cameraTarget: { x: 68, y: 10, z: -45 },
    color: "#f59e0b",
    accentColor: "#fbbf24",
    icon: "Music",
    tagline: "1,800-seat acoustic concert hall with mechanized stage and 4K projection.",
    description:
      "The premier venue for college convocations, global technology symposiums, theatrical productions, and cultural festivals. Built with cutting-edge German acoustic panels, dynamic motorized stage lighting, green rooms, and orchestra pit.",
    keyFacilities: [
      "1,800 Ergonomic Push-Back Theater Seats",
      "Dolby Atmos Surrounding Acoustic Tuning",
      "Motorized Stage Rigging & 120-Channel DMX Lighting",
      "VIP Green Rooms & Performer Dressing Suites",
      "Dual Simultaneous Multi-Language Translation Booths"
    ],
    stats: {
      "Seating Capacity": "1,800 Auditor Attendees",
      "Stage Width": "65 Feet Proscenium Arch",
      "Display": "45-Foot 4K Micro-LED Stage Backdrop",
      "Acoustics": "Reverberation Time 1.3s"
    },
    architecturalStyle: "Sculptural Cantilevered Roof with Angular Acoustic Facets",
    virtualTourNote: "Host to international TEDx summits and annual graduation ceremonies."
  },
  {
    id: "laboratory",
    name: "Advanced Laboratory Complex",
    shortName: "Research Labs",
    subtitle: "Applied Sciences & Engineering Experimentation",
    category: "academic",
    badge: "Scientific Discovery",
    coordinates: { x: -15, y: 0, z: -60 },
    cameraPosition: { x: -15, y: 22, z: -15 },
    cameraTarget: { x: -15, y: 8, z: -60 },
    color: "#6366f1",
    accentColor: "#818cf8",
    icon: "FlaskConical",
    tagline: "Physics, Chemistry, Electronics, Material Science, and Mechanical Testing.",
    description:
      "A multi-discipline scientific research center equipped with vibration-isolated optical tables, chemical fume extraction exhausts, electronic testing oscilloscopes, 3D additive manufacturing rapid prototypers, and materials testing presses.",
    keyFacilities: [
      "Cleanroom Class 1000 for Microelectronics",
      "Chemical Synthesis & Fume Exhaust Stations",
      "Rapid Prototyping CNC & Industrial 3D Printers",
      "High-Voltage Electrical Machinery Lab",
      "Environmental Testing & Material Hardness Analyzers"
    ],
    stats: {
      "Specialized Labs": "16 Dedicated Testing Bays",
      "Safety Grade": "OSHA & NABL Certified Safety Standards",
      "Equipment Value": "$4.2 Million Research Assets",
      "Patents Filed": "42 Student & Faculty Filings"
    },
    architecturalStyle: "Industrial Modular Steel Frame with Air-Scrubber Roof Units",
    virtualTourNote: "Equipped with strict biosafety containment and clean power backup."
  },
  {
    id: "cafeteria",
    name: "Campus Cafeteria & Food Court",
    shortName: "Cafeteria",
    subtitle: "Multi-Cuisine Dining, Coffee Lounge & Social Hub",
    category: "student-life",
    badge: "Social Quad",
    coordinates: { x: 25, y: 0, z: -55 },
    cameraPosition: { x: 25, y: 20, z: -15 },
    cameraTarget: { x: 25, y: 6, z: -55 },
    color: "#ec4899",
    accentColor: "#f472b6",
    icon: "Utensils",
    tagline: "Nutritious multi-cuisine food stalls, specialty coffee bar, and terrace dining.",
    description:
      "A lively culinary center featuring 8 distinct hygienic food counters offering Indian, Continental, Asian cuisines, fresh juices, and bakery delights. Includes an open-air timber dining deck shaded by garden parasols.",
    keyFacilities: [
      "8 Diverse Multi-Cuisine Food Counters",
      "Artisan Espresso & Organic Juice Lounge",
      "Air-Conditioned Indoor Dining + Garden Terrace",
      "Cashless RFID Meal Payment System",
      "FSSAI Certified Commercial Kitchen & Cold Storage"
    ],
    stats: {
      "Dining Capacity": "850 Simultaneous Diners",
      "Daily Meals": "4,500 Nutritious Servings",
      "Menu Options": "120+ Daily Fresh Items",
      "Timings": "7:00 AM – 10:30 PM Daily"
    },
    architecturalStyle: "Open-Plan Pavilion with Laminated Timber Pergola & Canopies",
    virtualTourNote: "The heart of student leisure, club meetups, and informal brainstorming."
  },
  {
    id: "sports-ground",
    name: "Sports Complex & Athletic Ground",
    shortName: "Sports Arena",
    subtitle: "Athletic Track, Soccer Field & Multi-Sport Courts",
    category: "student-life",
    badge: "Athletic Arena",
    coordinates: { x: 110, y: 0, z: 10 },
    cameraPosition: { x: 110, y: 28, z: 65 },
    cameraTarget: { x: 110, y: 4, z: 10 },
    color: "#16a34a",
    accentColor: "#4ade80",
    icon: "Trophy",
    tagline: "400m synthetic running track, floodlit football turf, and championship courts.",
    description:
      "A comprehensive sports arena featuring an Olympic-standard 400m running track, natural grass football and cricket pitch, floodlit basketball and volleyball courts, indoor badminton arena, and spectator bleachers seating 2,000 fans.",
    keyFacilities: [
      "400m All-Weather Synthetic Polyurethane Track",
      "FIFA-Regulation Size Football & Cricket Turf",
      "2 Floodlit Acrylic Basketball Courts",
      "Covered Spectator Bleachers with 2,000 Seats",
      "Locker Rooms, Sports Medicine & Fitness Gym"
    ],
    stats: {
      "Arena Area": "12 Acres Multi-Sport Facility",
      "Bleacher Capacity": "2,000 Spectators",
      "Lighting": "High-Lux Stadium LED Floodlights",
      "Inter-College Trophies": "14 Regional Championships"
    },
    architecturalStyle: "Open-Air Stadium Oval with Tension Fabric Canopy Grandstand",
    virtualTourNote: "Home of the annual Inter-Collegiate Olympiad and fitness bootcamps."
  },
  {
    id: "hostel",
    name: "Student Residential Hostel",
    shortName: "Hostels",
    subtitle: "Comfortable Modern Campus Living & Recreation",
    category: "student-life",
    badge: "Student Residence",
    coordinates: { x: -110, y: 0, z: -20 },
    cameraPosition: { x: -110, y: 26, z: 35 },
    cameraTarget: { x: -110, y: 10, z: -20 },
    color: "#ea580c",
    accentColor: "#fb923c",
    icon: "Home",
    tagline: "Furnished student rooms, high-speed Wi-Fi, study lounges, and recreational courtyards.",
    description:
      "Providing a safe, comfortable, and vibrant home away from home. The Residential Complex features separate twin/single air-conditioned and non-AC hostel blocks with 24/7 security, high-speed fiber internet, laundromat, medical dispensary, and indoor games room.",
    keyFacilities: [
      "Single, Double & Triple Occupancy En-Suite Rooms",
      "Dedicated High-Speed Fiber Wi-Fi in Every Block",
      "24/7 Resident Doctor & Health Dispensary",
      "Common Recreation Lounge with Table Tennis & TV",
      "Automated Laundromat & Solar Water Heating"
    ],
    stats: {
      "Capacity": "2,400 Resident Scholars",
      "Blocks": "4 Residential Towers with Central Lawn",
      "Security": "Biometric Access & 24/7 Resident Wardens",
      "Hostel Dining": "Dedicated Pure Veg & Non-Veg Kitchens"
    },
    architecturalStyle: "Multi-Wing Terraced Courtyard Architecture",
    virtualTourNote: "Designed with landscaped courtyards for evening group studies and relaxation."
  },
  {
    id: "parking-area",
    name: "Campus Parking & Mobility Hub",
    shortName: "Parking",
    subtitle: "Secure Vehicle Bays & EV Fast Charging",
    category: "facility",
    badge: "Transit Zone",
    coordinates: { x: 75, y: 0, z: 95 },
    cameraPosition: { x: 75, y: 22, z: 140 },
    cameraTarget: { x: 75, y: 3, z: 95 },
    color: "#64748b",
    accentColor: "#94a3b8",
    icon: "Car",
    tagline: "Organized multi-tier parking, electric vehicle charging, and bicycle sharing docks.",
    description:
      "A systematically planned smart transit hub with marked parking lanes for 600+ two-wheelers, 250 cars, dedicated visitor spaces, green solar-canopy EV charging stations, and campus e-bike sharing terminals.",
    keyFacilities: [
      "Covered Solar-Roof Car & Two-Wheeler Bays",
      "Level-2 & DC Fast EV Charging Stations",
      "Automated Space Guidance & LED Occupancy Display",
      "University Shuttle Bus Boarding Terminal",
      "Smart App-Based Bicycle Rental Station"
    ],
    stats: {
      "Car Capacity": "250 Covered Stalls",
      "Two-Wheeler Capacity": "650 Marked Bays",
      "EV Chargers": "12 Dual-Gun Fast Chargers",
      "Transit Shuttles": "Campus Electric Buggy Stops"
    },
    architecturalStyle: "Photovoltaic Solar Canopy Arrays with Permeable Paving",
    virtualTourNote: "Equipped with solar roofs generating clean power fed directly to the campus grid."
  }
];

export const TOUR_CATEGORIES = [
  { id: "all", label: "All Locations" },
  { id: "academic", label: "Academics & Research" },
  { id: "administrative", label: "Administration" },
  { id: "student-life", label: "Student Life & Sports" },
  { id: "facility", label: "Campus Facilities" }
];

export const CAMPUS_STATS = [
  { label: "Campus Acreage", value: "85+ Acres" },
  { label: "Active Students", value: "8,500+" },
  { label: "Faculty & Researchers", value: "450+" },
  { label: "Campus Locations", value: "11 Key Landmarks" },
  { label: "Green Campus Ratio", value: "45% Parkland" }
];

export const DEFAULT_CAMERA_VIEW = {
  position: { x: 0, y: 65, z: 155 },
  target: { x: 0, y: 5, z: 15 }
};

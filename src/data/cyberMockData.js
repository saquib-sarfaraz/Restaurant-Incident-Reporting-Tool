export const STAFF_PROFILE = {
  id: "EMP-2048",
  name: "Alex Carter",
  role: "Restaurant Staff",
  store: "California Burrito - Delhi",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  performanceBadge: "Gold Reporter",
  joinedDate: "2024-03-15",
  email: "alex.carter@californiaburrito.corp",
  metrics: {
    submitted: 14,
    open: 2,
    resolved: 12,
    avgResolutionTime: "3.2 Hours"
  },
  achievements: [
    { id: "badge-1", title: "Eagle Eye", desc: "First to report a critical cooling spike", icon: "👁️" },
    { id: "badge-2", title: "Gold Reporter", desc: "Maintained >95% high-accuracy tags", icon: "🥇" },
    { id: "badge-3", title: "Operational Shield", desc: "Prevented inventory hazard losses", icon: "🛡️" }
  ],
  activityTimeline: [
    { date: "2026-05-29", action: "Logged new incident: 'POS Terminal Frozen at Checkout 2'" },
    { date: "2026-05-28", action: "Resolved cooling warning: 'Replaced Gasket on Barista Fridge'" },
    { date: "2026-05-25", action: "Triggered emergency plumber dispatch for Delhi store drain" }
  ]
};

export const MANAGER_PROFILE = {
  name: "Sarah Johnson",
  role: "Operations Manager",
  region: "North India",
  storesManaged: 12,
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
  email: "sarah.johnson@incidenthub.corp",
  joinedDate: "2022-09-01",
  metrics: {
    totalIncidents: 42,
    criticalIncidents: 4,
    avgResolutionTime: "2.8 Hours",
    resolvedToday: 8,
    storePerformanceScore: "96.4%"
  },
  achievements: [
    { id: "mbadge-1", title: "SLA Master", desc: "Maintained average resolution SLA < 3hrs", icon: "⚡" },
    { id: "mbadge-2", title: "Risk Safeguard", desc: "Reduced total store kitchen faults by 42%", icon: "🛡️" }
  ],
  activityTimeline: [
    { date: "2026-05-29", action: "Escalated high-priority slip lawsuit incident in Bandra" },
    { date: "2026-05-29", action: "Approved resolution notes for McDonald's terminal reboot" },
    { date: "2026-05-28", action: "Overrode priority level for Indiranagar freezer cooling warning" }
  ]
};

export const INITIAL_CYBER_INCIDENTS = [
  {
    id: "INC-2048-001",
    title: "POS Kiosk #2 Checkout System Failure",
    description: "Digital kiosk terminal is totally unresponsive and shows credit card transaction timeouts. Customers are getting double-charged. It slows down customer ordering drastically during peak hours.",
    category: "POS Issue",
    severity: "High",
    store: "California Burrito - Delhi",
    status: "Open",
    reportedTime: "30 mins ago",
    date: "2026-05-29",
    assignedManager: "Sarah Johnson",
    timelineProgress: ["Reported"],
    resolutionNotes: "Awaiting IT network controller check. Direct credit card gateway check in progress.",
    createdDate: "2026-05-29T19:22:00.000Z",
    aiSummary: "POS transaction card gateway loop causing payment failure and order blocks."
  },
  {
    id: "INC-2048-002",
    title: "Primary Walk-in Freezer Cooling Failure",
    description: "Freezer core thermostat reports -4°C (required -18°C). Highly perishable taco shells, cheese, and meats are in immediate danger of spoiling. Worth approximately $4,500.",
    category: "Kitchen Equipment",
    severity: "Critical",
    store: "California Burrito - Delhi",
    status: "In Progress",
    reportedTime: "2 hours ago",
    date: "2026-05-29",
    assignedManager: "Sarah Johnson",
    timelineProgress: ["Reported", "Under Review", "In Progress"],
    resolutionNotes: "Emergency HVAC technician dispatched. Inventory relocated to backup coolers.",
    createdDate: "2026-05-29T17:45:00.000Z",
    aiSummary: "Critical freezer thermal leak. Urgent HVAC technician required (Vendor: CoolTech)."
  },
  {
    id: "INC-2048-003",
    title: "Water Leak Near Dining Self-Serve Counter",
    description: "Constant water dripping from false ceiling tiles right beside the self-serve beverage dispenser. Minor puddle is forming on the tiles. No wet sign was available in staff closet.",
    category: "Facility/Safety",
    severity: "High",
    store: "California Burrito - Noida",
    status: "Under Review",
    reportedTime: "4 hours ago",
    date: "2026-05-29",
    assignedManager: "Amit Sharma (Regional Lead)",
    timelineProgress: ["Reported", "Under Review"],
    resolutionNotes: "Isolating building water lines to pinpoint the exact leak.",
    createdDate: "2026-05-29T15:30:00.000Z",
    aiSummary: "Slipping hazard inside main dining space due to localized building pipe leak."
  },
  {
    id: "INC-2048-004",
    title: "Tortilla Press Heating Element Burnout",
    description: "The primary tortilla grill press Group B is not reaching cooking temperature. Orders for quesadillas are backed up. Baristas are using secondary backup pan grills, but prep speed is cut in half.",
    category: "Kitchen Equipment",
    severity: "Medium",
    store: "California Burrito - Gurgaon",
    status: "Resolved",
    reportedTime: "1 day ago",
    date: "2026-05-28",
    assignedManager: "Sarah Johnson",
    timelineProgress: ["Reported", "Under Review", "In Progress", "Resolved"],
    resolutionNotes: "Replaced the burned out heating coil. Press has been tested at 180°C and is fully operational.",
    createdDate: "2026-05-28T10:00:00.000Z",
    aiSummary: "Grate hardware heating failure. Heating coil replaced."
  },
  {
    id: "INC-2048-005",
    title: "Severe Ingredients Stock Delivery Interruption",
    description: "Our daily supplier cargo delivery did not arrive. We are out of fresh avocados and black beans. California Burrito Delhi cannot offer premium bowls or guacamole options today.",
    category: "Supply Chain",
    severity: "Critical",
    store: "California Burrito - Delhi",
    status: "In Progress",
    reportedTime: "5 hours ago",
    date: "2026-05-29",
    assignedManager: "Priya Nair (Compliance)",
    timelineProgress: ["Reported", "Under Review", "In Progress"],
    resolutionNotes: "Truck broke down on national highway. Sourcing alternative avocados from Gurgaon branch.",
    createdDate: "2026-05-29T14:00:00.000Z",
    aiSummary: "Core supply chain disruption affecting menu availability. Alternate store stock transfer active."
  },
  {
    id: "INC-2048-006",
    title: "Understaffed Shift During Friday Dinner Rush",
    description: "Three shifts crew members failed to check in due to sudden seasonal viral outbreak. Slow speed-of-service, wait times rose to 25 minutes. Received 4 bad feedback reviews on Yelp.",
    category: "Staffing",
    severity: "Medium",
    store: "California Burrito - Noida",
    status: "Resolved",
    reportedTime: "3 days ago",
    date: "2026-05-26",
    assignedManager: "Amit Sharma (Regional Lead)",
    timelineProgress: ["Reported", "Under Review", "In Progress", "Resolved"],
    resolutionNotes: "Dispatched floaters from Gurgaon branch. Compensation discount coupons sent to complaining diners.",
    createdDate: "2026-05-26T21:00:00.000Z",
    aiSummary: "Shift labor deficit slowing kitchen throughput. Resolved by dispatching cover crews."
  },
  {
    id: "INC-2048-007",
    title: "Barista Counter Steam Valve Burst",
    description: "Steam pressure valve on hot beverage station cracked, spitting high-temp steam. Barista sustained minor finger scald, first-aid administered immediately. Station isolated from main gas.",
    category: "Facility/Safety",
    severity: "Critical",
    store: "California Burrito - Delhi",
    status: "Under Review",
    reportedTime: "1 hour ago",
    date: "2026-05-29",
    assignedManager: "Sarah Johnson",
    timelineProgress: ["Reported", "Under Review"],
    resolutionNotes: "Awaiting replacement pressure gasket. Employee checked by local pharmacy, cleared for shift.",
    createdDate: "2026-05-29T18:15:00.000Z",
    aiSummary: "Staff physical injury risk from cracked steam pressure valve at drink station."
  },
  {
    id: "INC-2048-008",
    title: "Double Charging Issue on Delhi Ordering Kiosks",
    description: "Delhi store payment terminals are recording double authorizations for single card taps. Affecting POS kiosk #1 and #3. Customers are requesting refunds.",
    category: "POS Issue",
    severity: "High",
    store: "California Burrito - Delhi",
    status: "Open",
    reportedTime: "3 hours ago",
    date: "2026-05-29",
    assignedManager: "Sarah Johnson",
    timelineProgress: ["Reported"],
    resolutionNotes: "Deactivated Delhi Kiosk terminals to perform payment api diagnostics.",
    createdDate: "2026-05-29T16:00:00.000Z",
    aiSummary: "Delhi location payment api authorization sync glitch leading to double swipes."
  }
];

export const AI_PREDICTIONS = [
  {
    id: "pred-1",
    insight: "Kitchen Equipment incidents increased by 27% this week.",
    confidence: "92%",
    riskFactor: "High",
    action: "Schedule preventative thermal checks on all grills and fryers across North India stores.",
    details: "Thermal anomalies detected in 4 La Marzocco steam pressure grids during morning check-ins."
  },
  {
    id: "pred-2",
    insight: "POS Terminal failures forecast to spike at Delhi NCR locations.",
    confidence: "84%",
    riskFactor: "Medium",
    action: "Push firmware patch 4.2.1 to checkout kiosks to prevent payment synchronization loops.",
    details: "High network latency recorded from Delhi hub ISP between 18:00 and 20:00."
  },
  {
    id: "pred-3",
    insight: "Labor coverage deficit predicted for upcoming weekend shift.",
    confidence: "78%",
    riskFactor: "High",
    action: "Pre-approve floaters and override standby rosters to ensure adequate kitchen assembly speeds.",
    details: "Gurgaon store reports 4 key assembly baristas active on medical leaves."
  }
];

export const REGIONAL_RISK_SCORE = 34; // out of 100

export const STORES = [
  "California Burrito - Delhi",
  "California Burrito - Noida",
  "California Burrito - Gurgaon",
  "California Burrito - Indiranagar",
  "California Burrito - Bandra West"
];

export const CATEGORIES = [
  "POS Issue",
  "Kitchen Equipment",
  "Facility/Safety",
  "Supply Chain",
  "Staffing",
  "Customer Complaint"
];

export const SEVERITIES = ["Low", "Medium", "High", "Critical"];

export const STATUSES = ["Open", "Under Review", "In Progress", "Resolved"];

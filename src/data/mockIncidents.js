export const STAFF_PROFILE = {
  id: "EMP-2023-138",
  name: "Saquib Sarfaraz",
  shortName: "Saquib",
  role: "Restaurant Staff",
  store: "California Burrito - Saket",
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG4uWukufSfuzz8yS9UUVDvb2Y9HrmvrLk7w&s",
  joinDate: "January 2025",
  email: "saquib@example.com",
  performanceScore: "98.2%",
  metrics: {
    reported: 14,
    resolved: 12,
    avgResolutionTime: "3.2 Hours",
    performanceScore: "98.2%"
  },
  achievements: [
    { id: "ach-1", title: "Top Reporter", desc: "Highest volume of high-fidelity incident reports logged.", icon: "👁️" },
    { id: "ach-2", title: "Fast Escalation", desc: "Immediate reporting of critical equipment failure.", icon: "⚡" },
    { id: "ach-3", title: "Safety Champion", desc: "Consistently identifying facility safety risks.", icon: "🛡️" }
  ],
  activityFeed: [
    { date: "2026-05-29", action: "Submitted new log: 'POS Counter 3 Payment Gateway Offline'" },
    { date: "2026-05-28", action: "Completed safety checklist: 'Barista counter gasket replaced'" },
    { date: "2026-05-25", action: "Flagged plumbing anomaly: 'Washroom floor drain leakage'" }
  ]
};

export const MANAGER_PROFILE = {
  id: "MGR-2023-138",
  name: "Saquib Sarfaraz",
  shortName: "Saquib",
  role: "Operations Manager",
  region: "Delhi NCR",
  storesManaged: 12,
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG4uWukufSfuzz8yS9UUVDvb2Y9HrmvrLk7w&s",
  joinDate: "January 2025",
  email: "saquib@example.com",
  metrics: {
    totalIncidents: 42,
    resolutionRate: "94.5%",
    criticalIssues: 2,
    avgResponseTime: "2.8 Hours"
  },
  achievements: [
    { id: "ach-1", title: "Operations Leader", desc: "Maintained standard SLAs across all 12 regional stores.", icon: "👔" },
    { id: "ach-2", title: "100+ Incidents Resolved", desc: "Resolved over 100 system and kitchen equipment logs.", icon: "🏆" },
    { id: "ach-3", title: "Top Performing Region", desc: "Maintained the highest safety and uptime region scores.", icon: "🌟" }
  ],
  activityFeed: [
    { date: "2026-05-29", action: "Approved resolution notes: 'Quesadilla Press repair audit'" },
    { date: "2026-05-28", action: "Reassigned POS hardware diagnostic to regional coordinator" },
    { date: "2026-05-27", action: "Flagged refrigeration temperature alert at Connaught Place" }
  ]
};

export const INITIAL_INCIDENTS = [
  {
    id: "INC-2026-001",
    title: "POS Counter 3 Payment Gateway Offline",
    description: "The primary touch-screen kiosk terminal #3 in the front counter is failing to authorize credit card swipes, triggering gateway timeout exceptions. We have diverted guests to counter #1, but it is causing a queue backing up to the entryway.",
    category: "POS Issue",
    severity: "High",
    store: "California Burrito - Saket",
    status: "Open",
    reportedTime: "20 mins ago",
    date: "2026-05-29",
    assignedManager: "Sarah Johnson",
    timelineProgress: ["Reported"],
    resolutionNotes: "Contacted corporate IT logistics. Sourcing payment hardware gateway diagnostics.",
    createdDate: "2026-05-29T19:30:00.000Z",
    aiSummary: "Front payment terminal checkout delay due to merchant credit-card authorization latency."
  },
  {
    id: "INC-2026-002",
    title: "Primary Walk-in Cooler Compressor Failure",
    description: "The digital temperature display on the walk-in cooler shows 14°C, which is well above the safe threshold of 4°C. Perishable stock (including taco ingredients and dairy products worth approximately $3,500) will be compromised if not resolved immediately.",
    category: "Kitchen Equipment",
    severity: "Critical",
    store: "California Burrito - Saket",
    status: "In Progress",
    reportedTime: "1 hour ago",
    date: "2026-05-29",
    assignedManager: "Sarah Johnson",
    timelineProgress: ["Reported", "Under Review", "In Progress"],
    resolutionNotes: "IT and maintenance technician dispatched. Moving high-value ingredients to backup chest freezers.",
    createdDate: "2026-05-29T18:45:00.000Z",
    aiSummary: "Critical compressor cooling defect. Urgent HVAC repair required."
  },
  {
    id: "INC-2026-003",
    title: "Slipping Hazard Near Self-Serve Beverage Dispenser",
    description: "A minor leak from the soda fountain ice dispenser is causing water to accumulate on the tiles. No warnings signs are visible in the immediate cleaning utility locker.",
    category: "Facility/Safety",
    severity: "High",
    store: "California Burrito - Connaught Place",
    status: "Under Review",
    reportedTime: "3 hours ago",
    date: "2026-05-29",
    assignedManager: "Amit Sharma (District Lead)",
    timelineProgress: ["Reported", "Under Review"],
    resolutionNotes: "Mop deployed. 'Wet Floor' high-visibility signage placed at fountain.",
    createdDate: "2026-05-29T16:30:00.000Z",
    aiSummary: "Localized spill water puddle near drinks bar creating immediate guest hazard."
  },
  {
    id: "INC-2026-004",
    title: "Secondary Quesadilla Press Failure",
    description: "Grill Press heating element is failing to distribute thermal heating evenly. Quesadillas are taking twice as long to prep, backing up online delivery order speeds.",
    category: "Kitchen Equipment",
    severity: "Medium",
    store: "California Burrito - Noida",
    status: "Resolved",
    reportedTime: "Yesterday",
    date: "2026-05-28",
    assignedManager: "Sarah Johnson",
    timelineProgress: ["Reported", "Under Review", "In Progress", "Resolved"],
    resolutionNotes: "Coil burner replaced by kitchen maintenance team. Platen distributed evenly at 180°C.",
    createdDate: "2026-05-28T11:00:00.000Z",
    aiSummary: "Burner grid thermal coil malfunction. Heating press fully repaired."
  },
  {
    id: "INC-2026-005",
    title: "Daily Avocado Shipment Logistics Interruption",
    description: "The cold-cargo cargo truck did not arrive for its morning delivery slot. Gurgaon branch is out of fresh avocados and cannot offer premium guacamole sides for the lunch shift.",
    category: "Supply Chain",
    severity: "Critical",
    store: "California Burrito - Gurgaon",
    status: "In Progress",
    reportedTime: "4 hours ago",
    date: "2026-05-29",
    assignedManager: "Priya Nair (Compliance)",
    timelineProgress: ["Reported", "Under Review", "In Progress"],
    resolutionNotes: "Sourcing backup delivery truck from regional warehouse to complete stock transfer.",
    createdDate: "2026-05-29T15:00:00.000Z",
    aiSummary: "Supplier delivery cargo delay leading to stock shortages of avocados."
  },
  {
    id: "INC-2026-006",
    title: "Kitchen Staff Shift Shortage",
    description: "Three line baristas reported sick simultaneously for the Friday evening shift. Average prep speeds dropped, resulting in delivery delays exceeding 25 minutes.",
    category: "Staffing",
    severity: "Medium",
    store: "California Burrito - Noida",
    status: "Resolved",
    reportedTime: "3 days ago",
    date: "2026-05-26",
    assignedManager: "Amit Sharma (District Lead)",
    timelineProgress: ["Reported", "Under Review", "In Progress", "Resolved"],
    resolutionNotes: "Dispatched stand-by operators from neighboring Connaught Place hub to cover shift gaps.",
    createdDate: "2026-05-26T20:00:00.000Z",
    aiSummary: "Shift vacancy backlog. Managed successfully by drafting stand-by crews."
  }
];

export const AI_OPERATIONAL_INSIGHTS = [
  {
    id: "ins-1",
    insight: "Kitchen equipment incidents are up by 24% across Delhi NCR branches.",
    confidence: "91%",
    severity: "High",
    action: "Schedule prophylactic heater and compressor diagnostic cycles across North India outlets.",
    details: "Thermostat anomalies recorded from 3 primary platen tortilla presses during morning audits."
  },
  {
    id: "ins-2",
    insight: "Delivery transit delays are highest during evening rush hours.",
    confidence: "86%",
    severity: "Medium",
    action: "Optimize pick-up terminal staging layouts to shave off 4 minutes from dispatch delays.",
    details: "Average packaging latencies rose to 12 minutes between 18:00 and 20:00."
  },
  {
    id: "ins-3",
    insight: "Gurgaon store requires attention due to repeated inventory issues.",
    confidence: "78%",
    severity: "High",
    action: "Initiate warehouse supplier audit to resolve avocado logistics sync anomalies.",
    details: "Avocado deliveries arrived >2 hours late on 3 distinct occasions in the past 10 days."
  }
];

export const STORES = [
  "California Burrito - Saket",
  "California Burrito - Noida",
  "California Burrito - Gurgaon",
  "California Burrito - Connaught Place",
  "California Burrito - Indiranagar"
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

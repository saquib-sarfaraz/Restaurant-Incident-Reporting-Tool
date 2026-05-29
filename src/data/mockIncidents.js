export const mockIncidents = [
  {
    id: "INC-2026-001",
    title: "POS Terminal Offline during Dinner Rush",
    description: "Main checkout terminal is frozen and displaying a blue screen. Customer orders cannot be processed, resulting in long queues. We are currently using manual card readers, but it is slowing down service significantly.",
    category: "POS Issue",
    severity: "High",
    store: "McDonald's - Connaught Place",
    status: "Open",
    reportedTime: "2 hours ago",
    date: "2026-05-29",
    aiSummary: "Main POS outage causing transactional delay and order backlogs during peak evening hours.",
    actionPlan: [
      "Reboot the main server terminal.",
      "Check LAN and ethernet connections at the counter.",
      "Call local IT support desk for a terminal replacement if hardware failure is confirmed."
    ]
  },
  {
    id: "INC-2026-002",
    title: "Walk-in Freezer Temperature Spike",
    description: "The primary walk-in freezer temperature has risen to -5°C (should be below -18°C). A high-temperature alert was triggered. There is a high risk of food spoilage (approx. $3,000 worth of frozen inventory) if not resolved quickly.",
    category: "Kitchen Equipment",
    severity: "Critical",
    store: "Starbucks - Indiranagar",
    status: "In Progress",
    reportedTime: "45 mins ago",
    date: "2026-05-29",
    aiSummary: "Critical freezer cooling failure threatening immediate perishable food safety standards.",
    actionPlan: [
      "Move high-value perishables to secondary chest freezers.",
      "Ensure the freezer door seal is fully closed and free of ice blockages.",
      "Contact emergency refrigeration technician (Vendor: CoolTech)."
    ]
  },
  {
    id: "INC-2026-003",
    title: "Customer Slip and Fall Near Soda Fountain",
    description: "A customer slipped on a wet patch near the self-serve beverage counter. No warning sign was displayed. The customer was shaken but refused medical attention. We took down their details and filed an initial incident statement.",
    category: "Facility/Safety",
    severity: "High",
    store: "Domino's - Bandra West",
    status: "Open",
    reportedTime: "3 hours ago",
    date: "2026-05-29",
    aiSummary: "Customer slip hazard due to liquid spill; potential liability issue; yellow slip-warning sign absent.",
    actionPlan: [
      "Immediately clean and dry the affected floor area.",
      "Deploy 'Wet Floor' high-visibility cones.",
      "Obtain security footage backup for the incident duration."
    ]
  },
  {
    id: "INC-2026-004",
    title: "Delay in Bread and Patty Supplier Delivery",
    description: "The daily supply truck did not arrive at its scheduled 6:00 AM slot. We are running extremely low on standard buns and taco shells. If the delivery doesn't arrive by 12:00 PM, we will have to temporarily remove core menu items.",
    category: "Supply Chain",
    severity: "Medium",
    store: "California Burrito - Jubilee Hills",
    status: "In Progress",
    reportedTime: "5 hours ago",
    date: "2026-05-29",
    aiSummary: "Supply chain disruption leading to potential stockouts of core ingredients for the lunch shift.",
    actionPlan: [
      "Call logistics dispatch officer for the truck ETA.",
      "Check inventory of nearby sister branches for emergency stock transfer.",
      "Prepare staff to cross-sell alternative menu items if shortages occur."
    ]
  },
  {
    id: "INC-2026-005",
    title: "Espresso Machine Steam Wand Leak",
    description: "The steam wand on Group 2 of our La Marzocco machine has a continuous hiss and is dripping hot water, causing a minor safety hazard for baristas. Speed of coffee service is slightly affected, but Group 1 is fully functional.",
    category: "Kitchen Equipment",
    severity: "Medium",
    store: "Starbucks - Connaught Place",
    status: "Resolved",
    reportedTime: "Yesterday",
    date: "2026-05-28",
    aiSummary: "Minor valve leak in espresso machine group head; successfully repaired by on-site lead.",
    actionPlan: [
      "Turn off steam valve and bleed the pressure wand.",
      "Replace the worn-out silicone gasket and steam seal ring.",
      "Test steam pressure at 1.5 bar to confirm full repair."
    ]
  },
  {
    id: "INC-2026-006",
    title: "Understaffed During Weekend Rush",
    description: "Three kitchen crew members called in sick for the Saturday night shift. We were short-staffed during our highest volume period. Order delivery times exceeded 20 minutes, leading to several negative reviews.",
    category: "Staffing",
    severity: "Medium",
    store: "McDonald's - Indiranagar",
    status: "Resolved",
    reportedTime: "4 days ago",
    date: "2026-05-25",
    aiSummary: "Operational slowdown due to acute staff absenteeism during peak customer demand hours.",
    actionPlan: [
      "Request cover staff from standby rosters.",
      "Provide discount vouchers to waiting customers as service recovery.",
      "Manager stepped in to help on the assembly line."
    ]
  },
  {
    id: "INC-2026-007",
    title: "Sewer Backup in Back Kitchen",
    description: "Gray water is backing up through the floor drain in the dishwashing station. There is a strong odor and standing water. This violates sanitation guidelines, and we have paused kitchen operations until a plumber arrives.",
    category: "Facility/Safety",
    severity: "Critical",
    store: "California Burrito - Connaught Place",
    status: "In Progress",
    reportedTime: "1 hour ago",
    date: "2026-05-29",
    aiSummary: "Critical sanitation hazard with drain backup forcing temporary closure of kitchen station.",
    actionPlan: [
      "Halt dishwashing and isolate water lines.",
      "Erect barriers to prevent water from reaching food prep areas.",
      "Contact emergency drain cleaners (Vendor: RapidDrain Specialists)."
    ]
  },
  {
    id: "INC-2026-008",
    title: "Double Charging Issue on Digital Kiosk",
    description: "Several customers reported that they were charged twice on their credit cards while ordering through Kiosk #3. The kiosk successfully generated only one order ticket but took two transactions from the gateway.",
    category: "POS Issue",
    severity: "High",
    store: "McDonald's - Bandra West",
    status: "Open",
    reportedTime: "3 hours ago",
    date: "2026-05-29",
    aiSummary: "Payment gateway integration bug causing duplicate charges on self-service kiosk.",
    actionPlan: [
      "Deactivate kiosk #3 and post a 'Temporary Out of Service' sticker.",
      "Compile transaction logs and submit to payment gateway provider.",
      "Notify corporate accounting to initiate manual refunds for affected customers."
    ]
  }
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

export const STORES = [
  "McDonald's - Connaught Place",
  "McDonald's - Indiranagar",
  "McDonald's - Bandra West",
  "Starbucks - Indiranagar",
  "Starbucks - Connaught Place",
  "Domino's - Bandra West",
  "California Burrito - Jubilee Hills",
  "California Burrito - Connaught Place"
];

export const STATUSES = ["Open", "In Progress", "Resolved"];

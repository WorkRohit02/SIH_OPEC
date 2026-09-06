// Mock Data for Smart Mandi Admin Console Prototype

export const INITIAL_OVERVIEW_STATS = {
  totalFarmers: { value: "24,680", change: "+12.5% vs last month", type: "positive" },
  activeMandis: { value: "48", change: "+4.2% vs last month", type: "positive" },
  todayVolume: { value: "₹18.4L", change: "+8.7% vs yesterday", type: "positive" },
  openGrievances: { value: "126", change: "6.1% needs attention", type: "warning" }
};

export const FOOTFALL_TREND_DATA = [
  { date: '06 Jun', overall: 2200, registered: 1400 },
  { date: '07 Jun', overall: 3100, registered: 1800 },
  { date: '08 Jun', overall: 2700, registered: 2100 },
  { date: '09 Jun', overall: 3900, registered: 2600 },
  { date: '10 Jun', overall: 3500, registered: 2300 },
  { date: '11 Jun', overall: 4600, registered: 3100 },
  { date: '12 Jun', overall: 5200, registered: 3600 }
];

export const LIVE_QUEUE_SUMMARY = [
  { id: 1, name: "Azadpur Mandi", farmers: 48, waitTime: "20 min", capacity: 45, status: "Healthy" },
  { id: 2, name: "Ghazipur Mandi", farmers: 72, waitTime: "45 min", capacity: 72, status: "High load" },
  { id: 3, name: "Narela Mandi", farmers: 91, waitTime: "90 min", capacity: 91, status: "Critical" },
  { id: 4, name: "Okhla Mandi", farmers: 34, waitTime: "15 min", capacity: 38, status: "Healthy" }
];

export const RECENT_GRIEVANCES_OVERVIEW = [
  { id: "GRV-1048", farmer: "Ramesh Kumar", mandi: "Azadpur Mandi", status: "Open" },
  { id: "GRV-1047", farmer: "Sunita Pal", mandi: "Ghazipur Mandi", status: "Resolved" },
  { id: "GRV-1046", farmer: "Mohan Singh", mandi: "Narela Mandi", status: "Escalated" },
  { id: "GRV-1045", farmer: "Arun Verma", mandi: "Okhla Mandi", status: "Open" }
];

export const INITIAL_MANDIS = [
  {
    id: "AM-DEL-001",
    name: "Azadpur Mandi",
    location: "Delhi",
    subLocation: "North Delhi",
    capacity: 45,
    statusTag: "Good",
    liveAvgPrice: "₹2,275",
    priceTrend: "+2.4%",
    todayFootfall: "2,840 visits",
    active: true,
    supportedCrops: ["Wheat", "Rice", "Onion", "Tomato"]
  },
  {
    id: "AM-DEL-002",
    name: "Ghazipur Mandi",
    location: "Delhi",
    subLocation: "East Delhi",
    capacity: 72,
    statusTag: "Busy",
    liveAvgPrice: "₹2,340",
    priceTrend: "+1.8%",
    todayFootfall: "3,620 visits",
    active: true,
    supportedCrops: ["Wheat", "Mustard", "Sugarcane"]
  },
  {
    id: "AM-DEL-003",
    name: "Narela Mandi",
    location: "Delhi",
    subLocation: "North West Delhi",
    capacity: 91,
    statusTag: "Critical",
    liveAvgPrice: "₹2,410",
    priceTrend: "+3.1%",
    todayFootfall: "4,180 visits",
    active: true,
    supportedCrops: ["Rice", "Cotton", "Wheat"]
  },
  {
    id: "AM-DEL-004",
    name: "Okhla Mandi",
    location: "Delhi",
    subLocation: "South East Delhi",
    capacity: 38,
    statusTag: "Good",
    liveAvgPrice: "₹2,215",
    priceTrend: "-0.9%",
    todayFootfall: "1,960 visits",
    active: true,
    supportedCrops: ["Vegetables", "Onion", "Tomato"]
  },
  {
    id: "AM-HAR-005",
    name: "Karnal Mandi",
    location: "Haryana",
    subLocation: "Karnal Central",
    capacity: 54,
    statusTag: "Good",
    liveAvgPrice: "₹2,190",
    priceTrend: "+0.4%",
    todayFootfall: "2,310 visits",
    active: true,
    supportedCrops: ["Wheat", "Rice", "Sugarcane"]
  },
  {
    id: "AM-HAR-006",
    name: "Sonipat Mandi",
    location: "Haryana",
    subLocation: "Sonipat GT Road",
    capacity: 88,
    statusTag: "Busy",
    liveAvgPrice: "₹2,295",
    priceTrend: "+1.5%",
    todayFootfall: "3,400 visits",
    active: false,
    supportedCrops: ["Mustard", "Wheat"]
  }
];

export const INITIAL_FARMERS = [
  {
    id: "FARM-101",
    name: "Ramesh Kumar",
    mobile: "+91 98765 43210",
    village: "Khera",
    district: "Delhi",
    landSize: "6.5 acres",
    language: "Hindi",
    submittedDate: "12 Jun 2024",
    status: "Pending",
    crops: ["Wheat", "Rice", "Cotton"],
    documentName: "land-document-ramesh.pdf",
    documentType: "7/12 Land Ownership Record",
    avatar: "RK"
  },
  {
    id: "FARM-102",
    name: "Sunita Mehra",
    mobile: "+91 98111 22334",
    village: "Sonipat",
    district: "Haryana",
    landSize: "4.2 acres",
    language: "Hindi",
    submittedDate: "11 Jun 2024",
    status: "Pending",
    crops: ["Rice", "Mustard"],
    documentName: "khasra-sunita-mehra.pdf",
    documentType: "Khasra Khatoni Ownership Slip",
    avatar: "SM"
  },
  {
    id: "FARM-103",
    name: "Vijay Gupta",
    mobile: "+91 98222 77865",
    village: "Panipat",
    district: "Haryana",
    landSize: "8.0 acres",
    language: "Haryanvi",
    submittedDate: "10 Jun 2024",
    status: "Pending",
    crops: ["Sugarcane", "Wheat"],
    documentName: "land-deed-vijay.pdf",
    documentType: "Registered Sale Deed Copy",
    avatar: "VG"
  },
  {
    id: "FARM-104",
    name: "Harish Singh",
    mobile: "+91 97654 11223",
    village: "Najafgarh",
    district: "Delhi",
    landSize: "5.0 acres",
    language: "Hindi",
    submittedDate: "09 Jun 2024",
    status: "Verified",
    crops: ["Wheat", "Onion", "Tomato"],
    documentName: "najafgarh-land-deed.pdf",
    documentType: "7/12 Land Ownership Record",
    avatar: "HS"
  },
  {
    id: "FARM-105",
    name: "Seema Devi",
    mobile: "+91 98450 99887",
    village: "Rohtak",
    district: "Haryana",
    landSize: "3.5 acres",
    language: "Hindi",
    submittedDate: "08 Jun 2024",
    status: "Rejected",
    crops: ["Rice"],
    documentName: "rohtak-invalid-doc.pdf",
    documentType: "Expired Identification Slip",
    avatar: "SD"
  }
];

export const INITIAL_LIVE_QUEUE = [
  { id: 1, name: "Ramesh Kumar", crop: "Wheat", slotTime: "10:30 AM", position: "#01", status: "In Progress", mandi: "Ghazipur Mandi" },
  { id: 2, name: "Suresh Yadav", crop: "Rice", slotTime: "10:45 AM", position: "#02", status: "Waiting", mandi: "Ghazipur Mandi" },
  { id: 3, name: "Anita Devi", crop: "Mustard", slotTime: "11:00 AM", position: "#03", status: "Waiting", mandi: "Ghazipur Mandi" },
  { id: 4, name: "Mohan Singh", crop: "Wheat", slotTime: "11:15 AM", position: "#04", status: "Completed", mandi: "Ghazipur Mandi" },
  { id: 5, name: "Kavita Sharma", crop: "Cotton", slotTime: "11:30 AM", position: "#05", status: "Waiting", mandi: "Ghazipur Mandi" },
  { id: 6, name: "Devender Kumar", crop: "Sugarcane", slotTime: "11:45 AM", position: "#06", status: "Waiting", mandi: "Azadpur Mandi" }
];

export const INITIAL_GRIEVANCES = [
  {
    id: "GRV-1048",
    farmer: "Ramesh Kumar",
    mandi: "Azadpur Mandi",
    category: "Payment Issue",
    dateFiled: "12 Jun 2024",
    status: "Open",
    admin: "AS",
    adminName: "Anita Sharma",
    description: "Payment delayed for 50 quintals wheat trade completed yesterday. Direct bank deposit pending."
  },
  {
    id: "GRV-1047",
    farmer: "Suresh Yadav",
    mandi: "Ghazipur Mandi",
    category: "Weighment Dispute",
    dateFiled: "11 Jun 2024",
    status: "In Review",
    admin: "RK",
    adminName: "Rahul Kapoor",
    description: "40kg discrepancy between electronic farm scale and Mandi Weighbridge entry receipt."
  },
  {
    id: "GRV-1046",
    farmer: "Meena Devi",
    mandi: "Narela Mandi",
    category: "Slot / Queue Problem",
    dateFiled: "10 Jun 2024",
    status: "Escalated",
    admin: "AS",
    adminName: "Anita Sharma",
    description: "Token allocated for 9:30 AM slot but entry gate denied access till 1:30 PM due to truck backlog."
  },
  {
    id: "GRV-1045",
    farmer: "Harish Singh",
    mandi: "Azadpur Mandi",
    category: "Other",
    dateFiled: "08 Jun 2024",
    status: "Resolved",
    admin: "PM",
    adminName: "Pooja Mishra",
    description: "Request to update linked bank account IFSC code for faster automated MSP payouts."
  }
];

// NEW: Crops Directory Dataset
export const CROPS_DIRECTORY_DATA = [
  {
    id: "CROP-WHEAT",
    name: "Wheat",
    hindiName: "गेहूं",
    category: "Cereals",
    icon: "🌾",
    color: "#F59E0B",
    msp: "₹2,275 / Quintal",
    avgPrice: "₹2,365",
    priceTrend: "+1.9%",
    todayArrivals: "4,200 Quintals",
    varieties: ["Sharbati Grade A", "HD 2967", "PBW 343", "LOK 1"],
    topMandis: ["Azadpur Mandi", "Karnal Mandi", "Narela Mandi"],
    maxMoisture: "12%",
    purityGrade: "98.5%",
    harvestSeason: "Rabi (Harvested Apr - Jun)",
    registeredFarmersCount: 14280,
    description: "Primary staple cereal crop. High demand across North Indian flour mills and government procurement centers."
  },
  {
    id: "CROP-RICE",
    name: "Rice / Paddy",
    hindiName: "धान / चावल",
    category: "Cereals",
    icon: "🌾",
    color: "#10B981",
    msp: "₹2,183 / Quintal",
    avgPrice: "₹3,625",
    priceTrend: "+1.25%",
    todayArrivals: "6,800 Quintals",
    varieties: ["Basmati 1509", "Pusa 1121", "PR 126", "Samba Mahsuri"],
    topMandis: ["Karnal Mandi", "Ghazipur Mandi", "Narela Mandi"],
    maxMoisture: "14%",
    purityGrade: "97.0%",
    harvestSeason: "Kharif (Harvested Oct - Dec)",
    registeredFarmersCount: 18450,
    description: "Premium export quality paddy varieties with high market realization rates well above base MSP floor."
  },
  {
    id: "CROP-MUSTARD",
    name: "Mustard Seed",
    hindiName: "सरसों",
    category: "Oilseeds",
    icon: "🟡",
    color: "#D97706",
    msp: "₹5,650 / Quintal",
    avgPrice: "₹5,890",
    priceTrend: "-0.5%",
    todayArrivals: "1,950 Quintals",
    varieties: ["Pusa Bold", "Giriraj", "RH 749", "Yellow Sarson"],
    topMandis: ["Ghazipur Mandi", "Sonipat Mandi", "Najafgarh Mandi"],
    maxMoisture: "8%",
    purityGrade: "99.0%",
    harvestSeason: "Rabi (Harvested Feb - Apr)",
    registeredFarmersCount: 8900,
    description: "High oil content seeds processed for edible mustard oil. Strict moisture verification enforced at gate."
  },
  {
    id: "CROP-COTTON",
    name: "Cotton",
    hindiName: "कपास / रुई",
    category: "Fiber",
    icon: "🧵",
    color: "#8B5CF6",
    msp: "₹7,020 / Quintal",
    avgPrice: "₹7,350",
    priceTrend: "+2.08%",
    todayArrivals: "980 Quintals",
    varieties: ["Long Staple Bt Cotton", "Medium Staple H-4"],
    topMandis: ["Narela Mandi", "Bhiwani Mandi", "Sirsa Mandi"],
    maxMoisture: "8.5%",
    purityGrade: "96.5%",
    harvestSeason: "Kharif (Harvested Oct - Feb)",
    registeredFarmersCount: 5200,
    description: "Cash fiber crop traded by ginning factories and textile mills with staple length quality testing."
  },
  {
    id: "CROP-SUGARCANE",
    name: "Sugarcane",
    hindiName: "गन्ना",
    category: "Cash Crop",
    icon: "🎋",
    color: "#059669",
    msp: "₹315 / Quintal",
    avgPrice: "₹340",
    priceTrend: "0.0%",
    todayArrivals: "12,400 Quintals",
    varieties: ["CO 0238", "COJ 85", "CO 86032"],
    topMandis: ["Karnal Mandi", "Panipat Mandi", "Meerut Mandi"],
    maxMoisture: "N/A (Brix 18-20%)",
    purityGrade: "Sugar Recovery 10.5%",
    harvestSeason: "Annual (Harvested Nov - Apr)",
    registeredFarmersCount: 11300,
    description: "Direct mill supply sugar cane with sucrose recovery index verification at weighbridges."
  },
  {
    id: "CROP-ONION",
    name: "Onion",
    hindiName: "प्याज़",
    category: "Vegetables",
    icon: "🧅",
    color: "#EF4444",
    msp: "₹1,800 / Quintal",
    avgPrice: "₹2,450",
    priceTrend: "+6.5%",
    todayArrivals: "3,100 Quintals",
    varieties: ["Nashik Red", "Pusa Red", "Agrifound Dark Red"],
    topMandis: ["Azadpur Mandi", "Okhla Mandi", "Ghazipur Mandi"],
    maxMoisture: "Grade A Dry",
    purityGrade: "Size > 55mm",
    harvestSeason: "Rabi & Kharif",
    registeredFarmersCount: 7600,
    description: "Perishable bulb vegetable monitored under essential commodities price stabilization index."
  },
  {
    id: "CROP-TOMATO",
    name: "Tomato",
    hindiName: "टमाटर",
    category: "Vegetables",
    icon: "🍅",
    color: "#DC2626",
    msp: "₹1,400 / Quintal",
    avgPrice: "₹1,950",
    priceTrend: "+3.2%",
    todayArrivals: "2,850 Quintals",
    varieties: ["Hybrid Himsoha", "Abhilash", "Pusa Ruby"],
    topMandis: ["Azadpur Mandi", "Okhla Mandi"],
    maxMoisture: "Fresh Firm Grade",
    purityGrade: "Blemish Free 95%",
    harvestSeason: "Year-Round",
    registeredFarmersCount: 6100,
    description: "High velocity vegetable arrival handled via priority cold-storage slot queues."
  }
];

export const COMMODITY_PRICING_DATA = [
  {
    id: "PR-01",
    commodity: "Wheat (Sharbati Grade A)",
    category: "Cereals",
    mspRate: 2275,
    minPrice: 2280,
    maxPrice: 2450,
    avgPrice: 2365,
    prevAvg: 2320,
    change: "+1.9%",
    arrivalVolume: "4,200 Quintals",
    trend: "up"
  },
  {
    id: "PR-02",
    commodity: "Paddy / Rice (Basmati 1509)",
    category: "Cereals",
    mspRate: 2183,
    minPrice: 3400,
    maxPrice: 3850,
    avgPrice: 3625,
    prevAvg: 3580,
    change: "+1.25%",
    arrivalVolume: "6,800 Quintals",
    trend: "up"
  },
  {
    id: "PR-03",
    commodity: "Mustard Seed (Yellow)",
    category: "Oilseeds",
    mspRate: 5650,
    minPrice: 5700,
    maxPrice: 6100,
    avgPrice: 5890,
    prevAvg: 5920,
    change: "-0.5%",
    arrivalVolume: "1,950 Quintals",
    trend: "down"
  },
  {
    id: "PR-04",
    commodity: "Cotton (Long Staple)",
    category: "Fiber",
    mspRate: 7020,
    minPrice: 7100,
    maxPrice: 7600,
    avgPrice: 7350,
    prevAvg: 7200,
    change: "+2.08%",
    arrivalVolume: "980 Quintals",
    trend: "up"
  },
  {
    id: "PR-05",
    commodity: "Sugarcane (CO 0238)",
    category: "Cash Crop",
    mspRate: 315,
    minPrice: 325,
    maxPrice: 350,
    avgPrice: 340,
    prevAvg: 340,
    change: "0.0%",
    arrivalVolume: "12,400 Quintals",
    trend: "neutral"
  },
  {
    id: "PR-06",
    commodity: "Onion (Nashik Red)",
    category: "Vegetables",
    mspRate: 1800,
    minPrice: 2100,
    maxPrice: 2800,
    avgPrice: 2450,
    prevAvg: 2300,
    change: "+6.5%",
    arrivalVolume: "3,100 Quintals",
    trend: "up"
  }
];

export const DAILY_ARRIVALS_GRAPH = [
  { day: 'Mon', wheat: 4200, paddy: 6800, mustard: 1950, cotton: 980 },
  { day: 'Tue', wheat: 4600, paddy: 7100, mustard: 2100, cotton: 1050 },
  { day: 'Wed', wheat: 5100, paddy: 7400, mustard: 1850, cotton: 1100 },
  { day: 'Thu', wheat: 4800, paddy: 6900, mustard: 2200, cotton: 1250 },
  { day: 'Fri', wheat: 5500, paddy: 8200, mustard: 2400, cotton: 1300 },
  { day: 'Sat', wheat: 6100, paddy: 8900, mustard: 2650, cotton: 1400 },
  { day: 'Sun', wheat: 3900, paddy: 5400, mustard: 1500, count: 800 }
];

export const SYSTEM_ADMIN_USERS = [
  { id: 1, name: "Anita Kapoor", email: "anita.kapoor@smartmandi.gov.in", role: "Super Admin", mandi: "All Mandis (Central)", status: "Active", avatar: "AK" },
  { id: 2, name: "Rahul Kapoor", email: "rahul.k@smartmandi.gov.in", role: "Regional Manager", mandi: "Ghazipur Mandi", status: "Active", avatar: "RK" },
  { id: 3, name: "Anita Sharma", email: "anita.s@smartmandi.gov.in", role: "Verification Officer", mandi: "Azadpur Mandi", status: "Active", avatar: "AS" },
  { id: 4, name: "Pooja Mishra", email: "pooja.m@smartmandi.gov.in", role: "Grievance Inspector", mandi: "Narela Mandi", status: "Active", avatar: "PM" },
  { id: 5, name: "Vikram Rathore", email: "vikram.r@smartmandi.gov.in", role: "Market Analyst", mandi: "Karnal Mandi", status: "Inactive", avatar: "VR" }
];

export const INITIAL_AUDIT_LOGS = [
  { id: "LOG-9081", timestamp: "12 Jun 2024, 10:24 AM", action: "Approved Farmer Verification", actor: "Anita Kapoor (Super Admin)", target: "Farmer Ramesh Kumar (FARM-101)", ip: "192.168.1.45", severity: "info" },
  { id: "LOG-9080", timestamp: "12 Jun 2024, 09:55 AM", action: "Updated Wheat Base MSP", actor: "Rahul Kapoor (Regional Manager)", target: "Wheat Grade A (₹2,275/Q)", ip: "192.168.1.88", severity: "info" },
  { id: "LOG-9079", timestamp: "12 Jun 2024, 09:12 AM", action: "Alert Triggered: Exceeding Capacity", actor: "System Monitor Engine", target: "Ghazipur Mandi (86% Load)", ip: "System Internal", severity: "warning" },
  { id: "LOG-9078", timestamp: "11 Jun 2024, 04:40 PM", action: "Escalated Grievance Ticket", actor: "Anita Sharma (Verification Officer)", target: "GRV-1046 (Meena Devi)", ip: "192.168.1.22", severity: "critical" },
  { id: "LOG-9077", timestamp: "11 Jun 2024, 02:15 PM", action: "Added New Mandi Location", actor: "Anita Kapoor (Super Admin)", target: "Karnal Mandi (AM-HAR-005)", ip: "192.168.1.45", severity: "info" }
];

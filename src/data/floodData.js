// Flood event data based on the available documentation
export const floodEvents = [
  {
    id: 1,
    title: "Tukad Badung Overflow",
    location: "Denpasar",
    coordinates: [115.2126, -8.6705],
    severity: "extreme",
    description: "Critical moment at 06:35 WITA when Tukad Badung overflowed, triggering widespread flooding",
    impact: "Building collapses on Jalan Hasanuddin, rapid spread across 57+ points",
    time: "2025-09-10T06:35:00+08:00"
  },
  {
    id: 2,
    title: "Kampung Jawa Flooding",
    location: "Denpasar",
    coordinates: [115.2050, -8.6860],
    severity: "severe",
    description: "Early flooding with water levels reaching over 1 meter depth",
    impact: "Houses submerged, early evacuations initiated",
    time: "2025-09-10T05:30:00+08:00"
  },
  {
    id: 3,
    title: "Underpass Dewa Ruci",
    location: "Badung",
    coordinates: [115.1828, -8.7215],
    severity: "severe",
    description: "Vehicle-level inundation at the underpass with water reaching car height",
    impact: "Transportation disrupted, vehicles trapped",
    time: "2025-09-10T07:15:00+08:00"
  },
  {
    id: 4,
    title: "Mahendradata Area",
    location: "Denpasar",
    coordinates: [115.2205, -8.6700],
    severity: "moderate",
    description: "Waist-deep flooding affecting residential areas",
    impact: "Evacuations of residents, temporary shelter setup",
    time: "2025-09-10T08:00:00+08:00"
  }
]

// Chart data for flood statistics
export const floodStatistics = [
  { category: 'Denpasar', points: 39, color: '#3b82f6' },
  { category: 'Badung', points: 18, color: '#10b981' }
]

export const severityDistribution = [
  { level: 'Minor (0.1-0.5m)', count: 10, color: '#65a30d' },
  { level: 'Moderate (0.5-1.2m)', count: 15, color: '#ca8a04' },
  { level: 'Severe (1.2-2.0m)', count: 16, color: '#ea580c' },
  { level: 'Extreme (1.5-3.0m+)', count: 7, color: '#dc2626' }
]

// Timeline data
export const timelineData = [
  { 
    time: '2025-09-09T23:15:00+08:00', 
    event: 'Heavy rainfall begins in Jembrana', 
    description: 'First signs of extreme precipitation associated with Rossby Wave phenomenon' 
  },
  { 
    time: '2025-09-10T05:30:00+08:00', 
    event: 'Kampung Jawa flooding', 
    description: 'Early flooding with >1m depth, evacuations initiated' 
  },
  { 
    time: '2025-09-10T06:35:00+08:00', 
    event: 'CRITICAL MOMENT - Tukad Badung overflow', 
    description: 'Building collapses on Jalan Hasanuddin, rapid flood spread' 
  },
  { 
    time: '2025-09-10T07:30:00+08:00', 
    event: 'SAR mobilization begins', 
    description: 'Emergency response with 200+ personnel deployment' 
  },
  { 
    time: '2025-09-10T12:00:00+08:00', 
    event: 'Peak flooding recorded', 
    description: 'Maximum extent of 57 documented flood points' 
  },
  { 
    time: '2025-09-12T18:00:00+08:00', 
    event: 'Recovery operations complete', 
    description: 'Water recession and cleanup efforts concluded' 
  }
]

export interface SecurityEvent {
  id: string;
  timestamp: string;
  eventType: string;
  userId?: string;
  ipAddress: string;
  location: string;
  deviceFingerprint?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: string;
  details: string;
  riskScore?: number;
  userAgent?: string;
}

export interface UserSession {
  userId: string;
  email: string;
  deviceType: string;
  ipAddress: string;
  location: string;
  deviceFingerprint: string;
  sessionStart: string;
  riskScore: number;
  riskLevel: string;
  activities: SecurityEvent[];
}

export interface ThreatIntelligence {
  ipAddress: string;
  threatType: string;
  confidenceScore: number;
  riskLevel: string;
  lastSeen: string;
  associatedCampaigns: string[];
}

export interface BotDetection {
  ipAddress: string;
  botScore: number;
  botType: string;
  detectionReasons: string[];
  recommendedAction: string;
  confidence: string;
}

// Sample data based on the comprehensive security monitoring scenario
export const sampleSecurityEvents: SecurityEvent[] = [
  {
    id: "evt_001",
    timestamp: "2025-05-30 17:06:30",
    eventType: "User Behavior",
    userId: "USER_LegitCustomer_789",
    ipAddress: "203.0.113.10",
    location: "Bengaluru, India",
    deviceFingerprint: "FP_BHQ654JKL",
    severity: "low",
    status: "normal",
    details: "User lands on homepage - Page View: /homepage, Referrer: direct"
  },
  {
    id: "evt_002",
    timestamp: "2025-05-30 17:06:45",
    eventType: "Authentication Success",
    userId: "USER_LegitCustomer_789",
    ipAddress: "203.0.113.10",
    location: "Bengaluru, India",
    severity: "low",
    status: "success",
    details: "Successful login - Username: anjali.sharma@example.com, Method: Password, Latency: 300ms"
  },
  {
    id: "evt_003",
    timestamp: "2025-05-30 17:07:15",
    eventType: "User Navigation",
    userId: "USER_LegitCustomer_789",
    ipAddress: "203.0.113.10",
    location: "Bengaluru, India",
    severity: "low",
    status: "normal",
    details: "User navigates to product page - Page View: /products/premium-service-plan"
  },
  {
    id: "evt_004",
    timestamp: "2025-05-30 17:08:00",
    eventType: "Suspicious Login Attempt",
    userId: "USER_LegitCustomer_789",
    ipAddress: "185.199.110.153",
    location: "Moscow, Russia",
    severity: "high",
    status: "blocked",
    details: "Brute-force attempt detected - 5 attempts within 10 seconds, Invalid credentials",
    riskScore: 91
  },
  {
    id: "evt_005",
    timestamp: "2025-05-30 17:08:30",
    eventType: "API Rate Limit Exceeded",
    ipAddress: "104.28.249.200",
    location: "Dublin, Ireland",
    deviceFingerprint: "FP_GHIJ4567",
    severity: "medium",
    status: "flagged",
    details: "High traffic detected - 500 requests in 10 seconds to /api/v1/user/profiles",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  }
];

export const sampleUserSession: UserSession = {
  userId: "USER_LegitCustomer_789",
  email: "anjali.sharma@example.com",
  deviceType: "Desktop (Chrome, Windows 10)",
  ipAddress: "203.0.113.10",
  location: "Bengaluru, India",
  deviceFingerprint: "FP_BHQ654JKL",
  sessionStart: "2025-05-30 17:06:30",
  riskScore: 91,
  riskLevel: "Critical",
  activities: sampleSecurityEvents.filter(e => e.userId === "USER_LegitCustomer_789")
};

export const sampleThreatIntelligence: ThreatIntelligence[] = [
  {
    ipAddress: "185.199.110.153",
    threatType: "Botnet Command & Control, Spam Source",
    confidenceScore: 95,
    riskLevel: "High",
    lastSeen: "2025-05-30 10:00:00",
    associatedCampaigns: ["Phishing Kit Alpha"]
  }
];

export const sampleBotDetection: BotDetection[] = [
  {
    ipAddress: "104.28.249.200",
    botScore: 88,
    botType: "Automated Scraper",
    detectionReasons: [
      "Extreme Request Rate",
      "Lack of typical human mouse/keyboard events",
      "Unusual sequential access pattern to user profiles"
    ],
    recommendedAction: "Block traffic from this IP address immediately",
    confidence: "High"
  }
];

export const sampleMetrics = {
  activeUsers: 1247,
  threatsDetected: 352,
  threatsBlocked: 323,
  botTraffic: 156,
  userGrowth: "+12%",
  threatGrowth: "+18%",
  blockRate: "91.8%",
  botPercentage: "15.2%"
};

export const sampleHourlyThreatData = [
  { hour: "14:00", bots: 12, fraud: 5, attacks: 3 },
  { hour: "15:00", bots: 18, fraud: 8, attacks: 4 },
  { hour: "16:00", bots: 25, fraud: 12, attacks: 7 },
  { hour: "17:00", bots: 42, fraud: 15, attacks: 9 },
  { hour: "18:00", bots: 28, fraud: 9, attacks: 5 }
];

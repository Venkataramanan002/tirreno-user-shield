
import { 
  sampleSecurityEvents, 
  sampleUserSession, 
  sampleThreatIntelligence, 
  sampleBotDetection,
  sampleMetrics,
  sampleHourlyThreatData
} from '@/data/sampleData';

// Mock API service to simulate real API responses using sample data
export const mockApiService = {
  // Dashboard APIs
  getDashboardMetrics: async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return sampleMetrics;
  },

  getThreatTimeline: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return sampleHourlyThreatData.map(item => ({
      time: item.hour,
      threats: item.bots + item.fraud + item.attacks,
      blocked: Math.floor((item.bots + item.fraud + item.attacks) * 0.9)
    }));
  },

  getRiskDistribution: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      { name: "High Risk", value: 35, color: "#ef4444" },
      { name: "Medium Risk", value: 45, color: "#f59e0b" },
      { name: "Low Risk", value: 20, color: "#10b981" }
    ];
  },

  getTopThreats: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [
      { type: "Brute Force Attack", count: 156, severity: "high" as const },
      { type: "Bot Traffic", count: 89, severity: "high" as const },
      { type: "API Abuse", count: 45, severity: "medium" as const },
      { type: "Suspicious Login", count: 32, severity: "medium" as const }
    ];
  },

  // Security Events APIs
  getSecurityEvents: async (filters?: any) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return sampleSecurityEvents;
  },

  // User Behavior APIs
  getUserBehaviorMetrics: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      averageSessionDuration: "8m 42s",
      pageViewsPerSession: 4.7,
      bounceRate: "23%",
      suspiciousPatterns: 67
    };
  },

  getSessionData: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return sampleHourlyThreatData.map(item => ({
      time: item.hour,
      sessions: Math.floor(Math.random() * 500) + 200,
      anomalies: item.fraud + item.attacks
    }));
  },

  getUsers: async (searchTerm?: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const baseUser = sampleUserSession;
    
    // Generate some variation for demo
    const users = [
      {
        ...baseUser,
        riskScore: 91,
        status: "suspicious" as const,
        anomalies: ["Multiple failed logins", "New device", "Unusual location"]
      },
      {
        id: "user_002",
        email: "john.doe@example.com",
        riskScore: 25,
        status: "normal" as const,
        location: "New York, US",
        device: "Safari/macOS",
        lastActivity: "5 min ago",
        anomalies: []
      },
      {
        id: "user_003",
        email: "threat.actor@suspicious.com",
        riskScore: 88,
        status: "blocked" as const,
        location: "Moscow, Russia",
        device: "Chrome/Linux",
        lastActivity: "2 min ago",
        anomalies: ["Brute force attempt", "Malicious IP", "Bot-like behavior"]
      }
    ];

    if (searchTerm) {
      return users.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return users;
  },

  // Threat Detection APIs
  getThreatTypes: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      { type: "Bot Traffic", detected: 156, blocked: 142, severity: "high" as const },
      { type: "Brute Force", detected: 89, blocked: 87, severity: "high" as const },
      { type: "Account Takeover", detected: 45, blocked: 38, severity: "medium" as const },
      { type: "API Abuse", detected: 32, blocked: 29, severity: "medium" as const }
    ];
  },

  getHourlyThreatData: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return sampleHourlyThreatData;
  },

  getDetectionRules: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [
      {
        id: "rule_001",
        name: "Brute Force Detection",
        description: "Detects multiple failed login attempts from same IP",
        status: "active" as const,
        triggered: 23,
        accuracy: 94
      },
      {
        id: "rule_002",
        name: "Geo-location Anomaly",
        description: "Flags logins from unusual geographic locations",
        status: "active" as const,
        triggered: 67,
        accuracy: 87
      }
    ];
  }
};

import { DashboardMetrics, ThreatTimelineItem, RiskDistributionItem, TopThreat } from './dashboardApi';
import { SecurityEvent } from './securityEventsApi';
import { ThreatData, ThreatAlert } from './threatDetectionApi';

export interface UserMetrics {
  totalUsers: number;
  activeUsers: number;
  riskUsers: number;
  averageSessionTime: string;
}

export interface SessionData {
  time: string;
  activeSessions: number;
  newSessions: number;
}

export interface User {
  userId: string;
  email: string;
  deviceType: string;
  ipAddress: string;
  location: string;
  deviceFingerprint: string;
  sessionStart: string;
  riskScore: number;
  status: 'normal' | 'suspicious' | 'high-risk';
  anomalies: string[];
  activityLevel?: 'low' | 'medium' | 'high';
  lastActivity?: string;
}

export const mockApiService = {
  getDashboardMetrics: async (): Promise<DashboardMetrics> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      totalUsers: 1247,
      activeUsers: 892,
      riskScore: 7.8,
      threatsDetected: 56,
      falsePositives: 2
    };
  },

  getThreatTimeline: async (): Promise<ThreatTimelineItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { time: "00:00", critical: 2, high: 5, medium: 12, low: 45 },
      { time: "04:00", critical: 0, high: 3, medium: 7, low: 23 },
      { time: "08:00", critical: 1, high: 8, medium: 15, low: 34 },
      { time: "12:00", critical: 3, high: 12, medium: 23, low: 56 },
      { time: "16:00", critical: 1, high: 5, medium: 18, low: 41 },
      { time: "20:00", critical: 0, high: 2, medium: 10, low: 30 }
    ];
  },

  getRiskDistribution: async (): Promise<RiskDistributionItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { type: "Malware", value: 32 },
      { type: "Phishing", value: 27 },
      { type: "DDoS", value: 15 },
      { type: "Insider Threat", value: 12 },
      { type: "Data Breach", value: 9 },
      { type: "Ransomware", value: 5 }
    ];
  },

  getTopThreats: async (): Promise<TopThreat[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { source: "China", value: 45 },
      { source: "Russia", value: 30 },
      { source: "North Korea", value: 15 },
      { source: "Iran", value: 7 },
      { source: "Nigeria", value: 3 }
    ];
  },

  getUserMetrics: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      totalUsers: 1247,
      activeUsers: 892,
      riskUsers: 23,
      averageSessionTime: "18m 32s"
    };
  },

  getSessionData: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { time: "00:00", activeSessions: 245, newSessions: 12 },
      { time: "04:00", activeSessions: 189, newSessions: 8 },
      { time: "08:00", activeSessions: 567, newSessions: 45 },
      { time: "12:00", activeSessions: 892, newSessions: 78 },
      { time: "16:00", activeSessions: 734, newSessions: 34 },
      { time: "20:00", activeSessions: 456, newSessions: 23 }
    ];
  },

  getUsers: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      {
        id: "USER_LegitCustomer_789",
        userId: "USER_LegitCustomer_789",
        email: "anjali.sharma@example.com",
        deviceType: "Desktop",
        ipAddress: "203.0.113.10",
        location: "Bengaluru, India",
        deviceFingerprint: "FP_BHQ654JKL",
        sessionStart: "2025-05-30 17:06:30",
        riskScore: 1.2,
        status: "normal",
        anomalies: [],
        activityLevel: "medium",
        lastActivity: "2025-05-30 17:07:45"
      },
      {
        id: "USER_Suspicious_456",
        userId: "USER_Suspicious_456", 
        email: "suspicious.user@example.com",
        deviceType: "Mobile",
        ipAddress: "185.199.110.153",
        location: "Moscow, Russia",
        deviceFingerprint: "FP_SUSPICIOUS_123",
        sessionStart: "2025-05-30 17:08:00",
        riskScore: 9.1,
        status: "suspicious",
        anomalies: ["Multiple failed login attempts", "Login from suspicious IP", "Geo-location anomaly"],
        activityLevel: "high"
      },
      {
        id: "USER_Bot_Detection_321",
        userId: "USER_Bot_Detection_321",
        email: "bot.scraper@example.com", 
        deviceType: "Desktop",
        ipAddress: "104.28.249.200",
        location: "Dublin, Ireland",
        deviceFingerprint: "FP_GHIJ4567",
        sessionStart: "2025-05-30 17:08:30",
        riskScore: 8.8,
        status: "high-risk",
        anomalies: ["Extreme request rate", "Automated behavior pattern", "Sequential access pattern"],
        activityLevel: "high"
      }
    ];
  },

  getSecurityEvents: async (): Promise<SecurityEvent[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: "SE_MalwareDetected_987",
        timestamp: "2025-05-30 17:10:00",
        source: "Endpoint Security",
        event: "Malware Detected",
        description: "A malware was detected on user's machine.",
        severity: "critical",
        user: "john.doe@example.com",
        ipAddress: "192.168.1.100",
        location: "New York, USA"
      },
      {
        id: "SE_PhishingAttempt_654",
        timestamp: "2025-05-30 17:12:30",
        source: "Email Gateway",
        event: "Phishing Attempt",
        description: "A phishing email was detected and blocked.",
        severity: "high",
        user: "jane.doe@example.com",
        ipAddress: "203.0.113.45",
        location: "London, UK"
      },
      {
        id: "SE_DDosAttack_321",
        timestamp: "2025-05-30 17:15:00",
        source: "Network Firewall",
        event: "DDoS Attack",
        description: "A distributed denial-of-service attack was detected and mitigated.",
        severity: "critical",
        user: "N/A",
        ipAddress: "Multiple",
        location: "Global"
      }
    ];
  },

  getThreatTypes: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { type: "Malware", detected: 45, blocked: 42, severity: "high" as const },
      { type: "Phishing", detected: 32, blocked: 30, severity: "high" as const },
      { type: "DDoS", detected: 18, blocked: 15, severity: "medium" as const },
      { type: "Bot Traffic", detected: 67, blocked: 60, severity: "low" as const }
    ];
  },

  getHourlyThreatData: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { hour: "14:00", bots: 12, fraud: 5, attacks: 3 },
      { hour: "15:00", bots: 18, fraud: 8, attacks: 4 },
      { hour: "16:00", bots: 25, fraud: 12, attacks: 7 },
      { hour: "17:00", bots: 42, fraud: 15, attacks: 9 },
      { hour: "18:00", bots: 28, fraud: 9, attacks: 5 }
    ];
  },

  getDetectionRules: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: "rule_001",
        name: "Brute Force Detection",
        description: "Detects multiple failed login attempts",
        status: "active" as const,
        triggered: 15,
        accuracy: 94
      },
      {
        id: "rule_002", 
        name: "Suspicious IP Detection",
        description: "Flags known malicious IP addresses",
        status: "active" as const,
        triggered: 8,
        accuracy: 98
      }
    ];
  },

  getThreatData: async (): Promise<ThreatData[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: "TD_RansomwareAttack_001",
        timestamp: "2025-05-30 17:20:00",
        threatType: "Ransomware Attack",
        target: "Finance Department",
        status: "active",
        affectedSystems: 15,
        potentialLoss: "$500,000",
        description: "Ransomware attack targeting financial documents."
      },
      {
        id: "TD_DataBreach_002",
        timestamp: "2025-05-30 17:22:30",
        threatType: "Data Breach",
        target: "Customer Database",
        status: "contained",
        affectedSystems: 3,
        potentialLoss: "Confidential",
        description: "Unauthorized access to customer database."
      },
      {
        id: "TD_InsiderThreat_003",
        timestamp: "2025-05-30 17:25:00",
        threatType: "Insider Threat",
        target: "HR Department",
        status: "investigating",
        affectedSystems: 1,
        potentialLoss: "Reputational Damage",
        description: "Suspicious activity from an internal employee."
      }
    ];
  },

  getThreatAlerts: async (): Promise<ThreatAlert[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: "TA_HighRiskLogin_001",
        timestamp: "2025-05-30 17:30:00",
        user: "john.doe@example.com",
        alertType: "High-Risk Login",
        description: "Login from unusual location detected.",
        severity: "high",
        status: "unresolved"
      },
      {
        id: "TA_SuspiciousFileAccess_002",
        timestamp: "2025-05-30 17:32:30",
        user: "jane.doe@example.com",
        alertType: "Suspicious File Access",
        description: "Unusual access to sensitive files detected.",
        severity: "medium",
        status: "investigating"
      },
      {
        id: "TA_MalwareActivity_003",
        timestamp: "2025-05-30 17:35:00",
        user: "N/A",
        alertType: "Malware Activity",
        description: "Malware activity detected on the network.",
        severity: "critical",
        status: "active"
      }
    ];
  }
};

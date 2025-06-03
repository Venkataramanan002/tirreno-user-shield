
import { mockApiService } from './mockApiService';

export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  riskScore: number;
  threatsDetected: number;
  falsePositives: number;
  threatsBlocked: number;
  botTraffic: number;
  userGrowth: string;
  threatGrowth: string;
  blockRate: string;
  botPercentage: string;
}

export interface ThreatTimelineItem {
  time: string;
  threats: number;
  blocked: number;
}

export interface RiskDistributionItem {
  type: string;
  name: string;
  value: number;
  color: string;
}

export interface TopThreat {
  type: string;
  count: number;
  severity: 'high' | 'medium' | 'low' | 'critical';
}

export const dashboardApi = {
  getMetrics: (): Promise<DashboardMetrics> => 
    mockApiService.getDashboardMetrics(),
  
  getThreatTimeline: (): Promise<ThreatTimelineItem[]> => 
    mockApiService.getThreatTimeline(),
  
  getRiskDistribution: (): Promise<RiskDistributionItem[]> => 
    mockApiService.getRiskDistribution(),
  
  getTopThreats: (): Promise<TopThreat[]> => 
    mockApiService.getTopThreats(),
};


import { mockApiService } from './mockApiService';

export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  riskScore: number;
  threatsDetected: number;
  falsePositives: number;
}

export interface ThreatTimelineItem {
  time: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface RiskDistributionItem {
  type: string;
  value: number;
}

export interface TopThreat {
  source: string;
  value: number;
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

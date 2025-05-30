
import { mockApiService } from './mockApiService';

export interface DashboardMetrics {
  activeUsers: number;
  threatsDetected: number;
  threatsBlocked: number;
  botTraffic: number;
  userGrowth: string;
  threatGrowth: string;
  blockRate: string;
  botPercentage: string;
}

export interface ThreatDataPoint {
  time: string;
  threats: number;
  blocked: number;
}

export interface RiskDistribution {
  name: string;
  value: number;
  color: string;
}

export interface TopThreat {
  type: string;
  count: number;
  severity: 'high' | 'medium' | 'low';
}

export const dashboardApi = {
  getMetrics: (): Promise<DashboardMetrics> => 
    mockApiService.getDashboardMetrics(),
  
  getThreatTimeline: (): Promise<ThreatDataPoint[]> => 
    mockApiService.getThreatTimeline(),
  
  getRiskDistribution: (): Promise<RiskDistribution[]> => 
    mockApiService.getRiskDistribution(),
  
  getTopThreats: (): Promise<TopThreat[]> => 
    mockApiService.getTopThreats(),
};


import { apiClient } from './api';

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
    apiClient.get('/dashboard/metrics'),
  
  getThreatTimeline: (): Promise<ThreatDataPoint[]> => 
    apiClient.get('/dashboard/threat-timeline'),
  
  getRiskDistribution: (): Promise<RiskDistribution[]> => 
    apiClient.get('/dashboard/risk-distribution'),
  
  getTopThreats: (): Promise<TopThreat[]> => 
    apiClient.get('/dashboard/top-threats'),
};

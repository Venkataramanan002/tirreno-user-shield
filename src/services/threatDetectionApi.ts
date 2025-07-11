
import { mockApiService } from './mockApiService';

export interface ThreatData {
  id: string;
  timestamp: string;
  threatType: string;
  target: string;
  status: string;
  affectedSystems: number;
  potentialLoss: string;
  description: string;
}

export interface ThreatAlert {
  id: string;
  timestamp: string;
  user: string;
  alertType: string;
  description: string;
  severity: 'high' | 'medium' | 'low' | 'critical';
  status: string;
}

export interface ThreatType {
  type: string;
  detected: number;
  blocked: number;
  severity: 'high' | 'medium' | 'low';
}

export interface HourlyThreatData {
  hour: string;
  bots: number;
  fraud: number;
  attacks: number;
}

export interface DetectionRule {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  triggered: number;
  accuracy: number;
}

export const threatDetectionApi = {
  getThreatTypes: (): Promise<ThreatType[]> => 
    mockApiService.getThreatTypes(),
  
  getHourlyData: (): Promise<HourlyThreatData[]> => 
    mockApiService.getHourlyThreatData(),
  
  getDetectionRules: (): Promise<DetectionRule[]> => 
    mockApiService.getDetectionRules(),
  
  getThreatData: (): Promise<ThreatData[]> =>
    mockApiService.getThreatData(),
    
  getThreatAlerts: (): Promise<ThreatAlert[]> =>
    mockApiService.getThreatAlerts(),
  
  updateRule: (ruleId: string, status: 'active' | 'inactive'): Promise<DetectionRule> => {
    console.log(`Updating rule ${ruleId} to ${status}`);
    return Promise.resolve({
      id: ruleId,
      name: "Updated Rule",
      description: "Rule status updated",
      status,
      triggered: 0,
      accuracy: 95
    });
  },
};

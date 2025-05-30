
import { apiClient } from './api';

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
    apiClient.get('/threat-detection/types'),
  
  getHourlyData: (): Promise<HourlyThreatData[]> => 
    apiClient.get('/threat-detection/hourly'),
  
  getDetectionRules: (): Promise<DetectionRule[]> => 
    apiClient.get('/threat-detection/rules'),
  
  updateRule: (ruleId: string, status: 'active' | 'inactive'): Promise<DetectionRule> => 
    apiClient.put(`/threat-detection/rules/${ruleId}`, { status }),
};

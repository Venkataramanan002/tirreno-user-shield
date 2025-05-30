
import { apiClient } from './api';

export interface UserBehaviorMetrics {
  avgSessionDuration: string;
  pageViewsPerSession: string;
  bounceRate: string;
  suspiciousPatterns: string;
  sessionDurationTrend: string;
  pageViewsTrend: string;
  bounceRateTrend: string;
  suspiciousPatternsTrend: string;
}

export interface SessionDataPoint {
  time: string;
  sessions: number;
  anomalies: number;
}

export interface UserProfile {
  id: string;
  email: string;
  riskScore: number;
  status: 'normal' | 'warning' | 'suspicious';
  location: string;
  device: string;
  lastActivity: string;
  anomalies: string[];
}

export const userBehaviorApi = {
  getMetrics: (): Promise<UserBehaviorMetrics> => 
    apiClient.get('/user-behavior/metrics'),
  
  getSessionData: (): Promise<SessionDataPoint[]> => 
    apiClient.get('/user-behavior/sessions'),
  
  getUsers: (search?: string): Promise<UserProfile[]> => 
    apiClient.get(`/user-behavior/users${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  
  getUserById: (userId: string): Promise<UserProfile> => 
    apiClient.get(`/user-behavior/users/${userId}`),
};

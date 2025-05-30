
import { mockApiService } from './mockApiService';

export interface UserBehaviorMetrics {
  averageSessionDuration: string;
  pageViewsPerSession: number;
  bounceRate: string;
  suspiciousPatterns: number;
}

export interface SessionData {
  time: string;
  sessions: number;
  anomalies: number;
}

export interface User {
  id: string;
  email: string;
  riskScore: number;
  status: 'normal' | 'suspicious' | 'blocked';
  location: string;
  device: string;
  lastActivity: string;
  anomalies: string[];
}

export const userBehaviorApi = {
  getMetrics: (): Promise<UserBehaviorMetrics> => 
    mockApiService.getUserBehaviorMetrics(),
  
  getSessionData: (): Promise<SessionData[]> => 
    mockApiService.getSessionData(),
  
  getUsers: (searchTerm?: string): Promise<User[]> => 
    mockApiService.getUsers(searchTerm),
};

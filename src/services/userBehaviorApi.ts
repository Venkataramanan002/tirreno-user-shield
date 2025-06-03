
import { mockApiService } from './mockApiService';

export interface User {
  id: string;
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

export const userBehaviorApi = {
  getMetrics: async (): Promise<UserMetrics> => {
    return mockApiService.getUserMetrics();
  },

  getSessionData: async (): Promise<SessionData[]> => {
    return mockApiService.getSessionData();
  },

  getUsers: async (searchTerm?: string): Promise<User[]> => {
    const users = await mockApiService.getUsers();
    
    // Transform the data to match the User interface
    const transformedUsers: User[] = users.map(user => ({
      id: user.userId || user.id || 'unknown',
      email: user.email,
      deviceType: user.deviceType,
      ipAddress: user.ipAddress,
      location: user.location,
      deviceFingerprint: user.deviceFingerprint,
      sessionStart: user.sessionStart,
      riskScore: user.riskScore,
      status: user.status as 'normal' | 'suspicious' | 'high-risk',
      anomalies: user.anomalies,
      activityLevel: user.activityLevel as 'low' | 'medium' | 'high' | undefined,
      lastActivity: user.lastActivity
    }));

    if (searchTerm) {
      return transformedUsers.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return transformedUsers;
  },
};

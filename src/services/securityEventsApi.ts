
import { apiClient } from './api';

export interface SecurityEvent {
  id: string;
  timestamp: string;
  type: string;
  severity: 'high' | 'medium' | 'low';
  user: string;
  ip: string;
  location: string;
  description: string;
  status: 'blocked' | 'flagged' | 'investigating' | 'monitoring';
  riskScore: number;
}

export interface EventFilters {
  search?: string;
  severity?: 'all' | 'high' | 'medium' | 'low';
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export const securityEventsApi = {
  getEvents: (filters?: EventFilters): Promise<SecurityEvent[]> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.severity && filters.severity !== 'all') params.append('severity', filters.severity);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.dateRange) {
      params.append('startDate', filters.dateRange.start);
      params.append('endDate', filters.dateRange.end);
    }
    
    return apiClient.get(`/security-events${params.toString() ? `?${params.toString()}` : ''}`);
  },
  
  getEventById: (eventId: string): Promise<SecurityEvent> => 
    apiClient.get(`/security-events/${eventId}`),
  
  updateEventStatus: (eventId: string, status: string): Promise<SecurityEvent> => 
    apiClient.put(`/security-events/${eventId}/status`, { status }),
};

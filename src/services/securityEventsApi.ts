
import { mockApiService } from './mockApiService';

export interface SecurityEvent {
  id: string;
  timestamp: string;
  source: string;
  event: string;
  description: string;
  severity: 'high' | 'medium' | 'low' | 'critical';
  user: string;
  ipAddress: string;
  location: string;
}

export interface EventFilters {
  search?: string;
  severity?: 'all' | 'high' | 'medium' | 'low' | 'critical';
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export const securityEventsApi = {
  getEvents: (filters?: EventFilters): Promise<SecurityEvent[]> => {
    return mockApiService.getSecurityEvents();
  },
  
  getEventById: (eventId: string): Promise<SecurityEvent> => {
    return mockApiService.getSecurityEvents().then(events => 
      events.find(e => e.id === eventId) || events[0]
    );
  },
  
  updateEventStatus: (eventId: string, status: string): Promise<SecurityEvent> => {
    console.log(`Updating event ${eventId} status to ${status}`);
    return mockApiService.getSecurityEvents().then(events => events[0]);
  },
};

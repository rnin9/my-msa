import { EventType } from '@shared/enum/event.enum';

export interface Event {
  name: string;
  description: string;
  eventType: EventType;
  actantId: string;
  condition?: Record<string, any>;
  startDate: string;
  endDate?: string;
  isEnabled?: boolean;
}

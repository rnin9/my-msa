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

export type EventCondition =
  | AttendanceCondition
  | ReferralCondition
  | CouponCondition
  | SpecialCondition;

export interface BaseCondition {
  eventType: EventType;
}

export interface AttendanceCondition extends BaseCondition {
  eventType: EventType.Attendance;
  conditionType: 'consecutive' | 'total'; // 연속 또는 누적
  requiredDays: number;
}

export interface ReferralCondition extends BaseCondition {
  eventType: EventType.Referral;
  requiredReferrals: number;
}

export interface CouponCondition extends BaseCondition {
  eventType: EventType.Coupon;
  requiredCouponCode: string;
}

export interface SpecialCondition extends BaseCondition {
  eventType: EventType.Special;
  // 조건 없음
}

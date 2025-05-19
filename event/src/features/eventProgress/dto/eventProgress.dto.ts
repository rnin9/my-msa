import { EventType } from '@shared/enum/event.enum';

export interface BaseProgress {
  eventId: string;
  userId: string;
  isCompleted?: boolean;
  rewardClaimed?: boolean;
}

export interface ReferralProgress extends BaseProgress {
  eventType: EventType.Referral;
  referralCount: number;
  referralUserIds: Array<string>;
}

export interface CouponProgress extends BaseProgress {
  eventType: EventType.Coupon;
  couponCode: string;
  couponExpiry: string;
  isUsed: boolean;
}

export interface AttendanceProgress extends BaseProgress {
  eventType: EventType.Attendance;
  attendanceDates: string[];
  consecutiveDays: number;
}

export interface SpecialProgress extends BaseProgress {
  eventType: EventType.Special;
  achieved: boolean;
}

export type EventProgressPayload =
  | ReferralProgress
  | CouponProgress
  | AttendanceProgress
  | SpecialProgress;

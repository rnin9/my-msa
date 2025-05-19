import {
  AttendanceProgress,
  CouponProgress,
  EventProgressPayload,
  ReferralProgress,
  SpecialProgress,
} from '@eventProgress/dto/eventProgress.dto';
import { Event } from '@events/schemas/event.schema';
import { EventType } from '@shared/enum/event.enum';
import { EventConditionEvaluator } from '@eventProgress/utils/event-progress-evaluator';

export class EventProgressUpdater {
  static update(
    event: Event,
    current: EventProgressPayload,
    incoming: EventProgressPayload,
  ): EventProgressPayload {
    if (current.eventType !== event.type) return incoming;

    switch (event.type) {
      case EventType.Attendance:
        return this.updateAttendance(current as AttendanceProgress, incoming);
      case EventType.Referral:
        return this.updateReferral(current as ReferralProgress, incoming);
      case EventType.Coupon:
        return this.updateCoupon(current as CouponProgress, incoming);
      case EventType.Special:
        return { ...(current as SpecialProgress), achieved: true };
      default:
        return incoming;
    }
  }

  private static updateAttendance(
    current: AttendanceProgress,
    incoming: EventProgressPayload,
  ): AttendanceProgress {
    const date =
      'date' in incoming && typeof incoming.date === 'string'
        ? incoming.date
        : '';
    const attendanceDates = current.attendanceDates ?? [];

    if (date && !attendanceDates.includes(date)) {
      attendanceDates.push(date);
      attendanceDates.sort();
    }

    return {
      ...current,
      attendanceDates,
      consecutiveDays:
        EventConditionEvaluator['calculateConsecutiveDays'](attendanceDates),
    };
  }

  private static updateReferral(
    current: ReferralProgress,
    incoming: EventProgressPayload,
  ): ReferralProgress {
    const userId =
      'userId' in incoming && typeof incoming.userId === 'string'
        ? incoming.userId
        : undefined;

    const referralUserIds = current.referralUserIds ?? [];

    if (!userId || referralUserIds.includes(userId)) {
      return current;
    }

    return {
      ...current,
      referralCount: (current.referralCount ?? 0) + 1,
      referralUserIds: [...referralUserIds, userId],
    };
  }

  private static updateCoupon(
    current: CouponProgress,
    incoming: EventProgressPayload,
  ): CouponProgress {
    const code =
      'couponCode' in incoming && typeof incoming.couponCode === 'string'
        ? incoming.couponCode
        : undefined;

    if (code) {
      return {
        ...current,
        couponCode: code,
        isUsed: true,
      };
    }

    return current;
  }
}

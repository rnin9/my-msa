import {
  EventProgressPayload,
  AttendanceProgress,
  ReferralProgress,
  CouponProgress,
} from '@eventProgress/dto/eventProgress.dto';
import { EventCondition } from '@events/dto/event.dto';
import { EventType } from '@shared/enum/event.enum';

export class EventConditionEvaluator {
  static isCompleted(
    progress: EventProgressPayload,
    condition: EventCondition,
  ): boolean {
    if (progress.eventType !== condition.eventType) return false;

    switch (condition.eventType) {
      case EventType.Attendance: {
        const attendance = progress as AttendanceProgress;
        const dates = attendance.attendanceDates ?? [];

        if (condition.conditionType === 'consecutive') {
          const consecutive = this.calculateConsecutiveDays(dates);
          return consecutive >= condition.requiredDays;
        } else {
          return dates.length >= condition.requiredDays;
        }
      }

      case EventType.Referral: {
        const referral = progress as ReferralProgress;
        return (referral.referralCount ?? 0) >= condition.requiredReferrals;
      }

      case EventType.Coupon: {
        const coupon = progress as CouponProgress;
        return (
          coupon.couponCode === condition.requiredCouponCode &&
          coupon.isUsed === true
        );
      }

      case EventType.Special:
        return (progress as any).achieved === true;

      default:
        return false;
    }
  }

  private static calculateConsecutiveDays(dates: string[]): number {
    if (dates.length === 0) return 0;

    const sorted = dates
      .map((d) => new Date(d))
      .sort((a, b) => a.getTime() - b.getTime());

    let maxStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < sorted.length; i++) {
      const diff =
        (sorted[i].getTime() - sorted[i - 1].getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else if (diff > 1) {
        currentStreak = 1;
      }
    }

    return maxStreak;
  }
}

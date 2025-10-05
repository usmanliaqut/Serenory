export interface AnalyticsEvent {
  id: string;
  event: 'view_pricing' | 'start_booking' | 'booking_initiated' | 'purchase_complete';
  timestamp: Date;
  sessionId?: string;
  metadata?: {
    sessionType?: string;
    price?: number;
    duration?: string;
    paymentMethod?: string;
  };
}

export interface AnalyticsData {
  totalEvents: number;
  viewPricing: number;
  startBooking: number;
  bookingInitiated: number;
  purchaseComplete: number;
  conversionRate: number;
  recentEvents: AnalyticsEvent[];
}
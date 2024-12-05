export class CreateMetricsDto {
    metric_type_id: string;  // ID de MetricTypes
    booking_metrics: {
    total_bookings: number;
    cancelled_bookings: number;
    completed_bookings: number;
    };
    visits_metrics: {
    total_visits: number;
    average_duration: string;
    };
    time_metrics: {
    session_starts: Date;
    session_ends: Date;
    session_duration: string;
    };
    search_metrics: {
    total_searches: number;
    searches_per_user: number;
    non_user_searches: number;
    };
}
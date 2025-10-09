import ScheduleCalendar from "@/components/ScheduleCalendar";
import { getBookings } from "@/lib/queries/getBookings";

export const revalidate = 30;

export default async function SchedulePage() {
  const { bookings } = await getBookings({ page: 1, limit: 100 }); // or fetch all

  // Convert bookings into calendar events
  const events = bookings.map((b: any) => ({
    id: b.id,
    title: `${b.user?.name || b.user?.email} - ${b.type || "Session"}`,
    start: new Date(b.time),
    end: new Date(new Date(b.time).getTime() + 60 * 60 * 1000), // assume 1-hour session
    status: b.status,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white p-6 md:p-10">
      <div className="mx-auto space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-2">Schedule</h1>
          <p className="text-muted-foreground">
            View and manage all your upcoming bookings in a calendar
          </p>
        </header>
        <ScheduleCalendar events={events} />
      </div>
    </div>
  );
}

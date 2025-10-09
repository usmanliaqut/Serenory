"use client";

import { useMemo, useState } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  type View,
  type ToolbarProps,
  type Formats,
  type DateRange,
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { startOfDay, endOfDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type CalEvent = {
  title: string;
  start: Date;
  end: Date;
  status?: "scheduled" | "pending" | "completed";
  description?: string;
  link?: string;
};

export default function ScheduleCalendar({ events }: { events: CalEvent[] }) {
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);

  const formats: Formats = {
    dayHeaderFormat: (date: Date, culture?: string, localizer?: any): string =>
      localizer?.format(date, "EEE dd MMM", culture) ?? "",

    dayRangeHeaderFormat: (
      range: DateRange,
      culture?: string,
      localizer?: any
    ): string =>
      `${localizer?.format(
        range.start,
        "MMM dd",
        culture
      )} – ${localizer?.format(range.end, "MMM dd", culture)}`,

    timeGutterFormat: (date: Date, culture?: string, localizer?: any): string =>
      localizer?.format(date, "h:mm a", culture) ?? "",

    eventTimeRangeFormat: (
      range: DateRange,
      culture?: string,
      localizer?: any
    ): string =>
      `${localizer?.format(
        range.start,
        "h:mm a",
        culture
      )} – ${localizer?.format(range.end, "h:mm a", culture)}`,
  };

  const eventClassGetter = (event: CalEvent) => {
    const statusClass =
      event.status === "pending"
        ? "is-pending"
        : event.status === "completed"
        ? "is-completed"
        : "is-scheduled";
    return {
      className: statusClass,
      style: {
        // Keep inline minimal; main look is in styled-jsx below
        cursor: "pointer",
      },
    };
  };

  const handleSelectEvent = (event: CalEvent) => setSelectedEvent(event);

  // Constrain common working hours for a cleaner view; adjust as needed
  const min = useMemo(
    () =>
      startOfDay(new Date()).setHours(8, 0, 0, 0) &&
      new Date(new Date().setHours(8, 0, 0, 0)),
    []
  );
  const max = useMemo(
    () =>
      endOfDay(new Date()).setHours(19, 0, 0, 0) &&
      new Date(new Date().setHours(19, 0, 0, 0)),
    []
  );

  return (
    <Card className="p-4 bg-background/70 backdrop-blur-sm border border-border/60 calendar-skin">
      {/* Top row: Title + Legend */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-balance">Schedule</h2>
        <div className="flex items-center gap-2">
          <LegendDot label="Scheduled" className="bg-[hsl(var(--primary))]" />
          <LegendDot label="Pending" className="bg-[#f59e0b]" />
          <LegendDot label="Completed" className="bg-[#3b82f6]" />
        </div>
      </div>

      <BigCalendar
        localizer={localizer}
        defaultView="week"
        views={["month", "week", "day"]}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "75vh" }}
        components={{
          toolbar: CustomToolbar,
          event: EventChip,
        }}
        formats={formats}
        step={30}
        timeslots={2}
        showMultiDayTimes
        popup
        tooltipAccessor="title"
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventClassGetter}
        min={min}
        max={max}
      />

      {/* Modal Popup */}
      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent className="sm:max-w-md">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-pretty">
                  {selectedEvent.title}
                </DialogTitle>
                <DialogDescription>
                  {format(selectedEvent.start, "EEEE, MMM d, yyyy")} ·{" "}
                  {format(selectedEvent.start, "h:mm a")} –{" "}
                  {format(selectedEvent.end, "h:mm a")}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-medium text-sm text-muted-foreground">
                    Status
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize",
                      selectedEvent.status === "pending"
                        ? "bg-[#fef3c7] text-[#92400e] border-[#f59e0b]/30"
                        : selectedEvent.status === "completed"
                        ? "bg-[#dbeafe] text-[#1e3a8a] border-[#3b82f6]/30"
                        : "bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.25)]"
                    )}
                  >
                    {selectedEvent.status ?? "scheduled"}
                  </Badge>
                </div>

                {selectedEvent.description && (
                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.description}
                  </p>
                )}

                {selectedEvent.link && (
                  <div className="pt-1">
                    <Button asChild size="sm">
                      <a
                        href={selectedEvent.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open meeting link
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Global overrides scoped to this calendar */}
      <style jsx global>{`
        .calendar-skin {
          --cal-grid: hsl(var(--border));
          --cal-bg: hsl(var(--background));
          --cal-muted: hsl(var(--muted));
          --cal-muted-fg: hsl(var(--muted-foreground));
          --cal-fg: hsl(var(--foreground));
          --cal-brand: hsl(var(--primary));
          --status-pending: #f59e0b; /* accent 1 */
          --status-completed: #3b82f6; /* accent 2 */
        }

        /* Hide default toolbar – replaced with CustomToolbar */
        .calendar-skin .rbc-toolbar {
          display: none;
        }

        /* Grid + headers */
        .calendar-skin .rbc-time-view,
        .calendar-skin .rbc-month-view {
          background: var(--cal-bg);
          border-color: var(--cal-grid);
        }
        .calendar-skin .rbc-time-header,
        .calendar-skin .rbc-time-content,
        .calendar-skin .rbc-month-row,
        .calendar-skin .rbc-day-bg,
        .calendar-skin .rbc-row {
          border-color: var(--cal-grid);
        }
        .calendar-skin .rbc-header {
          padding: 0.5rem 0.25rem;
          font-weight: 600;
          color: var(--cal-muted-fg);
          border-color: var(--cal-grid);
          background: color-mix(
            in oklab,
            var(--cal-bg) 85%,
            var(--cal-muted) 15%
          );
        }
        .calendar-skin .rbc-time-gutter .rbc-timeslot-group {
          color: var(--cal-muted-fg);
        }

        /* Today highlight */
        .calendar-skin .rbc-today {
          background: color-mix(
            in oklab,
            var(--cal-bg) 80%,
            var(--cal-muted) 20%
          );
        }

        /* Current time indicator */
        .calendar-skin .rbc-current-time-indicator {
          background: var(--cal-brand);
          height: 2px;
        }

        /* Event chips */
        .calendar-skin .rbc-event {
          background: color-mix(
            in oklab,
            var(--cal-brand) 18%,
            var(--cal-bg) 82%
          );
          color: var(--cal-fg);
          border-radius: 10px;
          border: 1px solid
            color-mix(in oklab, var(--cal-brand) 30%, var(--cal-bg) 70%);
          padding: 2px 6px 2px 8px;
          box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
          transition: box-shadow 0.2s ease, transform 0.1s ease;
          position: relative;
          overflow: hidden;
        }
        .calendar-skin .rbc-event:hover {
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        }

        /* Status accent via left border color */
        .calendar-skin .rbc-event.is-pending {
          border-left: 4px solid var(--status-pending);
        }
        .calendar-skin .rbc-event.is-completed {
          border-left: 4px solid var(--status-completed);
          opacity: 0.95;
        }
        .calendar-skin .rbc-event.is-scheduled {
          border-left: 4px solid var(--cal-brand);
        }

        /* Month view event pills */
        .calendar-skin .rbc-month-view .rbc-event {
          border-radius: 8px;
          padding: 1px 6px;
        }

        /* Selection + background slots */
        .calendar-skin .rbc-slot-selection {
          background: color-mix(
            in oklab,
            var(--cal-brand) 12%,
            transparent 88%
          );
          border: 1px dashed
            color-mix(in oklab, var(--cal-brand) 40%, var(--cal-bg) 60%);
        }
      `}</style>
    </Card>
  );
}

/* --------- Custom subcomponents ---------- */

function LegendDot({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className={cn("inline-block size-2.5 rounded-full", className)} />
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}

function CustomToolbar<TDate extends Date>(props: ToolbarProps<TDate>) {
  const { label, onNavigate, onView, view } = props;

  const setView = (v: View) => () => onView?.(v);

  return (
    <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate?.("TODAY")}
        >
          Today
        </Button>
        <div className="flex items-center rounded-md border border-border overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate?.("PREV")}
            aria-label="Previous period"
          >
            &#x276E;
          </Button>
          <div className="px-3 text-sm font-medium text-pretty">{label}</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate?.("NEXT")}
            aria-label="Next period"
          >
            &#x276F;
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant={view === "month" ? "default" : "outline"}
          onClick={setView("month")}
          aria-pressed={view === "month"}
        >
          Month
        </Button>
        <Button
          size="sm"
          variant={view === "week" ? "default" : "outline"}
          onClick={setView("week")}
          aria-pressed={view === "week"}
        >
          Week
        </Button>
        <Button
          size="sm"
          variant={view === "day" ? "default" : "outline"}
          onClick={setView("day")}
          aria-pressed={view === "day"}
        >
          Day
        </Button>
      </div>
    </div>
  );
}

function EventChip({ event }: { event: CalEvent }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      {/* small colored dot mirrors the left border */}
      <span
        className={cn(
          "inline-block size-2.5 rounded-full shrink-0",
          event.status === "pending"
            ? "bg-[#f59e0b]"
            : event.status === "completed"
            ? "bg-[#3b82f6]"
            : "bg-[hsl(var(--primary))]"
        )}
        aria-hidden
      />
      <div className="min-w-0 leading-tight">
        <div className="truncate text-xs font-medium">{event.title}</div>
      </div>
    </div>
  );
}

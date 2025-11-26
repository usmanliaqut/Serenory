"use client";

import {
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  Download,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Line } from "recharts";
import Link from "next/link";

interface BookingDetails {
  expertName: string;
  expertTitle: string;
  date: string; // e.g. "Feb 14, 2025"
  time: string; // e.g. "2:30 PM"
  duration: string; // e.g. "30 minutes"
  confirmationId: string;
}

interface BookingSuccessContentProps {
  bookingDetails: BookingDetails;
}

export function BookingSuccessContent({
  bookingDetails,
}: BookingSuccessContentProps) {
  // ---------------------
  // ADD TO CALENDAR LOGIC
  // ---------------------
  const addToCalendar = () => {
    const startDate = new Date(`${bookingDetails.date} ${bookingDetails.time}`);

    if (isNaN(startDate.getTime())) {
      console.error(
        "Invalid date/time:",
        bookingDetails.date,
        bookingDetails.time
      );
      alert("Invalid date or time");
      return;
    }

    const durationMap: Record<string, number> = {
      "15 minutes": 15,
      "30 minutes": 30,
      "60 minutes": 60,
      "Quiet Continuation": 60,
      Drift: 60,
      "$30/ 75 mins": 75,
      "Deep Presence": 90,
      "$45/ 90 mins": 90,
    };

    let durationInMinutes = durationMap[bookingDetails.duration] || 60;

    const endDate = new Date(
      startDate.getTime() + durationInMinutes * 60 * 1000
    );

    const formatICS = (date: Date) =>
      date.toISOString().replace(/-|:|\.\d+/g, "");

    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourApp//EN
BEGIN:VEVENT
UID:${bookingDetails.confirmationId}@yourapp.com
DTSTAMP:${formatICS(startDate)}
DTSTART:${formatICS(startDate)}
DTEND:${formatICS(endDate)}
SUMMARY:Session with ${bookingDetails.expertName}
DESCRIPTION:${bookingDetails.expertTitle}
LOCATION:Online Meeting
END:VEVENT
END:VCALENDAR
`.trim();

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `booking-${bookingDetails.confirmationId}.ics`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Icon */}
        <div className={`flex justify-center mb-8 transition-all duration-700`}>
          <div className="relative">
            <div className="absolute inset-0 bg-success/20 rounded-full blur-2xl animate-pulse" />
            <CheckCircle2
              className="w-24 h-24 text-success relative z-10"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <Card className={`border-0 shadow-2xl transition-all duration-700`}>
          <CardContent className="p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Booking Confirmed!
              </h1>
              <p className="text-muted-foreground text-lg">
                Your 1-on-1 conversation has been successfully scheduled.
              </p>
            </div>

            <Separator className="mb-8" />

            {/* Booking Details */}
            <div className="space-y-6 mb-8">
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                  Session Details
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {bookingDetails.date}
                      </p>
                      <p className="text-sm text-muted-foreground">Date</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {bookingDetails.time}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {bookingDetails.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                      <Video className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">
                        {bookingDetails.expertName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {bookingDetails.expertTitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Confirmation ID
                </p>
                <p className="font-mono text-sm font-medium text-foreground">
                  {bookingDetails.confirmationId}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full h-12 text-base"
                size="lg"
                onClick={addToCalendar}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Add to Calendar
              </Button>
            </div>

            <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground text-center">
                You'll receive a reminder email 24 hours before your session.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className={`text-center mt-8`}>
          <Button
            variant="link"
            className="text-foreground/70 hover:text-foreground"
          >
            <Link href={"/"}>Return to Dashboard →</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

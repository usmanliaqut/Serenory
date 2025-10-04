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
import { useState, useEffect } from "react";

interface BookingDetails {
  expertName: string;
  expertTitle: string;
  date: string;
  time: string;
  duration: string;
  confirmationId: string;
}

interface BookingSuccessContentProps {
  bookingDetails: BookingDetails;
}

export function BookingSuccessContent({
  bookingDetails,
}: BookingSuccessContentProps) {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Icon with Animation */}
        <div
          className={`flex justify-center mb-8 transition-all duration-700 ${"opacity-0 scale-50"}`}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-success/20 rounded-full blur-2xl animate-pulse" />
            <CheckCircle2
              className="w-24 h-24 text-success relative z-10"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Main Content Card */}
        <Card
          className={`border-0 shadow-2xl transition-all duration-700 delay-150 ${"opacity-0 translate-y-8"}`}
        >
          <CardContent className="p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
                Booking Confirmed!
              </h1>
              <p className="text-muted-foreground text-lg text-pretty">
                Your 1-on-1 conversation has been successfully scheduled. We've
                sent a confirmation email with all the details.
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
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
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
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
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
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <Video className="w-5 h-5 text-success" />
                    </div>
                    <div className="flex-1">
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
              <Button className="w-full h-12 text-base" size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                Add to Calendar
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-11 bg-transparent"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  className="h-11 bg-transparent"
                  size="lg"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Details
                </Button>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground text-center text-pretty">
                You'll receive a reminder email 24 hours before your session.
                The meeting link will be included in your confirmation email.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Link */}
        <div
          className={`text-center mt-8 transition-all duration-700 delay-300 ${"opacity-0"}`}
        >
          <Button
            variant="link"
            className="text-foreground/70 hover:text-foreground"
          >
            Return to Dashboard →
          </Button>
        </div>
      </div>
    </div>
  );
}

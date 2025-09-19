"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"

interface TimeSlot {
  time: string
  available: boolean
  therapist: string
}

interface DaySchedule {
  date: string
  day: string
  slots: TimeSlot[]
}

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)

  // Mock data for available slots
  const schedule: DaySchedule[] = [
    {
      date: "2024-01-15",
      day: "Mon",
      slots: [
        { time: "9:00 AM", available: true, therapist: "Dr. Sarah Johnson" },
        { time: "10:00 AM", available: false, therapist: "Dr. Sarah Johnson" },
        { time: "2:00 PM", available: true, therapist: "Dr. Michael Chen" },
        { time: "3:00 PM", available: true, therapist: "Dr. Emily Rodriguez" },
      ],
    },
    {
      date: "2024-01-16",
      day: "Tue",
      slots: [
        { time: "11:00 AM", available: true, therapist: "Dr. Sarah Johnson" },
        { time: "1:00 PM", available: true, therapist: "Dr. Michael Chen" },
        { time: "4:00 PM", available: true, therapist: "Dr. Emily Rodriguez" },
      ],
    },
    {
      date: "2024-01-17",
      day: "Wed",
      slots: [
        { time: "9:00 AM", available: true, therapist: "Dr. Michael Chen" },
        { time: "10:00 AM", available: true, therapist: "Dr. Sarah Johnson" },
        { time: "3:00 PM", available: false, therapist: "Dr. Emily Rodriguez" },
        { time: "5:00 PM", available: true, therapist: "Dr. Emily Rodriguez" },
      ],
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Book Your Session</h1>
        <p className="text-muted-foreground">Select a date and time that works best for you.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar Selection */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Available Dates
          </h2>
          <div className="space-y-4">
            {schedule.map((day) => (
              <Card
                key={day.date}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedDate === day.date ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => setSelectedDate(day.date)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{day.day}</CardTitle>
                      <CardDescription>{new Date(day.date).toLocaleDateString()}</CardDescription>
                    </div>
                    <Badge variant="secondary">{day.slots.filter((slot) => slot.available).length} available</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Available Times
          </h2>

          {selectedDate ? (
            <div className="space-y-3">
              {schedule
                .find((day) => day.date === selectedDate)
                ?.slots.map((slot, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all ${
                      !slot.available
                        ? "opacity-50 cursor-not-allowed"
                        : selectedSlot === slot
                          ? "border-primary bg-primary/5"
                          : "border-border hover:shadow-md"
                    }`}
                    onClick={() => slot.available && setSelectedSlot(slot)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground">{slot.time}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {slot.therapist}
                          </div>
                        </div>
                        <Badge variant={slot.available ? "default" : "secondary"}>
                          {slot.available ? "Available" : "Booked"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a date to view available time slots</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Booking Summary */}
      {selectedDate && selectedSlot && (
        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <div className="text-sm text-muted-foreground">Date</div>
                <div className="font-medium">{new Date(selectedDate).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Time</div>
                <div className="font-medium">{selectedSlot.time}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Therapist</div>
                <div className="font-medium">{selectedSlot.therapist}</div>
              </div>
            </div>
            <Button size="lg" className="w-full">
              Confirm Booking
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

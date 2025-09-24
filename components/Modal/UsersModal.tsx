"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Mail, User } from "lucide-react";
import { PaymentPage } from "./PaymentPage";

interface TimeSlotDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: {
    id: number;
    title: string;
    duration: string;
    price: number;
  } | null;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const dates = [
  { date: "2024-01-15", day: "Mon", dayNum: "15" },
  { date: "2024-01-16", day: "Tue", dayNum: "16" },
  { date: "2024-01-17", day: "Wed", dayNum: "17" },
  { date: "2024-01-18", day: "Thu", dayNum: "18" },
  { date: "2024-01-19", day: "Fri", dayNum: "19" },
  { date: "2024-01-22", day: "Mon", dayNum: "22" },
  { date: "2024-01-23", day: "Tue", dayNum: "23" },
];

const moods = [
  "😊 Happy",
  "👋 Just need company",
  "😌 Calm but want to talk",
  "😴 Tired",
  "😢 Sad",
  "😟 Anxious",
  "💭 Heavy",
];

export function TimeSlotDrawer({
  open,
  onOpenChange,
  session,
}: TimeSlotDrawerProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [mood, setMood] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [showPayment, setShowPayment] = useState(false);

  if (!session) return null;

  const handleProceedToPay = () => {
    if (selectedDate && selectedTime && mood && email) {
      setShowPayment(true);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-3xl overflow-y-auto bg-gradient-to-b from-white to-gray-50 p-6">
        {!showPayment ? (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-lg font-bold text-gray-800">
                <Calendar className="h-5 w-5 text-emerald-500" />
                Book Your Session
              </SheetTitle>
              <SheetDescription className="text-gray-600">
                Fill out your details to confirm your{" "}
                <span className="font-medium text-gray-900">
                  {session.title}
                </span>
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-8">
              {/* Session Info */}
              <Card className="shadow-md border border-gray-200 hover-lift">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-900">
                    {session.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-emerald-500" />
                    <span>{session.duration}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 text-white border-none px-4 py-1 rounded-md shadow-sm"
                  >
                    ${session.price}
                  </Badge>
                </CardContent>
              </Card>

              {/* Date Selection */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                  Select Date
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {dates.map((dateObj) => (
                    <button
                      key={dateObj.date}
                      onClick={() => setSelectedDate(dateObj.date)}
                      className={`p-3 rounded-xl text-center text-sm font-medium transition-all duration-200 border ${
                        selectedDate === dateObj.date
                          ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-md scale-105"
                          : "bg-white hover:bg-gray-100 text-gray-700 border-gray-200"
                      }`}
                    >
                      <div className="text-xs opacity-70">{dateObj.day}</div>
                      <div className="text-base font-bold">
                        {dateObj.dayNum}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                    Select Time
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg text-center text-sm font-medium transition-all duration-200 border ${
                          selectedTime === time
                            ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-md scale-105"
                            : "bg-white hover:bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mood Checker */}
              {selectedDate && selectedTime && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                    How are you feeling?
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {moods.map((option) => (
                      <button
                        key={option}
                        onClick={() => setMood(option)}
                        className={`p-3 rounded-lg text-center text-sm font-medium transition-all duration-200 border ${
                          mood === option
                            ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-md scale-105"
                            : "bg-white hover:bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* User Info */}
              {mood && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                    Your Details
                  </h3>
                  <div className="space-y-3">
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-lg p-3 pl-10"
                        disabled={anonymous}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={anonymous}
                        onChange={(e) => {
                          setAnonymous(e.target.checked);
                          if (e.target.checked) setName("");
                        }}
                      />
                      <span className="text-sm text-gray-600">
                        Stay Anonymous
                      </span>
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Your Email (for confirmation)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-lg p-3 pl-10"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Proceed Button */}
              {selectedDate && selectedTime && mood && email && (
                <Button
                  className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-400 text-white text-lg py-6 rounded-xl shadow-lg hover:opacity-90 transition"
                  size="lg"
                  onClick={handleProceedToPay}
                >
                  Proceed to Pay - ${session.price}
                </Button>
              )}
            </div>
          </>
        ) : (
          <PaymentPage
            session={session}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            mood={mood}
            name={anonymous ? "Anonymous" : name}
            email={email}
            onBack={() => setShowPayment(false)}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

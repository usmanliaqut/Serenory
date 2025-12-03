"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Clock,
  Mail,
  User,
  ShieldCheck,
  CreditCard,
  Heart,
  Smile,
  Frown,
  CalendarIcon,
  ChevronDownIcon,
  CloudRain,
} from "lucide-react";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type SessionType = {
  id: number;
  title: string;
  price: number;
  duration: string;
} | null;

interface BookingDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: SessionType;
}

// Utility: generate next 14 days
function getNextDays(count = 14) {
  const days: { date: string; weekday: string; dayNum: string }[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = d.getDate().toString();
    const dateStr = d.toISOString().slice(0, 10); // YYYY-MM-DD
    days.push({ date: dateStr, weekday, dayNum });
  }
  return days;
}

// lucide-react icons are React components that accept SVG props
import type { LucideIcon } from "lucide-react";
import DatePicker from "../DatePicker";
type IconType = LucideIcon;

const FEELINGS: {
  key: "light" | "unsettled" | "low";
  emoji: string;
  label: string;
  Icon: IconType;
}[] = [
  {
    key: "light",
    emoji: "🙂",
    label: "Feeling light — open to a simple conversation",
    Icon: Smile,
  },
  {
    key: "unsettled",
    emoji: "😕",
    label: "A bit unsettled — would like a calm presence",
    Icon: Frown,
  },
  {
    key: "low",
    emoji: "🩶",
    label: "Feeling low — need a quieter, softer space",
    Icon: CloudRain,
  },
];

type FeelingKey = (typeof FEELINGS)[number]["key"];
type PaymentMethod = "stripe" | "paypal";
type DurationKey = "15 mins" | "30 mins" | "60 mins" | "75 mins" | "90 mins";

export function BookingDrawer({
  open,
  onOpenChange,
  session,
}: BookingDrawerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [feeling, setFeeling] = useState<FeelingKey | "">("");
  const [name, setName] = useState<string>("");
  const [anonymous, setAnonymous] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("stripe");
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [customSession, setCustomSession] = useState<{
    duration: string | null;
    price: number | null;
    title: string | null;
    durationText: string | null;
  }>({
    duration: null,
    price: null,
    title: null,
    durationText: null,
  });
  // ✨ Added state to manage the fade transition
  const [isFading, setIsFading] = useState(false);
  const generateTimeSlots = (intervalMinutes = 15) => {
    const slots: string[] = [];
    const pad = (num: number) => num.toString().padStart(2, "0");

    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += intervalMinutes) {
        const period = hour < 12 ? "AM" : "PM";
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        slots.push(`${pad(displayHour)}:${pad(min)} ${period}`);
      }
    }

    return slots;
  };

  const durationOptions: Record<
    DurationKey,
    { price: number; title: string; durationText: string }
  > = {
    "15 mins": { price: 5, title: "Drift", durationText: "15 mins" },
    "30 mins": { price: 10, title: "Anchor", durationText: "30 mins" },
    "60 mins": { price: 20, title: "Haven", durationText: "60 mins" },
    "75 mins": {
      price: 30,
      title: "Quiet Continuation",
      durationText: "75 mins",
    },
    "90 mins": { price: 45, title: "Deep Presence", durationText: "90 mins" },
  };
  const TIME_SLOTS = generateTimeSlots(15);
  const AVAILABLE_SLOTS = [
    "12:00 AM",
    "12:15 AM",
    "12:30 AM",
    "12:45 AM",
    "01:00 AM",
    "01:15 AM",
    "01:30 AM",
    "01:45 AM",
    "02:00 AM",
    "02:15 AM",
    "02:30 AM",
    "02:45 AM",
    "03:00 AM",
    "03:15 AM",
    "03:30 AM",
    "03:45 AM",
    "04:00 AM",
    "04:15 AM",
    "04:30 AM",
    "04:45 AM",
    "05:00 AM",
    "05:15 AM",
    "05:30 AM",
    "05:45 AM",
    "06:00 AM",
    "06:15 AM",
    "06:30 AM",
    "06:45 AM",
    "07:00 AM",
    "07:15 AM",
    "07:30 AM",
    "07:45 AM",
    "08:00 AM",
    "08:15 AM",
    "08:30 AM",
    "08:45 AM",
    "09:00 AM",
    "09:15 AM",
    "09:30 AM",
    "09:45 AM",
    "10:00 AM",
    "10:15 AM",
    "10:30 AM",
    "10:45 AM",
    "11:00 AM",
    "11:15 AM",
    "11:30 AM",
    "11:45 AM",
    "12:00 PM",
    "12:15 PM",
    "12:30 PM",
    "12:45 PM",
    "01:00 PM",
    "01:15 PM",
    "01:30 PM",
    "01:45 PM",
    "02:00 PM",
    "02:15 PM",
    "02:30 PM",
    "02:45 PM",
    "03:00 PM",
    "03:15 PM",
    "03:30 PM",
    "03:45 PM",
    "04:00 PM",
    "04:15 PM",
    "04:30 PM",
    "04:45 PM",
    "05:00 PM",
    "05:15 PM",
    "05:30 PM",
    "05:45 PM",
    "06:00 PM",
    "06:15 PM",
    "06:30 PM",
    "06:45 PM",
    "07:00 PM",
    "07:15 PM",
    "07:30 PM",
    "07:45 PM",
    "08:00 PM",
    "08:15 PM",
    "08:30 PM",
    "08:45 PM",
    "09:00 PM",
    "09:15 PM",
    "09:30 PM",
    "09:45 PM",
    "10:00 PM",
    "10:15 PM",
    "10:30 PM",
    "10:45 PM",
    "11:00 PM",
    "11:15 PM",
    "11:30 PM",
    "11:45 PM",
  ];
  const days = useMemo(() => getNextDays(14), []);

  const isEmailValid = useMemo(() => {
    if (!email) return false;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }, [email]);

  const canSubmit =
    !!session && !!selectedDate && !!selectedTime && !!feeling && isEmailValid;
  const canProceedDetails = canSubmit;

  const formatDateLongUpdate = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  // State for available slots (computed from the server response)
  const [availableSlots, setAvailableSlots] =
    useState<string[]>(AVAILABLE_SLOTS);

  // Fetch availability only when the selected date changes (no polling)
  useEffect(() => {
    if (!selectedDate) {
      setAvailableSlots([]);
      return;
    }

    let cancelled = false;

    const fetchAvailabilityOnce = async () => {
      try {
        const dateStr = selectedDate.toISOString().slice(0, 10); // YYYY-MM-DD
        console.log(
          `[AVAIL][client] requesting /api/availability?date=${dateStr}`
        );
        const tzOffset = selectedDate.getTimezoneOffset();
        const res = await fetch(
          `/api/availability?date=${dateStr}&tzOffset=${tzOffset}`
        );
        const data = await res.json();
        console.log("[AVAIL][client] response", {
          status: res.status,
          ok: res.ok,
          data,
        });

        if (cancelled) return;

        const takenISOs: string[] = Array.isArray(data?.taken)
          ? data.taken
          : [];
        const takenMs = new Set(takenISOs.map((s) => new Date(s).getTime()));

        // Helper: convert a TIME_SLOTS label into a timestamp (ms) for the selectedDate in local timezone
        const timeLabelToMs = (label: string) => {
          const [time, modifier] = label.split(" ");
          const [hoursStr, minutesStr] = time.split(":");
          let hours = Number(hoursStr);
          const minutes = Number(minutesStr || 0);
          if (modifier === "PM" && hours < 12) hours += 12;
          if (modifier === "AM" && hours === 12) hours = 0;
          const d = new Date(selectedDate);
          d.setHours(hours, minutes, 0, 0);
          return d.getTime();
        };

        const nowMs = Date.now();
        const isToday = (() => {
          const today = new Date();
          return (
            selectedDate.getFullYear() === today.getFullYear() &&
            selectedDate.getMonth() === today.getMonth() &&
            selectedDate.getDate() === today.getDate()
          );
        })();

        const newAvailable = TIME_SLOTS.filter((label) => {
          const ms = timeLabelToMs(label);
          // Exclude slots that are already taken
          if (takenMs.has(ms)) return false;
          // If the selected date is today, exclude slots that are at or before now
          if (isToday && ms <= nowMs) return false;
          return true;
        });

        setAvailableSlots(newAvailable);

        // If the currently selected time is no longer available, clear it
        if (selectedTime && !newAvailable.includes(selectedTime)) {
          setSelectedTime("");
        }
      } catch (err) {
        console.error("[AVAIL][client] fetch error", err);
      }
    };

    fetchAvailabilityOnce();

    return () => {
      cancelled = true;
    };
  }, [selectedDate]);

  // ✨ New handler to go to the next step with a fade effect
  const handleNext = () => {
    if (!canProceedDetails) return;
    setIsFading(true);
    setTimeout(() => {
      setStep(2);
      setIsFading(false);
    }, 300); // Duration matches the CSS transition duration
  };

  // ✨ New handler to go to the previous step with a fade effect
  const handleBack = () => {
    setIsFading(true);
    setTimeout(() => {
      setStep(1);
      setIsFading(false);
    }, 300);
  };

  const bookingDuration = session?.duration || customSession.duration;
  const bookingPrice = session?.price || customSession.price;
  const bookingTitle = session?.title || customSession.title;
  const handleConfirmAndPay = async () => {
    if (!canSubmit) return;
    setSubmitting(true);

    try {
      // Combine selectedDate + selectedTime into a proper Date
      const [time, modifier] = selectedTime.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const bookingDate = new Date(selectedDate); // YYYY-MM-DD
      bookingDate.setHours(hours, minutes || 0, 0, 0);

      const bookingTimeISO = bookingDate.toISOString(); // ✅ always valid

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: bookingTitle || "Serenory Session",
                },
                unit_amount: (bookingPrice || 0) * 100,
              },
              quantity: 1,
            },
          ],
          type: session?.title,
          mood: feeling,
          time: bookingTimeISO, // ✅ valid ISO date string
          name,
          anonymous,
          email,
          optianlNote: note,
        }),
      });

      const data = await res.json();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  const resetAll = () => {
    setSelectedDate(new Date());
    setSelectedTime("");
    setFeeling("");
    setName("");
    setAnonymous(true);
    setEmail("");
    setPayment("stripe");
    setConfirmed(false);
    setStep(1);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          resetAll();
          onOpenChange(false);
        }}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-4xl max-h-[90vh] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-emerald-50/60 to-amber-50/40" />

          {/* Serene background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute top-10 left-10 w-20 h-20 bg-emerald-200 rounded-full blur-xl animate-pulse"
              style={{ animationDuration: "4s" }}
            />
            <div
              className="absolute top-32 right-20 w-16 h-16 bg-blue-200 rounded-full blur-lg animate-pulse"
              style={{ animationDuration: "6s", animationDelay: "2s" }}
            />
            <div
              className="absolute bottom-20 left-1/4 w-12 h-12 bg-amber-200 rounded-full blur-md animate-pulse"
              style={{ animationDuration: "5s", animationDelay: "1s" }}
            />
          </div>

          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[0.5px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 overflow-y-auto max-h-[90vh]">
          {!confirmed ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-4 shadow-lg border border-white/50">
                  <Heart className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-gray-700 tracking-wide">
                    SERENORY
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Book Your Listening Session
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Take a gentle step toward feeling heard. Your story matters,
                  and we're here to listen with care.
                </p>
              </div>

              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      step >= 1
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                        step >= 1
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      1
                    </span>
                    <span className="font-medium">Session Details</span>
                  </div>
                  <div
                    className={`w-12 h-1 rounded-full transition-all duration-300 ${
                      step >= 2 ? "bg-emerald-600" : "bg-gray-200"
                    }`}
                  />
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      step >= 2
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                        step >= 2
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      2
                    </span>
                    <span className="font-medium">Review & Payment</span>
                  </div>
                </div>
              </div>

              {/* ✨ Wrapper for the transition effect */}
              <div
                className={cn(
                  "transition-opacity duration-300 ease-in-out",
                  isFading ? "opacity-0" : "opacity-100"
                )}
              >
                {step === 1 ? (
                  <div className="space-y-8">
                    <section>
                      {!session?.duration && (
                        <section>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Choose Session Duration
                          </h3>

                          <div className="flex gap-3 mb-4 overflow-x-auto">
                            {(
                              Object.keys(durationOptions) as DurationKey[]
                            ).map((duration) => (
                              <button
                                key={duration}
                                onClick={() => {
                                  setCustomSession({
                                    duration,
                                    price: durationOptions[duration].price,
                                    title: durationOptions[duration].title,
                                    durationText:
                                      durationOptions[duration].durationText,
                                  });
                                }}
                                className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                                  customSession.duration === duration
                                    ? "border-pink-500 bg-pink-50 text-pink-700 shadow-sm"
                                    : "border-gray-200 bg-white/80 hover:border-pink-300 hover:bg-pink-50/50 text-gray-700"
                                }`}
                              >
                                {durationOptions[duration].title}{" "}
                                {durationOptions[duration].durationText} — $
                                {durationOptions[duration].price}
                              </button>
                            ))}
                          </div>
                        </section>
                      )}

                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-emerald-600" />
                        Choose Your Date
                      </h3>

                      <DatePicker
                        value={selectedDate}
                        placeholder="Select Booking Date"
                        minDate={new Date()}
                        allowClear
                        onChange={(date) => {
                          setSelectedDate(date ?? undefined);
                          setOpenDate(false);
                        }}
                      />
                    </section>

                    {/* Time Selection */}
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        Select Your Time
                      </h3>

                      {/* Scrollable grid container */}
                      <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {TIME_SLOTS.map((t) => {
                            const active = selectedTime === t;
                            const available = availableSlots.includes(t);

                            return (
                              <button
                                key={t}
                                onClick={() => available && setSelectedTime(t)}
                                disabled={!available}
                                className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium cursor-pointer
                                  ${
                                    !available
                                      ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                                      : active
                                      ? "border-pink-500 bg-pink-50 text-pink-700 shadow-sm"
                                      : "border-gray-200  bg-white/80 hover:border-mint-300 hover:bg-mint-50/60 text-gray-700"
                                  }`}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </section>

                    {/* Feeling Selection */}
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-pink-600" />
                        How are you feeling today?
                      </h3>
                      <p className="text-xs text-gray-500 italic mb-3">
                        You’re not required to explain anything you’re not ready
                        for. Choose whatever feels closest for this moment.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {FEELINGS.map((f) => {
                          const active = feeling === f.key;
                          const Icon = f.Icon;
                          return (
                            <button
                              key={f.key}
                              onClick={() => setFeeling(f.key)}
                              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                                active
                                  ? "border-pink-500 bg-pink-50 text-pink-700"
                                  : "border-gray-200 bg-white/80 hover:border-pink-300 hover:bg-pink-50/50"
                              }`}
                              disabled={!selectedTime}
                            >
                              <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{f.label}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    {/* Contact Details */}
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-purple-600" />
                        Your Details
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={anonymous}
                              onChange={(e) => {
                                setAnonymous(e.target.checked);
                                if (e.target.checked) setName("");
                              }}
                              className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                            />
                            <div>
                              <span className="font-medium text-gray-900">
                                I’d rather stay anonymous — just want the
                                session
                              </span>
                              <p className="text-sm text-gray-600">
                                We recommend this for your privacy and comfort
                              </p>
                            </div>
                          </label>
                        </div>

                        {!anonymous && (
                          <div className="relative">
                            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Your first name (optional)"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-white/80 focus:border-emerald-500 focus:outline-none transition-colors"
                            />
                          </div>
                        )}

                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            placeholder="Email for session link and reminders"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-white/80 focus:border-emerald-500 focus:outline-none transition-colors"
                            required
                          />
                          {!isEmailValid && email.length > 0 && (
                            <p className="mt-2 text-sm text-red-600">
                              Please enter a valid email address
                            </p>
                          )}
                        </div>
                      </div>
                    </section>

                    <section className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
                        <span className="text-gray-700">✏️</span>
                        Optional note (completely up to you)
                      </h3>

                      <p className="text-xs text-gray-500 italic mb-3">
                        You can leave this empty. It simply helps your listener
                        understand your rhythm and comfort.
                      </p>

                      <textarea
                        className="w-full p-3  border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                        rows={4}
                        placeholder="Anything you'd like us to hold in mind (optional)."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        disabled={!selectedTime}
                      />
                    </section>

                    {/* Next Button */}
                    <div className="pt-4">
                      {/* ✨ Updated onClick to use the new handler */}
                      <Button
                        onClick={handleNext}
                        disabled={!canProceedDetails}
                        className="w-full  text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Review Your Session
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Step 2: Review & Payment
                  <div className="space-y-8">
                    {/* Session Summary */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Session Summary
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Session Type</span>
                          <span className="font-semibold">
                            {bookingTitle} ({bookingDuration})
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Date</span>
                          <span className="font-semibold">
                            {formatDateLongUpdate(selectedDate)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Time</span>
                          <span className="font-semibold">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">
                            How you're feeling
                          </span>
                          <span className="font-semibold">
                            {FEELINGS.find((f) => f.key === feeling)?.label}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Optional note</span>
                          <span className="font-semibold line-clamp-40 text-right max-w-[70%]">
                            {note || "—"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Name</span>
                          <span className="font-semibold">
                            {anonymous ? "Anonymous" : name || "Anonymous"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Email</span>
                          <span className="font-semibold">{email}</span>
                        </div>
                        <div className="border-t pt-3 mt-3">
                          <div className="flex justify-between items-center text-lg">
                            <span className="font-bold">Total</span>
                            <span className="font-bold text-emerald-600">
                              {bookingPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-green-600" />
                        Payment Method
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          onClick={() => setPayment("stripe")}
                          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                            payment === "stripe"
                              ? "border-green-500 bg-green-50 text-green-700"
                              : "border-gray-200 bg-white/80 hover:border-green-300"
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <CreditCard className="w-5 h-5" />
                            <span className="font-semibold">Stripe</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Secure payment with Stripe
                          </p>
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      {/* ✨ Updated onClick to use the new handler */}
                      <Button
                        onClick={handleBack}
                        variant="outline"
                        className="flex-1 py-3 text-lg font-semibold rounded-xl"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleConfirmAndPay}
                        disabled={!canSubmit || submitting}
                        className="flex-1  text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {submitting
                          ? "Processing..."
                          : `Confirm & Pay ${session?.price}`}
                      </Button>
                    </div>

                    <p className="text-sm text-gray-600 text-center">
                      Your session is completely confidential. Payment is secure
                      and one-time only.
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Confirmation Screen
            <div className="text-center space-y-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
                <ShieldCheck className="w-10 h-10 text-emerald-600" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Your session is confirmed!
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  You'll receive a confirmation email with your session link and
                  calendar invite. We're here when you're ready to be heard.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg max-w-md mx-auto">
                <h3 className="font-bold text-gray-900 mb-4">
                  Session Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">
                      {formatDateLongUpdate(selectedDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session:</span>
                    <span className="font-medium">{session?.title}</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-emerald-600 mt-1" />
                  <div className="text-left">
                    <h4 className="font-semibold text-emerald-900 mb-2">
                      A gentle reminder
                    </h4>
                    <p className="text-emerald-800 text-sm">
                      Your conversation is completely private and confidential.
                      Come as you are, share what feels right, and know that
                      you're in a safe space to be heard.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => onOpenChange(false)}
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Close
              </Button>

              <p className="text-sm text-gray-500 italic">
                "The calm in the conversation."
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

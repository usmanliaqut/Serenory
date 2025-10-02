"use client";

import { useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Calendar,
  Clock,
  Mail,
  User,
  ShieldCheck,
  CreditCard,
  DollarSign,
  Heart,
  MessageCircle,
  Moon,
  Cloud,
  Users,
  Smile,
  Frown,
  AlertTriangle,
} from "lucide-react";

import { Button } from "../ui/button";

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

// Utility: simple static slots
const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
];

// lucide-react icons are React components that accept SVG props
import type { LucideIcon } from "lucide-react";
type IconType = LucideIcon;

const FEELINGS: {
  key: "light" | "heavy";
  emoji: string;
  label: string;
  Icon: IconType;
}[] = [
  {
    key: "light",
    emoji: "🙂",
    label: "Feeling light — happy to share",
    Icon: Smile,
  },
  {
    key: "heavy",
    emoji: "🪨",
    label: "Carrying something heavy — need a quiet ear",
    Icon: Frown,
  },
];

type FeelingKey = (typeof FEELINGS)[number]["key"];
type PaymentMethod = "stripe" | "paypal";

export function BookingDrawer({
  open,
  onOpenChange,
  session,
}: BookingDrawerProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [feeling, setFeeling] = useState<FeelingKey | "">("");
  const [name, setName] = useState<string>("");
  const [anonymous, setAnonymous] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [payment, setPayment] = useState<PaymentMethod>("stripe");
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const days = useMemo(() => getNextDays(14), []);

  const isEmailValid = useMemo(() => {
    if (!email) return false;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }, [email]);

  const canSubmit =
    !!session && !!selectedDate && !!selectedTime && !!feeling && isEmailValid;
  const canProceedDetails = canSubmit;

  const formatDateLong = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

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
                  name: session?.title || "Serenory Session",
                },
                unit_amount: (session?.price || 0) * 100,
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
    setSelectedDate("");
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

              {step === 1 ? (
                <div className="space-y-8">
                  {/* Date Selection */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                      Choose Your Date
                    </h3>
                    <div className="grid grid-cols-7 gap-2">
                      {days.map((d) => {
                        const active = selectedDate === d.date;
                        return (
                          <button
                            key={d.date}
                            onClick={() => setSelectedDate(d.date)}
                            className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                              active
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : "border-gray-200 bg-white/80 hover:border-emerald-300 hover:bg-emerald-50/50"
                            }`}
                          >
                            <div className="text-xs text-gray-500 mb-1">
                              {d.weekday}
                            </div>
                            <div className="text-base font-semibold">
                              {d.dayNum}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </section>

                  {/* Time Selection */}
                  <section
                    className={
                      !selectedDate ? "opacity-50 pointer-events-none" : ""
                    }
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Select Your Time
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {TIME_SLOTS.map((t) => {
                        const active = selectedTime === t;
                        return (
                          <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                              active
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 bg-white/80 hover:border-blue-300 hover:bg-blue-50/50"
                            }`}
                            disabled={!selectedDate}
                          >
                            <div className="font-medium">{t}</div>
                          </button>
                        );
                      })}
                    </div>
                  </section>

                  {/* Feeling Selection */}
                  <section
                    className={
                      !selectedTime ? "opacity-50 pointer-events-none" : ""
                    }
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-pink-600" />
                      How are you feeling today?
                    </h3>
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
                  <section
                    className={!feeling ? "opacity-50 pointer-events-none" : ""}
                  >
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
                              Stay completely anonymous
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

                  {/* Next Button */}
                  <div className="pt-4">
                    <Button
                      onClick={() => setStep(2)}
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
                          {session?.title} ({session?.duration})
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Date</span>
                        <span className="font-semibold">
                          {formatDateLong(selectedDate)}
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
                            {session?.price}
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

                      {/* <button
                        onClick={() => setPayment("paypal")}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          payment === "paypal"
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-200 bg-white/80 hover:border-green-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <DollarSign className="w-5 h-5" />
                          <span className="font-semibold">PayPal</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Pay with your PayPal account
                        </p>
                      </button> */}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      onClick={() => setStep(1)}
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
                      {formatDateLong(selectedDate)}
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

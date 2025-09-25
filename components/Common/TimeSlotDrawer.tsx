"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Calendar,
  Clock,
  Mail,
  User,
  ShieldCheck,
  CreditCard,
  DollarSign,
  Smile,
  Users,
  MessageCircle,
  Moon,
  Frown,
  AlertTriangle,
  Cloud,
} from "lucide-react";

type SessionType = {
  id: number;
  title: string;
  duration: string;
  price: number;
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
];

const MOODS = [
  { key: "happy", label: "Happy", Icon: Smile },
  { key: "company", label: "Just need company", Icon: Users },
  { key: "calm-talk", label: "Calm but want to talk", Icon: MessageCircle },
  { key: "tired", label: "Tired", Icon: Moon },
  { key: "sad", label: "Sad", Icon: Frown },
  { key: "anxious", label: "Anxious", Icon: AlertTriangle },
  { key: "heavy", label: "Heavy", Icon: Cloud },
] as const;

type MoodKey = (typeof MOODS)[number]["key"];

type PaymentMethod = "stripe" | "paypal";

export function BookingDrawer({
  open,
  onOpenChange,
  session,
}: BookingDrawerProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [mood, setMood] = useState<MoodKey | "">("");
  const [name, setName] = useState<string>("");
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [payment, setPayment] = useState<PaymentMethod>("stripe");
  const [step, setStep] = useState<1 | 2>(1);

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const days = useMemo(() => getNextDays(14), []);

  const isEmailValid = useMemo(() => {
    if (!email) return false;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }, [email]);

  const canSubmit =
    !!session && !!selectedDate && !!selectedTime && !!mood && isEmailValid;
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
    setMood("");
    setName("");
    setAnonymous(false);
    setEmail("");
    setPayment("stripe");
    setConfirmed(false);
    setStep(1);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) resetAll();
        onOpenChange(v);
      }}
    >
      <SheetContent className="w-full sm:max-w-3xl overflow-y-auto bg-background p-4 md:p-6">
        {!confirmed ? (
          <>
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold text-foreground">
                Book a Session
              </SheetTitle>
              <SheetDescription className="text-muted-foreground">
                Fill in your details, then review and pay to confirm your
                booking.
              </SheetDescription>
            </SheetHeader>

            {/* Modern stepper */}
            <div className="mt-4">
              <ol className="grid grid-cols-3 text-sm">
                <li className="flex items-center gap-2 font-medium">
                  <span
                    className={`h-6 w-6 inline-flex items-center justify-center rounded-full border ${
                      step >= 1
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    1
                  </span>
                  Details
                </li>
                <li className="flex items-center gap-2 justify-center font-medium">
                  <span
                    className={`h-6 w-6 inline-flex items-center justify-center rounded-full border ${
                      step >= 2
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    2
                  </span>
                  Review & Pay
                </li>
                <li className="flex items-center gap-2 justify-end font-medium text-muted-foreground">
                  <span className="h-6 w-6 inline-flex items-center justify-center rounded-full border border-border">
                    3
                  </span>
                  Done
                </li>
              </ol>
              <div className="mt-3 h-1 w-full bg-muted rounded">
                <div
                  className="h-1 bg-primary rounded transition-all"
                  style={{ width: step === 1 ? "33%" : "66%" }}
                />
              </div>
            </div>

            {/* Split into two pages inside the drawer */}
            {step === 1 ? (
              <div className="mt-6 space-y-8">
                {/* Date */}
                <section aria-labelledby="date-select">
                  <h3
                    id="date-select"
                    className="text-sm font-semibold uppercase tracking-wide text-foreground/80"
                  >
                    Select Date
                  </h3>
                  <div className="grid grid-cols-7 gap-2 mt-3">
                    {days.map((d) => {
                      const active = selectedDate === d.date;
                      return (
                        <button
                          key={d.date}
                          onClick={() => setSelectedDate(d.date)}
                          className={[
                            "rounded-lg border p-3 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                            active
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted",
                          ].join(" ")}
                          aria-pressed={active}
                          aria-label={`Select ${d.weekday} ${d.date}`}
                        >
                          <div className="text-xs text-muted-foreground">
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

                {/* Time */}
                <section
                  aria-labelledby="time-select"
                  className={
                    !selectedDate ? "opacity-50 pointer-events-none" : ""
                  }
                >
                  <h3
                    id="time-select"
                    className="text-sm font-semibold uppercase tracking-wide text-foreground/80"
                  >
                    Select Time
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                    {TIME_SLOTS.map((t) => {
                      const active = selectedTime === t;
                      return (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={[
                            "rounded-lg border p-3 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                            active
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted",
                          ].join(" ")}
                          aria-pressed={active}
                          aria-label={`Select ${t}`}
                          disabled={!selectedDate}
                        >
                          <span className="inline-flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            {t}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Mood */}
                <section
                  aria-labelledby="mood-select"
                  className={
                    !selectedTime ? "opacity-50 pointer-events-none" : ""
                  }
                >
                  <h3
                    id="mood-select"
                    className="text-sm font-semibold uppercase tracking-wide text-foreground/80"
                  >
                    How are you feeling? (Required)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                    {MOODS.map((m) => {
                      const active = mood === m.key;
                      const Icon = m.Icon;
                      return (
                        <button
                          key={m.key}
                          onClick={() => setMood(m.key)}
                          className={[
                            "rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                            active
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted",
                          ].join(" ")}
                          aria-pressed={active}
                          aria-label={`${m.label}`}
                          disabled={!selectedTime}
                        >
                          <span className="inline-flex items-center gap-3">
                            <Icon className="h-5 w-5 text-primary" />
                            <span className="font-medium">{m.label}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Your Details */}
                <section
                  aria-labelledby="your-details"
                  className={!mood ? "opacity-50 pointer-events-none" : ""}
                >
                  <h3
                    id="your-details"
                    className="text-sm font-semibold uppercase tracking-wide text-foreground/80"
                  >
                    Your Details
                  </h3>
                  <div className="grid gap-3 mt-3">
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Your name (optional if anonymous)"
                        value={anonymous ? "" : name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border border-border bg-background p-3 pl-10 text-foreground"
                        disabled={anonymous}
                        aria-label="Your name"
                      />
                    </div>

                    <label className="inline-flex items-center gap-2 text-sm text-foreground/80">
                      <input
                        type="checkbox"
                        checked={anonymous}
                        onChange={(e) => {
                          setAnonymous(e.target.checked);
                          if (e.target.checked) setName("");
                        }}
                        aria-label="Stay Anonymous"
                      />
                      Stay Anonymous
                    </label>

                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="Email for confirmation and reminders"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-border bg-background p-3 pl-10 text-foreground"
                        aria-label="Email address"
                        required
                      />
                      {!isEmailValid && email.length > 0 && (
                        <p className="mt-1 text-xs text-destructive">
                          Please enter a valid email.
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Next action */}
                <div className="pt-2">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setStep(2)}
                    disabled={!canProceedDetails}
                  >
                    Review & Pay
                  </Button>
                </div>
              </div>
            ) : (
              // step === 2
              <div className="mt-6 space-y-8">
                {/* Summary */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-base">Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {selectedDate ? formatDateLong(selectedDate) : "Date"}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        {selectedTime || "Time"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        {session
                          ? `${session.title} (${session.duration})`
                          : "Session"}
                      </span>
                      <span className="font-semibold">
                        {session ? `$${session.price}` : "-"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Mood</span>
                      <span className="text-muted-foreground inline-flex items-center gap-2">
                        {mood ? (
                          <>
                            {(() => {
                              const mm = MOODS.find((m) => m.key === mood);
                              if (!mm) return null;
                              const Icon = mm.Icon;
                              return <Icon className="h-4 w-4 text-primary" />;
                            })()}
                            {MOODS.find((m) => m.key === mood)?.label}
                          </>
                        ) : (
                          "-"
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Name</span>
                      <span className="text-muted-foreground">
                        {anonymous ? "Anonymous" : name || "-"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Email</span>
                      <span className="text-muted-foreground">
                        {email || "-"}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment */}
                <section aria-labelledby="payment-method">
                  <h3
                    id="payment-method"
                    className="text-sm font-semibold uppercase tracking-wide text-foreground/80"
                  >
                    Payment
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <button
                      onClick={() => setPayment("stripe")}
                      className={[
                        "rounded-lg border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        payment === "stripe"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted",
                      ].join(" ")}
                      aria-pressed={payment === "stripe"}
                      aria-label="Pay with Stripe"
                    >
                      <span className="inline-flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span className="font-medium">Stripe</span>
                      </span>
                      <p className="text-sm text-muted-foreground mt-1">
                        One‑off secure card payment
                      </p>
                    </button>

                    <button
                      onClick={() => setPayment("paypal")}
                      className={[
                        "rounded-lg border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        payment === "paypal"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted",
                      ].join(" ")}
                      aria-pressed={payment === "paypal"}
                      aria-label="Pay with PayPal"
                    >
                      <span className="inline-flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <span className="font-medium">PayPal</span>
                      </span>
                      <p className="text-sm text-muted-foreground mt-1">
                        One‑off payment with PayPal
                      </p>
                    </button>
                  </div>
                </section>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    size="lg"
                    onClick={handleConfirmAndPay}
                    disabled={!canSubmit || submitting}
                  >
                    {submitting
                      ? "Processing..."
                      : `Confirm & Pay${session ? ` - $${session.price}` : ""}`}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Payment is one-off. By booking, you agree to confidentiality
                  and our community guidelines.
                </p>
              </div>
            )}
          </>
        ) : (
          // confirmed
          <>
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold text-foreground">
                You're booked!
              </SheetTitle>
              <SheetDescription className="text-muted-foreground">
                Your session is confirmed. A confirmation email with the session
                link and a calendar invite is on its way.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-base">Session Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Session</span>
                    <span className="font-medium">
                      {session?.title} • {session?.duration} • ${session?.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Date</span>
                    <span className="font-medium">
                      {formatDateLong(selectedDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Time</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Payment</span>
                    <span className="font-medium capitalize">{payment}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-lg border border-border p-4 bg-muted/30">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Confidentiality Reminder</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your conversation is private. We respect your space and
                      keep your details secure. If you need to reschedule, check
                      your confirmation email for options.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button className="flex-1" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                You’ll also receive a reminder email before your session.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

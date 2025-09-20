"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Shield,
  MessageCircle,
  Star,
  Users,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { TimeSlotDrawer } from "./TimeSlotDrawer";

type SessionType = {
  id: number;
  title: string;
  duration: string;
  price: number;
} | null;

const BookingPlace = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SessionType>(null);
  const handleBookSession = (session: SessionType) => {
    setSelectedSession(session);
    setDrawerOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/80 to-background">
          <Image
            src="/modern-professional-office-space-with-natural-ligh.jpg"
            alt="Professional meeting space"
            fill
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-background/90"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-6 animate-fade-in-up">
                Private 1-on-1 Sessions
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance animate-fade-in-up animation-delay-200">
                Book Your Private 1-on-1 Sessions
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty animate-fade-in-up animation-delay-400">
                Schedule private sessions in a secure, confidential environment.
                Easy booking system that fits your schedule and needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
                <Button
                  size="lg"
                  onClick={() =>
                    handleBookSession({
                      id: 1,
                      title: "Single Session",
                      duration: "60 minutes",
                      price: 75,
                    })
                  }
                  className="text-lg px-8 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Your Session
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 bg-transparent hover:scale-105 transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative lg:block hidden animate-fade-in-up animation-delay-800">
              <div className="relative w-full h-96">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background elements */}
                  <defs>
                    <linearGradient
                      id="bgGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity="0.1"
                      />
                      <stop
                        offset="100%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity="0.05"
                      />
                    </linearGradient>
                  </defs>

                  {/* Background shape */}
                  <rect
                    width="400"
                    height="300"
                    fill="url(#bgGradient)"
                    rx="20"
                  />

                  {/* Calendar/booking interface */}
                  <rect
                    x="50"
                    y="50"
                    width="120"
                    height="80"
                    fill="hsl(var(--card))"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    rx="8"
                  />
                  <rect
                    x="60"
                    y="60"
                    width="100"
                    height="8"
                    fill="hsl(var(--primary))"
                    rx="4"
                  />
                  <rect
                    x="60"
                    y="75"
                    width="30"
                    height="6"
                    fill="hsl(var(--muted-foreground))"
                    rx="3"
                  />
                  <rect
                    x="95"
                    y="75"
                    width="30"
                    height="6"
                    fill="hsl(var(--muted-foreground))"
                    rx="3"
                  />
                  <rect
                    x="60"
                    y="85"
                    width="25"
                    height="6"
                    fill="hsl(var(--muted-foreground))"
                    rx="3"
                  />
                  <rect
                    x="90"
                    y="85"
                    width="35"
                    height="6"
                    fill="hsl(var(--muted-foreground))"
                    rx="3"
                  />

                  {/* Calendar grid */}
                  <g transform="translate(60, 95)">
                    {[...Array(12)].map((_, i) => (
                      <rect
                        key={i}
                        x={(i % 4) * 22}
                        y={Math.floor(i / 4) * 15}
                        width="18"
                        height="12"
                        fill={
                          i === 5 ? "hsl(var(--primary))" : "hsl(var(--muted))"
                        }
                        rx="2"
                      />
                    ))}
                  </g>

                  {/* Person illustration */}
                  <g transform="translate(220, 80)">
                    {/* Head */}
                    <circle
                      cx="40"
                      cy="30"
                      r="20"
                      fill="hsl(var(--primary))"
                      opacity="0.8"
                    />
                    {/* Body */}
                    <rect
                      x="25"
                      y="50"
                      width="30"
                      height="40"
                      fill="hsl(var(--primary))"
                      opacity="0.6"
                      rx="15"
                    />
                    {/* Arms */}
                    <rect
                      x="10"
                      y="55"
                      width="15"
                      height="25"
                      fill="hsl(var(--primary))"
                      opacity="0.6"
                      rx="7"
                    />
                    <rect
                      x="55"
                      y="55"
                      width="15"
                      height="25"
                      fill="hsl(var(--primary))"
                      opacity="0.6"
                      rx="7"
                    />
                    {/* Legs */}
                    <rect
                      x="30"
                      y="90"
                      width="8"
                      height="30"
                      fill="hsl(var(--primary))"
                      opacity="0.6"
                      rx="4"
                    />
                    <rect
                      x="42"
                      y="90"
                      width="8"
                      height="30"
                      fill="hsl(var(--primary))"
                      opacity="0.6"
                      rx="4"
                    />
                  </g>

                  {/* Chat/communication bubbles */}
                  <g transform="translate(280, 40)">
                    <ellipse
                      cx="30"
                      cy="20"
                      rx="25"
                      ry="15"
                      fill="hsl(var(--primary))"
                      opacity="0.3"
                    />
                    <ellipse
                      cx="35"
                      cy="45"
                      rx="20"
                      ry="12"
                      fill="hsl(var(--primary))"
                      opacity="0.2"
                    />
                  </g>

                  {/* Security/privacy icons */}
                  <g transform="translate(320, 180)">
                    <rect
                      x="0"
                      y="10"
                      width="25"
                      height="20"
                      fill="hsl(var(--primary))"
                      opacity="0.4"
                      rx="3"
                    />
                    <rect
                      x="5"
                      y="5"
                      width="15"
                      height="8"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      rx="7"
                    />
                  </g>

                  {/* Clock/time element */}
                  <g transform="translate(80, 180)">
                    <circle
                      cx="20"
                      cy="20"
                      r="18"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                    <line
                      x1="20"
                      y1="20"
                      x2="20"
                      y2="10"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      opacity="0.8"
                    />
                    <line
                      x1="20"
                      y1="20"
                      x2="28"
                      y2="20"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      opacity="0.8"
                    />
                  </g>

                  {/* Floating elements for animation */}
                  <circle
                    cx="350"
                    cy="100"
                    r="4"
                    fill="hsl(var(--primary))"
                    opacity="0.3"
                    className="animate-float"
                  />
                  <circle
                    cx="80"
                    cy="40"
                    r="3"
                    fill="hsl(var(--primary))"
                    opacity="0.4"
                    className="animate-float animation-delay-1000"
                  />
                  <circle
                    cx="300"
                    cy="250"
                    r="5"
                    fill="hsl(var(--primary))"
                    opacity="0.2"
                    className="animate-float animation-delay-2000"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 animate-counter">
                500+
              </div>
              <div className="text-muted-foreground">Sessions Completed</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 animate-counter animation-delay-200">
                98%
              </div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 animate-counter animation-delay-400">
                24/7
              </div>
              <div className="text-muted-foreground">Booking Available</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 animate-counter animation-delay-600">
                100%
              </div>
              <div className="text-muted-foreground">Confidential</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-card/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose A Safe Space to Talk?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A secure, professional platform designed for meaningful private
              conversations and sessions.
            </p>
          </div>

          <div className="mb-16 relative">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
              <Image
                src="/professional-meeting-room-modern-design.jpg"
                alt="Professional meeting space with modern design"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 flex items-center justify-center">
                <div className="text-center text-primary-foreground">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Professional Environment
                  </h3>
                  <p className="text-lg opacity-90">
                    Designed for meaningful conversations
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:border-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>100% Confidential</CardTitle>
                <CardDescription>
                  Your privacy is our priority. All sessions are completely
                  confidential and secure.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up animation-delay-200">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Easy Booking</CardTitle>
                <CardDescription>
                  Simple, intuitive booking system that lets you schedule
                  sessions quickly and efficiently.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up animation-delay-400">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Flexible Scheduling</CardTitle>
                <CardDescription>
                  Book sessions that fit your schedule, with multiple time slots
                  available throughout the week.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up animation-delay-600">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Personal Attention</CardTitle>
                <CardDescription>
                  One-on-one focused sessions tailored to your specific needs
                  and goals.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up animation-delay-800">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Instant Confirmation</CardTitle>
                <CardDescription>
                  Receive immediate booking confirmation with all session
                  details and reminders.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up animation-delay-1000">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Quality Guaranteed</CardTitle>
                <CardDescription>
                  Professional service with a commitment to excellence in every
                  session.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple steps to book and attend your private 1-on-1 sessions.
            </p>
          </div>

          <div className="mb-16 grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
              <Image
                src="/person-using-laptop-booking-system.jpg"
                alt="Person using laptop for online booking"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Easy Online Booking
              </h3>
              <p className="text-muted-foreground">
                Our intuitive booking system makes it simple to schedule your
                sessions. Choose your preferred time, confirm your booking, and
                receive instant confirmation - all from the comfort of your
                home.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-3" />
                  <span>Real-time availability</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-3" />
                  <span>Instant confirmation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-3" />
                  <span>Automated reminders</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-primary/20 transition-colors duration-300">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <CardTitle>Choose Your Time</CardTitle>
              <CardDescription>
                Select from available time slots that work best for your
                schedule.
              </CardDescription>
            </div>

            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-primary/20 transition-colors duration-300">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <CardTitle>Book Your Session</CardTitle>
              <CardDescription>
                Complete your booking with our secure and simple reservation
                system.
              </CardDescription>
            </div>

            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-primary/20 transition-colors duration-300">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <CardTitle>Attend Your Session</CardTitle>
              <CardDescription>
                Join your private session at the scheduled time in our secure
                environment.
              </CardDescription>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/10 via-card/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What People Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real feedback from people who have used our booking system.
            </p>
          </div>

          <div className="mb-16 relative">
            <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden">
              <Image
                src="/professional-testimonials-background.jpg"
                alt="Professional diverse group sharing positive experiences"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end justify-center pb-8">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    4.9/5 Average Rating
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:scale-105 transition-all duration-300 hover:shadow-lg animate-fade-in-up">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current animate-pulse"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                </div>
                <CardDescription className="text-base">
                  "The booking system is incredibly easy to use. I was able to
                  schedule my session in just a few clicks, and the whole
                  process was seamless."
                </CardDescription>
                <div className="mt-4 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      SM
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      Sarah M.
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Regular User
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:scale-105 transition-all duration-300 hover:shadow-lg animate-fade-in-up animation-delay-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current animate-pulse"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                </div>
                <CardDescription className="text-base">
                  "Privacy and confidentiality were my main concerns, and this
                  platform exceeded my expectations. I felt completely secure
                  throughout."
                </CardDescription>
                <div className="mt-4 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      MR
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      Michael R.
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Business Professional
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:scale-105 transition-all duration-300 hover:shadow-lg animate-fade-in-up animation-delay-400">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current animate-pulse"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                </div>
                <CardDescription className="text-base">
                  "The flexibility in scheduling is amazing. I can book sessions
                  that fit perfectly with my busy schedule, even last minute."
                </CardDescription>
                <div className="mt-4 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      EL
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Emma L.</div>
                    <div className="text-sm text-muted-foreground">Student</div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the option that works best for you. No hidden fees, no
              surprises.
            </p>
          </div>

          <div className="mb-16 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Flexible Pricing Options
              </h3>
              <p className="text-muted-foreground">
                We believe in transparent pricing that works for everyone.
                Whether you need a single session or prefer ongoing support, we
                have options that fit your needs and budget.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
              <Image
                src="/calculator-money-pricing-concept.jpg"
                alt="Transparent pricing and value concept"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-border/50 relative hover:scale-105 transition-all duration-300 hover:shadow-lg animate-fade-in-up">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Single Session</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$75</div>
                <CardDescription className="mt-2">
                  Perfect for trying out our service
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>60-minute session</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Secure platform</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Flexible scheduling</span>
                  </li>
                </ul>
                <Button
                  onClick={() =>
                    handleBookSession({
                      id: 1,
                      title: "Single Session",
                      duration: "60 minutes",
                      price: 75,
                    })
                  }
                  className="w-full mt-6 hover:scale-105 transition-transform duration-200"
                >
                  Book Single Session
                </Button>
              </div>
            </Card>

            <Card className="border-primary/50 relative hover:scale-105 transition-all duration-300 hover:shadow-xl animate-fade-in-up animation-delay-200">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground animate-pulse">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Session Package</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$200</div>
                <CardDescription className="mt-2">
                  3 sessions - Save $25
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>3 x 60-minute sessions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Priority booking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Session notes included</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Valid for 3 months</span>
                  </li>
                </ul>
                <Button
                  onClick={() =>
                    handleBookSession({
                      id: 2,
                      title: "Session Package",
                      duration: "3 months",
                      price: 200,
                    })
                  }
                  className="w-full mt-6 hover:scale-105 transition-transform duration-200"
                >
                  Get Package
                </Button>
              </div>
            </Card>

            <Card className="border-border/50 relative hover:scale-105 transition-all duration-300 hover:shadow-lg animate-fade-in-up animation-delay-400">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Monthly Plan</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$280</div>
                <CardDescription className="mt-2">
                  4 sessions per month - Best value
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>4 x 60-minute sessions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Premium support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Flexible rescheduling</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Monthly progress review</span>
                  </li>
                </ul>
                <Button
                  className="w-full mt-6 hover:scale-105 transition-transform duration-200"
                  onClick={() =>
                    handleBookSession({
                      id: 3,
                      title: "Monthly Plan",
                      duration: "Monthly",
                      price: 280,
                    })
                  }
                >
                  Start Monthly Plan
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary-foreground rounded-full animate-float"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-primary-foreground rounded-full animate-float animation-delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-primary-foreground rounded-full animate-float animation-delay-2000"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Take the next step and book your private session today. Simple,
            secure, and confidential.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() =>
              handleBookSession({
                id: 1,
                title: "Single Session",
                duration: "60 minutes",
                price: 75,
              })
            }
            className="text-lg px-8 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in-up animation-delay-400"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Your Session Now
          </Button>
        </div>
      </section>

      <TimeSlotDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        session={selectedSession}
      />
    </>
  );
};

export default BookingPlace;

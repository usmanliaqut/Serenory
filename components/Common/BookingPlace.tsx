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
  Heart,
} from "lucide-react";
import Image from "next/image";
import { TimeSlotDrawer } from "./TimeSlotDrawer";
import { ValuePromise } from "../Global/ValuePromise";
import Link from "next/link";
import HeroSection from "./ HeroSection";
import HowItWorksSection from "./HowItWorksSection";

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

  const steps = [
    {
      number: "1",
      title: "Pick a time",
      description: "15, 30, or 60 minutes.",
      icon: Clock,
    },
    {
      number: "2",
      title: "Book & pay securely",
      description: "instant confirmation.",
      icon: Shield,
    },
    {
      number: "3",
      title: "Talk your way",
      description: "voice, video, or chat.",
      icon: MessageCircle,
    },
  ];

  const handleClick = () => {};

  return (
    <>
      {/* Hero Section */}
      {/* <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-(--color-secondary)/90 via-(--color-background)/80 to-(--color-secondary)/70" />
          <Image
            src="/wavesimages.jpg"
            alt="Peaceful natural background"
            className="w-full h-full object-cover opacity-30"
            fill
            priority
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color(display-p3 0.62_0.77_0.55/_0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,color(display-p3 0.82_0.7_0.52/_0.12),transparent_50%)]" />

          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float" />
          <div className="absolute bottom-32 right-20 w-24 h-24 bg-accent/15 rounded-full blur-lg animate-float animation-delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary/10 rounded-full blur-md animate-float animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-1 gap-12 items-center">
            <div className="w-full flex flex-col items-center pt-10 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance animate-fade-in-up animation-delay-200">
                The quiet space for your story.
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl animate-fade-in-up animation-delay-400">
                No forms. No waiting. Just the simple power of being heard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
                <Button
                  size="lg"
                  onClick={handleClick}
                  className="text-lg px-8 bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Begin Your Session
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("services")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-lg px-8 bg-transparent border-border text-foreground/80 transition-all duration-300"
                  aria-label="Learn how it works"
                >
                  <Link href="#services">How it Works</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <HeroSection />
      <HowItWorksSection />
      <ValuePromise />

      {/* Features Section */}
      {/* <section className="py-20 bg-gradient-to-br from-primary/10 via-card/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose A Safe Space to Talk?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A secure, Friendly platform designed for meaningful private
              conversations and sessions.
            </p>
          </div>

          <div className="mb-16 relative">
            <div className="relative h-64 md:h-90 rounded-2xl overflow-hidden">
              <Image
                src="/environment.jpeg"
                alt="Professional meeting space with modern design"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 flex items-center justify-center">
                <div className="text-center text-primary-foreground">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Friendly Environment
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
      </section> */}

      {/* <section id="services" className="py-20 relative">
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
            <div className="relative h-64 md:h-90 rounded-2xl overflow-hidden">
              <Image
                src="/booknow.jpeg"
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
                  <span>Talk your way</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={step.number} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-sage-100 to-warm-100 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-sage-200/50">
                    <step.icon className="w-8 h-8 text-sage-700" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-sage-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-sage-700 text-lg">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-sage-50/80 to-warm-50/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-sage-200/30 shadow-lg">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-sage-200 to-warm-200 rounded-2xl flex items-center justify-center shadow-md">
                  <Heart className="w-8 h-8 text-sage-700" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-sage-900 mb-4">
                  Before Your Session
                </h3>
                <p className="text-sage-800 text-lg leading-relaxed text-pretty">
                  You'll also be able to share how you're feeling through a
                  simple mood check — so your listener understands the tone
                  you're arriving with.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

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
              surprises. Reconnection on Guarantee (5-minute grace if session
              drops)
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
                have options that fit your needs and budget.If a session drops
                due to technical issues, you’ll have a reconnection window so
                you don’t feel cut off.
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
                <CardTitle className="text-2xl">Drift</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$5</div>
                <CardDescription className="mt-2">
                  Perfect for trying out our service
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>15-minute session</span>
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
                      title: "Drift Session",
                      duration: "15 minutes",
                      price: 5,
                    })
                  }
                  className="w-full mt-6 hover:scale-105 transition-transform duration-200"
                >
                  Book Session
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
                <CardTitle className="text-2xl">Anchor</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$30</div>
              </CardHeader>
              <div className="px-6 pb-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>30-minute sessions</span>
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
                      title: "Anchor",
                      duration: "3 months",
                      price: 30,
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
                <CardTitle className="text-2xl">Haven</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$60</div>
              </CardHeader>
              <div className="px-6 pb-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>60-minute sessions</span>
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
                    <span>Priority booking</span>
                  </li>
                </ul>
                <Button
                  className="w-full mt-6 hover:scale-105 transition-transform duration-200"
                  onClick={() =>
                    handleBookSession({
                      id: 3,
                      title: "Haven",
                      duration: "Monthly",
                      price: 60,
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

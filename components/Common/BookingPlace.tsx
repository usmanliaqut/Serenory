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
import { ValuePromise } from "../Global/ValuePromise";
import Link from "next/link";
import HeroSection from "./ HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import PricingSection from "./PricingSection";
import { BookingDrawer } from "./TimeSlotDrawer";

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

  return (
    <>
      {/* Hero Section */}

      <HeroSection />
      <HowItWorksSection />
      <ValuePromise />

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

          <PricingSection
            onBookSession={(session) => handleBookSession(session)}
          />
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

      <BookingDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        session={selectedSession}
      />
    </>
  );
};

export default BookingPlace;

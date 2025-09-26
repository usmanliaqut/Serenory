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
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";

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
      <TestimonialsSection />

      <PricingSection onBookSession={(session) => handleBookSession(session)} />

      {/* CTA Section */}
      <CTASection onBookSession={handleBookSession} />

      <BookingDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        session={selectedSession}
      />
    </>
  );
};

export default BookingPlace;

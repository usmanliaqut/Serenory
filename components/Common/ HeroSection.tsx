import React from "react";
import { Calendar, Heart, Shield, Smile, Users } from "lucide-react";
import { Button } from "../ui/button";
import FeatureCard from "../Global/FeatureCard";
import { TAGLINES } from "@/constants/taglines";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{ backgroundImage: "url('/serenaimage.jpeg')" }}
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,69,19,0.04),transparent_70%)]" />

        {/* Floating elements */}
        <div
          className="absolute top-1/4 left-1/6 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/5 w-32 h-32 bg-emerald-200/15 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-amber-200/10 rounded-full blur-lg animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 my-8 md:mb-8 md:mt-6 shadow-lg border border-white/50">
            <Heart className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-semibold text-gray-700 tracking-wide">
              SERENORY
            </span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span className="text-xs text-gray-600 uppercase tracking-wider">
              Emotional Wellness
            </span>
          </div>

          {/* Main Headline (Hero tagline) */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
            <span className="block text-gray-900 drop-shadow-sm">
              {TAGLINES.hero.split(" ")[0]}{" "}
              {TAGLINES.hero.split(" ").slice(1, 3).join(" ")}
            </span>
            <span className="block bg-gradient-to-r from-emerald-500 via-teal-500  bg-clip-text text-transparent drop-shadow-md">
              {TAGLINES.hero.split(" ").slice(3).join(" ")}
            </span>
          </h1>

          {/* Subline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            No forms. No waiting. Just the simple power of being heard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative overflow-hidden px-10 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Calendar className="w-6 h-6 mr-3" />
              Book Session
            </Button>

            <button
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors duration-300"
            >
              <span className="border-b-2 border-transparent group-hover:border-gray-400 transition-all duration-300">
                How it Works
              </span>
              <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors duration-300">
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              }
              title="Confidential & Anonymous"
              description="Your privacy is sacred. No personal information required."
            />
            <FeatureCard
              icon={
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              }
              title="Non-Judgmental Listening"
              description="A safe space where you can share without fear of judgment."
            />
            <FeatureCard
              icon={
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
              }
              title="Accessible & Simple (no waitlists)"
              description="Caring listeners ready when you need to be heard most."
            />
            <FeatureCard
              icon={
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Smile className="w-6 h-6 text-white" />
                </div>
              }
              title="Safe Space for All Emotions"
              description="Whatever you’re feeling, Serenory is here to listen without limits."
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;

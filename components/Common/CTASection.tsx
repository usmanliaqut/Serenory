import React from "react";
import { Calendar, Heart, Shield, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";

interface CTASectionProps {
  onBookSession?: (session: any) => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onBookSession }) => {
  const handleBookSession = () => {
    onBookSession?.({
      id: "1",
      name: "Single Session",
      duration: "30 minutes",
      price: "$45",
    });
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-600 via-teal-700 to-indigo-800" />

        {/* Serene nature background - peaceful mountain lake at golden hour */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')",
          }}
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-teal-800/40 to-indigo-900/50" />

        {/* Soft radial glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(71,85,105,0.08),transparent_70%)]" />

        {/* Floating elements with gentle animations */}
        <div
          className="absolute top-1/4 left-1/6 w-32 h-32 bg-teal-300/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-indigo-300/12 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-slate-300/10 rounded-full blur-lg animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />

        {/* Additional floating orbs for depth */}
        <div
          className="absolute top-20 right-1/4 w-16 h-16 bg-teal-200/8 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "7s", animationDelay: "3s" }}
        />
        <div
          className="absolute bottom-20 left-1/3 w-12 h-12 bg-indigo-200/10 rounded-full blur-lg animate-pulse"
          style={{ animationDuration: "5.5s", animationDelay: "1.5s" }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg border border-white/30">
          <Heart className="w-5 h-5 text-white" />
          <span className="text-sm font-semibold text-white tracking-wide">
            SERENORY
          </span>
          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
          <span className="text-xs text-white/80 uppercase tracking-wider">
            Ready to Listen
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          <span className="block">Ready to be</span>
          <span className="block bg-gradient-to-r from-emerald-500 to-teal-400  bg-clip-text text-transparent">
            truly heard?
          </span>
        </h2>

        {/* Subline */}
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Take the gentle step toward feeling lighter. Your story matters, and
          we're here to listen.
        </p>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <Shield className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">
              Completely Anonymous
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <Heart className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">
              Non-Judgmental
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <MessageCircle className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">
              Flexible hours, same-day availability
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Button
            size="lg"
            onClick={handleBookSession}
            className="group relative overflow-hidden bg-white text-teal-700 hover:bg-white/95 px-10 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Calendar className="w-6 h-6 mr-3 relative z-10" />
            <span className="relative z-10">Begin Your Session</span>
          </Button>

          <button
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-3 text-lg font-medium text-white/90 hover:text-white transition-colors duration-300"
          >
            <span className="border-b-2 border-transparent group-hover:border-white/60 transition-all duration-300">
              View Pricing Options
            </span>
            <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors duration-300">
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

        {/* Bottom Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 max-w-2xl mx-auto">
          <h4 className="text-xl font-bold text-white mb-4">
            Your moment of peace awaits
          </h4>
          <p className="text-white/80 mb-6 leading-relaxed">
            No forms to fill out. No waiting lists. Just the simple power of
            being heard by someone who truly cares.
          </p>
          <p className="text-lg text-white font-light italic">
            "The calm in the conversation."
          </p>
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default CTASection;

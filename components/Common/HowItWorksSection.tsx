import React from "react";
import {
  Clock,
  MessageCircle,
  Heart,
  ArrowRight,
  Calendar,
  Flower2,
} from "lucide-react";
import { Button } from "../ui/button";

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Your Moment",
      description: "Pick a time that feels right. No long sign-ups.",
      icon: (
        <Calendar className="w-8 h-8 text-purple-600/80" strokeWidth={1.5} />
      ),
      color: "from-emerald-500 to-teal-600",
    },
    {
      number: "02",
      title: "Be Present",
      description: "Talk about anything with a Serenory Companion.",
      icon: (
        <Flower2 className="w-8 h-8 text-emerald-600/80" strokeWidth={1.5} />
      ),
      color: "from-blue-500 to-indigo-600",
    },
    {
      number: "03",
      title: "Leave Lighter",
      description: "Experience the relief of being fully heard.",
      icon: <Heart className="w-8 h-8" />,
      color: "from-rose-500 to-pink-600",
    },
  ];

  return (
    <section id="services" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50/20 to-blue-50/30" />

        {/* Subtle background texture */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: "url('/howitworks.webp')",
          }}
        />

        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[0.5px]" />

        {/* Soft radial glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.04),transparent_50%)]" />

        {/* Floating elements */}
        <div
          className="absolute top-20 left-1/6 w-32 h-32 bg-emerald-200/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "6s" }}
        />
        <div
          className="absolute bottom-20 right-1/5 w-24 h-24 bg-blue-200/15 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "8s", animationDelay: "2s" }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg border border-white/50">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700 tracking-wide uppercase">
              How It Works
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block">Simple steps to</span>
            <span className="block bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
              feeling heard.
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your gentle moment of being heard begins with three gentle steps.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connection Line - Hidden on mobile, shown on desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent z-0">
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                )}

                {/* Step Card */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 group-hover:bg-white/90">
                  {/* Step Number */}

                  <div
                    className={`absolute -top-4 -left-4 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg
                      ${
                        step.number === "01"
                          ? "bg-gradient-to-br from-purple-200 to-pink-200"
                          : step.number === "02"
                          ? "bg-gradient-to-br from-teal-200 to-emerald-200"
                          : step.number === "03"
                          ? "bg-gradient-to-br from-rose-200 to-pink-300"
                          : "bg-gradient-to-br from-indigo-200 to-blue-200"
                      }
                    `}
                  >
                    <span className="text-purple-700 font-bold text-lg">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}

                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform duration-300"
                    style={{
                      backgroundImage:
                        step.number === "01"
                          ? "linear-gradient(135deg, #D4F1F4 0%, #E9D5FF 100%)"
                          : step.number === "02"
                          ? "linear-gradient(135deg, #D4F1F4 0%, #A7F3D0 100%)"
                          : step.number === "03"
                          ? "linear-gradient(135deg, #FECACA 0%, #FBCFE8 100%)"
                          : "linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)", // default
                    }}
                  >
                    <div className="text-white">{step.icon}</div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-lg">
                    {step.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-white/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">Ready to begin?</span>
            </div>
            <Button className=" px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              Start Your Session
            </Button>
          </div>
        </div>

        {/* Subtle tagline */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-500 font-light italic">
            "The calm in the conversation."
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

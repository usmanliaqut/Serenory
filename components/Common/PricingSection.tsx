import React from "react";
import { Calendar, Heart, Shield, Clock, Check, Star } from "lucide-react";
import { Button } from "../ui/button";

interface PricingOption {
  id: number;
  title: string;
  price: number;
  duration: string;
  description?: string;
  features?: string[];
  popular?: boolean;
  icon?: React.ReactNode;
}

interface PricingSectionProps {
  onBookSession?: (session: PricingOption) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onBookSession }) => {
  const pricingOptions: PricingOption[] = [
    {
      id: 1,
      title: "Serenory Drift",
      price: 5,
      duration: "15 minutes",
      description: "A gentle moment to share what's on your mind",
      icon: <Heart className="w-6 h-6" />,
      features: [
        "15-minute session",
        "Confidential & anonymous",
        "Voice, video, or text",
        "Non-judgmental listening",
      ],
    },
    {
      id: 2,
      title: "Serenory Anchor",
      price: 10,
      duration: "30 minutes",
      description: "A deeper space to explore and process your thoughts",
      icon: <Shield className="w-6 h-6" />,
      popular: true,
      features: [
        "30-minute session",
        "Confidential & anonymous",
        "Voice, video, or text",
        "Non-judgmental listening",
        "Optional Echo Note reflection",
      ],
    },
    {
      id: 3,
      title: "Serenory Haven",
      price: 20,
      duration: "60 minutes",
      description:
        "A comprehensive space for meaningful conversation and reflection",
      icon: <Clock className="w-6 h-6" />,
      features: [
        "60-minute session",
        "Confidential & anonymous",
        "Voice, video, or text",
        "Non-judgmental listening",
        "Optional Echo Note reflection",
      ],
    },
  ];

  const handleBooking = (option: PricingOption) => {
    // sends only the needed data
    onBookSession?.({
      id: option.id,
      title: option.title,
      duration: option.duration,
      price: option.price,
    });
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden" id="pricing">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-emerald-50/30" />

        {/* Serene nature background - peaceful lake at sunset */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')",
          }}
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/45 backdrop-blur-[0.5px]" />

        {/* Soft radial glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,69,19,0.05),transparent_70%)]" />

        {/* Floating elements */}
        <div
          className="absolute top-1/4 left-1/6 w-36 h-36 bg-blue-200/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/5 w-28 h-28 bg-emerald-200/15 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-amber-200/10 rounded-full blur-lg animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg border border-white/50">
            <Heart className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-semibold text-gray-700 tracking-wide">
              PRICING
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Simple, caring
            <span className="block bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
              pricing.
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Transparent pricing for emotional wellness. No hidden fees, just
            honest support when you need it most.
          </p>
        </div>

        {/* Pricing Info Section */}
        <div className="mb-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-emerald-600" />
                Our Promise to You
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                We believe everyone deserves to be heard. Our pricing reflects
                our commitment to making emotional wellness accessible while
                ensuring our companions can provide the quality presence you
                deserve.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    No hidden fees or surprise charges
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    5-minute reconnection grace period
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    Complete anonymity guaranteed
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    Available 24/7 when you need us
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Reconnection Guarantee
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  If your session drops due to technical issues, you'll have a
                  5-minute grace period to reconnect without additional charges.
                  We never want you to feel cut off when you need support most.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingOptions.map((option, index) => (
            <div
              key={option.id}
              className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                option.popular ? "ring-2 ring-emerald-500 ring-opacity-50" : ""
              }`}
            >
              {option.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400  text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
                    <Star className="w-4 h-4 mr-1" /> Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg ${
                    index === 0
                      ? "bg-gradient-to-br from-pink-500 to-rose-600"
                      : index === 1
                      ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                      : "bg-gradient-to-br from-blue-500 to-purple-600"
                  }`}
                >
                  <div className="text-white">{option.icon}</div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${option.price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    / {option.duration}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{option.description}</p>
              </div>

              <div className="space-y-3 mb-8">
                {option.features?.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleBooking(option)}
                className={`w-full ${
                  option.popular
                    ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                    : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
                } text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                prefix="📅"
              >
                Book This Session
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 font-light italic mb-8">
            "The calm in the conversation."
          </p>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 max-w-2xl mx-auto">
            <h4 className="text-xl font-bold text-gray-900 mb-4">
              Ready to be heard?
            </h4>
            <p className="text-gray-600 mb-6">
              Choose the option that feels right for you. Every conversation is
              a step toward feeling lighter.
            </p>
            <Button
              className=" text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              prefix="❤️"
            >
              <Heart className="w-6 h-6" />
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default PricingSection;

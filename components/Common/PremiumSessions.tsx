import React from "react";
import { Clock, Sparkles } from "lucide-react";

interface SessionOption {
  id: number;
  title: string;
  price: number;
  duration: string;
  shortDescription: string;
  mainDescription: string;
}

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

const PremiumSessions: React.FC<PricingSectionProps> = ({ onBookSession }) => {
  const sessions: SessionOption[] = [
    {
      id: 1,
      title: "Quiet Continuation",
      price: 30,
      duration: "75 mins",
      shortDescription: "For when you are not ready to end the conversation.",
      mainDescription:
        "A gentle, extended space that gives you more time to settle, share and continue your thoughts with calm, steady presence.",
    },
    {
      id: 2,
      title: "Deep Presence",
      price: 45,
      duration: "90 mins",
      shortDescription: "For slow, unhurried presence and deeper calm.",
      mainDescription:
        "A spacious, unhurried session created for moments that need more room, more quiet and a steady companion throughout.",
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
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-emerald-50/30" />

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1680140/pexels-photo-1680140.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')",
          }}
        />

        <div className="absolute inset-0 bg-white/40 backdrop-blur-[0.5px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,69,19,0.06),transparent_70%)]" />

        <div
          className="absolute top-1/4 left-1/6 w-48 h-48 bg-blue-300/25 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/6 w-40 h-40 bg-emerald-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-32 h-32 bg-cyan-300/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "7s", animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/2 right-1/4 w-24 h-24 bg-teal-300/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "3s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg border border-white/50">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-semibold text-gray-700 tracking-wide">
              EXTENDED PRESENCE TIER
            </span>
          </div> */}

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Premium
            <span className="block bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
              Sessions
            </span>
          </h2>

          {/* <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            For those who need more time, more quiet, and a deeper space to rest
            and reflect.
          </p> */}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {sessions.map((session, index) => (
            <div
              key={session.id}
              className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-10 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-center mb-8">
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg ${
                    index === 0
                      ? "bg-gradient-to-br from-blue-500 to-cyan-600"
                      : "bg-gradient-to-r from-emerald-500 to-teal-400"
                  }`}
                >
                  <Clock className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {session.title}
                </h3>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${session.price}
                  </span>
                  <span className="text-gray-600 ml-2 text-lg">
                    / {session.duration}
                  </span>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-6 border border-emerald-100">
                  {/* <p className="text-sm font-semibold text-gray-700 mb-1">
                    Short description:
                  </p> */}
                  <p className="text-gray-600 italic">
                    {session.shortDescription}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                  {/* <p className="text-sm font-semibold text-gray-700 mb-2">
                    Main description:
                  </p> */}
                  <p className="text-gray-700 leading-relaxed">
                    {session.mainDescription}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleBooking(session)}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 ${
                  index === 0
                    ? "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                    : "bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500"
                }`}
              >
                Book This Session
              </button>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 max-w-2xl mx-auto">
            <h4 className="text-xl font-bold text-gray-900 mb-4">
              Need help choosing?
            </h4>
            <p className="text-gray-600 leading-relaxed">
              These extended sessions are designed for moments when you need
              more than a brief conversation. Whether you're continuing a
              thought or seeking deeper presence, we're here to hold space for
              you.
            </p>
          </div>
        </div> */}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default PremiumSessions;

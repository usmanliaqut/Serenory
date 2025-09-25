import React from "react";
import { Star, Heart, Shield, Clock } from "lucide-react";
import { Button } from "../ui/button";

const TestimonialsSection: React.FC = () => {
  return (
    <section
      className="relative py-20 lg:py-32 overflow-hidden"
      id="testimonials"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-emerald-50/50 to-amber-50/40" />

        {/* Serene nature background - sunrise over forest */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')",
          }}
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[0.5px]" />

        {/* Soft radial glows - sunrise colors */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(249,115,22,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.06),transparent_70%)]" />

        {/* Floating elements */}
        <div
          className="absolute top-1/4 left-1/6 w-32 h-32 bg-amber-200/25 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-orange-200/20 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-emerald-200/15 rounded-full blur-lg animate-pulse"
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
              TESTIMONIALS
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Stories of being
            <span className="block bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
              truly heard.
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Real experiences from people who found peace in sharing their
            stories.
          </p>
        </div>

        {/* Rating Banner */}
        <div className="mb-16 relative">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 max-w-md mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-8 h-8 text-amber-400 fill-current"
                    style={{
                      animationDelay: `${i * 100}ms`,
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                    }}
                  />
                ))}
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                4.9 out of 5
              </p>
              <p className="text-gray-600 font-medium">
                Based on 2,400+ listening sessions
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Testimonial 1 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-emerald-600" />
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
              "I never expected to feel so understood. My Serenory Companion
              listened without judgment and helped me process feelings I'd been
              carrying alone for months."
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">AL</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Alex L.</div>
                <div className="text-sm text-gray-600">
                  Marketing Professional
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-blue-600" />
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
              "The anonymity gave me the courage to share things I'd never told
              anyone. I left feeling lighter and more at peace than I had in
              years."
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">MK</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Maria K.</div>
                <div className="text-sm text-gray-600">Teacher</div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-amber-600" />
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
              "Being able to talk whenever I needed, without appointments or
              waiting lists, was exactly what I needed during a difficult time.
              Pure relief."
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">DJ</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">David J.</div>
                <div className="text-sm text-gray-600">Software Engineer</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 font-light italic mb-8">
            "The calm in the conversation."
          </p>

          <Button className="inline-flex items-center gap-3  px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <Heart className="w-6 h-6" />
            Share Your Story Today
          </Button>
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default TestimonialsSection;

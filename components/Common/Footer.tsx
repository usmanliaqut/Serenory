import React from "react";
import {
  MessageCircle,
  Mail,
  MapPin,
  Heart,
  Shield,
  Clock,
  Users,
  MessageSquare,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-teal-900 to-indigo-900" />

        {/* Serene night background - peaceful starry sky */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')",
          }}
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-teal-900/50 to-indigo-900/60" />

        {/* Soft radial glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(71,85,105,0.10),transparent_70%)]" />

        {/* Floating elements */}
        <div
          className="absolute top-1/4 left-1/6 w-24 h-24 bg-teal-300/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/5 w-20 h-20 bg-indigo-300/8 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-300/6 rounded-full blur-lg animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand / About */}
          <div className="md:col-span-2">
            {/* Enhanced Brand Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-teal-500  rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/30 via-transparent to-blue-300/30 rounded-2xl"></div>
                    <MessageCircle className="w-7 h-7 text-white relative z-10" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-teal-300 rounded-full opacity-60"></div>
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-bold  bg-clip-text text-white">
                    Serenory
                  </span>
                  <div className="text-xs text-white font-medium tracking-wide">
                    Talk freely. Feel heard.
                  </div>
                </div>
              </div>

              <p className="text-slate-200 mb-6 max-w-md leading-relaxed">
                A gentle space for your thoughts. We provide confidential
                listening sessions where you can share freely and feel truly
                heard. Not therapy or medical care—just the simple power of
                human connection.
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Shield className="w-4 h-4 text-teal-400" />
                  <span>Private & Confidential</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Heart className="w-4 h-4 text-teal-400" />
                  <span>Non-Judgmental</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span>Flexible hours, same-day availability</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Users className="w-4 h-4 text-teal-400" />
                  <span>Caring Listeners</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-teal-400" />
                Get in Touch
              </h4>

              <div className="space-y-3 text-slate-200">
                {/* General inquiries & booking confirmations */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">hello@serenory.co</span>
                    <span className="text-sm text-slate-400">
                      For general inquiries & booking confirmations
                    </span>
                  </div>
                </div>

                {/* After-session or technical support */}
                <div className=" items-center gap-3 sm:flex hidden">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">support@serenory.co</span>
                    <span className="text-sm text-slate-400">
                      For after-session or technical support
                    </span>
                  </div>
                </div>

                {/* Accessible online */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span>Accessible online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300">
            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
              Our Quiet Promise
            </h3>

            <p className="text-slate-300 mb-4">
              Every conversation at{" "}
              <span className="text-white font-medium">Serenory</span> rests on
              five gentle principles:
            </p>

            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-2 hover:text-white transition-colors duration-200">
                <div className="w-1.5 h-1.5 mt-2 bg-teal-400 rounded-full"></div>
                <span>
                  <strong className="text-white">Presence</strong> – You'll
                  always find a calm, caring listener.
                </span>
              </li>
              <li className="flex items-start gap-2 hover:text-white transition-colors duration-200">
                <div className="w-1.5 h-1.5 mt-2 bg-teal-400 rounded-full"></div>
                <span>
                  <strong className="text-white">Privacy</strong> – What's
                  shared here, stays here.
                </span>
              </li>
              <li className="flex items-start gap-2 hover:text-white transition-colors duration-200">
                <div className="w-1.5 h-1.5 mt-2 bg-teal-400 rounded-full"></div>
                <span>
                  <strong className="text-white">Simplicity</strong> – Book when
                  you need to — no waiting, no forms.
                </span>
              </li>
              <li className="flex items-start gap-2 hover:text-white transition-colors duration-200">
                <div className="w-1.5 h-1.5 mt-2 bg-teal-400 rounded-full"></div>
                <span>
                  <strong className="text-white">Warmth</strong> – We listen
                  without judgment or advice.
                </span>
              </li>
              <li className="flex items-start gap-2 hover:text-white transition-colors duration-200">
                <div className="w-1.5 h-1.5 mt-2 bg-teal-400 rounded-full"></div>
                <span>
                  <strong className="text-white">Trust</strong> – Your comfort
                  and safety come first.
                </span>
              </li>
            </ul>

            {/* Soft divider */}
            <div className="my-6 h-px bg-white/10"></div>

            <p className="text-sm text-slate-400 italic">
              Wellness Packages –{" "}
              <span className="text-slate-500">Coming Soon</span>
              <br />
              For those who'd like gentle, ongoing conversations and reflective
              follow-ups.
            </p>
          </div>

          {/* Support */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
              Support & Info
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-2 hover:text-white transition-colors duration-200 cursor-pointer">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                Privacy Policy
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors duration-200 cursor-pointer">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                Terms of Use
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors duration-200 cursor-pointer">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                Refund Policy
              </li>
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-slate-300 mb-2">
                &copy; {currentYear} Serenory. All rights reserved.
              </p>
              <p className="text-sm text-slate-400 italic">
                "The calm in the conversation."
              </p>
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="mt-8 bg-amber-500/10 backdrop-blur-sm rounded-2xl p-6 border border-amber-400/20">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-amber-200 mb-2">
                Important Notice
              </h4>
              <p className="text-amber-100 text-sm leading-relaxed">
                Serenory provides emotional wellness support through listening
                sessions. We are not a therapy, counseling, medical, or
                emergency service. If you're experiencing a mental health
                crisis, please contact your local emergency services or a
                qualified mental health professional.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </footer>
  );
};

export default Footer;

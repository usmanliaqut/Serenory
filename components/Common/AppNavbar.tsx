"use client";

import { MessageCircle } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const AppNavbar = () => {
  return (
    <>
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo + Tagline */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-teal-400 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/30 via-transparent to-blue-300/30 rounded-2xl"></div>
                  <MessageCircle className="w-7 h-7 text-white relative z-10" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-teal-300 rounded-full opacity-60"></div>
                </div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">
                  Serenory
                </span>
                <div className="text-xs text-gray-500 font-medium tracking-wide">
                  Talk freely. Feel heard.
                </div>
              </div>
            </div>

            {/* Links + CTA */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                About
              </Link>
              <Link
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                Pricing
              </Link>
              <Link
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                Contact
              </Link>
              <Link
                href="/AnalyticsDashboard"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105  underline-offset-4  py-6  cursor-pointer hover:underline"
              >
                View Analytics
              </Link>
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:scale-105 transition-transform duration-200"
              >
                Book Session
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppNavbar;

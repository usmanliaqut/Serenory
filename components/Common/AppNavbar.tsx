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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Serenory
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#services"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                Services
              </Link>
              <Link
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                About
              </Link>
              <Link
                href="#pricing"
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
              <Button
                size="sm"
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

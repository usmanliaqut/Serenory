import React from "react";
import { CheckCircle, Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SessionType {
  id: number;
  title: string;
  duration: string;
  price: number;
}

interface PricingSectionProps {
  onBookSession: (session: SessionType) => void;
}

export default function PricingSection({ onBookSession }: PricingSectionProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {/* Drift Plan */}
      <div className="bg-card border border-border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative animate-fade-in-up">
        <div className="p-8 text-center">
          <h3 className="text-2xl font-bold text-card-foreground mb-2">
            Serenory Drift
          </h3>
          <div className="text-4xl font-bold text-primary mb-4">$5</div>
          <p className="text-muted-foreground mb-6">
            A gentle moment to share what's on your mind
          </p>

          <ul className="space-y-3 mb-8 text-left">
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <span className="text-card-foreground">15-minute session</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <span className="text-card-foreground">
                Confidential & anonymous
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <span className="text-card-foreground">
                Voice, video, or text
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <span className="text-card-foreground">
                Non-judgmental listening
              </span>
            </li>
          </ul>

          <button
            onClick={() =>
              onBookSession({
                id: 1,
                title: "Serenory Drift",
                duration: "15 minutes",
                price: 5,
              })
            }
            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 hover:scale-105 transform"
          >
            Begin Your Session
          </button>
        </div>
      </div>
      <div className="bg-card border-2 border-primary rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative animate-fade-in-up animation-delay-200">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center">
            <Star className="w-4 h-4 mr-1" />
            Most Popular
          </div>
        </div>

        <div className="p-8 text-center">
          <h3 className="text-2xl font-bold text-card-foreground mb-2">
            Serenory Anchor
          </h3>
          <div className="text-4xl font-bold text-primary mb-4">$10</div>
          <p className="text-muted-foreground mb-6">
            A deeper space to explore and process your thoughts
          </p>

          <ul className="space-y-3 mb-8 text-left">
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <span className="text-card-foreground">30-minute session</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <span className="text-card-foreground">
                Confidential & anonymous
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <span className="text-card-foreground">
                Voice, video, or text
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <span className="text-card-foreground">
                Non-judgmental listening
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <span className="text-card-foreground">
                Optional Echo Note reflection
              </span>
            </li>
          </ul>

          <button
            onClick={() =>
              onBookSession({
                id: 2,
                title: "Serenory Anchor",
                duration: "30 minutes",
                price: 10,
              })
            }
            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 hover:scale-105 transform"
          >
            Begin Your Session
          </button>
        </div>
      </div>

      {/* Serenory Haven */}
      <div className="bg-card border border-border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative animate-fade-in-up animation-delay-400">
        <div className="p-8 text-center">
          <h3 className="text-2xl font-bold text-card-foreground mb-2">
            Serenory Haven
          </h3>
          <div className="text-4xl font-bold text-primary mb-4">$20</div>
          <p className="text-muted-foreground mb-6">
            A comprehensive space for meaningful conversation and reflection
          </p>

          <ul className="space-y-3 mb-8 text-left">
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <span className="text-card-foreground">60-minute session</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <span className="text-card-foreground">
                Confidential & anonymous
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <span className="text-card-foreground">
                Voice, video, or text
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <span className="text-card-foreground">
                Non-judgmental listening
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <span className="text-card-foreground">
                Optional Echo Note reflection
              </span>
            </li>
          </ul>

          <button
            onClick={() =>
              onBookSession({
                id: 3,
                title: "Serenory Haven",
                duration: "60 minutes",
                price: 20,
              })
            }
            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 hover:scale-105 transform"
          >
            Begin Your Session
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, Mail, Phone, MapPin, CreditCard } from "lucide-react";
import { FinalPaymentPage } from "@/components/Common/FinalPaymentPage";

interface UserDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: {
    id: number;
    title: string;
    duration: string;
    price: number;
  };
  selectedDate: string;
  selectedTime: string;
  paymentMethod: string;
  total: number;
}

export function UserDetailsModal({
  open,
  onOpenChange,
  session,
  selectedDate,
  selectedTime,
  paymentMethod,
  total,
}: UserDetailsModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [showFinalPayment, setShowFinalPayment] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone && formData.address) {
      setShowFinalPayment(true);
    }
  };

  const isFormValid =
    formData.name && formData.email && formData.phone && formData.address;

  return (
    <>
      <Dialog open={open && !showFinalPayment} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md rounded-2xl shadow-xl border-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          <DialogHeader className="text-center space-y-2">
            <DialogTitle className="flex items-center justify-center gap-2 text-xl font-semibold text-emerald-700">
              <User className="h-5 w-5 text-emerald-600" />
              Your Details
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-sm">
              Provide your contact information to continue with your booking
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Full Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="pl-10 rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="pl-10 rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-sm font-medium text-gray-700"
              >
                Address *
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                <Input
                  id="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="pl-10 rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Continue Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 text-white rounded-xl shadow-md hover:opacity-90 transition-all"
              disabled={!isFormValid}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Continue to Payment
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Final Payment Page */}
      <FinalPaymentPage
        open={showFinalPayment}
        onOpenChange={setShowFinalPayment}
        session={session}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        paymentMethod={paymentMethod}
        total={total}
        userDetails={formData}
      />
    </>
  );
}

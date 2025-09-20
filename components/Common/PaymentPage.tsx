"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, CreditCard, ChevronLeft, User } from "lucide-react";
import { UserDetailsModal } from "../Modal/UsersModal";

interface PaymentPageProps {
  session: {
    id: number;
    title: string;
    duration: string;
    price: number;
  };
  selectedDate: string;
  selectedTime: string;
  onBack: () => void;
}

const paymentMethods = [{ id: "card", name: "Stripe", icon: CreditCard }];

export function PaymentPage({
  session,
  selectedDate,
  selectedTime,
  onBack,
}: PaymentPageProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [showUserModal, setShowUserModal] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const serviceFee = Math.round(session.price * 0.05); // 5% service fee
  const total = session.price + serviceFee;

  const handleContinue = () => {
    setShowUserModal(true);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-xl font-semibold">Payment Details</h2>
            <p className="text-sm text-muted-foreground">
              Review and complete your booking
            </p>
          </div>
        </div>

        {/* Booking Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">{session.title}</h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(selectedDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{selectedTime}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Session ({session.duration})</span>
                <span>${session.price}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Service fee</span>
                <span>${serviceFee}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`w-full p-4 rounded-lg border text-left transition-colors ${
                    selectedPaymentMethod === method.id
                      ? "bg-primary/5 border-primary"
                      : "bg-card hover:bg-muted border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{method.name}</span>
                    {selectedPaymentMethod === method.id && (
                      <Badge variant="default" className="ml-auto">
                        Selected
                      </Badge>
                    )}
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button className="w-full" size="lg" onClick={handleContinue}>
          <User className="h-4 w-4 mr-2" />
          Continue to Details
        </Button>
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        open={showUserModal}
        onOpenChange={setShowUserModal}
        session={session}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        paymentMethod={selectedPaymentMethod}
        total={total}
      />
    </>
  );
}

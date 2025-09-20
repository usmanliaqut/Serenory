"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  CheckCircle,
  Loader2,
} from "lucide-react";

interface FinalPaymentPageProps {
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
  userDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export function FinalPaymentPage({
  open,
  onOpenChange,
  session,
  selectedDate,
  selectedTime,
  paymentMethod,
  total,
  userDetails,
}: FinalPaymentPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setIsComplete(true);
  };

  const handleClose = () => {
    setIsComplete(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {!isComplete ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Complete Payment
              </DialogTitle>
              <DialogDescription>
                Review your booking details and complete the payment
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Session Details */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Session Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h3 className="font-semibold">{session.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Duration: {session.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(selectedDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Details */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{userDetails.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{userDetails.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{userDetails.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{userDetails.address}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Summary */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Session fee</span>
                    <span>${session.price}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Service fee</span>
                    <span>${total - session.price}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <CreditCard className="h-4 w-4" />
                    <span className="text-sm capitalize">
                      {paymentMethod.replace("_", " ")}
                    </span>
                    <Badge variant="outline">Selected</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Button */}
              <Button
                className="w-full"
                size="lg"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay ${total}
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                Booking Confirmed!
              </DialogTitle>
              <DialogDescription>
                Your session has been successfully booked
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 text-center">
              <div className="bg-green-50 p-6 rounded-lg">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Payment Successful!
                </h3>
                <p className="text-green-700">
                  You will receive a confirmation email shortly with your
                  session details.
                </p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Session:</span>
                      <span className="font-medium">{session.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">
                        {formatDate(selectedDate)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Paid:</span>
                      <span className="font-medium">${total}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

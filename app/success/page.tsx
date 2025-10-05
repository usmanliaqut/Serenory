// /app/success/page.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton"; // Or any loading spinner
import { BookingSuccessContent } from "@/components/BookingSuccessContent";

// Define the structure of your booking details
interface BookingDetails {
  expertName: string;
  expertTitle: string;
  date: string;
  time: string;
  duration: string;
  confirmationId: string;
}

// A loading component to show while fetching data
function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl p-4">
        <div className="flex justify-center mb-8">
          <Skeleton className="w-24 h-24 rounded-full" />
        </div>
        <Skeleton className="w-full h-96" />
      </div>
    </div>
  );
}

function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      // Fetch the booking details from your own API
      fetch(`/api/get-booking-details?session_id=${sessionId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch booking details.");
          }
          return res.json();
        })
        .then((data) => {
          setBookingDetails(data);
        })
        .catch((err) => {
          console.error(err);
          setError("Could not retrieve your booking information.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("No session ID found.");
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Once data is loaded, render the success content
  return <BookingSuccessContent bookingDetails={bookingDetails} />;
}

// Wrap the page in a Suspense boundary because useSearchParams requires it.
export default function SuccessPageWrapper() {
  return (
    <Suspense fallback={<LoadingState />}>
      <SuccessPage />
    </Suspense>
  );
}

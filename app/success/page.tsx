// Assuming you have a stripe instance configured
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// 1. IMPORT YOUR NEW CLIENT COMPONENT
import { BookingSuccessContent } from "@/components/BookingSuccessContent";

// This page remains a Server Component to handle data fetching securely
export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sessionId = searchParams.session_id as string;

  if (!sessionId) {
    redirect("/");
  }

  try {
    // 2. FETCH THE SESSION FROM STRIPE (Server-side)
    const session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.retrieve(sessionId);

    const metadata = session.metadata;

    // 3. MAP THE STRIPE DATA TO THE PROPS YOUR COMPONENT EXPECTS
    const bookingDetailsForClient = {
      expertName: metadata?.name || "Your Consultant",
      expertTitle: metadata?.type || "1-on-1 Session", // Assuming 'type' is the title
      date: new Date(metadata?.time!).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: new Date(metadata?.time!).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      }),
      duration: "60 minutes", // You can store this in metadata if it's dynamic
      confirmationId: session.id, // Use the Stripe session ID as a unique confirmation
    };

    // 4. RENDER YOUR CLIENT COMPONENT AND PASS THE DATA AS PROPS
    return <BookingSuccessContent bookingDetails={bookingDetailsForClient} />;
  } catch (error) {
    console.error("Error retrieving Stripe session:", error);
    redirect("/cancel"); // Or redirect to a generic error page
  }
}

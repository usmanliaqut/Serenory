import Link from "next/link";
import Image from "next/image";
import AppNavbar from "@/components/Common/AppNavbar";
import Footer from "@/components/Common/Footer";
import BookingPlace from "@/components/Common/BookingPlace";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <AppNavbar />
      <BookingPlace />
      <Footer />
    </div>
  );
}

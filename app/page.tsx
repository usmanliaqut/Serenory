import AppNavbar from "@/components/Common/AppNavbar";
import Footer from "@/components/Common/Footer";
import BookingPlace from "@/components/Common/BookingPlace";

export default function HomePage() {
  return (
    <div className="min-h-screen calm-bg flex flex-col">
      {/* Navigation */}
      <AppNavbar />
      <main className="flex-1">
        <BookingPlace />
      </main>
      <Footer />
    </div>
  );
}

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const Logo1 = () => (
  <Image
    src="/serenory-logo.png"
    alt="Serenory Logo"
    width={100}
    height={100}
  />
);

function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-emerald-50/20">
      <nav className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Logo1 />
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="max-w-3xl mx-auto bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Terms of Use
          </h1>

          <p className="text-gray-600 mb-8">Last Updated: 2025</p>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-8">
              Welcome to Serenory. By using this platform, you agree to the
              terms below, created to keep your experience safe, respectful, and
              meaningful.
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What Serenory Offers
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Serenory provides gentle conversational presence — through text,
                voice, or video — designed to bring ease, clarity, and human
                warmth.
              </p>
              <p className="text-gray-700 leading-relaxed font-medium">
                Our Companions offer listening, steadiness, and emotional
                presence. They do not provide therapy, diagnosis, crisis
                support, or professional advice.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Using Serenory
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By joining Serenory, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Be at least 18 years old</li>
                <li>Engage respectfully with Companion Guides</li>
                <li>Use the service in good intention</li>
                <li>
                  Refrain from harmful, abusive, or inappropriate behaviour
                </li>
                <li>Not request clinical or medical guidance</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Bookings & Payments
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Sessions are prepaid through secure providers (Stripe or
                  PayPal)
                </li>
                <li>Pricing is shown clearly before booking</li>
                <li>A confirmation email is sent for every session</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What You Can Expect From Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Companions will:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Meet you with presence and confidentiality</li>
                <li>Offer calm, attentive listening</li>
                <li>Maintain boundaries that keep the space gentle and safe</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Responsibilities
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Keeping your login details secure</li>
                <li>Ensuring your device and internet are functioning</li>
                <li>Using Serenory with respect and honesty</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Important Note
              </h2>
              <p className="text-gray-700 leading-relaxed font-medium">
                Serenory is not a crisis service. If you feel unsafe or in
                danger, please contact emergency services in your location.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                For general inquiries:{" "}
                <a
                  href="mailto:hello@serenory.co"
                  className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  hello@serenory.co
                </a>
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}

export default TermsOfUse;

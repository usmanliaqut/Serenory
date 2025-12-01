import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Logo1 = () => (
  <Image
    src="/serenory-logo.png"
    alt="Serenory Logo"
    width={100}
    height={100}
  />
);

export const metadata = {
  title: "Privacy Policy – Serenory",
  description: "How Serenory protects your data and privacy.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-emerald-50/20">
      <nav className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-1">
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
            Privacy Policy
          </h1>

          <p className="text-gray-600 mb-8">Last Updated: 2025</p>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-8">
              At Serenory, your privacy is treated with quiet respect.
              Everything you share is held with care, confidentiality, and
              dignity.
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Information We Collect
              </h2>
              <p className="text-gray-700 mb-4">
                We ask for only what supports your experience:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Your name and email for booking confirmation</li>
                <li>
                  Secure payment details processed through trusted partners
                </li>
                <li>Session preferences</li>
                <li>Light usage data for improving the platform</li>
              </ul>
              <p className="text-gray-700 mt-4 font-medium">
                We never record sessions or store personal conversations.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How Your Information Is Used
              </h2>
              <p className="text-gray-700 mb-4">
                Your information is used solely to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Create and support your account</li>
                <li>Deliver secure payments</li>
                <li>Host your session format</li>
                <li>Maintain platform stability</li>
                <li>Send confirmations and updates</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How We Protect Your Information
              </h2>
              <p className="text-gray-700 mb-4">
                Your information is protected through:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Encrypted systems</li>
                <li>PCI-compliant payment processors</li>
                <li>Strict minimal access policies</li>
                <li>Commitment to never share or sell your data</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Trusted Service Partners
              </h2>
              <p className="text-gray-700">
                We partner with secure providers — hosting, payments, and
                security — who comply with global standards. They receive only
                what is required.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Choices and Rights
              </h2>
              <p className="text-gray-700 mb-4">You may request to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>View your account information</li>
                <li>Correct or update your details</li>
                <li>Request deletion</li>
                <li>Close your Serenory account</li>
              </ul>
              <p className="text-gray-700 mt-4">
                We respond with care and clarity.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
              <p className="text-gray-700">
                For privacy questions:{" "}
                <a
                  href="mailto:hello@serenory.co"
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
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

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

function RefundPolicy() {
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
            Refund Policy
          </h1>

          <p className="text-gray-600 mb-8">Last Updated: 2025</p>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-8">
              We want your experience at Serenory to feel calm from beginning to
              end. Our refund guidelines are designed to be simple and fair.
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                When Refunds Are Offered
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                A full refund may be issued when:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>A Companion Guide does not join the scheduled session</li>
                <li>You cancel at least 2 hours in advance</li>
                <li>A platform issue prevents the session from taking place</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                When Refunds Cannot Be Offered
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Refunds are not available if:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You miss the session</li>
                <li>You arrive more than 10 minutes late</li>
                <li>The session has already been completed</li>
                <li>Your device or internet issues prevent joining</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Rescheduling
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You may reschedule once at no cost if requested at least 2 hours
                before your session.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How Refunds Are Processed
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">If approved:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Refunds return to your original payment method</li>
                <li>
                  Processing times vary from 5–10 business days depending on
                  your provider
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                For refund support:{" "}
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

export default RefundPolicy;

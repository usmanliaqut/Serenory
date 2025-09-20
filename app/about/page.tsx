import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Shield,
  Users,
  Clock,
  CheckCircle,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                A Safe Space to Talk
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/#services"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </Link>
              <Link href="/about" className="text-foreground font-medium">
                About
              </Link>
              <Link
                href="/#pricing"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/#contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Button
                size="sm"
                className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-400 text-white text-lg py-6 rounded-xl shadow-lg hover:opacity-90 transition"
              >
                Book Session
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              About Us
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Creating Safe Spaces for Meaningful Conversations
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              We believe everyone deserves a private, secure space to have
              important conversations. Our platform makes it easy to book and
              attend confidential 1-on-1 sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We're dedicated to providing a secure, professional platform
                where people can engage in private 1-on-1 sessions with complete
                confidence and peace of mind.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you need a space for personal conversations,
                professional consultations, or confidential discussions, we've
                built our platform with privacy and security as the foundation.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    500+
                  </div>
                  <div className="text-muted-foreground">
                    Sessions Completed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    98%
                  </div>
                  <div className="text-muted-foreground">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-border/50">
                <CardHeader className="text-center">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">Secure Platform</CardTitle>
                  <CardDescription>
                    End-to-end encryption for all sessions
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border/50">
                <CardHeader className="text-center">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">Personal Focus</CardTitle>
                  <CardDescription>Dedicated 1-on-1 attention</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border/50">
                <CardHeader className="text-center">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">Flexible Timing</CardTitle>
                  <CardDescription>
                    Book sessions that fit your schedule
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border/50">
                <CardHeader className="text-center">
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">Quality Service</CardTitle>
                  <CardDescription>
                    Professional and reliable experience
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape the experience
              we provide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/50 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-4">Privacy First</CardTitle>
                <CardDescription className="text-base">
                  Your privacy is non-negotiable. We use the latest security
                  measures to ensure all sessions remain completely
                  confidential.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-4">User-Centered</CardTitle>
                <CardDescription className="text-base">
                  Every feature is designed with your needs in mind. Simple
                  booking, flexible scheduling, and intuitive interface.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-4">Reliability</CardTitle>
                <CardDescription className="text-base">
                  Consistent, dependable service you can count on. Professional
                  platform with 99.9% uptime guarantee.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join hundreds of satisfied users who trust our platform for their
            private sessions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Book Your First Session
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

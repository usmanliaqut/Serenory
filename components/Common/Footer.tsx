import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer id="contact" className="bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  Talk freely. Feel heard
                </span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Talk freely. Feel heard provides confidential, non-clinical
                listening sessions. We are not a therapy, medical, or emergency
                service.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">
                    hello@safespacetotalk.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">
                    Based in UAE · Available world
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Services</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>1-on-1 Sessions</li>
                <li>Flexible Scheduling</li>
                <li>Secure Platform</li>
                <li>Easy Booking</li>
                <li>Session Packages</li>
                <li>Monthly Plans</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Booking Help</li>
                <li>Technical Support</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 A Safe Space to Talk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

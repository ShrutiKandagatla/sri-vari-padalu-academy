import React from 'react';
import { MapPin, Phone, Heart } from 'lucide-react';

export const Footer = ({ contactData }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-400">Srivari Padalu Dance Academy</h3>
            <p className="text-amber-100 text-sm leading-relaxed">
              Preserving the rich heritage of Bharatnatyam and Kuchipudi through dedicated teaching and performances.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-400">Quick Links</h3>
            <ul className="space-y-2">
              {['home', 'about', 'gallery', 'events', 'team', 'classes', 'contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link)}
                    className="text-amber-100 hover:text-amber-300 transition-colors capitalize text-sm"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-amber-100 text-sm">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href={`tel:${contactData.phone}`} className="hover:text-amber-300 transition-colors">
                  {contactData.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-amber-100 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>8 House no 318, Street no, Rd Number 7, near New club &Geetha nurshing homeSecunderabad, Aswini Colony, West Marredpally, Hyderabad, Secunderabad, Telangana 500026</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-700/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-amber-100 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Srivari Padalu Dance Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a 
              href="/admin/login" 
              className="text-amber-100 hover:text-amber-300 text-sm transition-colors duration-300"
            >
              Admin Login
            </a>
            <p className="text-amber-100 text-sm flex items-center gap-2">
              Made with <Heart className="h-4 w-4 text-red-400 fill-current" /> for the love of classical dance
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

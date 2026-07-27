import React from "react";
import {
  Twitter,
  Linkedin,
  Youtube,
  ExternalLink,
  ArrowUp,
} from "lucide-react";
import { getNavigationItems } from "../constants/navigation";
import { useProgramAreas } from "../hooks/useProgramAreas";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { programAreas } = useProgramAreas();
  const footerSections = getNavigationItems(programAreas);

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith("/")) {
      window.location.href = href;
    } else if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:bg-blue-700 transition-all duration-300 transform hover:scale-110 z-50 group"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
      </button>

      <footer
        id="contact"
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center motion-pulse bg-white">
                  <img
                    src="/gei-logo.svg"
                    alt="GEI Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-playfair">GEI</h3>
                  <p className="text-gray-400 text-sm">
                    Global Envirohealth Initiative
                  </p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                Creating sustainable solutions that transform communities and
                protect our planet through innovative programs and collaborative
                partnerships.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-800 transition-all duration-300 group transform hover:scale-110"
                    >
                      <IconComponent className="w-5 h-5 group-hover:text-blue-400 transition-colors group-hover:scale-110 transition-transform" />
                    </a>
                  );
                })}
              </div>
            </div>

            {footerSections.map((section) => (
              <div key={section.name}>
                <h4 className="text-lg font-semibold mb-6 font-playfair">
                  {section.name}
                </h4>
                <ul className="space-y-3 mb-8">
                  {section.dropdownItems.map((link) => (
                    <li key={link.path}>
                      <button
                        onClick={() => handleLinkClick(link.path)}
                        className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 flex items-center group text-left"
                      >
                        {link.name}
                        <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © {currentYear} Global Envirohealth Initiative. All rights
                reserved.
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

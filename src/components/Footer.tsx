import React from 'react';
import { Twitter, Linkedin, Github, Youtube, Mail, ExternalLink, Leaf, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { name: 'Our Mission', href: '/about#mission' },
      { name: 'Our Team', href: '/about#team' },
      { name: 'History', href: '/about#history' },
      { name: 'Leadership', href: '/about#leadership' },
      { name: 'Partnerships', href: '/about#partnerships' },
      { name: 'Careers', href: '/about#careers' }
    ],
    work: [
      { name: 'Climate Action', href: '/our-work#climate' },
      { name: 'Environmental Health', href: '/our-work#health' },
      { name: 'Sustainable Development', href: '/our-work#development' },
      { name: 'Research Projects', href: '/our-work#research' },
      { name: 'Global Initiatives', href: '/our-work#initiatives' },
      { name: 'Impact Stories', href: '/our-work#impact' }
    ],
    ideas: [
      { name: 'Innovation Hub', href: '/ideas#innovation' },
      { name: 'Policy Papers', href: '/ideas#policy' },
      { name: 'Research Insights', href: '/ideas#insights' },
      { name: 'Future Trends', href: '/ideas#trends' },
      { name: 'Thought Leadership', href: '/ideas#leadership' },
      { name: 'Publications', href: '/ideas#publications' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('/')) {
      window.location.href = href;
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 group"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
      </button>

      <footer id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center motion-pulse">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-playfair">GEI</h3>
                  <p className="text-gray-400 text-sm">Global Environmental Initiative</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                Creating sustainable solutions that transform communities and protect our planet 
                through innovative programs and collaborative partnerships.
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
                      className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 group transform hover:scale-110"
                    >
                      <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* About Us */}
            <div>
              <h4 className="text-lg font-semibold mb-6 font-playfair">About Us</h4>
              <ul className="space-y-3">
                {footerLinks.about.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 flex items-center group"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Work */}
            <div>
              <h4 className="text-lg font-semibold mb-6 font-playfair">Our Work</h4>
              <ul className="space-y-3">
                {footerLinks.work.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 flex items-center group"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ideas & Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-6 font-playfair">Ideas & Innovation</h4>
              <ul className="space-y-3 mb-8">
                {footerLinks.ideas.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 flex items-center group"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Newsletter Signup */}
              <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl border border-gray-600">
                <h5 className="font-semibold mb-3 flex items-center font-playfair">
                  <Mail className="w-4 h-4 mr-2 text-teal-400" />
                  Newsletter
                </h5>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Get environmental insights delivered to your inbox.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 bg-gray-700 text-white text-sm rounded-l-xl focus:outline-none focus:ring-2 focus:ring-teal-500 border border-gray-600"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm rounded-r-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © {currentYear} Global Environmental Initiative. All rights reserved.
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
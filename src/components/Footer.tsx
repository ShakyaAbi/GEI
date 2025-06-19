import React from 'react';
import { Twitter, Linkedin, Github, Youtube, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    research: [
      { name: 'Climate & Health', href: '#' },
      { name: 'Environmental Health', href: '#' },
      { name: 'One Health', href: '#' },
      { name: 'Sustainable Systems', href: '#' },
      { name: 'Pollution & Health', href: '#' },
      { name: 'Health Technology', href: '#' }
    ],
    about: [
      { name: 'Our Mission', href: '#about' },
      { name: 'Faculty', href: '#faculty' },
      { name: 'Publications', href: '#publications' },
      { name: 'News & Events', href: '#news' },
      { name: 'Careers', href: '#' },
      { name: 'Contact Us', href: '#contact' }
    ],
    resources: [
      { name: 'Research Database', href: '#' },
      { name: 'Publication Archive', href: '#' },
      { name: 'Grant Opportunities', href: '#' },
      { name: 'Student Resources', href: '#' },
      { name: 'Partnership Portal', href: '#' },
      { name: 'Media Kit', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-400 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">PHRC</h3>
                <p className="text-gray-400 text-sm">Planetary Health Research</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Pioneering research in planetary health, fostering collaboration and advancing 
              knowledge for a sustainable and healthy future for all.
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
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors group"
                  >
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Research Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Research Areas</h4>
            <ul className="space-y-3">
              {footerLinks.research.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-lg font-semibold mb-6">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 flex items-center group"
                  >
                    {link.name}
                    {link.href.startsWith('#') && (
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h5 className="font-semibold mb-3 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-green-400" />
                Newsletter
              </h5>
              <p className="text-gray-400 text-sm mb-3">
                Get planetary health research updates delivered to your inbox.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-700 text-white text-sm rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-r-lg hover:bg-green-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Planetary Health Research Center. All rights reserved.
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
  );
};

export default Footer;
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && dropdownRefs.current[activeDropdown] && 
          !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const navigationItems = [
    {
      label: 'About Us',
      href: '/about',
      dropdown: [
        { name: 'Our Mission', href: '/about#mission' },
        { name: 'Our Team', href: '/about#team' },
        { name: 'History', href: '/about#history' },
        { name: 'Leadership', href: '/about#leadership' },
        { name: 'Partnerships', href: '/about#partnerships' },
        { name: 'Careers', href: '/about#careers' }
      ]
    },
    {
      label: 'Our Work',
      href: '/our-work',
      dropdown: [
        { name: 'Climate Action', href: '/our-work#climate' },
        { name: 'Environmental Health', href: '/our-work#health' },
        { name: 'Sustainable Development', href: '/our-work#development' },
        { name: 'Research Projects', href: '/our-work#research' },
        { name: 'Global Initiatives', href: '/our-work#initiatives' },
        { name: 'Impact Stories', href: '/our-work#impact' }
      ]
    },
    {
      label: 'Ideas',
      href: '/ideas',
      dropdown: [
        { name: 'Innovation Hub', href: '/ideas#innovation' },
        { name: 'Policy Papers', href: '/ideas#policy' },
        { name: 'Research Insights', href: '/ideas#insights' },
        { name: 'Future Trends', href: '/ideas#trends' },
        { name: 'Thought Leadership', href: '/ideas#leadership' },
        { name: 'Publications', href: '/ideas#publications' }
      ]
    }
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('/')) {
      window.location.href = href;
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleNavClick('/')}>
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <div>
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                GEI
              </h1>
              <p className={`text-sm leading-none transition-colors duration-300 ${
                isScrolled ? 'text-gray-600' : 'text-green-100'
              }`}>
                Global Environmental Initiative
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                ref={(el) => dropdownRefs.current[item.label] = el}
              >
                <button
                  onClick={() => toggleDropdown(item.label)}
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  className={`flex items-center space-x-1 font-medium transition-all duration-300 hover:scale-105 ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-green-600' 
                      : 'text-white hover:text-green-200'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      activeDropdown === item.label ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform ${
                    activeDropdown === item.label
                      ? 'opacity-100 translate-y-0 visible'
                      : 'opacity-0 -translate-y-2 invisible'
                  }`}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="py-2">
                    {item.dropdown.map((dropdownItem, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavClick(dropdownItem.href)}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {dropdownItem.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
              isScrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 space-y-2 bg-white/95 backdrop-blur-lg rounded-2xl mt-4 border border-gray-100">
            {navigationItems.map((item) => (
              <div key={item.label} className="px-4">
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="w-full flex items-center justify-between py-3 text-gray-700 font-medium hover:text-green-600 transition-colors duration-200"
                >
                  <span>{item.label}</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      activeDropdown === item.label ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeDropdown === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-4 pb-2 space-y-1">
                    {item.dropdown.map((dropdownItem, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavClick(dropdownItem.href)}
                        className="block w-full text-left py-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
                      >
                        {dropdownItem.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
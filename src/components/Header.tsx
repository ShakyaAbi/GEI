import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOurWorkOpen, setIsOurWorkOpen] = useState(false);
  const ourWorkRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // close mega-menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ourWorkRef.current &&
        !ourWorkRef.current.contains(e.target as Node)
      ) {
        setIsOurWorkOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const desktopLinks = [
    { label: 'About us', href: '#about' },
    { label: 'Our work', href: '#our-work', mega: true },
    { label: 'Ideas', href: '#ideas' },
  ];

  const megaColumns = [
    {
      title: 'Areas of Impact',
      items: ['Health', 'Gender equality', 'Global development', 'Education'],
    },
    {
      title: 'Places',
      items: [
        'Africa',
        'China',
        'East Asia',
        'Europe',
        'India',
        'Middle East',
        'North America',
        'View all',
      ],
    },
    {
      title: 'Program strategies',
      items: [
        'Agricultural Development',
        'Family Planning',
        'Inclusive Financial Systems',
        'Polio',
        'Water, Sanitation & Hygiene',
        'Women in Leadership',
        'View all',
      ],
    },
  ];

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    setIsOurWorkOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PHRC</h1>
              <p className="text-xs text-gray-600 leading-none">Planetary Health</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 relative">
            {desktopLinks.map((link) =>
              link.mega ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setIsOurWorkOpen(true)}
                  onMouseLeave={() => setIsOurWorkOpen(false)}
                >
                  <button
                    ref={ourWorkRef}
                    aria-haspopup="true"
                    aria-expanded={isOurWorkOpen}
                    onClick={() => setIsOurWorkOpen((o) => !o)}
                    className="text-gray-700 hover:text-green-700 font-medium transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                  {isOurWorkOpen && (
                    <div
                      className="absolute top-full left-0 w-screen max-w-6xl bg-white border-b-2 border-gray-300 shadow-md mt-2 px-8 py-6 flex gap-8"
                      role="menu"
                    >
                      {megaColumns.map((col) => (
                        <div key={col.title}>
                          <h3 className="font-bold text-lg mb-3">{col.title}</h3>
                          <ul className="space-y-2">
                            {col.items.map((item) => (
                              <li key={item}>
                                <button
                                  onClick={() => handleNavClick(`#${item.toLowerCase().replace(/\s+/g, '-')}`)}
                                  className="block text-gray-700 hover:underline hover:underline-offset-2 hover:text-green-700 font-normal"
                                >
                                  {item}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-gray-700 hover:text-green-700 font-medium transition-colors duration-200"
                >
                  {link.label}
                </button>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
            {desktopLinks.map((link) =>
              !link.mega ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-gray-700 hover:text-green-700 font-medium py-2 transition-colors duration-200"
                >
                  {link.label}
                </button>
              ) : (
                <>
                  <div
                    key="our-work-mobile-toggle"
                    className="flex items-center justify-between"
                  >
                    <button
                      onClick={() => setIsOurWorkOpen((o) => !o)}
                      className="text-left text-gray-700 hover:text-green-700 font-medium py-2 transition-colors duration-200 flex-1"
                    >
                      {link.label}
                    </button>
                    <span className="px-3">
                      {isOurWorkOpen ? '-' : '+'}
                    </span>
                  </div>
                  {isOurWorkOpen && (
                    <div className="pl-4">
                      {megaColumns.map((col) => (
                        <div key={col.title} className="mb-4">
                          <h4 className="font-semibold">{col.title}</h4>
                          <ul className="space-y-1 mt-2">
                            {col.items.map((item) => (
                              <li key={item}>
                                <button
                                  onClick={() =>
                                    handleNavClick(
                                      `#${item.toLowerCase().replace(/\s+/g, '-')}`
                                    )
                                  }
                                  className="text-gray-700 hover:text-green-700"
                                >
                                  {item}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

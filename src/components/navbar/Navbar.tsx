import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Home } from 'lucide-react';
import { APP_CONFIG } from '../../constants/app';
import { useProgramAreas } from '../../hooks/useProgramAreas';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Fetch program areas for dynamic Our Work dropdown
  const { programAreas } = useProgramAreas();

  const navigationItems = [
    { 
      name: 'Who We Are', 
      path: '/about',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Our Mission', path: '/about#mission', description: 'Learn about our core mission and values' },
        { name: 'Our Team', path: '/about#team', description: 'Meet our leadership and expert team' },
        { name: 'Our History', path: '/about#history', description: 'Our journey and key milestones' },
        { name: 'Our Stories', path: '/our-stories', description: 'Stories of impact and change' },
        { name: 'Partnerships', path: '/about#partnerships', description: 'Our global network of collaborators' },
        
      ]
    },
    { 
      name: 'Our Work', 
      path: '/our-work',
      hasDropdown: true,
      dropdownItems: [
        { name: 'All Programs', path: '/our-work', description: 'All program areas' },
        { name: 'Research & Publications', path: '/our-work/research-publications', description: 'Explore our research and publications' },
        { name: 'Donations & Microloans', path: '/our-work/donations-microloans', description: 'Support and empower communities through giving and microfinance' },
        ...(programAreas && programAreas.length > 0
          ? programAreas.map(area => ({
              name: area.name,
              path: `/areas/${area.slug}`,
              description: 'Learn more'
            }))
          : [])
      ]
    },
    { 
      name: 'Join us', 
      path: '/ideas',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Collaborate with Us', path: '/ideas', description: 'Partner or volunteer with us to make an impact' },
        { name: 'Contact Us', path: '/ideas', description: 'Get in touch with our team' }
      ]
    }
  ];

  // Handle scroll effect with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [activeDropdown]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    if (activeDropdown || isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [activeDropdown, isMobileMenuOpen]);

  const isActivePath = useCallback((path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleDropdown = useCallback((itemName: string) => {
    setActiveDropdown(prev => prev === itemName ? null : itemName);
  }, []);

  const handleDropdownItemClick = useCallback((path: string) => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    // Handle navigation
    if (path.includes('#')) {
      window.location.href = path;
    } else {
      window.location.href = path;
    }
  }, []);

  return (
    <>
      <nav className={`relative z-50 transition-all duration-500 ease-in-out animate-in ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-white shadow-sm border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group hover:opacity-80 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden">
                <img src="/GEI_Envirohealth_Icon[1].png" alt="Global Envirohealth Initiative Logo" className="w-12 h-12 object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors leading-tight">
                Global <br />
                Envirohealth <br />
                Initiative 
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 relative">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative dropdown-container">
                  {item.hasDropdown ? (
                    <div className="flex items-center">
                      <Link
                        to={item.path}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                          isActivePath(item.path)
                            ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="ml-1 p-1 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                        aria-label={`Toggle ${item.name} dropdown`}
                      >
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeDropdown === item.name && (
                        <div className="fixed left-0 right-0 top-16 z-50 bg-white shadow-xl border-t border-gray-100 py-10 animate-in transition-all duration-500 ease-in-out w-full">
                          {/* Content Container */}
                          <div className="relative max-w-6xl mx-auto px-4">
                            {/* Dropdown Title and Subtitle */}
                            <div className="text-center mb-10 transition-all duration-500 ease-in-out">
                              <h2 className="font-playfair font-bold text-3xl text-gray-900 mb-2 scale-100 group-hover:scale-105 transition-transform duration-500 ease-in-out">{item.name}</h2>
                              {item.name === 'Who We Are' && (
                                <div className="text-gray-500 text-lg max-w-2xl mx-auto">
                                  Learn more about our mission, team, and journey toward environmental sustainability
                                </div>
                              )}
                              {item.name === 'Our Work' && (
                                <div className="text-gray-500 text-lg max-w-2xl mx-auto">
                                  Explore our programs, research, and impact stories driving global change
                                </div>
                              )}
                              {item.name === 'Join us' && (
                                <div className="text-gray-500 text-lg max-w-2xl mx-auto">
                                  Discover insights, trends, and publications shaping the future of the environment
                                </div>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                              {item.dropdownItems?.map((dropdownItem) => (
                                <button
                                  key={dropdownItem.name}
                                  onClick={() => handleDropdownItemClick(dropdownItem.path)}
                                  className="w-full text-left bg-white rounded-xl shadow-md p-6 transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transform hover:scale-105 opacity-90 hover:opacity-100"
                                >
                                  <div className="font-semibold text-gray-900 text-lg mb-2">{dropdownItem.name}</div>
                                  <div className="text-gray-600 text-sm">{dropdownItem.description}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                        isActivePath(item.path)
                          ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-40 bg-white lg:hidden animate-in transition-all duration-500 ease-in-out`} style={{ top: '64px' }}>
          <nav className="max-w-7xl mx-auto px-6 py-8 space-y-6">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="w-full flex items-center justify-between py-4 text-xl font-bold text-gray-900 border-b border-gray-200"
                    >
                      <span>{item.name}</span>
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform duration-300 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        activeDropdown === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pt-4 space-y-3">
                        {item.dropdownItems.map((dropdownItem, index) => (
                          <button
                            key={index}
                            onClick={() => handleDropdownItemClick(dropdownItem.path)}
                            className="block w-full text-left py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          >
                            <div className="font-medium">{dropdownItem.name}</div>
                            <div className="text-sm text-gray-500 mt-1">{dropdownItem.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => handleDropdownItemClick(item.path)}
                    className="w-full text-left py-4 text-xl font-bold text-gray-900 border-b border-gray-200"
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
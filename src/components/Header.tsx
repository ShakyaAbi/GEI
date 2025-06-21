import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ArrowRight, Leaf } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const navigationItems = [
    {
      label: 'About Us',
      href: '/about',
      dropdown: [
        { name: 'Our Mission', href: '/about#mission', description: 'Learn about our core mission and values' },
        { name: 'Our Team', href: '/about#team', description: 'Meet our leadership and expert team' },
        { name: 'History', href: '/about#history', description: 'Our journey and milestones' },
        { name: 'Leadership', href: '/about#leadership', description: 'Executive leadership and board' },
        { name: 'Partnerships', href: '/about#partnerships', description: 'Our global network of partners' },
        { name: 'Careers', href: '/about#careers', description: 'Join our mission for change' }
      ]
    },
    {
      label: 'Our Work',
      href: '/our-work',
      dropdown: [
        { name: 'Climate Action', href: '/our-work#climate', description: 'Climate adaptation and mitigation programs' },
        { name: 'Environmental Health', href: '/our-work#health', description: 'Community health and environment initiatives' },
        { name: 'Sustainable Development', href: '/our-work#development', description: 'Sustainable livelihood programs' },
        { name: 'Research Projects', href: '/our-work#research', description: 'Scientific research and innovation' },
        { name: 'Publications', href: '#publications', description: 'Research papers and publications' },
        { name: 'Global Initiatives', href: '/our-work#initiatives', description: 'Large-scale impact programs' }
      ]
    },
    {
      label: 'Ideas',
      href: '/ideas',
      dropdown: [
        { name: 'Innovation Hub', href: '/ideas#innovation', description: 'Cutting-edge environmental solutions' },
        { name: 'Policy Papers', href: '/ideas#policy', description: 'Research-backed policy recommendations' },
        { name: 'Research Insights', href: '/ideas#insights', description: 'Latest findings and analysis' },
        { name: 'Future Trends', href: '/ideas#trends', description: 'Emerging trends in sustainability' },
        { name: 'Thought Leadership', href: '/ideas#leadership', description: 'Expert opinions and perspectives' }
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
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'glass-effect shadow-lg border-b border-white/20' 
            : 'bg-white/10 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleNavClick('/')}>
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 motion-pulse">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-gray-900'
                }`}>
                  GEI
                </h1>
                <p className={`text-xs leading-none transition-colors duration-300 ${
                  isScrolled ? 'text-gray-600' : 'text-gray-700'
                }`}>
                  Global Environmental Initiative
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative dropdown-container">
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    className={`flex items-center space-x-1 font-medium transition-all duration-300 hover:scale-105 ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-teal-600' 
                        : 'text-gray-900 hover:text-teal-600'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-gray-900 hover:bg-white/20'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Dropdown Overlay */}
      {activeDropdown && (
        <div 
          className="fixed inset-x-0 glass-effect shadow-lg border-b border-white/20 z-40"
          style={{ top: '64px' }}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
            {navigationItems.map((item) => (
              activeDropdown === item.label && (
                <div key={item.label} className="animate-fadeInUp">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold font-playfair text-gray-900 mb-3">{item.label}</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      {item.label === 'About Us' && 'Learn more about our mission, team, and journey'}
                      {item.label === 'Our Work' && 'Explore our programs, research, and global impact'}
                      {item.label === 'Ideas' && 'Discover innovative solutions and thought leadership'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {item.dropdown.map((dropdownItem, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavClick(dropdownItem.href)}
                        className="group bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-left border border-gray-100 hover:border-teal-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-700 transition-colors">
                            {dropdownItem.name}
                          </h3>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {dropdownItem.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden" style={{ top: '64px' }}>
          <nav className="max-w-7xl mx-auto px-6 py-8 space-y-6">
            {navigationItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="w-full flex items-center justify-between py-4 text-xl font-bold text-gray-900 border-b border-gray-200"
                >
                  <span>{item.label}</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 ${
                      activeDropdown === item.label ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeDropdown === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-4 space-y-3">
                    {item.dropdown.map((dropdownItem, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavClick(dropdownItem.href)}
                        className="block w-full text-left py-3 px-4 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200"
                      >
                        <div className="font-medium">{dropdownItem.name}</div>
                        <div className="text-sm text-gray-500 mt-1">{dropdownItem.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
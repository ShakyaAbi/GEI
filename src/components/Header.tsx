import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

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

  // Close dropdown when clicking outside or pressing escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
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
        { name: 'Global Initiatives', href: '/our-work#initiatives', description: 'Large-scale impact programs' },
        { name: 'Impact Stories', href: '/our-work#impact', description: 'Success stories from the field' }
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
        { name: 'Thought Leadership', href: '/ideas#leadership', description: 'Expert opinions and perspectives' },
        { name: 'Publications', href: '/ideas#publications', description: 'Academic papers and reports' }
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
                <div key={item.label} className="relative dropdown-container">
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
        </div>
      </header>

      {/* Full-screen Dropdown Overlay */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40 bg-white/95 backdrop-blur-lg"
          style={{ top: '80px' }}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-6xl mx-auto">
              {navigationItems.map((item) => (
                activeDropdown === item.label && (
                  <div key={item.label} className="animate-in fade-in duration-300">
                    <div className="text-center mb-12">
                      <h2 className="text-4xl font-bold text-gray-900 mb-4">{item.label}</h2>
                      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {item.label === 'About Us' && 'Learn more about our mission, team, and journey'}
                        {item.label === 'Our Work' && 'Explore our programs, research, and global impact'}
                        {item.label === 'Ideas' && 'Discover innovative solutions and thought leadership'}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {item.dropdown.map((dropdownItem, index) => (
                        <button
                          key={index}
                          onClick={() => handleNavClick(dropdownItem.href)}
                          className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-left border border-gray-100 hover:border-green-200"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                              {dropdownItem.name}
                            </h3>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
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
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden" style={{ top: '80px' }}>
          <nav className="container mx-auto px-6 py-8 space-y-6">
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
                        className="block w-full text-left py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
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
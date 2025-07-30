import React, { useEffect, useMemo, useState } from 'react';
import { motion } from "framer-motion";
import { MoveRight, PhoneCall, ArrowRight, Globe, Users, Zap, MapPin, ExternalLink, X, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ImageGalleryCarousel from './ImageGalleryCarousel';
import CountUp from './CountUp';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';

const Hero = () => {
  const navigate = useNavigate();
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const [titleNumber, setTitleNumber] = useState(0);
  const stories = useMemo(
    () => [
      {
        title: "Innovation",
        image: "/IMG_2047.jpeg",
        link: "/our-stories"
      },
      {
        title: "Collaborations",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        link: "/our-stories"
      },
      {
        title: "Sustainability",
        image: "/image2.jpg",
        link: "/our-stories"
      },
      {
        title: "Community",
        image: "/Story1.jpg",
        link: "/our-stories"
      },
      {
        title: "Empowerment",
        image: "/american-physician-examines-elderly-asian-patients-using-hearing-aid.jpg",
        link: "/our-stories"
      }
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === stories.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, stories]);

  // Define partner logos for the trust bar
  const partnerLogos = [
    { name: 'UNESCO', className: 'text-2xl font-bold text-gray-400' },
    { name: 'UNEP', className: 'text-2xl font-bold text-gray-400' },
    { name: 'WWF', className: 'text-2xl font-bold text-gray-400' },
    { name: 'Greenpeace', className: 'text-2xl font-bold text-gray-400' },
    { name: 'IUCN', className: 'text-2xl font-bold text-gray-400' },
  ];

  useEffect(() => {
    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleExploreClick = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const locations = [
    {
      id: 1,
      name: 'Nepal Office',
      country: 'Nepal',
      x: 71,
      y: 36,
      image: 'nepal.jpg',
      description: 'Supporting climate-resilient agriculture and sustainable water management systems for mountain communities.',
      impact: '15,000+ farmers supported',
      icon: Globe,
      color: 'from-base-blue to-analogous-teal'
    },
    {
      id: 2,
      name: 'India Office',
      country: 'India',
      x: 69,
      y: 42,
      image: 'Flag_of_India.png',
      description: 'Implementing renewable energy solutions and sustainable development programs in rural communities.',
      impact: '50,000+ people with clean energy',
      icon: Zap,
      color: 'from-light-blue to-muted-blue'
    },
    {
      id: 3,
      name: 'Cambodia Office',
      country: 'Cambodia',
      x: 75,
      y: 48,
      image: 'Flag_of_Cambodia.svg.webp',
      description: 'Building water security infrastructure and training communities in environmental conservation practices.',
      impact: '25,000+ people with clean water',
      icon: Users,
      color: 'from-analogous-teal to-light-blue'
    },
    // Kenya Office
    {
      id: 4,
      name: 'Kenya Office',
      country: 'Kenya',
      x: 58,
      y: 52,
      image: 'Flag_of_Kenya.svg.png',
      description: 'Delivering healthcare and supporting sustainable agriculture in East Africa.',
      impact: '10,000+ lives improved',
      icon: Heart,
      color: 'from-green-500 to-blue-500'
    }
  ];

  // Gallery images for the carousel
  /*const galleryImages = [
    {
      src: './image1.jpeg',
      alt: 'Community members working together on environmental project',
      caption: 'Community-led environmental initiatives creating lasting change'
    },
    {
      src: './image2.jpg',
      alt: 'Solar panels installation in rural community',
      caption: 'Renewable energy solutions powering sustainable development'
    },
    {
      src: './image1.jpeg',
      alt: 'Clean water access project in developing region',
      caption: 'Clean water infrastructure transforming communities'
    },
    {
      src: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
      alt: 'Reforestation and conservation efforts',
      caption: 'Forest conservation protecting biodiversity and climate'
    },
  
  ];*/

  const clientLogos = [
    { src: '/client-1.png', alt: 'Client 1' },
    { src: '/client-2.png', alt: 'Client 2' },
    { src: '/client-3.png', alt: 'Client 3' },
    { src: '/client-4.png', alt: 'Client 4' },
    { src: '/client-5.png', alt: 'Client 5' },
    { src: '/client-6.png', alt: 'Client 6' },
    { src: '/client-7.png', alt: 'Client 7' },
    { src: '/client-8.png', alt: 'Client 8' },
    { src: '/client-9.png', alt: 'Client 9' },
    { src: '/client-10.png', alt: 'Client 10' },
  ];

  const { projects, loading } = useProjects();
  const activeProjectsCount = projects.filter(p => p.status === 'active').length;

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-white to-white min-h-[80vh] flex items-center"> 
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-base-blue/20 to-analogous-teal/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-light-blue/20 to-analogous-teal/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-2 gap-12 items-center relative">
          {/* Left: Animated Text Content */}
          <div className="w-full">
            <div className="container mx-auto">
              <div className="flex gap-8 items-start justify-start flex-col">
                <div>
                  <Button variant="secondary" size="sm" className="gap-4 font-inter">
                    Read our Impact Stories <MoveRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-4 flex-col items-start text-left w-full">
                  <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter font-playfair text-left">
                    <span className="text-spektr-cyan-50">We work towards</span>
                    <span className="relative flex w-full justify-start overflow-hidden text-left md:pb-4 md:pt-1">
                      &nbsp;
                      {stories.map((story, index) => (
                        <motion.span
                          key={index}
                          className="absolute font-playfair font-semibold"
                          initial={{ opacity: 0, y: "-100" }}
                          transition={{ type: "spring", stiffness: 50 }}
                          animate={
                            titleNumber === index
                              ? {
                                  y: 0,
                                  opacity: 1,
                                }
                              : {
                                  y: titleNumber > index ? -150 : 150,
                                  opacity: 0,
                                }
                          }
                        >
                          {story.title}
                        </motion.span>
                      ))}
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-left font-inter">
                    We design and implement innovative, community-led solutions to the world’s most pressing challenges — from clean water and sustainable jobs to maternal health and climate resilience. Join us in transforming data into action and action into lasting impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Hero Image */}
          <div className="w-full h-80 lg:h-[32rem] flex items-center justify-center cursor-pointer" onClick={() => navigate(stories[titleNumber].link)}>
            <img
              src={stories[titleNumber].image}
              alt={stories[titleNumber].title}
              className="w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-16 bg-white">
          {/* Trusted Partners Bar */}
          <div className="mt-20">
            <p className="text-center uppercase text-sm tracking-wider text-gray-500 mb-8 font-medium">
              Trusted by forward-thinking partners
            </p>
            <div className="relative w-full overflow-hidden opacity-60">
              <div 
                className="flex flex-nowrap items-center w-max animate-scroll-left"
                style={{ '--scroll-duration': '30s' } as React.CSSProperties}
              >
                {[...Array(3)].map((_, setIndex) => (
                  clientLogos.map((logo, logoIndex) => (
                    <div key={`logo-${setIndex}-${logoIndex}`} className="flex-shrink-0 mx-6">
                      <img src={logo.src} alt={logo.alt} className="h-16 w-auto object-contain" />
                    </div>
                  ))
                ))}
              </div>
            </div>
          </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-[#e6f4ff]">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <p className="text-5xl lg:text-6xl font-extrabold text-blue-500 tracking-tight mb-2">
              <CountUp from={0} to={9453} separator="," direction="up" duration={1.5} className="count-up-text" />+
            </p>
            <p className="text-gray-500 text-lg font-medium">Lives Impacted</p>
          </div>
          <div>
            <p className="text-5xl lg:text-6xl font-extrabold text-blue-500 tracking-tight mb-2">
              <CountUp from={0} to={loading ? 0 : activeProjectsCount} separator="," direction="up" duration={1.5} className="count-up-text" />+
            </p>
            <p className="text-gray-500 text-lg font-medium">Active Projects</p>
          </div>
          <div>
            <p className="text-5xl lg:text-6xl font-extrabold text-blue-500 tracking-tight mb-2">
              <CountUp from={0} to={4} separator="," direction="up" duration={1.5} className="count-up-text" />+
            </p>
            <p className="text-gray-500 text-lg font-medium">Countries</p>
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-100 to-light-blue/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-slate-800 mb-6">
              Our Global Presence
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Working across continents to create sustainable solutions and lasting environmental impact 
              in communities worldwide.
            </p>
          </div>

          {/* Interactive World Map */}
          <div className="relative reveal">
            <div className="relative w-full h-[600px] bg-gradient-to-br from-neutral-100 to-light-blue/20 rounded-3xl overflow-hidden shadow-2xl">
              {/* World Map Background */}
              <div className="absolute inset-0 p-8">
                <img 
                  src="/2987330-01.png" 
                  alt="World Map showing global presence" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Location Markers */}
             {locations.map((location) => (
              <div
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                onClick={() =>
                  setActiveLocation(
                    activeLocation === location.id ? null : location.id
                  )
                }
              >
                <div className="relative">
                  {/* Use MapPin icon for marker */}
                  <MapPin 
                    className="w-10 h-10 drop-shadow-lg group-hover:scale-125 transition-transform duration-200"
                    color="white" // Tailwind base-blue-600
                    fill="#2563eb" // Fill the inside with blue
                    strokeWidth={1}
                  />
                  {/* Hover highlight ring */}
                  <div
                    className="
                      absolute inset-0 rounded-full
                      bg-white opacity-0
                      transition-opacity duration-200
                      group-hover:opacity-20
                    "
                  />
                </div>
              </div>
            ))}

            </div>
          </div>

          {/* Office Details Cards are hidden for now */}
        </div>
      </section>

      {/* Centered Modal Popup */}
{activeLocation && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden max-w-md w-full animate-fadeInUp">
      {(() => {
        const location = locations.find(loc => loc.id === activeLocation);
        if (!location) return null;

        return (
          <>
            {/* Close Button */}
            <button
              onClick={() => setActiveLocation(null)}
              className="absolute top-3 right-3 w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-30"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Enlarged Image Header */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={location.image}
                alt={location.country}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-xl text-gray-900 mb-2">{location.name}</h3>
              <p className="text-gray-600 text-sm mb-0">{location.description}</p>
            </div>
          </>
        );
      })()}
    </div>
  </div>
)}
    </>
  );
};

export default Hero;
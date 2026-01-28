import React, { useEffect } from "react";
import {
  Brain,
  Atom,
  Globe,
  Cpu,
  Dna,
  Zap,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const Research = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const researchAreas = [
    {
      icon: "planet",
      title: "Climate & Environment",
      description: `Tackling environmental threats to protect communities and ecosystems\nAt GEI, we believe that environmental justice is foundational to human dignity. That’s why we co-create low-cost, locally adaptable innovations — from modular water purification systems to waste-to-resource technologies — that mitigate pollution, restore ecosystems, and ensure clean air and water for the most vulnerable.`,
      projects: 21,
      color: "from-blue-500 to-green-500",
      bgColor: "from-blue-50 to-green-50",
      iconColor: "text-blue-700",
    },
    {
      icon: "benefits",
      title: "Community Health Innovation",
      description: `Closing the gap in care for mothers, children, and remote populations\nWe refuse to accept that geography or income should determine health outcomes. GEI strengthens rural health systems by upgrading facilities, equipping providers, and introducing breakthrough tools like non-invasive anemia screening. By integrating data, training, and trust-building, we ensure care reaches those who need it most — before it's too late.`,
      projects: 18,
      color: "from-pink-500 to-red-500",
      bgColor: "from-pink-50 to-red-50",
      iconColor: "text-pink-700",
      iconType: "svg",
    },
    {
      icon: "greentech",
      title: "Sustainable Job Creation",
      description: `Turning community potential into resilient, green livelihoods\nPoverty isn’t just about income — it’s about missed opportunity. GEI helps communities unlock that potential by investing in eco-enterprises like permaculture, plastic recycling, and dairy cooperatives. These ventures not only generate income but anchor long-term wellbeing, self-reliance, and environmental stewardship where it’s needed most.`,
      projects: 15,
      color: "from-yellow-500 to-green-500",
      bgColor: "from-yellow-50 to-green-50",
      iconColor: "text-yellow-700",
      iconType: "svg",
    },
  ];

  return (
    <section id="research" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
            Core Capabilities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our interdisciplinary research spans multiple cutting-edge fields in
            planetary health, driving innovation and addressing global
            environmental health challenges.
          </p>
        </div>

        {/* Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchAreas.map((area, index) => {
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background gradient card */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${area.bgColor} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                ></div>

                {/* Main card content */}
                <div className="relative bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-2 border-gray-200 group-hover:shadow-[0_25px_50px_rgba(59,130,246,0.25)] transition-all duration-500 h-full flex flex-col">
                  {/* Icon container */}
                  <div className="mb-8 inline-flex">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${area.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 relative`}
                    >
                      {area.icon === "planet" ? (
                        <img
                          src="/planet-earth_7276001.svg"
                          alt="Planet Earth"
                          className="w-12 h-12 filter-blue-icon group-hover:scale-125 transition-transform duration-500 object-contain"
                          loading="eager"
                        />
                      ) : area.icon === "benefits" ? (
                        <img
                          src="/benefits_1481549.svg"
                          alt="Community Health"
                          className="w-12 h-12 filter-red-icon group-hover:scale-125 transition-transform duration-500 object-contain"
                          loading="eager"
                        />
                      ) : area.icon === "greentech" ? (
                        <img
                          src="/green-technology_8939660.svg"
                          alt="Green Technology"
                          className="w-12 h-12 filter-green-icon group-hover:scale-125 transition-transform duration-500 object-contain"
                          loading="eager"
                        />
                      ) : null}

                      {/* Icon glow on hover */}
                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${area.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                      ></div>
                    </div>
                  </div>

                  {/* Title with enhanced styling */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-all duration-500 leading-snug">
                    {area.title}
                  </h3>

                  {/* Description with better typography */}
                  <p className="text-gray-600 leading-relaxed flex-grow group-hover:text-gray-800 transition-colors duration-300">
                    {area.description}
                  </p>
                </div>

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent group-hover:animate-pulse"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Research;

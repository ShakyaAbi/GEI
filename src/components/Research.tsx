import React, { useEffect } from "react";
import planetIconUrl from "/planet-earth_7276001.svg";
import benefitsIconUrl from "/benefits_1481549.svg";
import greenTechIconUrl from "/green-technology_8939660.svg";

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
      { threshold: 0.2 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const researchAreas = [
    {
      icon: "planet",
      title: "Climate & Environment",
      description: `Tackling environmental threats to protect communities and ecosystems\nAt GEI, we believe that environmental justice is foundational to human dignity. That’s why we co-create low-cost, locally adaptable innovations from modular water purification systems to waste-to-resource technologies that mitigate pollution, restore ecosystems, and ensure clean air and water for the most vulnerable.`,
      projects: 21,
      color: "from-blue-500 to-green-500",
      bgColor: "from-blue-50 to-green-50",
      iconColor: "text-blue-700",
    },
    {
      icon: "benefits",
      title: "Community Health Innovation",
      description: `Closing the gap in care for mothers, children, and remote populations\nWe refuse to accept that geography or income should determine health outcomes. GEI strengthens rural health systems by upgrading facilities, equipping providers, and introducing breakthrough tools like non-invasive anemia screening. By integrating data, training, and trust-building, we ensure care reaches those who need it most before it's too late.`,
      projects: 18,
      color: "from-pink-500 to-red-500",
      bgColor: "from-pink-50 to-red-50",
      iconColor: "text-pink-700",
      iconType: "svg",
    },
    {
      icon: "greentech",
      title: "Sustainable Job Creation",
      description: `Turning community potential into resilient, green livelihoods\nPoverty isn’t just about income; it’s about missed opportunity. GEI helps communities unlock that potential by investing in eco-enterprises like permaculture, plastic recycling, and dairy cooperatives. These ventures not only generate income but anchor long-term wellbeing, self-reliance, and environmental stewardship where it’s needed most.`,
      projects: 15,
      color: "from-yellow-500 to-green-500",
      bgColor: "from-yellow-50 to-green-50",
      iconColor: "text-yellow-700",
      iconType: "svg",
    },
  ];

  return (
    <section id="research" className="pt-16 md:pt-32 pb-24 md:pb-48 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8 reveal">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-4 md:mb-6">
            Core Capabilities
          </h2>
        </div>

        {/* Content Section */}
        <div className="space-y-4 md:space-y-6 mb-12 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
            Focus Areas
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-playfair mb-4">
            Where our capabilities take shape:
          </h3>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our interdisciplinary research spans multiple cutting-edge fields in
            planetary health, driving innovation and addressing global
            environmental health challenges.
          </p>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            These three focus areas shape how we design our programs from the
            start, who we partner with, and how we measure success. They help us
            stay grounded in community priorities while applying evidence,
            practical tools, and local knowledge to deliver solutions that work
            in real settings. By keeping these areas connected, we strengthen
            implementation, learn what drives results, and scale approaches that
            create measurable, lasting impact for the communities we work with.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {researchAreas.map((area) => {
            const [headline, ...rest] = area.description.split("\n");
            return (
              <div
                key={area.title}
                className="bg-white border border-gray-200 shadow-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  className={`w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br ${area.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center`}
                >
                  {area.icon === "planet" ? (
                    <img
                      src={planetIconUrl}
                      alt="Planet Earth"
                      className="w-6 sm:w-8 h-6 sm:h-8 filter-blue-icon object-contain"
                      loading="eager"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  ) : area.icon === "benefits" ? (
                    <img
                      src={benefitsIconUrl}
                      alt="Community Health"
                      className="w-6 sm:w-8 h-6 sm:h-8 filter-red-icon object-contain"
                      loading="eager"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  ) : area.icon === "greentech" ? (
                    <img
                      src={greenTechIconUrl}
                      alt="Green Technology"
                      className="w-6 sm:w-8 h-6 sm:h-8 filter-green-icon object-contain"
                      loading="eager"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  ) : null}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-1 sm:mb-2">
                    Capability
                  </p>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                    {area.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                  {headline}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {rest.join(" ")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Research;

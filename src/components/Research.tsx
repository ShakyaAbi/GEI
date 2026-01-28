import React, { useEffect } from "react";
import CardSwap, { Card } from "./CardSwap";

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
    <section id="research" className="pt-32 pb-48 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-left mb-8 reveal">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
            Core Capabilities
          </h2>
        </div>

        {/* Card Swap */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
              Focus Areas
            </p>
            <h3 className="text-2xl font-bold text-gray-900 font-playfair mb-4">
              Where our capabilities take shape:
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our interdisciplinary research spans multiple cutting-edge fields
              in planetary health, driving innovation and addressing global
              environmental health challenges.
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These three focus areas shape how we design our programs from the
              start, who we partner with, and how we measure success. They help
              us stay grounded in community priorities while applying evidence,
              practical tools, and local knowledge to deliver solutions that
              work in real settings. By keeping these areas connected, we
              strengthen implementation, learn what drives results, and scale
              approaches that create measurable, lasting impact for the
              communities we work with.
            </p>
          </div>

          <div className="relative h-[480px]">
            <CardSwap
              width={420}
              height={440}
              cardDistance={50}
              verticalDistance={60}
              delay={4500}
              pauseOnHover
              skewAmount={3}
            >
              {researchAreas.map((area) => {
                const [headline, ...rest] = area.description.split("\n");
                return (
                  <Card
                    key={area.title}
                    customClass="bg-white border-gray-200 shadow-2xl text-gray-900"
                  >
                    <div className="p-6 flex flex-col gap-4 h-full">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${area.bgColor} rounded-2xl flex items-center justify-center`}
                      >
                        {area.icon === "planet" ? (
                          <img
                            src="/planet-earth_7276001.svg"
                            alt="Planet Earth"
                            className="w-8 h-8 filter-blue-icon object-contain"
                            loading="eager"
                          />
                        ) : area.icon === "benefits" ? (
                          <img
                            src="/benefits_1481549.svg"
                            alt="Community Health"
                            className="w-8 h-8 filter-red-icon object-contain"
                            loading="eager"
                          />
                        ) : area.icon === "greentech" ? (
                          <img
                            src="/green-technology_8939660.svg"
                            alt="Green Technology"
                            className="w-8 h-8 filter-green-icon object-contain"
                            loading="eager"
                          />
                        ) : null}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                          Capability
                        </p>
                        <h4 className="text-xl font-bold text-gray-900">
                          {area.title}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">
                        {headline}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {rest.join(" ")}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;

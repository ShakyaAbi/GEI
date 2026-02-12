import React from "react";

type PartnerLogo = {
  name: string;
  src: string;
};

type PartnerCarouselProps = {
  logos: PartnerLogo[];
  repeatCount?: number;
  minWidth?: string;
};

export const defaultPartnerLogos: PartnerLogo[] = [
  { name: "Partner 1", src: "/client-1.png" },
  { name: "Partner 2", src: "/client-2.png" },
  { name: "Partner 3", src: "/client-3.png" },
  { name: "Partner 4", src: "/client-4.png" },
  { name: "Partner 5", src: "/client-5.png" },
  { name: "Partner 6", src: "/client-6.png" },
  { name: "Partner 7", src: "/client-7.png" },
  { name: "Partner 8", src: "/client-8.png" },
  { name: "Partner 9", src: "/client-9.png" },
  { name: "Partner 10", src: "/client-10.png" },
  { name: "PHRC", src: "/phrc.png" },
];

export default function PartnerCarousel({
  logos,
  repeatCount = 3,
  minWidth,
}: PartnerCarouselProps) {
  return (
    <section className="py-16 bg-white">
      <div className="mt-20">
        <p className="text-center uppercase text-sm tracking-wider text-gray-500 mb-8 font-medium">
          Trusted by forward-thinking partners
        </p>
        <div className="relative w-full overflow-hidden">
          <div
            className="flex flex-nowrap items-center w-max animate-scroll-left"
            style={{ minWidth }}
          >
            {Array.from({ length: repeatCount }).map((_, setIndex) =>
              logos.map((logo, logoIndex) => (
                <div
                  key={`logo-${setIndex}-${logoIndex}`}
                  className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-16 w-auto object-contain"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

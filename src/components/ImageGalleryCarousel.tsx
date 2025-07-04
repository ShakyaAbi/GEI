import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Image {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryCarouselProps {
  images: Image[];
  sectionTitle: string;
  sectionDescription: string;
  autoScrollSpeed?: number; // milliseconds between moves
  className?: string;
}

const defaultImages = [
  { src: 'https://picsum.photos/id/1011/600/350', alt: 'Dummy 1', caption: 'Greenhouse farming' },
  { src: 'https://picsum.photos/id/1015/600/350', alt: 'Dummy 2', caption: 'Seedling in hand' },
  { src: 'https://picsum.photos/id/1025/600/350', alt: 'Dummy 3', caption: 'Lightbulb with plant' },
  { src: 'https://picsum.photos/id/1035/600/350', alt: 'Dummy 4', caption: 'Forest path' },
  { src: 'https://picsum.photos/id/1045/600/350', alt: 'Dummy 5', caption: 'Mountain landscape' },
  { src: 'https://picsum.photos/id/1055/600/350', alt: 'Dummy 6', caption: 'River and trees' },
];

const ImageGalleryCarousel: React.FC<ImageGalleryCarouselProps> = ({
  images,
  sectionTitle,
  sectionDescription,
  autoScrollSpeed = 3000,
  className = ''
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const imgs = images && images.length > 0 ? images : defaultImages;

  const scrollToIndex = (index: number) => {
    setSelectedIndex(index);
    const container = containerRef.current;
    if (container) {
      const slide = container.children[index] as HTMLElement;
      if (slide) {
        slide.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  const prevSlide = () => {
    scrollToIndex((selectedIndex - 1 + imgs.length) % imgs.length);
  };

  const nextSlide = () => {
    scrollToIndex((selectedIndex + 1) % imgs.length);
  };

  const handleArrowClick = (e: React.MouseEvent | React.KeyboardEvent, direction: 'prev' | 'next') => {
    e.preventDefault();
    e.stopPropagation();
    if (direction === 'prev') prevSlide();
    else nextSlide();
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToIndex(idx);
  };

  if (!imgs || imgs.length === 0) {
    return null;
  }

  return (
    <section className={`py-24 bg-gradient-to-b from-white to-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
            {sectionTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {sectionDescription}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative reveal">
          {/* Left Arrow - inside carousel, transparent, fade in on hover */}
          <button
            type="button"
            onClick={(e) => handleArrowClick(e, 'prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white hover:bg-black/30 hover:opacity-100 rounded-full z-20"
            aria-label="Previous image"
            disabled={selectedIndex === 0}
            style={{ pointerEvents: selectedIndex === 0 ? 'none' : 'auto' }}
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <div className="carousel-viewport overflow-hidden rounded-3xl shadow-2xl bg-white border border-gray-100 relative">
            <div className="carousel-container flex scroll-smooth" ref={containerRef}>
              {imgs.map((image, index) => (
                <div
                  className="carousel-slide flex-shrink-0 relative aspect-[16/9] w-full mx-0 flex items-center justify-center bg-slate-50 group"
                  key={index}
                  style={{
                    opacity: 1,
                    transition: 'transform 0.3s',
                    transform: index === selectedIndex ? 'scale(1.05)' : 'none',
                    zIndex: index === selectedIndex ? 1 : 0
                  }}
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 rounded-xl"
                    src={image.src}
                    alt={image.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  {image.caption && (
                    <div
                      className="absolute left-0 w-full bg-black/60 text-white text-base px-4 py-3 rounded-b-xl z-10
                        opacity-0 translate-y-4 transition-all duration-500 ease-out
                        group-hover:opacity-100 group-hover:translate-y-0
                        mb-8 bottom-8 text-center"
                      style={{ pointerEvents: 'none' }}
                    >
                      {image.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Right Arrow - inside carousel, transparent, fade in on hover */}
          <button
            type="button"
            onClick={(e) => handleArrowClick(e, 'next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white hover:bg-black/30 hover:opacity-100 rounded-full z-20"
            aria-label="Next image"
            disabled={selectedIndex === imgs.length - 1}
            style={{ pointerEvents: selectedIndex === imgs.length - 1 ? 'none' : 'auto' }}
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {imgs.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => handleDotClick(e, idx)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  idx === selectedIndex 
                    ? 'bg-base-blue scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGalleryCarousel;
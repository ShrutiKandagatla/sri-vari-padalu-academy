import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from './ui/button';

export const Gallery = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => images.length ? (prev + 1) % images.length : 0);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) => images.length ? (prev + 1) % images.length : 0);
  };

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6"></div>
          <p className="text-lg text-amber-100 max-w-3xl mx-auto">
            Capturing the grace, expression, and beauty of our performances
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative max-w-5xl mx-auto mb-12">
          <div className="relative h-96 md:h-[600px] overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={images[currentIndex]?.url || ""}
              alt={images[currentIndex]?.alt || ""}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          {/* Navigation Buttons */}
          <Button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-maroon-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
            size="icon"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-maroon-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
            size="icon"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-amber-500 w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div
              key={image.id}
              onClick={() => openLightbox(index)}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg aspect-square"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-maroon-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          
          <button
            onClick={prevLightbox}
            className="absolute left-4 text-white hover:text-amber-400 transition-colors"
          >
            <ChevronLeft className="h-12 w-12" />
          </button>
          
          <img
            src={images[lightboxIndex].url}
            alt={images[lightboxIndex].alt}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
          
          <button
            onClick={nextLightbox}
            className="absolute right-4 text-white hover:text-amber-400 transition-colors"
          >
            <ChevronRight className="h-12 w-12" />
          </button>
        </div>
      )}
    </section>
  );
};

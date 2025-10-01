import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const PhotoCarousel = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [photos.length, isAutoplay]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`space-y-8 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-serif text-navy-800">
          Galeri Momen Bahagia
        </h2>
        <div className="w-24 h-1 bg-navy-400 mx-auto"></div>
        <p className="text-navy-600 max-w-2xl mx-auto">
          Koleksi foto-foto indah yang mengabadikan perjalanan cinta kami
        </p>
      </div>

      {/* Main Carousel */}
      <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-navy-200">
        <div className="relative aspect-[4/3] md:aspect-[16/9]">
          {/* Main Image */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={photos[currentIndex]}
              alt={`Wedding photo ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600/1e293b/ffffff?text=Wedding+Photo';
              }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>

          {/* Navigation Buttons */}
          <Button
            onClick={goToPrevious}
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Autoplay Control */}
          <Button
            onClick={() => setIsAutoplay(!isAutoplay)}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/20"
          >
            {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>

          {/* Photo Counter */}
          <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>
      </Card>

      {/* Thumbnail Strip */}
      <div className="flex justify-center">
        <div className="flex gap-2 overflow-x-auto pb-2 max-w-full">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? 'border-navy-500 scale-110 shadow-lg'
                  : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img
                src={photo}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x80/1e293b/ffffff?text=+';
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-navy-600 scale-125'
                : 'bg-navy-300 hover:bg-navy-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;
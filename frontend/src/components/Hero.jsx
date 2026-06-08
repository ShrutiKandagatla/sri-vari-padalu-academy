import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export const Hero = ({ data }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={data.heroImage}
          alt="Dance performance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-950/95 via-maroon-900/90 to-maroon-800/85"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            {data.title}
          </h1>
          <p className="text-2xl md:text-3xl text-amber-100 mb-4 font-light">
            {data.subtitle}
          </p>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            {data.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="bg-amber-500 hover:bg-amber-600 text-maroon-950 font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
            >
              Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('about')}
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
    </section>
  );
};

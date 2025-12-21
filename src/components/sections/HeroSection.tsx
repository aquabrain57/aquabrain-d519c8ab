import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import cageImage from "@/assets/aquabrain-cage.jpg";
import teamImage from "@/assets/aquabrain-team.jpg";
import boatImage from "@/assets/aquabrain-boat.jpg";
import work1Image from "@/assets/aquabrain-work1.jpg";
import trainingImage from "@/assets/aquabrain-training.jpg";
import bassinImage from "@/assets/aquabrain-bassin.jpg";

const slides = [
  {
    image: cageImage,
    title: "Intelligence, Innovation, Impact",
    description: "Au service de l'aquaculture en Afrique de l'Ouest",
  },
  {
    image: teamImage,
    title: "Une équipe d'experts à vos côtés",
    description: "Accompagnement technique et stratégique",
  },
  {
    image: boatImage,
    title: "De l'idée à la réalisation",
    description: "Des solutions adaptées aux réalités locales",
  },
  {
    image: work1Image,
    title: "L'excellence au quotidien",
    description: "Qualité et rigueur dans chaque projet",
  },
  {
    image: trainingImage,
    title: "Former pour transformer",
    description: "Renforcement des capacités locales",
  },
  {
    image: bassinImage,
    title: "Construire l'avenir",
    description: "Infrastructures aquacoles modernes",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt="AQUABRAIN"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-dark/70 via-ocean-dark/60 to-ocean-dark/80" />
        </motion.div>
      </AnimatePresence>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 15000);
        }}
        className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-primary-foreground/10 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-gold/80 hover:text-foreground transition-all duration-300"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 15000);
        }}
        className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-primary-foreground/10 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-gold/80 hover:text-foreground transition-all duration-300"
        aria-label="Slide suivant"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            {/* Main Title */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 md:mb-6 leading-tight px-2">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 mb-6 md:mb-10 px-4">
              {slide.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center px-6 sm:px-4">
              <a href="#expertise" onClick={(e) => { e.preventDefault(); document.querySelector("#expertise")?.scrollIntoView({ behavior: "smooth" }); }}>
                <Button variant="hero" size="sm" className="w-full sm:w-auto text-xs sm:text-sm md:text-base px-4 sm:px-6 py-2 sm:py-2.5">
                  Découvrir nos services
                </Button>
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>
                <Button variant="heroOutline" size="sm" className="w-full sm:w-auto text-xs sm:text-sm md:text-base px-4 sm:px-6 py-2 sm:py-2.5">
                  Nous contacter
                </Button>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-10 sm:mt-16">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "w-6 sm:w-10 bg-gold"
                  : "w-1.5 sm:w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;

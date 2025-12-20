import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
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
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-primary-foreground/10 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-gold/80 hover:text-foreground transition-all duration-300"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 15000);
        }}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-primary-foreground/10 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-gold/80 hover:text-foreground transition-all duration-300"
        aria-label="Slide suivant"
      >
        <ChevronRight className="h-6 w-6" />
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
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-10">
              {slide.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Découvrir nos services
              </Button>
              <Button variant="heroOutline" size="lg">
                Nous contacter
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-3 mt-16">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "w-10 bg-gold"
                  : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#mission"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;

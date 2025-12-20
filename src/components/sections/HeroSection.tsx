import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import cageImage from "@/assets/aquabrain-cage.jpg";
import teamImage from "@/assets/aquabrain-team.jpg";
import boatImage from "@/assets/aquabrain-boat.jpg";
import work1Image from "@/assets/aquabrain-work1.jpg";
import trainingImage from "@/assets/aquabrain-training.jpg";
import labImage from "@/assets/aquabrain-lab.jpg";
import bassinImage from "@/assets/aquabrain-bassin.jpg";

const slides = [
  {
    image: cageImage,
    badge: "Basé au Togo • Expertise Ouest-Africaine",
    title: "Intelligence, Innovation et",
    highlight: "Impact",
    subtitle: "au service de l'Aquaculture",
    description:
      "Accompagnement technique, stratégique et opérationnel de projets de pêche et d'aquaculture en Afrique de l'Ouest",
  },
  {
    image: teamImage,
    badge: "Une équipe passionnée",
    title: "Ensemble, bâtissons",
    highlight: "l'avenir",
    subtitle: "de l'aquaculture africaine",
    description:
      "Notre équipe pluridisciplinaire met son expertise au service de votre réussite",
  },
  {
    image: boatImage,
    badge: "Sur le terrain",
    title: "De l'idée à la",
    highlight: "réalisation",
    subtitle: "nous vous accompagnons",
    description:
      "Des solutions concrètes et adaptées aux réalités locales pour des projets durables",
  },
  {
    image: work1Image,
    badge: "Excellence technique",
    title: "La qualité au cœur",
    highlight: "de chaque projet",
    subtitle: "",
    description:
      "Un suivi rigoureux et des standards élevés pour garantir votre succès",
  },
  {
    image: trainingImage,
    badge: "Formation & Renforcement",
    title: "Former pour",
    highlight: "transformer",
    subtitle: "les communautés",
    description:
      "Nous partageons notre savoir-faire pour créer des compétences durables",
  },
  {
    image: labImage,
    badge: "Innovation continue",
    title: "La science au service",
    highlight: "du développement",
    subtitle: "",
    description:
      "Des techniques modernes et éprouvées pour optimiser la production aquacole",
  },
  {
    image: bassinImage,
    badge: "Infrastructure moderne",
    title: "Concevoir et construire",
    highlight: "l'excellence",
    subtitle: "",
    description:
      "Des infrastructures aquacoles adaptées à vos besoins et à votre environnement",
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
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Images with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt="Aquaculture au Togo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-gradient opacity-85" />
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
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300"
        aria-label="Slide suivant"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-primary-foreground text-sm font-medium">
                {slide.badge}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
            >
              {slide.title}{" "}
              <span className="text-gold">{slide.highlight}</span>
              {slide.subtitle && (
                <>
                  <br />
                  {slide.subtitle}
                </>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto"
            >
              {slide.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="hero" size="xl">
                Découvrir nos services
              </Button>
              <Button variant="heroOutline" size="xl">
                Nous contacter
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center gap-2 mt-12"
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-gold"
                  : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#mission"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </motion.a>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-primary-foreground/20">
        <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-gold"
          style={{ display: isAutoPlaying ? "block" : "none" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

import labImage from "@/assets/aquabrain-lab.jpg";
import cageImage from "@/assets/aquabrain-cage.jpg";
import work1Image from "@/assets/aquabrain-work1.jpg";
import teamImage from "@/assets/aquabrain-team.jpg";
import boatImage from "@/assets/aquabrain-boat.jpg";
import trainingImage from "@/assets/aquabrain-training.jpg";
import bassinImage from "@/assets/aquabrain-bassin.jpg";
import constructionImage from "@/assets/aquabrain-construction.jpg";
import bassinsBetonImage from "@/assets/aquabrain-bassins-beton.jpg";
import cageFlottanteImage from "@/assets/aquabrain-cage-flottante.jpg";
import barqueImage from "@/assets/aquabrain-barque.jpg";
import aquaponieImage from "@/assets/aquabrain-aquaponie.jpg";
import cagesMultiplesImage from "@/assets/aquabrain-cages-multiples.jpg";
import offshoreImage from "@/assets/aquabrain-offshore.jpg";
import montagneImage from "@/assets/aquabrain-montagne.jpg";
import excavationImage from "@/assets/aquabrain-excavation.jpg";

const images = [
  { src: labImage, alt: "Laboratoire AQUABRAIN", category: "Laboratoire" },
  { src: cageImage, alt: "Cages aquacoles", category: "Infrastructure" },
  { src: work1Image, alt: "Travail de terrain", category: "Terrain" },
  { src: teamImage, alt: "Équipe AQUABRAIN", category: "Équipe" },
  { src: boatImage, alt: "Installation de cages", category: "Infrastructure" },
  { src: trainingImage, alt: "Formation", category: "Formation" },
  { src: bassinImage, alt: "Installation de bassins", category: "Terrain" },
  { src: constructionImage, alt: "Construction de bassins", category: "Construction" },
  { src: bassinsBetonImage, alt: "Bassins en béton", category: "Infrastructure" },
  { src: cageFlottanteImage, alt: "Cage flottante", category: "Infrastructure" },
  { src: barqueImage, alt: "Travail sur l'eau", category: "Terrain" },
  { src: aquaponieImage, alt: "Système aquaponie", category: "Aquaponie" },
  { src: cagesMultiplesImage, alt: "Cages multiples flottantes", category: "Infrastructure" },
  { src: offshoreImage, alt: "Cages offshore", category: "Infrastructure" },
  { src: montagneImage, alt: "Ferme aquacole montagne", category: "Infrastructure" },
  { src: excavationImage, alt: "Excavation de bassins", category: "Construction" },
];

const INITIAL_DISPLAY_COUNT = 8;

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedImages = showAll ? images : images.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMoreImages = images.length > INITIAL_DISPLAY_COUNT;

  return (
    <section id="galerie" className="py-12 sm:py-16 lg:py-32 bg-muted/50" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <span className="inline-block text-gold font-semibold mb-3 sm:mb-4 uppercase tracking-wider text-xs sm:text-sm">
            Notre Travail
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Galerie <span className="text-ocean">Photos</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-2">
            Découvrez nos réalisations sur le terrain à travers l'Afrique de
            l'Ouest
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {displayedImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg sm:rounded-xl aspect-square"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block bg-gold px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold text-foreground mb-1">
                  {image.category}
                </span>
                <p className="text-primary-foreground font-medium text-[10px] sm:text-xs md:text-sm line-clamp-1">
                  {image.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {hasMoreImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-6 sm:mt-10"
          >
            <Button
              variant="outline"
              size="default"
              onClick={() => setShowAll(!showAll)}
              className="gap-2 border-ocean text-ocean hover:bg-ocean hover:text-primary-foreground text-sm sm:text-base px-4 sm:px-6"
            >
              {showAll ? (
                <>
                  <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  Voir moins
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                  Voir plus ({images.length - INITIAL_DISPLAY_COUNT} photos)
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-primary-foreground hover:text-gold transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-[85vh] sm:max-h-[90vh] object-contain rounded-lg"
          />
        </motion.div>
      )}
    </section>
  );
};

export default GallerySection;

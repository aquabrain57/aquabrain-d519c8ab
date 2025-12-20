import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import boatImage from "@/assets/aquabrain-boat.jpg";

const reasons = [
  "Expertise locale et connaissance du contexte ouest‑africain",
  "Approche intégrée couvrant toute la chaîne de valeur",
  "Solutions adaptées aux réalités rurales et urbaines",
  "Équipe pluridisciplinaire (technique, projet, innovation)",
  "Engagement pour une aquaculture durable et rentable",
];

const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-gold font-semibold mb-4 uppercase tracking-wider text-sm">
              Pourquoi Nous Choisir
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Votre partenaire de confiance pour l'
              <span className="text-ocean">aquaculture</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Avec une expertise approfondie du secteur aquacole en Afrique de
              l'Ouest, nous vous accompagnons à chaque étape de votre projet
              pour garantir sa réussite et sa durabilité.
            </p>

            <ul className="space-y-4">
              {reasons.map((reason, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{reason}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={boatImage}
                alt="Travail sur le terrain"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            {/* Stats overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl border border-border"
            >
              <div className="text-center">
                <span className="block text-4xl font-bold text-ocean">
                  100%
                </span>
                <span className="text-muted-foreground text-sm">
                  Engagement Afrique
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -top-6 -right-6 bg-gold p-6 rounded-xl shadow-xl"
            >
              <div className="text-center">
                <span className="block text-4xl font-bold text-foreground">
                  8+
                </span>
                <span className="text-foreground/80 text-sm">
                  Domaines d'expertise
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;

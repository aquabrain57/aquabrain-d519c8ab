import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Fish,
  BarChart3,
  Building2,
  Users,
  FileText,
  Search,
  TrendingUp,
  GraduationCap,
} from "lucide-react";

const expertises = [
  {
    icon: Fish,
    title: "Pêche et Aquaculture",
    description:
      "Appui technique aux activités de pêche et d'élevage aquacole (poissons, systèmes extensifs, semi‑intensifs et intensifs).",
    color: "ocean",
  },
  {
    icon: BarChart3,
    title: "Études et Prospection",
    description:
      "Réalisation d'études de faisabilité, diagnostics techniques, études de marché et prospection de sites aquacoles.",
    color: "gold",
  },
  {
    icon: Building2,
    title: "Construction d'Ouvrages",
    description:
      "Conception et réalisation de bassins piscicoles, étangs, cages, systèmes hors-sol et autres infrastructures aquacoles.",
    color: "ocean",
  },
  {
    icon: Users,
    title: "Accompagnement de Projets",
    description:
      "Assistance technique et stratégique pour la mise en œuvre, le développement et la structuration de projets aquacoles.",
    color: "gold",
  },
  {
    icon: FileText,
    title: "Rédaction et Gestion",
    description:
      "Montage de projets, rédaction de propositions techniques et financières, gestion et coordination de projets financés.",
    color: "ocean",
  },
  {
    icon: Search,
    title: "Audit des Fermes",
    description:
      "Évaluation technique, organisationnelle et économique des fermes aquacoles avec recommandations d'amélioration.",
    color: "gold",
  },
  {
    icon: TrendingUp,
    title: "Suivi et Évaluation",
    description:
      "Mise en place de systèmes de suivi‑évaluation, indicateurs de performance et rapports d'impact.",
    color: "ocean",
  },
  {
    icon: GraduationCap,
    title: "Formations",
    description:
      "Formations pratiques et théoriques à destination des pisciculteurs, techniciens, jeunes entrepreneurs et organisations.",
    color: "gold",
  },
];

const ExpertiseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="expertise" className="py-12 sm:py-16 lg:py-32 bg-muted/50" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <span className="inline-block text-gold font-semibold mb-3 sm:mb-4 uppercase tracking-wider text-xs sm:text-sm">
            Nos Services
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Domaines d'<span className="text-ocean">Expertise</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-2">
            Nous intervenons sur l'ensemble de la chaîne de valeur aquacole,
            depuis l'étude et la conception jusqu'au suivi, l'évaluation et la
            formation.
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {expertises.map((expertise, index) => (
            <motion.div
              key={expertise.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-5 transition-transform duration-300 group-hover:scale-110 ${
                  expertise.color === "gold"
                    ? "bg-gradient-to-br from-gold to-gold-dark"
                    : "bg-gradient-to-br from-ocean to-ocean-dark"
                }`}
              >
                <expertise.icon className="h-5 w-5 sm:h-7 sm:w-7 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">
                {expertise.title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                {expertise.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;

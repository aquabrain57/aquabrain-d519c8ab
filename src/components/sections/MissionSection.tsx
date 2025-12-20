import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Heart } from "lucide-react";
import teamImage from "@/assets/aquabrain-team.jpg";

const MissionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: Target,
      title: "Notre Mission",
      description:
        "Contribuer au développement durable de l'aquaculture et de la pêche en Afrique de l'Ouest à travers des solutions techniques fiables, innovantes et adaptées aux réalités locales.",
      color: "ocean",
    },
    {
      icon: Eye,
      title: "Notre Vision",
      description:
        "Faire de l'aquaculture un levier majeur de sécurité alimentaire, de création d'emplois et de développement économique durable au Togo et en Afrique.",
      color: "gold",
    },
    {
      icon: Heart,
      title: "Nos Valeurs",
      description:
        "Excellence technique, innovation, durabilité environnementale et engagement envers les communautés locales pour un impact positif et mesurable.",
      color: "ocean",
    },
  ];

  return (
    <section id="mission" className="py-20 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold font-semibold mb-4 uppercase tracking-wider text-sm">
            À Propos de Nous
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6">
            AQUABRAIN <span className="text-ocean">SARL</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Une société à responsabilité limitée basée au Togo, spécialisée dans
            l'accompagnement technique, stratégique et opérationnel de projets
            de pêche et d'aquaculture.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={teamImage}
                alt="L'équipe AQUABRAIN"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-primary-foreground font-serif text-xl">
                  Notre équipe pluridisciplinaire au service de l'aquaculture
                  africaine
                </p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold/20 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-ocean/30 rounded-2xl -z-10" />
          </motion.div>

          {/* Cards */}
          <div className="space-y-6">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                className="bg-card p-6 rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex gap-5">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center ${
                      card.color === "gold" ? "bg-gold/20" : "bg-ocean/20"
                    }`}
                  >
                    <card.icon
                      className={`h-7 w-7 ${
                        card.color === "gold" ? "text-gold-dark" : "text-ocean"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;

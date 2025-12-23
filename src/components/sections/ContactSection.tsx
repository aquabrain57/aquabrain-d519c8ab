import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Send, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const objectiveOptions = [
  { value: "projet", label: "Projet aquacole" },
  { value: "formation", label: "Formation en aquaculture" },
  { value: "installation-ferme", label: "Installation de ferme" },
  { value: "ecloserie", label: "Écloserie" },
  { value: "etude-faisabilite", label: "Étude de faisabilité" },
  { value: "conseil-technique", label: "Conseil technique" },
  { value: "fourniture-alevins", label: "Fourniture d'alevins" },
  { value: "general", label: "Renseignement général" },
  { value: "autre", label: "Autre" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [objective, setObjective] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: "Adresse",
      value: "Lomé, Togo",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "+228 79 68 79 66 / 91 20 14 68",
    },
    {
      icon: Mail,
      label: "Email",
      value: "aquabrain57@gmail.com",
    },
  ];

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 lg:py-32 bg-ocean-gradient text-primary-foreground"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-gold font-semibold mb-3 sm:mb-4 uppercase tracking-wider text-xs sm:text-sm">
              Contactez-Nous
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Parlons de votre <span className="text-gold">projet</span>
            </h2>
            <p className="text-primary-foreground/80 text-sm sm:text-base lg:text-lg mb-6 sm:mb-10">
              Vous avez un projet aquacole ? Besoin d'une expertise technique ?
              N'hésitez pas à nous contacter. Notre équipe est à votre
              disposition pour répondre à toutes vos questions.
            </p>

            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 sm:gap-4"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-gold" />
                  </div>
                  <div>
                    <span className="block text-primary-foreground/60 text-xs sm:text-sm">
                      {item.label}
                    </span>
                    <span className="font-semibold text-sm sm:text-base">{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card/10 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-primary-foreground/10"
            >
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      Nom complet
                    </label>
                    <Input
                      placeholder="Votre nom"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm sm:text-base h-10 sm:h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm sm:text-base h-10 sm:h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      Téléphone
                    </label>
                    <Input
                      type="tel"
                      placeholder="+228 XX XX XX XX"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm sm:text-base h-10 sm:h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      Objectif / Intérêt
                    </label>
                    <Select value={objective} onValueChange={setObjective}>
                      <SelectTrigger className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground [&>span]:text-primary-foreground/50 [&>span[data-state=selected]]:text-primary-foreground text-sm sm:text-base h-10 sm:h-11">
                        <SelectValue placeholder="Choisir une option" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-[100]">
                        {objectiveOptions.map((option) => (
                          <SelectItem 
                            key={option.value} 
                            value={option.value}
                            className="cursor-pointer hover:bg-ocean/10 focus:bg-ocean/10 text-sm"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    Sujet
                  </label>
                  <Input
                    placeholder="Objet de votre message"
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm sm:text-base h-10 sm:h-11"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Décrivez votre projet ou votre demande..."
                    rows={4}
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 resize-none text-sm sm:text-base"
                  />
                </div>
                <Button variant="hero" size="lg" className="w-full text-sm sm:text-base">
                  <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Envoyer le message
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

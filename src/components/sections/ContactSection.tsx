import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

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
      className="py-20 lg:py-32 bg-ocean-gradient text-primary-foreground"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-gold font-semibold mb-4 uppercase tracking-wider text-sm">
              Contactez-Nous
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
              Parlons de votre <span className="text-gold">projet</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-10">
              Vous avez un projet aquacole ? Besoin d'une expertise technique ?
              N'hésitez pas à nous contacter. Notre équipe est à votre
              disposition pour répondre à toutes vos questions.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <span className="block text-primary-foreground/60 text-sm">
                      {item.label}
                    </span>
                    <span className="font-semibold">{item.value}</span>
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
              className="bg-card/10 backdrop-blur-md p-8 rounded-2xl border border-primary-foreground/10"
            >
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nom complet
                    </label>
                    <Input
                      placeholder="Votre nom"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Sujet
                  </label>
                  <Input
                    placeholder="Objet de votre message"
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Décrivez votre projet ou votre demande..."
                    rows={5}
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 resize-none"
                  />
                </div>
                <Button variant="hero" size="xl" className="w-full">
                  <Send className="h-5 w-5 mr-2" />
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

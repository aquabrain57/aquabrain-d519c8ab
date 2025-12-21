import { motion } from "framer-motion";
import logo from "@/assets/logo-aquabrain.png";
import { Facebook, Linkedin, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Mail, href: "mailto:aquabrain57@gmail.com", label: "Email" },
  ];

  const quickLinks = [
    { href: "#accueil", label: "Accueil" },
    { href: "#mission", label: "Notre Mission" },
    { href: "#expertise", label: "Nos Services" },
    { href: "#galerie", label: "Galerie" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="AQUABRAIN" className="h-14 w-auto" />
              <div>
                <span className="font-serif text-2xl font-bold block">
                  AQUABRAIN
                </span>
                <span className="text-sm text-primary-foreground/60">SARL</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Intelligence, innovation et impact au service de l'aquaculture.
              Contribuer au développement durable de l'aquaculture et de la
              pêche en Afrique de l'Ouest.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-foreground transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-serif text-lg font-bold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-serif text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-3 text-primary-foreground/70">
              <li>Lomé, Togo</li>
              <li>+228 79 68 79 66</li>
              <li>+228 91 20 14 68</li>
              <li>aquabrain57@gmail.com</li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm text-center md:text-left">
              © {currentYear} AQUABRAIN SARL. Tous droits réservés.
            </p>
            <p className="text-primary-foreground/60 text-sm">
              Basé au Togo 🇹🇬 • Au service de l'Afrique de l'Ouest
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

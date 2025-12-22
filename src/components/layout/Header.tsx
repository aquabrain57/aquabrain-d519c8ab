import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo-aquabrain.png";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "#accueil", label: "Accueil" },
  { href: "#mission", label: "À propos" },
  { href: "#expertise", label: "Services" },
  { href: "#galerie", label: "Réalisations" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = 80;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card shadow-md py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#accueil"
            onClick={(e) => handleNavClick(e, "#accueil")}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={logo} alt="AQUABRAIN" className="h-10 w-auto" />
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold text-ocean">
                AQUABRAIN
              </span>
              <span className="text-[10px] font-medium tracking-wider text-muted-foreground">
                SARL
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-2 rounded-lg font-medium text-sm text-foreground hover:text-ocean hover:bg-ocean/10 transition-all duration-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.a
            href="tel:+22879687966"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden lg:block"
          >
            <Button variant="gold" size="default" className="gap-2">
              <Phone className="h-4 w-4" />
              Nous Contacter
            </Button>
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-ocean hover:bg-ocean/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              className="lg:hidden mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-card rounded-xl shadow-xl p-4 space-y-1 border border-border">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.querySelector(item.href);
                      if (target) {
                        const headerHeight = 80;
                        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
                        window.scrollTo({
                          top: elementPosition - headerHeight,
                          behavior: "smooth"
                        });
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-foreground font-medium hover:text-ocean hover:bg-ocean/10 rounded-lg transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-3 border-t border-border">
                  <a href="tel:+22879687966">
                    <Button variant="gold" size="lg" className="w-full gap-2">
                      <Phone className="h-4 w-4" />
                      Nous Contacter
                    </Button>
                  </a>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;

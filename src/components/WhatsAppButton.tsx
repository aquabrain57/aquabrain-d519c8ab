import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

const botResponses = [
  {
    keywords: ["bonjour", "salut", "hello", "bonsoir"],
    response: "Bonjour et bienvenue chez AQUABRAIN ! 🐟 Comment puis-je vous aider aujourd'hui ?\n\n1️⃣ Services aquacoles\n2️⃣ Demande de devis\n3️⃣ Parler à un conseiller"
  },
  {
    keywords: ["1", "service", "aquacole", "aquaculture"],
    response: "Nos services incluent :\n\n🔬 Études de faisabilité\n🏗️ Installation de cages et bassins\n📚 Formation en aquaculture\n🐠 Fourniture d'alevins\n📊 Suivi et conseil technique\n\nVoulez-vous plus de détails sur un service spécifique ?"
  },
  {
    keywords: ["2", "devis", "prix", "coût", "tarif"],
    response: "Pour une demande de devis personnalisé, je vous invite à parler directement avec notre équipe sur WhatsApp. Cliquez sur 'Continuer sur WhatsApp' ci-dessous ! 📱"
  },
  {
    keywords: ["3", "conseiller", "parler", "humain", "personne"],
    response: "Je vous mets en contact avec notre équipe ! Cliquez sur 'Continuer sur WhatsApp' pour discuter avec un de nos conseillers. 👨‍💼"
  },
  {
    keywords: ["merci", "thanks"],
    response: "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. 😊"
  },
  {
    keywords: ["formation", "apprendre", "cours"],
    response: "Nous proposons des formations complètes en aquaculture :\n\n📖 Formation théorique\n🔧 Formation pratique sur site\n📜 Certification\n\nPour plus d'informations, cliquez sur 'Continuer sur WhatsApp' !"
  },
  {
    keywords: ["cage", "bassin", "installation"],
    response: "Nous concevons et installons des infrastructures aquacoles adaptées à vos besoins :\n\n🏊 Bassins en béton ou géomembrane\n🔲 Cages flottantes\n💧 Systèmes de filtration\n\nSouhaitez-vous un devis ?"
  }
];

const defaultResponse = "Merci pour votre message ! Pour mieux vous aider, vous pouvez :\n\n1️⃣ Taper '1' pour nos services\n2️⃣ Taper '2' pour un devis\n3️⃣ Taper '3' pour parler à un conseiller\n\nOu cliquez sur 'Continuer sur WhatsApp' pour une assistance directe !";

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Bonjour ! Je suis l'assistant virtuel d'AQUABRAIN.\n\nComment puis-je vous aider ?\n\n1️⃣ Services aquacoles\n2️⃣ Demande de devis\n3️⃣ Parler à un conseiller",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const whatsappNumber = "22879687966";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const item of botResponses) {
      if (item.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return item.response;
      }
    }
    
    return defaultResponse;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage.trim(),
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleContinueToWhatsApp = () => {
    // Prepare conversation summary for WhatsApp
    const conversationSummary = messages
      .filter(m => m.sender === "user")
      .map(m => m.text)
      .join(" | ");
    
    const text = conversationSummary 
      ? `Bonjour AQUABRAIN, voici ma demande: ${conversationSummary}`
      : "Bonjour AQUABRAIN, je souhaite avoir plus d'informations.";
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-96 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden max-h-[70vh] flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">AQUABRAIN Assistant</p>
                  <p className="text-xs text-white/80">En ligne • Répond instantanément</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#ECE5DD] space-y-3 min-h-[200px]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-lg p-3 shadow-sm max-w-[85%] ${
                      msg.sender === "user"
                        ? "bg-[#DCF8C6] text-foreground"
                        : "bg-white text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 text-right flex items-center justify-end gap-1">
                      {msg.sender === "bot" ? (
                        <Bot className="h-3 w-3" />
                      ) : (
                        <User className="h-3 w-3" />
                      )}
                      {msg.timestamp.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* WhatsApp Continue Button */}
            <div className="p-2 bg-[#ECE5DD] border-t border-[#d4cfc5] shrink-0">
              <Button
                onClick={handleContinueToWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Continuer sur WhatsApp
              </Button>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-card border-t border-border shrink-0">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 text-sm"
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-[#075E54] hover:bg-[#064e46] text-white shrink-0"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#20ba5a] transition-colors"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contacter via WhatsApp"
      >
        {isOpen ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        ) : (
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        )}
      </motion.button>
    </>
  );
};

export default WhatsAppButton;

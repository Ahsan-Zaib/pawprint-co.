import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 font-semibold text-primary-foreground shadow-lift transition-transform hover:scale-105 animate-float"
    >
      <MessageCircle className="size-5 text-gold" />
      <span className="hidden sm:inline">Chat With Us</span>
    </a>
  );
}

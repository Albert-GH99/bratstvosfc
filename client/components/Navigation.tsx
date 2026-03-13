import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  language: "en" | "my";
  onLanguageChange: (lang: "en" | "my") => void;
}

const translations = {
  en: {
    home: "Home",
    systems: "Systems",
    demo: "Try Demo",
    pricing: "Pricing",
    start: "Start Setup",
    shop: "Shop",
  },
  my: {
    home: "Utama",
    systems: "Sistem",
    demo: "Cuba Demo",
    pricing: "Harga",
    start: "Mulai Setup",
    shop: "Kedai",
  },
};

export const Navigation = ({ language, onLanguageChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[language];

  const navLinks = [
    { label: t.home, href: "/" },
    { label: t.systems, href: "/systems" },
    { label: t.demo, href: "/demo" },
    { label: t.pricing, href: "/pricing" },
    { label: t.shop, href: "/shop" },
    { label: t.start, href: "/setup" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button - Left */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo - Center on Mobile, Left on Desktop */}
          <Link
            to="/"
            className="flex items-center gap-3 absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none lg:translate-x-0"
          >
            {/* 3D Silver Logo Icon */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 50%, #e0e0e0 100%)",
                textShadow: `
                  0 2px 0 #999,
                  0 3px 0 #888,
                  0 4px 0 #777,
                  0 5px 5px rgba(0,0,0,0.3),
                  inset -1px -1px 2px rgba(0,0,0,0.1),
                  inset 1px 1px 2px rgba(255,255,255,0.8)
                `,
                color: "#666",
                letterSpacing: "-1px",
                boxShadow: `
                  0 8px 16px rgba(0,0,0,0.15),
                  inset 0 1px 2px rgba(255,255,255,0.8),
                  inset 0 -2px 4px rgba(0,0,0,0.1)
                `,
              }}
            >
              ⚡
            </div>
            {/* Text Logo */}
            <span className="hidden sm:block text-lg font-black text-foreground tracking-tight">
              Bratstvo<span className="text-primary"> Digital</span>
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on Mobile */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher - Right */}
          <div className="flex items-center gap-1 bg-card p-1 rounded-lg border border-border">
            <button
              onClick={() => onLanguageChange("en")}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded transition-all",
                language === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/60 hover:text-foreground"
              )}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange("my")}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded transition-all",
                language === "my"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/60 hover:text-foreground"
              )}
            >
              MY
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

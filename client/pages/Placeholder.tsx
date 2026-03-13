import { Navigation } from "@/components/Navigation";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lightbulb } from "lucide-react";

type Language = "en" | "my";

interface PlaceholderProps {
  page: string;
}

const pageInfo = {
  systems: {
    en: {
      title: "Automation Systems",
      description:
        "Explore our professional automation solutions tailored for different business types",
      prompt: "Ask me to build out this page with detailed system descriptions and demos",
    },
    ms: {
      title: "Sistem Otomasi",
      description:
        "Jelajahi solusi otomasi profesional kami yang disesuaikan untuk berbagai jenis bisnis",
      prompt:
        "Minta saya untuk membangun halaman ini dengan deskripsi sistem dan demo terperinci",
    },
  },
  demo: {
    en: {
      title: "Try Automation Demos",
      description:
        "Experience our three automation systems in action before committing",
      prompt:
        "Ask me to build interactive demos of the Food Preorder, Product Order, and Service Booking systems",
    },
    ms: {
      title: "Coba Demo Otomasi",
      description:
        "Rasakan tiga sistem otomasi kami dalam aksi sebelum berkomitmen",
      prompt:
        "Minta saya untuk membangun demo interaktif dari sistem Prapesanan Makanan, Pesanan Produk, dan Pemesanan Layanan",
    },
  },
  pricing: {
    en: {
      title: "Pricing & Plans",
      description:
        "Transparent pricing for different business automation needs and budgets",
      prompt:
        "Ask me to build a detailed pricing page with all packages and comparison features",
    },
    ms: {
      title: "Harga & Paket",
      description:
        "Harga transparan untuk kebutuhan otomasi bisnis dan anggaran yang berbeda",
      prompt:
        "Minta saya untuk membangun halaman harga terperinci dengan semua paket dan fitur perbandingan",
    },
  },
  setup: {
    en: {
      title: "Start Your Setup",
      description: "Begin your journey to professional order automation today",
      prompt:
        "Ask me to build the onboarding/setup form that collects customer details and generates WhatsApp messages",
    },
    ms: {
      title: "Mulai Setup Anda",
      description: "Mulai perjalanan Anda menuju otomasi pesanan profesional hari ini",
      prompt:
        "Minta saya untuk membangun formulir onboarding/setup yang mengumpulkan detail pelanggan dan menghasilkan pesan WhatsApp",
    },
  },
};

export default function Placeholder({ page }: PlaceholderProps) {
  const [language, setLanguage] = useState<Language>("en");
  const info = pageInfo[page as keyof typeof pageInfo];
  const content = info[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation language={language} onLanguageChange={setLanguage} />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary font-semibold mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft size={20} />
            {language === "en" ? "Back to Home" : "Kembali ke Utama"}
          </Link>

          <h1 className="text-4xl font-bold mb-6 text-foreground">
            {content.title}
          </h1>

          <p className="text-lg text-foreground/70 mb-12">{content.description}</p>

          <div className="bg-card border-2 border-dashed border-primary/30 rounded-lg p-12">
            <Lightbulb size={48} className="text-primary mx-auto mb-6" />
            <h2 className="text-xl font-semibold mb-4">
              {language === "en" ? "Page in Progress" : "Halaman Sedang Dikembangkan"}
            </h2>
            <p className="text-foreground/60 mb-6">{content.prompt}</p>

            <div className="inline-block bg-primary/10 border border-primary rounded-lg p-4 max-w-md">
              <p className="text-sm text-primary font-mono">
                {content.prompt}
              </p>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-foreground/60 mb-6">
              {language === "en"
                ? "While you wait, explore our:"
                : "Sementara menunggu, jelajahi kami:"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                {language === "en" ? "Home" : "Utama"}
              </Link>
              <Link
                to="/systems"
                className="inline-flex items-center justify-center px-6 py-2 border border-foreground/20 text-foreground hover:border-foreground/40 rounded-lg font-semibold transition-colors"
              >
                {language === "en" ? "Systems" : "Sistem"}
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center px-6 py-2 border border-foreground/20 text-foreground hover:border-foreground/40 rounded-lg font-semibold transition-colors"
              >
                {language === "en" ? "Demos" : "Demo"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto text-center text-foreground/60 text-sm">
          <p>
            ⚡ Bratstvo Digital © 2024 •{" "}
            {language === "en"
              ? "Professional SME Automation for Malaysia"
              : "Otomasi UKM Profesional untuk Malaysia"}
          </p>
        </div>
      </footer>
    </div>
  );
}

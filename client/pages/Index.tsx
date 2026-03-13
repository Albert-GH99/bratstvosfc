import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import {
  MessageCircle,
  ShoppingCart,
  Calendar,
  Zap,
  ArrowRight,
  Check,
  ChevronRight,
  Database,
  BarChart3,
  Users,
} from "lucide-react";

type Language = "en" | "my";

const translations = {
  en: {
    hero: {
      title: "Turn WhatsApp Chaos Into Professional Automation",
      subtitle:
        "Bratstvo Digital transforms disorganized customer chats into structured, automated order management systems. Perfect for growing Malaysian SMEs.",
      cta: "Start Your Setup",
      ctaSecondary: "Try Live Demo",
      domain: "www.Bratstvosfc.com",
    },
    problem: {
      title: "The Real Problem Most SMEs Face",
      items: [
        {
          icon: "📱",
          title: "WhatsApp Order Chaos",
          desc: "Orders scattered across chats, hard to track and manage",
        },
        {
          icon: "👥",
          title: "Customer Info Lost",
          desc: "Asking same questions repeatedly - time wasted, frustration",
        },
        {
          icon: "📊",
          title: "No Business Insights",
          desc: "Can't see sales trends, customer patterns, or growth metrics",
        },
        {
          icon: "⏱️",
          title: "Manual Overhead",
          desc: "Hours spent on repetitive order processing work",
        },
      ],
    },
    how: {
      title: "How Bratstvo Works",
      subtitle: "Simple 3-step automation for your business",
      steps: [
        {
          number: "1",
          title: "Customer Uses Your Form",
          desc: "Client fills out a simple order/booking form on your system",
        },
        {
          number: "2",
          title: "System Processes Order",
          desc: "Our automation engine organizes all the data and handles logic",
        },
        {
          number: "3",
          title: "You Get WhatsApp Alert",
          desc: "Professional formatted message sent to your WhatsApp - ready to act",
        },
      ],
    },
    systems: {
      title: "Automation Systems We Offer",
      subtitle: "Choose the system that fits your business",
      systems: [
        {
          icon: "🍕",
          title: "Food Preorder System",
          desc: "For bakers, food sellers, and preorder businesses",
          features: [
            "Menu management",
            "Quantity ordering",
            "Price calculation",
            "Structured WhatsApp confirmation",
          ],
        },
        {
          icon: "🛒",
          title: "Product Order System",
          desc: "For dropshippers, online sellers, and retailers",
          features: [
            "Product catalog",
            "Size/color variations",
            "Customer database",
            "Order history",
          ],
        },
        {
          icon: "🔧",
          title: "Service Booking System",
          desc: "For home services, maintenance, and professional services",
          features: [
            "Service selection",
            "Date & time booking",
            "Customer profiles",
            "Automatic scheduling",
          ],
        },
      ],
    },
    pricing: {
      title: "Transparent Pricing - Setup Packages",
      subtitle: "One-time setup cost. Choose based on your backend needs.",
      description:
        "All packages include the same professional automation engine. The difference is your data storage solution.",
      packages: [
        {
          name: "Starter Pack",
          price: "RM249",
          backend: "WhatsApp Only",
          description: "Perfect for testing",
          features: [
            "Automation form setup",
            "WhatsApp message formatting",
            "Basic order structure",
            "Email notifications",
          ],
          details: "No database. Orders delivered via WhatsApp messages only.",
        },
        {
          name: "Growth Pack",
          price: "RM590",
          backend: "Spreadsheet Storage",
          description: "Most popular",
          features: [
            "Everything in Starter",
            "Google Sheets integration",
            "Automatic data logging",
            "Basic reporting",
            "Order history",
          ],
          details:
            "Uses Google Sheets (free) to store all orders. Easy to manage.",
          highlighted: true,
        },
        {
          name: "Professional Pack",
          price: "RM990",
          backend: "Cloud Database",
          description: "For serious growth",
          features: [
            "Everything in Growth",
            "Supabase database",
            "Advanced reporting",
            "Customer analytics",
            "Performance monitoring",
          ],
          details:
            "Real database. Supabase (RM~10/month) for unlimited scalability.",
        },
        {
          name: "Enterprise Pack",
          price: "RM1290",
          backend: "Full Features",
          description: "Advanced operations",
          features: [
            "Everything in Professional",
            "Admin dashboard",
            "Team management",
            "Advanced automations",
            "API access",
          ],
          details:
            "Complete business management system with advanced integrations.",
        },
        {
          name: "Premium Pack",
          price: "RM1590+",
          backend: "Custom Solution",
          description: "For your unique needs",
          features: [
            "Everything in Enterprise",
            "Custom integrations",
            "Dedicated support",
            "Advanced customization",
            "Unlimited features",
          ],
          details: "Tailored to your specific business requirements.",
        },
      ],
    },
    maintenance: {
      title: "Monthly Care Plans (Optional)",
      subtitle: "Keep your system running smoothly",
      plans: [
        {
          name: "Basic Care",
          price: "RM50",
          features: [
            "Email support",
            "Bug fixes",
            "Monthly updates",
            "Performance checks",
          ],
        },
        {
          name: "Standard Care",
          price: "RM100",
          features: [
            "Priority support (24h)",
            "Everything in Basic",
            "New features added",
            "System optimization",
            "Security updates",
          ],
        },
        {
          name: "Pro Care",
          price: "RM150",
          features: [
            "24/7 support",
            "Everything in Standard",
            "Real-time monitoring",
            "Advanced enhancements",
            "Proactive optimization",
          ],
        },
      ],
    },
    why: {
      title: "Why Choose Bratstvo Digital?",
      reasons: [
        {
          icon: "⚡",
          title: "Fast Setup",
          desc: "Get automated within days, not months",
        },
        {
          icon: "💰",
          title: "Transparent Pricing",
          desc: "Know exactly what you're paying for",
        },
        {
          icon: "📱",
          title: "WhatsApp Native",
          desc: "Works directly with WhatsApp - no app needed",
        },
        {
          icon: "🇲🇾",
          title: "Malaysia Built",
          desc: "Understanding local SME challenges",
        },
        {
          icon: "🔒",
          title: "Your Data Safe",
          desc: "Full control of your customer information",
        },
        {
          icon: "📞",
          title: "Real Support",
          desc: "Personal help when you need it",
        },
      ],
    },
    cta: {
      title: "Ready to Transform Your Business?",
      subtitle:
        "Join Malaysian SMEs automating their operations and growing faster with Bratstvo Digital",
      button: "Start Your Setup Today",
      secondary: "Schedule a Demo Call",
    },
    footer: {
      tagline: "Professional SME Automation for Malaysia",
      copyright: "Bratstvo Digital © 2026",
    },
  },
  my: {
    hero: {
      title: "Tukar WhatsApp Kacau Jadi Automation Profesional",
      subtitle:
        "Bratstvo Digital ubah chat pelanggan yang serabut jadi sistem order yang teratur dan automation. Sempurna untuk UKM Malaysia yang nak berkembang.",
      cta: "Mulai Setup Sekarang",
      ctaSecondary: "Cuba Demo Live",
      domain: "www.Bratstvosfc.com",
    },
    problem: {
      title: "Masalah Yang Ramai UKM Hadapi",
      items: [
        {
          icon: "📱",
          title: "Order WhatsApp Serabut",
          desc: "Order tersebar dalam chat, susah nak lacak dan urus",
        },
        {
          icon: "👥",
          title: "Info Pelanggan Hilang",
          desc: "Tanya soalan sama berulang kali - membuang masa, penat",
        },
        {
          icon: "📊",
          title: "Takde Business Insight",
          desc: "Tak nampak trend jualan, pattern customer, atau growth",
        },
        {
          icon: "⏱️",
          title: "Kerja Manual Banyak",
          desc: "Jam-jam habis dengan kerja order processing yang repeating",
        },
      ],
    },
    how: {
      title: "Cara Bratstvo Bekerja",
      subtitle: "3 langkah automation yang senang untuk bisnes kamu",
      steps: [
        {
          number: "1",
          title: "Customer Guna Form Kamu",
          desc: "Client fill up form order/booking yang senang guna",
        },
        {
          number: "2",
          title: "Sistem Process Order",
          desc: "Automation engine kita organize semua data dan logic",
        },
        {
          number: "3",
          title: "Kamu Dapat Alert WhatsApp",
          desc: "Mesej professional masuk WhatsApp kamu - boleh terus action",
        },
      ],
    },
    systems: {
      title: "Sistem Automation Yang Kami Tawar",
      subtitle: "Pilih sistem yang sesuai dengan bisnes kamu",
      systems: [
        {
          icon: "🍕",
          title: "Sistem Preorder Makanan",
          desc: "Untuk pembuat kue, penjual makanan, bisnes preorder",
          features: [
            "Urus menu",
            "Customer order quantity",
            "Calculate harga otomatis",
            "Confirm WhatsApp struktur",
          ],
        },
        {
          icon: "🛒",
          title: "Sistem Order Produk",
          desc: "Untuk dropshipper, seller online, dan retailer",
          features: [
            "Catalog produk",
            "Variation size/warna",
            "Database customer",
            "History order",
          ],
        },
        {
          icon: "🔧",
          title: "Sistem Service Booking",
          desc: "Untuk home services, maintenance, dan professional services",
          features: [
            "Pilih service",
            "Booking date & time",
            "Profile customer",
            "Automatic scheduling",
          ],
        },
      ],
    },
    pricing: {
      title: "Harga Jelas - Pakej Setup",
      subtitle: "Bayar sekali ja. Pilih berdasarkan keperluan storage data kamu.",
      description:
        "Semua pakej ada automation engine yang sama. Perbezaan cuma pada solution penyimpanan data kamu.",
      packages: [
        {
          name: "Pakej Starter",
          price: "RM249",
          backend: "WhatsApp Ja",
          description: "Bagus untuk test",
          features: [
            "Setup automation form",
            "Format pesan WhatsApp",
            "Struktur order basic",
            "Notification email",
          ],
          details: "Takde database. Order datang via pesan WhatsApp ja.",
        },
        {
          name: "Pakej Growth",
          price: "RM590",
          backend: "Spreadsheet Storage",
          description: "Paling popular",
          features: [
            "Semua dalam Starter",
            "Google Sheets integration",
            "Auto data logging",
            "Basic report",
            "History order",
          ],
          details:
            "Guna Google Sheets (free) untuk simpan semua order. Mudah urus.",
          highlighted: true,
        },
        {
          name: "Pakej Professional",
          price: "RM990",
          backend: "Cloud Database",
          description: "Untuk bisnes serius",
          features: [
            "Semua dalam Growth",
            "Supabase database",
            "Report advanced",
            "Analytics customer",
            "Monitor performance",
          ],
          details:
            "Database real guna. Supabase (RM~10/bulan) untuk unlimited scale.",
        },
        {
          name: "Pakej Enterprise",
          price: "RM1290",
          backend: "Feature Lengkap",
          description: "Operasi advanced",
          features: [
            "Semua dalam Professional",
            "Admin dashboard",
            "Urus team",
            "Automation advanced",
            "API access",
          ],
          details:
            "System bisnes lengkap dengan integration advanced siap guna.",
        },
        {
          name: "Pakej Premium",
          price: "RM1590+",
          backend: "Custom Solution",
          description: "Untuk kebutuhan unique",
          features: [
            "Semua dalam Enterprise",
            "Custom integration",
            "Support dedicated",
            "Customize advanced",
            "Feature unlimited",
          ],
          details: "Tailor made sesuai kebutuhan bisnes kamu yang special.",
        },
      ],
    },
    maintenance: {
      title: "Monthly Care Plan (Optional)",
      subtitle: "Jaga sistem kamu running smooth",
      plans: [
        {
          name: "Basic Care",
          price: "RM50",
          features: [
            "Support email",
            "Fix bug",
            "Update monthly",
            "Check performance",
          ],
        },
        {
          name: "Standard Care",
          price: "RM100",
          features: [
            "Support priority (24h)",
            "Semua dalam Basic",
            "Feature baru added",
            "Optimize system",
            "Update security",
          ],
        },
        {
          name: "Pro Care",
          price: "RM150",
          features: [
            "Support 24/7",
            "Semua dalam Standard",
            "Monitor real-time",
            "Enhance advanced",
            "Optimize proactive",
          ],
        },
      ],
    },
    why: {
      title: "Kenapa Pilih Bratstvo Digital?",
      reasons: [
        {
          icon: "⚡",
          title: "Setup Cepat",
          desc: "Automation ready dalam hari, bukan bulan",
        },
        {
          icon: "💰",
          title: "Harga Jelas",
          desc: "Tahu exactly berapa bayar untuk apa",
        },
        {
          icon: "📱",
          title: "WhatsApp Native",
          desc: "Langsung dengan WhatsApp - takde app perlu",
        },
        {
          icon: "🇲🇾",
          title: "Built Malaysia",
          desc: "Faham challenge UKM lokal",
        },
        {
          icon: "🔒",
          title: "Data Kamu Safe",
          desc: "Full control info customer kamu",
        },
        {
          icon: "📞",
          title: "Support Real",
          desc: "Bantuan real person waktu kamu butuh",
        },
      ],
    },
    cta: {
      title: "Ready Transform Bisnes Kamu?",
      subtitle:
        "Join UKM Malaysia yang automation operation mereka dan grow faster dengan Bratstvo Digital",
      button: "Mulai Setup Sekarang",
      secondary: "Jadual Demo Call",
    },
    footer: {
      tagline: "Otomasi UKM Profesional untuk Malaysia",
      copyright: "Bratstvo Digital © 2026",
    },
  },
};

export default function Index() {
  const [language, setLanguage] = useState<Language>("en");
  const t = translations[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation language={language} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl sm:text-6xl font-black text-foreground mb-6 leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/setup"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  {t.hero.cta}
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                >
                  {t.hero.ctaSecondary}
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:flex flex-col gap-4">
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                <MessageCircle size={32} className="text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {language === "en" ? "Before: Messy Chats" : "Sebelum: Chat Serabut"}
                </h3>
                <p className="text-foreground/60 text-sm">
                  {language === "en"
                    ? "Orders lost in WhatsApp conversations"
                    : "Order hilang dalam WhatsApp percakapan"}
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                <ShoppingCart size={32} className="text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {language === "en" ? "After: Organized System" : "Sesudah: Sistem Teratur"}
                </h3>
                <p className="text-foreground/60 text-sm">
                  {language === "en"
                    ? "Professional automated management"
                    : "Urus profesional automation"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center text-foreground">
            {t.problem.title}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {t.problem.items.map((item, i) => (
              <div key={i} className="bg-background rounded-lg p-6 border border-border">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-foreground/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center text-foreground">
            {t.how.title}
          </h2>
          <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
            {t.how.subtitle}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {t.how.steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-card border border-border rounded-lg p-8 h-full">
                  <div className="w-12 h-12 bg-primary/20 border border-primary rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-black text-primary">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-foreground/60">{step.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Systems Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center text-foreground">
            {t.systems.title}
          </h2>
          <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
            {t.systems.subtitle}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {t.systems.systems.map((system, i) => (
              <div
                key={i}
                className="bg-background border border-border rounded-lg p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all"
              >
                <div className="text-5xl mb-4">{system.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{system.title}</h3>
                <p className="text-foreground/60 mb-6">{system.desc}</p>
                <ul className="space-y-3">
                  {system.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/systems"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              {language === "en" ? "Explore all systems →" : "Explore semua sistem →"}
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center text-foreground">
            {t.pricing.title}
          </h2>
          <p className="text-center text-foreground/60 mb-3 max-w-3xl mx-auto">
            {t.pricing.subtitle}
          </p>
          <p className="text-center text-foreground/50 text-sm mb-12 max-w-3xl mx-auto">
            {t.pricing.description}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {t.pricing.packages.map((pkg, i) => (
              <div
                key={i}
                className={`rounded-lg p-8 transition-all ${
                  pkg.highlighted
                    ? "bg-primary/10 border-2 border-primary shadow-lg shadow-primary/20 lg:col-span-1 lg:scale-105"
                    : "bg-card border border-border"
                }`}
              >
                <div className="inline-block mb-4 px-3 py-1 bg-primary/20 rounded text-xs font-bold text-primary">
                  {pkg.backend}
                </div>
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-foreground/60 text-sm mb-4">{pkg.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-black text-primary">
                    {pkg.price}
                  </span>
                  <span className="text-foreground/60 text-sm ml-2">
                    {language === "en" ? "(one-time)" : "(bayar sekali)"}
                  </span>
                </div>
                <p className="text-foreground/60 text-xs mb-6 italic">
                  {pkg.details}
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/setup"
                  className={`block w-full text-center py-2 rounded-lg font-semibold transition-all ${
                    pkg.highlighted
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-primary text-primary hover:bg-primary/10"
                  }`}
                >
                  {language === "en" ? "Choose Plan" : "Pilih Plan"}
                </Link>
              </div>
            ))}
          </div>

          {/* Maintenance Plans */}
          <div className="mt-16 pt-16 border-t border-border">
            <h3 className="text-3xl font-bold mb-8 text-center">
              {t.maintenance.title}
            </h3>
            <p className="text-center text-foreground/60 mb-12">
              {t.maintenance.subtitle}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {t.maintenance.plans.map((plan, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                  <p className="text-primary text-3xl font-black mb-6">
                    {plan.price}
                    <span className="text-foreground/60 text-sm">
                      {language === "en" ? "/month" : "/bulan"}
                    </span>
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <Check size={16} className="text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">
            {t.why.title}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.why.reasons.map((reason, i) => (
              <div
                key={i}
                className="bg-background border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
              >
                <div className="text-4xl mb-4">{reason.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                <p className="text-foreground/60 text-sm">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {t.cta.title}
          </h2>
          <p className="text-lg text-foreground/60 mb-8">{t.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/setup"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              {t.cta.button}
              <ArrowRight size={24} />
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/10 transition-colors"
            >
              {t.cta.secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-foreground/60 text-sm">
          <p>
            ⚡ {t.footer.copyright} • {t.footer.tagline}
          </p>
        </div>
      </footer>
    </div>
  );
}

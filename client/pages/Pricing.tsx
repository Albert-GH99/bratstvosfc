import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Check, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type Language = "en" | "my";

const translations = {
  en: {
    title: "Transparent Pricing",
    subtitle: "Choose the right package for your business",
    badge: "⚡ Powered by Bratstvo Digital System",
    description:
      "All prices are one-time setup costs. Choose based on your backend storage needs. All packages include the same powerful automation engine.",
    pricingHeading: "Setup Packages",
    packages: [
      {
        name: "Starter Pack",
        price: "RM249",
        icon: "⚡",
        description: "Perfect for testing & small businesses",
        backend: "WhatsApp Messages Only",
        features: [
          { name: "Automation form setup", included: true },
          { name: "WhatsApp message formatting", included: true },
          { name: "Basic order structure", included: true },
          { name: "Email notifications", included: true },
          { name: "Customer database", included: false },
          { name: "Admin dashboard", included: false },
          { name: "Reporting & analytics", included: false },
          { name: "Team management", included: false },
        ],
        best: "Best for: Testing, micro-businesses, low volume",
      },
      {
        name: "Growth Pack",
        price: "RM590",
        icon: "🚀",
        description: "Most popular & affordable database",
        backend: "Google Sheets Integration",
        features: [
          { name: "Automation form setup", included: true },
          { name: "WhatsApp message formatting", included: true },
          { name: "Basic order structure", included: true },
          { name: "Email notifications", included: true },
          { name: "Google Sheets data logging", included: true },
          { name: "Basic reporting", included: true },
          { name: "Order history tracking", included: true },
          { name: "Team management", included: false },
        ],
        best: "Best for: Growing businesses, solopreneurs",
        highlighted: true,
      },
      {
        name: "Professional Pack",
        price: "RM990",
        icon: "💎",
        description: "Real database for serious growth",
        backend: "Cloud Database (Supabase)",
        features: [
          { name: "Automation form setup", included: true },
          { name: "WhatsApp message formatting", included: true },
          { name: "Basic order structure", included: true },
          { name: "Email notifications", included: true },
          { name: "Cloud database (Supabase)", included: true },
          { name: "Advanced reporting", included: true },
          { name: "Customer analytics", included: true },
          { name: "Performance monitoring", included: true },
        ],
        best: "Best for: Growing businesses, high volume",
      },
      {
        name: "Enterprise Pack",
        price: "RM1290",
        icon: "👑",
        description: "Complete business system",
        backend: "Full Cloud Infrastructure",
        features: [
          { name: "Everything in Professional", included: true },
          { name: "Admin dashboard", included: true },
          { name: "Team member management", included: true },
          { name: "Advanced automations", included: true },
          { name: "API access", included: true },
          { name: "Custom branding", included: true },
          { name: "Priority support", included: true },
          { name: "Monthly maintenance included", included: true },
        ],
        best: "Best for: Established businesses, teams",
      },
      {
        name: "Premium Pack",
        price: "RM1590+",
        icon: "⭐",
        description: "Fully customized solution",
        backend: "Custom Everything",
        features: [
          { name: "Everything in Enterprise", included: true },
          { name: "Custom integrations", included: true },
          { name: "Dedicated account manager", included: true },
          { name: "Advanced customization", included: true },
          { name: "White-label option", included: true },
          { name: "24/7 phone support", included: true },
          { name: "Unlimited features", included: true },
          { name: "Quarterly strategy reviews", included: true },
        ],
        best: "Best for: Unique needs, scale operations",
      },
    ],
    maintenance: {
      heading: "Monthly Care Plans (Optional)",
      description: "Keep your system running smoothly and getting better",
      plans: [
        {
          name: "Basic Care",
          price: "RM50",
          icon: "🔧",
          features: [
            "Email support",
            "Bug fixes",
            "Monthly updates",
            "System health checks",
          ],
        },
        {
          name: "Standard Care",
          price: "RM100",
          icon: "⚙️",
          features: [
            "Priority support (24h response)",
            "Everything in Basic",
            "New features added monthly",
            "System optimization",
            "Security updates",
          ],
        },
        {
          name: "Premium Pro",
          price: "RM150",
          icon: "🎯",
          features: [
            "24/7 phone & email support",
            "Everything in Standard",
            "Real-time system monitoring",
            "Advanced enhancements",
            "Performance tuning",
          ],
        },
      ],
    },
    comparison: {
      title: "Quick Comparison",
      features: [
        "Automation Engine",
        "WhatsApp Integration",
        "Data Storage",
        "Admin Dashboard",
        "Team Features",
        "Support Level",
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      questions: [
        {
          q: "Are these one-time payments?",
          a: "Yes! All setup packages are one-time only. Monthly care plans are optional and can be cancelled anytime.",
        },
        {
          q: "Can I upgrade or downgrade later?",
          a: "Absolutely. Upgrade to a better package anytime. Downgrades may apply based on your data storage needs.",
        },
        {
          q: "What if I outgrow my current package?",
          a: "Simply upgrade! Move from WhatsApp to Google Sheets, or from Sheets to a real database. Your data moves with you.",
        },
        {
          q: "Do I need technical knowledge?",
          a: "No. We handle all the technical setup. You just provide your business details and we build it for you.",
        },
        {
          q: "What about payment options?",
          a: "We accept bank transfers, credit cards, and can discuss payment plans for higher packages.",
        },
        {
          q: "Can I customize my package?",
          a: "Definitely. Especially for Premium+ packages, we can customize to your exact needs.",
        },
      ],
    },
    cta: {
      title: "Ready to Automate Your Business?",
      desc: "Choose your package and start your setup today",
      button: "Get Started Now",
    },
  },
  my: {
    title: "Harga Transparent",
    subtitle: "Pilih package yang right untuk bisnes kamu",
    badge: "⚡ Powered by Bratstvo Digital System",
    description:
      "Semua harga adalah setup cost sekali ja. Pilih berdasarkan kebutuhan storage data kamu. Semua package ada automation engine yang sama powerful.",
    pricingHeading: "Setup Packages",
    packages: [
      {
        name: "Pakej Starter",
        price: "RM249",
        icon: "⚡",
        description: "Bagus untuk test & bisnes kecil",
        backend: "WhatsApp Messages Ja",
        features: [
          { name: "Setup automation form", included: true },
          { name: "Format pesan WhatsApp", included: true },
          { name: "Order structure basic", included: true },
          { name: "Notification email", included: true },
          { name: "Database customer", included: false },
          { name: "Admin dashboard", included: false },
          { name: "Report & analytics", included: false },
          { name: "Manage team", included: false },
        ],
        best: "Best untuk: Test, bisnes kecil, volume rendah",
      },
      {
        name: "Pakej Growth",
        price: "RM590",
        icon: "🚀",
        description: "Paling popular & murah database",
        backend: "Google Sheets Integration",
        features: [
          { name: "Setup automation form", included: true },
          { name: "Format pesan WhatsApp", included: true },
          { name: "Order structure basic", included: true },
          { name: "Notification email", included: true },
          { name: "Google Sheets data logging", included: true },
          { name: "Report basic", included: true },
          { name: "Track order history", included: true },
          { name: "Manage team", included: false },
        ],
        best: "Best untuk: Bisnes grow, solopreneur",
        highlighted: true,
      },
      {
        name: "Pakej Professional",
        price: "RM990",
        icon: "💎",
        description: "Database real untuk grow serius",
        backend: "Cloud Database (Supabase)",
        features: [
          { name: "Setup automation form", included: true },
          { name: "Format pesan WhatsApp", included: true },
          { name: "Order structure basic", included: true },
          { name: "Notification email", included: true },
          { name: "Cloud database (Supabase)", included: true },
          { name: "Report advanced", included: true },
          { name: "Analytics customer", included: true },
          { name: "Monitor performance", included: true },
        ],
        best: "Best untuk: Bisnes grow, high volume",
      },
      {
        name: "Pakej Enterprise",
        price: "RM1290",
        icon: "👑",
        description: "System bisnes lengkap",
        backend: "Cloud Infrastructure Full",
        features: [
          { name: "Semua dalam Professional", included: true },
          { name: "Admin dashboard", included: true },
          { name: "Manage team member", included: true },
          { name: "Automations advanced", included: true },
          { name: "API access", included: true },
          { name: "Custom branding", included: true },
          { name: "Support priority", included: true },
          { name: "Monthly maintenance include", included: true },
        ],
        best: "Best untuk: Bisnes establish, team",
      },
      {
        name: "Pakej Premium",
        price: "RM1590+",
        icon: "⭐",
        description: "Solution fully customize",
        backend: "Custom Everything",
        features: [
          { name: "Semua dalam Enterprise", included: true },
          { name: "Integration custom", included: true },
          { name: "Account manager dedicate", included: true },
          { name: "Customize advanced", included: true },
          { name: "White-label option", included: true },
          { name: "Support 24/7 phone", included: true },
          { name: "Feature unlimited", included: true },
          { name: "Review strategy quarterly", included: true },
        ],
        best: "Best untuk: Kebutuhan unique, scale operation",
      },
    ],
    maintenance: {
      heading: "Monthly Care Plan (Optional)",
      description: "Jaga sistem kamu running smooth dan terus improve",
      plans: [
        {
          name: "Basic Care",
          price: "RM50",
          icon: "🔧",
          features: [
            "Support email",
            "Fix bug",
            "Update monthly",
            "Check health system",
          ],
        },
        {
          name: "Standard Care",
          price: "RM100",
          icon: "⚙️",
          features: [
            "Support priority (24h response)",
            "Semua dalam Basic",
            "Feature baru monthly",
            "Optimize system",
            "Update security",
          ],
        },
        {
          name: "Premium Pro",
          price: "RM150",
          icon: "🎯",
          features: [
            "Support 24/7 phone & email",
            "Semua dalam Standard",
            "Monitor real-time system",
            "Enhance advanced",
            "Tune performance",
          ],
        },
      ],
    },
    comparison: {
      title: "Quick Comparison",
      features: [
        "Automation Engine",
        "WhatsApp Integration",
        "Data Storage",
        "Admin Dashboard",
        "Team Features",
        "Support Level",
      ],
    },
    faq: {
      title: "Soalan Sering Ditanya",
      questions: [
        {
          q: "Ini bayar sekali ja?",
          a: "Ya! Semua setup package adalah bayar sekali ja. Monthly care plan optional dan boleh cancel anytime.",
        },
        {
          q: "Boleh upgrade atau downgrade nanti?",
          a: "Boleh! Upgrade ke package better anytime. Downgrade boleh juga based pada data storage kebutuhan.",
        },
        {
          q: "Apa kalau outgrow current package?",
          a: "Upgrade ja! Move dari WhatsApp ke Google Sheets, atau dari Sheets ke real database. Data kamu pindah sama.",
        },
        {
          q: "Perlu technical knowledge ke?",
          a: "Tidak. Kami handle semua technical setup. Kamu cuma provide detail bisnes dan kami build untuk kamu.",
        },
        {
          q: "Apa payment option yang ada?",
          a: "Terima bank transfer, credit card, dan boleh discuss payment plan untuk package lebih tinggi.",
        },
        {
          q: "Boleh customize package?",
          a: "Boleh ja. Lagi-lagi untuk Premium+ package, boleh customize exact sesuai kebutuhan kamu.",
        },
      ],
    },
    cta: {
      title: "Ready Automate Bisnes Kamu?",
      desc: "Pilih package kamu dan start setup hari ni",
      button: "Mulai Sekarang",
    },
  },
};

export default function Pricing() {
  const [language, setLanguage] = useState<Language>("en");
  const [showComparison, setShowComparison] = useState(false);
  const t = translations[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation language={language} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 border border-primary rounded-full">
            <span className="text-primary font-semibold text-sm">{t.badge}</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-foreground mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-foreground/70 mb-8">{t.subtitle}</p>
          <p className="text-foreground/60 max-w-3xl mx-auto">{t.description}</p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t.pricingHeading}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {t.packages.map((pkg, i) => (
              <div
                key={i}
                className={`rounded-lg border-2 transition-all flex flex-col ${
                  pkg.highlighted
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/20 lg:scale-105 lg:-translate-y-4"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="p-8 border-b border-border/30">
                  <div className="text-4xl mb-4">{pkg.icon}</div>
                  <h3 className="text-2xl font-black mb-2">{pkg.name}</h3>
                  <p className="text-foreground/60 text-sm mb-4">
                    {pkg.description}
                  </p>
                  <div>
                    <span className="text-5xl font-black text-primary">
                      {pkg.price}
                    </span>
                    <p className="text-xs text-foreground/60 mt-2">
                      {language === "en" ? "one-time setup" : "setup sekali ja"}
                    </p>
                  </div>
                  <p className="text-xs text-primary/70 italic mt-4 pt-4 border-t border-border/30">
                    {pkg.backend}
                  </p>
                </div>

                <div className="p-8 flex-1">
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        {feat.included ? (
                          <Check size={18} className="text-primary flex-shrink-0 mt-0.5" />
                        ) : (
                          <X size={18} className="text-foreground/20 flex-shrink-0 mt-0.5" />
                        )}
                        <span
                          className={
                            feat.included
                              ? "text-foreground"
                              : "text-foreground/40"
                          }
                        >
                          {feat.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-foreground/60 mb-6 p-3 bg-background rounded">
                    {pkg.best}
                  </p>

                  <Link
                    to="/setup"
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                      pkg.highlighted
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "border border-primary text-primary hover:bg-primary/10"
                    }`}
                  >
                    {language === "en" ? "Choose This" : "Pilih Ini"}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Maintenance Plans */}
          <div className="mt-20 pt-20 border-t border-border">
            <h2 className="text-3xl font-bold mb-4 text-center">
              {t.maintenance.heading}
            </h2>
            <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
              {t.maintenance.description}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {t.maintenance.plans.map((plan, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors"
                >
                  <div className="text-4xl mb-4">{plan.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-3xl font-black text-primary mb-6">
                    {plan.price}
                    <span className="text-sm text-foreground/60">
                      {language === "en" ? "/month" : "/bulan"}
                    </span>
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t.faq.title}
          </h2>

          <div className="space-y-6">
            {t.faq.questions.map((item, i) => (
              <div key={i} className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">{item.q}</h3>
                <p className="text-foreground/70">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-lg text-foreground/70 mb-8">{t.cta.desc}</p>
          <Link
            to="/setup"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            {t.cta.button}
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-foreground/60 text-sm">
          <p>
            ⚡ Bratstvo Digital © 2026 •{" "}
            {language === "en"
              ? "Professional SME Automation for Malaysia"
              : "Otomasi UKM Profesional untuk Malaysia"}
          </p>
        </div>
      </footer>
    </div>
  );
}

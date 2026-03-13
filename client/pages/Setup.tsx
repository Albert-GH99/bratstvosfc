import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ArrowRight, Copy, CheckCircle } from "lucide-react";

type Language = "en" | "my";

const translations = {
  en: {
    title: "Start Your Setup",
    subtitle: "Let's build your automation system in 5 minutes",
    badge: "⚡ Powered by Bratstvo Digital System",
    steps: {
      title: "Simple Setup Process",
      items: [
        { number: "1", title: "Fill Your Details", desc: "Tell us about your business" },
        { number: "2", title: "Choose Your Package", desc: "Select the right plan for you" },
        { number: "3", title: "Get Your Quote", desc: "See your personalized WhatsApp message" },
        { number: "4", title: "Proceed to Payment", desc: "Easy payment options available" },
      ],
    },
    form: {
      section1: "Your Business Information",
      fullName: "Full Name *",
      businessName: "Business Name *",
      businessType: "Type of Business *",
      businessTypeOptions: [
        { value: "food", label: "🍕 Food & Bakery" },
        { value: "retail", label: "🛒 Retail & E-Commerce" },
        { value: "service", label: "🔧 Services & Maintenance" },
        { value: "other", label: "📝 Other" },
      ],
      
      section2: "System & Package",
      systemType: "Automation System *",
      systemOptions: [
        { value: "food", label: "Food Preorder System" },
        { value: "product", label: "Product Order System" },
        { value: "service", label: "Service Booking System" },
      ],
      packageSelected: "Package Selected *",
      packageOptions: [
        { value: "249", label: "RM249 - Starter Pack" },
        { value: "590", label: "RM590 - Growth Pack" },
        { value: "990", label: "RM990 - Professional Pack" },
        { value: "1290", label: "RM1290 - Enterprise Pack" },
        { value: "1590", label: "RM1590+ - Premium Pack" },
      ],
      
      section3: "Optional Add-ons",
      monthlyPlan: "Monthly Care Plan",
      monthlyOptions: [
        { value: "none", label: "None (Skip for now)" },
        { value: "50", label: "RM50/month - Basic Care" },
        { value: "100", label: "RM100/month - Standard Care" },
        { value: "150", label: "RM150/month - Pro Care" },
      ],
      domain: "Need a Domain? *",
      domainNote: "Pricing varies by TLD (.com, .com.my, .my)",
      domainOptions: [
        { value: "no", label: "No, I have one already" },
        { value: "basic", label: "Basic Domain (RM120-200/year*)" },
        { value: "email", label: "Domain + Email (RM180-280/year*)" },
        { value: "hosting", label: "Domain + Hosting (RM380-500/year*)" },
        { value: "custom", label: "I have a domain preference (mention in notes)" },
      ],
      
      section4: "Timeline & Contact",
      timeline: "When do you want to launch? *",
      timelineOptions: [
        { value: "urgent", label: "ASAP (1-2 weeks)" },
        { value: "soon", label: "Soon (2-4 weeks)" },
        { value: "flexible", label: "Flexible (1-2 months)" },
      ],
      phone: "Phone Number (WhatsApp) *",
      email: "Email Address *",
      additionalNotes: "Additional Notes",
      
      submit: "Generate Consultation Message",
    },
    result: {
      title: "Your Consultation Request",
      subtitle: "Copy this message and send it to our WhatsApp",
      whatsappLabel: "Send to WhatsApp: +60 12-XXXX-XXXX",
      copy: "Copy Message",
      copied: "Copied to clipboard!",
      send: "Send via WhatsApp",
      note: "We'll respond within 24 hours with your quotation and next steps.",
    },
  },
  my: {
    title: "Mulai Setup Kamu",
    subtitle: "Mari build automation system kamu dalam 5 minit",
    badge: "⚡ Powered by Bratstvo Digital System",
    steps: {
      title: "Setup Process Senang",
      items: [
        { number: "1", title: "Fill Detail", desc: "Cerita tentang bisnes kamu" },
        { number: "2", title: "Pilih Package", desc: "Select plan yang right" },
        { number: "3", title: "Dapat Quote", desc: "Lihat personalized message" },
        { number: "4", title: "Bayar", desc: "Payment option mudah ada" },
      ],
    },
    form: {
      section1: "Info Bisnes Kamu",
      fullName: "Nama Penuh *",
      businessName: "Nama Bisnes *",
      businessType: "Jenis Bisnes *",
      businessTypeOptions: [
        { value: "food", label: "🍕 Makanan & Bakery" },
        { value: "retail", label: "🛒 Retail & E-Commerce" },
        { value: "service", label: "🔧 Services & Maintenance" },
        { value: "other", label: "📝 Lain" },
      ],
      
      section2: "System & Package",
      systemType: "Sistem Otomasi *",
      systemOptions: [
        { value: "food", label: "Sistem Prapesanan Makanan" },
        { value: "product", label: "Sistem Order Produk" },
        { value: "service", label: "Sistem Service Booking" },
      ],
      packageSelected: "Package Pilih *",
      packageOptions: [
        { value: "249", label: "RM249 - Pakej Starter" },
        { value: "590", label: "RM590 - Pakej Growth" },
        { value: "990", label: "RM990 - Pakej Professional" },
        { value: "1290", label: "RM1290 - Pakej Enterprise" },
        { value: "1590", label: "RM1590+ - Pakej Premium" },
      ],
      
      section3: "Add-ons Optional",
      monthlyPlan: "Monthly Care Plan",
      monthlyOptions: [
        { value: "none", label: "Takde (Skip untuk sekarang)" },
        { value: "50", label: "RM50/month - Basic Care" },
        { value: "100", label: "RM100/month - Standard Care" },
        { value: "150", label: "RM150/month - Pro Care" },
      ],
      domain: "Nak Domain? *",
      domainNote: "Harga beza base on TLD (.com, .com.my, .my)",
      domainOptions: [
        { value: "no", label: "Tidak, ada sudah" },
        { value: "basic", label: "Basic Domain (RM120-200/tahun*)" },
        { value: "email", label: "Domain + Email (RM180-280/tahun*)" },
        { value: "hosting", label: "Domain + Hosting (RM380-500/tahun*)" },
        { value: "custom", label: "Ada prefer domain (mention dalam note)" },
      ],
      
      section4: "Timeline & Contact",
      timeline: "Bila nak launch? *",
      timelineOptions: [
        { value: "urgent", label: "ASAP (1-2 minggu)" },
        { value: "soon", label: "Cepat (2-4 minggu)" },
        { value: "flexible", label: "Flexible (1-2 bulan)" },
      ],
      phone: "Nombor Phone (WhatsApp) *",
      email: "Email Address *",
      additionalNotes: "Catatan Tambahan",
      
      submit: "Generate Consultation Message",
    },
    result: {
      title: "Consultation Request Kamu",
      subtitle: "Copy mesej ini dan send via WhatsApp kami",
      whatsappLabel: "Send ke WhatsApp: +60 12-XXXX-XXXX",
      copy: "Copy Mesej",
      copied: "Copied!",
      send: "Send via WhatsApp",
      note: "Kami akan reply dalam 24 jam dengan quotation dan next step kamu.",
    },
  },
};

export default function Setup() {
  const [language, setLanguage] = useState<Language>("en");
  const [step, setStep] = useState<"form" | "result">("form");
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    businessType: "",
    systemType: "",
    packageSelected: "",
    monthlyPlan: "none",
    domain: "no",
    timeline: "",
    phone: "",
    email: "",
    notes: "",
  });

  const t = translations[language];

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.businessName || !formData.businessType || !formData.systemType || !formData.packageSelected || !formData.timeline || !formData.phone || !formData.email) {
      alert(
        language === "en"
          ? "Please fill in all required fields"
          : "Sila isi semua field yang wajib"
      );
      return;
    }
    setStep("result");
  };

  const generateMessage = () => {
    let packageName = "";
    let monthlyInfo = "";
    let domainInfo = "";

    const packages: Record<string, string> = {
      "249": "Starter Pack (RM249)",
      "590": "Growth Pack (RM590)",
      "990": "Professional Pack (RM990)",
      "1290": "Enterprise Pack (RM1290)",
      "1590": "Premium Pack (RM1590+)",
    };

    const timelines: Record<string, string> = {
      urgent: language === "en" ? "ASAP (1-2 weeks)" : "ASAP (1-2 minggu)",
      soon: language === "en" ? "2-4 weeks" : "2-4 minggu",
      flexible: language === "en" ? "1-2 months" : "1-2 bulan",
    };

    packageName = packages[formData.packageSelected] || "";

    if (formData.monthlyPlan !== "none") {
      const plans: Record<string, string> = {
        "50": "Basic Care (RM50/month)",
        "100": "Standard Care (RM100/month)",
        "150": "Pro Care (RM150/month)",
      };
      monthlyInfo = plans[formData.monthlyPlan] || "";
    }

    if (formData.domain !== "no") {
      const domains: Record<string, string> = {
        basic: "Basic Domain (RM120/year)",
        email: "Domain + Email (RM180/year)",
        hosting: "Domain + Hosting (RM380/year)",
      };
      domainInfo = domains[formData.domain] || "";
    }

    const header = language === "en" ? "NEW PROJECT REQUEST" : "PERMINTAAN PROJEK BARU";
    const nameLabel = language === "en" ? "Name" : "Nama";
    const businessLabel = language === "en" ? "Business" : "Bisnes";
    const systemLabel = language === "en" ? "System" : "Sistem";
    const packageLabel = language === "en" ? "Package" : "Pakej";
    const monthlyLabel = language === "en" ? "Monthly Plan" : "Plan Monthly";
    const domainLabel = language === "en" ? "Domain" : "Domain";
    const launchLabel = language === "en" ? "Launch Timeline" : "Timeline Launch";
    const phoneLabel = language === "en" ? "Phone" : "Phone";
    const emailLabel = language === "en" ? "Email" : "Email";
    const notesLabel = language === "en" ? "Notes" : "Catatan";
    const readyLabel = language === "en" ? "Ready to proceed?" : "Ready proceed?";

    return `
${header}
━━━━━━━━━━━━━━━━━
👤 ${nameLabel}: ${formData.fullName}
🏢 ${businessLabel}: ${formData.businessName}
📊 ${systemLabel}: ${formData.systemType}
💰 ${packageLabel}: ${packageName}
${monthlyInfo ? `📅 ${monthlyLabel}: ${monthlyInfo}\n` : ""}${domainInfo ? `🌐 ${domainLabel}: ${domainInfo}\n` : ""}⏰ ${launchLabel}: ${timelines[formData.timeline]}
📞 ${phoneLabel}: ${formData.phone}
📧 ${emailLabel}: ${formData.email}
${formData.notes ? `📝 ${notesLabel}: ${formData.notes}\n` : ""}
━━━━━━━━━━━━━━━━━
✅ ${readyLabel}
    `.trim();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMessage());
  };

  if (step === "result") {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation language={language} onLanguageChange={setLanguage} />

        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <CheckCircle size={64} className="text-primary mx-auto mb-6" />
              <h1 className="text-4xl font-black mb-4">{t.result.title}</h1>
              <p className="text-xl text-foreground/70">{t.result.subtitle}</p>
            </div>

            <div className="bg-card border-2 border-primary rounded-lg p-8 mb-8">
              <pre className="whitespace-pre-wrap font-mono text-sm text-foreground/80 overflow-auto max-h-96">
                {generateMessage()}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Copy size={20} />
                {t.result.copy}
              </button>
              <a
                href="https://wa.me/60XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                <ArrowRight size={20} />
                {t.result.send}
              </a>
            </div>

            <div className="bg-primary/10 border border-primary rounded-lg p-6 text-center">
              <p className="text-foreground/70">{t.result.note}</p>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => {
                  setStep("form");
                  setFormData({
                    fullName: "",
                    businessName: "",
                    businessType: "",
                    systemType: "",
                    packageSelected: "",
                    monthlyPlan: "none",
                    domain: "no",
                    timeline: "",
                    phone: "",
                    email: "",
                    notes: "",
                  });
                }}
                className="text-primary font-semibold hover:text-primary/80"
              >
                {language === "en" ? "← Start Over" : "← Mulai Balik"}
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

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
          <p className="text-xl text-foreground/70">{t.subtitle}</p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center">{t.steps.title}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {t.steps.items.map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-black text-lg mx-auto mb-4">
                  {item.number}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-foreground/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl font-bold mb-6">{t.form.section1}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.form.fullName}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.form.businessName}
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.form.businessType}
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors"
                  >
                    <option value="">Select...</option>
                    {t.form.businessTypeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl font-bold mb-6">{t.form.section2}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.form.systemType}
                  </label>
                  <select
                    name="systemType"
                    value={formData.systemType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors"
                  >
                    <option value="">Select...</option>
                    {t.form.systemOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.form.packageSelected}
                  </label>
                  <select
                    name="packageSelected"
                    value={formData.packageSelected}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors"
                  >
                    <option value="">Select...</option>
                    {t.form.packageOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl font-bold mb-6">{t.form.section3}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.form.monthlyPlan}
                  </label>
                  <select
                    name="monthlyPlan"
                    value={formData.monthlyPlan}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors"
                  >
                    {t.form.monthlyOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    {t.form.domain}
                  </label>
                  <p className="text-xs text-foreground/60 mb-2">{t.form.domainNote}</p>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors"
                  >
                    {t.form.domainOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl font-bold mb-6">{t.form.section4}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.form.timeline}
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors"
                  >
                    <option value="">Select...</option>
                    {t.form.timelineOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.form.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors"
                    placeholder="012-3456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.form.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.form.additionalNotes}
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {t.form.submit}
              <ArrowRight size={24} />
            </button>
          </form>
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

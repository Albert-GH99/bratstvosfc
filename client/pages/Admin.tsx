import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, LogOut, Home, Settings, AlertCircle, CheckCircle, X, Plus } from "lucide-react";
import { motion } from "framer-motion";
import ShopManagement from "@/components/admin/ShopManagement";

type Language = "en" | "my";
type AdminSection = "dashboard" | "content" | "pricing" | "shop" | "settings";

const translations = {
  en: {
    title: "Admin Settings",
    subtitle: "Manage your Bratstvo Digital platform",
    login: {
      title: "Admin Access",
      subtitle: "Enter your admin password to continue",
      password: "Admin Password",
      submit: "Access Dashboard",
      error: "Invalid password",
    },
    dashboard: {
      welcome: "Welcome back, Admin!",
      sections: {
        content: "Content Management",
        pricing: "Pricing & Packages",
        products: "Shop Products",
        settings: "Site Settings",
      },
      features: [
        {
          title: "Edit Homepage",
          desc: "Update hero section, features, and messaging",
          status: "active",
        },
        {
          title: "Manage Pricing",
          desc: "Update package pricing and descriptions",
          status: "active",
        },
        {
          title: "Shop Management",
          desc: "Add, edit, or remove merchandise products",
          status: "active",
        },
        {
          title: "Site Settings",
          desc: "Domain, branding, and general settings",
          status: "active",
        },
        {
          title: "System Configuration",
          desc: "Configure automation system features",
          status: "active",
        },
        {
          title: "Email Templates",
          desc: "Customize email notifications",
          status: "active",
        },
      ],
    },
    buttons: {
      manage: "Manage",
      edit: "Edit Content",
      managePricing: "Manage Pricing",
      manageShop: "Manage Shop",
      settings: "Site Settings",
      back: "Back to Dashboard",
      close: "Close",
      save: "Save Changes",
      add: "Add New",
      delete: "Delete",
    },
    modals: {
      contentTitle: "Edit Homepage Content",
      pricingTitle: "Manage Pricing & Packages",
      shopTitle: "Shop Products Management",
      settingsTitle: "Site Settings",
      saved: "Changes saved successfully!",
      fieldName: "Field Name",
      fieldValue: "Field Value",
      products: "Products",
      domain: "Domain Settings",
      branding: "Branding",
    },
  },
  my: {
    title: "Tetapan Admin",
    subtitle: "Selenggara platform Bratstvo Digital kamu",
    login: {
      title: "Admin Access",
      subtitle: "Masukkan password admin untuk teruskan",
      password: "Password Admin",
      submit: "Access Dashboard",
      error: "Password salah",
    },
    dashboard: {
      welcome: "Selamat kembali, Admin!",
      sections: {
        content: "Edit",
        pricing: "Harga & Pakej",
        products: "Shop Products",
        settings: "Tetapan Site",
      },
      features: [
        {
          title: "Edit Homepage",
          desc: "Update hero section, features, dan messaging",
          status: "active",
        },
        {
          title: "Edit Harga",
          desc: "Update harga package dan description",
          status: "active",
        },
        {
          title: "Edit Kedai",
          desc: "Add, edit, atau remove merchandise",
          status: "active",
        },
        {
          title: "Tetapan Site",
          desc: "Domain, branding, dan general settings",
          status: "active",
        },
        {
          title: "Configure System",
          desc: "Edit automation system features",
          status: "active",
        },
        {
          title: "Email Template",
          desc: "Customize email notification",
          status: "active",
        },
      ],
    },
    buttons: {
      manage: "Edit",
      edit: "Edit Content",
      managePricing: "Edit Pricing",
      manageShop: "Edit Shop",
      settings: "Tetapan Site",
      back: "Balik ke Dashboard",
      close: "Tutup",
      save: "Simpan Changes",
      add: "Tambah Baru",
      delete: "Padam",
    },
    modals: {
      contentTitle: "Edit Homepage Content",
      pricingTitle: "Edit Pricing & Packages",
      shopTitle: "Shop Products Management",
      settingsTitle: "Tetapan Site",
      saved: "Changes saved successfully!",
      fieldName: "Field Name",
      fieldValue: "Field Value",
      products: "Products",
      domain: "Domain Settings",
      branding: "Branding",
    },
  },
};

export default function Admin() {
  const [language, setLanguage] = useState<Language>("en");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [saveMessage, setSaveMessage] = useState("");
  const navigate = useNavigate();
  const t = translations[language];

  const ADMIN_PASSWORD = "Bratstvo2026";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError("");
      setPassword("");
    } else {
      setError(t.login.error);
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword("");
    setActiveSection("dashboard");
  };

  const handleSave = () => {
    setSaveMessage(t.modals.saved);
    setTimeout(() => setSaveMessage(""), 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4">
        <motion.div
          className="max-w-md w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <motion.div
              className="inline-block mb-6 w-16 h-16 bg-primary/20 border border-primary rounded-lg flex items-center justify-center"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Lock size={32} className="text-primary" />
            </motion.div>
            <h1 className="text-4xl font-black mb-2">{t.title}</h1>
            <p className="text-foreground/60">{t.login.subtitle}</p>
          </div>

          <motion.form
            onSubmit={handleLogin}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <label className="block text-sm font-semibold mb-2">
                {t.login.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors"
              />
              {error && (
                <motion.div
                  className="mt-3 flex items-center gap-2 text-red-500 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <AlertCircle size={16} />
                  {error}
                </motion.div>
              )}
            </div>

            <motion.button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.login.submit}
            </motion.button>

            <Link
              to="/"
              className="block w-full text-center py-3 border border-border text-foreground hover:border-primary hover:text-primary transition-colors rounded-lg font-semibold"
            >
              {language === "en" ? "Back to Home" : "Balik ke Utama"}
            </Link>
          </motion.form>

          <motion.div
            className="mt-8 p-4 bg-card/50 border border-border rounded-lg text-xs text-foreground/60 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p>Demo password: Bratstvo2026</p>
          </motion.div>

          {/* Language Switcher */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 text-sm font-bold rounded transition-all ${
                language === "en"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground/60 hover:text-foreground border border-border"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("my")}
              className={`px-3 py-1 text-sm font-bold rounded transition-all ${
                language === "my"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground/60 hover:text-foreground border border-border"
              }`}
            >
              MY
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Modal Components
  const ContentModal = () => (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => setActiveSection("dashboard")}
    >
      <motion.div
        className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{t.modals.contentTitle}</h2>
          <button
            onClick={() => setActiveSection("dashboard")}
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Hero Title</label>
            <input
              type="text"
              defaultValue="Automate Your Business with Bratstvo Digital"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Hero Subtitle</label>
            <textarea
              defaultValue="Transform your WhatsApp chaos into structured, automated systems. Built specifically for Malaysian SMEs."
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">CTA Button Text</label>
            <input
              type="text"
              defaultValue="Get Started Now"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
            />
          </div>
          <motion.button
            onClick={handleSave}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.buttons.save}
          </motion.button>
          {saveMessage && (
            <motion.div
              className="p-3 bg-green-500/20 border border-green-500 rounded text-green-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✓ {saveMessage}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  const PricingModal = () => (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => setActiveSection("dashboard")}
    >
      <motion.div
        className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{t.modals.pricingTitle}</h2>
          <button
            onClick={() => setActiveSection("dashboard")}
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {["Starter (RM249)", "Growth (RM590)", "Business (RM990)", "Enterprise (RM1290)", "Premium (RM1590+)"].map(
            (pkg, i) => (
              <div key={i} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold">{pkg}</h3>
                  <button className="text-red-500 hover:text-red-600 text-sm">
                    {t.buttons.delete}
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Package description"
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm text-foreground"
                />
              </div>
            )
          )}
          <motion.button
            className="w-full flex items-center justify-center gap-2 py-2 border border-border text-primary font-semibold rounded-lg hover:border-primary transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <Plus size={16} /> {t.buttons.add}
          </motion.button>
          <motion.button
            onClick={handleSave}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.buttons.save}
          </motion.button>
          {saveMessage && (
            <motion.div
              className="p-3 bg-green-500/20 border border-green-500 rounded text-green-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✓ {saveMessage}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  const ShopModal = () => (
    <ShopManagement
      onClose={() => setActiveSection("dashboard")}
      language={language}
    />
  );

  const SettingsModal = () => (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => setActiveSection("dashboard")}
    >
      <motion.div
        className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{t.modals.settingsTitle}</h2>
          <button
            onClick={() => setActiveSection("dashboard")}
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-bold mb-4 text-primary">{t.modals.domain}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold mb-2">Domain Name</label>
                <input
                  type="text"
                  defaultValue="bratstvo.digital"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="admin@bratstvo.digital"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                />
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6">
            <h3 className="font-bold mb-4 text-primary">{t.modals.branding}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold mb-2">Primary Color</label>
                <input
                  type="text"
                  defaultValue="#18E68C"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Background Color</label>
                <input
                  type="text"
                  defaultValue="#050B12"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                />
              </div>
            </div>
          </div>
          <motion.button
            onClick={handleSave}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.buttons.save}
          </motion.button>
          {saveMessage && (
            <motion.div
              className="p-3 bg-green-500/20 border border-green-500 rounded text-green-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✓ {saveMessage}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-black text-foreground">
              {t.dashboard.welcome}
            </h1>
            <p className="text-foreground/60 text-sm">{t.subtitle}</p>
          </motion.div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 text-sm font-bold rounded transition-all ${
                  language === "en"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground/60 border border-border"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("my")}
                className={`px-3 py-1 text-sm font-bold rounded transition-all ${
                  language === "my"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground/60 border border-border"
                }`}
              >
                MY
              </button>
            </div>
            <motion.button
              onClick={handleLogout}
              className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={20} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Links */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {t.dashboard.features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start justify-between mb-3">
                <Settings size={32} className="text-primary" />
                {feature.status === "active" && (
                  <motion.div
                    className="flex items-center gap-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-xs font-bold text-green-500">
                      Active
                    </span>
                  </motion.div>
                )}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-foreground/60 text-sm mb-6">{feature.desc}</p>
              <motion.button
                onClick={() => {
                  if (i === 0) setActiveSection("content");
                  else if (i === 1) setActiveSection("pricing");
                  else if (i === 2) setActiveSection("shop");
                  else if (i === 3) setActiveSection("settings");
                }}
                className="text-primary font-semibold text-sm hover:gap-2 flex items-center gap-1 transition-all"
                whileHover={{ gap: "0.5rem" }}
              >
                {t.buttons.manage} →
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Sections */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Content Section */}
          <motion.section
            className="bg-card border border-border rounded-lg p-8"
            whileHover={{ borderColor: "var(--primary)" }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Home size={24} className="text-primary" />
              {t.dashboard.sections.content}
            </h2>
            <div className="space-y-4">
              <p className="text-foreground/60 mb-6">
                {language === "en"
                  ? "Edit your homepage content, including hero section, features, systems, and messaging. Manage all text, pricing, and call-to-action messages."
                  : "Edit content homepage kamu, termasuk hero section, features, system, dan messaging. Manage semua text, pricing, dan CTA message."}
              </p>
              <motion.button
                onClick={() => setActiveSection("content")}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.buttons.edit}
              </motion.button>
            </div>
          </motion.section>

          {/* Pricing Section */}
          <motion.section
            className="bg-card border border-border rounded-lg p-8"
            whileHover={{ borderColor: "var(--primary)" }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Settings size={24} className="text-primary" />
              {t.dashboard.sections.pricing}
            </h2>
            <div className="space-y-4">
              <p className="text-foreground/60 mb-6">
                {language === "en"
                  ? "Manage all pricing packages, features, monthly care plans, and pricing descriptions. Update prices without touching code."
                  : "Edit semua pricing package, features, monthly care plan, dan pricing description. Update harga tanpa touch code."}
              </p>
              <motion.button
                onClick={() => setActiveSection("pricing")}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.buttons.managePricing}
              </motion.button>
            </div>
          </motion.section>

          {/* Products Section */}
          <motion.section
            className="bg-card border border-border rounded-lg p-8"
            whileHover={{ borderColor: "var(--primary)" }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Settings size={24} className="text-primary" />
              {t.dashboard.sections.products}
            </h2>
            <div className="space-y-4">
              <p className="text-foreground/60 mb-6">
                {language === "en"
                  ? "Add, edit, or remove merchandise products from your shop. Manage inventory, pricing, images, and product descriptions."
                  : "Add, edit, atau remove merchandise dari kedai kamu. Manage inventory, pricing, image, dan product description."}
              </p>
              <motion.button
                onClick={() => setActiveSection("shop")}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.buttons.manageShop}
              </motion.button>
            </div>
          </motion.section>

          {/* Settings Section */}
          <motion.section
            className="bg-card border border-border rounded-lg p-8"
            whileHover={{ borderColor: "var(--primary)" }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Settings size={24} className="text-primary" />
              {t.dashboard.sections.settings}
            </h2>
            <div className="space-y-4">
              <p className="text-foreground/60 mb-6">
                {language === "en"
                  ? "Configure your domain, branding colors, logo, general settings, and platform preferences."
                  : "Configure domain kamu, branding color, logo, general setting, dan platform preference."}
              </p>
              <motion.button
                onClick={() => setActiveSection("settings")}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.buttons.settings}
              </motion.button>
            </div>
          </motion.section>
        </motion.div>

        {/* Back to Site */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground hover:border-primary hover:text-primary transition-colors rounded-lg font-semibold"
          >
            <Home size={20} />
            {language === "en" ? "Back to Website" : "Balik ke Website"}
          </Link>
        </motion.div>
      </main>

      {/* Modals */}
      {activeSection === "content" && <ContentModal />}
      {activeSection === "pricing" && <PricingModal />}
      {activeSection === "kedai" && <ShopModal />}
      {activeSection === "settings" && <SettingsModal />}
    </div>
  );
}

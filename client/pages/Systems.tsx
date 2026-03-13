import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Check, ArrowRight, Zap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Language = "en" | "my";

const translations = {
  en: {
    title: "Automation Systems",
    subtitle: "Choose the perfect system for your business",
    badge: "⚡ Powered by Bratstvo Digital System",
    comingSoon: "Coming Soon",
    live: "Live Now",
    systems: [
      {
        icon: "🍕",
        name: "Food Preorder System",
        status: "live",
        tagline: "Perfect for food businesses & pre-order sellers",
        shortDesc:
          "Streamline your food ordering from chaotic WhatsApp to organized, automated orders.",
        longDesc:
          "Ideal for bakers, food delivery services, Ramadan katering sellers, and any business that takes food orders. Customers select from your menu, choose quantities, and the system automatically calculates totals and sends a professional confirmation via WhatsApp.",
        usedBy: "Bakers • Food Sellers • Ramadan Katering • Meal Prep Services",
        features: [
          {
            title: "Menu Management",
            desc: "Create and manage your menu items with descriptions and prices",
          },
          {
            title: "Quantity Selection",
            desc: "Customers select exactly what they want in exact quantities",
          },
          {
            title: "Automatic Calculation",
            desc: "Price calculations done instantly - no manual math needed",
          },
          {
            title: "Order Confirmation",
            desc: "Professional WhatsApp confirmation sent immediately",
          },
          {
            title: "Customer Details",
            desc: "Capture delivery address, dietary preferences, allergies",
          },
          {
            title: "Order History",
            desc: "Keep track of repeat customers and their preferences",
          },
        ],
        workflow:
          "Customer → Select Menu Items → Choose Quantity → Enter Details → System Calculates → WhatsApp Confirmation Sent",
      },
      {
        icon: "🛒",
        name: "Product Order System",
        status: "live",
        tagline: "For online sellers, dropshippers & retailers",
        shortDesc:
          "Transform scattered product inquiries into organized, trackable orders with variant management.",
        longDesc:
          "Perfect for e-commerce sellers, dropshippers, clothing retailers, and any business selling physical products with variations. Customers browse your catalog, select sizes/colors/variants, and complete their order with all details automatically organized.",
        usedBy: "Dropshippers • Clothing Sellers • Online Retailers • Product Businesses",
        features: [
          {
            title: "Product Catalog",
            desc: "Display all your products with images, descriptions, and pricing",
          },
          {
            title: "Size & Color Variants",
            desc: "Let customers choose exact variations they want to order",
          },
          {
            title: "Inventory Tracking",
            desc: "Keep track of what's available and manage stock levels",
          },
          {
            title: "Customer Database",
            desc: "Build a database of buyers for repeat sales and marketing",
          },
          {
            title: "Order Summary",
            desc: "Detailed order breakdown with all selected variants",
          },
          {
            title: "Payment Integration Ready",
            desc: "Can integrate with payment systems for online payments",
          },
        ],
        workflow:
          "Customer → Browse Products → Select Variants → Add Quantity → Checkout → WhatsApp Order Sent",
      },
      {
        icon: "🔧",
        name: "Service Booking System",
        status: "live",
        tagline: "For home services, maintenance & professionals",
        shortDesc:
          "Let customers book your services with date/time selection without the back-and-forth messaging.",
        longDesc:
          "Ideal for HVAC technicians, home repair services, beauty professionals, property maintenance, and any service-based business. Customers select the service they need, choose their preferred date and time, and the system automatically sends all details to you organized and ready to action.",
        usedBy: "HVAC Services • Home Repair • Beauty Services • Maintenance • Consultants",
        features: [
          {
            title: "Service Selection",
            desc: "Customers choose from your available services and packages",
          },
          {
            title: "Date Selection",
            desc: "Pick their preferred date with your calendar availability shown",
          },
          {
            title: "Time Slot Booking",
            desc: "Choose exact time slots - no scheduling confusion",
          },
          {
            title: "Customer Profile",
            desc: "Capture customer details, address, and special requirements",
          },
          {
            title: "Service Notes",
            desc: "Add specific requirements or notes for the service visit",
          },
          {
            title: "Automatic Dispatch",
            desc: "System sends booking details to your WhatsApp instantly",
          },
        ],
        workflow:
          "Customer → Select Service → Choose Date → Pick Time → Enter Details → Booking Confirmation Sent",
      },
      {
        icon: "🎫",
        name: "Event Registration System",
        status: "live",
        tagline: "For workshops, webinars & training events",
        shortDesc:
          "Manage event registrations, ticketing, and attendee information seamlessly.",
        longDesc:
          "Perfect for workshop organizers, webinar hosts, training providers, and event managers. Customers select ticket types, choose quantities, provide their details, and the system automatically sends confirmation and event details via WhatsApp. Manage capacity, pricing tiers, and attendee information effortlessly.",
        usedBy: "Workshop Organizers • Event Managers • Training Providers • Webinar Hosts",
        features: [
          {
            title: "Ticket Types",
            desc: "Create multiple ticket tiers (standard, VIP, group discounts)",
          },
          {
            title: "Quantity Management",
            desc: "Control ticket quantities and capacity limits",
          },
          {
            title: "Attendee Database",
            desc: "Store all attendee information for follow-ups and future events",
          },
          {
            title: "Registration Confirmation",
            desc: "Automatic WhatsApp confirmation with event details",
          },
          {
            title: "Pricing Tiers",
            desc: "Set different prices for early bird, regular, and last-minute registrations",
          },
          {
            title: "Event Details",
            desc: "Include date, time, location, and special instructions in confirmation",
          },
        ],
        workflow:
          "Attendee → Select Ticket Type → Choose Quantity → Enter Details → Payment → Registration Confirmed",
      },
      {
        icon: "📱",
        name: "QR Food Ordering System",
        status: "live",
        tagline: "For restaurants, food courts & cafes",
        shortDesc:
          "Quick and easy ordering directly from a table via QR code.",
        longDesc:
          "Perfect for restaurants, food courts, cafes, and quick-service dining. Customers scan a QR code at their table, browse your menu, select items and quantities, and the order is automatically sent to your kitchen via WhatsApp. Fast, contactless, and efficient service without waiting for staff to take orders.",
        usedBy: "Restaurants • Food Courts • Cafes • QSR • Delivery Services",
        features: [
          {
            title: "QR Code Table Ordering",
            desc: "Print QR codes for each table - customers scan and order",
          },
          {
            title: "Contactless Ordering",
            desc: "Safe and hygienic ordering without physical menus or staff interaction",
          },
          {
            title: "Real-time Kitchen Order",
            desc: "Orders sent instantly to kitchen via WhatsApp",
          },
          {
            title: "Menu Management",
            desc: "Update menu items, prices, and availability in real-time",
          },
          {
            title: "Table Management",
            desc: "Track orders by table number for easy identification",
          },
          {
            title: "Speed & Efficiency",
            desc: "Reduce order-taking time and increase table turnover",
          },
        ],
        workflow:
          "Customer → Scan QR at Table → Browse Menu → Select Items → Quantity → Submit → Kitchen Receives Order",
      },
    ],
    comingSoonSystems: [
      {
        icon: "💳",
        name: "Payment Processing System",
        tagline: "Integrated payments with all systems",
      },
      {
        icon: "📊",
        name: "Analytics Dashboard",
        tagline: "Deep insights into your business",
      },
      {
        icon: "🤖",
        name: "AI Smart Recommendations",
        tagline: "Upsell & cross-sell automation",
      },
    ],
    universal: {
      title: "Universal Automation Engine",
      subtitle: "One powerful engine. Unlimited possibilities.",
      desc: "All systems run on the same universal automation engine. The difference is just the configuration - what questions you ask, how you arrange your data, and what your customers see. This means rapid deployment and consistent quality across all systems.",
      features: [
        "WhatsApp Integration",
        "Real-time Notifications",
        "Data Validation",
        "Automatic Formatting",
        "Customer Management",
        "Multi-language Support",
      ],
    },
    cta: "Start Building Your System",
    ctaDesc:
      "Ready to automate? Choose your system and start your setup today.",
  },
  my: {
    title: "Sistem Otomasi",
    subtitle: "Pilih sistem yang perfect untuk bisnes kamu",
    badge: "⚡ Powered by Bratstvo Digital System",
    comingSoon: "Datang Nanti",
    live: "Live Sekarang",
    systems: [
      {
        icon: "🍕",
        name: "Sistem Prapesanan Makanan",
        status: "live",
        tagline: "Perfect untuk bisnes makanan & penjual preorder",
        shortDesc:
          "Ubah order makanan dari WhatsApp serabut jadi pesanan teratur dan automation.",
        longDesc:
          "Sempurna untuk pembuat kue, delivery makanan, penjual katering Ramadan, dan bisnes makanan yang terima order. Customer pilih dari menu kamu, pilih quantity, system auto calculate total dan kirim confirmation professional via WhatsApp.",
        usedBy: "Pembuat Kue • Penjual Makanan • Katering Ramadan • Meal Prep Services",
        features: [
          {
            title: "Urus Menu",
            desc: "Buat dan urus item menu dengan description dan harga",
          },
          {
            title: "Pilih Quantity",
            desc: "Customer pilih exactly apa yang dorang nak dalam berapa quantity",
          },
          {
            title: "Auto Calculate",
            desc: "Harga calculate instant - takde math manual",
          },
          {
            title: "Order Confirmation",
            desc: "Professional WhatsApp confirmation kirim terus",
          },
          {
            title: "Detail Customer",
            desc: "Capture delivery address, preference, allergies",
          },
          {
            title: "History Order",
            desc: "Track repeat customer dan prefer dorang",
          },
        ],
        workflow:
          "Customer → Pilih Menu → Pilih Quantity → Enter Detail → System Calculate → WhatsApp Confirm Sent",
      },
      {
        icon: "🛒",
        name: "Sistem Order Produk",
        status: "live",
        tagline: "Untuk seller online, dropshipper & retailer",
        shortDesc:
          "Transform inquiry produk serabut jadi order teratur dengan variant urus.",
        longDesc:
          "Perfect untuk e-commerce seller, dropshipper, tukang jual baju, dan bisnes jual produk dengan variant. Customer browse catalog, pilih size/color/variant, dan complete order dengan detail auto organize.",
        usedBy: "Dropshipper • Tukang Jual Baju • Retailer Online • Bisnes Produk",
        features: [
          {
            title: "Catalog Produk",
            desc: "Display semua produk dengan image, description, harga",
          },
          {
            title: "Variant Size & Warna",
            desc: "Customer pilih exact variant yang dorang order",
          },
          {
            title: "Track Inventory",
            desc: "Track apa available dan manage stock level",
          },
          {
            title: "Database Customer",
            desc: "Build database buyer untuk repeat sales dan marketing",
          },
          {
            title: "Order Breakdown",
            desc: "Detail order dengan semua variant yang pilih",
          },
          {
            title: "Payment Ready",
            desc: "Siap integrate dengan payment system untuk online payment",
          },
        ],
        workflow:
          "Customer → Browse Produk → Pilih Variant → Add Quantity → Checkout → WhatsApp Order Sent",
      },
      {
        icon: "🔧",
        name: "Sistem Service Booking",
        status: "live",
        tagline: "Untuk home services, maintenance & professional",
        shortDesc:
          "Biar customer book service kamu dengan date/time selection tanpa back-and-forth chat.",
        longDesc:
          "Ideal untuk HVAC technician, home repair, beauty professional, property maintenance, dan bisnes service. Customer pilih service nak, pilih date dan time prefer, system auto send semua detail teratur dan ready nak action.",
        usedBy: "HVAC Services • Home Repair • Beauty • Maintenance • Consultant",
        features: [
          {
            title: "Pilih Service",
            desc: "Customer pilih dari service available dan package kamu",
          },
          {
            title: "Pilih Date",
            desc: "Pilih date prefer dengan calendar availability kamu nampak",
          },
          {
            title: "Book Time Slot",
            desc: "Pilih exact time slot - takde scheduling confusion",
          },
          {
            title: "Profile Customer",
            desc: "Capture detail customer, address, special requirement",
          },
          {
            title: "Service Notes",
            desc: "Add specific requirement atau note untuk visit service",
          },
          {
            title: "Dispatch Automatic",
            desc: "System kirim booking detail ke WhatsApp kamu instant",
          },
        ],
        workflow:
          "Customer → Pilih Service → Pilih Date → Pilih Time → Enter Detail → Booking Confirm Sent",
      },
      {
        icon: "🎫",
        name: "Sistem Event Registration",
        status: "live",
        tagline: "Untuk workshop, webinar & training event",
        shortDesc:
          "Urus event registration, ticketing, dan attendee info dengan senang.",
        longDesc:
          "Perfect untuk workshop organizer, webinar host, training provider, dan event manager. Customer pilih ticket type, pilih quantity, provide detail, system auto send confirmation dan event detail via WhatsApp. Manage capacity, pricing tier, dan attendee info dengan mudah.",
        usedBy: "Workshop Organizer • Event Manager • Training Provider • Webinar Host",
        features: [
          {
            title: "Ticket Type",
            desc: "Buat multiple ticket tier (standard, VIP, group discount)",
          },
          {
            title: "Manage Quantity",
            desc: "Control ticket quantity dan capacity limit",
          },
          {
            title: "Database Attendee",
            desc: "Store semua attendee info untuk follow-up dan event masa depan",
          },
          {
            title: "Confirmation Register",
            desc: "Automatic WhatsApp confirmation dengan event detail",
          },
          {
            title: "Pricing Tier",
            desc: "Set harga different untuk early bird, regular, last-minute",
          },
          {
            title: "Event Detail",
            desc: "Include date, time, location, special instruction dalam confirmation",
          },
        ],
        workflow:
          "Attendee → Pilih Ticket → Pilih Quantity → Enter Detail → Payment → Registration Confirm",
      },
      {
        icon: "📱",
        name: "Sistem QR Food Ordering",
        status: "live",
        tagline: "Untuk restaurant, food court & cafe",
        shortDesc:
          "Order yang cepat dan senang direct dari meja via QR code.",
        longDesc:
          "Perfect untuk restaurant, food court, cafe, dan quick-service dining. Customer scan QR code kat meja, browse menu, pilih item dan quantity, order auto kirim ke kitchen via WhatsApp. Cepat, contactless, efficient service tanpa tunggu staff nak ambil order.",
        usedBy: "Restaurant • Food Court • Cafe • QSR • Delivery Service",
        features: [
          {
            title: "QR Code Table Order",
            desc: "Print QR code untuk setiap meja - customer scan dan order",
          },
          {
            title: "Contactless Order",
            desc: "Safe dan hygenic order tanpa physical menu atau staff interaction",
          },
          {
            title: "Real-time Kitchen",
            desc: "Order sent instant ke kitchen via WhatsApp",
          },
          {
            title: "Urus Menu",
            desc: "Update menu item, price, availability real-time",
          },
          {
            title: "Manage Table",
            desc: "Track order by table number untuk easy identification",
          },
          {
            title: "Speed & Efficiency",
            desc: "Reduce order-taking time dan increase table turnover",
          },
        ],
        workflow:
          "Customer → Scan QR at Table → Browse Menu → Pilih Item → Quantity → Submit → Kitchen Dapat Order",
      },
    ],
    comingSoonSystems: [
      {
        icon: "💳",
        name: "Sistem Payment Processing",
        tagline: "Integrated payment dengan semua system",
      },
      {
        icon: "📊",
        name: "Analytics Dashboard",
        tagline: "Deep insight tentang bisnes kamu",
      },
      {
        icon: "🤖",
        name: "AI Smart Recommendation",
        tagline: "Upsell & cross-sell automation",
      },
    ],
    universal: {
      title: "Universal Automation Engine",
      subtitle: "Satu engine powerful. Unlimited possibilities.",
      desc: "Semua system guna universal automation engine yang sama. Perbezaan cuma configuration - apa soalan kamu tanya, macam mana arrange data, dan apa customer nampak. Ini bermakna deploy cepat dan quality consistent.",
      features: [
        "WhatsApp Integration",
        "Real-time Notification",
        "Data Validation",
        "Format Automatic",
        "Customer Management",
        "Multi-language Support",
      ],
    },
    cta: "Mulai Build System Kamu",
    ctaDesc:
      "Ready automate? Pilih system kamu dan start setup hari ni juga.",
  },
};

export default function Systems() {
  const [language, setLanguage] = useState<Language>("en");
  const t = translations[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation language={language} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="inline-block mb-6 px-4 py-2 bg-primary/10 border border-primary rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-semibold text-sm">{t.badge}</span>
          </motion.div>
          <motion.h1
            className="text-5xl sm:text-6xl font-black text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t.title}
          </motion.h1>
          <motion.p
            className="text-xl text-foreground/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Systems Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {t.systems.map((system, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Content */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-6xl">{system.icon}</span>
                    {system.status === "live" && (
                      <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">
                        {t.live}
                      </span>
                    )}
                  </div>
                  <h2 className="text-4xl font-black mb-2">{system.name}</h2>
                  <p className="text-primary font-semibold mb-4">
                    {system.tagline}
                  </p>
                  <p className="text-lg text-foreground/70 mb-8">
                    {system.longDesc}
                  </p>

                  {/* Used By */}
                  <div className="mb-8 p-4 bg-card border border-border rounded-lg">
                    <p className="text-sm text-foreground/60 mb-2">
                      {language === "en" ? "Used By:" : "Guna Oleh:"}
                    </p>
                    <p className="font-semibold text-primary">{system.usedBy}</p>
                  </div>

                  {/* Workflow */}
                  <div className="mb-8">
                    <p className="text-sm text-foreground/60 mb-3 font-semibold">
                      {language === "en" ? "Typical Workflow:" : "Workflow Biasa:"}
                    </p>
                    <p className="text-sm text-foreground/70 italic border-l-2 border-primary pl-4">
                      {system.workflow}
                    </p>
                  </div>

                  <Link
                    to="/setup"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    {language === "en" ? "Start Setup" : "Mulai Setup"}
                    <ArrowRight size={20} />
                  </Link>
                </div>

                {/* Features Grid */}
                <div className={`lg:[direction:ltr] space-y-4`}>
                  {system.features.map((feature, j) => (
                    <motion.div
                      key={j}
                      className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                      whileHover={{ translateY: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Check size={20} className="text-primary flex-shrink-0" />
                        {feature.title}
                      </h4>
                      <p className="text-foreground/60 text-sm">
                        {feature.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Systems */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {language === "en" ? "Coming Soon" : "Datang Nanti"}
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {t.comingSoonSystems.map((system, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-background border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl mb-4">{system.icon}</div>
                <h3 className="text-xl font-bold mb-2">{system.name}</h3>
                <p className="text-foreground/60 text-sm">{system.tagline}</p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <Sparkles size={16} className="text-primary" />
                  <span className="text-xs font-semibold text-primary">
                    {t.comingSoon}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Universal Engine Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-black mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.universal.title}
          </motion.h2>
          <motion.p
            className="text-xl text-foreground/70 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t.universal.subtitle}
          </motion.p>
          <motion.p
            className="text-foreground/60 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.universal.desc}
          </motion.p>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {t.universal.features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                whileHover={{ y: -4 }}
              >
                <Zap size={24} className="text-primary mb-3" />
                <p className="font-semibold">{feature}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-black mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.cta}
          </motion.h2>
          <motion.p
            className="text-lg text-foreground/70 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t.ctaDesc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/setup"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              {language === "en" ? "Choose Your System" : "Pilih System Kamu"}
              <ArrowRight size={24} />
            </Link>
          </motion.div>
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

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ArrowRight, Copy, RotateCcw, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Language = "en" | "my";

const translations = {
  en: {
    title: "Live Automation Demos",
    subtitle: "Try real-world automation systems powered by Bratstvo Digital",
    badge: "⚡ Powered by Bratstvo Digital System",
    disclaimer:
      "These are BASIC DEMO versions showing system logic. Real systems have more features based on your selected package. Scale with your business.",
    demoIntro:
      "Each demo shows exactly how your customers interact and what you receive. Try them yourself!",
    systems: {
      food: {
        name: "🍕 Food Preorder System",
        desc: "Perfect for: Bakers, food sellers, catering businesses",
      },
      service: {
        name: "🔧 Service Booking System",
        desc: "Perfect for: HVAC, maintenance, beauty, consultants",
      },
      product: {
        name: "🛒 Product Order System",
        desc: "Perfect for: Dropshippers, retailers, e-commerce sellers",
      },
      event: {
        name: "🎫 Event Registration System",
        desc: "Perfect for: Workshops, webinars, training, tickets",
      },
      qr: {
        name: "📱 QR Food Ordering System",
        desc: "Perfect for: Restaurants, food courts, cafes",
      },
    },
    labels: {
      tryNow: "Try This Demo",
      yourOrder: "Your Order Details",
      selectItems: "Select Items",
      selectService: "Select Service",
      selectDate: "Select Date",
      selectTime: "Select Time",
      selectTicket: "Select Ticket Type",
      selectQRItem: "Select from Menu",
      quantity: "Quantity",
      customerName: "Your Name",
      phone: "Phone (WhatsApp)",
      email: "Email",
      address: "Delivery Address",
      notes: "Special Requests",
      serviceDate: "Service Date",
      serviceTime: "Service Time",
      ticketType: "Ticket Type",
      ticketQuantity: "Number of Tickets",
      submit: "Generate Order",
      copy: "Copy Message",
      copied: "Copied!",
      reset: "Reset Demo",
      total: "Total",
      message: "Your WhatsApp Message",
    },
  },
  my: {
    title: "Live Demo Otomasi",
    subtitle: "Cuba sistem automation real yang powered by Bratstvo Digital",
    badge: "⚡ Powered by Bratstvo Digital System",
    disclaimer:
      "Ini BASIC DEMO version yang show system logic. Real system ada lebih features base on package kamu. Scale dengan bisnes.",
    demoIntro:
      "Setiap demo tunjuk exactly macam mana customer interact dan apa kamu dapat. Cuba sendiri!",
    systems: {
      food: {
        name: "🍕 Sistem Prapesanan Makanan",
        desc: "Perfect untuk: Pembuat kue, penjual makanan, bisnes katering",
      },
      service: {
        name: "🔧 Sistem Service Booking",
        desc: "Perfect untuk: HVAC, maintenance, beauty, consultant",
      },
      product: {
        name: "🛒 Sistem Order Produk",
        desc: "Perfect untuk: Dropshipper, retailer, e-commerce seller",
      },
      event: {
        name: "🎫 Sistem Event Registration",
        desc: "Perfect untuk: Workshop, webinar, training, ticket",
      },
      qr: {
        name: "📱 Sistem QR Food Ordering",
        desc: "Perfect untuk: Restaurant, food court, cafe",
      },
    },
    labels: {
      tryNow: "Cuba Demo Ini",
      yourOrder: "Detail Order Kamu",
      selectItems: "Pilih Item",
      selectService: "Pilih Service",
      selectDate: "Pilih Date",
      selectTime: "Pilih Time",
      selectTicket: "Pilih Type Ticket",
      selectQRItem: "Pilih dari Menu",
      quantity: "Quantity",
      customerName: "Nama Kamu",
      phone: "Phone (WhatsApp)",
      email: "Email",
      address: "Address Delivery",
      notes: "Special Request",
      serviceDate: "Date Service",
      serviceTime: "Time Service",
      ticketType: "Type Ticket",
      ticketQuantity: "Berapa Ticket",
      submit: "Generate Order",
      copy: "Copy Mesej",
      copied: "Copied!",
      reset: "Reset Demo",
      total: "Total",
      message: "Mesej WhatsApp Kamu",
    },
  },
};

const DEMO_DATA = {
  food: {
    items: [
      { id: "cake", name: "Chocolate Cake", price: 45, image: "🍰" },
      { id: "croissant", name: "Butter Croissant", price: 8, image: "🥐" },
      { id: "muffin", name: "Blueberry Muffin", price: 6, image: "🧁" },
      { id: "roti", name: "Roti Canai Set", price: 15, image: "🥞" },
    ],
  },
  service: {
    services: [
      { id: "maint", name: "Home Maintenance", price: 150, duration: "2-3 hours" },
      { id: "consult", name: "Consultation", price: 50, duration: "30 mins" },
      { id: "full", name: "Full Setup", price: 300, duration: "4 hours" },
    ],
    times: ["09:00 AM", "10:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"],
  },
  product: {
    items: [
      { id: "jersey1", name: "Jersey Black", price: 89, variants: ["S", "M", "L", "XL"], image: "👕" },
      { id: "cap", name: "Premium Cap", price: 55, variants: ["One Size"], image: "🧢" },
      { id: "bottle", name: "Water Bottle", price: 79, variants: ["500ml"], image: "🧴" },
      { id: "sticker", name: "Sticker Pack", price: 25, variants: ["Assorted"], image: "🎨" },
    ],
  },
  event: {
    events: [
      { id: "basic", name: "Basic Ticket", price: 50, capacity: 100 },
      { id: "vip", name: "VIP Ticket", price: 150, capacity: 30 },
      { id: "group", name: "Group (5+)", price: 40, capacity: 50 },
    ],
  },
  qr: {
    items: [
      { id: "nasi", name: "Nasi Lemak", price: 8, image: "🍚" },
      { id: "mee", name: "Mee Goreng", price: 7, image: "🍜" },
      { id: "ayam", name: "Ayam Penyet", price: 12, image: "🍗" },
      { id: "teh", name: "Iced Tea", price: 3, image: "🧋" },
    ],
  },
};

export default function Demo() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeDemo, setActiveDemo] = useState("food");
  const [showResult, setShowResult] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    selectedService: "",
    selectedDate: "",
    selectedTime: "",
    selectedTicket: "",
    ticketQty: "1",
    selectedQRItem: "",
  });

  const t = translations[language];

  const addToCart = (item: any) => {
    const existing = cart.find((x) => x.id === item.id);
    if (existing) {
      setCart(cart.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x)));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeItem = (id: string) => {
    setCart(cart.filter((x) => x.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = ["name", "phone", "email"];
    if (activeDemo === "service") requiredFields.push("selectedService", "selectedDate", "selectedTime");
    if (activeDemo === "event") requiredFields.push("selectedTicket", "ticketQty");
    if (activeDemo !== "service" && activeDemo !== "event") requiredFields.push("address");

    const hasAllRequired = requiredFields.every((field) => {
      const value = formData[field as keyof typeof formData];
      return value && value !== "";
    });

    if ((activeDemo === "qr" || activeDemo === "food" || activeDemo === "product") && cart.length === 0) {
      alert(language === "en" ? "Please select items" : "Pilih item dulu");
      return;
    }

    if (!hasAllRequired) {
      alert(language === "en" ? "Please fill all required fields" : "Isi semua field wajib");
      return;
    }

    setShowResult(true);
  };

  const generateMessage = () => {
    const getSystemName = () => {
      const names: Record<string, string> = {
        food: language === "en" ? "Food Preorder" : "Preorder Makanan",
        service: language === "en" ? "Service Booking" : "Service Booking",
        product: language === "en" ? "Product Order" : "Order Produk",
        event: language === "en" ? "Event Registration" : "Event Registration",
        qr: language === "en" ? "QR Food Order" : "QR Order Makanan",
      };
      return names[activeDemo] || "";
    };

    let message = `
${getSystemName()} REQUEST
━━━━━━━━━━━━━━━━━`;

    if (activeDemo === "service") {
      const service = DEMO_DATA.service.services.find((s) => s.id === formData.selectedService);
      message += `
📋 Service: ${service?.name}
💰 Price: RM${service?.price}
📅 Date: ${formData.selectedDate}
⏰ Time: ${formData.selectedTime}`;
    } else if (activeDemo === "event") {
      const ticket = DEMO_DATA.event.events.find((e) => e.id === formData.selectedTicket);
      message += `
🎫 Ticket: ${ticket?.name}
💰 Price/Ticket: RM${ticket?.price}
📊 Quantity: ${formData.ticketQty}
💰 Total: RM${(ticket?.price || 0) * parseInt(formData.ticketQty)}`;
    } else {
      message += cart
        .map((item) => `\n📦 ${item.name} x${item.qty} = RM${item.price * item.qty}`)
        .join("");
      message += `\n\n💰 TOTAL: RM${totalPrice.toFixed(2)}`;
    }

    message += `

────────────────────
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email}`;

    if (activeDemo !== "service" && activeDemo !== "event") {
      message += `\n📍 Address: ${formData.address}`;
    }

    if (formData.notes) {
      message += `\n📝 Notes: ${formData.notes}`;
    }

    message += `

✅ Ready to process`;

    return message.trim();
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation language={language} onLanguageChange={setLanguage} />

        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-black mb-4">{t.labels.message}</h1>
              <p className="text-foreground/60">
                {language === "en"
                  ? "This is what you receive - organized and ready to work with"
                  : "Ini apa kamu terima - organize dan ready nak kerja"}
              </p>
            </motion.div>

            <motion.div
              className="bg-card border-2 border-primary rounded-lg p-8 mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <pre className="whitespace-pre-wrap font-mono text-sm text-foreground/80 overflow-auto max-h-96">
                {generateMessage()}
              </pre>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => navigator.clipboard.writeText(generateMessage())}
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Copy size={20} />
                {t.labels.copy}
              </button>
              <button
                onClick={() => {
                  setShowResult(false);
                  setCart([]);
                  setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                    notes: "",
                    selectedService: "",
                    selectedDate: "",
                    selectedTime: "",
                    selectedTicket: "",
                    ticketQty: "1",
                    selectedQRItem: "",
                  });
                }}
                className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                <RotateCcw size={20} />
                {t.labels.reset}
              </button>
            </div>

            <Link
              to="/setup"
              className="block text-center bg-primary/10 border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/20 transition-colors"
            >
              {language === "en"
                ? "Ready? Start Your Setup Now"
                : "Ready? Mulai Setup Sekarang"}
            </Link>
          </div>
        </section>

        <footer className="border-t border-border bg-card/50 py-8 px-4 sm:px-6 lg:px-8 mt-20">
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation language={language} onLanguageChange={setLanguage} />

      {/* Hero */}
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
            className="text-xl text-foreground/70 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            className="max-w-3xl mx-auto bg-primary/10 border border-primary rounded-lg p-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-sm text-foreground/70 mb-3">{t.disclaimer}</p>
            <p className="text-sm font-semibold text-primary">{t.demoIntro}</p>
          </motion.div>
        </div>
      </section>

      {/* Demo Selector */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {Object.entries(t.systems).map(([key, system], index) => (
              <motion.button
                key={key}
                onClick={() => {
                  setActiveDemo(key);
                  setShowResult(false);
                  setCart([]);
                }}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  activeDemo === key
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/50"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="font-bold text-sm mb-1">{system.name}</h3>
                <p className="text-xs text-foreground/60">{system.desc}</p>
              </motion.button>
            ))}
          </motion.div>

          {/* Demo Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{t.labels.tryNow}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Items Selection */}
                {(activeDemo === "food" || activeDemo === "product" || activeDemo === "qr") && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t.labels.selectItems}
                    </label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {(DEMO_DATA[activeDemo as keyof typeof DEMO_DATA] as any).items?.map((item: any) => (
                        <motion.button
                          key={item.id}
                          type="button"
                          onClick={() => addToCart(item)}
                          className="w-full text-left p-3 bg-background border border-border rounded hover:border-primary transition-colors text-sm"
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{item.image}</span>
                              <span className="font-semibold">{item.name}</span>
                            </div>
                            <span className="text-primary font-bold">RM{item.price}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service Selection */}
                {activeDemo === "service" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t.labels.selectService}
                      </label>
                      <select
                        name="selectedService"
                        value={formData.selectedService}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors text-sm"
                      >
                        <option value="">Select service...</option>
                        {DEMO_DATA.service.services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} - RM{s.price}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t.labels.serviceDate}
                      </label>
                      <input
                        type="date"
                        name="selectedDate"
                        value={formData.selectedDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t.labels.serviceTime}
                      </label>
                      <select
                        name="selectedTime"
                        value={formData.selectedTime}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors text-sm"
                      >
                        <option value="">Select time...</option>
                        {DEMO_DATA.service.times.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {/* Event Tickets */}
                {activeDemo === "event" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t.labels.ticketType}
                      </label>
                      <select
                        name="selectedTicket"
                        value={formData.selectedTicket}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors text-sm"
                      >
                        <option value="">Select ticket...</option>
                        {DEMO_DATA.event.events.map((e) => (
                          <option key={e.id} value={e.id}>
                            {e.name} - RM{e.price}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t.labels.ticketQuantity}
                      </label>
                      <input
                        type="number"
                        name="ticketQty"
                        min="1"
                        max="10"
                        value={formData.ticketQty}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors text-sm"
                      />
                    </div>
                  </>
                )}

                {/* Cart */}
                {cart.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t.labels.yourOrder}
                    </label>
                    <div className="space-y-2 bg-background p-3 rounded border border-border max-h-24 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <span>{item.name} x{item.qty}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-primary">
                              RM{(item.price * item.qty).toFixed(2)}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Customer Info */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.labels.customerName}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.labels.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.labels.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors text-sm"
                  />
                </div>

                {(activeDemo === "food" || activeDemo === "product" || activeDemo === "qr") && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t.labels.address}
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-3 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors text-sm"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.labels.notes}
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 bg-background border border-border rounded focus:border-primary outline-none transition-colors text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <ArrowRight size={20} />
                  {t.labels.submit}
                </button>
              </form>
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <div className="bg-primary/10 border border-primary rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">
                  {language === "en" ? "How This Demo Works" : "Cara Demo Ini Jalan"}
                </h3>
                <ol className="space-y-3 text-sm text-foreground/70">
                  <li className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0">1</span>
                    <span>
                      {language === "en"
                        ? "Fill in your details and selections"
                        : "Fill detail dan selection kamu"}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0">2</span>
                    <span>
                      {language === "en"
                        ? "System automatically formats everything"
                        : "System auto format semuanya"}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0">3</span>
                    <span>
                      {language === "en"
                        ? "You see exactly what you receive via WhatsApp"
                        : "Kamu nampak exactly apa kamu dapat via WhatsApp"}
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="font-bold mb-4">
                  {language === "en" ? "Real System Features" : "Feature Real System"}
                </h4>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>✅ {language === "en" ? "Unlimited items/services" : "Unlimited item/service"}</li>
                  <li>✅ {language === "en" ? "Custom fields" : "Field custom"}</li>
                  <li>✅ {language === "en" ? "Payment integration" : "Integration bayar"}</li>
                  <li>✅ {language === "en" ? "Customer database" : "Database customer"}</li>
                  <li>✅ {language === "en" ? "Analytics & reports" : "Analytics & report"}</li>
                  <li>✅ {language === "en" ? "Team management" : "Urus team"}</li>
                </ul>
              </div>

              <Link
                to="/pricing"
                className="block w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center"
              >
                {language === "en" ? "See Pricing" : "Lihat Harga"}
              </Link>
            </div>
          </div>
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

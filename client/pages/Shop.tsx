import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ShoppingCart, Heart, Star } from "lucide-react";

type Language = "en" | "my";

const translations = {
  en: {
    title: "Bratstvo Merchandise",
    subtitle: "Show your support with official Bratstvo Digital gear",
    products: {
      jersey: {
        name: "Bratstvo Jersey",
        desc: "Premium cotton jersey with embroidered BD logo",
        price: "RM89",
        rating: 4.8,
      },
      simcard: {
        name: "Limited Edition Sim Card",
        desc: "Collectible Bratstvo branded sim card holder",
        price: "RM45",
        rating: 4.9,
      },
      hoodie: {
        name: "Bratstvo Hoodie",
        desc: "Warm and comfortable with premium embroidery",
        price: "RM129",
        rating: 4.7,
      },
      cap: {
        name: "Bratstvo Cap",
        desc: "Adjustable cap with embroidered logo",
        price: "RM55",
        rating: 4.6,
      },
      bottle: {
        name: "Stainless Steel Bottle",
        desc: "Insulated bottle with Bratstvo branding",
        price: "RM79",
        rating: 4.8,
      },
      sticker: {
        name: "Bratstvo Sticker Pack",
        desc: "Set of 5 premium vinyl stickers",
        price: "RM25",
        rating: 5.0,
      },
    },
    viewDetails: "View Details",
    addCart: "Add to Cart",
    comingSoon: "Coming Soon",
  },
  my: {
    title: "Merchandise Bratstvo",
    subtitle: "Tunjuk sokongan dengan gear official Bratstvo Digital",
    products: {
      jersey: {
        name: "Jersey Bratstvo",
        desc: "Premium cotton jersey dengan embroidery logo BD",
        price: "RM89",
        rating: 4.8,
      },
      simcard: {
        name: "Limited Edition Sim Card",
        desc: "Collectible holder sim card berbranding Bratstvo",
        price: "RM45",
        rating: 4.9,
      },
      hoodie: {
        name: "Hoodie Bratstvo",
        desc: "Warm dan comfortable dengan embroidery premium",
        price: "RM129",
        rating: 4.7,
      },
      cap: {
        name: "Cap Bratstvo",
        desc: "Adjustable cap dengan embroidery logo",
        price: "RM55",
        rating: 4.6,
      },
      bottle: {
        name: "Stainless Steel Bottle",
        desc: "Insulated bottle dengan branding Bratstvo",
        price: "RM79",
        rating: 4.8,
      },
      sticker: {
        name: "Sticker Pack Bratstvo",
        desc: "Set 5 premium vinyl stickers",
        price: "RM25",
        rating: 5.0,
      },
    },
    viewDetails: "Lihat Details",
    addCart: "Add Cart",
    comingSoon: "Datang Nanti",
  },
};

const PRODUCTS = [
  {
    id: "jersey",
    image: "👕",
    colors: ["Black", "White", "Green"],
  },
  {
    id: "simcard",
    image: "📱",
    colors: ["Standard"],
  },
  {
    id: "hoodie",
    image: "🧥",
    colors: ["Black", "Dark Blue"],
  },
  {
    id: "cap",
    image: "🧢",
    colors: ["Black", "White"],
  },
  {
    id: "bottle",
    image: "🧴",
    colors: ["Stainless"],
  },
  {
    id: "sticker",
    image: "🎨",
    colors: ["Assorted"],
  },
];

export default function Shop() {
  const [language, setLanguage] = useState<Language>("en");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const t = translations[language];
  const products = t.products as Record<string, any>;

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation language={language} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 border border-primary rounded-full">
            <span className="text-primary font-semibold text-sm">
              ⚡ Powered by Bratstvo Digital System
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-foreground mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-foreground/70">{t.subtitle}</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => {
              const productData = products[product.id];
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
                >
                  {/* Product Image */}
                  <div className="relative h-64 bg-background/50 flex items-center justify-center overflow-hidden">
                    <div className="text-9xl group-hover:scale-110 transition-transform duration-300">
                      {product.image}
                    </div>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
                        isWishlisted
                          ? "bg-primary/20 text-primary"
                          : "bg-card/50 text-foreground/60 hover:bg-card"
                      }`}
                    >
                      <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{productData.name}</h3>
                    <p className="text-foreground/60 text-sm mb-4">
                      {productData.desc}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(productData.rating)
                              ? "fill-primary text-primary"
                              : "text-foreground/20"
                          }
                        />
                      ))}
                      <span className="text-sm text-foreground/60 ml-2">
                        {productData.rating}
                      </span>
                    </div>

                    {/* Colors */}
                    <div className="mb-4">
                      <p className="text-xs text-foreground/60 mb-2">
                        {language === "en" ? "Colors" : "Warna"}:
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {product.colors.map((color) => (
                          <span
                            key={color}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-primary">
                        {productData.price}
                      </span>
                      <button className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary/20 transition-colors text-sm">
                        <ShoppingCart size={18} />
                        {t.comingSoon}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            {language === "en" ? "Shop Opening Soon" : "Kedai Bukak Nanti"}
          </h2>
          <p className="text-foreground/70 mb-8">
            {language === "en"
              ? "Our merchandise shop is coming soon. Follow us for updates!"
              : "Kedai merchandise kami datang nanti. Follow untuk update!"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
              {language === "en" ? "Notify Me" : "Notify Aku"}
            </button>
            <button className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
              {language === "en" ? "Continue Shopping" : "Continue Shopping"}
            </button>
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

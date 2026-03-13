import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { useCart } from "@/context/CartContext";
import { Product } from "@shared/api";
import { ShoppingCart, Heart, Star, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

type Language = "en" | "my";

const translations = {
  en: {
    title: "Bratstvo Merchandise",
    subtitle: "Show your support with official Bratstvo Digital gear",
    loading: "Loading products...",
    error: "Failed to load products",
    addCart: "Add to Cart",
    viewCart: "View Cart",
    colors: "Colors",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
  },
  my: {
    title: "Merchandise Bratstvo",
    subtitle: "Tunjuk sokongan dengan gear official Bratstvo Digital",
    loading: "Memuat produk...",
    error: "Gagal memuat produk",
    addCart: "Tambah ke Keranjang",
    viewCart: "Lihat Keranjang",
    colors: "Warna",
    inStock: "Dalam Stok",
    outOfStock: "Habis Stok",
  },
};

export default function Shop() {
  const [language, setLanguage] = useState<Language>("en");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const { addToCart, getCartCount } = useCart();
  const navigate = useNavigate();
  const t = translations[language];
  const cartCount = getCartCount();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
        // Initialize quantities
        const initialQty: Record<number, number> = {};
        data.forEach((p: Product) => {
          initialQty[p.id] = 1;
        });
        setQuantities(initialQty);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error(t.error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [t.error]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    addToCart(product.id, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const updateQuantity = (id: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation language={language} onLanguageChange={setLanguage} />
        <div className="flex items-center justify-center h-96">
          <div className="text-foreground/60">{t.loading}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation language={language} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-12">
            <div>
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
            {cartCount > 0 && (
              <motion.button
                onClick={() => navigate("/cart")}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart size={20} />
                {t.viewCart}
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </motion.button>
            )}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60 text-lg">{t.error}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => {
                const isWishlisted = wishlist.includes(product.id);
                const quantity = quantities[product.id] || 1;

                return (
                  <motion.div
                    key={product.id}
                    className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {/* Product Image */}
                    <div className="relative h-64 bg-background/50 flex items-center justify-center overflow-hidden">
                      <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                        {product.image_url || "📦"}
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
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-foreground/60 text-sm mb-4">
                        {product.description}
                      </p>

                      {/* Stock Status */}
                      <div className="mb-4">
                        <p className={`text-sm font-semibold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                          {product.stock > 0
                            ? `${t.inStock} (${product.stock})`
                            : t.outOfStock}
                        </p>
                      </div>

                      {/* Colors */}
                      {product.colors && product.colors.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-foreground/60 mb-2">{t.colors}:</p>
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
                      )}

                      {/* Price and Action */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black text-primary">
                          RM{product.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity Control */}
                      {product.stock > 0 && (
                        <div className="flex items-center gap-2 mb-4 bg-background rounded-lg p-2">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 1;
                              setQuantities((prev) => ({ ...prev, [product.id]: val }));
                            }}
                            className="flex-1 text-center bg-transparent border-0 focus:outline-none focus:ring-0 text-foreground font-bold"
                          />
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      )}

                      {/* Add to Cart Button */}
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                          product.stock > 0
                            ? "bg-primary/10 text-primary hover:bg-primary/20"
                            : "bg-foreground/10 text-foreground/40 cursor-not-allowed"
                        }`}
                        whileHover={product.stock > 0 ? { scale: 1.02 } : {}}
                        whileTap={product.stock > 0 ? { scale: 0.98 } : {}}
                      >
                        <ShoppingCart size={18} />
                        {t.addCart}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
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

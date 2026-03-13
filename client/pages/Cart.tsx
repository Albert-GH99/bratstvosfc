import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Navigation } from '@/components/Navigation';
import { Product } from '@shared/api';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

type Language = 'en' | 'my';

const translations = {
  en: {
    title: 'Your Cart',
    subtitle: 'Review your items before checkout',
    empty: 'Your cart is empty',
    emptyDesc: 'Add some products to get started',
    product: 'Product',
    price: 'Price',
    quantity: 'Quantity',
    total: 'Total',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    tax: 'Tax',
    grandTotal: 'Grand Total',
    continueShopping: 'Continue Shopping',
    checkout: 'Proceed to Checkout',
    remove: 'Remove',
    estimate: 'Estimated',
  },
  my: {
    title: 'Keranjang Anda',
    subtitle: 'Semak item anda sebelum checkout',
    empty: 'Keranjang anda kosong',
    emptyDesc: 'Tambah beberapa produk untuk bermula',
    product: 'Produk',
    price: 'Harga',
    quantity: 'Kuantiti',
    total: 'Jumlah',
    subtotal: 'Subtotal',
    shipping: 'Penghantaran',
    tax: 'Cukai',
    grandTotal: 'Jumlah Besar',
    continueShopping: 'Terus Membeli',
    checkout: 'Teruskan ke Checkout',
    remove: 'Buang',
    estimate: 'Anggaran',
  },
};

export default function Cart() {
  const [language, setLanguage] = useState<Language>('en');
  const [products, setProducts] = useState<Map<number, Product>>(new Map());
  const [loading, setLoading] = useState(true);
  const { items, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const t = translations[language];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        const productMap = new Map(data.map((p: Product) => [p.id, p]));
        setProducts(productMap);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      const product = products.get(item.product_id);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 100 ? 0 : 15; // Free shipping above RM100
  const tax = subtotal * 0.06; // 6% tax
  const grandTotal = subtotal + shipping + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation language={language} onLanguageChange={setLanguage} />
        <div className="flex items-center justify-center h-96">
          <div className="text-foreground/60">Loading...</div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation language={language} onLanguageChange={setLanguage} />
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingCart size={64} className="mx-auto mb-6 text-foreground/40" />
            <h1 className="text-3xl font-bold mb-2">{t.empty}</h1>
            <p className="text-foreground/60 mb-8">{t.emptyDesc}</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <ArrowLeft size={20} />
              {t.continueShopping}
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation language={language} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-black text-foreground mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-foreground/70">{t.subtitle}</p>
        </div>
      </section>

      {/* Cart Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => {
                  const product = products.get(item.product_id);
                  if (!product) return null;

                  return (
                    <motion.div
                      key={item.product_id}
                      className="bg-card border border-border rounded-lg p-6 flex gap-6 items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                        <p className="text-foreground/60 text-sm mb-4">{product.description}</p>
                        <div className="text-2xl font-black text-primary">
                          RM{product.price.toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 bg-background border border-border rounded-lg p-2">
                          <button
                            onClick={() => updateQuantity(product.id, item.quantity - 1)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Minus size={18} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const newQty = parseInt(e.target.value) || 1;
                              updateQuantity(product.id, newQty);
                            }}
                            className="w-12 text-center bg-transparent border-0 focus:outline-none focus:ring-0 text-foreground font-bold"
                          />
                          <button
                            onClick={() => updateQuantity(product.id, item.quantity + 1)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                        <div className="text-lg font-bold">
                          RM{(product.price * item.quantity).toFixed(2)}
                        </div>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-2 text-sm"
                        >
                          <Trash2 size={16} />
                          {t.remove}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-card border border-border rounded-lg p-8 sticky top-32"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-6">{t.total}</h3>

                <div className="space-y-4 mb-8 pb-8 border-b border-border">
                  <div className="flex justify-between text-foreground/70">
                    <span>{t.subtotal}</span>
                    <span>RM{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>{t.shipping}</span>
                    <span className={shipping === 0 ? 'text-green-500 font-bold' : ''}>
                      {shipping === 0 ? t.estimate : ''} RM{shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>{t.tax}</span>
                    <span>RM{tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-8">
                  <span className="text-xl font-bold">{t.grandTotal}</span>
                  <span className="text-2xl font-black text-primary">
                    RM{grandTotal.toFixed(2)}
                  </span>
                </div>

                <motion.button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.checkout}
                </motion.button>

                <motion.button
                  onClick={() => navigate('/shop')}
                  className="w-full mt-4 border border-border text-foreground py-3 rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.continueShopping}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-foreground/60 text-sm">
          <p>
            ⚡ Bratstvo Digital © 2026 •{' '}
            {language === 'en'
              ? 'Professional SME Automation for Malaysia'
              : 'Otomasi UKM Profesional untuk Malaysia'}
          </p>
        </div>
      </footer>
    </div>
  );
}

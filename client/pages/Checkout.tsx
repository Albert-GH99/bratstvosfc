import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Navigation } from '@/components/Navigation';
import { Product, CreateOrderRequest } from '@shared/api';
import { AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

type Language = 'en' | 'my';

const translations = {
  en: {
    title: 'Checkout',
    subtitle: 'Complete your order',
    customerInfo: 'Customer Information',
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    orderSummary: 'Order Summary',
    product: 'Product',
    quantity: 'Quantity',
    price: 'Price',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    tax: 'Tax',
    total: 'Total',
    paymentMethod: 'Payment Method',
    placeholderName: 'Enter your full name',
    placeholderEmail: 'Enter your email',
    placeholderPhone: 'Enter your phone number',
    placeOrder: 'Place Order',
    processing: 'Processing...',
    back: 'Back to Cart',
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email',
    orderSuccess: 'Order placed successfully!',
    orderError: 'Failed to place order',
  },
  my: {
    title: 'Checkout',
    subtitle: 'Selesaikan pesanan anda',
    customerInfo: 'Maklumat Pelanggan',
    name: 'Nama Penuh',
    email: 'Alamat Email',
    phone: 'Nombor Telefon',
    orderSummary: 'Ringkasan Pesanan',
    product: 'Produk',
    quantity: 'Kuantiti',
    price: 'Harga',
    subtotal: 'Subtotal',
    shipping: 'Penghantaran',
    tax: 'Cukai',
    total: 'Jumlah',
    paymentMethod: 'Kaedah Pembayaran',
    placeholderName: 'Masuk nama penuh anda',
    placeholderEmail: 'Masuk email anda',
    placeholderPhone: 'Masuk nombor telefon anda',
    placeOrder: 'Letak Pesanan',
    processing: 'Memproses...',
    back: 'Balik ke Keranjang',
    required: 'Medan ini diperlukan',
    invalidEmail: 'Sila masuk email yang sah',
    orderSuccess: 'Pesanan berjaya diletakkan!',
    orderError: 'Gagal meletakkan pesanan',
  },
};

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export default function Checkout() {
  const [language, setLanguage] = useState<Language>('en');
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [products, setProducts] = useState<Map<number, Product>>(new Map());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const t = translations[language];

  useEffect(() => {
    if (items.length === 0) {
      navigate('/shop');
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        const productMap = new Map(data.map((p: Product) => [p.id, p]));
        setProducts(productMap);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [items, navigate]);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.required;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => {
      const product = products.get(item.product_id);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const tax = subtotal * 0.06;
    return { subtotal, shipping, tax, total: subtotal + shipping + tax };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const orderRequest: CreateOrderRequest = {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        items: items.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
        payment_method: 'online', // For now, default payment method
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderRequest),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();
      clearCart();
      toast.success(t.orderSuccess);
      navigate(`/payment/${order.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(t.orderError);
    } finally {
      setSubmitting(false);
    }
  };

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

  const { subtotal, shipping, tax, total } = calculateTotals();

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

      {/* Checkout Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Customer Info Section */}
                <div className="bg-card border border-border rounded-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">{t.customerInfo}</h2>

                  <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t.name}
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder={t.placeholderName}
                        className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors ${
                          errors.name ? 'border-red-500' : 'border-border'
                        }`}
                      />
                      {errors.name && (
                        <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
                          <AlertCircle size={16} />
                          {errors.name}
                        </div>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t.email}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder={t.placeholderEmail}
                        className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors ${
                          errors.email ? 'border-red-500' : 'border-border'
                        }`}
                      />
                      {errors.email && (
                        <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
                          <AlertCircle size={16} />
                          {errors.email}
                        </div>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t.phone}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        placeholder={t.placeholderPhone}
                        className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-border'
                        }`}
                      />
                      {errors.phone && (
                        <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
                          <AlertCircle size={16} />
                          {errors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Summary in Form */}
                <div className="bg-card border border-border rounded-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">{t.orderSummary}</h2>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => {
                      const product = products.get(item.product_id);
                      if (!product) return null;

                      return (
                        <div
                          key={item.product_id}
                          className="flex justify-between items-center py-3 border-b border-border/50 last:border-b-0"
                        >
                          <div>
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-foreground/60">
                              {item.quantity}x RM{product.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="font-bold">
                            RM{(product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-t border-border">
                    <div className="flex justify-between pt-4">
                      <span className="text-foreground/70">{t.subtotal}</span>
                      <span>RM{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">{t.shipping}</span>
                      <span className={shipping === 0 ? 'text-green-500 font-bold' : ''}>
                        RM{shipping.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">{t.tax}</span>
                      <span>RM{tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-bold border-t border-border pt-4">
                    <span>{t.total}</span>
                    <span className="text-primary">RM{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    type="button"
                    onClick={() => navigate('/cart')}
                    className="flex-1 border border-border text-foreground py-3 rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={submitting}
                  >
                    <ArrowLeft size={20} />
                    {t.back}
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={submitting}
                  >
                    {submitting ? t.processing : t.placeOrder}
                  </motion.button>
                </div>
              </motion.form>
            </div>

            {/* Summary Sticky */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-card border border-border rounded-lg p-8 sticky top-32"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-6">{t.orderSummary}</h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  {items.slice(0, 3).map((item) => {
                    const product = products.get(item.product_id);
                    if (!product) return null;

                    return (
                      <div key={item.product_id} className="flex justify-between text-sm">
                        <span className="text-foreground/70">
                          {product.name.substring(0, 15)}... x{item.quantity}
                        </span>
                        <span className="font-semibold">
                          RM{(product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                  {items.length > 3 && (
                    <p className="text-foreground/60 text-sm">
                      +{items.length - 3} {language === 'en' ? 'more items' : 'item lagi'}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-foreground/70">
                    <span>{t.subtotal}</span>
                    <span>RM{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>{t.shipping}</span>
                    <span>RM{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>{t.tax}</span>
                    <span>RM{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-border pt-4">
                    <span>{t.total}</span>
                    <span className="text-primary">RM{total.toFixed(2)}</span>
                  </div>
                </div>
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

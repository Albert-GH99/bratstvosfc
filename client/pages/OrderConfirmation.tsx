import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Order } from '@shared/api';
import { CheckCircle, Home, FileText, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

type Language = 'en' | 'my';

const translations = {
  en: {
    title: 'Order Confirmed',
    subtitle: 'Thank you for your purchase!',
    orderNumber: 'Order Number',
    customerName: 'Customer Name',
    email: 'Email',
    phone: 'Phone',
    total: 'Total Amount',
    status: 'Order Status',
    paymentStatus: 'Payment Status',
    orderDate: 'Order Date',
    backHome: 'Back to Home',
    continueShopping: 'Continue Shopping',
    viewDetails: 'View Order Details',
    thankYou: 'We\'ll send a confirmation email to your registered email address.',
    shippingInfo: 'You will receive shipping details within 24 hours.',
  },
  my: {
    title: 'Pesanan Disahkan',
    subtitle: 'Terima kasih atas pembelian anda!',
    orderNumber: 'Nombor Pesanan',
    customerName: 'Nama Pelanggan',
    email: 'Email',
    phone: 'Telefon',
    total: 'Jumlah Keseluruhan',
    status: 'Status Pesanan',
    paymentStatus: 'Status Pembayaran',
    orderDate: 'Tarikh Pesanan',
    backHome: 'Balik ke Utama',
    continueShopping: 'Terus Membeli',
    viewDetails: 'Lihat Detail Pesanan',
    thankYou: 'Kami akan hantar email pengesahan ke alamat email anda.',
    shippingInfo: 'Anda akan menerima butiran penghantaran dalam 24 jam.',
  },
};

export default function OrderConfirmation() {
  const [language, setLanguage] = useState<Language>('en');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const t = translations[language];

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        navigate('/shop');
        return;
      }

      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Order not found');
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
        navigate('/shop');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

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

  if (!order) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation language={language} onLanguageChange={setLanguage} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-foreground/60 mb-4">Order not found</p>
            <Link
              to="/shop"
              className="text-primary font-semibold hover:underline"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation language={language} onLanguageChange={setLanguage} />

      {/* Confirmation Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-block mb-6 p-4 bg-green-500/20 border border-green-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CheckCircle size={64} className="text-green-500" />
            </motion.div>

            <h1 className="text-5xl sm:text-6xl font-black text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-foreground/70 mb-8">{t.subtitle}</p>
            <p className="text-foreground/60">{t.thankYou}</p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            className="bg-card border border-border rounded-lg p-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <p className="text-foreground/60 text-sm mb-2">{t.orderNumber}</p>
                  <p className="text-2xl font-bold text-primary">#{order.id}</p>
                </div>

                <div>
                  <p className="text-foreground/60 text-sm mb-2">{t.customerName}</p>
                  <p className="text-lg font-semibold">{order.customer_name}</p>
                </div>

                <div>
                  <p className="text-foreground/60 text-sm mb-2">{t.email}</p>
                  <p className="text-lg font-semibold">{order.customer_email}</p>
                </div>

                <div>
                  <p className="text-foreground/60 text-sm mb-2">{t.phone}</p>
                  <p className="text-lg font-semibold">
                    {order.customer_phone || '-'}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <p className="text-foreground/60 text-sm mb-2">{t.orderDate}</p>
                  <p className="text-lg font-semibold">
                    {new Date(order.created_at).toLocaleDateString(
                      language === 'en' ? 'en-US' : 'ms-MY',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-foreground/60 text-sm mb-2">{t.status}</p>
                  <p className="text-lg font-semibold capitalize">
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-sm">
                      {order.status}
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-foreground/60 text-sm mb-2">
                    {t.paymentStatus}
                  </p>
                  <p className="text-lg font-semibold capitalize">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        order.payment_status === 'paid'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-yellow-500/20 text-yellow-500'
                      }`}
                    >
                      {order.payment_status}
                    </span>
                  </p>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-foreground/60 text-sm mb-2">{t.total}</p>
                  <p className="text-3xl font-black text-primary">
                    RM{order.total_amount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background/50 border border-border rounded-lg p-6">
              <p className="text-foreground/70 text-center">
                {t.shippingInfo}
              </p>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <Home size={20} />
              {t.backHome}
            </Link>
            <Link
              to="/shop"
              className="flex items-center justify-center gap-2 px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
            >
              {t.continueShopping}
            </Link>
          </motion.div>
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

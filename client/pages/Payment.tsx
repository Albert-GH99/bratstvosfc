import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Order } from '@shared/api';
import { Copy, CheckCircle2, Clock, AlertCircle, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

type Language = 'en' | 'my';

const translations = {
  en: {
    title: 'Complete Payment',
    subtitle: 'Finish your order',
    orderNumber: 'Order Number',
    totalAmount: 'Total Amount to Pay',
    paymentMethods: 'Payment Methods',
    bankTransfer: 'Bank Transfer (FPX)',
    bankName: 'Bank Name',
    accountName: 'Account Name',
    accountNumber: 'Account Number',
    copy: 'Copy to Clipboard',
    copied: 'Copied!',
    qrCode: 'Scan QR Code',
    paymentInstructions: 'Payment Instructions',
    instruction1: 'Transfer the exact amount to the account above',
    instruction2: 'Use your order number as reference',
    instruction3: 'We will confirm payment within 1 hour',
    paymentPending: 'Payment Status: Pending',
    waitingConfirmation: 'Waiting for payment confirmation...',
    weAccept: 'We accept online transfers via',
    confirmPayment: 'I have made payment',
    backHome: 'Back to Home',
    orderDetails: 'Order Details',
  },
  my: {
    title: 'Lengkapkan Pembayaran',
    subtitle: 'Tamatkan pesanan anda',
    orderNumber: 'Nombor Pesanan',
    totalAmount: 'Jumlah Bayaran',
    paymentMethods: 'Kaedah Pembayaran',
    bankTransfer: 'Pindahan Bank (FPX)',
    bankName: 'Nama Bank',
    accountName: 'Nama Akaun',
    accountNumber: 'Nombor Akaun',
    copy: 'Salin ke Papan',
    copied: 'Disalin!',
    qrCode: 'Imbas Kod QR',
    paymentInstructions: 'Arahan Pembayaran',
    instruction1: 'Pindahkan jumlah tepat ke akaun di atas',
    instruction2: 'Gunakan nombor pesanan anda sebagai rujukan',
    instruction3: 'Kami akan sahkan pembayaran dalam 1 jam',
    paymentPending: 'Status Pembayaran: Menunggu',
    waitingConfirmation: 'Menunggu pengesahan pembayaran...',
    weAccept: 'Kami terima pindahan dalam talian melalui',
    confirmPayment: 'Saya sudah buat pembayaran',
    backHome: 'Balik ke Utama',
    orderDetails: 'Detail Pesanan',
  },
};

// Demo payment details - In production, these would come from environment variables
const PAYMENT_DETAILS = {
  bankName: 'Maybank',
  accountName: 'Bratstvo Digital Sdn Bhd',
  accountNumber: '501234567890',
  qrCode: 'https://via.placeholder.com/300?text=QR+Code',
};

export default function Payment() {
  const [language, setLanguage] = useState<Language>('en');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState<string | null>(null);
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

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopying(field);
      toast.success(t.copied);
      setTimeout(() => setCopying(null), 2000);
    } catch {
      toast.error('Failed to copy');
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

  if (!order) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation language={language} onLanguageChange={setLanguage} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-foreground/60 mb-4">Order not found</p>
            <Link to="/shop" className="text-primary font-semibold hover:underline">
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

      {/* Payment Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-6 p-4 bg-yellow-500/20 border border-yellow-500 rounded-full">
              <Clock size={48} className="text-yellow-500" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-foreground/70">{t.subtitle}</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Order Summary */}
              <motion.div
                className="bg-card border border-border rounded-lg p-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-6">{t.orderDetails}</h2>
                <div className="space-y-4">
                  <div className="flex justify-between pb-4 border-b border-border">
                    <span className="text-foreground/70">{t.orderNumber}</span>
                    <span className="font-bold">#{order.id}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-border">
                    <span className="text-foreground/70">{t.totalAmount}</span>
                    <span className="text-3xl font-black text-primary">
                      RM{order.total_amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">{t.paymentPending}</span>
                    <span className="flex items-center gap-2 text-yellow-500 font-semibold">
                      <Clock size={18} />
                      Pending
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Payment Instructions */}
              <motion.div
                className="bg-card border border-border rounded-lg p-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6">{t.paymentMethods}</h2>

                <div className="space-y-6">
                  {/* Bank Transfer */}
                  <div className="border border-border rounded-lg p-6 bg-background/50">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <CheckCircle2 size={20} className="text-primary" />
                      {t.bankTransfer}
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-sm text-foreground/60 mb-2">{t.bankName}</p>
                        <div className="flex items-center gap-3 bg-card border border-border rounded-lg p-3">
                          <span className="font-bold flex-1">{PAYMENT_DETAILS.bankName}</span>
                          <button
                            onClick={() => copyToClipboard(PAYMENT_DETAILS.bankName, 'bank')}
                            className={`p-2 rounded transition-colors ${
                              copying === 'bank'
                                ? 'bg-green-500/20 text-green-500'
                                : 'hover:bg-primary/20 text-primary'
                            }`}
                          >
                            <Copy size={18} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-foreground/60 mb-2">{t.accountName}</p>
                        <div className="flex items-center gap-3 bg-card border border-border rounded-lg p-3">
                          <span className="font-bold flex-1">
                            {PAYMENT_DETAILS.accountName}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(PAYMENT_DETAILS.accountName, 'name')
                            }
                            className={`p-2 rounded transition-colors ${
                              copying === 'name'
                                ? 'bg-green-500/20 text-green-500'
                                : 'hover:bg-primary/20 text-primary'
                            }`}
                          >
                            <Copy size={18} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-foreground/60 mb-2">
                          {t.accountNumber}
                        </p>
                        <div className="flex items-center gap-3 bg-card border border-border rounded-lg p-3">
                          <span className="font-bold flex-1 font-mono text-lg">
                            {PAYMENT_DETAILS.accountNumber}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(PAYMENT_DETAILS.accountNumber, 'number')
                            }
                            className={`p-2 rounded transition-colors ${
                              copying === 'number'
                                ? 'bg-green-500/20 text-green-500'
                                : 'hover:bg-primary/20 text-primary'
                            }`}
                          >
                            <Copy size={18} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <p className="text-sm font-semibold text-blue-400 mb-3">
                        {t.paymentInstructions}
                      </p>
                      <ul className="space-y-2 text-sm text-foreground/70">
                        <li className="flex gap-2">
                          <span className="text-primary font-bold">1.</span>
                          <span>{t.instruction1}</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary font-bold">2.</span>
                          <span>
                            {t.instruction2}: <span className="font-bold text-primary">#{order.id}</span>
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary font-bold">3.</span>
                          <span>{t.instruction3}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-card border border-border rounded-lg p-8 sticky top-32 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Amount Box */}
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-lg p-6 text-center">
                  <p className="text-sm text-foreground/60 mb-2">{t.totalAmount}</p>
                  <p className="text-4xl font-black text-primary">
                    RM{order.total_amount.toFixed(2)}
                  </p>
                </div>

                {/* Status */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock size={20} className="text-yellow-500" />
                    <span className="font-bold text-yellow-500">Pending</span>
                  </div>
                  <p className="text-sm text-foreground/70">{t.waitingConfirmation}</p>
                </div>

                {/* Action Buttons */}
                <Link
                  to="/"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors"
                >
                  <Home size={20} />
                  {t.backHome}
                </Link>

                <div className="pt-4 border-t border-border text-xs text-foreground/50 text-center">
                  <p>{language === 'en' ? 'Order ID' : 'ID Pesanan'}: #{order.id}</p>
                  <p>
                    {language === 'en' ? 'Created: ' : 'Dibuat: '}
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
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

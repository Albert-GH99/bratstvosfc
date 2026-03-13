import { useState, useEffect } from 'react';
import { Product, CreateProductRequest } from '@shared/api';
import { X, Plus, Trash2, Edit2, Save, X as XIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ShopManagementProps {
  onClose: () => void;
  language: 'en' | 'my';
}

const translations = {
  en: {
    title: 'Manage Shop Products',
    addNew: 'Add New Product',
    productName: 'Product Name',
    description: 'Description',
    price: 'Price (RM)',
    stock: 'Stock Quantity',
    imageUrl: 'Image URL',
    colors: 'Colors (comma-separated)',
    save: 'Save Product',
    delete: 'Delete',
    cancel: 'Cancel',
    edit: 'Edit',
    loading: 'Loading products...',
    addSuccess: 'Product added successfully',
    updateSuccess: 'Product updated successfully',
    deleteSuccess: 'Product deleted successfully',
    error: 'Error managing product',
  },
  my: {
    title: 'Urus Produk Shop',
    addNew: 'Tambah Produk Baru',
    productName: 'Nama Produk',
    description: 'Deskripsi',
    price: 'Harga (RM)',
    stock: 'Kuantiti Stok',
    imageUrl: 'URL Imej',
    colors: 'Warna (pisahkan dengan koma)',
    save: 'Simpan Produk',
    delete: 'Padam',
    cancel: 'Batal',
    edit: 'Edit',
    loading: 'Memuat produk...',
    addSuccess: 'Produk ditambah berjaya',
    updateSuccess: 'Produk dikemas kini berjaya',
    deleteSuccess: 'Produk dipadamkan berjaya',
    error: 'Ralat mengurus produk',
  },
};

interface FormData {
  name: string;
  description: string;
  price: number | string;
  stock: number | string;
  image_url: string;
  colors: string;
}

export default function ShopManagement({ onClose, language }: ShopManagementProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    stock: '',
    image_url: '',
    colors: '',
  });
  const t = translations[language];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error(t.error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      image_url: '',
      colors: '',
    });
    setShowForm(true);
  };

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image_url: product.image_url || '',
      colors: product.colors?.join(', ') || '',
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.price || !formData.stock) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price.toString()),
        stock: parseInt(formData.stock.toString()),
        image_url: formData.image_url || null,
        colors: formData.colors
          ? formData.colors.split(',').map((c) => c.trim())
          : [],
      };

      if (editingId) {
        // Update
        const response = await fetch(`/api/products/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Failed to update');
        toast.success(t.updateSuccess);
      } else {
        // Create
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Failed to create');
        toast.success(t.addSuccess);
      }

      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(t.error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete');
      toast.success(t.deleteSuccess);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(t.error);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[85vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{t.title}</h2>
          <button onClick={onClose} className="text-foreground/60 hover:text-foreground">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Add Button */}
          <motion.button
            onClick={handleAddClick}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={18} /> {t.addNew}
          </motion.button>

          {/* Form */}
          {showForm && (
            <motion.div
              className="bg-background/50 border border-border rounded-lg p-6 mb-6 space-y-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t.productName}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="col-span-2 px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary"
                />
                <textarea
                  placeholder={t.description}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="col-span-2 px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary h-20 resize-none"
                />
                <input
                  type="number"
                  placeholder={t.price}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary"
                />
                <input
                  type="number"
                  placeholder={t.stock}
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary"
                />
                <input
                  type="text"
                  placeholder={t.imageUrl}
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="col-span-2 px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary"
                />
                <input
                  type="text"
                  placeholder={t.colors}
                  value={formData.colors}
                  onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                  className="col-span-2 px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex gap-3">
                <motion.button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save size={18} /> {t.save}
                </motion.button>
                <motion.button
                  onClick={() => setShowForm(false)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg font-semibold hover:border-primary hover:text-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <XIcon size={18} /> {t.cancel}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Products List */}
          {loading ? (
            <div className="text-center py-8 text-foreground/60">{t.loading}</div>
          ) : (
            <div className="space-y-4">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  className="border border-border rounded-lg p-4 bg-background/50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                      <p className="text-sm text-foreground/60 mb-3">{product.description}</p>
                      <div className="flex gap-6 text-sm">
                        <span>
                          <span className="text-foreground/60">Price: </span>
                          <span className="font-bold">RM{product.price.toFixed(2)}</span>
                        </span>
                        <span>
                          <span className="text-foreground/60">Stock: </span>
                          <span className="font-bold">{product.stock}</span>
                        </span>
                        {product.colors && product.colors.length > 0 && (
                          <span>
                            <span className="text-foreground/60">Colors: </span>
                            <span className="font-bold">{product.colors.join(', ')}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleEditClick(product)}
                        className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Edit2 size={18} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

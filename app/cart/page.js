'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatPrice } from '../../lib/utils';
import CartItem from '../../components/CartItem';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';

/**
 * Cart Page Component
 * Displays shopping cart with items, quantities, and checkout
 */

const CartPage = () => {
  const [showClearModal, setShowClearModal] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const { items, total, itemCount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Handle checkout
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push('/login?returnTo=/cart');
      return;
    }

    setIsCheckingOut(true);
    
    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      // Checkout error
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Handle clear cart
  const handleClearCart = () => {
    clearCart();
    setShowClearModal(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Sepetim
            </h1>
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-primary-600">Ana Sayfa</Link>
              <span>/</span>
              <span className="text-gray-900">Sepet</span>
            </nav>
          </div>

          {/* Empty Cart */}
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sepetiniz Boş
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Henüz sepetinize ürün eklemediniz. Alışverişe başlamak için 
              ürünlerimizi keşfedin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg">
                  Alışverişe Başla
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Ana Sayfaya Dön
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Sepetim
              </h1>
              <p className="text-gray-600">
                {itemCount} ürün
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/products">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Alışverişe Devam Et
                </Button>
              </Link>
              {items.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setShowClearModal(true)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Sepeti Temizle
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Sipariş Özeti
              </h2>

              {/* Summary Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ara Toplam</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kargo</span>
                  <span className="font-medium text-green-600">Ücretsiz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">KDV</span>
                  <span className="font-medium">{formatPrice(total * 0.18)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Toplam</span>
                  <span>{formatPrice(total * 1.18)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                size="lg"
                className="w-full mb-4"
                onClick={handleCheckout}
                loading={isCheckingOut}
              >
                {isAuthenticated ? 'Ödemeye Geç' : 'Giriş Yap ve Öde'}
              </Button>

              {/* Security Info */}
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  🔒 Güvenli ödeme ile korunuyorsunuz
                </p>
                <div className="flex justify-center space-x-4 text-xs text-gray-400">
                  <span>SSL</span>
                  <span>•</span>
                  <span>3D Secure</span>
                  <span>•</span>
                  <span>PCI DSS</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Clear Cart Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Sepeti Temizle"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-gray-600 mb-6">
            Sepetinizdeki tüm ürünleri kaldırmak istediğinizden emin misiniz? 
            Bu işlem geri alınamaz.
          </p>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowClearModal(false)}
              className="flex-1"
            >
              İptal
            </Button>
            <Button
              variant="danger"
              onClick={handleClearCart}
              className="flex-1"
            >
              Sepeti Temizle
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CartPage;

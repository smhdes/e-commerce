'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../lib/utils';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';

/**
 * Wishlist Page Component
 * Displays user's wishlist with options to add to cart or remove items
 */

const WishlistPage = () => {
  const [showClearModal, setShowClearModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const { items, clearWishlist, removeItem } = useWishlist();
  const { addItem } = useCart();

  // Handle add to cart from wishlist
  const handleAddToCart = (product) => {
    const result = addItem(product, 1);
    if (result.success) {
      setSuccessMessage(`${product.title} sepete eklendi`);
      setShowSuccessModal(true);
    }
  };

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (productId) => {
    removeItem(productId);
  };

  // Handle clear wishlist
  const handleClearWishlist = () => {
    clearWishlist();
    setShowClearModal(false);
  };

  // Handle add all to cart
  const handleAddAllToCart = () => {
    let addedCount = 0;
    items.forEach(item => {
      const result = addItem(item, 1);
      if (result.success) {
        addedCount++;
      }
    });
    
    if (addedCount > 0) {
      setSuccessMessage(`${addedCount} ürün sepete eklendi`);
      setShowSuccessModal(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Favori Listem
            </h1>
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-primary-600">Ana Sayfa</Link>
              <span>/</span>
              <span className="text-gray-900">Favoriler</span>
            </nav>
          </div>

          {/* Empty Wishlist */}
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Favori Listeniz Boş
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Beğendiğiniz ürünleri favori listenize ekleyerek daha sonra 
              kolayca bulabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg">
                  Ürünleri Keşfet
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
                Favori Listem
              </h1>
              <p className="text-gray-600">
                {items.length} ürün
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
                <>
                  <Button
                    onClick={handleAddAllToCart}
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Tümünü Sepete Ekle
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowClearModal(true)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Listeyi Temizle
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
              <div className="relative">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Remove from Wishlist Button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Remove from wishlist"
                  >
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-lg font-bold text-gray-900 mb-4">
                    {formatPrice(item.price)}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Sepete Ekle
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-12 text-center">
          <Card className="inline-block p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Favori Listesi Özeti
            </h3>
            <p className="text-gray-600 mb-4">
              {items.length} ürün favori listenizde
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleAddAllToCart}
                size="lg"
                className="bg-primary-600 hover:bg-primary-700"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Tümünü Sepete Ekle
              </Button>
              <Link href="/products">
                <Button variant="outline" size="lg">
                  Daha Fazla Ürün Keşfet
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Clear Wishlist Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Favori Listesini Temizle"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-gray-600 mb-6">
            Favori listenizdeki tüm ürünleri kaldırmak istediğinizden emin misiniz? 
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
              onClick={handleClearWishlist}
              className="flex-1"
            >
              Listeyi Temizle
            </Button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Başarılı"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-gray-600 mb-6">
            {successMessage}
          </p>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowSuccessModal(false)}
              className="flex-1"
            >
              Tamam
            </Button>
            <Link href="/cart" className="flex-1">
              <Button className="w-full">
                Sepete Git
              </Button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WishlistPage;

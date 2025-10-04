import { productAPI } from '../../../lib/api';

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const products = await productAPI.getAll();
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, ArrowLeft } from 'lucide-react';
import { useCart } from '../../../contexts/CartContext';
import { useWishlist } from '../../../contexts/WishlistContext';
import { formatPrice, getRatingStars } from '../../../lib/utils';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Modal from '../../../components/ui/Modal';

/**
 * Product Detail Page Component
 * Displays detailed product information with add to cart functionality
 */

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const params = useParams();

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await productAPI.getById(params.id);
        setProduct(productData);
        
        // Load related products
        const relatedData = await productAPI.getByCategory(productData.category);
        setRelatedProducts(relatedData.filter(p => p.id !== productData.id).slice(0, 4));
      } catch (error) {
        // Error loading product
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  // Handle add to cart
  const handleAddToCart = () => {
    const result = addItem(product, quantity);
    if (result.success) {
      setShowSuccessModal(true);
    }
  };

  // Handle wishlist toggle
  const handleToggleWishlist = () => {
    toggleItem(product);
  };

  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-300 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Ürün Bulunamadı
            </h1>
            <p className="text-gray-600 mb-6">
              Aradığınız ürün mevcut değil veya kaldırılmış olabilir.
            </p>
            <Link href="/products">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ürünlere Dön
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const ratingStars = getRatingStars(product.rating?.rate || 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary-600">Ürünler</Link>
            <span>/</span>
            <span className="text-gray-900">{product.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Image Gallery (if multiple images) */}
            <div className="grid grid-cols-4 gap-2">
              {[product.image, product.image, product.image, product.image].map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === index
                      ? 'border-primary-600'
                      : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <p className="text-sm text-primary-600 font-medium uppercase tracking-wide">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {ratingStars.map((star, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${
                        star.type === 'full'
                          ? 'text-yellow-400 fill-current'
                          : star.type === 'half'
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.rate} ({product.rating.count} değerlendirme)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Açıklama
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Miktar
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={isInCart(product.id)}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isInCart(product.id) ? 'Sepette' : 'Sepete Ekle'}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleToggleWishlist}
                >
                  <Heart className={`w-5 h-5 ${
                    isInWishlist(product.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-600'
                  }`} />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-primary-600" />
                <span className="text-sm text-gray-600">Ücretsiz Kargo</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary-600" />
                <span className="text-sm text-gray-600">Güvenli Ödeme</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-5 h-5 text-primary-600" />
                <span className="text-sm text-gray-600">30 Gün İade</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Benzer Ürünler
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="p-4">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.title}
                    </h3>
                    <p className="text-lg font-bold text-gray-900">
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Ürün Sepete Eklendi"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-gray-600 mb-6">
            {product.title} sepete başarıyla eklendi.
          </p>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowSuccessModal(false)}
              className="flex-1"
            >
              Alışverişe Devam Et
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

export default ProductDetailPage;

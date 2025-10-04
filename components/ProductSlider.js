'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart, Truck } from 'lucide-react';
import { productAPI } from '../lib/api';
import { formatPrice, getRatingStars } from '../lib/utils';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import Button from './ui/Button';

/**
 * Product Slider Component
 * Displays featured products in a carousel format
 */

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  // Load featured products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsData = await productAPI.getAll();
        // Get first 6 products as featured
        setProducts(productsData.slice(0, 6));
      } catch (error) {
        // Error loading products
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Auto-rotate slider
  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % Math.ceil(products.length / 2)
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [products.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % Math.ceil(products.length / 2)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.ceil(products.length / 2) - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = (product) => {
    addItem(product, 1);
  };

  const handleToggleWishlist = (product) => {
    toggleItem(product);
  };

  if (loading) {
    return (
      <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 p-8 flex flex-col justify-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4">
                  <div className="h-24 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-1"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 p-8 flex flex-col justify-center items-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ürünler Yükleniyor...
          </h3>
          <p className="text-gray-600">Lütfen bekleyin</p>
        </div>
      </div>
    );
  }

  const visibleProducts = products.slice(currentIndex * 2, (currentIndex + 1) * 2);

  return (
    <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-2xl overflow-hidden">
      {/* Floating Cards */}
      <div className="absolute -top-4 -left-4 bg-white p-4 rounded-lg shadow-lg z-10">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="font-semibold">4.9/5</span>
        </div>
        <p className="text-sm text-gray-600">Müşteri Puanı</p>
      </div>
      <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg z-10">
        <div className="flex items-center space-x-2">
          <Truck className="w-5 h-5 text-primary-600" />
          <span className="font-semibold">Ücretsiz</span>
        </div>
        <p className="text-sm text-gray-600">Kargo</p>
      </div>

      {/* Slider Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900">
            Öne Çıkan Ürünler
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              aria-label="Önceki ürünler"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              aria-label="Sonraki ürünler"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">
          En popüler ve kaliteli ürünlerimizi keşfedin
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {visibleProducts.map((product) => {
            const ratingStars = getRatingStars(product.rating?.rate || 0);
            
            return (
              <div
                key={product.id}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative">
                    <div className="w-full h-24 bg-gray-100 rounded mb-2 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={200}
                        height={96}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    
                    {/* Product Actions */}
                    <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleToggleWishlist(product);
                        }}
                        className="p-1 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                        aria-label={isInWishlist(product.id) ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                      >
                        <Heart className={`w-4 h-4 ${
                          isInWishlist(product.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-600'
                        }`} />
                      </button>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                    {product.title}
                  </h4>
                  
                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {ratingStars.slice(0, 3).map((star, index) => (
                          <Star
                            key={index}
                            className={`w-3 h-3 ${
                              star.type === 'full'
                                ? 'text-yellow-400 fill-current'
                                : star.type === 'half'
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.rating.count})
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-primary-600">
                      {formatPrice(product.price)}
                    </p>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      disabled={isInCart(product.id)}
                      className="text-xs px-2 py-1"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      {isInCart(product.id) ? 'Sepette' : 'Ekle'}
                    </Button>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        
        {/* Slider Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: Math.ceil(products.length / 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-primary-600'
                  : 'bg-gray-300'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;

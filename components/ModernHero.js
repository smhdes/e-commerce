'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, ShoppingCart, Heart, Gift, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { productAPI } from '../lib/api';
import { formatPrice, getRatingStars } from '../lib/utils';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Modern E-Commerce Hero Section
 * Professional product showcase with multiple products and categories
 */
const ModernHero = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem: addItemToCart } = useCart();
  const { addItem: addItemToWishlist } = useWishlist();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await productAPI.getAll();
        // Get diverse products for showcase
        const filteredProducts = allProducts
          .filter(p => p.image && p.rating && p.rating.rate > 3)
          .slice(0, 12);
        setProducts(filteredProducts);
      } catch (error) {
        // Error fetching products for hero
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-3/4 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-4">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Content */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('home.hero.title')}
            <span className="text-blue-600 block">{t('home.hero.subtitle')}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('home.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
{t('home.hero.startShopping')}
              <ArrowRight className="w-6 h-6 ml-2" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-lg font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
            >
{t('home.hero.about')}
            </Link>
          </div>
        </div>

        {/* Campaign Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('home.hero.campaigns.superPrice')}</h3>
                <p className="text-orange-100">{t('home.hero.campaigns.superPriceDesc')}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('home.hero.campaigns.fastShipping')}</h3>
                <p className="text-blue-100">{t('home.hero.campaigns.fastShippingDesc')}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('home.hero.campaigns.qualityGuarantee')}</h3>
                <p className="text-green-100">{t('home.hero.campaigns.qualityGuaranteeDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{t('home.hero.featuredProducts')}</h2>
            <Link 
              href="/products" 
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2 transition-colors duration-200"
            >
              <span>{t('home.hero.viewAll')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <div key={product.id} className="group">
                <div className="bg-gray-50 rounded-xl p-4 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 border border-gray-100 hover:border-blue-200">
                  <div className="relative w-full h-48 mb-4">
                    <Link href={`/products/${product.id}`} className="block w-full h-full">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        style={{ objectFit: 'contain' }}
                        className="rounded-lg"
                      />
                    </Link>
                    {/* Badge */}
                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      En Avantajlı
                    </div>
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation();
                        addItemToWishlist(product); 
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      {product.title}
                    </h3>
                  </Link>
                  <div className="flex items-center mb-2">
                    {getRatingStars(product.rating.rate)}
                    <span className="ml-2 text-sm text-gray-600">({product.rating.count})</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 mb-3">
                    {formatPrice(product.price)}
                  </p>
                  <button
                    onClick={(e) => { 
                      e.preventDefault(); 
                      e.stopPropagation();
                      addItemToCart(product); 
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Sepete Ekle</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Showcase */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">{t('home.hero.categories')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: t('home.hero.categoryNames.electronics'), icon: '📱', color: 'bg-blue-100 text-blue-600' },
              { name: t('home.hero.categoryNames.fashion'), icon: '👕', color: 'bg-pink-100 text-pink-600' },
              { name: t('home.hero.categoryNames.home'), icon: '🏠', color: 'bg-green-100 text-green-600' },
              { name: t('home.hero.categoryNames.sports'), icon: '⚽', color: 'bg-orange-100 text-orange-600' },
              { name: t('home.hero.categoryNames.beauty'), icon: '💄', color: 'bg-purple-100 text-purple-600' },
              { name: t('home.hero.categoryNames.books'), icon: '📚', color: 'bg-yellow-100 text-yellow-600' }
            ].map((category, index) => (
              <Link
                key={index}
                href={`/categories/${category.name.toLowerCase()}`}
                className="group"
              >
                <div className={`${category.color} rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart, Eye, Star, Truck, Shield, Zap } from 'lucide-react';
import { formatPrice, getRatingStars } from '../lib/utils';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useLanguage } from '../contexts/LanguageContext';
import Button from './ui/Button';
import { useState } from 'react';
import toast from 'react-hot-toast';

/**
 * Modern E-Commerce Product Card Component
 * Professional product display with advanced hover effects and animations
 */
const ModernProductCard = ({ product, showBadges = true }) => {
  const { addItem: addItemToCart } = useCart();
  const { addItem: addItemToWishlist } = useWishlist();
  const { t } = useLanguage();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    try {
      await addItemToCart(product);
      toast.success(`${product.title} ${t('product.addToCart')}!`);
    } catch (error) {
      toast.error(`${t('common.error')}!`);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToWishlist(true);
    try {
      await addItemToWishlist(product);
      toast.success(`${product.title} ${t('product.addToWishlist')}!`);
    } catch (error) {
      toast.error(`${t('common.error')}!`);
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  if (!product) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse h-96">
        <div className="w-full h-48 bg-gray-200"></div>
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="flex justify-between">
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  // Generate consistent badges based on product ID
  const badges = [
    { text: 'En Avantajlı', color: 'bg-orange-500', icon: <Zap className="w-3 h-3" /> },
    { text: 'En Çok Satan', color: 'bg-blue-500', icon: <Star className="w-3 h-3" /> },
    { text: 'YENİ', color: 'bg-green-500', icon: <Zap className="w-3 h-3" /> },
    { text: 'Reklam', color: 'bg-purple-500', icon: <Zap className="w-3 h-3" /> }
  ];
  
  // Use product ID for consistent badge selection
  const badgeIndex = product.id % badges.length;
  const randomBadge = badges[badgeIndex];
  const hasDiscount = (product.id % 3) === 0; // Every 3rd product has discount
  const discountPercentage = 10 + (product.id % 40); // 10-50% discount

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative w-full h-64 bg-gray-50 overflow-hidden">
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: 'contain' }}
            className={`transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        </Link>

        {/* Badges */}
        {showBadges && (
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <div className={`${randomBadge.color} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg`}>
              {randomBadge.icon}
              {randomBadge.text}
            </div>
            {hasDiscount && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                %{discountPercentage} İndirim
              </div>
            )}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleAddToWishlist}
          disabled={isAddingToWishlist}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300 ${
            isHovered ? 'scale-110 bg-white' : 'scale-100'
          } hover:bg-red-50 hover:text-red-500`}
        >
          {isAddingToWishlist ? (
            <div className="animate-spin h-5 w-5 border-2 border-current border-r-transparent rounded-full"></div>
          ) : (
            <Heart className="w-5 h-5" />
          )}
        </button>

        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center gap-3 transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="bg-white text-gray-900 hover:bg-blue-600 hover:text-white transform hover:scale-110 transition-all duration-300 shadow-lg px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
          >
            {isAddingToCart ? (
              <div className="animate-spin h-5 w-5 border-2 border-current border-r-transparent rounded-full"></div>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Sepete Ekle</span>
              </>
            )}
          </button>
          <Link href={`/products/${product.id}`}>
            <button
              className="bg-white text-gray-900 hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 shadow-lg px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 border border-gray-300"
            >
              <Eye className="w-5 h-5" />
              <span>{t('product.viewProduct')}</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category */}
        <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
        
        {/* Product Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {getRatingStars(product.rating.rate)}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.rating.count})</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(product.price * (1 - discountPercentage / 100))}
              </span>
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-red-600 font-semibold">
                %{discountPercentage} indirim
              </span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Features */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Truck className="w-4 h-4 text-green-600" />
            <span>Ücretsiz Kargo</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>Güvenli Alışveriş</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {isAddingToCart ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin h-5 w-5 border-2 border-white border-r-transparent rounded-full mr-2"></div>
              Ekleniyor...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
{t('product.addToCart')}
            </div>
          )}
        </Button>
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}></div>
    </div>
  );
};

export default ModernProductCard;
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { formatPrice, getRatingStars } from '../lib/utils';
import Button from './ui/Button';
import Card from './ui/Card';

/**
 * Product Card Component
 * Displays product information with add to cart and wishlist functionality
 */

const ProductCard = ({ product, showActions = true }) => {
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const result = addItem(product, 1);
    if (result.success) {
      // You could show a toast notification here
    }
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const result = toggleItem(product);
    if (result.success) {
      // You could show a toast notification here
    }
  };

  const ratingStars = getRatingStars(product.rating?.rate || 0);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300" hover>
      <Link href={`/products/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          />
          
          {/* Wishlist Button */}
          {showActions && (
            <button
              onClick={handleToggleWishlist}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
              aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={`w-4 h-4 ${
                  isInWishlist(product.id)
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-600 hover:text-red-500'
                }`}
              />
            </button>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.category}
          </p>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {ratingStars}
              </div>
              <span className="text-sm text-gray-600 ml-1">
                ({product.rating.count})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex space-x-2">
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={isInCart(product.id)}
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
              </Button>
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
};

export default ProductCard;

'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../lib/utils';
import Button from './ui/Button';

/**
 * Cart Item Component
 * Displays individual cart item with quantity controls and remove functionality
 */

const CartItem = ({ item }) => {
  const { updateItemQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      removeItem(item.id);
    } else {
      updateItemQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover rounded-md"
          sizes="64px"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500">
          {item.category}
        </p>
        <p className="text-lg font-semibold text-gray-900">
          {formatPrice(item.price)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </Button>
        
        <span className="w-8 text-center font-medium">
          {item.quantity}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Item Total */}
      <div className="text-right">
        <p className="text-lg font-semibold text-gray-900">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRemove}
        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
        aria-label="Remove item"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default CartItem;

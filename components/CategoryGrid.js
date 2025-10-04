'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Smartphone, Shirt } from 'lucide-react';

/**
 * Category Grid Component
 * Displays product categories with icons and product counts
 */

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static categories with icons for demo
  const staticCategories = [
    { id: 1, name: 'electronics', displayName: 'Elektronik', icon: <Smartphone className="w-8 h-8 text-primary-600" /> },
    { id: 2, name: 'jewelery', displayName: 'Mücevher', icon: <Shirt className="w-8 h-8 text-primary-600" /> },
    { id: 3, name: "men's clothing", displayName: 'Erkek Giyim', icon: <Shirt className="w-8 h-8 text-primary-600" /> },
    { id: 4, name: "women's clothing", displayName: 'Kadın Giyim', icon: <Shirt className="w-8 h-8 text-primary-600" /> },
  ];

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        // Use static categories for now
        setCategories(staticCategories);
      } catch (error) {
        // Error loading categories
        setCategories(staticCategories);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-6 text-center animate-pulse">
            <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products?category=${category.name}`}
          className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 group border border-gray-100"
        >
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors duration-300">
            {category.icon}
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            {category.displayName}
          </h3>
          <p className="text-sm text-gray-600">
            Ürünleri Keşfet
          </p>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;

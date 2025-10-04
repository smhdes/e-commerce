'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Grid, List } from 'lucide-react';
import { productAPI } from '../../lib/api';
import { sortProducts, filterProducts } from '../../lib/utils';
import ProductCard from '../../components/ProductCard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

/**
 * Products Page Component
 * Displays all products with search, filter, and sort functionality
 */

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  
  const searchParams = useSearchParams();

  // Load products and categories
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productAPI.getAll(),
          productAPI.getCategories()
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
        
        // Set search query from URL params
        const search = searchParams.get('search');
        if (search) {
          setSearchQuery(search);
        }
      } catch (error) {
        // Error loading products
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [searchParams]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filterProducts(filtered, searchQuery);
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Apply sorting
    filtered = sortProducts(filtered, sortBy);

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, sortBy, priceRange]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  // Handle category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  // Handle sort change
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('name');
    setPriceRange({ min: 0, max: 1000 });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Ürünler
          </h1>
          <p className="text-lg text-gray-600">
            {filteredProducts.length} ürün bulundu
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Filtreler
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arama
                </label>
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ürün ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </form>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategoriler
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === ''
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Tümü
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.name
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.displayName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fiyat Aralığı
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="w-full"
              >
                Filtreleri Temizle
              </Button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              {/* Sort Options */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">
                  Sırala:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="name">İsim</option>
                  <option value="price-low">Fiyat (Düşük → Yüksek)</option>
                  <option value="price-high">Fiyat (Yüksek → Düşük)</option>
                  <option value="rating">Puan</option>
                  <option value="newest">En Yeni</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showActions={true}
                  />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ürün Bulunamadı
                </h3>
                <p className="text-gray-600 mb-4">
                  Arama kriterlerinize uygun ürün bulunamadı. 
                  Filtreleri değiştirmeyi deneyin.
                </p>
                <Button onClick={clearFilters}>
                  Filtreleri Temizle
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProductsPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <ProductsPage />
    </Suspense>
  );
}

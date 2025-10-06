'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Gift,
  Package,
  Smartphone,
  Shirt,
  Home,
  Gamepad2
} from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Modern E-Commerce Navbar Component
 * Professional e-commerce navigation with advanced hover effects
 */
const ModernNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount: cartItemCount } = useCart();
  const { itemCount: wishlistItemCount } = useWishlist();
  const { locale, changeLanguage, t } = useLanguage();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  // Categories for dropdown
  const categories = [
    { name: t('navigation.categories.electronics'), icon: <Smartphone className="w-5 h-5" />, href: '/categories/electronics' },
    { name: t('navigation.categories.fashion'), icon: <Shirt className="w-5 h-5" />, href: '/categories/fashion' },
    { name: t('navigation.categories.home'), icon: <Home className="w-5 h-5" />, href: '/categories/home' },
    { name: t('navigation.categories.sports'), icon: <Gamepad2 className="w-5 h-5" />, href: '/categories/sports' },
    { name: t('navigation.categories.beauty'), icon: <Gift className="w-5 h-5" />, href: '/categories/beauty' },
    { name: t('navigation.categories.books'), icon: <Package className="w-5 h-5" />, href: '/categories/books' }
  ];

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-gray-900 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Desktop Links */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link href="/orders" className="hover:text-blue-400 transition-colors duration-200">
                {t('navigation.topLinks.orders')}
              </Link>
              <Link href="/campaigns" className="hover:text-blue-400 transition-colors duration-200">
                {t('navigation.topLinks.campaigns')}
              </Link>
              <Link href="/international" className="hover:text-blue-400 transition-colors duration-200">
                {t('navigation.topLinks.international')}
              </Link>
              <Link href="/women-entrepreneurs" className="text-red-400 hover:text-red-300 transition-colors duration-200">
                {t('navigation.topLinks.womenEntrepreneurs')}
              </Link>
              <Link href="/support" className="hover:text-blue-400 transition-colors duration-200">
                {t('navigation.topLinks.customerService')}
              </Link>
              <Link href="/premium" className="text-orange-400 hover:text-orange-300 transition-colors duration-200">
                {t('navigation.topLinks.premium')}
              </Link>
              <Link href="/sell" className="hover:text-blue-400 transition-colors duration-200">
                {t('navigation.topLinks.sell')}
              </Link>
            </div>
            
            {/* Tablet Links */}
            <div className="hidden md:flex lg:hidden items-center space-x-4">
              <Link href="/orders" className="hover:text-blue-400 transition-colors duration-200">
                {t('navigation.topLinks.orders')}
              </Link>
              <Link href="/campaigns" className="hover:text-blue-400 transition-colors duration-200">
                {t('navigation.topLinks.campaigns')}
              </Link>
              <Link href="/premium" className="text-orange-400 hover:text-orange-300 transition-colors duration-200">
                {t('navigation.topLinks.premium')}
              </Link>
              <Link href="/sell" className="hover:text-blue-400 transition-colors duration-200">
                {t('navigation.topLinks.sell')}
              </Link>
            </div>
            
            {/* Mobile Links */}
            <div className="flex md:hidden items-center space-x-3 overflow-x-auto">
              <Link href="/orders" className="hover:text-blue-400 transition-colors duration-200 whitespace-nowrap">
                {t('navigation.topLinks.orders')}
              </Link>
              <Link href="/campaigns" className="hover:text-blue-400 transition-colors duration-200 whitespace-nowrap">
                {t('navigation.topLinks.campaigns')}
              </Link>
              <Link href="/premium" className="text-orange-400 hover:text-orange-300 transition-colors duration-200 whitespace-nowrap">
                {t('navigation.topLinks.premium')}
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="hidden lg:inline">{t('navigation.selectLocation')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg border-b border-gray-200' 
          : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo className="text-2xl font-bold text-blue-600" />
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isSearchFocused ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    placeholder={t('navigation.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                      isSearchFocused 
                        ? 'border-blue-500 bg-white shadow-lg' 
                        : 'border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400'
                    }`}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Ara
                  </button>
                </div>
              </form>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="hidden lg:flex items-center space-x-2">
                <select
                  value={locale}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="bg-transparent border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="tr">🇹🇷 TR</option>
                  <option value="en">🇺🇸 EN</option>
                </select>
              </div>

              {/* Location */}
              <div className="hidden lg:flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                <MapPin className="w-5 h-5" />
                <div>
                  <div className="text-sm font-medium">{t('navigation.location')}</div>
                  <div className="text-xs text-gray-500">{t('navigation.selectLocation')}</div>
                </div>
              </div>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden md:block font-medium text-gray-700">{user?.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <Link href="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                        <User className="w-4 h-4 mr-3" />
{t('navigation.profile')}
                      </Link>
                      <Link href="/orders" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                        <Package className="w-4 h-4 mr-3" />
{t('navigation.orders')}
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
{t('navigation.logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  href="/login"
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:block">{t('navigation.login')}</span>
                </Link>
              )}

              {/* Wishlist */}
              <Link 
                href="/wishlist"
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Heart className="w-6 h-6 text-gray-600" />
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItemCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link 
                href="/cart"
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="hidden lg:flex items-center space-x-8 py-3 border-t border-gray-200">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
              >
                {category.icon}
                <span className="font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-2">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={category.href}
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Decorative Bottom Bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </>
  );
};

export default ModernNavbar;
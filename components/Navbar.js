'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import Button from './ui/Button';

/**
 * Navigation Bar Component
 * Main navigation with search, cart, wishlist, and user menu
 */

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const { getItemCount } = useWishlist();
  const router = useRouter();

  const wishlistCount = getItemCount();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  // Navigation links
  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/products', label: 'Ürünler' },
  ];

  const userMenuItems = [
    { href: '/profile', label: 'Profil', icon: User },
    { href: '/wishlist', label: 'Favoriler', icon: Heart },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Hepsitrend</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            {isAuthenticated && (
              <Link
                href="/wishlist"
                className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                aria-label="Wishlist"
              >
                <Heart className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                >
                  <User className="w-6 h-6" />
                  <span className="hidden lg:block">{user?.name}</span>
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Giriş Yap
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Mobile Search */}
            <div className="mb-4">
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

            {/* Mobile Navigation Links */}
            <div className="space-y-2 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="space-y-2">
              <Link
                href="/cart"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Sepet ({itemCount})</span>
              </Link>

              {isAuthenticated ? (
                <>
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block px-4 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Giriş Yap
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

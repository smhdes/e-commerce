'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Button from '../components/ui/Button';

/**
 * 404 Not Found Page
 * Custom 404 page for better user experience
 */

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary-600 mb-4">404</div>
          <div className="w-32 h-32 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
            <Search className="w-16 h-16 text-primary-600" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Sayfa Bulunamadı
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
          Ana sayfaya dönerek aradığınızı bulabilirsiniz.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Ana Sayfa
            </Button>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Geri Dön
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popüler Sayfalar
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              Ürünler
            </Link>
            <Link
              href="/about"
              className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              Hakkımızda
            </Link>
            <Link
              href="/contact"
              className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              İletişim
            </Link>
            <Link
              href="/help"
              className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              Yardım
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8 p-4 bg-primary-50 rounded-lg">
          <h4 className="font-semibold text-primary-900 mb-2">
            Aradığınızı bulamadınız mı?
          </h4>
          <p className="text-primary-700 text-sm mb-3">
            Ürün aramak için arama çubuğunu kullanabilir veya kategorilere göz atabilirsiniz.
          </p>
          <Link href="/products">
            <Button variant="outline" size="sm">
              Ürünleri Keşfet
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

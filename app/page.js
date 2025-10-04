'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Truck, Shield, RotateCcw, Gift, Award, Users, Clock } from 'lucide-react';
import { staticProducts } from '../data/static-products';
import ModernProductCard from '../components/ModernProductCard';
import CategoryGrid from '../components/CategoryGrid';
import ModernHero from '../components/ModernHero';
import Card from '../components/ui/Card';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Modern E-Commerce Home Page
 * Professional e-commerce landing page with advanced UI/UX
 */

// Hero Section Component
const HeroSection = () => {
  return <ModernHero />;
};

// Categories Section Component
const CategoriesSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('home.categories.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('home.categories.description')}
          </p>
        </div>
        
        <CategoryGrid />
      </div>
    </section>
  );
};

// Benefits Section Component
const BenefitsSection = () => {
  const { t } = useLanguage();
  
  const benefits = [
    {
      icon: Truck,
      title: t('home.benefits.fastShipping'),
      description: t('home.benefits.fastShippingDesc'),
      color: 'blue'
    },
    {
      icon: Shield,
      title: t('home.benefits.securePayment'),
      description: t('home.benefits.securePaymentDesc'),
      color: 'green'
    },
    {
      icon: RotateCcw,
      title: t('home.benefits.easyReturn'),
      description: t('home.benefits.easyReturnDesc'),
      color: 'purple'
    },
    {
      icon: Clock,
      title: t('home.benefits.support'),
      description: t('home.benefits.supportDesc'),
      color: 'orange'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('home.benefits.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('home.benefits.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group">
              <Card className="text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white">
                <div className={`w-16 h-16 bg-${benefit.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className={`w-8 h-8 text-${benefit.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured Products Section Component
const FeaturedProductsSection = () => {
  const { t } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Use static products for static export compatibility
    setFeaturedProducts(staticProducts.slice(0, 8));
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6" suppressHydrationWarning>
              {t('home.featuredProducts.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" suppressHydrationWarning>
              {t('home.featuredProducts.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0 && !loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6" suppressHydrationWarning>
              {t('home.featuredProducts.title')}
            </h2>
            <p className="text-xl text-gray-600" suppressHydrationWarning>
              {t('home.featuredProducts.error')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6" suppressHydrationWarning>
            {t('home.featuredProducts.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" suppressHydrationWarning>
            {t('home.featuredProducts.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ModernProductCard key={product.id} product={product} showBadges={true} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t('home.featuredProducts.viewAll')}
            <ArrowRight className="w-6 h-6 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// Stats Section Component
const StatsSection = () => {
  const { t } = useLanguage();
  
  const stats = [
    { number: '1M+', label: t('home.stats.happyCustomers'), icon: Users },
    { number: '50K+', label: t('home.stats.productVariety'), icon: Gift },
    { number: '99%', label: t('home.stats.customerSatisfaction'), icon: Award },
    { number: '24/7', label: t('home.stats.customerSupport'), icon: Clock }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('home.stats.title')}
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {t('home.stats.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Newsletter Section Component
const NewsletterSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('home.newsletter.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            {t('home.newsletter.description')}
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder={t('home.newsletter.placeholder')}
                className="flex-1 px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <button className="px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                {t('home.newsletter.subscribe')}
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              {t('home.newsletter.privacy')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Home Page Component
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <BenefitsSection />
      <Suspense fallback={
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-12 bg-gray-300 rounded w-1/3 mx-auto mb-6"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mb-12"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                      <div className="h-6 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                      <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      }>
        <FeaturedProductsSection />
      </Suspense>
      <StatsSection />
      <NewsletterSection />
    </>
  );
}
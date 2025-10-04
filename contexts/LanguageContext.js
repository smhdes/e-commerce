'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { locales, defaultLocale } from '../i18n';
import trMessages from '../messages/tr.json';
import enMessages from '../messages/en.json';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(defaultLocale);
  const [messages, setMessages] = useState({});
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Load saved locale and set hydrated flag
  useEffect(() => {
    const savedLocale = localStorage.getItem('preferred-locale');
    if (savedLocale && locales.includes(savedLocale)) {
      setLocale(savedLocale);
    }
    setIsHydrated(true);
  }, []);

  // Load messages for current locale
  useEffect(() => {
    if (locale === 'tr') {
      setMessages(trMessages);
    } else if (locale === 'en') {
      setMessages(enMessages);
    } else {
      setMessages(trMessages); // fallback
    }
  }, [locale]);

  // Get localized pathname
  const getLocalizedPathname = (path, newLocale = locale) => {
    const segments = path.split('/');
    
    // Remove existing locale if present
    if (locales.includes(segments[1])) {
      segments.splice(1, 1);
    }
    
    // Add new locale
    if (newLocale !== defaultLocale) {
      segments.splice(1, 0, newLocale);
    }
    
    return segments.join('/');
  };

  // Change language
  const changeLanguage = (newLocale) => {
    if (locales.includes(newLocale)) {
      setLocale(newLocale);
      // Store locale in localStorage for persistence
      localStorage.setItem('preferred-locale', newLocale);
      // Don't change URL, just update the language
      // router.push(newPath);
    }
  };

  // Get translation
  const t = (key, params = {}) => {
    if (!key || typeof key !== 'string') {
      return key;
    }

    // During SSR or before hydration, return a fallback text to avoid showing keys
    if (!isHydrated || Object.keys(messages).length === 0) {
      // Return a fallback text instead of the key
      const fallbacks = {
        'home.featuredProducts.title': 'Öne Çıkan Ürünler',
        'home.featuredProducts.description': 'En popüler ve kaliteli ürünlerimizi keşfedin',
        'home.categories.title': 'Kategoriler',
        'home.categories.description': 'İhtiyacınıza uygun kategorileri keşfedin',
        'home.stats.title': 'Neden Hepsitrend?',
        'home.stats.description': 'Müşterilerimizin tercih ettiği özellikler',
        'product.addToCart': 'Sepete Ekle',
        'home.featuredProducts.viewAll': 'Tümünü Gör',
        'footer.features.fastShipping': 'Hızlı Kargo',
        'footer.features.securePayment': 'Güvenli Ödeme',
        'footer.features.easyReturn': 'Kolay İade'
      };
      return fallbacks[key] || key;
    }

    const keys = key.split('.');
    let value = messages;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    // Replace parameters
    if (typeof value === 'string') {
      return value.replace(/\{(\w+)\}/g, (match, param) => {
        return params[param] || match;
      });
    }
    
    return value;
  };

  const value = {
    locale,
    locales,
    defaultLocale,
    messages,
    changeLanguage,
    t,
    getLocalizedPathname
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

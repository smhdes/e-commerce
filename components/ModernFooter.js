'use client';

import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Shield,
  Truck,
  RotateCcw,
  CreditCard,
  Smartphone,
  Shirt,
  Home,
  Gamepad2,
  Gift,
  Star,
  ArrowUp
} from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Modern E-Commerce Footer Component
 * Professional footer with comprehensive links and modern design
 */
const ModernFooter = () => {
  const { t } = useLanguage();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Top Section - Features */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{t('footer.features.fastShipping')}</h3>
                <p className="text-gray-300 text-sm">{t('footer.features.fastShippingDesc')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{t('footer.features.securePayment')}</h3>
                <p className="text-gray-300 text-sm">{t('footer.features.securePaymentDesc')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{t('footer.features.easyReturn')}</h3>
                <p className="text-gray-300 text-sm">{t('footer.features.easyReturnDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Logo className="text-white mb-6" />
            <p className="text-gray-300 mb-6 leading-relaxed">
              Modern e-ticaret deneyimi ile ihtiyacınız olan her şeyi bulun.
              Kaliteli ürünler, hızlı kargo ve müşteri memnuniyeti odaklı hizmet.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile Apps */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white mb-3">Mobil Uygulamalar</h4>
              <div className="space-y-2">
                <a href="#" className="flex items-center space-x-3 bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors duration-200">
                  <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🍎</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">App Store</div>
                    <div className="text-xs text-gray-400">iOS için indir</div>
                  </div>
                </a>
                <a href="#" className="flex items-center space-x-3 bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors duration-200">
                  <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">▶</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Google Play</div>
                    <div className="text-xs text-gray-400">Android için indir</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">{t('footer.corporate.title')}</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">{t('footer.corporate.about')}</Link></li>
              <li><Link href="/partners" className="text-gray-300 hover:text-white transition-colors duration-200">{t('footer.corporate.partners')}</Link></li>
              <li><Link href="/investors" className="text-gray-300 hover:text-white transition-colors duration-200">{t('footer.corporate.investors')}</Link></li>
              <li><Link href="/support" className="text-gray-300 hover:text-white transition-colors duration-200">{t('footer.corporate.support')}</Link></li>
              <li><Link href="/careers" className="text-gray-300 hover:text-white transition-colors duration-200">{t('footer.corporate.careers')}</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">{t('footer.corporate.privacy')}</Link></li>
              <li><Link href="/security" className="text-gray-300 hover:text-white transition-colors duration-200">{t('footer.corporate.security')}</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">{t('footer.corporate.contact')}</Link></li>
            </ul>
          </div>

          {/* Hepsitrend */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">{t('footer.hepsitrend.title')}</h3>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors duration-200">Hayatburada Blog</Link></li>
              <li><Link href="/sell" className="text-gray-300 hover:text-white transition-colors duration-200">Satıcı Olmak İstiyorum</Link></li>
              <li><Link href="/business" className="text-gray-300 hover:text-white transition-colors duration-200">Hepsipay İşyeri Olmak</Link></li>
              <li><Link href="/suppliers" className="text-gray-300 hover:text-white transition-colors duration-200">Tedarikçi Davranış Kuralları</Link></li>
              <li><Link href="/women-entrepreneurs" className="text-gray-300 hover:text-white transition-colors duration-200">Girişimci Kadınlara Teknoloji</Link></li>
              <li><Link href="/delivery-points" className="text-gray-300 hover:text-white transition-colors duration-200">Teslimat Noktası Olmak</Link></li>
              <li><Link href="/payment-options" className="text-gray-300 hover:text-white transition-colors duration-200">Ödeme Seçenekleri</Link></li>
              <li><Link href="/bank-campaigns" className="text-gray-300 hover:text-white transition-colors duration-200">Banka Kampanyaları</Link></li>
            </ul>
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Kategoriler</h3>
            <ul className="space-y-3">
              <li><Link href="/categories/electronics" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                <Smartphone className="w-4 h-4 mr-2" />
                {t('footer.hepsitrend.electronics')}
              </Link></li>
              <li><Link href="/categories/fashion" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                <Shirt className="w-4 h-4 mr-2" />
                {t('footer.hepsitrend.fashion')}
              </Link></li>
              <li><Link href="/categories/home" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                <Home className="w-4 h-4 mr-2" />
                {t('footer.hepsitrend.home')}
              </Link></li>
              <li><Link href="/categories/sports" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                <Gamepad2 className="w-4 h-4 mr-2" />
                {t('footer.hepsitrend.sports')}
              </Link></li>
              <li><Link href="/categories/beauty" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                <Gift className="w-4 h-4 mr-2" />
                {t('footer.hepsitrend.beauty')}
              </Link></li>
              <li><Link href="/categories/books" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                {t('footer.hepsitrend.books')}
              </Link></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Bize Ulaşın</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-white font-medium">E-posta</div>
                  <a href="mailto:info@hepsitrend.com" className="text-gray-300 hover:text-white transition-colors duration-200">
                    info@hepsitrend.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-white font-medium">Telefon</div>
                  <a href="tel:+905551234567" className="text-gray-300 hover:text-white transition-colors duration-200">
                    +90 555 123 45 67
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-white font-medium">Adres</div>
                  <span className="text-gray-300">
                    Örnek Mah. Örnek Cad. No: 123<br />
                    İstanbul, Türkiye
                  </span>
                </div>
              </li>
            </ul>

            {/* Customer Support */}
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h4 className="font-semibold text-white mb-3">Müşteri Desteği</h4>
              <div className="space-y-2">
                <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Çözüm Merkezine Bağlan
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  WhatsApp Destek
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  Etik İhbar Hattı
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-6 lg:mb-0">
              <h4 className="text-lg font-semibold text-white mb-4">Ödeme Yöntemleri</h4>
              <div className="flex flex-wrap gap-4">
                {['Visa', 'MasterCard', 'American Express', 'Troy', 'Maximum', 'Bonus', 'World', 'Axess'].map((card) => (
                  <div key={card} className="w-12 h-8 bg-white rounded flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Güvenlik Sertifikaları</h4>
              <div className="flex flex-wrap gap-4">
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">SSL</span>
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">PCI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-4 lg:mb-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Hepsitrend. Tüm Hakları Saklıdır.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                D-MARKET Elektronik Hizmetler Tic. A.Ş.
              </p>
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm">Başa Dön</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

/**
 * Footer Component
 * Site footer with links, contact info, and social media
 */

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'Hakkımızda', href: '/about' },
      { label: 'Kariyer', href: '/careers' },
      { label: 'Basın', href: '/press' },
      { label: 'Blog', href: '/blog' },
    ],
    support: [
      { label: 'Yardım Merkezi', href: '/help' },
      { label: 'İletişim', href: '/contact' },
      { label: 'SSS', href: '/faq' },
      { label: 'Destek', href: '/support' },
    ],
    legal: [
      { label: 'Gizlilik Politikası', href: '/privacy' },
      { label: 'Kullanım Şartları', href: '/terms' },
      { label: 'Çerez Politikası', href: '/cookies' },
      { label: 'KVKK', href: '/kvkk' },
    ],
    shopping: [
      { label: 'Kargo Bilgileri', href: '/shipping' },
      { label: 'İade ve Değişim', href: '/returns' },
      { label: 'Ödeme Seçenekleri', href: '/payment' },
      { label: 'Garanti', href: '/warranty' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">Mobiversite</span>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md">
              Modern e-ticaret deneyimi ile ihtiyacınız olan her şeyi bulun. 
              Kaliteli ürünler, hızlı kargo ve müşteri memnuniyeti odaklı hizmet.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">info@mobiversite.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">+90 (212) 555 0123</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">İstanbul, Türkiye</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Şirket</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Destek</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Yasal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">Bültenimize Abone Olun</h3>
            <p className="text-gray-300 mb-4">
              Yeni ürünler ve özel kampanyalardan haberdar olun
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                Abone Ol
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © {currentYear} Mobiversite. Tüm hakları saklıdır.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Güvenli Ödeme:</span>
              <div className="flex space-x-1">
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">Visa</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">Mastercard</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

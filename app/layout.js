import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import { WishlistProvider } from '../contexts/WishlistContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import ModernNavbar from '../components/ModernNavbar';
import ModernFooter from '../components/ModernFooter';
import ErrorBoundary from '../components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Hepsitrend - Modern E-Ticaret Deneyimi',
    template: '%s | Hepsitrend'
  },
  description: 'Modern e-ticaret deneyimi ile ihtiyacınız olan her şeyi bulun. Kaliteli ürünler, hızlı kargo ve müşteri memnuniyeti odaklı hizmet.',
  keywords: ['e-ticaret', 'online alışveriş', 'hepsitrend', 'ürün', 'kargo'],
  authors: [{ name: 'Hepsitrend Team' }],
  creator: 'Hepsitrend',
  publisher: 'Hepsitrend',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hepsitrend.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://hepsitrend.com',
    title: 'Hepsitrend - Modern E-Ticaret Deneyimi',
    description: 'Modern e-ticaret deneyimi ile ihtiyacınız olan her şeyi bulun. Kaliteli ürünler, hızlı kargo ve müşteri memnuniyeti odaklı hizmet.',
    siteName: 'Hepsitrend',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hepsitrend E-Ticaret',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hepsitrend - Modern E-Ticaret Deneyimi',
    description: 'Modern e-ticaret deneyimi ile ihtiyacınız olan her şeyi bulun.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3b82f6',
};

export default function RootLayout({ children }) {
  return (
        <html lang="tr" className="scroll-smooth">
          <body className={`${inter.className} antialiased`}>
            <ErrorBoundary>
              <LanguageProvider>
                <AuthProvider>
                  <CartProvider>
                    <WishlistProvider>
                      <div className="min-h-screen flex flex-col">
                        <ModernNavbar />
                        <main className="flex-1">
                          {children}
                        </main>
                        <ModernFooter />
                      </div>
                    </WishlistProvider>
                  </CartProvider>
                </AuthProvider>
              </LanguageProvider>
            </ErrorBoundary>
          </body>
        </html>
  );
}

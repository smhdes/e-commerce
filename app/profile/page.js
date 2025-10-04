'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, ShoppingBag, Heart, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { orderAPI } from '../../lib/api';
import { formatDate, formatPrice, getOrderStatusColor } from '../../lib/utils';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';

/**
 * Profile Page Component
 * User profile with orders, wishlist, and account settings
 */

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const { user, logout } = useAuth();
  const { getItemCount } = useWishlist();
  const router = useRouter();

  const wishlistCount = getItemCount();

  // Load user orders
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        if (user?.id) {
          const ordersData = await orderAPI.getOrders(user.id);
          setOrders(ordersData);
        }
      } catch (error) {
        // Error loading orders
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user?.id]);

  // Handle logout
  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    router.push('/');
  };

  // Tab content
  const tabs = [
    { id: 'orders', label: 'Siparişlerim', icon: ShoppingBag, count: orders.length },
    { id: 'wishlist', label: 'Favorilerim', icon: Heart, count: wishlistCount },
    { id: 'profile', label: 'Profil Bilgileri', icon: User },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return <OrdersTab orders={orders} loading={loading} />;
      case 'wishlist':
        return <WishlistTab />;
      case 'profile':
        return <ProfileTab user={user} />;
      default:
        return <OrdersTab orders={orders} loading={loading} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hesabım
          </h1>
          <p className="text-gray-600">
            Hoş geldiniz, {user?.name}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </div>
                    {tab.count !== undefined && (
                      <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              {/* Logout Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Çıkış Yap
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Çıkış Yap"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-gray-600 mb-6">
            Hesabınızdan çıkış yapmak istediğinizden emin misiniz?
          </p>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowLogoutModal(false)}
              className="flex-1"
            >
              İptal
            </Button>
            <Button
              variant="danger"
              onClick={handleLogout}
              className="flex-1"
            >
              Çıkış Yap
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Orders Tab Component
const OrdersTab = ({ orders, loading }) => {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className="p-8 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Henüz Siparişiniz Yok
        </h3>
        <p className="text-gray-600 mb-6">
          İlk siparişinizi vermek için ürünlerimizi keşfedin.
        </p>
        <Button>
          Alışverişe Başla
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Siparişlerim
      </h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Sipariş #{order.id}
                </h3>
                <p className="text-sm text-gray-600">
                  {formatDate(order.date)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {formatPrice(order.total)}
                </p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">Miktar: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Wishlist Tab Component
const WishlistTab = () => {
  return (
    <Card className="p-8 text-center">
      <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Favori Listem
      </h3>
      <p className="text-gray-600 mb-6">
        Favori listenizi görüntülemek için favoriler sayfasına gidin.
      </p>
      <Button>
        Favori Listeme Git
      </Button>
    </Card>
  );
};

// Profile Tab Component
const ProfileTab = ({ user }) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Profil Bilgileri
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ad Soyad
          </label>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900">{user?.name}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-posta
          </label>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900">{user?.email}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefon
          </label>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900">+90 (555) 123-4567</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adres
          </label>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900">İstanbul, Türkiye</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Profili Düzenle
        </Button>
      </div>
    </Card>
  );
};

export default ProfilePage;

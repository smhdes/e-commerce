'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getRedirectUrl } from '../../lib/auth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

/**
 * Login Page Component
 * User authentication form with email and password
 */

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectUrl = getRedirectUrl();
      router.push(redirectUrl);
    }
  }, [isAuthenticated, router]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Redirect to intended page or home
        const redirectUrl = getRedirectUrl();
        router.push(redirectUrl);
      } else {
        setError(result.error || 'Giriş yapılamadı');
      }
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo credentials info
  const demoCredentials = [
    { email: 'user@example.com', password: 'pass123', name: 'John Doe' },
    { email: 'jane@example.com', password: 'pass123', name: 'Jane Smith' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 ml-3">Hepsitrend</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Hesabınıza Giriş Yapın
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Hesabınız yok mu?{' '}
            <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">
              Kayıt olun
            </Link>
          </p>
        </div>

        {/* Login Form */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <Input
              label="E-posta Adresi"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="ornek@email.com"
              leftIcon={<Mail className="w-5 h-5" />}
              error={error && error.includes('email') ? error : ''}
              required
            />

            {/* Password Field */}
            <Input
              label="Şifre"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Şifrenizi girin"
              leftIcon={<Lock className="w-5 h-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              }
              error={error && error.includes('şifre') ? error : ''}
              required
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  Beni hatırla
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-500">
                Şifremi unuttum
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
            </Button>
          </form>
        </Card>

        {/* Demo Credentials */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Demo Hesaplar
          </h3>
          <p className="text-sm text-blue-700 mb-4">
            Test etmek için aşağıdaki hesaplardan birini kullanabilirsiniz:
          </p>
          <div className="space-y-2">
            {demoCredentials.map((cred, index) => (
              <div key={index} className="text-sm">
                <button
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    email: cred.email,
                    password: cred.password
                  }))}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  {cred.name}: {cred.email} / {cred.password}
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Additional Links */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Giriş yaparken sorun mu yaşıyorsunuz?{' '}
            <Link href="/help" className="font-medium text-primary-600 hover:text-primary-500">
              Yardım alın
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

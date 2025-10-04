'use client';

import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import Button from './ui/Button';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the component tree
 */

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    // ErrorBoundary caught an error
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            {/* Error Icon */}
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>

            {/* Error Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Bir Hata Oluştu
            </h1>

            {/* Error Message */}
            <p className="text-gray-600 mb-8">
              Üzgünüz, beklenmeyen bir hata oluştu. Lütfen sayfayı yenilemeyi deneyin 
              veya ana sayfaya dönün.
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <h3 className="text-sm font-medium text-red-800 mb-2">
                  Hata Detayları:
                </h3>
                <pre className="text-xs text-red-700 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="primary"
                onClick={this.handleRetry}
                className="flex items-center justify-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Tekrar Dene
              </Button>
              
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto flex items-center justify-center"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Ana Sayfa
                </Button>
              </Link>
            </div>

            {/* Additional Help */}
            <div className="mt-8 text-sm text-gray-500">
              <p>
                Sorun devam ederse, lütfen{' '}
                <Link href="/contact" className="text-primary-600 hover:text-primary-700">
                  destek ekibimiz
                </Link>
                {' '}ile iletişime geçin.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;

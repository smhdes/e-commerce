/**
 * Global Loading Component
 * Shows loading state for the entire application
 */

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 rounded-full animate-spin border-t-primary-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-primary-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Yükleniyor...
          </h2>
          <p className="text-gray-600">
            Lütfen bekleyin, sayfa hazırlanıyor
          </p>
        </div>
        
        {/* Loading Dots Animation */}
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}

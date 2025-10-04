/**
 * Product Detail Loading Component
 * Shows loading state for product detail page
 */

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-300 rounded-lg"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-300 rounded-lg"></div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              <div className="h-8 bg-gray-300 rounded w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
              <div className="h-12 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

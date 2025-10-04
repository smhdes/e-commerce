/**
 * Profile Page Loading Component
 * Shows loading state for profile page
 */

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          {/* Header */}
          <div className="mb-8">
            <div className="h-8 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-48"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                {/* User Info */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-24 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-32 mx-auto"></div>
                </div>

                {/* Navigation */}
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-300 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="h-6 bg-gray-300 rounded w-32 mb-6"></div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                      <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Login Page Loading Component
 * Shows loading state for login page
 */

export default function LoginLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header Skeleton */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-8 bg-gray-300 rounded w-32 animate-pulse"></div>
          </div>
          <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-48 mx-auto animate-pulse"></div>
        </div>

        {/* Form Skeleton */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <div className="h-4 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
            </div>

            {/* Password Field */}
            <div>
              <div className="h-4 bg-gray-300 rounded w-16 mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-24 ml-2 animate-pulse"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
            </div>

            {/* Submit Button */}
            <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Demo Credentials Skeleton */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="h-6 bg-gray-300 rounded w-32 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
